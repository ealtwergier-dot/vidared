# 🩸 VidaRed — Red Nacional de Donantes · Argentina

Aplicación web para banco de donantes de sangre y médula ósea con asistente IA Gotita.

---

## 🚀 Cómo poner en marcha el proyecto

### Paso 1 — Instalá Node.js
Si no lo tenés instalado, descargalo desde https://nodejs.org (versión LTS).

### Paso 2 — Obtené tu API Key de Anthropic
1. Entrá a https://console.anthropic.com
2. Creá una cuenta o iniciá sesión
3. Andá a **"API Keys"** → **"Create Key"**
4. Copiá la key (empieza con `sk-ant-...`)

### Paso 3 — Configurá el archivo .env
Abrí el archivo `.env` que está en esta carpeta y reemplazá el texto:

```
ANTHROPIC_API_KEY="sk-ant-PEGA-TU-KEY-AQUÍ"
```

Por tu key real:

```
ANTHROPIC_API_KEY="sk-ant-api03-..."
```

### Paso 4 — Instalá las dependencias
Abrí una terminal en esta carpeta y ejecutá:

```bash
npm install
```

### Paso 5 — Iniciá el servidor

```bash
npm start
```

Vas a ver esto en la terminal:

```
🩸  VidaRed corriendo en http://localhost:3000
   API Key: sk-ant-api03-...  ✅
```

### Paso 6 — Abrí la app
Abrí tu navegador y entrá a:

**http://localhost:3000**

---

## 📁 Estructura del proyecto

```
vidared-server/
├── server.js          ← Servidor Express (maneja el API Key)
├── package.json       ← Dependencias del proyecto
├── .env               ← Tu API Key (NO subir a GitHub)
├── .env.example       ← Ejemplo sin key real (sí subir)
├── .gitignore         ← Excluye .env y node_modules
└── public/
    └── index.html     ← La app completa de VidaRed
```

## 🔒 Seguridad

- El API Key **nunca aparece en el navegador** — vive solo en el servidor.
- El servidor actúa como proxy: el front llama a `/api/chat` y el back llama a Anthropic.
- El archivo `.env` está en `.gitignore` para que no se suba a repositorios.

## 🌐 Para publicar en internet (opcional)

Podés subir este proyecto a **Railway**, **Render** o **Fly.io** gratuitamente:
- Creás un proyecto nuevo
- Subís el código (sin el `.env`)
- Configurás la variable de entorno `ANTHROPIC_API_KEY` desde el panel del servicio

---

Creado con ❤️ para salvar vidas · VidaRed © 2025 · Argentina
