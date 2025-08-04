# PlantID - Өсімдік анықтау жүйесі

Толық PERN stack жобасы (PostgreSQL, Express.js, React, Node.js) - AI арқылы өсімдіктерді анықтау жүйесі.

## 🌟 Мүмкіндіктер

- **Аутентификация**: JWT токен арқылы қауіпсіз кіру/тіркелу
- **Өсімдік сканерлеу**: Google Gemini AI арқылы өсімдіктерді анықтау
- **Тарих**: Барлық сканерлеулердің тарихы
- **Профиль басқару**: Қолданушы ақпараттарын өзгерту
- **Responsive дизайн**: Барлық құрылғыларда жұмыс істейді

## 🛠 Технологиялар

### Backend:
- Node.js + Express.js
- PostgreSQL дерекқоры
- JWT аутентификация
- Multer (файл жүктеу)
- Google Gemini AI API
- bcryptjs (құпия сөз хэштеу)

### Frontend:
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React (иконкалар)

## 📦 Орнату

### 1. Жобаны клондау
\`\`\`bash
git clone <repository-url>
cd plant-identification-app
\`\`\`

### 2. Backend орнату
\`\`\`bash
cd server
npm install
\`\`\`

### 3. Frontend орнату
\`\`\`bash
cd client
npm install
\`\`\`

### 4. Дерекқор орнату
PostgreSQL орнатып, жаңа дерекқор жасаңыз:
\`\`\`sql
CREATE DATABASE finalProj_db;
\`\`\`

### 5. Environment айнымалыларын конфигурациялау
`server/.env` файлын жасаңыз:
\`\`\`env
PORT=5002
JWT_SECRET=supersecretqaragul
DB_USER=postgres
DB_HOST=localhost
DB_NAME=finalProj_db
DB_PORT=5432
DB_PASSWORD=admin
GOOGLE_GEMINI_API_KEY=your_api_key_here
CLIENT_URL=http://localhost:5173
\`\`\`

## 🚀 Іске қосу

### 1. Backend іске қосу
\`\`\`bash
cd server
npm run dev
\`\`\`

### 2. Frontend іске қосу
\`\`\`bash
cd client
npm run dev
\`\`\`

Жоба http://localhost:5173 мекенжайында қолжетімді болады.

## 📁 Жоба құрылымы

\`\`\`
plant-identification-app/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Дерекқор конфигурациясы
│   ├── controllers/       # API контроллерлери
│   ├── middleware/        # Аутентификация және файл жүктеу
│   ├── routes/           # API маршруттары
│   ├── uploads/          # Жүктелген файлдар
│   └── server.js         # Сервер кіру нүктесі
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # React компоненттері
│   │   ├── context/      # React Context API
│   │   ├── pages/        # Беттер
│   │   ├── services/     # API сервистері
│   │   └── main.jsx      # Frontend кіру нүктесі
│   └── public/           # Статикалық файлдар
└── README.md
\`\`\`

## 📋 API Endpoints

### Аутентификация:
- `POST /api/auth/register` - Тіркелу
- `POST /api/auth/login` - Кіру
- `GET /api/auth/profile` - Профиль алу
- `PUT /api/auth/profile` - Профиль жаңарту
- `PUT /api/auth/change-password` - Құпия сөз өзгерту

### Өсімдіктер:
- `POST /api/plants/identify` - Өсімдік анықтау
- `GET /api/plants/scans` - Сканерлеу тарихы
- `GET /api/plants/scans/:id` - Бір сканерлеу
- `DELETE /api/plants/scans/:id` - Сканерлеуді өшіру
- `GET /api/plants/stats` - Статистика

## 🔧 Орналастыру (Deployment)

### Backend (Render):
1. GitHub репозиторийін жасаңыз
2. Render.com сайтында Web Service жасаңыз
3. Environment айнымалыларын қосыңыз
4. PostgreSQL дерекқорын қосыңыз

### Frontend (Vercel):
1. Vercel сайтында жоба жасаңыз
2. GitHub репозиторийін байланыстырыңыз
3. Build команда: `npm run build`
4. Environment айнымалыларын қосыңыз

## 🎯 Пайдалану

1. **Тіркелу/Кіру**: Жаңа аккаунт жасаңыз немесе бар аккаунтқа кіріңіз
2. **Сканерлеу**: Өсімдік суретін жүктеп, AI арқылы анықтаңыз
3. **Тарих**: Барлық сканерлеулердің тарихын қараңыз
4. **Профиль**: Жеке ақпараттарды басқарыңыз

## 📝 Ескертулер

- Google Gemini API кілті қажет
- PostgreSQL дерекқоры қажет
- Node.js 16+ нұсқасы керек
- Файл өлшемі 5MB-пен шектелген

## 🤝 Үлес қосу

1. Fork жасаңыз
2. Feature branch жасаңыз
3. Өзгерістерді commit жасаңыз
4. Pull request жіберіңіз

## 📄 Лицензия

MIT License

## 👨‍💻 Авторы

Студент жобасы - Қазақстан
