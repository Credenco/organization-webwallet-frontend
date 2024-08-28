export interface AppTexts {
    appName: {
        displayName: string;
        name: string;
    };
    busyInitializing: string;
    menu: {
        dashboard: string;
        wallet: string;
        walletOverview: string;
        settings: string;
        newCredential: string;
        receive: string;
        history: string;
        advanced: string;
        logoff: string;
        issuer: string;
        issuerTemplates: string;
        issuerTrust: string;
        identifiers: string;
        generic: string;
        verifier: string;
        verifierTemplate: string;
        trustAchor: string;
        catalogConfig: string;
    };
    generic: {
        yes: string;
        no: string;
        ok: string;
        cancel: string;
        add: string;
        save: string;
        delete: string;
        edit: string;
        back: string;
        loading: string;
        accept: string;
        reject: string;
        search: string;
        startSearching: string;
        removeCredential: string;
    };
    error: {
        retrievingData: string;
        errorCodes: {
            "ERR-1": string;
        };
    };
    screens: {
        header: {
            welcomeTitle: string;
            welcomeSubTitle: string;
        }
        credentialCard: {
            requestCredential: string;
        }
        credentialTypeCard: {
            createNewTemplate: string;
        }
        credentialList: {
            title: string;
            emptyListMessage: string;
            searchNoCredentialsFound: string;
            requestNewCredential: string;
            searchTitle: string;
            myCredentials: string;
            issuanceDate: string;
            issuer: string;
            credentialType: string;
        }
        credentialDetail: {
            title: string;
            issuanceDate: string;
            issuer: string;
            credentialType: string;
            credentialTypeDescription: string;
            termsOfUse: {
                title: string,
                id: string;
                type: string;
            };
            status: {
                VALID: string;
                INVALID: string;
                EXPIRED: string;
            }
        }
        credentialTypeList: {
            title: string;
            intro: string;
            searchTitle: string;
            requestCredential: string;
        }
        credentialDetails: {
            deleteConfirmTitle: string;
            deleteConfirmMessage: string;
        }
        issueCredentials: {
            title: string;
            intro: string;
            issueTo: string;
        },
        verifyCredentials: {
            title: string;
            intro: string;
            noMatchingCredentials: string;
            successSummary: string;
            successDetail: string;
        },
        issuedCredentialList: {
            title: string;
            emptyListMessage: string;
            searchNoCredentialsFound: string;
            requestNewCredential: string;
            searchTitle: string;
            issuanceDate: string;
            issuer: string;
            credentialType: string;
        }
        issuedCredentialDetail: {
            title: string;
            issuanceDate: string;
            issuer: string;
            credentialType: string;
            credentialTypeDescription: string;
            termsOfUse: {
                title: string,
                id: string;
                type: string;
            };
        }

        presentationDefinitionList: {
            title: string;
        },
        presentationDefinitionFormSelectCredentials: {
            intro: {
                title: string;
                description: string;
            },
            searchTitle: string;
            searchPlaceHolder: string;
            selectedCredentialTypes: string;
            noCredentialTypesSelected: string;
            buttonStartConfiguration: string;
        },
        presentationDefinitionFormConfigureCredentials: {
            intro: {
                title: string;
                description: string;
            },
            saveConfigurationTitle: string;
            technicalConfigurationTitle: string;
            attributes: {
                externalKey: {
                    label: string;
                    placeHolder: string;
                }
                name: {
                    label: string;
                    placeHolder: string;
                }
                description: {
                    label: string;
                    placeHolder: string;
                }
                purpose: {
                    label: string;
                    placeHolder: string;
                }
                successRedirectUrl: {
                    label: string;
                    placeHolder: string;
                }
                errorRedirectUrl: {
                    label: string;
                    placeHolder: string;
                }
                clientUrl: {
                    label: string;
                    placeHolder: string;
                }
            }
            titleAttribute: string;
            titleAttributePlaceHolder: string;
            descriptionAttribute: string;
            descriptionAttributePlaceHolder: string;
            buttonSaveConfiguration: string;
        },
        presentationDefinitionFormTestConfig: {
            intro: {
                title: string;
                description: string;
            },
            testWithWallet: {
                title: string;
                description: string;
                walletUrl: {
                    label: string;
                    placeHolder: string;
                }
                buttonTest: string;
                successfullyReceived: string;
            }
        }
        credentialIssuerDefinitionList: {
            intro: {
                title: string;
                description: string;
            }
        },
        credentialIssuerDefinitionForm: {
            intro: {
                new: {
                    title: string;
                    description: string;
                }
                edit: {
                    title: string;
                    description: string;
                }
            },
            buttonSaveConfiguration: string;
            saveConfigurationTitle: string;
            saveChangesDialog: {
                title: string;
                message: string;
            }
            languageTitle: string;
            languagePlaceHolder: string;
            attributes: {
                externalKey: {
                    label: string;
                    placeHolder: string;
                }
                name: {
                    label: string;
                    placeHolder: string;
                }
                description: {
                    label: string;
                    placeHolder: string;
                }
                displayName: {
                    label: string;
                    placeHolder: string;
                }
                logo: {
                    label: string;
                    placeHolder: string;
                }
                logoAlt: {
                    label: string;
                    placeHolder: string;
                }
                issuerUrl: {
                    label: string;
                }
            },
            template: {
                title: string;
                selectDid: string;
            },
            trust: {
                title: string;
                registerIssuer: string;
            }
        },
        credentialIssuerDisplay: {
            title: string;
            defaultLanguageDescription: string;
            attributes: {
                name: {
                    label: string;
                    placeHolder: string;
                }
                logoUrl: {
                    label: string;
                    placeHolder: string;
                },
                logoImage: {
                    label: string;
                    placeHolder: string;
                },
                logoAlt: {
                    label: string;
                    placeHolder: string;
                }
            }
        },
        historyList: {
            intro: {
                title: string,
                description: string
            },
            date: string;
            time: string;
            event: string;
            action: string;
            user: string;
            party: string;
            noHistory: string;
            eventType: {
                CREDENTIAL: string;
                PRESENTATION: string;
            },
            actionType: {
                OFFER_RECEIVED: string;
                OFFER_ACCEPTED: string;
                DELETED: string;
            }
        },
        settings: {
            dids: {
                title: string;
                description: string;
                didType: string,
                didId: string,
                createDid: string;
            },
            did: {
                create: {
                    title: string;
                    description: string;
                    header: string;
                },
                attributes: {
                    didId : {
                        label: string;
                    },
                    type: {
                        label: string;
                        placeHolder: string;
                    },
                    displayName: {
                        label: string;
                        placeHolder: string;
                    },
                    ebsiEnvironment: {
                        label: string;
                        placeHolder: string;
                    },
                    serviceId: {
                        label: string;
                        placeHolder: string;
                    },
                    serviceType: {
                        label: string;
                        placeHolder: string;
                    },
                    serviceEndpoint: {
                        label: string;
                        placeHolder: string;
                    },
                    taoWalletAddress: {
                        label: string;
                        placeHolder: string;
                    }
                },
                title: string;
                description: string;
                services: string;
            }
        }
    }
}

const getAppTextsEn = (): AppTexts => {
    return {
        menu: {
            dashboard: 'Dashboard',
            walletOverview: 'Wallet',
            settings: 'Settings',
            newCredential: "Catalog",
            receive: "Verifier templates",
            history: 'Audit trail',
            advanced: 'Advanced',
            logoff: 'Logoff',
            issuer: 'Issuer',
            issuerTemplates: 'Templates',
            issuerTrust: 'Trust anchor',
            identifiers: 'Identifiers',
            generic: 'Generic',
            verifier: 'Verifier',
            verifierTemplate: 'Template',
            trustAchor: 'Trust anchor',
            catalogConfig: 'Catalog'
        },
        generic: {
            yes: 'Ja',
            no: 'Nee',
            ok: 'OK',
            cancel: 'Cancel',
            add: 'Add',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            back: 'Back',
            loading: 'Loading...',
            accept: 'Accept',
            reject: 'Reject',
            search: 'Search',
            startSearching: 'Start searching...',
            removeCredential: 'Remove credential'
        },
        error: {
            retrievingData: "Er is is mis gegaan bij het ophalen van de data. Probeer het later nog een keer.",
            errorCodes: {
                "ERR-1": 'E-mail adres is niet toegestaan. Gebruik uw zakelijke e-mail adres.'
            }
        },
        screens: {
            header: {
                welcomeTitle: 'Hi {{firstName}}',
                welcomeSubTitle: 'Welcome to the organization wallet of {{organizationName}}.',
            },
            credentialCard: {
                requestCredential: 'Request credential'
            },
            credentialTypeCard: {
                createNewTemplate: 'Create new template'
            },
            credentialList: {
                title: 'Wallet overview',
                emptyListMessage: 'Get started filling your wallet by requesting some credentials.',
                searchNoCredentialsFound: 'No credentials found',
                requestNewCredential: 'Request new credential',
                searchTitle: 'Search credentials',
                myCredentials: 'My credentials',
                issuanceDate: 'Issuance date',
                issuer: 'Issuer',
                credentialType: 'Type'
            },
            credentialDetail: {
                title: 'Credential details',
                issuanceDate: 'Issuance date',
                issuer: 'Issuer',
                credentialType: 'Type',
                credentialTypeDescription: 'Description',
                termsOfUse: {
                    title: 'Terms of use',
                    id: 'ID',
                    type: 'Type'
                },
                status: {
                    VALID: 'Valid',
                    INVALID: 'Invalid',
                    EXPIRED: 'Expired'
                }
            },
            credentialTypeList: {
                title: 'Request new credential',
                intro: 'Choose one of credentials from the pre-configured issuers',
                searchTitle: 'Search credentials of your preferred issuers'
            },
            credentialDetails: {
                deleteConfirmTitle: 'Delete credential?',
                deleteConfirmMessage: 'Are you sure you want to delete this credential? This action cannot be undone.'
            },
            issueCredentials: {
                title: 'Receive credential',
                intro: 'The following credentials will be issued by {{issuer}}.',
                issueTo: 'Issue credential to'
            },
            verifyCredentials: {
                title: 'Present credential(s)',
                intro: 'The following credentials are requested by {{verifierHost}} for the following purpose:',
                noMatchingCredentials: 'You don\'t have any credentials matching this presentation definition in your wallet.',
                successSummary: 'Successfully shared',
                successDetail: 'You successfully shared the requested credential(s).'
            },
            issuedCredentialList: {
                title: 'Issued Credentials',
                emptyListMessage: 'No Credentials issued yet.',
                searchNoCredentialsFound: 'No credentials found',
                requestNewCredential: 'Request new credential',
                searchTitle: 'Search issued credentials',
                issuanceDate: 'Issuance date',
                issuer: 'Issuer',
                credentialType: 'Type'
            },
            issuedCredentialDetail: {
                title: 'Issued Credential details',
                issuanceDate: 'Issuance date',
                issuer: 'Issuer',
                credentialType: 'Type',
                credentialTypeDescription: 'Description',
                termsOfUse: {
                    title: 'Terms of use',
                    id: 'ID',
                    type: 'Type'
                }
            },
            presentationDefinitionList: {
                title: 'Receive credential configurations'
            },
            presentationDefinitionFormSelectCredentials: {
                intro: {
                    title: 'Set up new configuration',
                    description: 'As a verifier you can set up a preconfigured request with credentials and specific details you would like to receive.'
                },
                searchTitle: 'Search credentials',
                searchPlaceHolder: 'What would you like to receive?',
                selectedCredentialTypes: 'Selected items',
                noCredentialTypesSelected: 'No credentials selected',
                buttonStartConfiguration: 'Start configuration'
            },
            presentationDefinitionFormConfigureCredentials: {
                intro: {
                    title: 'Configure the credentials you would like to receive',
                    description: 'Configure here additional configuration / restrictions per credential.'
                },
                saveConfigurationTitle: 'How would you like to save this configuration?',
                technicalConfigurationTitle: 'Technical configuration',
                attributes: {
                    externalKey: {
                        label: 'Technical configuration name',
                        placeHolder: 'The name of the configuration as used from your system'
                    },
                    name: {
                        label: 'Name',
                        placeHolder: 'A logical name of the configuration'
                    },
                    description: {
                        label: 'Description',
                        placeHolder: 'Describe your configuration in a few words so you can easily find it back later'
                    },
                    purpose: {
                        label: 'Purpose',
                        placeHolder: 'The text show to the user with the reason why your are asking for the credential(s)'
                    },
                    successRedirectUrl: {
                        label: 'Succes url',
                        placeHolder: 'The URL the user is navigated to after the credential(s) is/are successfully received'
                    },
                    errorRedirectUrl: {
                        label: 'Error url',
                        placeHolder: 'The URL the user is navigated to when something went wrong receiving the credential(s)'
                    },
                    clientUrl: {
                        label: 'Client url',
                        placeHolder: 'The URL of the relying party that will use the credential(s)'
                    }
                },
                buttonSaveConfiguration: 'Save configuration'
            },
            presentationDefinitionFormTestConfig: {
                intro: {
                    title: 'You configuration is ready to be tested.',
                    description: 'You can now test your configuration by using the links below.'
                },
                testWithWallet: {
                    title: 'Test with your wallet',
                    description: 'Test the configuration by using your own wallet. The wallet should contain the credentials that are requested in the configuration.',
                    walletUrl: {
                        label: 'Your wallet URL',
                        placeHolder: 'Provide the URL of your wallet to test the configuration.'
                    },
                    buttonTest: 'Test configuration',
                    successfullyReceived: 'Credential(s) successfully received'
                }
            },
            credentialIssuerDefinitionList: {
                intro: {
                    title: 'Credential Issuer definitions',
                    description: 'Credential templates are grouped together into a Issuer template. Configure common attributes and add Credential templates to the Issuer template.'
                }
            },
            credentialIssuerDefinitionForm: {
                intro: {
                    new: {
                        title: 'Create a new Credential Issuer definition',
                        description: 'Credential templates are grouped together into a Issuer template. Configure common attributes and add Credential templates to the Issuer template.'
                    },
                    edit: {
                        title: 'Edit the Credential Issuer definition',
                        description: 'Credential templates are grouped together into a Issuer template. Configure common attributes and add Credential templates to the Issuer template.'
                    }
                },
                buttonSaveConfiguration: 'Save template',
                saveConfigurationTitle: 'Credential issuer configuration',
                saveChangesDialog: {
                    title: 'Save changes',
                    message: 'Do you want to save the changes to the issuer template?'
                },
                languageTitle: 'Select the languages for which you want to provide specific translations',
                languagePlaceHolder: 'Select languages',
                attributes: {
                    externalKey: {
                        label: 'Technical configuration name',
                        placeHolder: 'The name of the configuration as used in the public configuration url'
                    },
                    name: {
                        label: 'Name',
                        placeHolder: 'A logical name of the configuration'
                    },
                    description: {
                        label: 'Description',
                        placeHolder: 'Describe your configuration in a few words so you can easily find it back later'
                    },
                    displayName: {
                        label: 'Display name',
                        placeHolder: 'The name as shown in on the cards of all credentials issued by this issuer template'
                    },
                    logo: {
                        label: 'Logo',
                        placeHolder: 'The logo of the issuer. This logo is shown on the cards of all credentials issued by this issuer template'
                    },
                    logoAlt: {
                        label: 'Logo alt text',
                        placeHolder: 'The alt text of the logo. This text is shown when the logo is not available and is used for visually disabled people to understand the logo.'
                    },
                    issuerUrl: {
                        label: 'The public url of this configuration'
                    }
                },
                template: {
                    title: 'Credential template',
                    selectDid: 'Select the issuer identifier'
                },
                trust: {
                    title: 'Trusted issuer',
                    registerIssuer: 'Register issuer',
                }
            },
            credentialIssuerDisplay: {
                title: 'Attributes show on the credentials card when the end user uses {{language}} as wallet language',
                defaultLanguageDescription: 'Attributes show on the credentials card when the end user does not select a language or an unknown language',
                attributes: {
                    name: {
                        label: 'Name credential issuer',
                        placeHolder: 'The name of the issuer as shown on the credential card'
                    },
                    logoUrl: {
                        label: 'Logo URL',
                        placeHolder: 'The URL of the logo of the issuer. This logo is shown on the cards of all credentials issued by this issuer template',
                    },
                    logoImage: {
                        label: 'Logo',
                        placeHolder: 'The logo of the issuer. This logo is shown on the cards of all credentials issued by this issuer template',
                    },
                    logoAlt: {
                        label: 'Logo alt text',
                        placeHolder: 'The alt text of the logo. This text is shown when the logo is not available and is used for visually disabled people to understand the logo.'
                    }
                }
            },
            historyList: {
                intro: {
                    title: 'History',
                    description: 'All historical events related to this wallet.'
                },
                date: 'Date',
                time: 'Time',
                event: 'Event',
                action: 'Action',
                user: 'User',
                party: 'Party',
                noHistory: 'No history available yet',
                eventType: {
                    CREDENTIAL: 'Credential',
                    PRESENTATION: 'Presentation'
                },
                actionType: {
                    OFFER_RECEIVED: 'Offer received',
                    OFFER_ACCEPTED: 'Offer accepted',
                    DELETED: 'Deleted'
                }
            },
            settings: {
                dids: {
                    title: 'Identifiers',
                    description: 'The list below contains all identifiers that are available in this wallet.',
                    didType: 'Type',
                    didId: 'ID',
                    createDid: 'Create new identifier'
                },
                did: {
                    create: {
                        title: 'Create a new identifier',
                        description: 'First choose the type of identifier',
                        header: 'Specify the identifier options'
                    },
                    attributes: {
                        didId : {
                            label: 'ID'
                        },
                        type: {
                            label: 'Type',
                            placeHolder: 'Select the type of identifier'
                        },
                        displayName: {
                            label: 'Display name',
                            placeHolder: 'The display name that is shown for this identifier'
                        },
                        ebsiEnvironment: {
                            label: 'Environment',
                            placeHolder: 'Select the EBSI environment'
                        },
                        serviceId: {
                            label: 'ID',
                            placeHolder: 'Enter the unique id of the service'
                        },
                        serviceType: {
                            label: 'Service type',
                            placeHolder: 'The type of service'
                        },
                        serviceEndpoint: {
                            label: 'Endpoint',
                            placeHolder: 'De URL to the service endpoint'
                        },
                        taoWalletAddress: {
                            label: 'TAO wallet address',
                            placeHolder: 'The URL of the TAO wallet'
                        }
                    },
                    title: 'Identifier',
                    description: 'This identifier contains the following information',
                    services: 'Services'
                }
            }
        }
    } as AppTexts;
};

const getAppTextsNl = (): AppTexts => {
    return {
        menu: {
            dashboard: 'Dashboard',
            walletOverview: 'Wallet',
            settings: 'Instellingen',
            newCredential: "Catalogus",
            receive: "Verifier templates",
            history: 'Audit trail',
            advanced: 'Geavanceerd',
            logoff: 'Uitloggen',
            issuer: 'Uitgever',
            issuerTemplates: 'Uitgifte templates',
            issuerTrust: 'Trust anchor',
            identifiers: 'Identificaties',
            generic: 'Algemeen',
            verifier: 'Verifieerder',
            verifierTemplate: 'Templates',
            trustAchor: 'Trust achor',
            catalogConfig: 'Catalogus'
        },
        generic: {
            yes: 'Ja',
            no: 'Nee',
            ok: 'OK',
            cancel: 'Annuleren',
            add: 'Toevoegen',
            save: 'Opslaan',
            edit: 'Wijzigen',
            delete: 'Verwijderen',
            back: 'Terug',
            loading: 'Laden...',
            accept: 'Accepteren',
            reject: 'Afwijzen',
            search: 'Zoeken',
            startSearching: 'Start met zoeken...',
            removeCredential: 'Credential verwijderen'
        },
        error: {
            retrievingData: "Er is is mis gegaan bij het ophalen van de data. Probeer het later nog een keer.",
            errorCodes: {
                "ERR-1": 'E-mail adres is niet toegestaan. Gebruik uw zakelijke e-mail adres.'
            }
        },
        screens: {
            header: {
                welcomeTitle: 'Hoi {{firstName}}',
                welcomeSubTitle: 'Welkom bij de organisatie wallet van {{organizationName}}.',
            },
            credentialCard: {
                requestCredential: 'Credential aanvragen'
            },
            credentialTypeCard: {
                createNewTemplate: 'Nieuw Credential template'
            },
            credentialList: {
                title: 'Wallet overzicht',
                emptyListMessage: 'Begin met het vullen van uw wallet door enkele credentials aan te vragen.',
                searchNoCredentialsFound: 'Geen credentials gevonden',
                requestNewCredential: 'Nieuwe credential aanvragen',
                searchTitle: 'Zoeken naar credentials',
                myCredentials: 'Mijn credentials',
                issuanceDate: 'Uitgiftedatum',
                issuer: 'Uitgever',
                credentialType: 'Type'
            },
            credentialDetail: {
                title: 'Credential details',
                issuanceDate: 'Uitgiftedatum',
                issuer: 'Uitgever',
                credentialType: 'Type',
                credentialTypeDescription: 'Omschrijving',
                termsOfUse: {
                    title: 'Gebruiksvoorwaarden',
                    id: 'ID',
                    type: 'Type'
                },
                status: {
                    VALID: 'Geldig',
                    INVALID: 'Ongeldig',
                    EXPIRED: 'Verlopen'
                }
            },
            credentialTypeList: {
                title: 'Nieuwe credential aanvragen',
                intro: 'Kies een van de credentials van de vooraf geconfigureerde uitgevers',
                searchTitle: 'Zoek credentials bij uw voorkeursuitgevers'
            },
            credentialDetails: {
                deleteConfirmTitle: 'Credential verwijderen?',
                deleteConfirmMessage: 'Weet u zeker dat u deze credential wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'
            },
            issueCredentials: {
                title: 'Credential ontvangen',
                intro: 'De volgende credentials zullen worden uitgegeven door {{issuer}}.',
                issueTo: 'Credential uitgeven aan'
            },
            verifyCredentials: {
                title: 'Deel credential(s)',
                intro: 'De volgende credentials worden gevraagd door {{verifierHost}} met het volgende doel:',
                noMatchingCredentials: 'Je hebt geen credentials in je wallet die voldoen aan het presentatie verzoek.',
                successSummary: 'Succesvol gedeeld',
                successDetail: 'Je hebt met succes de gevraagde credentials gedeeld.'

            },
            issuedCredentialList: {
                title: 'Uitgegeven Credentials',
                emptyListMessage: 'Er zijn nog geen Credentials uitgegeven.',
                searchNoCredentialsFound: 'Geen uitgegeven credentials gevonden',
                requestNewCredential: 'Nieuwe credential aanvragen',
                searchTitle: 'Zoeken naar uitgegeven credentials',
                issuanceDate: 'Uitgiftedatum',
                issuer: 'Uitgever',
                credentialType: 'Type'
            },
            issuedCredentialDetail: {
                title: 'Uitgegeven Credential details',
                issuanceDate: 'Uitgiftedatum',
                issuer: 'Uitgever',
                credentialType: 'Type',
                credentialTypeDescription: 'Omschrijving',
                termsOfUse: {
                    title: 'Gebruiksvoorwaarden',
                    id: 'ID',
                    type: 'Type'
                }
            },
            presentationDefinitionList: {
                title: 'Credential ontvangst configuraties'
            },
            presentationDefinitionFormSelectCredentials: {
                intro: {
                    title: 'Maak een nieuwe configuratie aan',
                    description: 'Configureer hier welke specifieke credentials u wilt ontvangen.'
                },
                searchTitle: 'Zoek credentials die u wilt ontvangen',
                searchPlaceHolder: 'Wat wil je ontvangen?',
                selectedCredentialTypes: 'Geselecteerde items',
                noCredentialTypesSelected: 'Nog geen credentials geselecteerd',
                buttonStartConfiguration: 'Start configuratie'
            },
            presentationDefinitionFormConfigureCredentials: {
                intro: {
                    title: 'Configureer de credential die je wilt ontvangen',
                    description: 'Configureer hier aanvullende configuratie / restricties per credential.'
                },
                saveConfigurationTitle: 'Hoe wil je deze configuratie opslaan?',
                technicalConfigurationTitle: 'Technische configuratie',
                attributes: {
                    externalKey: {
                        label: 'Technische configuratienaam',
                        placeHolder: 'De naam van de configuratie zoals gebruikt vanuit jouw systeem'
                    },
                    name: {
                        label: 'Naam',
                        placeHolder: 'Een logische naam voor de configuratie'
                    },
                    description: {
                        label: 'Beschrijving',
                        placeHolder: 'Beschrijf je configuratie in een paar woorden zodat je deze later gemakkelijk kunt terugvinden'
                    },
                    purpose: {
                        label: 'Doel',
                        placeHolder: 'De tekst die aan de gebruiker wordt getoond met de reden waarom je om de credential(s) vraagt'
                    },
                    successRedirectUrl: {
                        label: 'Succes url',
                        placeHolder: 'De URL waar de gebruiker naar toe gestuurd wordt nadat de credentials succesvol zijn ontvangen'
                    },
                    errorRedirectUrl: {
                        label: 'Error url',
                        placeHolder: 'De URL waar de gebruiker naar toe gestuurd wordt als er iets fout is gegaan bij het ontvangen van de credentials'
                    },
                    clientUrl: {
                        label: 'Client url',
                        placeHolder: 'De URL van de verifierende website die de credential(s) wil ontvangen'
                    }

                },
                buttonSaveConfiguration: 'Configuratie opslaan'
            },
            presentationDefinitionFormTestConfig: {
                intro: {
                    title: 'De configuratie is klaar om getest te worden.',
                    description: 'De configuratie kan nu getest worden door gebruik te maken van de onderstaande links.'
                },
                testWithWallet: {
                    title: 'Test met wallet',
                    description: 'Test de configuration met je eigen wallet. De wallet moet de credentials bevatten die in de configuratie worden gevraagd.',
                    walletUrl: {
                        label: 'Wallet URL',
                        placeHolder: 'Geef de URL van je wallet op om de configuratie te testen.'
                    },
                    buttonTest: 'Test configuratie',
                    successfullyReceived: 'De credential(s) zijn succesvol ontvangen'
                }
            },
            credentialIssuerDefinitionList: {
                intro: {
                    title: 'Credential uitgever definities',
                    description: 'Credential templates zijn gegroepeerd binnen een Uitgever definitie. Configureer de gemeenschappelijke attributen en voeg Credential templates toe.'
                }

            },
            credentialIssuerDefinitionForm: {
                intro: {
                    new: {
                        title: 'Maak een nieuwe Credential Issuer configuratie',
                        description: 'Credential templates zijn gegroepeerd binnen een Uitgever configuratie. Configureer de gemeenschappelijke attributen en voeg Credential templates toe.'
                    },
                    edit: {
                        title: 'Wijzig de Credential Issuer template',
                        description: 'Credential templates zijn gegroepeerd binnen een Uitgever configuratie. Configureer de gemeenschappelijke attributen en voeg Credential templates toe.'
                    }
                },
                buttonSaveConfiguration: 'Configuratie opslaan',
                saveConfigurationTitle: 'Credential uitgever configuratie',
                saveChangesDialog: {
                    title: 'Wijzigingen opslaan',
                    message: 'Wil je de wijzigingen in de Uitgever configuratie opslaan?'
                },
                languageTitle: 'Selecteer de talen waarvoor je specifieke vertalingen wilt opgeven',
                languagePlaceHolder: 'Talen selecteren',
                attributes: {
                    externalKey: {
                        label: 'Technische configuratienaam',
                        placeHolder: 'De naam van de configuratie zoals gebruikt in de openbare configuratie-URL'
                    },
                    name: {
                        label: 'Naam',
                        placeHolder: 'Een logische naam van de configuratie'
                    },
                    description: {
                        label: 'Beschrijving',
                        placeHolder: 'Beschrijf uw configuratie in enkele woorden, zodat u deze later gemakkelijk kunt terugvinden'
                    },
                    displayName: {
                        label: 'Weergavenaam',
                        placeHolder: 'De naam zoals weergegeven op de kaarten van alle Credentials die door met deze uitgever configuratie zijn uitgegeven'
                    },
                    logo: {
                        label: 'Logo',
                        placeHolder: 'Het logo van de uitgever. Dit logo wordt getoond op de kaarten van alle Credentials die door met deze uitgever configuratie zijn uitgegeven'
                    },
                    logoAlt: {
                        label: 'Logo alt tekst',
                        placeHolder: 'De alt-tekst van het logo. Deze tekst wordt getoond wanneer het logo niet beschikbaar is en wordt gebruikt voor visueel gehandicapte mensen om het logo te begrijpen.'
                    },
                    issuerUrl: {
                        label: 'De openbare URL van deze configuratie'
                    }
                },
                template: {
                    title: 'Credential template',
                    selectDid: 'Selecteer de issuer identificatie'
                },
                trust: {
                    title: 'Vertrouwde uitgever',
                    registerIssuer: 'Registreer uitgever',
                }
            },
            credentialIssuerDisplay: {
                title: 'Attributen weergegeven op de Credential kaart wanneer de eindgebruiker {{language}} als taal gebruikt',
                defaultLanguageDescription: 'Attributen weergegeven op de Credential kaart wanneer de eindgebruiker geen taal selecteert of een onbekende taal',
                attributes: {
                    name: {
                        label: 'Naam credential uitgever',
                        placeHolder: 'De naam van de uitgever zoals weergegeven op de credential kaart'
                    },
                    logoUrl: {
                        label: 'Logo URL',
                        placeHolder: 'De URL van het logo van de uitgever. Dit logo wordt getoond op de kaarten van alle credentials uitgegeven door deze uitgever configuratie',
                    },
                    logoImage: {
                        label: 'Logo',
                        placeHolder: 'Het logo van de uitgever. Dit logo wordt getoond op de kaarten van alle credentials uitgegeven door deze uitgever configuratie',
                    },
                    logoAlt: {
                        label: 'Logo alt tekst',
                        placeHolder: 'De alt tekst van het logo. Deze tekst wordt weergegeven wanneer het logo niet beschikbaar is en wordt gebruikt voor visueel gehandicapten om het logo te begrijpen.'
                    }
                }
            },
            historyList: {
                intro: {
                    title: 'Historie',
                    description: 'Alle historische gebeurtenissen gerelateerd aan de wallet.'
                },
                date: 'Datum',
                time: 'Tijd',
                event: 'Gebeurtenis',
                action: 'Actie',
                user: 'Gebruiker',
                party: 'Partij',
                noHistory: 'Nog geen historie beschikbaar',
                eventType: {
                    CREDENTIAL: 'Credential',
                    PRESENTATION: 'Presentatie'
                },
                actionType: {
                    OFFER_RECEIVED: 'Verzoek ontvangen',
                    OFFER_ACCEPTED: 'Verzoek geaccepteerd',
                    DELETED: 'Verwijderd'
                }
            },
            settings: {
                dids: {
                    title: 'Identificaties',
                    description: 'De onderstaande lijst bevat alle identificaties die beschikbaar zijn in deze wallet.',
                    didType: 'Type',
                    didId: 'ID',
                    createDid: 'Nieuwe identificatie aanmaken'
                },
                did: {
                    create: {
                        title: 'Een nieuwe identificatie aanmaken',
                        description: 'Kies eerst het type identificatie',
                        header: 'Vul de identificatie opties'
                    },
                    attributes: {
                        didId : {
                            label: 'ID'
                        },
                        type: {
                            label: 'Type',
                            placeHolder: 'Selecteer het type identificatie'
                        },
                        displayName: {
                            label: 'Scherm naam',
                            placeHolder: 'De naam die op het scherm getoond wordt voor deze identificatie'
                        },
                        ebsiEnvironment: {
                            label: 'Omgeving',
                            placeHolder: 'Selecteer de EBSI omgeving'
                        },
                        serviceId: {
                            label: 'ID',
                            placeHolder: 'Vul de ID van de service in'
                        },
                        serviceType: {
                            label: 'Service type',
                            placeHolder: 'Het soort service endpoint'
                        },
                        serviceEndpoint: {
                            label: 'Endpoint',
                            placeHolder: 'De URL naar de service'
                        },
                        taoWalletAddress: {
                            label: 'TAO wallet adres',
                            placeHolder: 'De URL van de TAO'
                        }
                    },
                    title: 'Identificatie',
                    description: 'Deze identificatie bevat de volgende informatie',
                    services: 'Services'
                }
            }
        }
    } as AppTexts;
};

const flatten: (object: any, prefix?: string) => any = (object, prefix = '') =>
    Object.keys(object).reduce(
        (prev, element) =>
            object[element] &&
            typeof object[element] === 'object' &&
            !Array.isArray(object[element])
                ? {...prev, ...flatten(object[element], `${prefix}${element}.`)}
                : {...prev, ...{[`${prefix}${element}`]: object[element]}},
        {},
    );

export const getTranslations = (language: string): {} => {
    const appTexts = language.startsWith('nl') ? getAppTextsNl() : getAppTextsEn();
    return flatten(appTexts, '');
}
