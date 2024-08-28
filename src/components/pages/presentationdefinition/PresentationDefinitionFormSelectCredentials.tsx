import * as React from 'react';
import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../state';
import { CredentialTypeCard, InfoCard, OCard, OFab } from '../../molecules';
import { useTranslation } from 'react-i18next';
import { Receive } from '../../atoms/icons/Receive';
import { SearchCredentialTypeView } from '../../organisms/SearchCredentialTypeView';
import { addCredentialType, presentationDefinitionFormSelector, removeCredentialType, setPresentationDefinitionForm } from '../../../state/slices/presentationdefinitionform';
import { DataView } from 'primereact/dataview';
import { CredentialType } from '../../../state/slices/credentialtype';
import { useNavigate, useParams } from 'react-router-dom';
import { getPresentationDefinition } from '../../../state/slices/presentationdefinition';
import { useKeycloak } from '@react-keycloak/web';

export const PresentationDefinitionFormSelectCredentials: FC = () => {
    const dispatch = useAppDispatch();
    let navigation = useNavigate();
    const {t} = useTranslation();
    let presentationDefinitionForm = useSelector(presentationDefinitionFormSelector);
    const {presentationDefinitionId} = useParams()
    const {keycloak, initialized} = useKeycloak();


    useEffect(() => {
        if (presentationDefinitionId !== undefined) {
            dispatch(getPresentationDefinition({jwtToken: keycloak.token!, presentationDefinitionId: presentationDefinitionId})).then((response) => {
                if (response.type.includes('fulfilled')) {
                    dispatch(setPresentationDefinitionForm(response.payload));
                }
            });
        }
    }, [presentationDefinitionId]);

    function selectCredentialType(credentialType: CredentialType, selected: boolean) {
        if (selected) {
            dispatch(addCredentialType(credentialType));
        } else {
            dispatch(removeCredentialType(credentialType));
        }
    }

    function remove(credentialType: CredentialType) {
        dispatch(removeCredentialType(credentialType));
    }

    const itemTemplate = (credentialType: CredentialType): ReactNode => {

        return (
            <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 xxl:col-2 pr-3">
                <CredentialTypeCard credentialType={credentialType} key='{index}' onSelectionChanged={remove} showSelectionCheckbox={true} selected={true}/>
            </div>
        );
    }

    function startConfigure() {
        navigation('/presentationDefinition/configure');

    }

    return (
        <>
            <div>
                <InfoCard className="mt-4" icon={<Receive height="30" width="30"/>}
                          title={t('screens.presentationDefinitionFormSelectCredentials.intro.title')}
                          description={t('screens.presentationDefinitionFormSelectCredentials.intro.description')}/>

                <OCard className="mt-4" title={t('screens.presentationDefinitionFormSelectCredentials.selectedCredentialTypes')}>
                    <DataView style={{background: 'unset'}}
                              value={presentationDefinitionForm.form?.credentialTypes}
                              layout='grid'
                              itemTemplate={itemTemplate}
                              emptyMessage={t('screens.presentationDefinitionFormSelectCredentials.noCredentialTypesSelected')}
                    />
                </OCard>
                <SearchCredentialTypeView
                    className="mt-5"
                    searchTitle={t('screens.presentationDefinitionFormSelectCredentials.searchTitle')}
                    searchPlaceHolder={t('screens.presentationDefinitionFormSelectCredentials.searchPlaceHolder')}
                    onCredentialSelected={selectCredentialType}
                    selectedCredentialTypes={presentationDefinitionForm.form?.credentialTypes}
                    showSelectionCheckboxes={true}
                    userPreferencesKey="presentationDefinitionFormSelectCredentials"
                />
                <OFab label="Start configuration"
                      onClick={startConfigure}
                      disabled={((presentationDefinitionForm.form?.credentialTypes === undefined) || presentationDefinitionForm.form?.credentialTypes.length == 0)}/>
            </div>
        </>
    );
}
