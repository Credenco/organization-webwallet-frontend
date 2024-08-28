import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import AuthenticationStateHandler from './components/organisms/AuthenticationStateHandler';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import {
    CredentialDetails,
    CredentialIssuerCredentialDefinitionForm,
    CredentialIssuerDefinitionForm,
    CredentialIssuerDefinitionList,
    CredentialTypeList,
    DidDetails,
    DidList,
    I18n,
    IssueCredential,
    MainMenuLayout,
    PresentationDefinitionFormConfigureCredentials,
    PresentationDefinitionFormSelectCredentials,
    PresentationDefinitionFormTestConfig,
    PresentationDefinitionList
} from './components';
import { configureAxiosDefaults } from './AxiosConfig';
import { AuthenticationProvider } from './components/organisms/AuthenticationProvider';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './theme/themes/mytheme/theme.scss';
import 'primeflex/primeflex.scss';
import { Home } from './components/pages/Home';
import { VerifyCredential } from './components/pages/VerifyCredential';
import { DidCreate } from './components/pages/DidCreate';
import { HistoryList } from "./components/pages/HistoryList";
import { IssuerTrust } from './components/pages/IssuerTrust';
import { IssuedCredentialsList } from './components/pages/IssuedCredentialsList';
import { IssuedCredentialDetails } from './components/pages/IssuedCredentialDetails';

function App() {

    configureAxiosDefaults(store);

    const router = createBrowserRouter([
        {
            path: "*", element: <Root/>, handle: {
                crumb: () => "Home"
            }
        },
    ]);

    function Root() {
        // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
        // component below are unchanged
        return (
            <AuthenticationProvider>
                <AuthenticationStateHandler>
                    <AuthenticationStateHandler.Loading>
                        <div>Loading</div>
                    </AuthenticationStateHandler.Loading>
                    <AuthenticationStateHandler.AuthenticationExpired>
                        <div>Expired token</div>
                    </AuthenticationStateHandler.AuthenticationExpired>
                    <AuthenticationStateHandler.UnAuthenticated>
                        <Login/>
                    </AuthenticationStateHandler.UnAuthenticated>
                    <AuthenticationStateHandler.Authenticated>
                        <Routes>
                            <Route path="/" element={<MainMenuLayout/>}>
                                <Route path="/" element={<Home/>}
                                       handle={{crumb: () => "Home2"}}
                                />
                                <Route path="*" element={<Home/>}/>
                                <Route path="/did" element={<DidList/>}/>
                                <Route path="/did/:didId" element={<DidDetails/>}/>
                                <Route path="/did/new" element={<DidCreate/>}/>
                                <Route path="/credential/details/:credentialId" element={<CredentialDetails/>} handle={{crumb: (data: any) => <span>{data.threadName}</span>}}/>
                                <Route path="/credential/new" element={<CredentialTypeList/>}/>
                                <Route path="/credential/issue" element={<IssueCredential/>}/>
                                <Route path="/credential/verify" element={<VerifyCredential/>}/>
                                <Route path="/issuedCredential" element={<IssuedCredentialsList/>}/>
                                <Route path="/issuedCredential/details/:issuedCredentialId" element={<IssuedCredentialDetails/>} handle={{crumb: (data: any) => <span>{data.threadName}</span>}}/>
                                <Route path="/presentationDefinition" element={<PresentationDefinitionList/>}/>
                                <Route path="/presentationDefinition/new" element={<PresentationDefinitionFormSelectCredentials/>}/>
                                <Route path="/presentationDefinition/edit/:presentationDefinitionId" element={<PresentationDefinitionFormSelectCredentials/>}/>
                                <Route path="/presentationDefinition/configure" element={<PresentationDefinitionFormConfigureCredentials/>}/>
                                <Route path="/presentationDefinition/test/:presentationDefinitionId" element={<PresentationDefinitionFormTestConfig/>}/>
                                <Route path="/credentialIssuerDefinition" element={<CredentialIssuerDefinitionList/>}/>
                                <Route path="/credentialIssuerDefinition/new" element={<CredentialIssuerDefinitionForm/>}/>
                                <Route path="/credentialIssuerDefinition/edit/:credentialIssuerDefinitionId" element={<CredentialIssuerDefinitionForm/>}/>
                                <Route path="/credentialIssuerDefinition/:credentialIssuerDefinitionId/credentialIssuerCredential/new" element={<CredentialIssuerCredentialDefinitionForm/>}/>
                                <Route path="/credentialIssuerDefinition/:credentialIssuerDefinitionId/credentialIssuerCredential/edit/:credentialIssuerCredentialId" element={<CredentialIssuerCredentialDefinitionForm/>}/>
                                <Route path="/trustedIssuer" element={<IssuerTrust/>}/>
                                <Route path="/history" element={<HistoryList/>}/>
                            </Route>
                        </Routes>
                    </AuthenticationStateHandler.Authenticated>
                </AuthenticationStateHandler>
            </AuthenticationProvider>
        );
    }


    return (
        <Provider store={store}>
            <I18n/>
            <PrimeReactProvider>
                <RouterProvider router={router}/>
            </PrimeReactProvider>
        </Provider>
    );
}

export default App;
