# Regina & Gael Studio | Full-Stack E-commerce Platform

A custom-built, full-stack e-commerce solution architected for secure digital product sales, automated payment processing, and authorized file delivery.

## Technical Architecture

* **Framework:** Next.js (TypeScript)
* **Frontend:** React 18, Tailwind CSS, shadcn/ui
* **Backend:** Next.js API Routes (Server-side logic)
* **Database:** MongoDB
* **Cloud Storage:** AWS S3 (for secure, scalable binary storage)
* **Payments:** PayPal SDK with backend webhook reconciliation
* **Auth:** NextAuth.js

## Engineering Highlights

### 1. Secure Digital Delivery (AWS S3)
Implemented a secure distribution pipeline for digital assets. Instead of public storage, the system utilizes **AWS S3 Signed URLs**. The backend validates order authorization before generating time-limited access tokens, ensuring files are only accessible to verified purchasers.

### 2. Payment & Webhook Handling
Developed a robust payment flow using the PayPal SDK. Implemented backend verification logic to reconcile payment webhooks, ensuring order fulfillment only occurs upon confirmed transaction status, preventing "free download" exploits.

### 3. Admin & Inventory Management
Built a custom administrative dashboard to decouple content management from the database, allowing for streamlined product listing, order tracking, and file management without direct database access.

### 4. Performance & Security
* **Performance:** Leveraged Next.js Server-Side Rendering (SSR) to minimize initial load times.
* **Security:** Implemented server-side input validation (Zod) and environment-based secret management. Route protection via NextAuth.js ensures sensitive backend logic is strictly access-controlled.

## Getting Started

To run the development server, ensure you have your environment variables configured.

### Prerequisites
* Node.js (v18+)
* AWS S3 Bucket Access
* PayPal Sandbox/Live credentials

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
# Copy the example file and update with your API keys and AWS credentials
cp .env.example .env

# Run the development server
npm run dev
