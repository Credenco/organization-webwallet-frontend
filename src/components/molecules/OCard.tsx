import React, { PropsWithChildren } from 'react';

interface CardProps {
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    title?: string | React.ReactNode | undefined;
    titlePrefix?: React.ReactNode | undefined;
}

export const OCard: React.FC<CardProps & PropsWithChildren> = (props) => {
    return (
        <div className={props.className} style={Object.assign({backgroundColor: '#E5ECF6', padding: 24, borderRadius: 16}, props.style)}>
            {(props.titlePrefix || props.title) && (
            <div className="flex pb-4 align-items-center">
                {(props.titlePrefix) && (<>{props.titlePrefix}</>)}
                {(props.title) && (<div className="font-semibold">{props.title}</div>)}
            </div>
            )}
            {props.children}
        </div>
    );
};

