import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from './translations/en/en.json';
import common_vn from './translations/vn/vn.json';
const resources = {
    en: {
        translation: common_en,
    },
    vn: {
        translation: common_vn,
    }
}
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });


export default i18n;