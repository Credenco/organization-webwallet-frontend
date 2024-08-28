import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../state';
import { InfoCard, OCard, TextInputWithLabel } from '../../molecules';
import { useTranslation } from 'react-i18next';
import { Receive } from '../../atoms/icons/Receive';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getPresentationDefinition, presentationDefinitionSelector } from '../../../state/slices/presentationdefinition';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'primereact/button';
import { hasText, isValidUrl } from '../../../utils';
import { getPresentationDefinitionCredentialOfferUrl, getPresentationDefinitionSession } from '../../../state/slices/presentationdefinitiontest/PresentationDefinitionTestApi';
import { clearTestState, presentationDefinitionTestSelector } from '../../../state/slices/presentationdefinitiontest';

export const PresentationDefinitionFormTestConfig: FC = () => {
    const dispatch = useAppDispatch();
    const [walletUrl, setWalletUrl] = useState<string>('http://localhost:3002');
    let navigation = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation();
    const sessionId = searchParams.get('id')
    const {t} = useTranslation();
    let presentationDefinition = useSelector(presentationDefinitionSelector);
    let presentationDefinitionTest = useSelector(presentationDefinitionTestSelector);
    const {presentationDefinitionId} = useParams()
    const {keycloak, initialized} = useKeycloak();

    useEffect(() => {
            if (presentationDefinitionId !== undefined) {
                dispatch(getPresentationDefinition({jwtToken: keycloak.token!, presentationDefinitionId: presentationDefinitionId}));
                dispatch(clearTestState({}));
            }
        }, [presentationDefinitionId]
    );
    useEffect(() => {
            dispatch(clearTestState({}));
            if ((sessionId !== undefined) && (sessionId !== null)) {
                dispatch(getPresentationDefinitionSession({jwtToken: keycloak.token!, sessionId: sessionId}))
            }
        }, [sessionId]
    );

    function testWithWallet() {
        dispatch(getPresentationDefinitionCredentialOfferUrl({
            jwtToken: keycloak.token!,
            walletUrl: walletUrl,
            successUrl: window.location.origin + location.pathname + '?id=$id',
            presentationDefinitionExternalKey: presentationDefinition.singleItem?.externalKey!
        }))
            .then((response) => {
                if (response.type.includes('fulfilled')) {
                    // @ts-ignore
                    // console.log('QQQ response.payload: ', response.payload.presentationOfferUrl);
                    window.location.href = response.payload.presentationOfferUrl;
                }
            });
    }

    return (
        <>
            <div>
                <InfoCard className="mt-4" icon={<Receive height="30" width="30"/>}
                          title={t('screens.presentationDefinitionFormTestConfig.intro.title')}
                          description={t('screens.presentationDefinitionFormTestConfig.intro.description')}/>
                <OCard className="mt-4" title={t('screens.presentationDefinitionFormTestConfig.testWithWallet.title')}>
                    <TextInputWithLabel className="mb-3"
                                        label={t('screens.presentationDefinitionFormTestConfig.testWithWallet.walletUrl.label')}
                                        placeHolder={t('screens.presentationDefinitionFormTestConfig.testWithWallet.walletUrl.placeHolder')}
                                        value={walletUrl}
                                        inputType="url"
                                        onChangeValue={(value) => setWalletUrl(value!)}/>
                    <div className="text-xs" style={{color: 'rgba(28, 28, 28, 0.40)'}}>{t('screens.presentationDefinitionFormTestConfig.testWithWallet.description')}</div>
                    <Button className="mt-4" severity="secondary"
                            label={t('screens.presentationDefinitionFormTestConfig.testWithWallet.buttonTest')}
                            disabled={!(hasText(walletUrl) && isValidUrl(walletUrl))}
                            onClick={testWithWallet}
                    />
                </OCard>

                {(sessionId !== null && presentationDefinitionTest.singleItem?.sessionInfo !== undefined) && (
                    <OCard className="mt-4" title={t('screens.presentationDefinitionFormTestConfig.testWithWallet.title')}>
                        <div>{t('screens.presentationDefinitionFormTestConfig.testWithWallet.successfullyReceived')}</div>
                        <pre style={{overflow: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-word'}}>{JSON.stringify(presentationDefinitionTest.singleItem?.sessionInfo, undefined, 2)}</pre>
                    </OCard>
                )}
            </div>
        </>
    );
}
