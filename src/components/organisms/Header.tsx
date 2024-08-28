import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { getUser, updateUser, useAppDispatch, userSelector } from '../../state';
import { useSelector } from 'react-redux';
import { BreadCrumbItem, LanguageSelector, OBreadCrumb } from '../molecules';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { MenuItem, MenuItemCommandEvent, MenuItemOptions } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';

interface Props {
}


export const Header: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const {keycloak, initialized} = useKeycloak();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(getUser({jwtToken: keycloak.token!}));
    }, [keycloak.token]);
    let user = useSelector(userSelector).singleItem;

    const breadCrumbConfig: BreadCrumbItem[] = [
        {
            label: t('screens.credentialDetail.title'),
            path: '/credential/details/:credentialId',
            parent: {
                label: t('screens.credentialList.title'),
                path: '/'
            }
        }
    ];

    const breadCrumb = matchRoutes(breadCrumbConfig, useLocation())?.at(0);


    function updateLanguage(locale: string) {
        dispatch(updateUser({jwtToken: keycloak.token!, locale: locale, userPreferences: user?.userPreferences}));
    }

    const renderProfileItem = (item: MenuItem, options: MenuItemOptions): ReactNode => {
        return (
            <a className="flex align-items-center gap-2 p-menuitem-link p-0 ml-4" >
                <div className="flex align-items-start justify-content-left gap-2 flex-wrap flex-column" style={{minWidth: "200px"}}>
                    <div className="font-semibold">{user?.organization}</div>
                    <div className="text-sm" style={{color: 'var(--black-200)'}}>{user?.fullName}</div>
                </div>
                <ChevronDownIcon color="#1C1C1C66"/>
            </a>
        )
    }

    const items: MenuItem[] = [
        {
            label: 'Projects',
            icon: 'pi pi-search',
            template: renderProfileItem,
            items: [
                {
                    label: t('menu.logoff'),
                    icon: 'pi pi-sign-out',
                    command(event: MenuItemCommandEvent) {
                        keycloak?.logout();
                    }
                }
            ]
        }
    ];

    return (
        <div className="col-12 pl-4 pr-4 flex align-items-center justify-content-between" style={{minHeight: '68px'}}>
            {(breadCrumb?.route) && (<OBreadCrumb breadCrumb={breadCrumb?.route}/>)}
            {(breadCrumb?.route === undefined) && (
                <div className="flex flex-column">
                    <div className="font-semibold">{t('screens.header.welcomeTitle', {firstName: user?.firstName})}</div>
                    <div className="text-sm" style={{color: 'var(--black-200)'}}>{t('screens.header.welcomeSubTitle', {organizationName: user?.organization})}</div>
                </div>)}
                {/*<Menubar className="flex justify-content-end bg-white-alpha-90 border-0" model={items}></Menubar>*/}
                {/*<div>*/}
                {/*    <div className="hidden sm:inline mr-1">sm</div>*/}
                {/*    <div className="hidden md:inline mr-1">md</div>*/}
                {/*    <div className="hidden lg:inline mr-1">lg</div>*/}
                {/*    <div className="hidden xl:inline mr-1">xl</div>*/}
                {/*    <div className="hidden xxl:inline mr-1">xxl</div>*/}
                {/*</div>*/}
            <div className="flex flex-end">
                <LanguageSelector selectedLocale={user?.locale} onLocaleSelected={locale => {
                    updateLanguage(locale);
                }}/>
                <Menubar model={items} style={{border: 'none', backgroundColor: 'none'}}/>
            </div>

        </div>
    );

};

const Root = styled.div`
    display: flex;
    min-height: 68px;
    justify-content: flex-end;
    align-items: center;
`;

