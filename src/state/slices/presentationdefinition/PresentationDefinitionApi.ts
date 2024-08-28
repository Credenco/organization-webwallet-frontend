import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';
import { PresentationDefinition } from './PresentationDefinitionSlice';


export const getPresentationDefinitions = createAsyncThunk(
    'presentationDefinition/getPresentationDefinitions', ({jwtToken, page, pageSize, searchText}: { jwtToken: string | undefined, page: number, pageSize: number, searchText?: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = '/presentationDefinition';
        url = addQueryParam(url, 'page', page);
        url = addQueryParam(url, 'size', pageSize);
        url = addQueryParam(url, 'q', searchText);

        return axios.get(url, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const getPresentationDefinition = createAsyncThunk(
    'presentationDefinition/getPresentationDefinition', ({jwtToken, presentationDefinitionId}: { jwtToken: string | undefined, presentationDefinitionId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = '/presentationDefinition/' + presentationDefinitionId;
        return axios.get(url, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const savePresentationDefinition = createAsyncThunk(
    'presentationDefinition/savePresentationDefinition', ({jwtToken, presentationDefinition}: { jwtToken: string | undefined, presentationDefinition: PresentationDefinition }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = '/presentationDefinition';

        return axios.post(url, presentationDefinition, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

