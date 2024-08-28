import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { Did, DidForm } from './DidSlice';


export const getDids = createAsyncThunk(
    'did/getDids', ({jwtToken}: { jwtToken: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        return axios.get('/did', config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const getDid = createAsyncThunk(
    'did/getDid', ({jwtToken, didId}: { jwtToken: string | undefined, didId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        return axios.get(`/did/${didId}`, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const createDid = createAsyncThunk(
    'did/createDid', ({jwtToken, didForm}: { jwtToken: string | undefined, didForm: DidForm }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        console.log(didForm);
        return axios.post('/did', didForm, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const updateDid = createAsyncThunk(
    'did/updateDid', ({jwtToken, didId}: { jwtToken: string | undefined, didId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        return axios.put('/did/' + didId, {}, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const addService = createAsyncThunk(
    'did/addService', ({jwtToken, didId, serviceId, serviceType, serviceEndpoint}: { jwtToken: string | undefined, didId: string, serviceId: string, serviceType: string, serviceEndpoint: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        return axios.post('/did/' + didId, {'serviceId': serviceId, 'serviceType': serviceType, 'serviceEndpoint': serviceEndpoint}, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const registerTrustedIssuer = createAsyncThunk(
    'did/registerTrustedIssuer', ({jwtToken, didId, schemaId, taoWalletAddress}: { jwtToken: string | undefined, didId: number, schemaId: string, taoWalletAddress: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        return axios.post('/did/' + didId + '/registerIssuer', {'schemaId': schemaId, 'taoWalletAddress': taoWalletAddress}, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);
