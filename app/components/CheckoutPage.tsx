import React from 'react';
import { CMSData, PaymentGateway } from '../types/cms';

interface CheckoutPageProps {
  cmsData: CMSData;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cmsData }) => {
  const { pageContent, pageStyle, paymentGateways, activeGatewayId } = cmsData;
  
  // Find the active payment gateway
  const activeGateway = paymentGateways.find(
    (gateway) => gateway.id === activeGatewayId
  );
  
  // Handle the checkout redirect
  const handleCheckout = () => {
    if (activeGateway?.checkoutUrl) {
      window.location.href = activeGateway.checkoutUrl;
    } else {
      alert('No payment gateway is currently configured. Please contact support.');
    }
  };
  
  // Create the page style
  const pageStyles = {
    backgroundColor: pageStyle.backgroundColor,
    backgroundImage: pageStyle.backgroundImage 
      ? `url(${pageStyle.backgroundImage})` 
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: pageStyle.textColor,
  };
  
  // Create dynamic button style from CMS
  const buttonStyle = {
    backgroundColor: pageStyle.buttonColor,
    color: '#FFFFFF', // White text for contrast
  };
  
  const buttonHoverStyle = {
    backgroundColor: pageStyle.buttonHoverColor,
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={pageStyles}
    >
      {/* Header */}
      <header className="py-6 border-b border-gray-200 bg-white/90">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-primary">
            {pageContent.title}
          </h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container-custom max-w-4xl">
          <div className="bg-white/90 rounded-lg shadow-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {pageContent.mainHeading}
            </h2>
            <p className="text-xl text-gray-700 mb-2">
              {pageContent.subHeading}
            </p>
            <p className="text-gray-600 mb-8 mx-auto max-w-2xl">
              {pageContent.description}
            </p>
            
            <div className="flex justify-center">
              <button
                className="btn-primary text-lg"
                onClick={handleCheckout}
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = pageStyle.buttonHoverColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = pageStyle.buttonColor;
                }}
              >
                {pageContent.buttonText}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 bg-primary/95 text-white">
        <div className="container-custom text-center">
          <p>{pageContent.footerText}</p>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage; 