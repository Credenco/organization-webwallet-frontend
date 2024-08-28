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
import { Did, didSelector, getDids } from '../../state/slices/did';
import { DidSelectList, OCard, OFabContainer, TextInputWithLabel } from '../molecules';
import { LanguageInput } from '../molecules/LanguageInput';

export interface IssuerTemplateFormProps {
    credentialIssuerCredential?: CredentialIssuerCredentialDefinition;
}

export const IssuerTemplateForm: FC<IssuerTemplateFormProps> = (props) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    let navigation = useNavigate();
    const [selectedDid, setSelectedDid ] = useState<Did>();

    let dids = useSelector(didSelector);

    useEffect(() => {
        dispatch(getDids({jwtToken: keycloak.token!}));
    }, [keycloak.token]);

    useEffect(() => {
        if (dids && dids.list && dids.list.length > 0) {
            if (props.credentialIssuerCredential && props.credentialIssuerCredential.issuerDid) {
                setSelectedDid(dids.list.filter(value => value.id === props.credentialIssuerCredential!.issuerDid!.id).at(0))
            } else {
                setSelectedDid(dids.list.at(0));
            }
        }
    }, [dids.list]);

    function handleFormUpdate(attributeName: string, value: string | string[] | undefined) {
        // console.log('QQQ handleFormUpdate: ', attributeName);
        // dispatch(setCredentialIssuerDefinitionForm(Object.assign({}, credentialIssuerDefinitionForm.form, {[attributeName]: (typeof value == 'string') ? value.trimStart() : value})));
    }

    function onSelectItem(did: Did) {
        setSelectedDid(did);
    }

    function onSaveConfiguration() {
        // dispatch(saveCredentialIssuerDefinition({jwtToken: keycloak.token!, credentialIssuerDefinition: credentialIssuerDefinitionForm.form!})).then((response) => {
        //     if (response.type.includes('fulfilled')) {
        //         setTimeout(() => { // Use timeout the give time to update the redux store.
        //             navigation('/credentialIssuerDefinition');
        //         }, 250);
        //     }
        // });
    }

    return (
        <>
            <OCard className="mt-4" title={t('screens.credentialIssuerDefinitionForm.template.title')}>
                {(dids && dids.list && dids.list.length > 1) && (
                    <div className="mb-3" style={{
                        border: 'none',
                        borderRadius: 16,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 18,
                        paddingBottom: 14,
                        backgroundColor: '#ffffff'
                    }}>
                        <div className="text-xs pb-1 pl-2"
                             style={{color: 'rgba(28, 28, 28, 0.40)'}}>{t('screens.credentialIssuerDefinitionForm.template.selectDid')} </div>
                        <DidSelectList didList={dids.list} selectedDid={selectedDid} onSelect={onSelectItem}/>
                    </div>
                )}
                <TextInputWithLabel className="mb-3"
                                    label='Template'
                                    placeHolder='Fill in the credential template'
                                    value={props.credentialIssuerCredential?.template}
                                    multiline={true}
                                    onChangeValue={(value) => handleFormUpdate('template', value)}/>
            </OCard>
        </>
)
;
}
