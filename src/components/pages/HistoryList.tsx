import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { formatDateForDisplay, formatTimeForDisplay, getHistory, getUserPreferenceWithDefault, HistoryEvent, historySelector, useAppDispatch, userSelector } from '../../state';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { InfoCard, OPaginator } from '../molecules';
import { CalendarBlank, Clock } from '../atoms';
import { DataViewPageEvent } from 'primereact/dataview';
import { BookOpen } from '../atoms/icons/BookOpen';

export const HistoryList: FC = () => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const {keycloak, initialized} = useKeycloak();
    const [isLoading, setIsLoading] = useState<boolean>();
    let navigate = useNavigate();
    let user = useSelector(userSelector).singleItem;

    const initialParams: DataViewPageEvent = {
        first: 0,
        rows: Number(getUserPreferenceWithDefault(user, 'historyList.pageSize', "10")),
        page: 0,
        pageCount: 1
    };

    const [tableParams, setTableParams] = useState<DataViewPageEvent>(initialParams);

    let history = useSelector(historySelector);
    useEffect(() => {
        dispatch(getHistory({jwtToken: keycloak.token!, page: tableParams.page, pageSize: (tableParams.rows)}));
    }, [keycloak.token, tableParams.page, tableParams.rows]);


    useEffect(() => {
        const pageSize = Number(getUserPreferenceWithDefault(user, 'historyList.pageSize', "10"));
        if (pageSize !== tableParams.rows) {
            setTableParams({...tableParams, rows: pageSize});
        }
    }, [user?.userPreferences]);


    function onPageChange(paginatorPageChangeEvent: PaginatorPageChangeEvent) {
        setTableParams({...tableParams, page: paginatorPageChangeEvent.page, rows: paginatorPageChangeEvent.rows});
    }

    const dateTemplate = (history: HistoryEvent) => {
        return <div className="flex flex-row align-items-center">
                <CalendarBlank /><span className="ml-1">{ formatDateForDisplay(history.eventDate) }</span>
            </div>
    }

    const timeTemplate = (history: HistoryEvent) => {
        return <div className="flex flex-row align-items-center">
            <Clock/><span className="ml-1">{formatTimeForDisplay(history.eventDate)}</span>
        </div>
    }

    const eventTemplate = (history: HistoryEvent) => {
        return t('screens.historyList.eventType.' + history.event)
    }

    const actionTemplate = (history: HistoryEvent) => {
        return t('screens.historyList.actionType.' + history.action)
    }

    return (
        <>
            <div>
                <InfoCard className="mb-4" icon={<BookOpen height="30" width="30"/>}
                          title={t('screens.historyList.intro.title')}
                          description={t('screens.historyList.intro.description')}/>

                <DataTable value={history.list} rows={10} rowsPerPageOptions={[10, 20, 30]} tableStyle={{minWidth: '50rem'}}
                           selectionMode="single"
                           emptyMessage={t('screens.historyList.noHistory')}
                           rowHover={true}>
                    <Column body={dateTemplate} header={t('screens.historyList.date')} style={{width: '15%'}}></Column>
                    <Column body={timeTemplate} header={t('screens.historyList.time')} style={{width: '15%'}}></Column>
                    <Column body={eventTemplate} header={t('screens.historyList.event')} style={{width: '15%'}}></Column>
                    <Column body={actionTemplate} header={t('screens.historyList.action')} style={{width: '15%'}}></Column>
                    <Column field="username" header={t('screens.historyList.user')} style={{width: '15%'}}></Column>
                    <Column field="party" header={t('screens.historyList.party')} style={{width: '15%'}}></Column>
                </DataTable>
                <div className="flex justify-content-end">
                    <OPaginator first={history.currentPage * tableParams.rows} rows={tableParams.rows} totalRecords={history.totalElements} onPageChange={onPageChange} userPreferencesKey="historyList"/>
                </div>
            </div>
        </>
    );
};
 
