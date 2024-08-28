import * as React from 'react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { InputTextarea } from 'primereact/inputtextarea';
import { CredentialIssuerDefinitionForm } from '../../state/slices/credentialissuerdefinitionform';
import { CredentialIssuerCredentialDefinition, CredentialIssuerDefinition, useAppDispatch } from '../../state';
import { Did, didSelector, getDids, registerTrustedIssuer, TrustedIssuerForm } from '../../state/slices/did';
import { DidSelectList, OCard, OFabContainer, TextInputWithLabel } from '../molecules';
import { LanguageInput } from '../molecules/LanguageInput';
import { ProgressBar } from 'primereact/progressbar';
import { t } from 'i18next';

export interface IssuerTemplateFormProps {
    credentialIssuerCredential?: CredentialIssuerCredentialDefinition;
}

export const IssuerTrustForm: FC<IssuerTemplateFormProps> = (props) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    let navigation = useNavigate();
    const [trustedIssuerForm, setTrustedIssuerForm] = useState<TrustedIssuerForm>({didId: props.credentialIssuerCredential?.issuerDid?.id, schemaId: '', taoWalletAddress: ''});
    const [isLoading, setIsLoading] = useState<boolean>();

    useEffect(() => {
        dispatch(getDids({jwtToken: keycloak.token!}));
    }, [keycloak.token]);

    function handleFormUpdate(attributeName: string, value: string | string[] | undefined) {
        setTrustedIssuerForm(Object.assign({}, trustedIssuerForm, {[attributeName]: (typeof value == 'string') ? value.trimStart() : value}));
    }

    function handleRegisterIssuer() {
        setIsLoading(true)
        dispatch(registerTrustedIssuer({jwtToken: keycloak.token!, didId: trustedIssuerForm.didId!, schemaId: trustedIssuerForm.schemaId!, taoWalletAddress: trustedIssuerForm.taoWalletAddress!})).then((response) => {
            setIsLoading(false);
            if (response.type.includes('fulfilled')) {
                setTimeout(() => { // Use timeout the give time to update the redux store.
                    navigation('/credentialIssuerDefinition');
                }, 250);
            }
        });
    }

    const isValidForm = useMemo(() => {
        if (trustedIssuerForm.schemaId === undefined || trustedIssuerForm.schemaId.length === 0) {
            return false;
        }
        if (trustedIssuerForm.taoWalletAddress === undefined || trustedIssuerForm.taoWalletAddress.length === 0) {
            return false;
        }
        return true;
    }, [trustedIssuerForm]);

    return (
        <>
            {isLoading ? <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar> : <></>}
            <OCard className="mt-4" title={t('screens.credentialIssuerDefinitionForm.trust.title')}>
                <TextInputWithLabel className="mb-3"
                                    label='Schema id'
                                    placeHolder='Specify the schema url'
                                    value={trustedIssuerForm?.schemaId}
                                    onChangeValue={(value) => handleFormUpdate('schemaId', value)}/>
                <TextInputWithLabel className="mb-3"
                                    label='TAO Wallet URL'
                                    placeHolder='Specify the TAO wallet URL'
                                    value={trustedIssuerForm?.taoWalletAddress}
                                    onChangeValue={(value) => handleFormUpdate('taoWalletAddress', value)}/>
            </OCard>
            <Button className="p-2 m-2" onClick={handleRegisterIssuer} disabled={!isValidForm}>{t('screens.credentialIssuerDefinitionForm.trust.registerIssuer')}</Button>
        </>
)
;
}
