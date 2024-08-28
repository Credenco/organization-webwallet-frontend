import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';


export const getPresentationDefinitionCredentialOfferUrl = createAsyncThunk(
    'presentationDefinitionTest/getPresentationDefinitionCredentialOfferUrl', ({jwtToken, walletUrl, successUrl, presentationDefinitionExternalKey}: {
        jwtToken: string | undefined,
        walletUrl: string,
        successUrl: string,
        presentationDefinitionExternalKey: string
    }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };

        var url = '/credential/verify/' + presentationDefinitionExternalKey
        const body = {
            walletUrl: walletUrl,
            successUrl: successUrl
        }


        return axios.post(url, body, config)
            .then(response => {
                return {presentationOfferUrl: response.data}
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const getPresentationDefinitionSession = createAsyncThunk(
    'presentationDefinitionTest/getPresentationDefinitionSession', ({jwtToken, sessionId}: { jwtToken: string | undefined, sessionId: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };

        var url = '/credential/verify/session/' + sessionId
        url = addQueryParam(url, 'savePresentation', "false");


        return axios.get(url, config)
            .then(response => {
                return {sessionInfo: response.data}
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);
