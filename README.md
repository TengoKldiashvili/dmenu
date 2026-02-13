# 🍽️ Digital Menu Builder (DMenus)

A professional, high-performance SaaS platform designed for restaurants to create, manage, and share digital menus via instant QR code generation. Built with a robust modern stack focusing on security, scalability, and seamless user experience.

---

## ✨ Key Features

* **🔐 Secure Authentication:** Full user lifecycle management powered by **NextAuth.js**.
* **📂 Multi-tenant Management:** Create and manage multiple distinct restaurant menus from a single centralized dashboard.
* **🖼️ Rich Media Support:** High-speed image uploads for menu items integrated via **UploadThing**.
* **🎨 Dynamic Theming Engine:** Toggle between various professional UI themes (Light, Dark, Minimal, Elegant) to match brand aesthetics.
* **📱 Mobile-First Design:** Fully responsive interface ensuring a premium viewing experience for customers on any device.
* **🔗 Automated QR Generation:** Every menu automatically generates a unique, shareable QR code for physical placement.
* **⚡ Real-time Updates:** Changes made in the dashboard reflect instantly on the live public menu pages.
* **🛡️ Enhanced Security:** Rate limiting and connection security implemented via **Upstash Redis**.
* **📧 Email Integration:** Automated transactional emails using **Gmail SMTP**.

---

## 🛠️ Tech Stack

### Frontend & UI
* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Components:** Lucide React / Radix UI

### Backend & Infrastructure
* **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
* **ORM:** [Prisma](https://www.prisma.io/)
* **Auth:** [NextAuth.js](https://next-auth.js.org/)
* **File Storage:** [UploadThing](https://uploadthing.com/)
---

## 🚀 Local Development & Setup

Follow these steps to get the project running on your local machine:

### 1.Clone the Repository
```bash
git clone (https://github.com/TengoKldiashvili/dmenu)
cd dmenu
```

### 2.Install Dependencies:**
    ```bash
    npm install
    ```

### 3.Environment Setup:**
    Create a `.env` file in the root directory such as env.example and populate it with your credentials:
    ```env
    
    # Database
    DATABASE_URL=""
    DIRECT_URL=""
    UPLOADTHING_TOKEN = ""

    # Auth
    NEXTAUTH_SECRET=""
    NEXTAUTH_URL="http://localhost:3000"

    # Email (Gmail)
    EMAIL_HOST="smtp.gmail.com"
    EMAIL_PORT="465"
    EMAIL_USER=""
    EMAIL_PASS=""
    EMAIL_FROM=""

    # Security
    UPSTASH_REDIS_REST_URL=""
    UPSTASH_REDIS_REST_TOKEN=""
    ```

### 4.Database Sync:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Launch the App:**
    ```bash
    npm run dev
    ```
---
*Developed by tlab*
