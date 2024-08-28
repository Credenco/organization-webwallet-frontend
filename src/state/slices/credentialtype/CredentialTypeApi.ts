import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';


export const getCredentialTypes = createAsyncThunk(
    'credentialType/getCredentialTypes', ({jwtToken, page, pageSize, locale, searchText}: { jwtToken: string | undefined, page: number, pageSize: number, locale: string | undefined, searchText?: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = addQueryParam('/credential/type', 'locale', locale);
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
