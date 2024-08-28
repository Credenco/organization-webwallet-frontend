import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';


export const getCredentials = createAsyncThunk(
    'credential/getCredentials', ({jwtToken, page, pageSize, locale, searchText}: { jwtToken: string | undefined, page: number, pageSize: number, locale: string | undefined, searchText?: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = addQueryParam('/credential', 'locale', locale);
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

export const getCredential = createAsyncThunk(
    'credential/getCredential', ({jwtToken, credentialId, locale}: { jwtToken: string | undefined, credentialId: string, locale: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };

        const url = addQueryParam(`/credential/${credentialId}`, 'locale', locale);
        return axios.get(url, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const deleteCredential = createAsyncThunk(
    'credential/deleteCredential', ({jwtToken, credentialId}: { jwtToken: string | undefined, credentialId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        ;
        return axios.delete(`/credential/${credentialId}`, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);
