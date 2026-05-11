# M-Pesa Payment System

This repository contains a complete M-Pesa payment system with a Node.js backend and a lightweight frontend. It is structured for deployment and ready for GitHub.

## Features
- M-Pesa STK Push payment request
- MongoDB transaction storage
- Callback endpoint for transaction updates
- Frontend payment form
- Ready-to-deploy backend and frontend structure

## Setup
1. Install dependencies:
```bash
npm install
```
2. Create a MongoDB Atlas cluster:
   - Cluster Name: `AfricaPayCluster`
   - Cloud Provider: `AWS`
   - Region: `US East (N. Virginia)` (`aws/us-east-1`)
   - Tier: `M0 Sandbox`
3. Create a database user:
   - Username: `talonsemor_db_user`
   - Password: `40584043Aa.`
4. Create or use database name: `mpesa-payment-system`
5. Add network access for testing:
   - `0.0.0.0/0` (or your specific IP/Render IP)
6. Copy `.env.example` to `.env` and add your credentials.
   - `MONGO_URI=mongodb+srv://talonsemor_db_user:40584043Aa.@africapaycluster.mongodb.net/mpesa-payment-system?retryWrites=true&w=majority`
7. Start the server:
```bash
npm run dev
```
8. Open `frontend/index.html` in your browser or host it on a static site.

## API Endpoints
- `POST /api/mpesa/pay` - send STK Push request
- `POST /api/mpesa/callback` - receive callback from Safaricom
- `GET /api/mpesa/transactions` - list stored transactions
- `GET /` - health check for the backend

## Callback URL
Use your live domain or a public tunnel URL pointing to this backend, then append `/api/mpesa/callback`.

Example:
- `CALLBACK_URL=https://yourdomain.com/api/mpesa/callback`
- `CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback`

If your website is live, this will not affect your existing site as long as the backend is hosted on a separate API path or subdomain and the callback route is configured correctly.

## Deployment
### Backend on Render
1. Create a GitHub repo for this project.
2. Sign in to Render and connect your GitHub account.
3. Create a new `Web Service`.
4. Select this repo and set:
   - Build command: `npm install`
   - Start command: `npm start`
5. Set environment variables in Render:
   - `MONGO_URI`
   - `MPESA_ENV`
   - `CONSUMER_KEY`
   - `CONSUMER_SECRET`
   - `BUSINESS_SHORTCODE`
   - `PASSKEY`
   - `CALLBACK_URL`
   - `ACCOUNT_REFERENCE`
   - `TRANSACTION_DESC`
6. Deploy and use the service URL in the frontend.

### Frontend on GitHub Pages
1. Push the `frontend/` folder to a GitHub repo.
2. Enable GitHub Pages on the repo settings.
3. Use the deployed GitHub Pages URL to host the payment page.
4. Update `frontend/script.js`:
   - Change `BACKEND_URL` to your deployed Render backend URL.

## Frontend
The frontend is located in `frontend/` and includes:
- `index.html`
- `style.css`
- `script.js`

The frontend is located in `frontend/` and includes:
- `index.html`
- `style.css`
- `script.js`

## Notes
- Add your Daraja credentials in `.env`
- Use the sandbox environment for testing before production
