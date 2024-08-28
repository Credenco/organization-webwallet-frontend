import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';


export interface EmptyCreateNewCredentialCardProps {
    className?: string | undefined;
    onClick?: () => void;
}

export const EmptyCreateNewCredentialCard: React.FC<EmptyCreateNewCredentialCardProps & PropsWithChildren> = (props) => {
    const {t} = useTranslation();
    return (
        <div className={props.className} style={{aspectRatio: 270 / 170, maxWidth: 350, borderRadius: 16, borderColor: 'rgba(0,0,0,0.2)', borderStyle: 'dashed', borderWidth: 1, backgroundColor: 'white'}}
             onClick={event => props.onClick && props.onClick!()}>
            <div className="flex flex-column justify-content-center align-items-center w-full h-full  cursor-pointer">
                <div className="flex align-items-center">
                    <i className="pi pi-plus mr-2"></i>
                    <p className="m-0 font-semibold ">{t('screens.credentialCard.requestCredential')}</p>
                </div>
            </div>
        </div>
    );
};

