import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect'; 
// Ensure the path is correct: './LocaleSwitcherSelect' or whatever it is in your project structure

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    // Note: We are no longer mapping the options inside the component, 
    // the new Select component handles the rendering of the list.
    <div className="relative flex items-center h-full"> 
        <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
          {/* Still passes the <option> elements, but they are now
              read by LocaleSwitcherSelect to build the list items */}
          {routing.locales.map((cur) => (
            <option key={cur} value={cur}>
              {t('locale', {locale: cur})}
            </option>
          ))}
        </LocaleSwitcherSelect>
    </div>
  );
}