# Text Converter - convert.maazi.de

## 🚀 Quick Start (Lokal)

```bash
npm install
npm run dev  # http://localhost:3123
```

## 🔨 Build & Production Server

```bash
npm run build  # Erstellt dist/
node server.js  # Startet auf Port 3123 (oder $PORT)
```

## ☁️ Deployment auf IONOS VPS (Port 3123)

1. **SSH auf VPS:**

   ```bash
   ssh user@deine-ip
   ```

2. **Projekt hochladen:**
   - Git clone oder rsync den Ordner hochladen.
   - `cd textconvert`

3. **Node.js installieren (falls nicht):**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Abhängigkeiten:**

   ```bash
   npm install --production
   npm run build
   ```

5. **PM2 für Production (empfohlen):**

   ```bash
   sudo npm i -g pm2
   pm2 start server.js --name textconvert
   pm2 startup
   pm2 save
   ```

6. **Firewall/Port:**

   ```bash
   sudo ufw allow 3123
   ```

7. **Domain maazi.de:**
   - A-Record auf VPS-IP.
   - Nginx/Apache reverse proxy zu Port 3123 (optional).

## 📱 Features

- Mehrere Text-Blöcke
- 10+ professionelle Unicode-Styles (Bold Sans, Italic, Fraktur, Script etc.)
- Live-Preview, Copy (Clipboard), Add/Delete
- Responsive, fixed Bars, weiß/silber Design

Perfekt für LinkedIn-Posts!

