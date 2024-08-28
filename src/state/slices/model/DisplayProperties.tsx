export interface BackgroundImage {
    url: string;
}

export interface LogoProperties {
    url: string;
    altText?: string;
}

export interface DisplayProperties {
    name?: string;
    logo?: LogoProperties;
    description?: string;
    backgroundImage?: BackgroundImage;
    backgroundColor?: string;
    textColor?: string;
}
