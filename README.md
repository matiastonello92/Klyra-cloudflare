# Klyra

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/matiastonello92/Klyra-cloudflare)

Klyra is a comprehensive, scalable, multi-tenant operational management platform designed for businesses with multiple locations. It provides a unified interface for managing inventory, suppliers, purchase orders, HACCP compliance, incident reporting, and daily tasks. Built on a serverless architecture with Cloudflare Workers and Supabase, Klyra ensures real-time data, robust security through Row Level Security (RLS), and high performance. The platform features a modular design, allowing businesses to streamline complex workflows, gain actionable insights through an integrated analytics dashboard, and maintain rigorous audit trails for all significant actions. Its clean, minimalist interface is designed for efficiency and ease of use, ensuring a seamless user experience across all devices.

## Key Features

-   **Multi-Tenant & Multi-Location:** Securely manage data scoped to specific organizations and locations.
-   **Inventory Management:** Track items, stock levels, and get alerts for under-stocked goods.
-   **Supplier Hub:** Maintain a central directory of suppliers and link them to inventory items.
-   **Purchase Orders:** A complete PO workflow from draft creation to receiving stock, with PDF exports.
-   **HACCP Compliance:** Log compliance checks, attach photos, and maintain a verifiable history.
-   **Incident Reporting:** Report and track operational incidents, assign technicians, and manage resolutions.
-   **Task Management:** Create, assign, and complete daily tasks and advanced checklists.
-   **Analytics Dashboard:** Visualize key performance indicators and operational trends in real-time.
-   **Platform Administration:** A restricted area for super-admins to oversee the entire platform.

## Technology Stack

-   **Frontend:** React, Vite, TypeScript
-   **UI:** Shadcn/UI, Tailwind CSS, Framer Motion, Recharts
-   **Routing:** React Router
-   **State Management:** Zustand (global), TanStack Query (server-state)
-   **Backend:** Cloudflare Workers, Hono
-   **Database & Auth:** Supabase (Postgres with RLS)
-   **Form Management:** React Hook Form, Zod

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd klyra_ops_platform
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project for the frontend client:
    ```env
    # .env
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

    Create a `.dev.vars` file in the root of the project for local worker development. **Do not commit this file.**
    ```
    # .dev.vars
    SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    ```

4.  **Run the development server:**
    This will start the Vite frontend and the Wrangler development server for the API worker concurrently.
    ```bash
    bun run dev
    ```
    The application should now be running on `http://localhost:3000`.

## Development

The project is structured as a monorepo with the frontend and backend code separated.

-   `src/`: Contains the React Single Page Application code.
-   `worker/`: Contains the Cloudflare Worker API code.
-   `shared/`: Contains types and constants shared between the frontend and worker.

### Available Scripts

-   `bun run dev`: Starts the local development server for both the frontend and the worker.
-   `bun run build`: Builds the frontend application for production.
-   `bun run lint`: Lints the codebase.
-   `bun run deploy`: Builds and deploys the application to Cloudflare.

## Deployment

This project is designed for seamless deployment to Cloudflare Pages (for the frontend) and Cloudflare Workers (for the API).

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/matiastonello92/Klyra-cloudflare)

### Manual Deployment Steps

1.  **Build the application:**
    ```bash
    bun run build
    ```

2.  **Configure Cloudflare Secrets:**
    Before deploying, you must add your Supabase secrets to your Cloudflare Worker environment.
    Go to your Worker in the Cloudflare dashboard -> Settings -> Variables -> Add Secret.
    -   `SUPABASE_URL`: Your Supabase project URL.
    -   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key.

3.  **Deploy to Cloudflare:**
    Run the deploy script. This will deploy your static assets to Cloudflare Pages and your API to Cloudflare Workers.
    ```bash
    bun run deploy
    ```