# 🌟 UnityPulse — Civic Action & Community Welfare Hub

UnityPulse is a modern, responsive full-stack civic engagement platform engineered to streamline volunteer participation, social welfare initiatives, and event coordination.

---

## 🔗 Live Deployments & Repositories

| Component                           | Target URL                                                                        |
| :---------------------------------- | :-------------------------------------------------------------------------------- |
| **Client Application (Production)** | [https://cat-hermione-client.vercel.app](https://cat-hermione-client.vercel.app)  |
| **Backend REST API (Live Engine)**  | [https://cat-hermione-server.vercel.app](https://cat-hermione-server.vercel.app)  |
| **Client Source Repository**        | [GitHub — cat-hermione-client](https://github.com/lamiakajal/cat-hermione-client) |
| **Server Source Repository**        | [GitHub — cat-hermione-server](https://github.com/lamiakajal/cat-hermione-server) |

---

## 🚀 Core Features

- **Multi-Method Authentication & RBAC:**
  - Secure session handling via JSON Web Tokens (JWT).
  - Social authentication integrations (Google OAuth & GitHub OAuth).
  - Role-protected routes securing organizer actions from unauthorized members.

- **Dynamic Event Discovery & Engagement:**
  - Real-time catalog with full-text search, multi-category filters, and sorting.
  - Detailed initiative profiles with instant one-click volunteer registration.
  - Personalized volunteer tracking dashboard (`/joined-events`).

- **Organizer Workspace:**
  - Dedicated administrative dashboard to publish, modify, and delete community drives.
  - Real-time form feedback and dynamic status tracking.

- **Production-Ready UI/UX:**
  - Fully responsive, mobile-first design built with Tailwind CSS and DaisyUI.
  - System-synced Dark/Light theme switching.
  - Interactive toast updates (`react-hot-toast`) and confirmation dialogs (`SweetAlert2`).

---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js 15 (React 19, App Router architecture)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, DaisyUI
- **Icons:** Lucide React
- **Client Networking:** Native Fetch API with centralized request/error interceptors
- **Hosting & Edge Delivery:** Vercel
