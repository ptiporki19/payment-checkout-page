# Payment Checkout Page with CMS

A modern, customizable payment checkout page with an integrated Content Management System (CMS) for easy content and style management.

## Features

- 🎨 Customizable checkout page with CMS
- 💳 Multiple payment gateway support
- 🔒 Secure admin authentication
- 🎯 Real-time content updates
- 📱 Responsive design
- 🎨 Tailwind CSS styling

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ptiporki19/payment-checkout-page.git
```

2. Install dependencies:
```bash
cd payment-checkout-page
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3005](http://localhost:3005) in your browser.

## Admin Access

- Admin URL: `/admin/login`
- Default credentials (change in production):
  - Username: admin
  - Password: password123

## Project Structure

```
payment-checkout-page/
├── app/
│   ├── admin/           # Admin dashboard components
│   ├── api/             # API routes
│   ├── components/      # Shared components
│   └── types/           # TypeScript types
├── public/              # Static assets
└── styles/              # Global styles
```

## Security Notes

- This is a demo project. In production:
  - Use proper authentication
  - Store sensitive data in environment variables
  - Implement proper session management
  - Use HTTPS
  - Never commit API keys or secrets

## License

MIT 