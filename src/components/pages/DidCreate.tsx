import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';
import { FC, useMemo, useState } from 'react';
import { useAppDispatch } from '../../state';
import { Button } from 'primereact/button';
import { createDid } from '../../state/slices/did/DidApi';
import { OCard, TextInputWithLabel } from '../molecules';
import { IdentificationCard } from '../atoms';
import { InfoCard } from '../molecules/InfoCard';
import { DidForm } from '../../state/slices/did';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';

import { DropdownWithLabel } from '../molecules/DropdownWithLabel';
import { useTranslation } from 'react-i18next';

export const DidCreate: FC = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {keycloak, initialized} = useKeycloak();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isVisible, setIsVisible] = useState<boolean>();
    const didTypes = [
        { label: 'JWK' },
        { label: 'EBSI' },
    ];
    const ebsiEnvironments = [
        { label: 'Conformance', optionValue: 'conformance' },
        { label: 'Pilot', optionValue: 'pilot' },
    ];
    const [selectedDidType, setSelectedDidType] = useState<any>(didTypes[0]);
    const [selectedEbsiEnvironment, setSelectedEbsiEnvironment] = useState<any>(ebsiEnvironments[1]);
    const [taoWalletAddress, setTaoWalletAddress] = useState<string|undefined>('');

    const [didForm, setDidForm] = useState<DidForm>({type: didTypes[0].label, displayName: ''});
    let navigate = useNavigate();

    function onSelectItem(didType: any) {
        setSelectedDidType(didType);
        var options = {};
        if (didType.label === 'EBSI') {
            options = {ebsiEnvironment: ebsiEnvironments[1].optionValue}
            setSelectedEbsiEnvironment(ebsiEnvironments[1]);
        }
        setDidForm(Object.assign({}, didForm, {type: didType.label, options: options}));
    }

    function handleFormUpdate(attributeName: string, value: string | undefined) {
        setDidForm(Object.assign({}, didForm, {[attributeName]: value}));
    }

    function onSelectEbsiEnvironment(ebsiEnvironment: any) {
        console.log(ebsiEnvironment);
        setSelectedEbsiEnvironment(ebsiEnvironment);
        setDidForm(Object.assign({}, didForm, {options: { ebsiEnvironment: ebsiEnvironment.optionValue, taoWalletAddress: taoWalletAddress}}));
    }

    function onSetTaoWalletAddress(taoWalletAddress?: string) {
        console.log(taoWalletAddress);
        setTaoWalletAddress(taoWalletAddress);
        setDidForm(Object.assign({}, didForm, {options: { ebsiEnvironment: selectedEbsiEnvironment.optionValue, taoWalletAddress: taoWalletAddress}}));
    }

    function handleCreateDid() {
        setIsLoading(true)
        dispatch(createDid({jwtToken: keycloak.token!, didForm: didForm!})).then((response) => {
            setIsLoading(false);
            if (response.type.includes('fulfilled')) {
                navigate(`/did`)
            }
        });
    }

    const isValidForm = useMemo(() => {
        if (didForm.displayName === undefined || didForm.displayName.length === 0) {
            return false;
        }
        if (selectedDidType.label === 'EBSI' && selectedEbsiEnvironment.optionValue === 'pilot' && (taoWalletAddress === undefined || taoWalletAddress.length === 0 || !taoWalletAddress.startsWith("http"))) {
            return false;
        }
        return true;
    }, [didForm]);

    return (
        <>
            {isLoading ? <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar> : <></>}
            <div>
                <InfoCard className="mb-4"
                          title={t('screens.settings.did.create.title')}
                          description={t('screens.settings.did.create.description')}
                          icon={<IdentificationCard width="40" height="40"/>} />

                <OCard className="mt-5 mb-4">
                    <DropdownWithLabel label={t('screens.settings.did.attributes.type.label')} className="mb-3"
                                       value={selectedDidType} onChangeValue={(e) => onSelectItem(e)}
                                       options={didTypes} optionLabel='label'/>
                    <TextInputWithLabel className="mb-3"
                                        label={t('screens.settings.did.attributes.displayName.label')}
                                        placeHolder={t('screens.settings.did.attributes.displayName.placeHolder')}
                                        value={didForm.displayName}
                                        onChangeValue={(value) => handleFormUpdate('displayName', value)}/>
                    {selectedDidType.label === 'EBSI' ? <DropdownWithLabel label={t('screens.settings.did.attributes.ebsiEnvironment.label')} className="mb-3"
                                       value={selectedEbsiEnvironment} onChangeValue={(e) => onSelectEbsiEnvironment(e)}
                                       options={ebsiEnvironments} optionLabel='label'/> : <></> }
                    {selectedDidType.label === 'EBSI' && selectedEbsiEnvironment.optionValue === 'pilot' ? <TextInputWithLabel className="mb-3"
                                                                                                                               label={t('screens.settings.did.attributes.taoWalletAddress.label')}
                                                                                                                               placeHolder={t('screens.settings.did.attributes.taoWalletAddress.placeHolder')}
                                                                                                                               value={taoWalletAddress}
                                                                                                                               onChangeValue={(value) => onSetTaoWalletAddress(value)}/>
                        : <></> }

                </OCard>
            </div>
            <Button className="p-2 m-2" onClick={handleCreateDid} disabled={!isValidForm}>{t('screens.settings.dids.createDid')}</Button>
        </>
    );
};
