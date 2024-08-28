import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericPagableState, defaultGenericState, GenericPageableState, GenericState } from '../model';
import { addGenericPageableStateListBuilders } from '../slice';
import {getHistory} from "./HistoryApi";

export interface HistoryEvent {
    id: number;
    username: String;
    evidence?: String;
    eventDate: Date;
    event: String;
    action: String;
    party?: String;
}

export interface HistoryState extends GenericPageableState<History> {
}

export const historySlice = createSlice({
    name: 'history',
    initialState: defaultGenericPagableState,
    reducers: {},
    extraReducers: builder => {
        addGenericPageableStateListBuilders(builder, getHistory);
    },
});
