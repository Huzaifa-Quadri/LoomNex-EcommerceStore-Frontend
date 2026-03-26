# 🌐 LoomNex E-commerce Platform

A modern, high-performance E-commerce storefront built with **React**, **Vite**, and **Tailwind CSS v4**. LoomNex integrates directly with a secure Spring Boot backend to offer a robust shopping experience complete with user authentication, live product filtering, and a seamless checkout process.

---

### Get Live Demo Here - https://loom-nex-ecommerce-store-frontend.vercel.app

## ✨ Features

- **Modern UI/UX**: Designed with sleek aesthetics, responsive layouts, hover-state animations, and tailored micro-interactions across components.
- **Layered Architecture**: Employs a clean 4-layer architecture (`API` -> `Context` -> `Hooks` -> `UI`) for predictable data flow and module separation.
- **Secure Authentication**: Operates entirely on **Stateless JWT with HttpOnly Cookies**. The frontend never touches raw tokens, protecting users against XSS tampering.
- **Smart Route Protection**: Unauthenticated users can freely browse Products, Categories, and the Home page, but are seamlessly redirected to `/login` when attempting to access their Cart or Add items.
- **Live Inventory**: Communicates via `axios` with global error catching interceptors against the production Spring Boot API.
- **Keep-Alive Mechanism**: Automatically prevents the backend Render instance from sleeping via scheduled `/actuator/health` background polling.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Routing**: React Router DOM (v6)
- **Data Fetching / API**: Axios
- **State Management**: React Context API (`AuthContext`, `CartContext`)
- **Notifications**: React Hot Toast

---

## 🏗️ Architecture

The project codebase separates core domains into their own modules within `src/features/`.
Currently, the two major domains are **Auth** and **Ecommerce**.

```text
src/
├── features/
│   ├── auth/                        # Authentication Domain
│   │   ├── api/authApi.js           # Wraps /auth/login & /auth/register POSTs
│   │   ├── components/Spinner.jsx
│   │   ├── context/AuthContext.jsx  # Global login state mimicking server session
│   │   └── pages/                   # LoginPage, SignUpPage
│   └── ecommerce/                   # Storefront Domain
│       ├── api/
│       │   ├── axiosClient.js       # Centralized interceptors & withCredentials=true
│       │   ├── productApi.js        # GET Products
│       │   └── orderApi.js          # POST Order mappings
│       ├── context/CartContext.jsx  # Cart state & localStorage resilience
│       ├── hooks/useProducts.js     # Presentation logic for API fetches
│       ├── components/              # Buttons, Cards, Carousels, Navbars
│       └── pages/                   # HomePage, Electronics, Clothing, Cart
```

---

## 🚀 Development Setup

### 1. Prerequisites

- Node.js (v18+ recommended)
- The Spring Boot Backend must be running (either locally or on a cloud platform like Render)

### 2. Installations

```bash
# Clone the repository and install dependencies
git clone https://github.com/Huzaifa-Quadri/LoomNex-EcommerceStore-Frontend.git
cd "LoomNex-EcommerceStore-Frontend"
npm install
```

### 3. Running Locally

```bash
# Start the Vite development server
npm run dev
```

The app will be accessible at `http://localhost:5173`.

> Note: If the backend's CORS policies operate strictly, the local URL must be explicitly mapped in the Spring Boot permissions (`APP_SECURITY_CORS_ALLOWED_ORIGINS`).

---

## 📦 Deployment (Vercel)

If you plan to deploy the React frontend to **Vercel**, adhere to these critical guidelines to ensure communication with the external Spring Boot instances remains intact:

1. **Vercel URL Tracking**: Vercel assigns a live URL (e.g. `https://loomnex.vercel.app`). Give this URL to the backend team; it MUST be added to their allowed CORS Origins.
2. **Rewrite Rules**: Vite creates Single Page Applications (SPAs). You must add a `vercel.json` file at the root directing all paths to `index.html` to prevent 404 errors.
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
3. **Cross-Site Cookies Configuration**: Because Vercel and Render operate on mutually distinct domains, backend session cookies must be flagged as `SameSite=None` and `Secure=true`. Without this, browser security protocols will silently delete the authentication cookies upon successful login.

---

## 🔮 Future Enhancements

- **Dynamic Address / Payment Interfaces**: Expanding the Cart context to accept distinct address mappings prior to Order POST executions.
