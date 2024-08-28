import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericPagableState, GenericPageableState } from '../model';
import { addGenericPageableStateListBuilders, addGenericStateSingleBuilders } from '../slice';
import { getIssuedCredential, getIssuedCredentials } from './IssuedCredentialApi';
import { Credential } from '../credential';


export interface IssuedCredentialState extends GenericPageableState<Credential> {
}

export const issuedCredentialSlice = createSlice({
    name: 'issuedCredential',
    initialState: defaultGenericPagableState,
    reducers: {},
    extraReducers: builder => {
        addGenericPageableStateListBuilders(builder, getIssuedCredentials);
        addGenericStateSingleBuilders(builder, getIssuedCredential);
    },
});

