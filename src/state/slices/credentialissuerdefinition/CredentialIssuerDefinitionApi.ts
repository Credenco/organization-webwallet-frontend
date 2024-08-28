import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';
import { CredentialIssuerDefinition } from '../model';


export const getCredentialIssuerDefinitions = createAsyncThunk(
    'credentialIssuerDefinition/getCredentialIssuerDefinitions', ({jwtToken, page, pageSize, searchText}: { jwtToken: string | undefined, page: number, pageSize: number, searchText?: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = '/credentialIssuerDefinition';
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

export const getCredentialIssuerDefinition = createAsyncThunk(
    'credentialIssuerDefinition/getCredentialIssuerDefinition', ({jwtToken, credentialIssuerDefinitionId}: { jwtToken: string | undefined, credentialIssuerDefinitionId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };


        var url = '/credentialIssuerDefinition/' + credentialIssuerDefinitionId;
        return axios.get(url, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const saveCredentialIssuerDefinition = createAsyncThunk(
    'credentialIssuerDefinition/saveCredentialIssuerDefinition', ({jwtToken, credentialIssuerDefinition}: { jwtToken: string | undefined, credentialIssuerDefinition: CredentialIssuerDefinition }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };

        var url = '/credentialIssuerDefinition';
        if (credentialIssuerDefinition.id !== undefined) {
            url = url + '/' + credentialIssuerDefinition.id;
        }
        return axios.post(url, credentialIssuerDefinition, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

