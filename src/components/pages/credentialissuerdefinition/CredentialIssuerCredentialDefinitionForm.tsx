import * as React from 'react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    CredentialIssuerCredentialDefinition,
    CredentialIssuerCredentialDisplay,
    getCredentialIssuerDefinition,
    useAppDispatch,
    userSelector
} from '../../../state';
import { InfoCard, OCard, OFabContainer, TextInputWithLabel } from '../../molecules';
import { useTranslation } from 'react-i18next';
import { Receive } from '../../atoms/icons/Receive';

import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { credentialIssuerDefinitionFormSelector, setCredentialIssuerDefinitionForm, setInitialCredentialIssuerDefinitionForm, setSelectedCredentialIssuerDisplayLanguages } from '../../../state/slices/credentialissuerdefinitionform';
import { TabPanel, TabView } from 'primereact/tabview';
import { LanguageInput } from '../../molecules/LanguageInput';
import { CredentialIssuerCredentialDisplayInput } from '../../organisms';
import { InputTextarea } from 'primereact/inputtextarea';
import { Did, didSelector, getDids } from '../../../state/slices/did';
import { IssuerTemplateForm } from '../../organisms/IssuerTemplateForm';
import { IssuerTrustForm } from '../../organisms/IssuerTrustForm';


export const CredentialIssuerCredentialDefinitionForm: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {credentialIssuerDefinitionId} = useParams()
    const {credentialIssuerCredentialId} = useParams()
    const {keycloak, initialized} = useKeycloak();
    let navigation = useNavigate();
    const [selectedDid, setSelectedDid ] = useState<Did>();
    let credentialIssuerDefinitionForm = useSelector(credentialIssuerDefinitionFormSelector);

    // useEffect(() => {
    //     if (credentialIssuerDefinitionForm.form?.externalKey !== undefined) {
    //         const newValue = credentialIssuerDefinitionForm.form?.externalKey.replace(" ", "_").replace(/[^a-zA-Z0-9_-]/g, '');
    //         if (credentialIssuerDefinitionForm.form?.externalKey !== newValue) {
    //         handleFormUpdate("externalKey", credentialIssuerDefinitionForm.form?.externalKey.replace(" ", "_").replace(/[^a-zA-Z0-9_-]/g, ''));
    //         }
    //     }
    // }, [credentialIssuerDefinitionForm.form?.externalKey]);
    //

    useEffect(() => {
        if (credentialIssuerDefinitionId !== undefined) {
            dispatch(getCredentialIssuerDefinition({jwtToken: keycloak.token!, credentialIssuerDefinitionId: credentialIssuerDefinitionId})).then((response) => {
                if (response.type.includes('fulfilled')) {
                    dispatch(setInitialCredentialIssuerDefinitionForm(response.payload));
                }
            });
        } else {
            dispatch(setCredentialIssuerDefinitionForm({"displays": [{"locale": undefined}]}));
        }
    }, [credentialIssuerDefinitionId]);

    let dids = useSelector(didSelector);
    let user = useSelector(userSelector).singleItem;

    useEffect(() => {
        dispatch(getDids({jwtToken: keycloak.token!}));
    }, [keycloak.token]);

    useEffect(() => {
        if (dids && dids.list && dids.list.length > 0) {
            setSelectedDid(dids.list.at(0));
        }
    }, [dids.list]);


    // const

    const credentialIssuerCredential = useMemo(() => {
        console.log('QQQ credentialIssuerDefinitionForm.form?.credentialDefinitions: ', credentialIssuerDefinitionForm.form?.credentialDefinitions);
        return credentialIssuerDefinitionForm.form?.credentialDefinitions?.find((credential: CredentialIssuerCredentialDefinition) => credential.id?.toString() === credentialIssuerCredentialId!);
    }, [credentialIssuerDefinitionForm.form]);

    const isValidForm = useMemo(() => {
        //     if (credentialIssuerDefinitionForm.form?.name === undefined || credentialIssuerDefinitionForm.form?.name.length === 0) {
        //         return false;
        //     }
        //     if (credentialIssuerDefinitionForm.form?.externalKey === undefined || credentialIssuerDefinitionForm.form?.externalKey.length === 0) {
        //         return false;
        //     }
        //     let findIndex = credentialIssuerDefinitionForm.form?.displays?.findIndex((display) => {
        //         return (display.displayName === undefined || display.displayName.length === 0);
        //     });
        //     if (findIndex !== -1) {
        //         return false;
        //     }
        return true;
    }, [credentialIssuerDefinitionForm.form]);

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

    const selectedLanguages = useMemo(() => {
        if (credentialIssuerDefinitionForm.form?.displays === undefined) {
            return [];
        }
        return credentialIssuerDefinitionForm.form?.displays.map((display) => display.locale);
    }, [credentialIssuerDefinitionForm.form?.displays]) as string[];

    if (credentialIssuerCredential === undefined) {
        return null;
    }

    function handleDisplayUpdate(updatedDisplay: CredentialIssuerCredentialDisplay) {
        console.log('QQQ updatedDisplay: ', updatedDisplay);
        // dispatch(setCredentialIssuerDefinitionForm(Object.assign({}, credentialIssuerDefinitionForm.form, {[attributeName]: (typeof value == 'string') ? value.trimStart() : value})));
    }

    return (
        <div className="pb-8 mb-8">
            <InfoCard className="mt-4" icon={<Receive height="30" width="30"/>}
                      title={t('screens.credentialIssuerDefinitionForm.intro.new.title')}
                      description={t('screens.credentialIssuerDefinitionForm.intro.new.description')}/>
            <OCard className="mt-4" title={t('screens.credentialIssuerDefinitionForm.saveConfigurationTitle')}>
                <TextInputWithLabel className="mb-3"
                                    label='Name'
                                    placeHolder='Name'
                                    value={credentialIssuerCredential?.credentialConfigurationId}
                                    onChangeValue={(value) => handleFormUpdate('name', value)}/>

                <div style={{border: 'none', borderRadius: 16, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 14, backgroundColor: '#ffffff'}}>
                    <div className="text-xs pb-1 pl-2" style={{color: 'rgba(28, 28, 28, 0.40)'}}>{t('screens.credentialIssuerDefinitionForm.languageTitle')}</div>
                    <LanguageInput className="mb-2 w-full" placeHolder={t('screens.credentialIssuerDefinitionForm.languagePlaceHolder')} selectedLocales={selectedLanguages} onLocalesSelected={languages => handleLanguagesUpdate(languages)}/>
                </div>
            </OCard>

            <TabView>
                <TabPanel header="Display">
                    {credentialIssuerCredential.displays?.map((display, index) => (
                        <CredentialIssuerCredentialDisplayInput key={index}
                                                                locale={display.locale}
                                                                credentialIssuerDefinition={credentialIssuerDefinitionForm.form!}
                                                                credentialIssuerCredentialDefinition={credentialIssuerCredential}
                                                                credentialIssuerCredentialDisplays={credentialIssuerCredential.displays!}
                                                                onChangeCredentialIssuerCredentialDisplay={(display) => handleDisplayUpdate(display)}
                        />
                    ))}
                </TabPanel>
                <TabPanel header="Attibutes">
                </TabPanel>
                <TabPanel header="Template">
                    <IssuerTemplateForm credentialIssuerCredential={credentialIssuerCredential} />
                </TabPanel>
                <TabPanel header="Trust anchor" disabled={credentialIssuerCredential?.issuerDid?.type !== 'ebsi' }>
                    <IssuerTrustForm credentialIssuerCredential={credentialIssuerCredential} />
                </TabPanel>
            </TabView>
            <OFabContainer className="w-full">
                <Button label={t('generic.cancel')} severity="secondary" size="small" className="w-max" onClick={onCancel}/>
                <Button label="Save configuration" size="small" className="w-max" onClick={onSaveConfiguration} disabled={!(isValidForm && credentialIssuerDefinitionForm.dirty)}/>
            </OFabContainer>
        </div>
    );
}
