import * as React from 'react';
import { FC, ReactNode, useEffect, useState } from 'react';

import { DataView } from 'primereact/dataview';
import { useAppDispatch, userSelector } from '../../state';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import { Did, didSelector, getDids } from '../../state/slices/did';
import { CredentialTypeCard, DidSelectList } from '../molecules';
import { Button } from 'primereact/button';
import { acceptOfferRequest, exchangeSelector, resolveCredentialOffer } from '../../state/slices/exchange';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const IssueCredential: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const [selectedDid, setSelectedDid ] = useState<Did>();
    const [accepted, setAccepted ] = useState<boolean>();

    const location = useLocation();
    let navigate = useNavigate();
    let exchangeState = useSelector(exchangeSelector);

    let dids = useSelector(didSelector);
    let user = useSelector(userSelector).singleItem;

    useEffect(() => {
        dispatch(getDids({jwtToken: keycloak.token!}));
        if (user?.locale) {
            dispatch(resolveCredentialOffer({
                jwtToken: keycloak.token!,
                credentialOfferUrl: "openid-initiate-issuance://" + location.search,
                locale: user?.locale
            }));
        }
    }, [keycloak.token, user?.locale]);

    useEffect(() => {
        if (dids && dids.list && dids.list.length > 0) {
            setSelectedDid(dids.list.at(0));
        }
    }, [dids.list]);

    function onAccept() {
        if (selectedDid) {
            dispatch(acceptOfferRequest({jwtToken: keycloak.token!, didId: selectedDid.id, credentialOfferUrl: "openid-initiate-issuance://" + location.search, locale: user?.locale})).then((response) => {
                if (response.type.includes('fulfilled')) {
                    setTimeout(() => { // Use timeout the give time to update the redux store.
                        navigate('/')
                    }, 250);
                }
            });
        }
    }

    function onReject() {
        navigate('/')
    }

    const itemTemplate = (credentialType: any): ReactNode => {
        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 pr-3 pb-2">
                <CredentialTypeCard credentialType={credentialType} key='{index}'/>
            </div>
        );
    };

    function onSelectItem(did: Did) {
        setSelectedDid(did);
    }

    return (
        exchangeState.list.length > 0 ? <div>
            <h1>{t('screens.issueCredentials.title')}</h1>
            <p>{t('screens.issueCredentials.intro', {issuer: exchangeState.list.at(0).issuerDisplay?.name})}</p>

            <DataView className="p-0" value={exchangeState.list} layout='grid' itemTemplate={itemTemplate}/>

            {(dids && dids.list && dids.list.length > 1) && (
                <div className="p-0 mt-2 mb-5">
                    {t('screens.issueCredentials.issueTo')} <DidSelectList didList={dids.list} selectedDid={selectedDid} onSelect={onSelectItem}/>
                </div>
            )}


            <div className="flex gap-1">
                <Button severity="info" outlined onClick={onReject}>{t('generic.reject')}</Button>
                <Button onClick={onAccept}>{t('generic.accept')}</Button>
            </div>
        </div> : <div></div>
    );
}
