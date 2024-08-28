import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericPagableState, GenericPageableState } from '../model';
import { addGenericPageableStateListBuilders, addGenericStateSingleBuilders } from '../slice';
import { getPresentationDefinition, getPresentationDefinitions, savePresentationDefinition } from './PresentationDefinitionApi';
import { CredentialType } from '../credentialtype';


export interface PresentationDefinitionPolicy {
    id: number;
    presentationDefinitionPolicyType: string;
    name: string;
    args: string;
}

export interface PresentationDefinition {
    id?: number;
    externalKey: string;
    name: string;
    description?: string;
    purpose: string;
    notes?: string;
    policies?: PresentationDefinitionPolicy[]
    credentialTypes: CredentialType[];
    successRedirectUrl: string;
    errorRedirectUrl: string;
    clientUrl: string;
    pdDocument: string;
}

export interface PresentationDefinitionState extends GenericPageableState<PresentationDefinition> {
}

export const presentationDefinitionSlice = createSlice({
    name: 'presentationDefinition',
    initialState: defaultGenericPagableState,
    reducers: {},
    extraReducers: builder => {
        addGenericPageableStateListBuilders(builder, getPresentationDefinitions);
        addGenericStateSingleBuilders(builder, getPresentationDefinition);
        addGenericStateSingleBuilders(builder, savePresentationDefinition);
    }
});
