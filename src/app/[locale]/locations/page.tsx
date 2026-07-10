import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import LocationsClient from './LocationsClient';

type Props = { params: Promise<{ locale: string }> };

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <LocationsClient locale={locale as Locale} dict={dict} />;
}
