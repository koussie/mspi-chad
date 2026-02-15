'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

export default function TrackComplaintPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [referenceCode, setReferenceCode] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTicket(null);

    try {
      const response = await fetch('/api/complaints/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceCode, pin }),
      });

      if (response.ok) {
        const data = await response.json();
        setTicket(data.ticket);
      } else {
        setError(
          locale === 'fr'
            ? 'Code de référence ou PIN incorrect'
            : 'رمز المرجع أو رمز التعريف غير صحيح'
        );
      }
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
            {t('complaints.track.title')}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="space-y-6 mb-12">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                {t('complaints.track.reference')} *
              </label>
              <input
                type="text"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                placeholder="MSP-2024-XXXXXX"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                {t('complaints.track.pin')} *
              </label>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="XXXXXX"
                maxLength={6}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-black text-white font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? t('common.loading') : t('complaints.track.search')}
            </button>
          </form>

          {ticket && (
            <div className="bg-gray-100 p-8 space-y-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                  {t('complaints.track.reference')}
                </div>
                <div className="text-lg font-mono text-black">{ticket.referenceCode}</div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                  {t('complaints.track.status')}
                </div>
                <div className="inline-block px-4 py-2 bg-black text-white font-semibold text-sm uppercase">
                  {t(`complaints.track.statuses.${ticket.status}`)}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                  {t('complaints.form.type')}
                </div>
                <div className="text-lg text-black">
                  {t(`complaints.form.types.${ticket.type.toLowerCase()}`)}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                  {t('complaints.track.created')}
                </div>
                <div className="text-lg text-black">
                  {new Date(ticket.createdAt).toLocaleDateString(
                    locale === 'fr' ? 'fr-FR' : 'ar-TN',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                  {t('complaints.track.updated')}
                </div>
                <div className="text-lg text-black">
                  {new Date(ticket.updatedAt).toLocaleDateString(
                    locale === 'fr' ? 'fr-FR' : 'ar-TN',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </div>
              </div>

              {ticket.lastPublicMessageFr && (
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                    {t('complaints.track.message')}
                  </div>
                  <div className="p-4 bg-white text-gray-800 leading-relaxed">
                    {locale === 'fr' ? ticket.lastPublicMessageFr : ticket.lastPublicMessageAr}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
