type AccessibilityBannerProps = {
  locale: string;
  note: string;
};

const SHOW_ACCESSIBILITY_BANNER = true;

export default function AccessibilityBanner({ locale, note }: AccessibilityBannerProps) {
  if (!SHOW_ACCESSIBILITY_BANNER) return null;

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="h-10 bg-stone-100 border-t border-b border-stone-200 flex items-center justify-center px-4"
    >
      <p className="text-sm text-slate-700 text-center">
        {note}
      </p>
    </div>
  );
}
