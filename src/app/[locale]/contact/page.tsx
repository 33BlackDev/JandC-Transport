import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{dict.contact.title}</h1>
          <p>{dict.contact.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <ContactForm dict={dict.contact} />

            <div className="contact-info-card">
              <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--space-2xl)', color: 'var(--color-white)' }}>
                {dict.contact.info}
              </h3>

              <div className="contact-info-item">
                <div className="contact-info-icon"><Mail size={24} /></div>
                <div>
                  <h4>{dict.contact.emailLabel}</h4>
                  <a href="mailto:info@jycservicios777.com">info@jycservicios777.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><Phone size={24} /></div>
                <div>
                  <h4>{dict.contact.phoneLabel}</h4>
                  <p>829-856-7877</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><MessageSquare size={24} /></div>
                <div>
                  <h4>{dict.contact.whatsapp}</h4>
                  <a href="https://wa.me/18298567877">829-856-7877</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><Clock size={24} /></div>
                <div>
                  <h4>{dict.contact.officeHours}</h4>
                  <p>{dict.contact.officeHoursValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
