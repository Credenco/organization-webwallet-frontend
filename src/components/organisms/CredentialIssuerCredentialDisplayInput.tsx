import React, { FC, useMemo } from 'react';
import { buildCredentialType, CredentialIssuerCredentialDefinition, CredentialIssuerCredentialDisplay, CredentialIssuerDefinition } from '../../state';
import { useTranslation } from 'react-i18next';
import { CredentialTypeCard, OCard, TextInputWithLabel } from '../molecules';
import { FlagIcon } from '../atoms';

export interface CredentialIssuerCredentialDisplayInputProps {
    locale: string | undefined;
    credentialIssuerDefinition: CredentialIssuerDefinition;
    credentialIssuerCredentialDefinition: CredentialIssuerCredentialDefinition;
    credentialIssuerCredentialDisplays: CredentialIssuerCredentialDisplay[];
    onChangeCredentialIssuerCredentialDisplay: (credentialIssuerCredentialDisplay: CredentialIssuerCredentialDisplay) => void;
}

export const CredentialIssuerCredentialDisplayInput: FC<CredentialIssuerCredentialDisplayInputProps> = (props) => {
    const {t} = useTranslation();

    const title = useMemo(() => {
        return (props.locale === undefined) ? t('screens.credentialIssuerDisplay.defaultLanguageDescription') : t('screens.credentialIssuerDisplay.title', {language: props.locale});
    }, [props.locale, t]);

    const credentialIssuerCredentialDisplay = useMemo(() => {
        return props.credentialIssuerCredentialDisplays.find((display) => display.locale === props.locale);
    }, [props.locale, props.credentialIssuerCredentialDisplays]);

    const defaultCredentialIssuerCredentialDisplay = useMemo(() => {
        return props.credentialIssuerCredentialDisplays.find((display) => display.locale === undefined);
    }, [props.locale, props.credentialIssuerCredentialDisplays]);
    const issuerDisplay = useMemo(() => {
        let localeDisplay = props.credentialIssuerDefinition.displays?.find((display) => display.locale === props.locale);
        if (localeDisplay !== undefined) {
            return localeDisplay;
        }
        return props.credentialIssuerDefinition.displays?.find((display) => display.locale === undefined);
    }, [props.locale, props.credentialIssuerDefinition.displays]);

    const fakeCredentialType = useMemo(() => buildCredentialType(issuerDisplay, credentialIssuerCredentialDisplay), [props.locale, props.credentialIssuerCredentialDisplays]);

    function handleFormUpdate(fieldName: string, value: string | undefined) {
        props.onChangeCredentialIssuerCredentialDisplay(Object.assign({}, credentialIssuerCredentialDisplay, {[fieldName]: (value !== undefined) ? value.trimStart() : value}));
    }

    return (
        <OCard className="mt-4" title={title} titlePrefix={<FlagIcon locale={props.locale} className="mr-3"/>}>
            <CredentialTypeCard credentialType={fakeCredentialType}/>
            <TextInputWithLabel className="mb-3"
                                label={t('screens.credentialIssuerDisplay.attributes.name.label')}
                                placeHolder={t('screens.credentialIssuerDisplay.attributes.name.placeHolder')}
                                value={credentialIssuerCredentialDisplay?.displayName}
                                onChangeValue={(value) => handleFormUpdate('displayName', value)}/>
            <TextInputWithLabel className="mb-3"
                                label={t('screens.credentialIssuerDisplay.attributes.backgroundImageUrl.label')}
                                placeHolder={t('screens.credentialIssuerDisplay.attributes.backgroundImageUrl.placeHolder')}
                                value={credentialIssuerCredentialDisplay?.backgroundImageUrl}
                                onChangeValue={(value) => handleFormUpdate('backgroundImageUrl', value)}
                                inputType='url'/>
            <TextInputWithLabel className="mb-3"
                                label={t('screens.credentialIssuerDisplay.attributes.backgroundAltText.label')}
                                placeHolder={t('screens.credentialIssuerDisplay.attributes.backgroundAltText.placeHolder')}
                                value={credentialIssuerCredentialDisplay?.backgroundAltText}
                                onChangeValue={(value) => handleFormUpdate('backgroundAltText', value)}/>
        </OCard>

    )
}

