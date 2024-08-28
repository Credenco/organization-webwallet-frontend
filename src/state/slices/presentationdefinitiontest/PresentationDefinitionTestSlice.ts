import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericState, GenericState } from '../model';
import { addGenericStateSingleBuilders } from '../slice';
import { getPresentationDefinitionCredentialOfferUrl, getPresentationDefinitionSession } from './PresentationDefinitionTestApi';

export interface PresentationDefinitionTest {
    presentationOfferUrl: string | undefined;
    sessionInfo: any | undefined;
}

export interface PresentationDefinitionTestState extends GenericState<PresentationDefinitionTest> {
}

export const presentationDefinitionTestSlice = createSlice({
    name: 'presentationDefinitionTest',
    initialState: defaultGenericState,
    reducers: {
        clearTestState(state: any, action) {
            console.log('QQQ clearTestState');
            return {
                ...state,
                singleItem: undefined,
            };
        }

    },
    extraReducers: builder => {
        addGenericStateSingleBuilders(builder, getPresentationDefinitionCredentialOfferUrl);
        addGenericStateSingleBuilders(builder, getPresentationDefinitionSession);
    }
});

export const {clearTestState} = presentationDefinitionTestSlice.actions
