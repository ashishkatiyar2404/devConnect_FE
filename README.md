# DevConnect · Frontend

> **Meet developers who want to build.**  
> A developer discovery and networking platform designed for late-night pairing and mutual connections—not endless scrolling.

---

## 🎬 Project Demo
Watch DevConnect in action—from developer discovery and connection requests to profile editing and real-time chat.


https://github.com/user-attachments/assets/1c5d17b8-2271-44dc-9928-8d0903141a5f



## ⚡ Tech Stack

- **JS Lib**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [daisyUI 5](https://daisyui.com/) (`nightline` theme)
- **HTTP Client**: [Axios](https://axios-http.com/) (Centralized Request & Response Interceptors)
- **Real-Time Communication**: [Socket.IO Client](https://socket.io/)
- **Linting**: ESLint 10

---

## 🚀 Key Features

- **🔐 Authentication & Session Management**:
  - Secure signup and login flows.
  - HTTP-only cookie-based authentication.
  - Automatic session verification and 401 token expiration handling via Axios interceptors.
- **✨ Developer Discovery Feed**:
  - Browse developer profiles one by one.
  - Send signals: **Interested** or **Ignore**.
  - Duplicate-request protection and responsive button states.
- **🤝 Connection Requests & Management**:
  - View incoming connection requests in real-time.
  - **Accept** or **Reject** pending signals with per-card loading feedback.
  - Browse confirmed connections in your network.
- **💬 Real-Time Live Chat**:
  - 1-on-1 real-time messaging powered by Socket.IO.
  - Chat history fetching with error handling and empty-state placeholders.
  - Auto-scroll to the latest message.
- **👤 Profile Management**:
  - Profile viewer and editor (First Name, Last Name, Age, Gender, Photo URL, Bio).
  - Real-time side-by-side card preview of profile changes.
  - Success toast notifications on save.
- **🛡️ Standardized Async States**:
  - Consistent loading spinners, disabled states, and retry actions on every API call.
  - Reusable `LoadingState`, `EmptyState`, and `ErrorState` components.

---

## 📁 Project Structure

The project follows a modular, **feature-based folder architecture**:

```
devConnect_FE/
├── public/                 # Static assets
├── src/
│   ├── api/                # API configurations & WebSockets
│   │   ├── setupAxios.js   # Global Axios defaults & interceptors
│   │   └── socket.js       # Socket.IO connection factory
│   ├── components/
│   │   ├── common/         # Shared UI components (UserCard, LoadingState, ErrorState, EmptyState, BrandMark)
│   │   └── layout/         # Layout wrappers (Body, NavBar, Footer, PageContainer, PageHeader)
│   ├── features/
│   │   ├── auth/           # Login & Signup flows
│   │   ├── chat/           # Live Chat component & socket messaging
│   │   ├── connections/    # Connections list, Request inbox & Redux slices
│   │   ├── feed/           # Developer feed view & feedSlice
│   │   └── profile/        # Profile view, EditProfile form & userSlice
│   ├── store/
│   │   └── appStore.js     # Redux Toolkit store configuration
│   ├── utils/
│   │   ├── constants.js    # API BASE_URL & default assets
│   │   └── errorUtils.js   # Centralized error message parser
│   ├── App.jsx             # Route definitions
│   ├── index.css           # Global theme & styling
│   └── main.jsx            # Application entry point
├── package.json
└── vite.config.js
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [DevConnect Backend](https://github.com/ashishkatiyar2404/devConnect_BE) running on `http://localhost:8000`

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ashishkatiyar2404/devConnect_FE.git
cd devConnect_FE
npm install
```

### 2. Development

Start the Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Production Build

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### 4. Code Quality & Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

---

## 🌐 API & Backend Communication

- In development, API calls target `http://localhost:8000`.
- In production, API calls route to `/api`.
- All requests automatically include `withCredentials: true` to send and receive HTTP-only JWT cookies.
- Real-time chat events connect to the backend WebSocket server on `BASE_URL`.

---

## 👨‍💻 Author

**Ashish Katiyar**

- GitHub: [@ashishkatiyar2404](https://github.com/ashishkatiyar2404)
- Linkedin: [Ashish Katiyar](https://www.linkedin.com/in/ashish-katiyar-42b194158/)

---

## 📄 License

This project is licensed under the **ISC License**.
