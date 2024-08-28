import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../state';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { addService, getDid, updateDid } from '../../state/slices/did/DidApi';
import { didSelector } from '../../state/slices/did/DidSelectors';
import { ProgressBar } from 'primereact/progressbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { OCard, TextInputWithLabel } from '../molecules';
import { Key, OFieldLabel, OFieldValue } from '../atoms';
import { InfoCard } from '../molecules/InfoCard';
import { DropdownWithLabel } from '../molecules/DropdownWithLabel';
import { useTranslation } from 'react-i18next';

export const DidDetails: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const {didId} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isVisible, setIsVisible] = useState<boolean>();
    const [isEditing, setIsEditing] = useState<boolean>();
    let navigate = useNavigate();
    const serviceTypes = [
        { label: 'eInvoice', type: 'eInvoice'},
        { label: 'Linked Verifiable Presentation', type: 'LinkedVerifiablePresentation' },
        { label: 'Credential Issuer', type: 'Oidc4Vci' }
    ];
    const ebsiEnvironments = [
        { label: 'Conformance', optionValue: 'conformance' },
        { label: 'Pilot', optionValue: 'pilot' },
    ];
    const [selectedServiceType, setSelectedServiceType] = useState<any>(serviceTypes[0]);
    const [serviceEndpoint, setServiceEndpoint] = useState<any>('');
    const [serviceId, setServiceid] = useState<any>('');

    let did = useSelector(didSelector);
    useEffect(() => {
        if (didId) {
            dispatch(getDid({jwtToken: keycloak.token!, didId: didId}));
        }
    }, [keycloak.token, didId]);

    function onSelectItem(serviceType: any) {
        setSelectedServiceType(serviceType);
    }

    function handleFormUpdate(attributeName: string, value: string | undefined) {
        //setDidForm(Object.assign({}, didForm, {[attributeName]: value}));
    }

    function handleSaveServiceEndpoint() {
        setIsLoading(true)
        dispatch(addService({jwtToken: keycloak.token!, didId: didId!, serviceId: serviceId, serviceType: selectedServiceType.type, serviceEndpoint: serviceEndpoint})).then((response) => {
            setIsLoading(false);
            if (response.type.includes('fulfilled')) {
                setIsEditing(false);
                dispatch(getDid({jwtToken: keycloak.token!, didId: didId!}));
            }
        });
    }

    function handleUpdate() {
        setIsLoading(true)
        dispatch(updateDid({jwtToken: keycloak.token!, didId: didId!})).then((response) => {
            setIsLoading(false);
            if (response.type.includes('fulfilled')) {
                navigate(`/did`)
            }
        });
    }

    return (
        <>
            {isLoading ? <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar> : <></>}
            <div>
                <InfoCard title={t('screens.settings.did.title')} description={t('screens.settings.did.description')} icon={<Key />} className={"mt-5"} />

                <OCard className="mt-5 mb-4">
                    <div className="field grid">
                        <OFieldLabel className="col-2">{t('screens.settings.did.attributes.didId.label')}</OFieldLabel>
                        <OFieldValue className="col-10">{did.singleItem?.did}</OFieldValue>
                    </div>
                    <div className="field grid">
                        <OFieldLabel className="col-2">{t('screens.settings.did.attributes.type.label')}</OFieldLabel>
                        <OFieldValue className="col-10">{did.singleItem?.type}</OFieldValue>
                    </div>
                    <div className="field grid">
                        <OFieldLabel className="col-2">{t('screens.settings.did.attributes.displayName.label')}</OFieldLabel>
                        <OFieldValue className="col-10">{did.singleItem?.displayName}</OFieldValue>
                    </div>
                </OCard>

                <OCard title={t('screens.settings.did.services')} className="mt-5 mb-4">
                    {did.singleItem?.services?.map((item) => <div>
                        <div className="field grid">
                            <OFieldLabel className="col-2">{t('screens.settings.did.attributes.serviceId.label')}</OFieldLabel>
                            <OFieldValue className="col-10">{item.serviceId}</OFieldValue>
                        </div>
                        <div className="field grid">
                            <OFieldLabel className="col-2">{t('screens.settings.did.attributes.serviceType.label')}</OFieldLabel>
                            <OFieldValue className="col-10">{item.serviceType}</OFieldValue>
                        </div>
                        <div className="field grid">
                            <OFieldLabel className="col-2">{t('screens.settings.did.attributes.serviceEndpoint.label')}</OFieldLabel>
                            <OFieldValue className="col-10">{item.serviceEndpoint}</OFieldValue>
                        </div>
                        <hr />
                    </div>)}
                    {did.singleItem?.type === 'ebsi' && !isEditing ? <Button className="m-1" label="Add service" onClick={() => setIsEditing(true)} raised/>: <></> }
                </OCard>

                {isEditing ? <OCard className="mt-5 mb-4">
                    <TextInputWithLabel className="mb-3"
                                        label={t('screens.settings.did.attributes.serviceId.label')}
                                        placeHolder={t('screens.settings.did.attributes.serviceId.placeHolder')}
                                        value={serviceId}
                                        onChangeValue={(value) => setServiceid(value)}/>
                    <DropdownWithLabel label={t('screens.settings.did.attributes.serviceType.label')} className="mb-3"
                                       value={selectedServiceType} onChangeValue={(e) => onSelectItem(e)}
                                       options={serviceTypes} optionLabel='label'/>
                    <TextInputWithLabel className="mb-3"
                                        label={t('screens.settings.did.attributes.serviceEndpoint.label')}
                                        placeHolder={t('screens.settings.did.attributes.serviceEndpoint.placeHolder')}
                                        value={serviceEndpoint}
                                        onChangeValue={(value) => setServiceEndpoint(value)}/>
                    <Button className="m-1" label="Cancel" onClick={() => setIsEditing(false)}/>
                    <Button className="m-1" label="Save" onClick={() => handleSaveServiceEndpoint()}/>
                </OCard> : <></> }


                <Dialog header="Document" visible={isVisible} style={{width: '50vw'}} onHide={() => setIsVisible(false)}>
                    <p className="m-0">
                        <pre>{did.singleItem ? JSON.stringify(did.singleItem?.document, null, 2) : "No DID"}</pre>
                    </p>
                </Dialog>
                <div className="grid pt-4">
                    <Button className="m-1" label="Show" icon="pi pi-external-link" onClick={() => setIsVisible(true)}/>
                    {/*<Button className="m-1" label="Update" onClick={handleUpdate} raised/>*/}
                </div>
            </div>
        </>
    );
};
