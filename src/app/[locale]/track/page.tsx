import { Suspense } from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import TrackPageClient from './TrackPageClient';

type Props = { params: Promise<{ locale: string }> };

export default async function TrackPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <TrackPageClient locale={locale as Locale} dict={dict} />
    </Suspense>
  );
}
