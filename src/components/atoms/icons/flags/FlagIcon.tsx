import React, { useMemo } from 'react';
import { IconProps } from '../IconProps';
import { Nl } from './nl';
import { En } from './en';
import { De } from './de';
import { languages } from '../../../../state';

export interface FlagIconProps extends IconProps {
    flagCode?: string;
    locale?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = (props) => {
    const flagCodeToDisplay = useMemo(() => {
        if (props.flagCode !== undefined) {
            return props.flagCode;
        } else if (props.locale !== undefined) {
            return languages.findIndex((language) => language.locale === props.locale) !== -1 ? props.locale.slice(0, 2) : 'en';
        }

    }, [props.flagCode, props.locale]);

    const {width = '21', height = "26"} = props;

    switch (flagCodeToDisplay) {
        case 'nl':
            return <Nl width={width} height={height} className={props.className}/>;
        case 'uk':
        case 'en':
            return <En width={width} height={height} className={props.className}/>;
        case 'de':
            return <De width={width} height={height} className={props.className}/>;
        default:
            return null;
    }
};
