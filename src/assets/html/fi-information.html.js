module.exports = `
  <style>
 article {
    text-align: left;
    padding-left: 1rem;
 }
  ul {
    text-align: left;
 }
 .container {
  display: flex; /* or inline-flex */
  flex-flow: row wrap;
  max-width: 90vw;  
  min-width: 90vw;  
  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
  align-items: center;
  background-color: #eee;
  margin: 1rem;
  border-radius: 30px;
 } 
 
  .parent-container {
    align-items: center;
    flex-flow: row wrap;
    display: flex;
    justify-content: center;
  } 
 
   /* We tell all items to be 100% width, via flex-basis */
  .container > * {
    flex: 1 100%;
  }
 
   /* Large */
  .information-navigation {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #eee;
  }

  .information-navigation > li {
      float: left;
  } 
       
  .information-navigation > li > a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: underline;
  }            
  .information-navigation >li a:hover {
    background-color: #eee;
  }    
  .information-navigation {
    width: 100vw;
  }


</style>  

  <div class="parent-container">
    <ul class="information-navigation">
      <li><a href="#article1">Osio 1: Tietoa palvelusta</a>
      </li>
      <li><a href="#article2">Osio 2: Ota yhteyttä</a>
      </li>
      <li><a href="#article3">Osio 3: Tietoa evästeistä</a>
      </li>
      <li><a href="#article4">Osio 4: Rekisteriseloste</a>
      </li>
      <li><a href="#article5">Osio 5: Saavutettavuus</a>
      </li>
    </ul>
    <div class="container">
      <article>
        <h1 id="article1">Osio 1: Tietoa palvelusta</h1>
        
          <p>Helsingin kaupungin Taloushallintopalveluliikelaitos (Talpa) tuottaa toimialoille ja liikelaitoksille sekä osalle kaupungin osakeyhtiöistä taloushallinnon palveluja.</p>
          <p>Tämä verkkosivusto (checkout.hel.fi) on Talpan tuottaman verkkokauppapalvelun kassa, jota kaupungin toimialat ja palvelut voivat käyttää osana omaa verkkokauppaansa.</p>
      
          <h2>Sivuston rakenne ja suunnittelu</h2>
          <p>Kassan rakenne on pidetty yksinkertaisena. Prosessi etenee viidessä vaiheessa.</p>
          <ol>
            <li>Tilauksen yhteenveto ja tarkistus</li>
            <li>Maksutavan valinta</li>
            <li>Maksaminen</li>
            <li>Kuitti ja tilausvahvistus</li>
           
          </ol>
          <p>Kuitti ostoksesta tulee antamaasi sähköpostiin.</p>
      
          <h2 id="payment-provider">Maksaminen</h2>
          <p>Verkkokaupan maksuvälittäjänä toimii Visma Pay (Paybyway Oy, y-tunnus 2486559-4), joka on rekisteröity Finanssivalvonnan ylläpitämään maksulaitosrekisteriin. Maksamiseen siirrytään Visma Payn verkkopalvelun kautta ja tiliotteella ja laskulla
            maksun saajana näkyy Visma Pay tai Paybyway Oy. Visma Pay välittää maksut verkkokauppiaalle. Maksaminen on turvallista, sillä kaikki maksutapahtumaa koskevat tiedot välitetään salattua yhteyttä käyttäen niin ettei kukaan ulkopuolinen taho näe
            maksutapahtuman tietoja.</p>
          <p>Lue lisää Visma Paysta:<a rel="nofollow" href="https://www.visma.fi/vismapay/">https://www.visma.fi/vismapay/</a></p>
          <h3>Maksutavat</h3>
          <p>Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla, lompakolla, maksukorteilla (credit/debit), laskulla tai osamaksulla. Käytettävissä ovat seuraavat maksutavat: Osuuspankki, Nordea, Danske Bank, Oma Säästöpankki, Säästöpankki,
            Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken, Ålandsbanken, MobilePay, Masterpass, Pivo, Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit MasterCard -kortit, sekä Jousto ja Enterpay Lasku yritykselle.
            MobilePay: Voit maksaa MobilePay-lompakollasi mikäli olet sallinut verkkokaupoissa maksamisen sovelluksen asetuksista. MobilePay-lompakolla suoritetut maksut veloitetaan lompakkoon liitetyltä maksukortilta. Mikäli maksun veloittaminen
            maksukortilta epäonnistuu, MobilePay-lompakolla maksaminen ei ole mahdollista verkkokaupassa.
            Pivo: Käyttöehdot ovat tarjolla Pivon sivuilla: <a rel="nofollow" href="https://pivo.fi/kayttoehdot/pivon-kayttoehdot/">https://pivo.fi/kayttoehdot/pivon-kayttoehdot/</a></p>
      
          <p>Visma Pay -maksupalvelun yhteystiedot<br>
            Visma Pay, Paybyway Oy (Y-tunnus 2486559-4)<br>
            Sähköposti: helpdesk@vismapay.com<br>
            Puhelin: 09 315 42 037 (arkisin klo 8-16)<br>
            Postiosoite: Brahenkatu 4, 53100 Lappeenranta</p>
      
      
          <h2>Saavutettavuus ja mobiiliystävällisyys</h2>
      
          <p>Sivujen suunnittelussa on pyritty ottamaan huomioon saavutettavuuden vaatimukset. Sivut mukautuvat matkapuhelimen ja tabletin näyttöön ja ovat käytettävissä myös näkövammaisten käyttämillä pistekirjoitus- ja puhesyntetisaattoriohjelmilla.
            Tekstin kokoa voi suurentaa.</p>
      
      
          <p> </p>
        </article>
      </div>
        
      
    
    
      <div class="container">
      <article>
        <h1 id="article2">Osio 2: Ota yhteyttä</h1>
        <p>Helsingin verkkokaupan kassan tukitiimi vastaa sinulle maksamiseen liittyvissä kysymyksissä tai ongelmissa osoitteessa <a href="mailto:tuki.checkout@hel.fi">tuki.checkout@hel.fi</a> . Vastaamme kysymyksiisi kahden arkipäivän kuluessa.
          Palveluun liittyvissä kysymyksissä venepaikkojen oma asiakaspalvelu <a target="_blank" href="https://www.hel.fi/helsinki/fi/kulttuuri-ja-vapaa-aika/ulkoilu/veneily/">Veneily</a> auttaa sinua.</p>
      </article>  
      </div>
    
  
      <div class="container">
        <article>
          <h1 id="article3">Osio 3: Tietoa evästeistä</h1>
       
          <p>Käytämme sivustollamme evästeitä. Evästeiden tarkoituksena on parantaa sivuston sisältöjä ja suorituskykyä. Evästeistä saatavan palautteen avulla pystymme kehittämään sivustoa ja tarjoamaan paremmin kaupunkilaisten tarpeisiin vastaavaa tietoa.
          </p>
      
          <p>Evästeasetuksista voit lukea lisätietoja käytetyistä evästeistä, hyväksyä tai estää niiden käytön. Voit myös muuttaa evästeasetuksia aina halutessasi. Avaa <a href="javascript:void 0" onclick="window.cookiehub.openSettings()">evästeasetukset</a></p>
      
          <h2>Tietoa evästeistä</h2>
      
          <p>Eväste (engl. cookie) on pienikokoinen tekstitiedosto, jonka verkkoselain tallentaa käyttäjän tietokoneelle tai mobiililaitteelle, kun vierailet verkkosivustolla. Se ei vahingoita käyttäjän laitetta tai tiedostoja. Evästeitä ei voi
            käyttää haittaohjelmien levittämiseen. Evästeistä saatava käyttäjätieto auttaa meitä varmistamaan sivuston teknisen toimivuuden ja parantamaan digitaalisten palveluidemme laatua. Niiden avulla voimme kehittää sivuston käyttäjäystävällisyyttä ja
            helpottaa tiedon löytymistä. </p>
      
          <h3>Evästeet ja sivuston toiminta</h3>
      
          <p>Välttämättömiä evästeitä tarvitaan, jotta sivusto toimii. Sivustolla voidaan käyttää lisäksi evästeitä, jotka eivät ole välttämättömiä sivuston toimimisen kannalta. Näitä evästeitä
            käytetään esimerkiksi analytiikkaan, seurantaan ja markkinointiin. Tällaisia evästeitä voidaan käyttää vain käyttäjän suostumuksella. Eväste voidaan tallentaa käyttäjän laitteelle pysyvästi, jolloin verkkosivu muistaa käyttäjän aina tämän
            vieraillessa sivustolla. Eväste voi olla myös istuntokohtainen, jolloin se poistuu selaimen sulkemisen jälkeen. Evästeet voivat olla ensimmäisen tai kolmannen osapuolen evästeitä. Ensimmäisen osapuolen evästeet asetetaan samalta sivustolta,
            jolla käyttäjä vierailee.</p>
        </article>
      </div>
  
    <div class="container">
      <article>
        <h1 id="article4">Osio 4: Rekisteriseloste</h1>
        <p>Rekisteriseloste ja rekisteröidyn oikeudet: <a href="https://www.hel.fi/static/talpa/verkkokauppa-alustan-rekisteriseloste.pdf">Rekisteriseloste</a></p>
      </article>
    </div>
  
    <div class="container"><article>
      <h1 id="article5">Osio 5: Saavutettavuus</h1>
      <p>Tämä on organisaation Helsingin kaupungin Taloushallintopalveluliikelaitos (Talpa) <strong>saavutettavuusseloste</strong></p>
  
      <p>Tämä saavutettavuusseloste koskee palvelua chekout.hel.fi ja on laadittu / päivitetty 22.09.2021. Palvelua koskee laki digitaalisten palvelujen tarjoamisesta, jossa edellytetään, että julkisten verkkopalvelujen on oltava saavutettavia.
      </p>
      <p>Olemme arvioineet palvelun saavutettavuuden itse </p>
  
      <h2>Digipalvelun saavutettavuuden tila </h2>
      <p>Täyttää saavutettavuusvaatimukset osittain. </p>
  
      <h2>Ei-saavutettava sisältö </h2>
  
      <h3>3. Verkkosivusto ei ole vielä kaikilta osin vaatimusten mukainen </h3>
  
      <ul class="flaws">
        <li class="flaw">
          <h4 class="flaw__title">
            Havaittava: Tunnus ja siirtymä etusivulle </h4>
          <h5 class="flaw__subtitle">
            Saavuttamaton sisältö ja sen puutteet </h5>
          <p>
            Palvelun Helsinki-tunnuksesta puuttuu kuvaus mihin linkki vie ja tekstivastine puuttuu (alt-määrite). </p>
          <h5>
            Saavutettavuusvaatimukset jotka eivät täyty </h5>
          <ul class="flaw__wcag">
            <li>
              1.1.1 Ei-tekstuaalinen sisältö </li>
          </ul>
        </li>
        <li class="flaw">
          <h4 class="flaw__title">
            Havaittava: Käyttöliittymäosio ja rakenteen ja suhteen esittäminen </h4>
          <h5 class="flaw__subtitle">
            Saavuttamaton sisältö ja sen puutteet </h5>
          <p>
            Vaiheistetussa valikossa ei kuvata eri vaiheiden sisältöjä tai vaiheistetun navigaation funktiota. </p>
          <h5>
            Saavutettavuusvaatimukset jotka eivät täyty </h5>
          <ul class="flaw__wcag">
            <li>
              1.3.1 Informaatio ja suhteet </li>
          </ul>
        </li>
        <li class="flaw">
          <h4 class="flaw__title">
            Havaittava: Väri on linkin ainoa visuaalinen keino </h4>
          <h5 class="flaw__subtitle">
            Saavuttamaton sisältö ja sen puutteet </h5>
          <p>
            Alatunnisteen linkeistä puuttuu linkin aktiivisuudesta kertova koroste (esim. alleviivaus). </p>
          <h5>
            Saavutettavuusvaatimukset jotka eivät täyty </h5>
          <ul class="flaw__wcag">
            <li>
              1.4.1 Värien käyttö </li>
          </ul>
        </li>
        <li class="flaw">
          <h4 class="flaw__title">
            Hallittava: Linkin fokus ei ole riittävä </h4>
          <h5 class="flaw__subtitle">
            Saavuttamaton sisältö ja sen puutteet </h5>
          <p>
            Linkkielementit korostuvat fokuksen saadessaan, mutta fokus ei toiminnepainikkeiden osalta ole riittävän erottuva. </p>
          <h5>
            Saavutettavuusvaatimukset jotka eivät täyty </h5>
          <ul class="flaw__wcag">
            <li>
              2.4.7 Näkyvä kohdistus </li>
          </ul>
        </li>
        <li class="flaw">
          <h4 class="flaw__title">
            Ymmärrettävä: Kielivalinnan Aria-label viittaa tuntemattomaan </h4>
          <h5 class="flaw__subtitle">
            Saavuttamaton sisältö ja sen puutteet </h5>
          <p>
            Kielivalinnan &quot;Aria-labelledby&quot; sisältää virheellisen ID viittauksen. </p>
          <h5>
            Saavutettavuusvaatimukset jotka eivät täyty </h5>
          <ul class="flaw__wcag">
            <li>
              3.3.2 Nimilaput tai ohjeet </li>
          </ul>
        </li>
        <li class="flaw">
          <h4 class="flaw__title">
            Toimintavarma: Kielivalinnan WAI-ARIA roolit puutteellisia </h4>
          <h5 class="flaw__subtitle">
            Saavuttamaton sisältö ja sen puutteet </h5>
          <p>
            Kielivalintavalikossa WAI-ARIA roolit on asetettu puutteellisesti kassan käyttöliittymään (Name, Role, Value). </p>
          <h5>
            Saavutettavuusvaatimukset jotka eivät täyty </h5>
          <ul class="flaw__wcag">
            <li>
              4.1.2 Nimi, rooli, arvo </li>
          </ul>
        </li>
      </ul>
  
      <h2>Huomasitko saavutettavuuspuutteen digipalvelussamme? Kerro se meille ja teemme parhaamme puutteen korjaamiseksi </h2>
      <h3>Sähköpostilla </h3>
      <p>tuki.checkout@hel.fi </p>
  
      <h2>Valvontaviranomainen </h2>
      <p>
        Jos huomaat sivustolla saavutettavuusongelmia, anna ensin palautetta meille eli sivuston ylläpitäjälle. Vastauksessa voi mennä 14 päivää. Jos et ole tyytyväinen saamaasi vastaukseen tai et saa vastausta lainkaan kahden viikon aikana, <a
          href="https://www.saavutettavuusvaatimukset.fi/oikeutesi/" target="_blank">voit tehdä ilmoituksen Etelä-Suomen aluehallintovirastoon <span class="screen-reader-text">Avautuu uuteen ikkunaan</span></a>. Etelä-Suomen aluehallintoviraston
        sivulla kerrotaan tarkasti, miten ilmoituksen voi tehdä ja miten asia käsitellään. </p>
  
      <h2>
        Valvontaviranomaisen yhteystiedot </h2>
      <p>
        Etelä-Suomen aluehallintovirasto<br />
        Saavutettavuuden valvonnan yksikkö<br />
        www.saavutettavuusvaatimukset.fi <br />
        saavutettavuus(at)avi.fi<br />
        puhelinnumero vaihde 0295 016 000 </p>
  
  
  
      <h2>Teemme jatkuvasti työtä saavutettavuuden parantamiseksi </h2>
  
      <h3>Olemme sitoutuneet digipalveluiden saavutettavuuden parantamiseen </h3>
      <p>Checkout.hel.fi -sivuston laajempi saavutettavuusarvio tehdään 10/2021. Mahdolliset puutteet korjataan palvelun jatkokehityksen yhteydessä ja niiden osalta toimintasuunnitelma päivitetään tähän saavutettavuusselosteeseen. </p>
  
  
      <h3>Tämä verkkosivusto/sovellus on julkaistu </h3>
      <p>22.09.2021 </p>
  
  
    </article></div>
  </div>  
  
`