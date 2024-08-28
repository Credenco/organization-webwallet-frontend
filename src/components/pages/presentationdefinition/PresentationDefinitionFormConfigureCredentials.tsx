import * as React from 'react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../state';
import { InfoCard, OCard, OFabContainer, TextInputWithLabel } from '../../molecules';
import { useTranslation } from 'react-i18next';
import { Receive } from '../../atoms/icons/Receive';
import { presentationDefinitionFormSelector, setPresentationDefinitionForm } from '../../../state/slices/presentationdefinitionform';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { savePresentationDefinition } from '../../../state/slices/presentationdefinition';
import { Dialog } from 'primereact/dialog';
import { isValidUrl } from '../../../utils';

export const PresentationDefinitionFormConfigureCredentials: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>();
    const {keycloak, initialized} = useKeycloak();
    let navigation = useNavigate();
    let presentationDefinitionForm = useSelector(presentationDefinitionFormSelector);

    useEffect(() => {
        if (presentationDefinitionForm.form?.externalKey !== undefined) {
            handleFormUpdate("externalKey", presentationDefinitionForm.form?.externalKey.replace(" ", "_").replace(/[^a-zA-Z0-9_-]/g, ''));
        }
    }, [presentationDefinitionForm.form?.externalKey]);

    const isValidForm = useMemo(() => {
        if (presentationDefinitionForm.form?.credentialTypes === undefined || presentationDefinitionForm.form?.credentialTypes.length === 0) {
            return false;
        }
        if (presentationDefinitionForm.form?.name === undefined || presentationDefinitionForm.form?.name === '') {
            return false;
        }
        if (presentationDefinitionForm.form?.purpose === undefined || presentationDefinitionForm.form?.purpose === '') {
            return false;
        }
        if (presentationDefinitionForm.form?.externalKey === undefined || presentationDefinitionForm.form?.externalKey === '') {
            return false;
        }
        if (!isValidUrl(presentationDefinitionForm.form?.successRedirectUrl!)) {
            return false
        }
        if (!isValidUrl(presentationDefinitionForm.form?.errorRedirectUrl!)) {
            return false
        }
        if (presentationDefinitionForm.form?.clientUrl === undefined || presentationDefinitionForm.form?.clientUrl === '') {
            return false;
        }
        if (!isValidUrl(presentationDefinitionForm.form?.clientUrl!)) {
            return false
        }
        return true;
    }, [presentationDefinitionForm.form]);

    function handleFormUpdate(attributeName: string, value: string | undefined) {
        dispatch(setPresentationDefinitionForm(Object.assign({}, presentationDefinitionForm.form, {[attributeName]: value})));
    }

    function onCancel() {
        navigation('/presentationDefinition');
    }

    function onSaveConfiguration() {
        dispatch(savePresentationDefinition({jwtToken: keycloak.token!, presentationDefinition: presentationDefinitionForm.form!})).then((response) => {
            if (response.type.includes('fulfilled')) {
                setTimeout(() => { // Use timeout the give time to update the redux store.
                    navigation('/presentationDefinition/test/' + response.payload.id);
                }, 250);
            }
        });

    }

    return (
        <div className="pb-8 mb-8">
            <InfoCard className="mt-4" icon={<Receive height="30" width="30"/>}
                      title={t('screens.presentationDefinitionFormConfigureCredentials.intro.title')}
                      description={t('screens.presentationDefinitionFormConfigureCredentials.intro.description')}/>
            <OCard className="mt-4" title={t('screens.presentationDefinitionFormConfigureCredentials.saveConfigurationTitle')}>
                <TextInputWithLabel className="mb-3"
                                    label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.name.label')}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.name.placeHolder')}
                                    value={presentationDefinitionForm.form?.name}
                                    onChangeValue={(value) => handleFormUpdate('name', value)}/>
                <TextInputWithLabel className="mb-3"
                                    multiline={true}
                                    label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.description.label')}
                                    value={presentationDefinitionForm.form?.description}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.description.placeHolder')}
                                    onChangeValue={(value) => handleFormUpdate('description', value)}/>
                <TextInputWithLabel className="mb-3"
                                    label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.purpose.label')}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.purpose.placeHolder')}
                                    value={presentationDefinitionForm.form?.purpose}
                                    onChangeValue={(value) => handleFormUpdate('purpose', value)}/>
            </OCard>
            <OCard className="mt-4" title={t('screens.presentationDefinitionFormConfigureCredentials.technicalConfigurationTitle')}>
                <TextInputWithLabel className="mb-3"
                                    label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.externalKey.label')}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.externalKey.placeHolder')}
                                    value={presentationDefinitionForm.form?.externalKey}
                                    onChangeValue={(value) => handleFormUpdate('externalKey', value)}/>
                <TextInputWithLabel className="mb-3"
                                    label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.successRedirectUrl.label')}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.successRedirectUrl.placeHolder')}
                                    inputType="url"
                                    value={presentationDefinitionForm.form?.successRedirectUrl}
                                    onChangeValue={(value) => handleFormUpdate('successRedirectUrl', value)}/>
                <TextInputWithLabel className="mb-3"
                                    label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.errorRedirectUrl.label')}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.errorRedirectUrl.placeHolder')}
                                    inputType="url"
                                    value={presentationDefinitionForm.form?.errorRedirectUrl}
                                    onChangeValue={(value) => handleFormUpdate('errorRedirectUrl', value)}/>
                <TextInputWithLabel label={t('screens.presentationDefinitionFormConfigureCredentials.attributes.clientUrl.label')}
                                    placeHolder={t('screens.presentationDefinitionFormConfigureCredentials.attributes.clientUrl.placeHolder')}
                                    inputType="url"
                                    value={presentationDefinitionForm.form?.clientUrl}
                                    onChangeValue={(value) => handleFormUpdate('clientUrl', value)}/>

            </OCard>
            <Dialog header="Presentation definition document" visible={isDialogVisible} style={{ width: '50vw' }} onHide={() => setIsDialogVisible(false)}>
                <p className="m-0">
                    <pre>{ presentationDefinitionForm.form?.pdDocument ? JSON.stringify(presentationDefinitionForm.form?.pdDocument, null, 2) : "No presentation definition" }</pre>
                </p>
            </Dialog>
            {presentationDefinitionForm.form?.pdDocument ? <Button className="mt-4" label="Show definition" icon="pi pi-external-link" onClick={() => setIsDialogVisible(true)} /> : <></> }

            <OFabContainer className="w-full">
                <Button label={t('generic.cancel')} severity="secondary" size="small" className="w-max" onClick={onCancel}/>
                <Button label="Save configuration" size="small" className="w-max" onClick={onSaveConfiguration} disabled={!isValidForm}/>
            </OFabContainer>
        </div>
    );
}
