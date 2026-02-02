# 🍱 FoodHub Frontend

Frontend for **FoodHub**, the meal ordering platform. Customers can browse menus, place orders, and track them. Providers manage menus and orders, while admins can monitor the platform.

This repository contains **only the frontend** implementation.

---

## 🌐 Live URLs

- **Client (Frontend):** [https://foodhub-client-eight.vercel.app](https://foodhub-client-eight.vercel.app)
- **Server (Backend):** [https://foodhub-server-smoky.vercel.app](https://foodhub-server-smoky.vercel.app)

All API requests are handled by the backend server.

---

## 👤 Test Login Credentials

You can log in directly with these accounts:

### Customer

```
Email: customer@gmail.com
Password: customer@gmail.com
```

### Admin

```
Email: admin@gmail.com
Password: 123456789
```

> Use these credentials to test login and access features for each role.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/cseswapon/foodhub_client.git
cd foodhub_client
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=https://foodhub-server-smoky.vercel.app
```

> This points the frontend to the backend server.

### 4️⃣ Start Development Server

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:3000
```

---

## 🛠️ Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Radix UI Components**
- **TanStack React Table & Forms**
- **Better Auth** (for authentication)

---

## 📜 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build production bundle  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint checks        |

---

## ✍️ Author

**Swapon Saha**
GitHub: [https://github.com/cseswapon](https://github.com/cseswapon)
