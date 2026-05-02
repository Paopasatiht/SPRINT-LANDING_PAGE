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

เพิ่ม/แทนที่ใน `server { ... }` block (คง SSL block ที่ certbot สร้างไว้):

```nginx
server {
    server_name sprintai.cloud;

    # Landing page (static files)
    root /root/SPRINT-LANDING_PAGE;
    index index.html;

    # LINE OCR — webhook + web demo → FastAPI :8000
    location /webhook {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
    location /web/ {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        client_max_body_size 50M;
        proxy_read_timeout   120s;
    }

    # The Market's Mirror → FastAPI :8001
    location /mirror/ {
        proxy_pass         http://127.0.0.1:8001/;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }
    location /static/ {
        proxy_pass         http://127.0.0.1:8001/static/;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # Don Juan Agent → FastAPI :8080
    location /dj_project/ {
        proxy_pass         http://127.0.0.1:8080/;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }

    # Landing page — serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

บันทึก: `Ctrl+O` → Enter → `Ctrl+X`

### 4. Reload Nginx

```bash
nginx -t && systemctl reload nginx
```

### 5. ตรวจสอบ

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
