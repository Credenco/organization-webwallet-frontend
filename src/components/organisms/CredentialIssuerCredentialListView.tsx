import React, { FC, ReactNode, useMemo } from 'react';
import { buildCredentialType, CredentialIssuerCredentialDefinition, CredentialIssuerDefinition, getCredentialIssuerCredentialDisplay, getLocaleIssuerDisplay, userSelector } from '../../state';
import { useTranslation } from 'react-i18next';
import { DataView } from 'primereact/dataview';
import { CredentialTypeCard, EmptyCreateNewCredentialTypeCard } from '../molecules';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface CredentialIssuerCredentialListViewProps {
    credentialIssuerDefinitionForm: CredentialIssuerDefinition | undefined;
}

export const CredentialIssuerCredentialListView: FC<CredentialIssuerCredentialListViewProps> = (props) => {
    const {t} = useTranslation();
    const user = useSelector(userSelector).singleItem;
    const navigate = useNavigate();

    const issuerDisplay = useMemo(() => {
        if ((props.credentialIssuerDefinitionForm !== undefined) && (props.credentialIssuerDefinitionForm.displays !== undefined) && (user !== undefined)) {
            return getLocaleIssuerDisplay(props.credentialIssuerDefinitionForm, user!.locale);
        }
    }, [props.credentialIssuerDefinitionForm, user]);

    function requestNew() {
        navigate(`/credentialIssuerDefinition/${props.credentialIssuerDefinitionForm?.id}/credentialIssuerCredential/new`);
    }

    function edit(id: string | undefined) {
        navigate(`/credentialIssuerDefinition/${props.credentialIssuerDefinitionForm?.id}/credentialIssuerCredential/edit/${id}`);
    }

    const itemTemplate = (credentialIssuerCredentialDefinition: CredentialIssuerCredentialDefinition): ReactNode => {
        const credentialIssuerCredentialDisplay = getCredentialIssuerCredentialDisplay(credentialIssuerCredentialDefinition, user!.locale);
        const fakeCredentialType = buildCredentialType(issuerDisplay, credentialIssuerCredentialDisplay);
        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 xxl:col-2 pr-3 pb-5">
                {(Object.getOwnPropertyNames(credentialIssuerCredentialDefinition).length === 0) && (
                    <EmptyCreateNewCredentialTypeCard key='{index}' onClick={requestNew}/>
                )}
                {(Object.getOwnPropertyNames(credentialIssuerCredentialDefinition).length > 0) && (
                    <CredentialTypeCard credentialType={fakeCredentialType} key='{index}' onClick={credentialType => edit(credentialIssuerCredentialDefinition.id)}/>
                )}
            </div>
        );
    };

    const credentialDefinitionsToShow = useMemo(() => {
        if (props.credentialIssuerDefinitionForm?.credentialDefinitions === undefined) {
            return [{}];
        } else {
            return [{}, ...props.credentialIssuerDefinitionForm?.credentialDefinitions]
        }
    }, [props.credentialIssuerDefinitionForm?.credentialDefinitions])


    if (props.credentialIssuerDefinitionForm === undefined) {
        return null;
    }
    return (
        <DataView
            value={credentialDefinitionsToShow}
            layout='grid'
            itemTemplate={itemTemplate}
            emptyMessage={t('screens.credentialList.searchNoCredentialsFound')}
            rows={credentialDefinitionsToShow?.length}
            totalRecords={credentialDefinitionsToShow?.length}/>

    )
}

