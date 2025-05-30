export const getCookieConsentSiteSettings = (domain: string) => {
  return {
    "languages": [
      {
        "code": "fi",
        "name": "Finnish",
        "direction": "ltr"
      },
      {
        "code": "sv",
        "name": "Swedish",
        "direction": "ltr"
      },
      {
        "code": "en",
        "name": "English",
        "direction": "ltr"
      }
    ],
    "siteName": "Hel.fi",
    "cookieName": "helfi-cookie-consents",
    "monitorInterval": 1500,
    "remove": false,
    "fallbackLanguage": "fi",
    "requiredGroups": [
      {
        "groupId": "essential",
        "title": {
          "fi": "Välttämättömät toiminnalliset evästeet",
          "sv": "Nödvändiga funktionella cookies",
          "en": "Essential cookies"
        },
        "description": {
          "fi": "Välttämättömät evästeet auttavat tekemään verkkosivustosta käyttökelpoisen sallimalla perustoimintoja, kuten sivulla siirtymisen ja sivuston suojattujen alueiden käytön. Verkkosivusto ei toimi kunnolla ilman näitä evästeitä eikä niihin tarvita suostumusta.",
          "sv": "Nödvändiga cookies hjälper till att göra webbplatsen användbar genom att tillåta grundläggande funktioner som att navigera på sidan och använda de skyddade områdena på webbplatsen. Webbplatsen fungerar inte korrekt utan dessa cookies och kräver inte samtycke.",
          "en": "Essential cookies help to make the website usable by allowing basic functions, navigating the page and using the protected areas of the site. The website will not work properly without these cookies and their consent is not required."
        },
        "cookies": [
          {
            "name": "orderId",
            "host": domain,
            "description": {
              "fi": "Tallentaa tilauksen tunnisteen paikalliseen tallennustilaan, jotta tilaustiedot säilyvät myös sivun päivityksen jälkeen.",
              "sv": "Lagrar beställnings-ID i lokal lagring så att beställningsdata bevaras även efter att sidan uppdaterats.",
              "en": "Stores the order ID in local storage so that order data persists even after the page is refreshed."
            },
            "storageType": 2,
            "expiration": "-"
          },
          {
            "name": "userId",
            "host": domain,
            "description": {
              "fi": "Tallentaa käyttäjän tunnisteen istuntotallennustilaan, jotta käyttäjää voidaan seurata istunnon ajan.",
              "sv": "Lagrar användarens ID i sessionslagring för att möjliggöra användarspårning under sessionen.",
              "en": "Stores the user ID in session storage to track the user during the session."
            },
            "storageType": 3,
            "expiration": "-"
          },
          {
            "name": "helfi-cookie-consents",
            "host": domain,
            "description": {
              "fi": "Sivusto käyttää tätä evästettä tietojen tallentamiseen siitä, ovatko kävijät antaneet hyväksyntänsä tai kieltäytyneet evästeiden käytöstä.",
              "sv": "Cookie möjliggör hantering av cookies på webbplatsen.",
              "en": "Used by hel.fi Drupal to store information about whether visitors have given or declined the use of cookie categories used on the hel.fi site."
            },
            "expiration": {
              "fi": "100 päivää",
              "sv": "100 dagar",
              "en": "100 days"
            },
            "storageType": 1
          },
          {
            "name": "cookie-agreed-version",
            "host": domain,
            "description": "Temporary EU Cookie Consent Module cookie",
            "expiration": "-",
            "storageType": 1
          },
          {
            "name": "cookie-agreed-categories",
            "host": domain,
            "description": "Temporary EU Cookie Consent Module cookie",
            "expiration": "-",
            "storageType": 1
          },
          {
            "name": "cookie-agreed",
            "host": domain,
            "description": "Temporary EU Cookie Consent Module cookie",
            "expiration": "-",
            "storageType": 1
          },
          {
            "name": "AWSELBCORS",
            "host": "siteimproveanalytics.io",
            "description": {
              "fi": "Eväste liittyy palvelinten kuormanjakotoiminnallisuuteen, jolla ohjataan pyynnöt vähimmällä käytöllä olevalle palvelimille.",
              "sv": "Cookie är kopplad till funktionen för lastfördelning som styr begäran till en server med mindre belastning.",
              "en": "The cookie is related to a load distribution function used to direct requests to servers with the least traffic."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "sso-sessionid",
            "host": "api.hel.fi",
            "description": {
              "fi": "Tunnistautumisistunnon säilymiseksi vaadittu eväste.",
              "sv": "Cookie som krävs för att bevara autentiseringssession.",
              "en": "Required to persist the authentication session."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "E-Identification-LogTag",
            "host": "suomi.fi",
            "description": {
              "fi": "Tunnistautumisistunnon säilymiseksi vaadittu eväste.",
              "sv": "Cookie som krävs för att bevara autentiseringssession.",
              "en": "Required to persist the authentication session."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "tunnistamo_prod-sessionid",
            "host": "api.hel.fi",
            "description": {
              "fi": "Tunnistautumisistunnon säilymiseksi vaadittu eväste.",
              "sv": "Cookie som krävs för att bevara autentiseringssession.",
              "en": "Required to persist the authentication session."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "tunnistamo_prod-csrftoken",
            "host": "api.hel.fi",
            "description": {
              "fi": "Tietoturvakontrolli",
              "sv": "Datasäkerhetskontroll",
              "en": "A security control"
            },
            "expiration": {
              "fi": "365 päivää",
              "sv": "365 dagar",
              "en": "365 days"
            },
            "storageType": 1
          },
          {
            "name": "profiili-prod-csrftoken",
            "host": "api.hel.fi",
            "description": {
              "fi": "Tietoturvakontrolli",
              "sv": "Datasäkerhetskontroll",
              "en": "A security control"
            },
            "expiration": {
              "fi": "365 päivää",
              "sv": "365 dagar",
              "en": "365 days"
            },
            "storageType": 1
          },
          {
            "name": "AUTH_SESSION_ID",
            "host": "tunnistus.hel.fi",
            "description": {
              "fi": "Tunnistautumisistunnon säilymiseksi vaadittu eväste.",
              "sv": "Cookie som krävs för att bevara autentiseringssession.",
              "en": "Required to persist the authentication session."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "oidc.user:*",
            "host": "hel.fi",
            "description": {
              "fi": "Käyttäjän kirjautumistiedot tallennetaan selaimen muistiin (session storage).",
              "sv": "Användarens inloggningsuppgifter lagras i webbläsarens minne (session storage).",
              "en": "Authentication information of the user is saved to browser's memory (session storage)."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "hds_login_api_token_storage_key",
            "host": "hel.fi",
            "description": {
              "fi": "Kirjautuneen käyttäjän rajanpinta-avaimet (api tokens) tallennetaan selaimen muistiin (session storage).",
              "sv": "Api-token för en autentiserad användare sparas i webbläsarens minne (session storage).",
              "en": "Api tokens of an authenticated user is saved to browser's memory (session storage)."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "hds_login_api_token_user_reference",
            "host": "hel.fi",
            "description": {
              "fi": "Kirjautuneen käyttäjän pääsyoikeudet tallennetaan selaimen muistiin, jotta tunnistetaan kenen rajapinta-avaimet on tallessa.",
              "sv": "Den inloggade användarens åtkomsträttigheter lagras i webbläsarens minne för att identifiera vems token som lagras.",
              "en": "Access token of an authenticated user is saved to browser's memory (session storage) to identify whose api tokens are stored."
            },
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
            "storageType": 1
          },
          {
            "name": "i18nextLng",
            "host": domain,
            "description": {
              "fi": "Tallentaa käyttäjän valitseman kieliasetuksen selaimen muistiin, jotta sovellus voi näyttää sisällön oikealla kielellä.",
              "sv": "Lagrar användarens valda språkinställning i webbläsarens minne så att applikationen kan visa innehåll på rätt språk.",
              "en": "Stores the user's selected language in the browser's memory so the application can display content in the correct language."
            },
            "storageType": 2,
            "expiration": {
              "fi": "Istunto",
              "sv": "Session",
              "en": "Session"
            },
          },
          {
            "name": "i18nextLng",
            "host": domain,
            "description": {
              "fi": "Tallentaa käyttäjän valitseman kieliasetuksen selaimen muistiin, jotta sovellus voi näyttää sisällön oikealla kielellä.",
              "sv": "Lagrar användarens valda språkinställning i webbläsarens minne så att applikationen kan visa innehåll på rätt språk.",
              "en": "Stores the user's selected language in the browser's memory so the application can display content in the correct language."
            },
            "storageType": 3,
            "expiration": "-"
          }
        ]
      }
    ],
    "optionalGroups": [],
    "translations": {
      "bannerAriaLabel": {
        "fi": "Evästeasetukset",
        "sv": "Inställningar för kakor",
        "en": "Cookie settings"
      },
      "heading": {
        "fi": "{{siteName}} käyttää evästeitä",
        "sv": "{{siteName}} använder kakor",
        "en": "{{siteName}} uses cookies"
      },
      "description": {
        "fi": "Tämä sivusto käyttää välttämättömiä evästeitä sivun perustoimintojen ja suorituskyvyn varmistamiseksi. Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja yksilöidyn sisällön näyttämiseen.",
        "sv": "Denna webbplats använder obligatoriska kakor för att säkerställa de grundläggande funktionerna och prestandan. Dessutom använder vi inriktningskakor för bättre användarupplevelse, analytik och individualiserat innehåll.",
        "en": "This website uses required cookies to ensure the basic functionality and performance. In addition, we use targeting cookies to improve the user experience, perform analytics and display personalised content."
      },
      "showDetails": {
        "fi": "Näytä yksityiskohdat",
        "sv": "Visa detaljer",
        "en": "Show details"
      },
      "hideDetails": {
        "fi": "Piilota yksityiskohdat",
        "sv": "Stänga detaljer",
        "en": "Hide details"
      },
      "formHeading": {
        "fi": "Tietoa sivustolla käytetyistä evästeistä",
        "sv": "Information om kakor som används på webbplatsen",
        "en": "About the cookies used on the website"
      },
      "formText": {
        "fi": "Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea eri luokista ja sallia tai kieltää evästeiden käytön.",
        "sv": "Kakorna som används på webbplatsen har klassificerats enligt användningsändamål. Du kan läsa om de olika klasserna och acceptera eller förbjuda användningen av kakor.",
        "en": "The cookies used on the website have been classified according to their intended use. Below, you can read about the various categories and accept or reject the use of cookies."
      },
      "highlightedGroup": {
        "fi": "Sinun on hyväksyttävä tämä kategoria, jotta voit näyttää valitsemasi sisällön.",
        "sv": "Du måste acceptera den här kategorin för att visa innehållet du har valt.",
        "en": "You need to accept this category to display the content you have selected."
      },
      "highlightedGroupAria": {
        "fi": "Hyvä tietää kategorialle: {{title}}",
        "sv": "Bra att veta för kategorin: {{title}}",
        "en": "Good to know for category: {{title}}"
      },
      "showCookieSettings": {
        "fi": "Näytä evästeasetukset",
        "sv": "Visa kakinställningarna",
        "en": "Show cookie settings"
      },
      "hideCookieSettings": {
        "fi": "Piilota evästeasetukset",
        "sv": "Stänga kakinställningarna",
        "en": "Hide cookie settings"
      },
      "acceptedAt": {
        "fi": "Olet hyväksynyt tämän kategorian: {{date}} klo {{time}}.",
        "sv": "Du har accepterat denna kategori: {{date}} kl. {{time}}.",
        "en": "You have accepted this category: {{date}} at {{time}}."
      },
      "tableHeadingsName": {
        "fi": "Nimi",
        "sv": "Namn",
        "en": "Name"
      },
      "tableHeadingsHostName": {
        "fi": "Evästeen asettaja",
        "sv": "Den som lagrat kakan",
        "en": "Cookie set by"
      },
      "tableHeadingsDescription": {
        "fi": "Käyttötarkoitus",
        "sv": "Användning",
        "en": "Purpose of use"
      },
      "tableHeadingsExpiration": {
        "fi": "Voimassaoloaika",
        "sv": "Giltighetstid",
        "en": "Period of validity"
      },
      "tableHeadingsType": {
        "fi": "Tyyppi",
        "sv": "Typ",
        "en": "Type"
      },
      "approveAllConsents": {
        "fi": "Hyväksy kaikki evästeet",
        "sv": "Acceptera alla kakor",
        "en": "Accept all cookies"
      },
      "approveRequiredAndSelectedConsents": {
        "fi": "Hyväksy valitut evästeet",
        "sv": "Acceptera valda kakor",
        "en": "Accept selected cookies"
      },
      "approveOnlyRequiredConsents": {
        "fi": "Hyväksy vain välttämättömät evästeet",
        "sv": "Acceptera endast nödvändiga",
        "en": "Accept required cookies only"
      },
      "settingsSaved": {
        "fi": "Asetukset tallennettu!",
        "sv": "Inställningar sparade!",
        "en": "Settings saved!"
      },
      "notificationAriaLabel": {
        "fi": "Ilmoitus",
        "sv": "Meddelande",
        "en": "Annoucement"
      },
      "storageType1": {
        "fi": "Eväste",
        "sv": "Kakan",
        "en": "Cookie"
      },
      "storageType2": {
        "fi": "Paikallinen tallennustila",
        "sv": "Lokal lagring",
        "en": "Local Storage"
      },
      "storageType3": {
        "fi": "Istuntotallennustila",
        "sv": "Sessionslagring",
        "en": "Session Storage"
      },
      "storageType4": "IndexedDB",
      "storageType5": "Cache Storage"
    }
  }

}