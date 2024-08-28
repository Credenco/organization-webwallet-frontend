import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { formatDateForDisplay, formatDateTimeForDisplay, getIssuedCredential, issuedCredentialSelector, useAppDispatch, userSelector } from '../../state';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { CredentialCard, OCard } from '../molecules';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { OH3 } from '../atoms/texts/OH3';
import { OFieldLabel, OFieldValue } from '../atoms';
import { useTranslation } from 'react-i18next';

export const IssuedCredentialDetails: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const {issuedCredentialId} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isVisible, setIsVisible] = useState<boolean>();
    let navigate = useNavigate();

    let issuedCredential = useSelector(issuedCredentialSelector);
    let user = useSelector(userSelector).singleItem;

    useEffect(() => {
        if (issuedCredentialId) {
            dispatch(getIssuedCredential({jwtToken: keycloak.token!, issuedCredentialId: issuedCredentialId, locale: user?.locale}));
        }
    }, [keycloak.token, issuedCredentialId, user?.locale]);


    function getDisplayLabel(attr: string) {
        if ((issuedCredential.singleItem?.displayProperties?.credentialSubjectDisplay === undefined) || (issuedCredential.singleItem?.displayProperties?.credentialSubjectDisplay[attr] === undefined)) {
            return attr.charAt(0).toUpperCase() + attr.slice(1).replace('-', ' ');
        }
        // @ts-ignore
        return issuedCredential.singleItem?.displayProperties?.credentialSubjectDisplay[attr]?.name ?? attr.charAt(0).toUpperCase() + attr.slice(1).replace('-', ' ');
    }

    function formatDate(value: any) {
        if (Date.parse(value) > 0) {
            return new String(value).length > 10 ? formatDateTimeForDisplay(value) : formatDateForDisplay(value);
        }
        return value;
    }

    if (issuedCredential?.singleItem?.credentialSubject === undefined) {
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
                <pre>{issuedCredential.singleItem ? JSON.stringify(issuedCredential.singleItem?.document, null, 2) : "No issuedCredential"}</pre>
            </Dialog>

            {issuedCredential.singleItem && (
                <div className="mr-2">
                    <ConfirmDialog/>
                    <OCard className="mb-4">
                        <div className="flex justify-content-between align-items-start">
                            <CredentialCard credential={issuedCredential.singleItem!} key='{index}' scaleFactor={.7} className="col-12"/>
                        </div>
                    </OCard>
                    <OCard className="mb-4">
                        <div className="formgrid ">
                            <OH3 className="mb-4">{t('screens.issuedCredentialDetail.title')}</OH3>
                            {issuedCredential.singleItem && getAttributes('', issuedCredential.singleItem?.credentialSubject)
                                .filter((attr) => attr.attributeName !== 'id')
                                .map((attr, index) => (
                                    <div className="field grid" key={index}>
                                        <OFieldLabel className="col-4">{getDisplayLabel(attr.attributeName)}</OFieldLabel>
                                        <OFieldValue className="col-8">{attr.value}</OFieldValue>
                                    </div>
                                ))}
                            {(issuedCredential.singleItem?.issuanceDate) && (
                                <div className="field grid">
                                    <OFieldLabel className="col-4">{t('screens.issuedCredentialDetail.issuanceDate')}</OFieldLabel>
                                    <OFieldValue className="col-8">{new String(issuedCredential.singleItem?.issuanceDate)}</OFieldValue>
                                </div>
                            )}
                        </div>
                    </OCard>
                    <OCard className="mb-4">
                        <div>
                            <OH3 className="mb-4">{t('screens.issuedCredentialDetail.issuer')}</OH3>
                            <div className="field grid">
                                <OFieldLabel className="col-4">{t('screens.issuedCredentialDetail.issuer')}</OFieldLabel>
                                <OFieldValue className="col-8">{issuedCredential.singleItem?.displayProperties?.issuerDisplay?.name}</OFieldValue>
                            </div>
                            <div className="field grid">
                                <OFieldLabel className="col-4">{t('screens.issuedCredentialDetail.credentialType')}</OFieldLabel>
                                <OFieldValue className="col-8">{issuedCredential.singleItem?.displayProperties?.credentialTypeDisplay?.name}</OFieldValue>
                            </div>
                            {(issuedCredential.singleItem?.displayProperties?.credentialTypeDisplay?.description) && (
                                <div className="field grid">
                                    <OFieldLabel className="col-4">{t('screens.issuedCredentialDetail.credentialTypeDescription')}</OFieldLabel>
                                    <OFieldValue className="col-8">{issuedCredential.singleItem?.displayProperties?.credentialTypeDisplay?.description}</OFieldValue>
                                </div>
                            )}
                        </div>
                    </OCard>
                    {issuedCredential.singleItem?.termsOfUse && issuedCredential.singleItem?.termsOfUse.length > 0 ?
                        <OCard className="mb-4">
                            <OH3 className="mb-4">{t('screens.issuedCredentialDetail.termsOfUse.title')}</OH3>
                            {issuedCredential.singleItem?.termsOfUse?.map((item) => <div>
                                <div className="field grid">
                                    <OFieldLabel className="col-4">{t('screens.issuedCredentialDetail.termsOfUse.id')}</OFieldLabel>
                                    <OFieldValue className="col-8">{item.id}</OFieldValue>
                                </div>
                                <div className="field grid">
                                    <OFieldLabel className="col-4">{t('screens.issuedCredentialDetail.termsOfUse.type')}</OFieldLabel>
                                    <OFieldValue className="col-8">{item.type}</OFieldValue>
                                </div>
                            </div>)}
                        </OCard> : <></>}
                    <div className="grid">
                        <Button className="m-2" label="Show" icon="pi pi-external-link" onClick={() => setIsVisible(true)}/>
                    </div>
                </div>

            )}
        </>
    );
};
