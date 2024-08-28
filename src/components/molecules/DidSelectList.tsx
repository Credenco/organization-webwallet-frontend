import React, { PropsWithChildren } from 'react';
import { Did } from '../../state/slices/did';
import { Dropdown } from 'primereact/dropdown';


export interface DidSelectListProps {
    didList: Did[];
    selectedDid: Did | undefined;
    onSelect: (did: Did) => void;
    className?: string | undefined;
}

export const DidSelectList: React.FC<DidSelectListProps & PropsWithChildren> = (props) => {
    function onSelectItem(did: Did) {
        props.onSelect(did);
    }

    return (
        <Dropdown value={props.selectedDid} onChange={(e) => onSelectItem(e.value)}
                  options={props.didList} optionLabel="displayName"
                  placeholder="Select a Did"
                  className="w-full md:w-14rem"
                  checkmark={true}
                  highlightOnSelect={false} />

    );
};

