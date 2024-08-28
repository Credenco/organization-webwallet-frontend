import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../global';

import { bearerAuth } from '../auth';
import axios from 'axios';
import { UserPreference } from './UserSlice';


export const getUser = createAsyncThunk(
    'user/getUser', ({jwtToken}: { jwtToken: string | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        ;
        return axios.get('/user', config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const updateUser = createAsyncThunk(
    'user/updateUser', ({jwtToken, locale, userPreferences = []}: { jwtToken: string | undefined, locale: string, userPreferences: UserPreference[] | undefined }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        const body = {
            locale: locale,
            userPreferences: userPreferences
        };
        return axios.post('/user', body, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);

export const updateUserPreference = createAsyncThunk(
    'user/updateUserPreference', ({jwtToken, locale, currentUserPreferences, userPreferenceToUpdate}: {
        jwtToken: string | undefined,
        locale: string,
        currentUserPreferences: UserPreference[] | undefined,
        userPreferenceToUpdate: UserPreference
    }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        const config = {
            headers: {'Authorization': bearerAuth(jwtToken)}
        };
        const newPrefs: UserPreference[] = Object.assign([], currentUserPreferences);
        const index = newPrefs.findIndex(preference => preference.preferenceKey === userPreferenceToUpdate.preferenceKey);
        if (index > 0) {
            newPrefs[index] = userPreferenceToUpdate
        } else {
            newPrefs.push({preferenceKey: userPreferenceToUpdate.preferenceKey, preferenceValue: userPreferenceToUpdate.preferenceValue});
        }

        const body = {
            locale: locale,
            userPreferences: newPrefs
        };

        return axios.post('/user/preferences', body, config)
            .then(response => {
                return response.data
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false));
            });
    },
);


