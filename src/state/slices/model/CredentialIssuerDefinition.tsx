import { Did } from '../did';

export interface CredentialIssuerCredentialType {
    id?: string;
    credentialType?: string;
    typeOrder?: number;
}

export interface CredentialIssuerCredentialDisplay {
    id?: string;
    displayName?: string;
    backgroundColor?: string;
    textColor?: string;
    backgroundImageUrl?: string;
    backgroundAltText?: string;
    locale?: string;
}

export interface CredentialIssuerCredentialAttributeDisplay {
    id?: string;
    displayName?: string;
    locale?: string;
}

export interface CredentialIssuerCredentialAttribute {
    id?: string;
    displays?: CredentialIssuerCredentialAttributeDisplay[]
    attributeName?: string;
    attributeOrder?: number;
    mandatory?: boolean;
}

export interface CredentialIssuerCredentialDefinition {
    id?: string;
    credentialConfigurationId?: string;
    format?: string;
    displays?: CredentialIssuerCredentialDisplay[];
    types?: CredentialIssuerCredentialType[];
    attributes?: CredentialIssuerCredentialAttribute[];
    issuerDid?: Did;
    template?: string;
}

export interface CredentialIssuerDisplay {
    id?: string;
    displayName?: string;
    logoUrl?: string;
    logoAltText?: string;
    locale?: string;
}

export interface CredentialIssuerDefinition {
    id?: string;
    externalKey?: string;
    name?: string;
    description?: string;
    openIdCredentialIssuerUrl?: string;
    displays?: CredentialIssuerDisplay[];
    credentialDefinitions?: CredentialIssuerCredentialDefinition[];
    createdAt?: string;
    createdBy?: string;
    lastModifiedAt?: string;
    lastModifiedBy?: string;
}
