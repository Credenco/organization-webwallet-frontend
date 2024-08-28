import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { credentialSlice, CredentialState } from './slices/credential/CredentialSlice';
import { globalSlice, GlobalState, issuedCredentialSlice, IssuedCredentialState } from './slices';
import { userSlice, UserState } from './slices/user/UserSlice';
import { credentialTypeSlice, CredentialTypeState } from './slices/credentialtype/CredentialTypeSlice';
import { didSlice, DidState } from './slices/did';
import { exchangeSlice, ExchangeState } from './slices/exchange';
import { presentationDefinitionSlice, PresentationDefinitionState } from './slices/presentationdefinition';
import { presentationDefinitionFormSlice, PresentationDefinitionFormState } from './slices/presentationdefinitionform';
import { presentationDefinitionTestSlice, PresentationDefinitionTestState } from './slices/presentationdefinitiontest';
import { credentialIssuerDefinitionSlice, CredentialIssuerDefinitionState } from './slices/credentialissuerdefinition';
import { credentialIssuerDefinitionFormSlice, CredentialIssuerDefinitionFormState } from './slices/credentialissuerdefinitionform';
import { historySlice, HistoryState } from "./slices/history";


export interface ApplicationState {
    globalState: GlobalState;
    userState: UserState;
    credentialState: CredentialState;
    credentialTypeState: CredentialTypeState;
    didState: DidState;
    exchangeState: ExchangeState;
    presentationDefinitionState: PresentationDefinitionState;
    presentationDefinitionFormState: PresentationDefinitionFormState;
    presentationDefinitionTestState: PresentationDefinitionTestState;
    credentialIssuerDefinitionState: CredentialIssuerDefinitionState;
    credentialIssuerDefinitionFormState: CredentialIssuerDefinitionFormState;
    historyState: HistoryState;
    issuedCredentialState: IssuedCredentialState;
}

const rootReducer = combineReducers<ApplicationState>({
    globalState: globalSlice.reducer,
    userState: userSlice.reducer,
    credentialState: credentialSlice.reducer,
    credentialTypeState: credentialTypeSlice.reducer,
    didState: didSlice.reducer,
    exchangeState: exchangeSlice.reducer,
    presentationDefinitionState: presentationDefinitionSlice.reducer,
    presentationDefinitionFormState: presentationDefinitionFormSlice.reducer,
    presentationDefinitionTestState: presentationDefinitionTestSlice.reducer,
    credentialIssuerDefinitionState: credentialIssuerDefinitionSlice.reducer,
    credentialIssuerDefinitionFormState: credentialIssuerDefinitionFormSlice.reducer,
    historyState: historySlice.reducer,
    issuedCredentialState: issuedCredentialSlice.reducer
});
export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
