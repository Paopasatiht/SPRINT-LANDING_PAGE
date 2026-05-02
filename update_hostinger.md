# อัปเดต SPRINT-OCR บน Hostinger (develop branch)

> **สิ่งที่เปลี่ยนในการอัปเดตนี้**
>
> ทุก column ที่เป็นตัวเลขใน Excel ถูก cast เป็น int/float จริง ใช้สูตรได้ทันที
> รองรับทุกรูปแบบที่ Azure OCR ส่งมา:
> - `"1,240,000.00 บาท"` → `1240000`
> - `"25 ปี"` / `"32 ปี"` → `25` / `32`
> - `"186.000.00"` (OCR อ่าน comma เป็น dot) → `186000`
> - `"ฟรี"` → คง string ไว้ตามเดิม

---

## 1. SSH เข้า VPS

```bash
ssh root@<your-vps-ip>
```

---

## 2. เข้า project directory

```bash
cd /opt/sprint-ocr
```

---

## 3. ดึง code ใหม่

**กรณี A — server ยังอยู่บน `main`** (ยังไม่เคย switch มา develop):

```bash
git fetch origin
git checkout develop
git pull origin develop
```

**กรณี B — server อยู่บน `develop` อยู่แล้ว:**

```bash
git pull origin develop
```

ตรวจว่าได้ commit ล่าสุด:

```bash
git log --oneline -5
```

ต้องเห็น:

```
d2d393e fix: correctly handle multi-dot OCR numbers (e.g. 186.000.00 → 186000)
7dbb8b4 docs: add Hostinger update guide for develop branch
c4d2880 fix: handle dot-as-thousand-separator OCR artifact in numeric cast
0b29b1b fix: strip Thai unit suffixes before numeric cast in Excel writer
08fb145 feat: cast numeric fields to numbers in Excel output
```

---

## 4. Build image ใหม่

```bash
docker compose build
```

---

## 5. Restart container

```bash
docker compose up -d
```

Downtime ประมาณ 2–5 วินาที

---

## 6. ตรวจสอบว่าขึ้นแล้ว

```bash
docker compose ps
```

ต้องเห็น `Status: Up`

```bash
docker compose logs --tail=20
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

## 7. ทดสอบผล

ส่งรูปกรมธรรม์ผ่าน LINE → ดาวน์โหลด Excel → เปิดดู

**ตรวจ Sheet 1:**

| Column | ค่าที่ควรได้ |
|---|---|
| `coverage_amount` | `1240000` (number, ชิดขวา) |
| `age_at_issue` | `32` (number) |
| `coverage_term_years` | `25` (number) |
| `total_annual_premium` | `30255` (number) |

**ตรวจ Sheet 2:**

| Column | ค่าที่ควรได้ |
|---|---|
| `sum_insured` | `150000` / `450000` (number) |
| `annuity_amount` | `186000` (number) |
| `payment_term_years` | `15` / `30` (number) |
| `annual_premium` | `28567.5` (number) |

วิธีตรวจ: คลิก cell → ต้องชิด**ขวา** และลอง `=SUM(...)` ต้องได้ผลลัพธ์

---

## ไฟล์ที่ปลอดภัยตลอดการ update

| สิ่งที่คงอยู่ | เหตุผล |
|---|---|
| ไฟล์ Excel เก่าใน `data/` | volume mount — ไม่โดนลบ |
| ไฟล์ `.env` | อยู่ใน `.gitignore` |
| Nginx config + SSL | อยู่นอก project directory |

---

## Rollback กลับ main (ถ้ามีปัญหา)

```bash
git checkout main
docker compose build
docker compose up -d
docker compose logs --tail=20
```
