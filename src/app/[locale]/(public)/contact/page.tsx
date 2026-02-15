import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
            {t('contact.title')}
          </h1>
          <p className="text-xl mt-4 text-gray-300">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">
                {t('contact.form.title')}
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
                >
                  {t('contact.form.send')}
                </button>
              </form>
            </div>

            <div className="bg-gray-100 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">
                {t('contact.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 uppercase text-sm tracking-wide">
                      {t('contact.address')}
                    </h3>
                    <p className="text-gray-700">
                      {locale === 'fr'
                        ? 'Avenue Charles de Gaulle\nN\'Djamena, Tchad'
                        : 'شارع شارل ديغول\nنجامينا، تشاد'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 uppercase text-sm tracking-wide">
                      {t('contact.phone')}
                    </h3>
                    <p className="text-gray-700">+235 22 52 XX XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 uppercase text-sm tracking-wide">
                      {t('contact.email')}
                    </h3>
                    <p className="text-gray-700">contact@mspi.gov.td</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
