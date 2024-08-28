import React, { useMemo } from 'react';


export interface BreadCrumbItem {
    label: string;
    path: string;
    parent?: BreadCrumbItem;
}

export interface BreadCrumbProps {
    breadCrumb?: BreadCrumbItem;
    className?: string | undefined;
}

export const OBreadCrumb: React.FC<BreadCrumbProps> = (props) => {

    function flatten(item: BreadCrumbItem | BreadCrumbItem[]): BreadCrumbItem[] {
        const flat: BreadCrumbItem[] = [];
        if (Array.isArray(item)) {
            flat.push(...flatten(item));
        } else if (item.parent) {
            flat.push(...flatten(item.parent));
            flat.push(item);
        } else {
            flat.push(item);
        }

        return flat;
    }

    const crumbs = useMemo(() => {
        if (props.breadCrumb === undefined) {
            return [];
        }
        return flatten(props.breadCrumb!);
    }, [props.breadCrumb]);

    if (props.breadCrumb === undefined) {
        return null;
    }

    return (
        <div className="flex">
            {crumbs.map((crumb, index) => {
                return (index < crumbs.length - 1) ?
                    (<div className="flex" style={{color: 'rgba(0,0,0,0.4)'}} key={index}>
                            <div key={index}>{crumb.label}</div>
                            <div className="ml-2 mr-2">/</div>
                        </div>
                    ) : (
                        <div key={index}>{crumb.label}</div>
                    );
            })
            }
        </div>
    );
};

