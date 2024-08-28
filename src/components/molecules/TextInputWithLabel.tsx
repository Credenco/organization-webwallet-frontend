import React, { HTMLInputTypeAttribute } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


export interface TextInputWithLabelProps {
    label: string;
    value?: string | undefined;
    onChangeValue: (value: string | undefined) => void;
    placeHolder?: string | undefined;
    className?: string | undefined;
    multiline?: boolean | undefined;
    inputType?: HTMLInputTypeAttribute | undefined;
    footer?: React.ReactNode | undefined;
    postElement?: React.ReactNode | undefined;
}

export const TextInputWithLabel: React.FC<TextInputWithLabelProps> = (props) => {

    const {multiline = false} = props;
    const {inputType = 'text'} = props;

    return (
        <div className={props.className} style={{border: 'none', borderRadius: 16, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 14, backgroundColor: '#ffffff'}}>
            <div className="text-xs pb-1 pl-2" style={{color: 'rgba(28, 28, 28, 0.40)'}}>{props.label}</div>
            <div className="flex">
            {multiline && (
                <InputTextarea className="w-full" value={props.value} style={{border: 'none'}} onChange={(e) => props.onChangeValue(e.target.value)} placeholder={props.placeHolder}/>
            )}
            {!multiline && (
                <InputText className="w-full" value={props.value} style={{border: 'none'}}
                           onChange={(e) => props.onChangeValue(e.target.value)}
                           type={inputType}
                           placeholder={props.placeHolder}/>
            )}
                {props.postElement && (
                    <>{props.postElement}</>
                )}
            </div>
            {props.footer && (
                <>{props.footer}</>
            )}
        </div>
    );
};

