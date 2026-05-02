# DEPLOY — sprintai.cloud Landing Page

## Architecture

```
https://sprintai.cloud/           → Landing page (static files — this repo)
https://sprintai.cloud/webhook    → FastAPI :8000  (LINE OCR)
https://sprintai.cloud/web/       → FastAPI :8000  (Web demo)
https://sprintai.cloud/mirror/    → FastAPI :8001  (The Market's Mirror)
https://sprintai.cloud/static/    → FastAPI :8001  (Mirror static assets)
https://sprintai.cloud/dj_project/→ FastAPI :8080  (Don Juan Agent)
```

Landing page เป็น pure static site — ไม่มี build step ไม่มี environment variables

---

## First Deploy (ครั้งแรก)

### 1. SSH เข้า VPS

```bash
ssh root@srv1145155
```

### 2. Clone repo

```bash
cd /root
git clone https://github.com/Paopasatiht/SPRINT-LANDING_PAGE.git
```

ตรวจว่ามีไฟล์ครบ:

```bash
ls /root/SPRINT-LANDING_PAGE/
# index.html  app.jsx  tweaks-panel.jsx  components/  assets/  styles/
```

### 3. อัปเดต Nginx config

```bash
nano /etc/nginx/sites-available/sprint-ocr
```

แก้ **2 จุด** เท่านั้น — location อื่นไม่ต้องแตะ:

**จุดที่ 1 — เพิ่ม `root` และ `index` ต่อจาก `server_name`:**

```nginx
server {
    server_name sprintai.cloud;

    # เพิ่ม 2 บรรทัดนี้
    root /root/SPRINT-LANDING_PAGE;
    index index.html;

    # ... location blocks ที่มีอยู่แล้ว (ไม่ต้องแตะ) ...
```

**จุดที่ 2 — หา `location /` เดิม แล้วแทนที่:**

ของเดิม (proxy ไป FastAPI):
```nginx
location / {
    proxy_pass http://127.0.0.1:8000;
    ...
}
```

แทนที่ด้วย:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

บันทึก: `Ctrl+O` → Enter → `Ctrl+X`

### 4. แก้ Permission (สำคัญ — ถ้าข้ามขั้นนี้จะได้ 500)

Nginx รันด้วย user `www-data` ซึ่งเข้า `/root/` ไม่ได้โดย default:

```bash
chmod o+x /root
```

### 5. Reload Nginx

```bash
nginx -t && systemctl reload nginx
```

### 6. ตรวจสอบ

```bash
curl -I https://sprintai.cloud/
# HTTP/2 200   content-type: text/html  ✓

curl -I https://sprintai.cloud/webhook
# ต้อง respond (200 หรือ 405)  ✓

curl -I https://sprintai.cloud/mirror/
# HTTP/2 200  ✓

curl -I https://sprintai.cloud/dj_project/
# HTTP/2 200  ✓
```

เปิด browser → `https://sprintai.cloud` → เห็น landing page ✓

---

## Update (เมื่อแก้ไข landing page)

```bash
cd /root/SPRINT-LANDING_PAGE
git pull origin main
```

ไม่ต้อง restart อะไร — Nginx เสิร์ฟไฟล์โดยตรง

---

## Rollback

```bash
cd /root/SPRINT-LANDING_PAGE
git log --oneline -5        # ดู commit ที่ต้องการ
git checkout <commit-hash>  # rollback
git checkout main           # กลับ main
```
