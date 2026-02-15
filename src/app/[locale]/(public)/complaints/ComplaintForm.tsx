'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function ComplaintForm({ locale }: { locale: string }) {
  const t = useTranslations();
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`/api/complaints/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.get('type'),
          isAnonymous,
          firstName: isAnonymous ? null : formData.get('firstName'),
          lastName: isAnonymous ? null : formData.get('lastName'),
          phone: formData.get('phone'),
          email: formData.get('email') || null,
          region: formData.get('region'),
          city: formData.get('city'),
          description: formData.get('description'),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/${locale}/complaints/confirmation?ref=${data.referenceCode}&pin=${data.pin}`);
      } else {
        alert(t('common.error'));
      }
    } catch (error) {
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
          {t('complaints.form.type')} *
        </label>
        <select
          name="type"
          required
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        >
          <option value="COMPLAINT">{t('complaints.form.types.complaint')}</option>
          <option value="REPORT">{t('complaints.form.types.report')}</option>
          <option value="INFORMATION_REQUEST">{t('complaints.form.types.information')}</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="anonymous" className="text-sm font-semibold uppercase tracking-wide">
          {t('complaints.form.anonymous')}
        </label>
      </div>

      {!isAnonymous && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              {t('complaints.form.firstName')} *
            </label>
            <input
              type="text"
              name="firstName"
              required={!isAnonymous}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              {t('complaints.form.lastName')} *
            </label>
            <input
              type="text"
              name="lastName"
              required={!isAnonymous}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
          {t('complaints.form.phone')} *
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="+235 XX XX XX XX"
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
          {t('complaints.form.email')}
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
            {t('complaints.form.region')} *
          </label>
          <select
            name="region"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          >
            <option value="N'Djamena">N'Djamena</option>
            <option value="Chari-Baguirmi">Chari-Baguirmi</option>
            <option value="Hadjer-Lamis">Hadjer-Lamis</option>
            <option value="Ouaddaï">Ouaddaï</option>
            <option value="Batha">Batha</option>
            <option value="Borkou">Borkou</option>
            <option value="Ennedi">Ennedi</option>
            <option value="Guéra">Guéra</option>
            <option value="Kanem">Kanem</option>
            <option value="Lac">Lac</option>
            <option value="Logone Occidental">Logone Occidental</option>
            <option value="Logone Oriental">Logone Oriental</option>
            <option value="Mandoul">Mandoul</option>
            <option value="Mayo-Kebbi Est">Mayo-Kebbi Est</option>
            <option value="Mayo-Kebbi Ouest">Mayo-Kebbi Ouest</option>
            <option value="Moyen-Chari">Moyen-Chari</option>
            <option value="Salamat">Salamat</option>
            <option value="Tandjilé">Tandjilé</option>
            <option value="Tibesti">Tibesti</option>
            <option value="Wadi Fira">Wadi Fira</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
            {t('complaints.form.city')} *
          </label>
          <input
            type="text"
            name="city"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
          {t('complaints.form.description')} *
        </label>
        <textarea
          name="description"
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          required
          className="w-5 h-5 mt-1"
        />
        <label htmlFor="consent" className="text-sm">
          {t('complaints.form.consent')}
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-black text-white font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {loading ? t('common.loading') : t('complaints.form.submit')}
      </button>
    </form>
  );
}
