import * as React from 'react';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { TabPanel, TabView } from 'primereact/tabview';
import { InfoCard, OFabContainer } from '../molecules';
import { ShieldCheck } from '../atoms/icons/ShieldCheck';
import { CredentialIssuerCredentialDisplay, useAppDispatch } from '../../state';
import { setSelectedCredentialIssuerDisplayLanguages } from '../../state/slices/credentialissuerdefinitionform';
import { TrustedIssuerForm } from '../../state/slices/did';


export const IssuerTrust: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    let navigation = useNavigate();
    const [trustedIssuerForm, setTrustedIssuerForm] = useState<TrustedIssuerForm>({schemaId: '', taoWalletAddress: ''});


    // useEffect(() => {
    //     if (credentialIssuerDefinitionId !== undefined) {
    //         dispatch(getCredentialIssuerDefinition({jwtToken: keycloak.token!, credentialIssuerDefinitionId: credentialIssuerDefinitionId})).then((response) => {
    //             if (response.type.includes('fulfilled')) {
    //                 dispatch(setInitialCredentialIssuerDefinitionForm(response.payload));
    //             }
    //         });
    //     } else {
    //         dispatch(setCredentialIssuerDefinitionForm({"displays": [{"locale": undefined}]}));
    //     }
    // }, [credentialIssuerDefinitionId]);

    // const


    const isValidForm = useMemo(() => {
            if (trustedIssuerForm.schemaId === undefined || trustedIssuerForm.schemaId.length === 0) {
                return false;
            }
            if (trustedIssuerForm.taoWalletAddress === undefined || trustedIssuerForm.taoWalletAddress.length === 0) {
                return false;
            }
        return true;
    }, [trustedIssuerForm]);

    function handleFormUpdate(attributeName: string, value: string | string[] | undefined) {
        // console.log('QQQ handleFormUpdate: ', attributeName);
        // dispatch(setCredentialIssuerDefinitionForm(Object.assign({}, credentialIssuerDefinitionForm.form, {[attributeName]: (typeof value == 'string') ? value.trimStart() : value})));
    }

    function onCancel() {
        navigation('/credentialIssuerDefinition');
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

    function handleLanguagesUpdate(languages: string[]) {
        dispatch(setSelectedCredentialIssuerDisplayLanguages(languages));
    }

    function handleDisplayUpdate(updatedDisplay: CredentialIssuerCredentialDisplay) {
        console.log('QQQ updatedDisplay: ', updatedDisplay);
        // dispatch(setCredentialIssuerDefinitionForm(Object.assign({}, credentialIssuerDefinitionForm.form, {[attributeName]: (typeof value == 'string') ? value.trimStart() : value})));
    }

    return (
        <div className="pb-8 mb-8">
            <InfoCard className="mb-4" icon={<ShieldCheck height="30" width="30"/>}
                      title={t('screens.credentialIssuerDefinitionForm.intro.new.title')}
                      description={t('screens.credentialIssuerDefinitionForm.intro.new.description')}/>
            <TabView className="pl-0 ml-0">
                <TabPanel header="EBSI" className="pl-0 ml-0">
                    {/*<OCard className="mt-4" title={t('screens.credentialIssuerDefinitionForm.saveConfigurationTitle')}>*/}
                    {/*    {(dids && dids.list && dids.list.length > 1) && (*/}
                    {/*        <div className="p-0 mt-2 mb-5">*/}
                    {/*            {t('screens.issueCredentials.issueTo')} <DidSelectList didList={dids.list} selectedDid={selectedDid} onSelect={onSelectItem}/>*/}
                    {/*        </div>*/}
                    {/*    )}*/}

                    {/*    <TextInputWithLabel className="mb-3"*/}
                    {/*                        label='Name'*/}
                    {/*                        placeHolder='Name'*/}
                    {/*                        value=''*/}
                    {/*                        onChangeValue={(value) => handleFormUpdate('schemaId', value)}/>*/}

                    {/*    <TextInputWithLabel className="mb-3"*/}
                    {/*                        label='Name'*/}
                    {/*                        placeHolder='Name'*/}
                    {/*                        value=''*/}
                    {/*                        onChangeValue={(value) => handleFormUpdate('taoWalletUrl', value)}/>*/}

                    {/*</OCard>*/}

                </TabPanel>
                <TabPanel header="Attibutes">
                </TabPanel>
            </TabView>
            <OFabContainer className="w-full">
                <Button label={t('generic.cancel')} severity="secondary" size="small" className="w-max" onClick={onCancel}/>
                <Button label="Save configuration" size="small" className="w-max" onClick={onSaveConfiguration} disabled={!isValidForm}/>
            </OFabContainer>
        </div>
    );
}
