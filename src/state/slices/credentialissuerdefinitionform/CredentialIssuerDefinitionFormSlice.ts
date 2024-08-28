import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CredentialIssuerDefinition, CredentialIssuerDisplay } from '../model';


export interface CredentialIssuerDefinitionForm {
    form: CredentialIssuerDefinition | undefined;
    dirty: boolean;
}

export interface CredentialIssuerDefinitionFormState extends CredentialIssuerDefinitionForm {
}

const initialState: CredentialIssuerDefinitionForm = {
    form: {
        id: '',
        externalKey: '',
        name: '',
        description: '',
        openIdCredentialIssuerUrl: '',
        displays: [] as CredentialIssuerDisplay[],
        createdAt: '',
        createdBy: '',
        lastModifiedAt: '',
        lastModifiedBy: ''
    } as CredentialIssuerDefinition,
    dirty: false
};


function findByLocale(source: CredentialIssuerDisplay[], locale: string): number {
    if (source) {
        return source.findIndex((element) => ((element.locale === locale)));
    }
    return -1;
}

export const credentialIssuerDefinitionFormSlice = createSlice({
    name: 'credentialIssuerDefinitionFrom',
    initialState,
    reducers: {
        setSelectedCredentialIssuerDisplayLanguages(state: CredentialIssuerDefinitionFormState, action: PayloadAction<string[]>) {
            const newDisplays = Object.assign([], state.form?.displays);
            // Add new languages to the list of displays
            action.payload.forEach((language) => {
                if (findByLocale(newDisplays, language) === -1) {
                    newDisplays.push({locale: language} as CredentialIssuerDisplay);
                }
            });
            // Remove displays that are not in the new list of languages
            newDisplays.forEach((display: CredentialIssuerDisplay) => {
                // Always keep the default language (locale = '')
                if ((display.locale) && (display.locale?.length > 0) && action.payload.indexOf(display.locale!) === -1) {
                    const index = findByLocale(newDisplays, display.locale!);
                    if (index !== -1) {
                        newDisplays.splice(index, 1);
                    }
                }
            });
            return {
                ...state,
                dirty: true,
                form: Object.assign({}, state.form, {displays: newDisplays})
            };
        },
        updateCredentialIssuerDisplay: function (state: CredentialIssuerDefinitionFormState, action: PayloadAction<CredentialIssuerDisplay>) {
            const oldDisplays = Object.assign([], state.form?.displays);
            let index = findByLocale(oldDisplays, action.payload.locale!);
            const newDisplays = (index > -1) ?
                [...oldDisplays.slice(0, index), action.payload, ...oldDisplays.slice(index + 1)] : state.form?.displays;
            return {
                ...state,
                dirty: true,
                form: Object.assign({}, state.form, {displays: newDisplays})
            };
        },
        setInitialCredentialIssuerDefinitionForm(state: any, action) {
            return {
                ...state,
                dirty: false,
                form: Object.assign({}, action.payload)
            };
        },
        setCredentialIssuerDefinitionForm(state: any, action) {
            return {
                ...state,
                dirty: true,
                form: Object.assign({}, action.payload)
            };
        },
    },
});

export const {
    setInitialCredentialIssuerDefinitionForm,
    setCredentialIssuerDefinitionForm,
    setSelectedCredentialIssuerDisplayLanguages,
    updateCredentialIssuerDisplay,
} = credentialIssuerDefinitionFormSlice.actions
