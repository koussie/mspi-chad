'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { formerMinisters, FormerMinister } from '@/data/former-ministers';

type FormerMinistersTableProps = {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    search: string;
    searchPlaceholder: string;
    yearFilter: string;
    sort: string;
    sortRecent: string;
    sortOldest: string;
    sortNameAZ: string;
    reset: string;
    name: string;
    period: string;
    note: string;
    noResults: string;
    present: string;
  };
};

export default function FormerMinistersTable({ locale, translations }: FormerMinistersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'name'>('recent');

  const filteredAndSortedMinisters = useMemo(() => {
    let filtered = formerMinisters.filter(minister => {
      const nameMatch = minister.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (!yearFilter) return nameMatch;

      const year = parseInt(yearFilter);
      const servedDuringYear = minister.startYear <= year && (!minister.endYear || minister.endYear >= year);

      return nameMatch && servedDuringYear;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return (b.endYear || 9999) - (a.endYear || 9999);
      } else if (sortBy === 'oldest') {
        return a.startYear - b.startYear;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, yearFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setYearFilter('');
    setSortBy('recent');
  };

  const getPeriodDisplay = (minister: FormerMinister) => {
    if (minister.periods) return minister.periods;
    const end = minister.endYear ? minister.endYear.toString() : translations.present;
    return `${minister.startYear} - ${end}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 p-6">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className={`block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {translations.search}
            </label>
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${locale === 'ar' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={translations.searchPlaceholder}
                className={`w-full border border-gray-300 px-3 py-2 ${locale === 'ar' ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'} text-sm focus:outline-none focus:border-gray-400`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute top-1/2 -translate-y-1/2 ${locale === 'ar' ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {translations.yearFilter}
            </label>
            <input
              type="number"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              placeholder="2020"
              min="2000"
              max="2026"
              className={`w-full border border-gray-300 px-3 py-2 ${locale === 'ar' ? 'text-right' : 'text-left'} text-sm focus:outline-none focus:border-gray-400`}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {translations.sort}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'oldest' | 'name')}
              className={`w-full border border-gray-300 px-3 py-2 ${locale === 'ar' ? 'text-right' : 'text-left'} text-sm focus:outline-none focus:border-gray-400`}
            >
              <option value="recent">{translations.sortRecent}</option>
              <option value="oldest">{translations.sortOldest}</option>
              <option value="name">{translations.sortNameAZ}</option>
            </select>
          </div>
        </div>

        {(searchTerm || yearFilter || sortBy !== 'recent') && (
          <div className="text-center">
            <button
              onClick={resetFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              {translations.reset}
            </button>
          </div>
        )}
      </div>

      {filteredAndSortedMinisters.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">{translations.noResults}</p>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-white border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className={`px-6 py-4 text-xs font-bold text-gray-900 uppercase tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {translations.name}
                  </th>
                  <th className={`px-6 py-4 text-xs font-bold text-gray-900 uppercase tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {translations.period}
                  </th>
                  <th className={`px-6 py-4 text-xs font-bold text-gray-900 uppercase tracking-wider ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {translations.note}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedMinisters.map((minister, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className={`px-6 py-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div className="font-semibold text-gray-900 text-sm">{minister.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{minister.title}</div>
                    </td>
                    <td className={`px-6 py-4 text-gray-700 text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {getPeriodDisplay(minister)}
                    </td>
                    <td className={`px-6 py-4 text-xs text-gray-600 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {minister.note || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {filteredAndSortedMinisters.map((minister, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4">
                <div className="font-bold text-gray-900 text-sm mb-2">{minister.name}</div>
                <div className="text-xs text-gray-600 mb-3">{minister.title}</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">{translations.period}:</span>
                    <span className="text-gray-600">{getPeriodDisplay(minister)}</span>
                  </div>
                  {minister.note && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{translations.note}:</span>
                      <span className="text-gray-600">{minister.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="text-center text-xs text-gray-500">
        {filteredAndSortedMinisters.length} {locale === 'fr' ? 'résultat(s)' : 'نتيجة'}
      </div>
    </div>
  );
}
