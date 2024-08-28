import React, { FC, useMemo } from 'react';
import { CredentialIssuerDisplay } from '../../state';
import { useTranslation } from 'react-i18next';
import { OCard, TextInputWithLabel } from '../molecules';
import { FlagIcon } from '../atoms';
import { Image } from 'primereact/image';

export interface CredentialIssuerDisplayInputProps {
    credentialIssuerDisplay?: CredentialIssuerDisplay;
    onChangeCredentialIssuerDisplay: (credentialIssuerDisplay: CredentialIssuerDisplay) => void;
}

export const CredentialIssuerDisplayInput: FC<CredentialIssuerDisplayInputProps> = (props) => {
    const {t} = useTranslation();

    function handleFormUpdate(fieldName: string, value: string | undefined) {
        props.onChangeCredentialIssuerDisplay(Object.assign({}, props.credentialIssuerDisplay, {[fieldName]: (value !== undefined) ? value.trimStart() : value}));
    }

    const title = useMemo(() => {
        return (props.credentialIssuerDisplay?.locale === undefined) ? t('screens.credentialIssuerDisplay.defaultLanguageDescription') : t('screens.credentialIssuerDisplay.title', {language: props.credentialIssuerDisplay.locale});
    }, [props.credentialIssuerDisplay?.locale, t]);

    return (
        <OCard className="mt-4" title={title} titlePrefix={<FlagIcon locale={props.credentialIssuerDisplay?.locale} className="mr-3"/>}>
            <TextInputWithLabel className="mb-3"
                                label={t('screens.credentialIssuerDisplay.attributes.name.label')}
                                placeHolder={t('screens.credentialIssuerDisplay.attributes.name.placeHolder')}
                                value={props.credentialIssuerDisplay?.displayName}
                                onChangeValue={(value) => handleFormUpdate('displayName', value)}/>
            <TextInputWithLabel className="mb-3"
                                label={t('screens.credentialIssuerDisplay.attributes.logoUrl.label')}
                                placeHolder={t('screens.credentialIssuerDisplay.attributes.logoUrl.placeHolder')}
                                value={props.credentialIssuerDisplay?.logoUrl}
                                onChangeValue={(value) => handleFormUpdate('logoUrl', value)}
                                postElement={<Image src={props.credentialIssuerDisplay?.logoUrl} alt={props.credentialIssuerDisplay?.logoAltText} width="70px" preview/>}
                                inputType='url'/>
            <TextInputWithLabel className="mb-3"
                                label={t('screens.credentialIssuerDisplay.attributes.logoAlt.label')}
                                placeHolder={t('screens.credentialIssuerDisplay.attributes.logoAlt.placeHolder')}
                                value={props.credentialIssuerDisplay?.logoAltText}
                                onChangeValue={(value) => handleFormUpdate('logoAltText', value)}/>
        </OCard>

    )
}

