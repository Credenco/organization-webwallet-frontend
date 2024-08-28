import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericState, GenericState } from '../model';
import { addGenericStateSingleBuilders } from '../slice';
import { getUser, updateUser, updateUserPreference } from './UserApi';


export interface User {
    name: string;
    fullName: string;
    firstName: string;
    lastName: string;
    organization: string;
    base64EncodedOrganizationLogo: string;
    locale: string;
    userPreferences: UserPreference[];
}

export interface UserPreference {
    preferenceKey: string;
    preferenceValue: string;

}
export interface UserState extends GenericState<User> {
}

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultGenericState,
    reducers: {},
    extraReducers: builder => {
        addGenericStateSingleBuilders(builder, getUser);
        addGenericStateSingleBuilders(builder, updateUser);
        addGenericStateSingleBuilders(builder, updateUserPreference);
    },
});

export const getUserPreference = (user: User, preferenceKey: string): UserPreference | undefined => {
    return user.userPreferences.find(preference => preference.preferenceKey === preferenceKey);
}

export const getUserPreferenceWithDefault = (user: User | undefined, preferenceKey: string, defaultValue: string): string => {
    if ((user === undefined) || (user?.userPreferences === undefined)) {
        return defaultValue;
    }
    const valueFound = user?.userPreferences.find(preference => preference.preferenceKey === preferenceKey);
    return (valueFound === undefined) ? defaultValue : valueFound.preferenceValue;
}
