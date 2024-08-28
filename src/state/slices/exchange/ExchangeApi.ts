import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';


export const resolveCredentialOffer = createAsyncThunk(
    'exchange/resolveCredentialOffer', ({jwtToken, credentialOfferUrl, locale}: { jwtToken: string | undefined, credentialOfferUrl: string, locale: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken), 'Content-Type': 'text/plain'}
        };
        const url = '/exchange/resolveCredentialOffer' + ((locale) ? '?locale=' + locale : '');
        return axios.post(url, credentialOfferUrl, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const acceptOfferRequest = createAsyncThunk(
    'exchange/acceptOfferRequest', ({jwtToken, didId, credentialOfferUrl, locale}: { jwtToken: string | undefined, didId: number, credentialOfferUrl: string, locale: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken), 'Content-Type': 'text/plain' }
        };
        const url = '/exchange/acceptOfferRequest?didId=' + didId + ((locale) ? '&locale=' + locale : '');
        return axios.post(url, credentialOfferUrl, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const resolvePresentationOffer = createAsyncThunk(
    'exchange/resolvePresentationOffer', ({jwtToken, presentationOfferUrl, locale}: { jwtToken: string | undefined, presentationOfferUrl: string, locale: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken), 'Content-Type': 'text/plain'}
        };
        const url = '/exchange/resolvePresentationOffer' + ((locale) ? '?locale=' + locale : '');
        return axios.post(url, presentationOfferUrl, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const acceptPresentationRequest = createAsyncThunk(
    'exchange/acceptPresentationRequest', ({jwtToken, presentationRequest, selectedCredentials, locale}: { jwtToken: string | undefined, presentationRequest: string, selectedCredentials: number[], locale: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken), 'Content-Type':  'application/json'}
        };
        const url = '/exchange/acceptPresentationRequest' + ((locale) ? '?locale=' + locale : '');
        return axios.post(url, {presentationRequest: presentationRequest, selectedCredentials: selectedCredentials}, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);
