import Link from 'next/link';
import './globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#0A192F', color: 'white', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: '#8892b0' }}>The page you are looking for does not exist.</p>
        <Link href="/" style={{ padding: '10px 20px', backgroundColor: '#00E5FF', color: '#0A192F', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Return Home
        </Link>
      </body>
    </html>
  );
}
