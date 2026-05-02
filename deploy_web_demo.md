# Deploy Web Demo บน Hostinger

> **สิ่งที่เพิ่มมาในการอัปเดตนี้**
> - หน้าเว็บ demo ที่ `https://sprintai.cloud/web/`
> - Login ด้วย username/password
> - Upload รูปกรมธรรม์ → ดูผล OCR แบบ image + ข้อมูลคู่กัน
> - ติ๊ก training checkbox + Download Excel

---

## Step 1 — SSH เข้า VPS

```bash
ssh root@<your-vps-ip>
cd /opt/sprint-ocr
```

---

## Step 2 — ดึง code ใหม่

```bash
git fetch origin
git checkout develop
git pull origin develop
```

ตรวจ commit ล่าสุด:

```bash
git log --oneline -3
```

ต้องเห็น:
```
9b6dd27 feat: add web demo UI with login, upload, OCR results, and Excel download
```

---

## Step 3 — เพิ่ม SESSION_SECRET_KEY ใน .env

```bash
echo "SESSION_SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')" >> .env
```

ตรวจว่าได้เพิ่มแล้ว:

```bash
grep SESSION_SECRET_KEY .env
# ต้องเห็น: SESSION_SECRET_KEY=<สตริงยาว 64 ตัวอักษร>
```

---

## Step 4 — ตั้ง password ให้ผู้ใช้

ไฟล์ `config/users.json` มี user ตัวอย่างอยู่แล้ว (`admin` / `admin`)  
**ต้องเปลี่ยนก่อนส่งให้ลูกค้า**

**สร้าง hash ของ password ที่ต้องการ:**

```bash
python3 -c "import hashlib,sys; print(hashlib.sha256(sys.argv[1].encode()).hexdigest())" <password_ที่ต้องการ>
```

**แก้ไข config/users.json:**

```bash
nano config/users.json
```

แทนที่ด้วย username และ hash ที่ต้องการ:

```json
{
  "users": [
    {
      "username": "ชื่อผู้ใช้ที่ต้องการ",
      "password_sha256": "<hash_ที่ได้จากคำสั่งด้านบน>"
    }
  ]
}
```

บันทึก: `Ctrl+O` → Enter → `Ctrl+X`

> เพิ่มหลาย user ได้ — เพิ่ม object ใน array ได้เลย

---

## Step 5 — อัปเดต Nginx config

```bash
nano /etc/nginx/sites-available/sprint-ocr
```

แก้ไข `location /` ให้เป็น:

```nginx
location / {
    proxy_pass         http://127.0.0.1:8000;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    client_max_body_size 50M;
    proxy_read_timeout   120s;
}
```

บันทึก: `Ctrl+O` → Enter → `Ctrl+X`

ตรวจและ reload:

```bash
nginx -t
systemctl reload nginx
```

---

## Step 6 — Build image ใหม่

```bash
docker compose build
```

---

## Step 7 — Restart container

```bash
docker compose up -d
```

---

## Step 8 — ตรวจสอบ

```bash
docker compose ps
# ต้องเห็น Status: Up

docker compose logs --tail=20
# ต้องเห็น: INFO:     Application startup complete.

curl https://sprintai.cloud/
# ต้องได้: {"status":"ok"}  ← LINE webhook ยังทำงานปกติ
```

---

## Step 9 — ทดสอบ Web Demo

เปิดเบราว์เซอร์ไปที่ `https://sprintai.cloud/web/`

- Login ด้วย username/password ที่ตั้งไว้ใน Step 4
- ลองลากไฟล์รูปกรมธรรม์มาวาง
- กด "ประมวลผล"
- ตรวจว่าเห็นรูปทางซ้าย + ข้อมูลทางขวา
- ลองกด "Download Excel"

---

## เพิ่ม user ใหม่ภายหลัง (ไม่ต้อง restart)

```bash
# 1. สร้าง hash
python3 -c "import hashlib,sys; print(hashlib.sha256(sys.argv[1].encode()).hexdigest())" <password>

# 2. แก้ไฟล์
nano /opt/sprint-ocr/config/users.json

# 3. เพิ่ม entry ใหม่ใน array — ไม่ต้อง rebuild/restart container
```

---

## Rollback กลับ main (ถ้ามีปัญหา)

```bash
git checkout main
docker compose build
docker compose up -d
```
