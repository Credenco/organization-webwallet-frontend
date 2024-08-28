import { createSlice } from '@reduxjs/toolkit';
import { CredentialIssuerCredentialDefinition, CredentialIssuerCredentialDisplay, CredentialIssuerDefinition, CredentialIssuerDisplay, defaultGenericPagableState, GenericPageableState } from '../model';
import { addGenericPageableStateListBuilders, addGenericStateSingleBuilders } from '../slice';
import { getCredentialIssuerDefinition, getCredentialIssuerDefinitions } from './CredentialIssuerDefinitionApi';
import { CredentialType } from '../credentialtype';


export interface CredentialIssuerDefinitionState extends GenericPageableState<CredentialIssuerDefinition> {
}

export const credentialIssuerDefinitionSlice = createSlice({
    name: 'credentialIssuerDefinition',
    initialState: defaultGenericPagableState,
    reducers: {},
    extraReducers: builder => {
        addGenericPageableStateListBuilders(builder, getCredentialIssuerDefinitions);
        addGenericStateSingleBuilders(builder, getCredentialIssuerDefinition);
    }
});


export const buildCredentialType = (credentialIssuerDisplay: CredentialIssuerDisplay | undefined, credentialIssuerCredentialDisplay: CredentialIssuerCredentialDisplay | undefined): CredentialType => {
    return {
        issuerDisplay: {
            name: credentialIssuerDisplay?.displayName,
            logo: {
                url: credentialIssuerDisplay?.logoUrl,
                altText: credentialIssuerDisplay?.logoAltText
            },
        },
        credentialTypeDisplay: {
            name: credentialIssuerCredentialDisplay?.displayName,
            backgroundColor: credentialIssuerCredentialDisplay?.backgroundColor,
            backgroundImage: {
                url: credentialIssuerCredentialDisplay?.backgroundImageUrl,
            },
            textColor: credentialIssuerCredentialDisplay?.textColor,
        }
    } as CredentialType
}

export const getLocaleIssuerDisplay = (credentialIssuerDefinition: CredentialIssuerDefinition, locale: string): CredentialIssuerDisplay | undefined => {
    const localeDisplay = credentialIssuerDefinition.displays?.find((display) => display.locale === locale);
    const defaultDisplay = credentialIssuerDefinition.displays?.find((display) => display.locale === undefined);
    return {...defaultDisplay, ...localeDisplay};
}

export const getCredentialIssuerCredentialDisplay = (credentialIssuerCredentialDefinition: CredentialIssuerCredentialDefinition, locale: string): CredentialIssuerCredentialDisplay | undefined => {
    const localeDisplay = credentialIssuerCredentialDefinition.displays?.find((display) => display.locale === locale);
    const defaultDisplay = credentialIssuerCredentialDefinition.displays?.find((display) => display.locale === undefined);
    return {...defaultDisplay, ...localeDisplay};
}
