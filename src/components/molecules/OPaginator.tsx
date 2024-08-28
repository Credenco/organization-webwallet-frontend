import React from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { updateUserPreference, useAppDispatch, UserPreference, userSelector } from '../../state';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';

interface OPaginatorProps {
    className?: string | undefined;
    first?: number | undefined;
    rows?: number | undefined;
    totalRecords?: number | undefined;
    rowsPerPageOptions?: number[] | undefined;

    onPageChange?(event: PaginatorPageChangeEvent): void;

    userPreferencesKey: string;
}

export const OPaginator: React.FC<OPaginatorProps> = (props) => {
    const dispatch = useAppDispatch();
    const {keycloak, initialized} = useKeycloak();
    let user = useSelector(userSelector).singleItem;

    function onPageChange(paginatorPageChangeEvent: PaginatorPageChangeEvent) {
        if (paginatorPageChangeEvent.rows != props.rows) {
            dispatch(updateUserPreference({
                jwtToken: keycloak.token!,
                locale: user?.locale!,
                currentUserPreferences: user?.userPreferences,
                userPreferenceToUpdate: {preferenceKey: props.userPreferencesKey + '.pageSize', preferenceValue: '' + paginatorPageChangeEvent.rows} as UserPreference
            }));
        }
        props.onPageChange?.(paginatorPageChangeEvent)
    }

    return (
        <Paginator first={props.first} rows={props.rows} totalRecords={props.totalRecords} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange}/>
    );
};
