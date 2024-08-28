import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericPagableState, DisplayProperties, GenericPageableState } from '../model';
import { addGenericPageableStateListBuilders, addGenericStateSingleBuilders } from '../slice';
import { deleteCredential, getCredential, getCredentials } from './CredentialApi';


export interface AttributeDisplayProperties {
    [index: string]: DisplayProperties;
}

export interface Credential {
    id: number;
    validFrom?: Date;
    validUntil?: Date;
    issuanceDate?: Date;
    displayProperties?: {
        issuerDisplay?: DisplayProperties;
        credentialTypeDisplay?: DisplayProperties;
        credentialSubjectDisplay?: AttributeDisplayProperties;
    }
    credentialSubject?: any;
    document?: any;
    termsOfUse?: TermsOfUse[];
    status?: string;
}

export interface TermsOfUse {
    id: string;
    type: string;
}

export interface CredentialState extends GenericPageableState<Credential> {
}

export const credentialSlice = createSlice({
    name: 'credential',
    initialState: defaultGenericPagableState,
    reducers: {},
    extraReducers: builder => {
        addGenericPageableStateListBuilders(builder, getCredentials);
        addGenericStateSingleBuilders(builder, getCredential);
        addGenericStateSingleBuilders(builder, deleteCredential);
    },
});

export interface CredentialAttribute {
    label: string;
    value: any;
    Show: boolean
}

export const getCredentialAttributes = (credential: Credential) => {

}
