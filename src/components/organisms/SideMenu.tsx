import React, { useState } from 'react';
import styled from 'styled-components';
import { Key, Logo, SlidersHorizontal, Wallet } from '../atoms';

import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../state';
import { useTranslation } from 'react-i18next';
import { Receive } from '../atoms/icons/Receive';
import { IdentificationCard } from '../atoms/icons/IdentificationCard';
import { BookOpen } from '../atoms/icons/BookOpen';
import { Image } from 'primereact/image';
import { PanelMenu } from 'primereact/panelmenu';

interface Props {
}


export const SideMenu: React.FC<Props> = (props) => {

    const {t} = useTranslation();
    let user = useSelector(userSelector).singleItem;
    const [expandedKeys, setExpandedKeys] = useState({});

    let navigation = useNavigate();

    const itemRenderer = (item: any) => (

        <Menu model={items2} className="mt-6" style={{border: 'none'}}/>
    );
    let items = [{
        label: t('menu.dashboard'),
        items: [
            {
                label: t('menu.walletOverview'),
                icon: <Wallet className="mr-2 flex" />,
                command: () => {
                    navigation('/');
                }
            },
            {
                label: t('menu.newCredential'),
                icon: <Key className="mr-2 flex" />,
                command: () => {
                    navigation('/credential/new');
                }
            }
        ]
    }];

    let advancedItems = [
        {
            key: '0',
            label: t('menu.generic'),
            items: [
                {
                    key: '0-1',
                    label: t('menu.identifiers'),
                    icon: <IdentificationCard className="mr-2 flex"/>,
                    command: () => {
                        navigation('/did');
                    }
                },
                {
                    key: '0-2',
                    label: t('menu.history'),
                    icon: <BookOpen width="20" height="20" className="mr-2 flex"/>,
                    command: () => {
                        navigation('/history');
                    }
                }
            ]
        },
        {
            key: '1',
            label: t('menu.issuer'),
            items: [{
                key: '1-1',
                label: t('menu.issuerTemplates'),
                icon: <SlidersHorizontal className="mr-2 flex"/>,
                command: () => {
                    navigation('/credentialIssuerDefinition');
                }
                // }, {
                //     key: '1-2',
                //     label: t('menu.issuerTrust'),
                //     icon: <ShieldCheck className="mr-2 flex"/>,
                //     command: () => {
                //         navigation('/trustedIssuer');
                //     }
            }, {
                label: 'Issued credentials',
                icon: <Key className="mr-2 flex"/>,
                command: () => {
                    navigation('/issuedCredential');
                }
            }
            ]
        },
        {
            key: '2',
            label: t('menu.verifier'),
            items: [{
                key: '2-1',
                label: t('menu.receive'),
                icon: <Receive className="mr-2 flex" />,
                command: () => {
                    navigation('/presentationDefinition');
                }
            }]
        }
    ]

    const items2 = [
        {
            label: 'New', icon: 'pi pi-fw pi-plus', command: () => {
                navigation('/did');
            }
        },
        {
            label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => {
                navigation('/did');
            }
        }
    ]

    return (
        <Root>

            {/*<Logo className="flex align-self-center"/>*/}
            <div className="flex flex-row justify-content-center">
                {(user?.base64EncodedOrganizationLogo === undefined) && (
                    <Logo className="flex align-self-start"/>
                )}
                {(user?.base64EncodedOrganizationLogo !== undefined) && (
                    <Image src={user?.base64EncodedOrganizationLogo} alt="Logo" width="120"/>
                )}
            </div>
            <Menu model={items} className="mt-3" style={{border: 'none'}}/>

            <div className="p-menu" style={{border: 'none'}}>
                <div className="p-submenu-header mt-4">{t('menu.advanced')}</div>
            </div>
            <PanelMenu model={advancedItems} expandedKeys={expandedKeys} onExpandedKeysChange={setExpandedKeys} className="w-full" multiple />
            <div className="flex flex-column justify-content-end align-items-center flex-grow-1 pb-2" style={{height: '100%'}}>
                <div className="text-sm mb-2" style={{color: 'var(--black-200)'}}>Powered by:</div>
                <Logo/>
            </div>
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 20px 16px;
    height: 100%;
`;

const MenuItem = styled.div`
    padding-top: 20px;
`;

