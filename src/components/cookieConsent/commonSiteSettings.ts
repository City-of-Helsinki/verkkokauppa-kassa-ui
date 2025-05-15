export const commonSiteSettings = {
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
  "monitorInterval": 500,
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
          "name": "helfi-cookie-consents",
          "host": "checkout.hel.fi",
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
          "name": "helfi-settings",
          "host": "checkout.hel.fi",
          "description": {
            "fi": "Sivusto käyttää tätä tietuetta tietojen tallentamiseen siitä, mitä poikkeusilmoituksia on suljettu ja mikä on avattavien sisältöalueiden tila.",
            "sv": "Används av hel.fi Drupal för att lagra information om stängda meddelanden och accordions' tillstånd.",
            "en": "Used by hel.fi Drupal to store information about closed announcements and accordions' state."
          },
          "expiration": "-",
          "storageType": 2
        },
        {
          "name": "cookie-agreed-version",
          "host": "checkout.hel.fi",
          "description": "Temporary EU Cookie Consent Module cookie",
          "expiration": "-",
          "storageType": 1
        },
        {
          "name": "cookie-agreed-categories",
          "host": "checkout.hel.fi",
          "description": "Temporary EU Cookie Consent Module cookie",
          "expiration": "-",
          "storageType": 1
        },
        {
          "name": "cookie-agreed",
          "host": "checkout.hel.fi",
          "description": "Temporary EU Cookie Consent Module cookie",
          "expiration": "-",
          "storageType": 1
        },
        {
          "name": "cookiehub",
          "host": "cookiehub.com",
          "description": {
            "fi": "Mahdollistaa evästehallinnan hel.fi sivuilla.",
            "sv": "Cookie möjliggör hantering av cookies på hel.fi webbplatsen.",
            "en": "Used by CookieHub to store information about whether visitors have given or declined the use of cookie categories used on the hel.fi site."
          },
          "expiration": {
            "fi": "365 päivää",
            "sv": "365 dagar",
            "en": "365 days"
          },
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
          "name": "mtm_cookie_consent",
          "host": "kartta.hel.fi",
          "description": {
            "fi": "Tekninen eväste johon talletetaan tieto valinnastasi evästeiden käytöstä kertovan bannerin kohdalla",
            "sv": "A technical cookie that stores information about how you responded to the notice in the cookie banner about the use of cookies.",
            "en": "A technical cookie that stores information about how you responded to the notice in the cookie banner about the use of cookies."
          },
          "expiration": {
            "fi": "10950 päivää",
            "sv": "10950 dagar",
            "en": "10950 days"
          },
          "storageType": 1
        },
        {
          "name": "JSESSIONID",
          "host": "helsinkikanava.fi, coh-chat-app-prod.eu-de.mybluemix.net",
          "description": {
            "fi": "Sivuston pakollinen eväste mahdollistaa kävijän vierailun sivustolla.",
            "sv": "Kakan är en obligatorisk kaka som gör det möjligt för besökaren att besöka webbplatsen.",
            "en": "The cookie is an obligatory cookie that facilitates visiting the website."
          },
          "expiration": {
            "fi": "Istunto",
            "sv": "Session",
            "en": "Session"
          },
          "storageType": 1
        },
        {
          "name": "COOKIE_SUPPORT",
          "host": "helsinkikanava.fi",
          "description": {
            "fi": "Mahdollistaa evästeiden hallinnan sivustolla.",
            "sv": "Kakan möjliggör hanteringen av kakor på webbplatsen.",
            "en": "The cookie facilitates managing cookies on the website."
          },
          "expiration": {
            "fi": "365 päivää",
            "sv": "365 dagar",
            "en": "365 days"
          },
          "storageType": 1
        },
        {
          "name": "_pk_ses*",
          "host": "checkout.hel.fi",
          "description": {
            "fi": "Eväste kerää tietoa kävijän liikkeistä sivustolla.",
            "sv": "Statistiksystemets kaka samlar information om hur webbplatsen används.",
            "en": "This cookie is used to store a few details about the user such as the unique visitor ID."
          },
          "expiration": {
            "fi": "30 minuuttia",
            "sv": "30 minuter",
            "en": "30 minutes"
          },
          "storageType": 1
        },
        {
          "name": "mtm_.*",
          "host": "checkout.hel.fi",
          "description": {
            "fi": "Evästeeseen tallennetaan suostumus tilastointievästeisiin.",
            "sv": "Kakan lagrar samtycke för användning av statistikkakorna.",
            "en": "Cookie stores consent for using analytics cookies."
          },
          "expiration": {
            "fi": "400 päivää",
            "sv": "400 dagar",
            "en": "400 days"
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
          "name": "JSESSIONID",
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
          "name": "_opensaml_req_cookie*",
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
          "name": "_shibstate_*",
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
          "name": "_shibsession_*",
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
          "name": "shib_idp_session",
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
          "name": "E-Identification-Lang",
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
          "name": "AUTH_SESSION_ID_LEGACY",
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
          "name": "KC_*",
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
          "name": "KEYCLOAK_LOCALE",
          "host": "tunnistus.hel.fi",
          "description": {
            "fi": "Eväste vaaditaan jotta käyttäjän kielivalinta säilyisi.",
            "sv": "Kakan krävs för att spara användarens språkval.",
            "en": "Required to persist the user's chosen language."
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
    "storageType2": "localStorage",
    "storageType3": "sessionStorage",
    "storageType4": "IndexedDB",
    "storageType5": "Cache Storage"
  }
}
