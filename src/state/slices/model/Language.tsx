export interface Language {
    locale: string;
    name: string;
    fullName: string;
    flagCode: string;
}

export const languages = [
    {locale: 'de-DE', name: 'DE', fullName: 'German', flagCode: 'de'},
    {locale: 'en-US', name: 'ENG', fullName: 'English', flagCode: 'uk'},
    {locale: 'nl-NL', name: 'NL', fullName: 'Dutch', flagCode: 'nl'},
]

export const webUiLanguages = ['nl-NL', 'en-US'];
