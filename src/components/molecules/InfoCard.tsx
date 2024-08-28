import React from 'react';
import { OCard } from './OCard';
import { Avatar } from 'primereact/avatar';

interface InfoCardProps {
    className?: string | undefined;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const InfoCard: React.FC<InfoCardProps> = (props) => {
    return (
        <OCard className={props.className}>
            <div className="flex">
                <Avatar shape="circle" size="xlarge" style={{backgroundColor: '#FFFFFF', minWidth: '4rem', maxWidth: '4rem'}}>
                    {props.icon}
                </Avatar>
                <div className="flex flex-column justify-content-center" style={{marginLeft: 24}}>
                    <div className="font-semibold pb-2" style={{color: '#1C1C1C'}}>{props.title}</div>
                    <div style={{color: 'rgba(28, 28, 28, 0.80)'}}>{props.description}</div>
                </div>
            </div>
        </OCard>
    );
};

