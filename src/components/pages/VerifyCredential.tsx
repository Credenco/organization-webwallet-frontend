import * as React from 'react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { DataView } from 'primereact/dataview';
import { Credential, useAppDispatch, userSelector } from '../../state';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import { CredentialCard } from '../molecules';
import { Button } from 'primereact/button';
import { acceptPresentationRequest, exchangeSelector, resolvePresentationOffer } from '../../state/slices/exchange';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';


export const VerifyCredential: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const [selectedCredentials, setSelectedCredentials ] = useState<number[]>([]);
    const [accepted, setAccepted ] = useState<boolean>(false);
    const toast = useRef<Toast>(null);
    const location = useLocation();
    let navigate = useNavigate();
    let exchangeState = useSelector(exchangeSelector);

    let user = useSelector(userSelector).singleItem;

    useEffect(() => {
        if (user?.locale) {
            dispatch(resolvePresentationOffer({
                jwtToken: keycloak.token!,
                presentationOfferUrl: "openid4vp://authorize" + location.search,
                locale: user?.locale
            }));
        }
    }, [keycloak.token, user?.locale]);

    function onAccept() {
        if (selectedCredentials?.length) {
            dispatch(acceptPresentationRequest({jwtToken: keycloak.token!, presentationRequest: exchangeState.singleItem?.presentationRequest, selectedCredentials: selectedCredentials, locale: user?.locale})).then((response) => {
                if (response.type.includes('fulfilled')) {
                    setAccepted(true);
                    if (response.payload) {
                        window.location.href = response.payload;
                    } else {
                        toast.current?.show({severity:'success', summary: t('screens.verifyCredentials.successSummary'), detail:t('screens.verifyCredentials.successDetail'), life: 3000});
                    }
                }
            });
        }
    }

    function onReject() {
        navigate('/')
    }

    function handleSelectCredential(credential: Credential) {
        let index = selectedCredentials?.indexOf(credential.id);
        if (index >= 0) {
            selectedCredentials?.splice(index, 1);
        } else {
            selectedCredentials?.push(credential.id);
        }
        console.log(selectedCredentials);
        setSelectedCredentials(Object.assign([], selectedCredentials));
    }

    function isSelected(credential: Credential) {
        return selectedCredentials?.indexOf(credential.id) >= 0;
    }

    const itemTemplate = (credential: any): ReactNode => {
        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 pr-3 pb-2">
                <CredentialCard credential={credential} key='{index}' onClick={handleSelectCredential} selected={isSelected(credential)}/>
            </div>
        );
    };

    return (
        exchangeState.singleItem ? <div>
            <h1>{t('screens.verifyCredentials.title')}</h1>
            <p>{t('screens.verifyCredentials.intro', {verifierHost: exchangeState.singleItem?.verifierHost})}</p>
            <p>{exchangeState.singleItem?.presentationDefinition?.purpose}</p>
            <Toast ref={toast} />
            <DataView
                value={exchangeState.singleItem?.matchedCredentials}
                layout='grid'
                itemTemplate={itemTemplate}
                emptyMessage={t('screens.verifyCredentials.noMatchingCredentials')}
                rows={exchangeState.singleItem?.matchedCredentials.length}
                totalRecords={exchangeState.singleItem?.matchedCredentials}/>

            { !accepted ? <div className="flex gap-1">
                <Button severity="info" outlined onClick={onReject}>{t('generic.reject')}</Button>
                <Button onClick={onAccept}>{t('generic.accept')}</Button>
            </div> : <></> }
        </div> : <div></div>
    );
}
