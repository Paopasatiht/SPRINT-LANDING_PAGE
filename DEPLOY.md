# DEPLOY — sprintai.cloud Landing Page

## Architecture

```
https://sprintai.cloud/        → Nginx serves landing page (static files)
https://sprintai.cloud/webhook → FastAPI :8000  (LINE OCR — unchanged)
https://sprintai.cloud/web/    → FastAPI :8000  (Web demo — unchanged)
```

Landing page เป็น pure static site ไม่มี build step ไม่มี environment variables

---

## First Deploy (ครั้งแรก)

### 1. SSH เข้า VPS

```bash
ssh root@<your-vps-ip>
```

### 2. Clone repo

```bash
git clone https://github.com/Paopasatiht/SPRINT-LANDING_PAGE.git /var/www/sprintai-landing
```

ตรวจว่ามีไฟล์ครบ:

```bash
ls /var/www/sprintai-landing/
# index.html  app.jsx  tweaks-panel.jsx  components/  assets/  styles/
```

### 3. อัปเดต Nginx config

```bash
nano /etc/nginx/sites-available/sprint-ocr
```

แทนที่ `location /` block ทั้งหมดด้วย config นี้ (ส่วน `listen`, `server_name`, SSL คง certbot เดิมไว้):

```nginx
server {
    listen 80;
    server_name sprintai.cloud;

    # Landing page (static files)
    root /var/www/sprintai-landing;
    index index.html;

    # LINE webhook → FastAPI
    location /webhook {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # Web demo → FastAPI
    location /web/ {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        client_max_body_size 50M;
        proxy_read_timeout   120s;
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
# ต้อง respond (200 หรือ 405) — แสดงว่า FastAPI ยังทำงาน ✓

curl -I https://sprintai.cloud/web/
# HTTP/2 200  ✓
```

เปิด browser → `https://sprintai.cloud` → เห็น landing page ✓

---

## Update (เมื่อแก้ไข landing page)

```bash
ssh root@<your-vps-ip>
cd /var/www/sprintai-landing
git pull origin main
```

ไม่ต้อง restart อะไร — Nginx เสิร์ฟไฟล์โดยตรง

---

## Rollback

```bash
cd /var/www/sprintai-landing
git log --oneline -5        # ดู commit ที่ต้องการ
git checkout <commit-hash>  # rollback
# กลับ main: git checkout main
```
