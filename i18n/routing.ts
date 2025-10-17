import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de' , 'fr' , 'es'],
  defaultLocale: 'en',
//   use the below to translate pathnames
//   pathnames: {
//     '/': '/',
//     '/pathnames': {
//       de: '/pfadnamen'
//     }
//   }
});