import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { addQueryParam } from '../slice';


export const getHistory = createAsyncThunk(
    'history/getHistory', ({jwtToken, page, pageSize}: { jwtToken: string | undefined, page: number, pageSize: number }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        var url = '/history';
        url = addQueryParam(url, 'page', page);
        url = addQueryParam(url, 'size', pageSize);

        return axios.get(url, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);
