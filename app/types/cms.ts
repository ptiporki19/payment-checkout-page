export interface PaymentGateway {
  id: string;
  name: string;
  checkoutUrl: string;
  isActive: boolean;
  apiKeys: {
    publicKey?: string;
    secretKey?: string;
    [key: string]: string | undefined;
  };
}

export interface PageContent {
  title: string;
  mainHeading: string;
  subHeading: string;
  description: string;
  buttonText: string;
  footerText: string;
  language: string;
}

export interface PageStyle {
  backgroundColor: string;
  backgroundImage: string | null;
  textColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}

export interface CMSData {
  pageContent: PageContent;
  pageStyle: PageStyle;
  paymentGateways: PaymentGateway[];
  activeGatewayId: string | null;
} 