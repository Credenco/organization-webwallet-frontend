import * as React from 'react';
import { FC } from 'react';
import { CredentialType } from '../../state/slices/credentialtype';
import { SearchCredentialTypeView } from '../organisms/SearchCredentialTypeView';
import { useTranslation } from 'react-i18next';


export const CredentialTypeList: FC = () => {
    const {t} = useTranslation();

    function onRequestCredentialClicked(credentialType: CredentialType) {
        const url = credentialType.issueUrl + "?id=" + credentialType.credentialConfigurationId + "&callback=" + window.location.origin + '/credential/issue';
        window.location.href = url;
    }

    return (
        <SearchCredentialTypeView onRequestCredentialClicked={onRequestCredentialClicked}
                                  searchTitle={t('screens.credentialTypeList.searchTitle')}
                                  userPreferencesKey="credentialTypeList"/>
    );
}
