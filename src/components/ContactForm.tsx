'use client';
import { useState, FormEvent } from 'react';

interface ContactFormProps {
  dict: Record<string, string>;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-3xl)',
        background: 'rgba(16, 185, 129, 0.1)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>✅</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-success)' }}>{dict.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{dict.name}</label>
        <input type="text" className="form-control" required />
      </div>
      <div className="calculator-row">
        <div className="form-group">
          <label>{dict.email}</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="form-group">
          <label>{dict.phone}</label>
          <input type="tel" className="form-control" />
        </div>
      </div>
      <div className="form-group">
        <label>{dict.subject}</label>
        <input type="text" className="form-control" required />
      </div>
      <div className="form-group">
        <label>{dict.message}</label>
        <textarea className="form-control" rows={5} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
        {dict.send} →
      </button>
    </form>
  );
}
