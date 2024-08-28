import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../state';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { getDids } from '../../state/slices/did/DidApi';
import { didSelector } from '../../state/slices/did/DidSelectors';
import { DataView } from 'primereact/dataview';
import { DidCard } from '../molecules/DidCard';
import { Did } from '../../state/slices/did';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InfoCard } from '../molecules';
import { IdentificationCard } from '../atoms/icons/IdentificationCard';

export const DidList: FC = () => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const {keycloak, initialized} = useKeycloak();
    const [isLoading, setIsLoading] = useState<boolean>();
    let navigate = useNavigate();

    let dids = useSelector(didSelector);
    useEffect(() => {
        dispatch(getDids({jwtToken: keycloak.token!}));
    }, [keycloak.token]);

    function handleCreateDid() {
        navigate('/did/new');
    }

    function handleSelectDid(did: Did) {
        navigate(`/did/${did.id}`)
    }

    const itemTemplate = (did: any): ReactNode => {
        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 p-2">
                <DidCard did={did} key='{index}' onClick={handleSelectDid}/>
            </div>
        );
    };


    return (
        <>
            <div className="card">
                <InfoCard className="mb-4"
                          title={t('screens.settings.dids.title')}
                          description={t('screens.settings.dids.description')}
                          icon={<IdentificationCard width="40" height="40"/>} />

                <DataView value={dids.list} layout='grid' itemTemplate={itemTemplate}/>
                <Button className="p-2 m-2" onClick={handleCreateDid}>{t('screens.settings.dids.createDid')}</Button>
            </div>
        </>
    );
};
