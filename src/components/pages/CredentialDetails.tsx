import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { credentialSelector, deleteCredential, formatDateForDisplay, formatDateTimeForDisplay, getCredential, useAppDispatch, userSelector } from '../../state';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { CredentialCard, OCard } from '../molecules';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { OH3 } from '../atoms/texts/OH3';
import { OFieldLabel, OFieldValue } from '../atoms';
import { useTranslation } from 'react-i18next';
import { Chip } from 'primereact/chip';

export const CredentialDetails: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const {credentialId} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isVisible, setIsVisible] = useState<boolean>();
    let navigate = useNavigate();

    let credential = useSelector(credentialSelector);
    let user = useSelector(userSelector).singleItem;

    useEffect(() => {
        if (credentialId) {
            dispatch(getCredential({jwtToken: keycloak.token!, credentialId: credentialId, locale: user?.locale}));
        }
    }, [keycloak.token, credentialId, user?.locale]);

    function handleDelete() {
        if (credentialId) {
            dispatch(deleteCredential({jwtToken: keycloak.token!, credentialId})).then((response) => {
                if (response.type.includes('fulfilled')) {
                    setTimeout(() => { // Use timeout the give time to update the redux store.
                        navigate(-1);
                    }, 250);
                }
            });
        }
    }

    const deleteConfirmDialog = () => {
        confirmDialog({
            header: t('screens.credentialDetails.deleteConfirmTitle'),
            message: t('screens.credentialDetails.deleteConfirmMessage'),
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: handleDelete,
            reject: () => {
            }
        });
    };

    function getDisplayLabel(attr: string) {
        if ((credential.singleItem?.displayProperties?.credentialSubjectDisplay === undefined) || (credential.singleItem?.displayProperties?.credentialSubjectDisplay[attr] === undefined)) {
            return attr.charAt(0).toUpperCase() + attr.slice(1).replace('-', ' ');
        }
        // @ts-ignore
        return credential.singleItem?.displayProperties?.credentialSubjectDisplay[attr]?.name ?? attr.charAt(0).toUpperCase() + attr.slice(1).replace('-', ' ');
    }

    function formatDate(value: any) {
        if (Date.parse(value) > 0) {
            return new String(value).length > 10 ? formatDateTimeForDisplay(value) : formatDateForDisplay(value);
        }
        return value;
    }

    if (credential?.singleItem?.credentialSubject === undefined) {
        return <></>;
    }
    const getAttributes = (attributeName: any, valueObj: any): { attributeName: string, value: any }[] => {

        if (typeof valueObj === 'object') {
            const x = Object.getOwnPropertyNames(valueObj)
                .flatMap(subValue => {
                    return getAttributes(subValue, valueObj[subValue]);
                    // @ts-ignore
                }).flat();
            return x;
        } else {
            return [{attributeName: attributeName, value: valueObj}]
        }
    };

    return (
        <>
            <Dialog header="Document" visible={isVisible} style={{width: '95vw'}} onHide={() => setIsVisible(false)}>
                <pre>{credential.singleItem ? JSON.stringify(credential.singleItem?.document, null, 2) : "No credential"}</pre>
            </Dialog>

            {credential.singleItem && (
                <div className="mr-2">
                    <ConfirmDialog/>
                    <OCard className="mb-4">
                        <div className="flex justify-content-between align-items-start">
                            <CredentialCard credential={credential.singleItem!} key='{index}' scaleFactor={.7} className="col-12"/>
                            <div className="flex flex-column justify-content-between" style={{height: "100px"}}>
                                <Chip className="align-self-center w-6" label={t('screens.credentialDetail.status.' + credential.singleItem.status)} style={{textAlign: 'center', backgroundColor: credential.singleItem.status === 'VALID' ? '#3B855D': '#E63946', color: '#FFFFFF'}}/>
                                <Button className="flex" label={t('generic.removeCredential')} onClick={deleteConfirmDialog} />
                            </div>
                        </div>
                    </OCard>
                    <OCard className="mb-4">
                        <div className="formgrid ">
                            <OH3 className="mb-4">{t('screens.credentialDetail.title')}</OH3>
                            {credential.singleItem && getAttributes('', credential.singleItem?.credentialSubject)
                                .filter((attr) => attr.attributeName !== 'id')
                                .map((attr, index) => (
                                    <div className="field grid" key={index}>
                                        <OFieldLabel className="col-4">{getDisplayLabel(attr.attributeName)}</OFieldLabel>
                                        <OFieldValue className="col-8">{attr.value}</OFieldValue>
                                    </div>
                                ))}
                            {(credential.singleItem?.issuanceDate) && (
                                <div className="field grid">
                                    <OFieldLabel className="col-4">{t('screens.credentialDetail.issuanceDate')}</OFieldLabel>
                                    <OFieldValue className="col-8">{new String(credential.singleItem?.issuanceDate)}</OFieldValue>
                                </div>
                            )}
                        </div>
                    </OCard>
                    <OCard className="mb-4">
                        <div>
                            <OH3 className="mb-4">{t('screens.credentialDetail.issuer')}</OH3>
                            <div className="field grid">
                                <OFieldLabel className="col-4">{t('screens.credentialDetail.issuer')}</OFieldLabel>
                                <OFieldValue className="col-8">{credential.singleItem?.displayProperties?.issuerDisplay?.name}</OFieldValue>
                            </div>
                            <div className="field grid">
                                <OFieldLabel className="col-4">{t('screens.credentialDetail.credentialType')}</OFieldLabel>
                                <OFieldValue className="col-8">{credential.singleItem?.displayProperties?.credentialTypeDisplay?.name}</OFieldValue>
                            </div>
                            {(credential.singleItem?.displayProperties?.credentialTypeDisplay?.description) && (
                                <div className="field grid">
                                    <OFieldLabel className="col-4">{t('screens.credentialDetail.credentialTypeDescription')}</OFieldLabel>
                                    <OFieldValue className="col-8">{credential.singleItem?.displayProperties?.credentialTypeDisplay?.description}</OFieldValue>
                                </div>
                            )}
                        </div>
                    </OCard>
                    {credential.singleItem?.termsOfUse && credential.singleItem?.termsOfUse.length > 0 ?
                    <OCard className="mb-4">
                        <OH3 className="mb-4">{t('screens.credentialDetail.termsOfUse.title')}</OH3>
                        {credential.singleItem?.termsOfUse?.map((item) => <div>
                            <div className="field grid">
                                <OFieldLabel className="col-4">{t('screens.credentialDetail.termsOfUse.id')}</OFieldLabel>
                                <OFieldValue className="col-8">{item.id}</OFieldValue>
                            </div>
                            <div className="field grid">
                                <OFieldLabel className="col-4">{t('screens.credentialDetail.termsOfUse.type')}</OFieldLabel>
                                <OFieldValue className="col-8">{item.type}</OFieldValue>
                            </div>
                        </div>)}
                    </OCard>:<></>}
                    <div className="grid">
                        <Button className="m-2" label="Show" icon="pi pi-external-link" onClick={() => setIsVisible(true)}/>
                    </div>
                </div>

            )}
        </>
    );
};
