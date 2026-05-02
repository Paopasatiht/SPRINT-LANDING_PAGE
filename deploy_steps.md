# Deploy SPRINT-OCR to Hostinger VPS

## Prerequisites
- VPS มี Docker + Docker Compose + Git + Nginx ติดตั้งแล้ว
- Domain `sprintai.cloud` ชี้มาที่ IP ของ VPS แล้ว
- มี SSH access เข้า VPS

---

## Step 1 — SSH เข้า VPS

```bash
ssh root@<your-vps-ip>
```

---

## Step 2 — Clone repo

```bash
cd /opt
git clone https://github.com/Paopasatiht/SPRINT_OCR_P_KHAOPUN.git sprint-ocr
cd sprint-ocr
```

---

## Step 3 — สร้าง .env

```bash
cp .env.example .env
nano .env
```

ใส่ค่าจริงทุกบรรทัด:

```env
LINE_CHANNEL_ACCESS_TOKEN=<your_token>
LINE_CHANNEL_SECRET=<your_secret>
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://ocrgogo.cognitiveservices.azure.com/
AZURE_DOCUMENT_INTELLIGENCE_KEY=<your_azure_key>
AZURE_CLASSIFIER_MODEL_ID=ocr_p_khaopun_CLASSIFIER_v1
SERVER_BASE_URL=https://sprintai.cloud
```

> **หมายเหตุ:** ไม่ต้องใส่ `AZURE_OCR_MOCK` — ไม่ set = real mode อัตโนมัติ

บันทึก: `Ctrl+O` → Enter → `Ctrl+X`

---

## Step 4 — Build และ Start container

```bash
docker compose build
docker compose up -d
```

ตรวจว่า container ขึ้นแล้ว:

```bash
docker compose ps
```

ต้องเห็น `Status: Up` ตรง service `app`

ดู log:

```bash
docker compose logs -f
```

ต้องเห็นบรรทัดนี้แสดงว่า OK:

```
INFO:     Application startup complete.
```

กด `Ctrl+C` เพื่อออกจาก log

---

## Step 5 — ตั้ง Nginx reverse proxy

เปิดไฟล์ config:

```bash
nano /etc/nginx/sites-available/sprint-ocr
```

วางเนื้อหานี้ลงไป:

```nginx
server {
    listen 80;
    server_name sprintai.cloud;

    location / {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        client_max_body_size 20M;
    }
}
```

เปิดใช้งาน:

```bash
ln -s /etc/nginx/sites-available/sprint-ocr /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

ทดสอบ:

```bash
curl http://sprintai.cloud/
# ต้องได้: {"status":"ok"}
```

---

## Step 6 — ติดตั้ง SSL (Let's Encrypt)

```bash
certbot --nginx -d sprintai.cloud
```

เลือก option **2: Redirect** (force HTTPS)

ทดสอบ:

```bash
curl https://sprintai.cloud/
# ต้องได้: {"status":"ok"}
```

---

## Step 7 — ตั้ง LINE Webhook URL

ไปที่ [developers.line.biz](https://developers.line.biz) → Channel → **Messaging API** → **Webhook settings**

| ฟิลด์ | ค่า |
|---|---|
| Webhook URL | `https://sprintai.cloud/webhook` |
| Use webhook | เปิด ON |

กด **Verify** → ต้องได้ `Success`

---

## Step 8 — ทดสอบ End-to-End

ส่งรูปกรมธรรม์ผ่าน LINE แล้วดู log:

```bash
docker compose logs -f
```

ต้องเห็น flow ตามนี้:

```
INFO: Calling CLASSIFIER for: ...
INFO: CLASSIFIER result: ... -> AIA_policy
INFO: Calling extractor model=EXT001_AIA for: ...
INFO: Extracted model=EXT001_AIA policy_no=T202873271 benefit_rows=1
INFO: Saved to Excel: data/2026-04-10/<user_id>.xlsx
INFO: LINE push_excel status: 200
```

---

## Update Deploy (เมื่อมี code update — ตัวเก่า deploy อยู่แล้ว)

### ขั้นตอนหลัก

**1. SSH เข้า VPS**
```bash
ssh root@<your-vps-ip>
cd /opt/sprint-ocr
```

**2. ดึง code ใหม่จาก GitHub**
```bash
git pull origin main
```

> ไฟล์ `.env` ไม่โดนแตะ เพราะอยู่ใน `.gitignore` — ค่า config บน server ปลอดภัย

**3. ตรวจสอบว่ามี env var ใหม่ไหม**
```bash
diff .env.example .env
```

ถ้า `.env.example` มีบรรทัดที่ `.env` ยังไม่มี → เปิดแก้:
```bash
nano .env
```
เพิ่ม key ใหม่แล้วบันทึก (`Ctrl+O` → Enter → `Ctrl+X`)

**4. Build image ใหม่**
```bash
docker compose build
```

> ถ้า `requirements.txt` เปลี่ยน Docker จะ rebuild layer อัตโนมัติ  
> ถ้าต้องการ clean build (ล้าง cache ทิ้ง): `docker compose build --no-cache`

**5. Restart container**
```bash
docker compose up -d
```

Docker Compose จะหยุด container เก่าแล้วเปิดตัวใหม่อัตโนมัติ  
Downtime ประมาณ 2–5 วินาที

**6. ตรวจสอบว่าขึ้นแล้ว**
```bash
docker compose ps
```
ต้องเห็น `Status: Up`

```bash
docker compose logs --tail=30
```
ต้องเห็น:
```
INFO:     Application startup complete.
```

**7. ทดสอบ health check**
```bash
curl https://sprintai.cloud/
# ต้องได้: {"status":"ok"}
```

---

### ข้อมูลที่ปลอดภัยตลอดการ update

| สิ่งที่คงอยู่ | เหตุผล |
|---|---|
| ไฟล์ Excel ใน `data/` | volume mount `./data:/app/data` — ไม่โดนลบ |
| ไฟล์ `.env` | อยู่ใน `.gitignore` — git pull ไม่แตะ |
| Nginx config | อยู่ที่ `/etc/nginx/` — ไม่เกี่ยวกับ Docker |
| SSL certificate | จัดการโดย certbot — ไม่เกี่ยวกับ Docker |

---

### กรณีพิเศษ

**ถ้าต้องการ rollback กลับ commit เก่า:**
```bash
git log --oneline -5          # ดู commit hash
git checkout <commit-hash>    # checkout commit ที่ต้องการ
docker compose build
docker compose up -d
```

กลับ main: `git checkout main`

**ถ้า container crash หลัง update:**
```bash
docker compose logs --tail=50   # ดู error
docker compose down
docker compose up -d            # ลองใหม่
```

**ถ้าต้องการดู log แบบ realtime หลัง deploy:**
```bash
docker compose logs -f
# กด Ctrl+C เพื่อออก
```

---

## Troubleshooting

| อาการ | วิธีแก้ |
|---|---|
| `curl https://sprintai.cloud/` ไม่ตอบ | เช็ค `docker compose ps` และ `systemctl status nginx` |
| LINE Verify ไม่ผ่าน | เช็ค Nginx config และ `docker compose logs` |
| CLASSIFIER ไม่รู้จักเอกสาร | user จะได้รับ "ไม่สามารถระบุประเภทเอกสารได้" ใน LINE |
| Excel ไม่ดาวน์โหลด | เช็ค volume mount `./data:/app/data` ใน docker-compose.yml |
