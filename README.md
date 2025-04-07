# Dynamic Payment Checkout Page

A single-page, dynamic checkout solution with a CMS for managing content and payment gateways.

## Features

- **Single-Page Design**: Clean, professional checkout page with customizable elements
- **Dynamic Content**: All text, colors, and images can be updated through a CMS
- **Multiple Payment Gateways**: Support for various payment processors (Stripe, Flutterwave, etc.)
- **Easy Configuration**: Switch between payment gateways with a simple toggle
- **Responsive Design**: Works beautifully on all devices
- **Customizable Styling**: Change colors, backgrounds, and text through the CMS

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/payment-page.git
cd payment-page
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## CMS Integration

This project includes a simulation of a CMS. In a production environment, you would integrate with a headless CMS like Contentful, Sanity, Strapi, or implement your own CMS dashboard.

The CMS allows you to manage:
- Page content (title, headings, button text, etc.)
- Page styling (colors, backgrounds)
- Payment gateway configurations
- Active payment gateway selection

## Customizing the Checkout Page

All content and styling can be modified through the CMS:

1. **Page Content**: Title, headings, descriptions, button text
2. **Page Styling**: Background colors/images, text colors, button colors
3. **Payment Gateways**: Add, edit, or remove payment gateway configurations
4. **Active Gateway**: Select which payment gateway to use for processing

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Built with Next.js, TypeScript, and TailwindCSS
- Icons from Heroicons 