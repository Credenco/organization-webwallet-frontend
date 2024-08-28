import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericPagableState, DisplayProperties, GenericPageableState } from '../model';
import { addGenericPageableStateListBuilders } from '../slice';
import { getCredentialTypes } from './CredentialTypeApi';


export interface AttributeDisplayProperties {
    [index: string]: DisplayProperties;
}

export interface CredentialType {
    credentialConfigurationId?: string;
    credentialTypeConfigurationUrl?: string;
    issueUrl?: string;
    issuerDisplay?: DisplayProperties;
    credentialTypeDisplay?: DisplayProperties;
    vcType?: string;
}

export interface CredentialTypeState extends GenericPageableState<CredentialType> {
}

export const credentialTypeSlice = createSlice({
    name: 'credentialType',
    initialState: defaultGenericPagableState,
    reducers: {},
    extraReducers: builder => {
        addGenericPageableStateListBuilders(builder, getCredentialTypes);
    },
});
