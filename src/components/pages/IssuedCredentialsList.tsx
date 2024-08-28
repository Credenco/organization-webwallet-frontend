import * as React from 'react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { DataView, DataViewPageEvent } from 'primereact/dataview';
import { CredentialCard } from '../molecules/CredentialCard';
import { Credential, getIssuedCredentials, getUserPreferenceWithDefault, issuedCredentialSelector, updateUserPreference, useAppDispatch, UserPreference, userSelector } from '../../state';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { EmptyWallet } from '../atoms';
import { EmptyCreateNewCredentialCard, OPaginator, SearchEntry } from '../molecules';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToggleButton } from 'primereact/togglebutton';
import { useTranslation } from 'react-i18next';


export const IssuedCredentialsList: FC = () => {
    const dispatch = useAppDispatch();
    const {keycloak, initialized} = useKeycloak();
    const {t} = useTranslation();
    let navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>();
    const [layout, setLayout] = useState<'list' | 'grid'>('grid');

    let issuedCredentials = useSelector(issuedCredentialSelector);
    let user = useSelector(userSelector).singleItem;
    const [tableParams, setTableParams] = useState<DataViewPageEvent>({
        first: 0,
        rows: Number(getUserPreferenceWithDefault(user, 'issuedCredentialList.pageSize', "10")),
        page: 0,
        pageCount: 1
    });

    useEffect(() => {
        dispatch(getIssuedCredentials({jwtToken: keycloak.token!, locale: user?.locale, page: tableParams.page, pageSize: (tableParams.rows), searchText: searchText}));
    }, [keycloak.token, user?.locale, tableParams.page, tableParams.rows, searchText, layout]);

    useEffect(() => {
        setLayout(getUserPreferenceWithDefault(user, 'issuedCredentialListLayout', "grid") as 'list' | 'grid');
        const pageSize = Number(getUserPreferenceWithDefault(user, 'issuedCredentialList.pageSize', "10"));
        if (pageSize !== tableParams.rows) {
            setTableParams({...tableParams, rows: pageSize});
        }
    }, [user?.userPreferences]);

    useEffect(() => {
        setTableParams({...tableParams, pageCount: issuedCredentials.totalPages});
    }, [issuedCredentials.totalPages]);

    function handleSetLayout(layout: 'list' | 'grid') {
        setLayout(layout);
        if (user !== undefined) {
            dispatch(updateUserPreference({
                jwtToken: keycloak.token!,
                locale: user?.locale,
                currentUserPreferences: user?.userPreferences,
                userPreferenceToUpdate: {preferenceKey: 'issuedCredentialListLayout', preferenceValue: layout} as UserPreference
            }));
        }
    }

    function handleSelectCredential(credential: Credential) {
        navigate(`/issuedCredential/details/${credential.id}`)
    }

    const gridItem = (credential: any): ReactNode => {
        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 pr-3 pb-2">
                {(Object.getOwnPropertyNames(credential).length > 0) && (
                    <CredentialCard credential={credential} key='{index}' onClick={handleSelectCredential}/>
                )}
            </div>
        );
    };


    function onSearch(searchText: string | undefined) {
        setTableParams({...tableParams, page: 0});
        setSearchText(searchText);
    }

    function onPageChange(paginatorPageChangeEvent: PaginatorPageChangeEvent) {
        setTableParams({...tableParams, page: paginatorPageChangeEvent.page, rows: paginatorPageChangeEvent.rows});
    }

    const showEmptyPage = useMemo(() => {
        if (issuedCredentials?.list?.length > 0) {
            return false;
        } else {
            return (searchText === undefined) || (searchText!.length === 0)
        }
        ;
    }, [issuedCredentials?.list, searchText]);


    const logoTemplate = (credential: Credential) => {
        if (credential.displayProperties?.credentialTypeDisplay?.logo?.url) {
            return (
                <img src={credential.displayProperties?.credentialTypeDisplay?.logo?.url} alt="{props.credential.displayProperties?.credentialTypeDisplay?.logo?.altText}" style={{
                    maxHeight: '30px',
                    maxWidth: '70px',
                    height: 'auto',
                    width: 'auto'
                }}/>
            )
        } else if (credential.displayProperties?.issuerDisplay?.logo?.url) {
            return (
                <img src={credential.displayProperties?.issuerDisplay?.logo?.url} alt="{props.credential.displayProperties?.issuerDisplay?.logo?.altText}" style={{
                    maxHeight: '30px',
                    maxWidth: '70px',
                    height: 'auto',
                    width: 'auto'
                }}/>
            )
        } else {
            return null;
        }
    };

    return (
        <>

            {(!showEmptyPage) && (
                <div>
                    <SearchEntry title={t('screens.issuedCredentialList.searchTitle')} onSearch={onSearch} className="mb-4"/>
                    <div className="flex justify-content-between">
                        <div className="font-semibold pb-4">{t('screens.issuedCredentialList.title')}</div>
                        <div>
                            <ToggleButton onIcon="pi pi-th-large" offIcon="pi pi-th-large" onLabel="" offLabel="" checked={layout === 'grid'} onChange={(e) => handleSetLayout('grid')}/>
                            <ToggleButton onIcon="pi pi-bars" offIcon="pi pi-bars" onLabel="" offLabel="" checked={layout === 'list'} onChange={(e) => handleSetLayout('list')}/>
                        </div>
                    </div>

                    {(layout === 'grid') && (
                        <DataView
                            className="mt-3"
                            value={issuedCredentials.list}
                            itemTemplate={gridItem}
                            emptyMessage={t('screens.issuedCredentialList.searchNoCredentialsFound')}
                            rows={issuedCredentials.list.length}
                            totalRecords={issuedCredentials.totalElements}/>
                    )}
                    {(layout === 'list') && (
                        <DataTable value={issuedCredentials.list} tableStyle={{minWidth: '50rem'}} selectionMode="single" onSelectionChange={(e) => {
                            // handleSelectCredential(e.value);
                        }}>
                            <Column header="" body={logoTemplate}></Column>
                            <Column header={t('screens.issuedCredentialList.issuer')} body={(credential) => credential.displayProperties?.issuerDisplay?.name}></Column>
                            <Column header={t('screens.issuedCredentialList.credentialType')} body={(credential) => credential.displayProperties?.credentialTypeDisplay?.name}></Column>
                            <Column header={t('screens.issuedCredentialList.issuanceDate')} body={(credential) => credential.issuanceDate}></Column>
                        </DataTable>
                    )}
                    {((issuedCredentials.list.length > 0) && (issuedCredentials.totalElements > 10)) && (
                        <div className="flex justify-content-end">
                            <OPaginator first={issuedCredentials.currentPage * tableParams.rows} rows={tableParams.rows} totalRecords={issuedCredentials.totalElements} onPageChange={onPageChange} userPreferencesKey="issuedCredentialList"/>
                        </div>
                    )}
                </div>
            )}
            {(showEmptyPage) && (
                <div className="flex align-items-center  flex-wrap flex-column md:mt-8 pt-8">
                    <EmptyWallet color="#cae6fc"/>
                    <div className="m-4 text-center max-w-25rem">{t('screens.issuedCredentialList.emptyListMessage')}</div>
                </div>
            )}
        </>
    );
}
