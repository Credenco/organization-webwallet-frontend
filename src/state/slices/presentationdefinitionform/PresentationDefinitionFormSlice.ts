import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PresentationDefinition } from '../presentationdefinition';
import { CredentialType } from '../credentialtype';

export interface PresentationDefinitionForm {
    form: PresentationDefinition | undefined;
}

export interface PresentationDefinitionFormState extends PresentationDefinitionForm {
}

const initialState: PresentationDefinitionForm = {
    form: {
        name: '',
        description: '',
        purpose: '',
        credentialTypes: [] as CredentialType[],
        externalKey: '',
        successRedirectUrl: '',
        errorRedirectUrl: '',
        clientUrl: '',
        pdDocument: ''
    } as PresentationDefinition
};

function remove(source: (any[] & CredentialType[]) | (any[] & undefined), payload: CredentialType): CredentialType[] {
    if ((source)) {
        let index = findIndex(source, payload);
        const result = Object.assign([] as CredentialType[], source);
        if (index !== -1) {
            result.splice(index, 1);
        }
        return result;
    }
    return [];
}

function findIndex(source: (any[] & CredentialType[]) | (any[] & undefined), payload: CredentialType): number {
    if (source) {
        return source.findIndex((element) => ((element.credentialConfigurationId === payload.credentialConfigurationId) && (element.credentialTypeConfigurationUrl === payload.credentialTypeConfigurationUrl)));
    }
    return -1;
}

export const presentationDefinitionFormSlice = createSlice({
    name: 'presentationDefinitionFrom',
    initialState,
    reducers: {
        addCredentialType(state: any, action: PayloadAction<CredentialType>) {
            const newState = remove(state.form?.credentialTypes, action.payload);
            newState.push(action.payload);
            return {
                ...state,
                form: Object.assign({}, state.form, {credentialTypes: newState})
            };
        },
        removeCredentialType(state: any, action: PayloadAction<CredentialType>) {
            const newState = remove(state.form?.credentialTypes, action.payload);
            return {
                ...state,
                form: Object.assign({}, state.form, {credentialTypes: newState})
            };
        },
        setPresentationDefinitionForm(state: any, action) {
            return {
                ...state,
                form: Object.assign({}, action.payload)
            };
        }
    },
});

export const {addCredentialType, removeCredentialType, setPresentationDefinitionForm} = presentationDefinitionFormSlice.actions
