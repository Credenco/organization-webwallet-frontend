import * as React from 'react';
import { FC, ReactNode, useEffect, useState } from 'react';

import { DataView, DataViewPageEvent } from 'primereact/dataview';
import { getUserPreferenceWithDefault, useAppDispatch, userSelector } from '../../state';
import { useKeycloak } from '@react-keycloak/web';

import { getCredentialTypes } from '../../state/slices/credentialtype/CredentialTypeApi';
import { credentialTypeSelector } from '../../state/slices/credentialtype/CredentialTypeSelectors';
import { CredentialTypeCard, OPaginator, SearchEntry } from '../molecules';
import { CredentialType } from '../../state/slices/credentialtype';
import { useSelector } from 'react-redux';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useTranslation } from 'react-i18next';

export interface SearchCredentialTypeViewProps {
    className?: string | undefined;
    searchTitle: string;
    searchPlaceHolder?: string;
    onRequestCredentialClicked?: (credentialType: CredentialType) => void;
    onCredentialSelected?: (credentialType: CredentialType, selected: boolean) => void;
    selectedCredentialTypes?: CredentialType[];
    showSelectionCheckboxes?: boolean;
    userPreferencesKey: string;
}

export const SearchCredentialTypeView: FC<SearchCredentialTypeViewProps> = (props) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const [searchText, setSearchText] = useState<string>();
    let user = useSelector(userSelector).singleItem;

    const {showSelectionCheckboxes = false} = props;

    const initialParams: DataViewPageEvent = {
        first: 0,
        rows: Number(getUserPreferenceWithDefault(user, props.userPreferencesKey + '.pageSize', "10")),
        page: 0,
        pageCount: 1
    };

    let credentialTypes = useSelector(credentialTypeSelector);

    const [tableParams, setTableParams] = useState<DataViewPageEvent>(initialParams);

    useEffect(() => {
        dispatch(getCredentialTypes({jwtToken: keycloak.token!, locale: user?.locale, page: tableParams.page, pageSize: (tableParams.rows), searchText: searchText}));
    }, [keycloak.token, user?.locale, tableParams.page, tableParams.rows, searchText]);

    useEffect(() => {
        const pageSize = Number(getUserPreferenceWithDefault(user, props.userPreferencesKey + '.pageSize', "10"));
        if (pageSize !== tableParams.rows) {
            setTableParams({...tableParams, rows: pageSize});
        }
    }, [user?.userPreferences]);


    useEffect(() => {
        setTableParams({...tableParams, pageCount: credentialTypes.totalPages});
    }, [credentialTypes.totalPages]);


    function onSearch(searchText: string | undefined) {
        setTableParams({...tableParams, page: 0});
        setSearchText(searchText);
    }

    function onPageChange(paginatorPageChangeEvent: PaginatorPageChangeEvent) {
        setTableParams({...tableParams, page: paginatorPageChangeEvent.page, rows: paginatorPageChangeEvent.rows});
    }

    const itemTemplate = (credentialType: any): ReactNode => {
        const selected = (props.selectedCredentialTypes !== undefined) ?
            (props.selectedCredentialTypes?.findIndex((selectedCredentialType) => ((selectedCredentialType.credentialConfigurationId === credentialType.credentialConfigurationId) && (selectedCredentialType.credentialTypeConfigurationUrl === credentialType.credentialTypeConfigurationUrl)))) > -1 :
            false;
        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 xxl:col-2 pr-3 pb-5">
                <CredentialTypeCard credentialType={credentialType} key='{index}' onRequestCredentialClicked={props.onRequestCredentialClicked} onSelectionChanged={props.onCredentialSelected} selected={selected}
                                    showSelectionCheckbox={showSelectionCheckboxes}/>
            </div>
        );
    };

    return (
        <div className={"flex flex-column " + props.className}>
            <SearchEntry title={props.searchTitle}
                         placeHolder={props.searchPlaceHolder}
                         onSearch={onSearch} className="mb-4"/>
            <DataView
                value={credentialTypes.list}
                layout='grid'
                itemTemplate={itemTemplate}
                emptyMessage={t('screens.credentialList.searchNoCredentialsFound')}
                rows={credentialTypes.list.length}
                totalRecords={credentialTypes.totalElements}/>
            {((credentialTypes.list.length > 0) && (credentialTypes.totalPages > 1)) && (
                <div className="flex justify-content-end">
                    <OPaginator first={credentialTypes.currentPage * tableParams.rows} rows={tableParams.rows} totalRecords={credentialTypes.totalElements} onPageChange={onPageChange} userPreferencesKey={props.userPreferencesKey}/>
                </div>
            )}

        </div>

    );
}
