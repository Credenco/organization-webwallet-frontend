import React, { PropsWithChildren } from 'react';
import { Credential } from '../../state';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Did } from '../../state/slices/did';
import { CredentialType } from '../../state/slices/credentialtype';


export interface DidCardProps {
    did: Did;
    className?: string | undefined;
    onClick?: (did: Did) => void;
}

export const DidCard: React.FC<DidCardProps & PropsWithChildren> = (props) => {
    return (
        <Card className={props.className} title={props.did.type.toUpperCase()} onClick={event => props.onClick!(props.did)}>
            <div>
                <p className="m-0">{props.did.displayName}</p>
            </div>
        </Card>
    );
};

