# Deploy develop branch บน Hostinger VPS

> ใช้คู่มือนี้เมื่อ: server deploy `main` อยู่แล้ว และต้องการเปลี่ยนมารัน `develop` เพื่อทดสอบ  
> `main` ยังอยู่บน GitHub ครบถ้วน — rollback ได้ตลอดเวลา

---

## ก่อนเริ่ม — ตรวจสอบสถานะ server

```bash
ssh root@<your-vps-ip>
cd /opt/sprint-ocr
git branch        # ควรเห็น * main
docker compose ps # ควรเห็น Status: Up
```

---

## Step 1 — Switch branch เป็น develop

```bash
git fetch origin
git checkout develop
```

ตรวจว่า branch ถูกต้อง:

```bash
git branch
# ควรเห็น * develop
```

ตรวจว่า code เป็นเวอร์ชันล่าสุด:

```bash
git log --oneline -3
# ต้องเห็น commit: "feat: cast numeric fields to numbers in Excel output"
```

---

## Step 2 — ตรวจสอบ .env

`.env` ไม่โดน git แตะ แต่ตรวจให้แน่ใจว่ามีครบ:

```bash
diff .env.example .env
```

ถ้า output ว่าง → `.env` ครบแล้ว ไม่ต้องทำอะไร  
ถ้ามีบรรทัดใหม่ใน `.env.example` → เพิ่มเข้า `.env`:

```bash
nano .env
```

ค่าที่ต้องมีครบ:

```env
LINE_CHANNEL_ACCESS_TOKEN=...
LINE_CHANNEL_SECRET=...
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://ocrgogo.cognitiveservices.azure.com/
AZURE_DOCUMENT_INTELLIGENCE_KEY=...
AZURE_CLASSIFIER_MODEL_ID=ocr_p_khaopun_CLASSIFIER_v1
SERVER_BASE_URL=https://sprintai.cloud
```

บันทึก: `Ctrl+O` → Enter → `Ctrl+X`

---

## Step 3 — Build image จาก develop

```bash
docker compose build
```

> Docker จะ rebuild เฉพาะ layer ที่เปลี่ยน (เร็ว)  
> ถ้าต้องการ clean build: `docker compose build --no-cache`

---

## Step 4 — Restart container

```bash
docker compose up -d
```

Downtime ประมาณ 2–5 วินาที ระหว่าง container เก่าหยุด → ใหม่ขึ้น

---

## Step 5 — ตรวจสอบว่าขึ้นแล้ว

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

```bash
curl https://sprintai.cloud/
# ต้องได้: {"status":"ok"}
```

---

## Step 6 — ทดสอบ numeric Excel (จุดที่เปลี่ยนใน develop)

ส่งรูปกรมธรรม์ผ่าน LINE แล้วดาวน์โหลด Excel มาเปิด  
ตรวจว่า column เหล่านี้เป็นตัวเลขจริง (ชิดขวาใน cell, ใช้ SUM ได้):

| Column | ตัวอย่างค่าที่ควรได้ |
|---|---|
| `coverage_amount` | `1240000` (ไม่ใช่ `"1,240,000"`) |
| `total_annual_premium` | `30255` |
| `age_at_issue` | `32` |
| `sum_insured` (Sheet 2) | `150000` |
| `annual_premium` (Sheet 2) | `28567.5` |

---

## ไฟล์ที่ปลอดภัยตลอดการ switch branch

| สิ่งที่คงอยู่ | เหตุผล |
|---|---|
| ไฟล์ Excel ใน `data/` | volume mount — ไม่โดนลบ |
| ไฟล์ `.env` | อยู่ใน `.gitignore` |
| Nginx config + SSL | อยู่นอก project directory |

---

## Rollback กลับ main (ถ้า develop มีปัญหา)

```bash
git checkout main
docker compose build
docker compose up -d
docker compose logs --tail=20
curl https://sprintai.cloud/
```

ใช้เวลาประมาณ 1–2 นาที กลับมารัน main ได้ทันที

---

## สรุป branch strategy

```
main    → stable, deploy อยู่บน Hostinger ตัวเก่า
develop → version ใหม่ (numeric Excel + deploy guide)
```

เมื่อทดสอบ develop ผ่านแล้ว → merge develop → main แล้ว deploy main ตามปกติ
