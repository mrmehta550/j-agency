import React from 'react';

export default function WhatsAppButton() {
  return (
    <div
      className="home-wa-float-container"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexDirection: 'row-reverse',
      }}
    >
      <a
        href="https://wa.me/919942637897?text=Hello%20Magencystudio%2C%20I%20visited%20your%20website%20and%20I'm%20interested%20in%20your%20services.%20I%20would%20like%20to%20discuss%20my%20project.%20Please%20get%20in%20touch.%20Thank%20you!"
        className="home-wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        id="waButton"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '32px', height: '32px', display: 'block' }}
        >
          <path
            d="M16 4C9.373 4 4 9.373 4 16c0 2.28.633 4.412 1.732 6.23L4 28l5.938-1.703A11.93 11.93 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 4 16 4Z"
            fill="#fff"
          />
          <path
            d="M16 6.2c-5.412 0-9.8 4.388-9.8 9.8 0 1.94.564 3.75 1.537 5.27l-1.01 3.69 3.79-1.083A9.75 9.75 0 0 0 16 25.8c5.412 0 9.8-4.388 9.8-9.8S21.412 6.2 16 6.2Z"
            fill="#25D366"
          />
          <path
            d="M12.3 11.1c-.28-.62-.44-.62-.72-.63h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.7 0 1.6 1.16 3.14 1.33 3.35.16.22 2.28 3.62 5.63 4.93 2.78 1.09 3.35.87 3.95.82.6-.06 1.94-.79 2.21-1.55.27-.76.27-1.42.19-1.55-.08-.13-.3-.22-.6-.38-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.7.16-.2.32-.8 1-.98 1.2-.18.22-.36.24-.66.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.14-.18-.32-.02-.49.14-.65.14-.14.31-.36.46-.54.15-.18.2-.32.3-.53.1-.22.05-.4-.02-.56-.08-.16-.68-1.67-.99-2.28Z"
            fill="#fff"
          />
        </svg>
      </a>
      <span
        className="home-wa-tooltip"
        style={{
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '12px',
          fontSize: '13.5px',
          fontWeight: 600,
          boxShadow: '0 4px 15px rgba(15, 23, 42, 0.15)',
          whiteSpace: 'nowrap',
          opacity: 0,
          visibility: 'hidden',
          transform: 'translateX(10px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          position: 'relative',
        }}
      >
        Chat with us
      </span>
    </div>
  );
}
