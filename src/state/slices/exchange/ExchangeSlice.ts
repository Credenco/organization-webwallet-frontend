import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericState, GenericState } from '../model';
import { addGenericStateListBuilders, addGenericStateSingleBuilders } from '../slice';
import { resolveCredentialOffer, acceptOfferRequest, resolvePresentationOffer } from './ExchangeApi';

export interface ExchangeState extends GenericState<any> {
}

export const exchangeSlice = createSlice({
    name: 'credential',
    initialState: defaultGenericState,
    reducers: {},
    extraReducers: builder => {
        addGenericStateListBuilders(builder, resolveCredentialOffer);
        addGenericStateListBuilders(builder, acceptOfferRequest);
        addGenericStateSingleBuilders(builder, resolvePresentationOffer);
    },
});
