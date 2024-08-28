import React, { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { Credential } from '../../state';
import { Checkbox } from './Checkbox';


export interface CredentialCardProps {
    credential: Credential;
    className?: string | undefined;
    onClick?: (credential: Credential) => void;
    style?: React.CSSProperties | undefined;
    scaleFactor?: number;
    selected?: boolean | undefined;
}

export const CredentialCard: React.FC<CredentialCardProps & PropsWithChildren> = (props) => {

    const scaleFactor = useMemo(() => {
        return props.scaleFactor ? props.scaleFactor : 1;
    }, [props.scaleFactor]);

    function getBackgroundColor() {
        return props.credential.displayProperties?.credentialTypeDisplay?.backgroundColor;
    }


    function getBackground() {
        if (props.credential.displayProperties?.credentialTypeDisplay?.backgroundImage?.url) {
            return {backgroundImage: 'url(' + props.credential.displayProperties?.credentialTypeDisplay?.backgroundImage?.url + ')', backgroundSize: '100% 100%'};
        } else if (props.credential.displayProperties?.issuerDisplay?.backgroundImage?.url) {
            return {backgroundImage: 'url(' + props.credential.displayProperties?.issuerDisplay?.backgroundImage?.url + ')', backgroundSize: '100% 100%'};
        } else if (props.credential.displayProperties?.credentialTypeDisplay?.backgroundColor) {
            return {backgroundColor: getBackgroundColor()};
        } else {
            return {backgroundImage: 'url(\'/EmptyCard.svg\')', backgroundSize: '100% 100%'};
        }
    }

    function getTextColor() {
        if (props.credential.displayProperties?.credentialTypeDisplay?.backgroundColor) {
            return {color: props.credential.displayProperties?.credentialTypeDisplay?.textColor};
        } else {
            return {color: "#FFFFFF"};
        }
    }

    function getIssuerTextStyle(): CSSProperties {
        return Object.assign({}, getTextColor(), {fontSize: (1.0 * scaleFactor) + 'rem'});
    }

    function getLogo(className: string) {
        if (props.credential.displayProperties?.credentialTypeDisplay?.logo?.url) {
            return (
                <img className={className} src={props.credential.displayProperties?.credentialTypeDisplay?.logo?.url} alt="{props.credential.displayProperties?.credentialTypeDisplay?.logo?.altText}" style={{
                    maxHeight: (scaleFactor * 30) + 'px',
                    maxWidth: '70px',
                    height: 'auto',
                    width: 'auto'
                }}/>
            )
        } else if (props.credential.displayProperties?.issuerDisplay?.logo?.url) {
            return (
                <img className={className} src={props.credential.displayProperties?.issuerDisplay?.logo?.url} alt="{props.credential.displayProperties?.issuerDisplay?.logo?.altText}" style={{
                    maxHeight: (scaleFactor * 30) + 'px',
                    maxWidth: '70px',
                    height: 'auto',
                    width: 'auto'
                }}/>
            )
        } else {
            return null;
        }
    }

    return (
        <div className="mb-2 p-0" style={Object.assign({aspectRatio: 270 / 170, maxWidth: (350 * scaleFactor) + 'px', borderRadius: (16 * scaleFactor)}, getBackground())} onClick={event => props.onClick && props.onClick!(props.credential)}>
            <div className="flex flex-column justify-content-between p-3" style={{minHeight: (90 * scaleFactor) + 'px', height: '85%', minWidth: (300 * scaleFactor) + 'px'}}>
                <div className="flex justify-content-between align-items-start">
                    <div className="flex flex-column">
                        <p className="m-0 font-semibold mb-1 " style={getIssuerTextStyle()}>{props.credential.displayProperties?.issuerDisplay?.name} </p>
                        <p className="m-0 mb-1" style={Object.assign({maxLines: 3, fontSize: (0.75 * scaleFactor) + 'rem'}, getTextColor())}>{props.credential.displayProperties?.credentialTypeDisplay?.name}</p>
                    </div>
                    {props.selected !== undefined ? <div className="flex p-1 justify-content-center align-items-center" style={{borderRadius: 8, background: 'rgba(255, 255, 255, 0.40)'}}><Checkbox selected={props.selected} /></div> : <></>}
                </div>
            </div>
            <div className="flex flex-column align-items-end" style={{backgroundColor: 'rgba(255,255,255,0.9)', height: (36 * scaleFactor) + 'px', borderBottomLeftRadius: (15 * scaleFactor), borderBottomRightRadius: (15 * scaleFactor)}}>
                <div className="flex flex-column justify-content-center " style={{height: (36 * scaleFactor) + 'px'}}>
                    {getLogo("mr-3 flex flex-column justify-content-center")}
                </div>
            </div>
        </div>
    );
};

