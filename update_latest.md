# Update Latest Changes to Hostinger

> **What changed in this update**
> - Private & Confidential banner on every page
> - Click image thumbnail → full-screen modal with editable fields
> - System no longer saves any document data (training checkbox removed)

---

## 1. SSH into VPS

```bash
ssh root@<your-vps-ip>
cd /opt/sprint-ocr
```

---

## 2. Pull latest code

```bash
git pull origin develop
```

Verify you have the latest commit:

```bash
git log --oneline -1
```

Should show:
```
ef68c1c feat: add P&C banner, image expand modal, and editable fields
```

---

## 3. Rebuild and restart

```bash
docker compose build
docker compose up -d
```

---

## 4. Verify

```bash
docker compose ps
# Status: Up

curl https://sprintai.cloud/
# {"status":"ok"}
```

Open browser → `https://sprintai.cloud/web/` — should see the amber **Private & Confidential** banner at the top.

---

## Rollback if something breaks

```bash
git checkout main
docker compose build
docker compose up -d
```
