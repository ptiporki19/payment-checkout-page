import { CMSData } from '../types/cms';

// This simulates the data that would come from a CMS
export const defaultCMSData: CMSData = {
  pageContent: {
    title: 'Secure Payment Checkout',
    mainHeading: 'Complete Your Payment',
    subHeading: 'Fast, Secure, Reliable',
    description: 'You\'re just one step away from completing your transaction. Our payment gateway ensures your information is secure and your transaction is processed quickly.',
    buttonText: 'Proceed to Secure Checkout',
    footerText: '© 2023 Payment Checkout. All rights reserved. Secure payment processing.',
    language: 'en',
  },
  pageStyle: {
    backgroundColor: '#F6F6F6',
    backgroundImage: null,
    textColor: '#2D3250',
    buttonColor: '#2D3250',
    buttonHoverColor: '#424769',
  },
  paymentGateways: [
    {
      id: 'stripe',
      name: 'Stripe',
      checkoutUrl: 'https://checkout.stripe.com',
      isActive: true,
      apiKeys: {
        publicKey: 'pk_test_example',
        secretKey: 'sk_test_example',
      },
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      checkoutUrl: 'https://checkout.flutterwave.com',
      isActive: false,
      apiKeys: {
        publicKey: 'FLWPUBK_TEST',
        secretKey: 'FLWSECK_TEST',
      },
    },
  ],
  activeGatewayId: 'stripe',
}; 