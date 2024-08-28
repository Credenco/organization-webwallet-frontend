import { createSlice } from '@reduxjs/toolkit';
import { defaultGenericState, GenericState } from '../model';
import { addGenericStateListBuilders, addGenericStateSingleBuilders } from '../slice';
import { addService, createDid, getDid, getDids, registerTrustedIssuer, updateDid } from './DidApi';

export interface Did {
    id: number;
    did: String;
    type: string;
    displayName?: string;
    createdAt?: Date;
    createdBy?: String;
    lastModifiedAt?: Date;
    lastModifiedBy?: String;
    document?: any;
    services: Service[];
    environment?: string;
}

export interface Service {
    serviceId: string;
    serviceType: string;
    serviceEndpoint: string;
}

export interface DidForm {
    id?: number;
    type: String;
    displayName?: string;
    options?: any;
}

export interface TrustedIssuerForm {
    didId?: number;
    schemaId?: string;
    taoWalletAddress?: string;
}

export interface DidState extends GenericState<Did> {
}

export const didSlice = createSlice({
    name: 'did',
    initialState: defaultGenericState,
    reducers: {},
    extraReducers: builder => {
        addGenericStateListBuilders(builder, getDids);
        addGenericStateSingleBuilders(builder, getDid);
        addGenericStateListBuilders(builder, createDid);
        addGenericStateListBuilders(builder, updateDid);
        addGenericStateListBuilders(builder, addService);
        addGenericStateSingleBuilders(builder, registerTrustedIssuer);
    },
});
