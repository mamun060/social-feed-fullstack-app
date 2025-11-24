'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '120px',
          fontWeight: 'bold',
          margin: '0',
          color: '#1f2937'
        }}>
          404
        </h1>
        <p style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#374151',
          marginTop: '10px'
        }}>
          Page Not Found
        </p>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginTop: '8px',
          marginBottom: '30px'
        }}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '12px 32px',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'background-color 0.3s ease'
        }} onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
           onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
