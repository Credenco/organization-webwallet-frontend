import React, { CSSProperties, PropsWithChildren } from 'react';
import { Image } from 'primereact/image';
import { CredentialType } from '../../state/slices/credentialtype';
import { Button } from 'primereact/button';
import { Checkbox } from './Checkbox';


export interface CredentialTypeCardProps {
    credentialType: CredentialType;
    className?: string | undefined;
    onRequestCredentialClicked?: (credentialType: CredentialType) => void;
    selected?: boolean | undefined;
    onSelectionChanged?: (credentialType: CredentialType, selected: boolean) => void;
    showSelectionCheckbox?: boolean;
    onClick?: (credentialType: CredentialType) => void;
}

export const CredentialTypeCard: React.FC<CredentialTypeCardProps & PropsWithChildren> = (props) => {

    const {showSelectionCheckbox = false, selected = false} = props;

    function getBackground() {
        if (props.credentialType.credentialTypeDisplay?.backgroundImage?.url) {
            return {backgroundImage: 'url(' + props.credentialType.credentialTypeDisplay?.backgroundImage?.url + ')', backgroundSize: '100% 100%'};
        } else if (props.credentialType.issuerDisplay?.backgroundImage?.url) {
            return {backgroundImage: 'url(' + props.credentialType.issuerDisplay?.backgroundImage?.url + ')', backgroundSize: '100% 100%'};
        } else if (props.credentialType.credentialTypeDisplay?.backgroundColor) {
            return {backgroundColor: props.credentialType.credentialTypeDisplay?.backgroundColor};
        } else {
            return {
                backgroundColor: '#f7f9fb',
                border: '1px solid #eaecf1'
            };
        }
    }

    function getTextColor() {
        if (props.credentialType.credentialTypeDisplay?.backgroundColor) {
            return {color: props.credentialType.credentialTypeDisplay?.textColor};
        } else {
            return {};
        }
    }

    function getIssuerTextStyle(): CSSProperties {
        return Object.assign({}, getTextColor(), {fontSize: '1.0rem'});
    }

    function getLogo(className: string) {
        if (props.credentialType.credentialTypeDisplay?.logo?.url) {
            return (
                <Image className={className} src={props.credentialType.credentialTypeDisplay?.logo?.url} alt="{props.credentialType.displayProperties?.credentialTypeDisplay?.logo?.altText}" height="30spx"/>
            )
        } else if (props.credentialType.issuerDisplay?.logo?.url) {
            return (
                <img className={className} src={props.credentialType.issuerDisplay?.logo?.url} alt="{props.credentialType.displayProperties?.issuerDisplay?.logo?.altText}" style={{
                    maxHeight: '30px',
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
        <div>
            <div className="mb-2 p-0" style={Object.assign({aspectRatio: 270 / 170, maxWidth: 350, borderRadius: 16}, getBackground())}
                 onClick={event => props.onClick && props.onClick(props.credentialType)}>
                <div className="flex flex-column justify-content-between p-3 " style={{minHeight: '90px', height: '85%'}}>
                    <div className="flex justify-content-between align-items-start">
                        <div className="flex flex-column">
                            <p className="m-0 font-semibold mb-1" style={getIssuerTextStyle()}>{props.credentialType.issuerDisplay?.name}</p>
                            <p className="m-0 mb-1" style={Object.assign({maxLines: 3, fontSize: '0.75rem'}, getTextColor())}>{props.credentialType.credentialTypeDisplay?.name}</p>
                        </div>
                        {(showSelectionCheckbox) && (
                            <div className="flex p-1 justify-content-center align-items-center" style={{borderRadius: 8, background: 'rgba(255, 255, 255, 0.40)'}}
                                 onClick={event => props.onSelectionChanged && props.onSelectionChanged(props.credentialType, !selected)}><Checkbox selected={selected}/></div>
                        )}
                    </div>
                    {props.onRequestCredentialClicked && (
                        <Button label="Request" size="small" className="w-min" onClick={event => props.onRequestCredentialClicked!(props.credentialType)}/>
                    )}
                </div>
                <div className="flex flex-column align-items-end" style={{backgroundColor: 'rgba(255,255,255,0.9)', height: '36px', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                    <div className="flex flex-column justify-content-center " style={{height: '36px'}}>
                        {getLogo("mr-3 flex flex-column justify-content-center")}
                    </div>
                </div>
            </div>
        </div>
    );
};

