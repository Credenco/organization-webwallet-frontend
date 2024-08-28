import React, { FC, useEffect } from 'react';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getTranslations } from '../AppTexts';
import { userSelector } from '../state';
import { useSelector } from 'react-redux';

interface Props {
}


export const I18n: FC<Props> = () => {
    let user = useSelector(userSelector).singleItem;

    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            // the translations
            // (tip move them in a JSON file and import them,
            // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
            resources: {
                nl: {
                    translation: getTranslations('nl')
                },
                en: {
                    translation: getTranslations('en')
                }
            },
            fallbackLng: "en",

            interpolation: {
                escapeValue: false
            }
        });

    useEffect(() => {

        let lng = (user?.locale === undefined) ? 'en' : user?.locale;
        i18n.changeLanguage(lng);

    }, [user?.locale]);

    return (<span/>);
};
