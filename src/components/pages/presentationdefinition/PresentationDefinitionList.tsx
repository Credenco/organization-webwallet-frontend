import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import { DataViewPageEvent } from 'primereact/dataview';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useAppDispatch } from '../../../state';
import { getPresentationDefinitions, presentationDefinitionSelector } from '../../../state/slices/presentationdefinition';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TableHeader } from '../../organisms';
import { useTranslation } from 'react-i18next';
import { setPresentationDefinitionForm } from '../../../state/slices/presentationdefinitionform';


export const PresentationDefinitionList: FC = () => {
    const dispatch = useAppDispatch();
    const {keycloak, initialized} = useKeycloak();
    let navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const {t} = useTranslation();

    let presentationDefinitions = useSelector(presentationDefinitionSelector);

    const initialParams: DataViewPageEvent = {
        first: 0,
        rows: 10,
        page: 0,
        pageCount: 1
    };

    const [tableParams, setTableParams] = useState<DataViewPageEvent>(initialParams);

    useEffect(() => {
        dispatch(getPresentationDefinitions({jwtToken: keycloak.token!, page: tableParams.page, pageSize: (tableParams.rows), searchText: searchText}));
    }, [keycloak.token, tableParams.page, tableParams.rows, searchText]);

    useEffect(() => {
        setTableParams({...tableParams, pageCount: presentationDefinitions.totalPages});
    }, [presentationDefinitions.totalPages]);


    function handleRequest() {
        navigate(`/credential/new`)
    }

    function handleSelectCredential(credential: Credential) {
        navigate(`/credential/details/${credential.id}`)
    }

    function onPageChange(paginatorPageChangeEvent: PaginatorPageChangeEvent) {
        setTableParams({...tableParams, page: paginatorPageChangeEvent.page, rows: paginatorPageChangeEvent.rows});
    }

    function onRowSelect(event: DataTableSelectEvent) {
        navigate('/presentationDefinition/edit/' + event.data.id);
    }

    function createNew() {
        dispatch(setPresentationDefinitionForm({}));
        navigate('/presentationDefinition/new');
    }

    function onSearch(searchText: string | undefined) {
        setSearchText(searchText);
    }

    return (
        <>
            <div>
                <div className="font-semibold pt-4 pb-4">{t('screens.presentationDefinitionList.title')}</div>
                <DataTable header={<TableHeader
                    onAddClicked={createNew}
                    onSearch={onSearch}
                />}
                           value={presentationDefinitions.list}
                           rows={10}
                           rowsPerPageOptions={[10, 20, 30]}
                           tableStyle={{minWidth: '50rem'}}
                           selectionMode="single"

                           onRowSelect={onRowSelect}
                           rowHover={true}
                           onSelectionChange={(e) => setSelectedItem(e.value)}>
                    <Column field="name" header="Name" style={{width: '25%'}}></Column>
                    <Column field="description" header="Description" style={{width: '50%'}}></Column>
                    <Column field="externalKey" header="Technical key" style={{width: '20%'}}></Column>
                </DataTable>
                {((presentationDefinitions.list.length > 0) && (presentationDefinitions.totalPages > 1)) && (
                    <div className="flex justify-content-end">
                        <Paginator first={presentationDefinitions.currentPage * tableParams.rows} rows={tableParams.rows} totalRecords={presentationDefinitions.totalElements} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange}/>
                    </div>
                )}
            </div>
        </>
    );
}
