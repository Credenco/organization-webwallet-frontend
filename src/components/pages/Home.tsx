import * as React from 'react';
import { FC, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useLocation, useNavigate } from 'react-router-dom';
import { CredentialsList } from './CredentialsList';

export const Home: FC = () => {
    const {keycloak} = useKeycloak();

    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (isLocationOffer()) {
            navigate('/credential/issue' + location.search);
        } else if (isPresentationOffer()) {
            navigate('/credential/verify' + location.search);
        } else if (isAuthorizationRequestUri()) {
            navigate('/credential/verify' + location.search);
        }
    }, [keycloak.token]);

    function isLocationOffer() {
        return location.search && location.search.includes('credential_offer');
    }

    function isPresentationOffer() {
        return location.search && location.search.includes('presentation_definition');
    }

    function isAuthorizationRequestUri() {
        return location.search && location.search.includes('request_uri');
    }

    return <CredentialsList />;
}
