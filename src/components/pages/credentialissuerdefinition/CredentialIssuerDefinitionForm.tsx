import * as React from 'react';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CredentialIssuerDisplay, getCredentialIssuerDefinition, saveCredentialIssuerDefinition, useAppDispatch } from '../../../state';
import { InfoCard, OCard, OFabContainer, TextInputWithLabel } from '../../molecules';
import { useTranslation } from 'react-i18next';
import { Receive } from '../../atoms/icons/Receive';

import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import {
    credentialIssuerDefinitionFormSelector,
    setCredentialIssuerDefinitionForm,
    setInitialCredentialIssuerDefinitionForm,
    setSelectedCredentialIssuerDisplayLanguages,
    updateCredentialIssuerDisplay
} from '../../../state/slices/credentialissuerdefinitionform';
import { LanguageInput } from '../../molecules/LanguageInput';
import { CredentialIssuerCredentialListView, CredentialIssuerDisplayInput } from '../../organisms';
import { TabPanel, TabView } from 'primereact/tabview';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


export const CredentialIssuerDefinitionForm: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {credentialIssuerDefinitionId} = useParams()
    const {keycloak, initialized} = useKeycloak();
    let navigation = useNavigate();
    let credentialIssuerDefinitionForm = useSelector(credentialIssuerDefinitionFormSelector);

    useEffect(() => {
        if (credentialIssuerDefinitionForm.form?.externalKey !== undefined) {
            const newValue = credentialIssuerDefinitionForm.form?.externalKey.replace(" ", "_").replace(/[^a-zA-Z0-9_-]/g, '');
            if (credentialIssuerDefinitionForm.form?.externalKey !== newValue) {
            handleFormUpdate("externalKey", credentialIssuerDefinitionForm.form?.externalKey.replace(" ", "_").replace(/[^a-zA-Z0-9_-]/g, ''));
            }
        }
    }, [credentialIssuerDefinitionForm.form?.externalKey]);

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

    const isValidForm = useMemo(() => {
        if (credentialIssuerDefinitionForm.form?.name === undefined || credentialIssuerDefinitionForm.form?.name.length === 0) {
            return false;
        }
        if (credentialIssuerDefinitionForm.form?.externalKey === undefined || credentialIssuerDefinitionForm.form?.externalKey.length === 0) {
            return false;
        }
        let findIndex = credentialIssuerDefinitionForm.form?.displays?.findIndex((display) => {
            return (display.displayName === undefined || display.displayName.length === 0);
        });
        if (findIndex !== -1) {
            return false;
        }
        return true;
    }, [credentialIssuerDefinitionForm.form]);

    function handleFormUpdate(attributeName: string, value: string | string[] | undefined) {
        console.log('QQQ handleFormUpdate: ', attributeName);
        dispatch(setCredentialIssuerDefinitionForm(Object.assign({}, credentialIssuerDefinitionForm.form, {[attributeName]: (typeof value == 'string') ? value.trimStart() : value})));
    }

    function onCancel() {
        navigation('/credentialIssuerDefinition');
    }

    function onSaveConfiguration() {
        dispatch(saveCredentialIssuerDefinition({jwtToken: keycloak.token!, credentialIssuerDefinition: credentialIssuerDefinitionForm.form!})).then((response) => {
            if (response.type.includes('fulfilled')) {
                setTimeout(() => { // Use timeout the give time to update the redux store.
                    navigation('/credentialIssuerDefinition');
                }, 250);
            }
        });
    }

    function handleLanguagesUpdate(languages: string[]) {
        dispatch(setSelectedCredentialIssuerDisplayLanguages(languages));
    }

    const selectedLanguages = useMemo(() => {
        if (credentialIssuerDefinitionForm.form?.displays === undefined) {
            return [];
        }
        return credentialIssuerDefinitionForm.form?.displays.map((display: CredentialIssuerDisplay) => display.locale);
    }, [credentialIssuerDefinitionForm.form?.displays]) as string[];

    console.log('QQQ credentialIssuerDefinitionForm.dirty: ', credentialIssuerDefinitionForm.dirty);

    function onTabChange() {
        if (credentialIssuerDefinitionForm.dirty) {
            confirmDialog({
                header: t('screens.credentialIssuerDefinitionForm.saveChangesDialog.title'),
                message: t('screens.credentialIssuerDefinitionForm.saveChangesDialog.message'),
                icon: 'pi pi-question-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept: () => {
                    dispatch(setInitialCredentialIssuerDefinitionForm(credentialIssuerDefinitionForm.form))
                },
                reject: () => {
                }
            });
            return !credentialIssuerDefinitionForm.dirty;
        }
    }

    return (
        <div className="pb-8 mb-8">
            <ConfirmDialog/>
            {(credentialIssuerDefinitionId === undefined) && (
                <InfoCard className="mt-4" icon={<Receive height="30" width="30"/>}
                          title={t('screens.credentialIssuerDefinitionForm.intro.new.title')}
                          description={t('screens.credentialIssuerDefinitionForm.intro.new.description')}/>
            )}
            {(credentialIssuerDefinitionId !== undefined) && (
                <InfoCard className="mt-4" icon={<Receive height="30" width="30"/>}
                          title={t('screens.credentialIssuerDefinitionForm.intro.edit.title')}
                          description={t('screens.credentialIssuerDefinitionForm.intro.edit.description')}/>
            )}
            <TabView className="mt-3" onBeforeTabChange={onTabChange}>
                <TabPanel header="Issuer configuration">
                    <OCard className="mt-4" title={t('screens.credentialIssuerDefinitionForm.saveConfigurationTitle')}>
                        <TextInputWithLabel className="mb-3"
                                            label={t('screens.credentialIssuerDefinitionForm.attributes.name.label')}
                                            placeHolder={t('screens.credentialIssuerDefinitionForm.attributes.name.placeHolder')}
                                            value={credentialIssuerDefinitionForm.form?.name}
                                            onChangeValue={(value) => handleFormUpdate('name', value)}/>
                        <TextInputWithLabel className="mb-3"
                                            multiline={true}
                                            label={t('screens.credentialIssuerDefinitionForm.attributes.description.label')}
                                            value={credentialIssuerDefinitionForm.form?.description}
                                            placeHolder={t('screens.credentialIssuerDefinitionForm.attributes.description.placeHolder')}
                                            onChangeValue={(value) => handleFormUpdate('description', value)}/>
                        <TextInputWithLabel className="mb-3"
                                            label={t('screens.credentialIssuerDefinitionForm.attributes.externalKey.label')}
                                            placeHolder={t('screens.credentialIssuerDefinitionForm.attributes.externalKey.placeHolder')}
                                            value={credentialIssuerDefinitionForm.form?.externalKey}
                                            onChangeValue={(value) => handleFormUpdate('externalKey', value)}
                                            footer={<Button className="pl-2 text-xs" label={credentialIssuerDefinitionForm.form?.openIdCredentialIssuerUrl} link
                                                            onClick={() => window.open(credentialIssuerDefinitionForm.form?.openIdCredentialIssuerUrl, '_blank')} style={{color: 'rgba(28, 28, 28, 0.40)', border: 'none', boxShadow: 'none'}}/>}/>

                        <div style={{border: 'none', borderRadius: 16, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 14, backgroundColor: '#ffffff'}}>
                            <div className="text-xs pb-1 pl-2" style={{color: 'rgba(28, 28, 28, 0.40)'}}>{t('screens.credentialIssuerDefinitionForm.languageTitle')}</div>
                            <LanguageInput className="mb-2 w-full" placeHolder={t('screens.credentialIssuerDefinitionForm.languagePlaceHolder')} selectedLocales={selectedLanguages} onLocalesSelected={languages => handleLanguagesUpdate(languages)}/>
                        </div>
                    </OCard>

                    {credentialIssuerDefinitionForm.form?.displays?.map((display, index) => (
                        <CredentialIssuerDisplayInput key={index} credentialIssuerDisplay={display} onChangeCredentialIssuerDisplay={(display) => {
                            dispatch(updateCredentialIssuerDisplay(display));
                        }}/>
                    ))
                    }
                </TabPanel>
                <TabPanel header="Credential Templates" disabled={!isValidForm}>
                    <CredentialIssuerCredentialListView credentialIssuerDefinitionForm={credentialIssuerDefinitionForm.form}/>
                    {/*{credentialIssuerDefinitionForm.form?.credentialDefinitions?.map((credentialDefinition, index) => (*/}
                    {/*    <div key={index}>*/}
                    {/*        {credentialDefinition?.displays?.map((credentialIssuerCredentialDisplay, index) => (*/}
                    {/*            <CredentialIssuerCredentialDisplayInput key={index} locale={credentialIssuerCredentialDisplay.locale} credentialIssuerCredentialDisplays={credentialDefinition.displays!} credentialIssuerCredentialDefinition={credentialDefinition} credentialIssuerDefinition={credentialIssuerDefinitionForm.form!}/>*/}
                    {/*            ))}*/}
                    {/*    </div>*/}
                    {/*))*/}
                    {/*}*/}
                </TabPanel>
            </TabView>
            <OFabContainer className="w-full">
                <Button label={t('generic.cancel')} severity="secondary" size="small" className="w-max" onClick={onCancel}/>
                <Button label="Save configuration" size="small" className="w-max" onClick={onSaveConfiguration} disabled={!(isValidForm && credentialIssuerDefinitionForm.dirty)}/>
            </OFabContainer>
        </div>
    );
}
