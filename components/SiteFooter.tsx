import { useTranslation } from 'next-i18next';

const SiteFooter = () => {
  const { i18n } = useTranslation('common');
  const lang = i18n?.language || 'en';
  const contactLabel = lang === 'zh' ? '联系方式：' : 'Contact: ';
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="mb-2">© 2025 www.rizzlines.org - The ultimate pickup lines and rizz generator</p>
        <p className="mb-2 text-sm text-gray-400">
          {contactLabel}
          <a href="mailto:soniceono@gmail.com" className="underline hover:text-blue-300">soniceono@gmail.com</a>
        </p>
        <p className="text-sm text-gray-400">
          Best rizz lines • Pickup lines generator • Rizz up lines • Best rizz • Dating conversation starters
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter; 