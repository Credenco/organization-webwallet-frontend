import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';


export const getIssuedCredentials = createAsyncThunk(
    'issuedCredential/getIssuedCredentials', ({jwtToken, page, pageSize, locale, searchText}: { jwtToken: string | undefined, page: number, pageSize: number, locale: string | undefined, searchText?: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = addQueryParam('/issuedCredential', 'locale', locale);
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

export const getIssuedCredential = createAsyncThunk(
    'issuedCredential/getIssuedCredential', ({jwtToken, issuedCredentialId, locale}: { jwtToken: string | undefined, issuedCredentialId: string, locale: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };

        const url = addQueryParam(`/issuedCredential/${issuedCredentialId}`, 'locale', locale);
        return axios.get(url, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

