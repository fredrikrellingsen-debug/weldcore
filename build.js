// Genererer flersidig statisk nettside (rot + dist/ for Firebase Hosting "site": "weldcore").
// Kjør: node build.js  (deretter: node server.js eller firebase deploy --only hosting)
const fs = require('fs');
const path = require('path');

const U = (id, w = 1200, q = 75) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
const IMG = {
  hero: 'photo-1504917595217-d4dc5ebe6122',
  weld: 'photo-1504328345606-18bbc8c9d7d1',
  steel: 'photo-1565043589221-1a6fd9ae45c7',
  eng: 'photo-1581092160562-40aa08e78837',
  worker: 'photo-1530124566582-a618bc2615dc',
  plant: 'photo-1513828583688-c52646db42da',
  qc: 'photo-1581091226825-a6a2a5aee158',
  mech: 'photo-1581092918056-0c4c3acd3789',
};

const NAV = [
  ['/', 'Hjem'],
  ['/tjenester', 'Tjenester'],
  ['/prosjekter', 'Prosjekter'],
  ['/om-oss', 'Om oss'],
  ['/kontakt', 'Kontakt'],
];

const img = (id, alt, eager = false) => {
  const src = U(id, 1200, 75);
  const srcset = [
    `${U(id, 640, 72)} 640w`,
    `${U(id, 1024, 75)} 1024w`,
    `${U(id, 1600, 78)} 1600w`,
    `${U(id, 2200, 80)} 2200w`,
  ].join(', ');
  return `<img src="${src}" srcset="${srcset}" sizes="(max-width: 639px) 94vw, (max-width: 1199px) 48vw, 720px" alt="${alt}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" onerror="this.style.display='none'">`;
};

const layout = (route, title, desc, body, script = '') => `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#111822">
  <title>${title} | Weldcore Nordic AS</title>
  <meta name="description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script type="importmap">
  {
    "imports": {
      "firebase/app": "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
    }
  }
  </script>
  <script type="module" src="/firebase.js"></script>
</head>
<body>
  <div class="topbar">
    <div class="wrap topbar-inner">
      <div class="topbar-items">
        <span class="topbar-item"><span class="topbar-dot"></span>Sertifisert sveising (TIG 141 · MIG/MAG 135/136/138 · MMA 111)</span>
        <span class="topbar-item">WPS / WPQR &amp; NDT-klar utførelse</span>
      </div>
      <div class="topbar-items">
        <a href="tel:+4740000000">Vakt / Prosjekt: +47 400 00 000</a>
        <a href="mailto:post@weldcore.no">post@weldcore.no</a>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="wrap bar">
      <a class="logo" href="/"><span class="mark"></span>WELDCORE <b>NORDIC AS</b></a>
      <button class="burger" id="burgerBtn" type="button" aria-label="Åpne eller lukk hovedmeny" aria-expanded="false">
        <span id="burgerIcon">☰</span> <span>Meny</span>
      </button>
      <nav class="site-nav" id="siteNav" aria-label="Hovednavigasjon">
        ${NAV.map(([h, t]) => `<a href="${h}"${h === route ? ' class="active" aria-current="page"' : ''}>${t}</a>`).join('')}
        <a class="btn nav-cta-mobile" href="/kontakt">Forespør kapasitet / pristilbud</a>
      </nav>
      <a class="btn btn-sm" href="/kontakt">Forespør kapasitet / pristilbud</a>
    </div>
  </header>

  <main>${body}</main>

  <footer class="site-footer">
    <div class="wrap fgrid">
      <div>
        <div class="logo"><span class="mark"></span>WELDCORE <b>NORDIC AS</b></div>
        <p>Sertifisert sveising, prefabrikasjon av stålkonstruksjoner, prosessrør og mekaniske tjenester for industri, bygg og anlegg, maritim sektor og energi i hele Norden.</p>
        <p class="muted">Org.nr: 932 000 000 MVA<br>Telefon: +47 400 00 000<br>E-post: post@weldcore.no</p>
      </div>
      <div>
        <h4>Hurtiglenker</h4>
        ${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
      </div>
      <div>
        <h4>Fagområder</h4>
        <a href="/tjenester">Sertifisert Sveising &amp; Spesialsveis</a>
        <a href="/tjenester">Stålkonstruksjoner &amp; Montasje</a>
        <a href="/tjenester">Industrirør &amp; Rørsveising</a>
        <a href="/tjenester">Industriservice, Vedlikehold &amp; Reparasjon</a>
      </div>
      <div>
        <h4>Kvalitet &amp; Standard</h4>
        <a href="/prosjekter">Sveisere sertifisert iht. ISO 9606</a>
        <a href="/prosjekter">Utførelse etter WPS / WPQR</a>
        <a href="/prosjekter">Materialsporbarhet (3.1-sertifikater)</a>
        <a href="/kontakt">Akutt utrykning og revisjonsstans</a>
      </div>
    </div>
    <div class="wrap copy">
      <span>© Weldcore Nordic AS. Levert av Vikingnet.</span>
      <span>Optimalisert for mobil, nettbrett, PC og storskjerm</span>
    </div>
  </footer>

  <div class="mobile-dock" aria-label="Hurtigvalg for mobil">
    <a class="btn btn-ghost" href="tel:+4740000000">Ring prosjektvakt</a>
    <a class="btn" href="/kontakt">Forespør tilbud</a>
  </div>

  <script>
    (function(){
      var btn = document.getElementById('burgerBtn');
      var icon = document.getElementById('burgerIcon');
      if (!btn) return;
      function setOpen(open) {
        document.body.classList.toggle('nav-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (icon) icon.textContent = open ? '✕' : '☰';
      }
      btn.addEventListener('click', function(){
        setOpen(!document.body.classList.contains('nav-open'));
      });
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') setOpen(false);
      });
    })();
  </script>
  ${script}
</body>
</html>`;

const hero = (h1, lead, badgeText = 'Weldcore Nordic AS') => `
<section class="page-hero">
  <div class="wrap">
    <span class="badge">${badgeText}</span>
    <h1>${h1}</h1>
    <p class="lead">${lead}</p>
  </div>
</section>`;

const cta = (h, p, b = 'Ta kontakt') => `
<section class="cta-band">
  <div class="wrap">
    <div>
      <h2>${h}</h2>
      ${p ? `<p>${p}</p>` : ''}
    </div>
    <a class="btn" href="/kontakt">${b}</a>
  </div>
</section>`;

const pages = {};

// =========================================
// SIDE 1: FORSIDE (Hjem / "/")
// =========================================
pages['/'] = layout(
  '/',
  'Kompromissløs sveisekvalitet og stålkompetanse for nordisk industri',
  'Weldcore Nordic AS leverer sertifiserte sveisetjenester, prefabrikasjon, rørsveising og montasje av stålkonstruksjoner for industri, bygg, maritim sektor og energi.',
  `
  <section class="hero">
    <div class="wrap hgrid">
      <div>
        <span class="badge">Sertifisert sveising, stål og mekanisk montasje</span>
        <h1>Kompromissløs sveisekvalitet og stålkompetanse for nordisk industri</h1>
        <p class="lead">Weldcore Nordic AS leverer sertifiserte sveisetjenester, prefabrikasjon, rørsveising og montasje av stålkonstruksjoner. Vi bistår entreprenører, industribedrifter og maritim sektor med presist utført arbeid – i verksted eller ute på anlegg.</p>
        <div class="btns">
          <a class="btn" href="/kontakt">Be om tilbud eller kapasitet</a>
          <a class="btn btn-ghost" href="/tjenester">Se våre fagområder</a>
        </div>
        <div class="hero-specs">
          <span class="spec-pill"><b>METODER:</b> 141 TIG · 135/136/138 MIG/MAG · 111 MMA</span>
          <span class="spec-pill"><b>MATERIALER:</b> S355 · 304L/316L · Duplex · Aluminium</span>
          <span class="spec-pill"><b>KONTROLL:</b> WPS / WPQR · NDT-klar</span>
        </div>
      </div>
      <figure class="hero-img">
        ${img(IMG.hero, 'Gnistrende TIG og MIG-sveising i stål hos Weldcore Nordic AS', true)}
        <figcaption class="img-caption">
          <div>Sertifisert utførelse i verksted og på anlegg</div>
          <span>ISO 9606 / WPS</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="markers" aria-label="Tekniske tillitsmarkører">
    <div class="wrap grid4">
      ${[
        'Sertifiserte sveisere (TIG, MIG/MAG, MMA)',
        'Stål, rustfritt/syrefast og aluminium',
        'Rask mobilisering ved prosjekter og driftsstans',
        'Full sporbarhet og dokumentert kvalitet',
      ].map((t, i) => `<div class="marker"><span class="num">0${i + 1}</span><span>${t}</span></div>`).join('')}
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="idx">Våre kjerneområder</span>
          <h2>Hovedtjenester for industri, bygg og maritim sektor</h2>
          <p class="sub">Vi leverer alt fra prefabrikasjon etter isometriske og konstruksjonstekniske tegninger til komplett montasje og vedlikehold ute på lokasjon.</p>
        </div>
        <a class="btn btn-sm" href="/tjenester">Utforsk alle tjenester →</a>
      </div>
      <div class="grid4">
        ${[
          [
            'Sertifisert Sveising & Spesialsveis',
            'Kvalitetsmessig TIG-, MIG/MAG-, rørtråd- og elektrodesveising i karbonstål, syrefast 316L, duplex og sjøvannsbestandig aluminium med dokumentert varmetilførsel.',
            '141 / 135 / 136 / 111',
          ],
          [
            'Stålkonstruksjoner & Montasje',
            'Prefabrikasjon og sikker innfesting av bærende stål, søyler, bjelker, trapper, leidere, gangbaner, plattformer og spesialtilpassede rammer på bygge- og anleggsplass.',
            'Prefab & Anlegg',
          ],
          [
            'Industrirør & Rørsveising',
            'Prefabrikasjon av spools og rørgater for væske, damp, gass og prosessindustri med full kontroll på bakgass, rene rotstrenger og klargjøring for NDT/trykktest.',
            '304L / 316L / Prosess',
          ],
          [
            'Industriservice, Vedlikehold & Reparasjon',
            'Rask utrykning ved havari eller planlagt revisjonsstans. Sprekkreparasjon, slitasjebeskyttelse, hardpålegging på knuseverk/skuffer og mekanisk ombygging.',
            '24/7 Beredskap',
          ],
        ].map(([t, p, meta]) => `
          <article class="card">
            <span class="tick"></span>
            <h3>${t}</h3>
            <p>${p}</p>
            <div class="meta-row"><span>${meta}</span></div>
            <a class="more" href="/tjenester">Les mer →</a>
          </article>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section alt">
    <div class="wrap">
      <span class="idx">Derfor velger oppdragsgivere oss</span>
      <h2>Hvorfor velge Weldcore Nordic AS</h2>
      <p class="sub">Når tidsfrister, bæreevne og trykktetthet er kritiske faktorer i prosjektet, leverer vi forutsigbar gjennomføring fra første tegningsgjennomgang til ferdig sveiselogg.</p>
      <div class="grid3 trio">
        <div class="card">
          <span class="tick"></span>
          <h3>Dokumentert utførelse og NDT-klare sveiser</h3>
          <p>Arbeid utført etter strenge prosedyrekrav (WPS/WPQR) og gjeldende standarder. Vi sikrer rene rotstrenger, riktig fugeforberedelse og full sporbarhet på tilsatsmaterialer og 3.1-sertifikater slik at sveisene består visuell kontroll, røntgen (RT), ultralyd (UT) og penetranttesting (PT).</p>
        </div>
        <div class="card">
          <span class="tick"></span>
          <h3>Fleksibel leveransemodell</h3>
          <p>Vi tar både fastprisoppdrag på prefabrikasjon og leier ut sveisere/montører ved kapasitetstopper. Enten du trenger et komplett arbeidslag med servicebiler og sveiseutstyr ute på anlegg, eller ferdig produserte stål- og rørkomponenter fra verksted, tilpasser vi oss prosjektets styringsmodell.</p>
        </div>
        <div class="card">
          <span class="tick"></span>
          <h3>Sikkerhet og presisjon i høysetet</h3>
          <p>Kompromissløst fokus på HMS, fremdrift og leveringspresisjon på bygge- og anleggsplass. Våre fagarbeidere arbeider strukturert etter SJA (sikker jobb-analyse), krav til varme arbeider og interne kontrollpunkter for å holde tidsplanen uten avvik.</p>
        </div>
      </div>
    </div>
  </section>

  ${cta('Trenger prosjektet ditt sveisere eller ferdige stålleveranser? Ta kontakt for rask avklaring', 'Vi vurderer tegninger, materialkrav og bemanningsbehov raskt – både ved planlagte entrepriser og akutte oppdrag.', 'Ta kontakt for rask avklaring')}
  `
);

// =========================================
// SIDE 2: TJENESTER ("/tjenester")
// =========================================
const svc = [
  [
    'Sertifisert Sveising (TIG, MIG/MAG, Rørtråd & Elektrode)',
    'Vi utfører kvalitetsmessig sveising i karbonstål, rustfritt og syrefast stål (304/316), duplex og aluminium. Alle oppdrag gjennomføres med fokus på riktig varmetilførsel, rene rotstrenger og høy styrke.',
    'Våre sveisere innehar gyldige sertifikater for relevante posisjoner og materialgrupper, og vi tilpasser sveisemetode etter konstruksjonens belastning, korrosjonsklasse og tilkomst på arbeidsstedet.',
    [
      'TIG-sveising (141) med ekstrem presisjon på rør og tynnplater',
      'MIG/MAG og rørtrådsveising (135/136/138) for tunge konstruksjoner',
      'Elektrodesveising (111) for krevende utendørs- og anleggsforhold',
      'Sveising i henhold til godkjente sveiseprosedyrer (WPS)',
    ],
    IMG.weld,
    'Metode 141 · 135 · 136 · 138 · 111',
  ],
  [
    'Stålkonstruksjoner, Prefabrikasjon & Montasje',
    'Fra bærende stålkonstruksjoner, trapper, rekkverk og plattformer til spesialtilpassede rammer og braketter. Vi produserer etter tekniske tegninger og sørger for sikker montasje på byggeplass.',
    'Vi sørger for nøyaktig kapping, tilpasning, oppspenning og overflateklargjøring i verksted, slik at montasjen ute på bygge- eller anleggsplass går effektivt og uten tidkrevende etterjusteringer.',
    [
      'Bærende stål, søyler og bjelker for bygg og anlegg',
      'Trapper, leidere, gangbaner og rekkverk',
      'Prefabrikasjon av moduler og spesialkomponenter',
      'Innfesting, tilpasning og sluttmontasje ute på lokasjon',
    ],
    IMG.steel,
    'NS-EN 1090 · Prefabrikasjon & Montasje',
  ],
  [
    'Industrirør, Prosessanlegg & Rørsveising',
    'Presis prefabrikasjon og installasjon av rørsystemer for væske, damp, gass og prosessindustri. Vi sikrer tette, hygieniske og trykkbestandige rørgater med full kontroll på bakgass og innside.',
    'Ved sveising av rustfrie og syrefaste prosessrør bruker vi kontrollert bakgassutstyr og oksygenmåling for å garantere oksidfrie rotstrenger som innfrir strenge krav innen næringsmiddel-, kjemi-, energi- og prosessindustri.',
    [
      'Sveising av rustfrie og syrefaste prosessrør',
      'Prefabrikasjon av spools og rørstrekk etter isometriske tegninger',
      'Montering av ventiler, flenser og rørstøtter',
      'Klargjøring for trykktesting og røntgen/NDT-kontroll',
    ],
    IMG.eng,
    '304L / 316L / Duplex · Bakgass & Isometri',
  ],
  [
    'Industriservice, Vedlikehold & Påleggssveising',
    'Når maskiner, skuffer, transportbånd eller produksjonsutstyr slites eller havarerer, rykker vi raskt ut for å minimere nedetid. Vi utfører både akutt reparasjonssveising og planlagt vedlikehold.',
    'Med utstyrte servicebiler og erfarne industrimekanikere og sveisere kan vi mobilisere på kort varsel til pukkverk, fabrikker, havneanlegg og anleggsplasser for å få produksjonen raskt tilbake i sikker drift.',
    [
      'Reparasjon av sprekker og brudd i maskiner og anleggsutstyr',
      'Slitasjebeskyttelse og hardpålegging på skuffer og knuseverk',
      'Ombygging og modifikasjon av eksisterende industrianlegg',
      'Bistand ved planlagte revisjonsstanser',
    ],
    IMG.worker,
    'Hardox / Slitestål · Revisjonsstans & Akutt service',
  ],
];

pages['/tjenester'] = layout(
  '/tjenester',
  'Tjenester innen sveising, stål og mekanisk arbeid',
  'Sertifisert sveising (TIG, MIG/MAG, rørtråd, elektrode), stålkonstruksjoner, industrirør og industriservice fra Weldcore Nordic AS.',
  `
  ${hero(
    'Tjenester innen sveising, stål og mekanisk arbeid',
    'Vi kombinerer tung praktisk sveisefaglig erfaring med streng kvalitetskontroll, og leverer skreddersydde løsninger tilpasset kravene i norsk og nordisk industri.',
    'Fagområder & Spesialkompetanse'
  )}

  ${svc.map(([t, d1, d2, list, imageId, caption], n) => `
    <section class="section${n % 2 ? ' alt' : ''}">
      <div class="wrap split${n % 2 ? ' rev' : ''}">
        <div>
          <span class="idx">Fagområde 0${n + 1}</span>
          <h2>${t}</h2>
          <p>${d1}</p>
          <p>${d2}</p>
          <ul class="checks">
            ${list.map(x => `<li>${x}</li>`).join('')}
          </ul>
        </div>
        <figure class="photo">
          ${img(imageId, t)}
          <figcaption class="img-caption">
            <div>Weldcore Nordic AS</div>
            <span>${caption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  `).join('')}

  ${cta('Har du tegninger klare eller behov for faglig vurdering?', 'Send oss teknisk underlag, isometriske tegninger eller en kort beskrivelse av behovet, så gir vi rask tilbakemelding på utførelse, kapasitet og pris.', 'Kontakt oss for vurdering')}
  `
);

// =========================================
// SIDE 3: PROSJEKTER & ARBEIDSPROSESS ("/prosjekter")
// =========================================
const prj = [
  [
    'pipe',
    'Rør & Prosess',
    'Syrefaste rørgater for prosessindustri',
    'TIG-sveising med bakgass på 316L-rør med strenge krav til renhet og overflate. Utført med kontinuerlig oksygenkontroll, full sats- og sveiselogg samt klargjøring for NDT-inspeksjon og trykkprøving.',
    IMG.eng,
    'TIG 141 · AISI 316L · Bakgass',
  ],
  [
    'steel',
    'Stål & Bygg',
    'Bærende stålkonstruksjoner og gangbaner',
    'Prefabrikasjon og montasje av stålrammer, rekkverk og adkomstplattformer. Produsert etter konstruksjonstegninger i S355 med dokumentert dimensjonskontroll og sikker montasje på byggeplass.',
    IMG.steel,
    'S355J2 · NS-EN 1090 · Montasje',
  ],
  [
    'service',
    'Industriservice',
    'Reparasjons- og slitasjesveising på anleggsutstyr',
    'Forsterkning og utskifting av slitedeler i høyfast stål for entreprenørbransjen. Kontrollerte forvarmings- og mellomstrengstemperaturer ved innsveising av knivstål, sliteplater og hardpålegging.',
    IMG.worker,
    'Hardox / Høyfast stål · Påleggssveising',
  ],
  [
    'steel',
    'Stål & Bygg',
    'Aluminiumsveising for maritimt utstyr',
    'Skreddersydde kasser, braketter og konstruksjoner i sjøvannsbestandig aluminium. Presis AC TIG- og puls-MIG-sveising i 5083/6082-legeringer for krevende kyst- og offshoremiljøer.',
    IMG.weld,
    'EN AW-5083 / 6082 · Maritimt',
  ],
  [
    'pipe',
    'Rør & Prosess',
    'Prefabrikasjon av rørspools og flenser',
    'Serieproduksjon og merking av rørkomponenter etter tekniske tegninger. Effektiv verkstedproduksjon med presis fugeforberedelse, rotstrenger av høy kvalitet og sporbar merking per isometri.',
    IMG.plant,
    'Spool-prefab · Isometri · NDT-klar',
  ],
  [
    'service',
    'Industriservice',
    'Mekanisk ombygging i produksjonslokale',
    'Demontering, tilpasning og nyinstallasjon av stålstrukturer under kort driftsstans. Tett koordinert innsats med skiftordning for å sikre oppstart til avtalt klokkeslett uten produksjonstap.',
    IMG.mech,
    'Revisjonsstans · Industriservice',
  ],
];

const steps = [
  [
    'Gjennomgang av tegninger, materialkrav og prosedyrer',
    'Vi går nøye gjennom teknisk underlag, isometrier, materialkvaliteter, WPS/WPQR og krav til NDT-omfang før produksjon eller mobilisering starter.',
  ],
  [
    'Fast pristilbud eller ressursplanlegging',
    'Du mottar et oversiktlig fastpristilbud på prefabrikasjon/entreprise eller en konkret bemannings- og fremdriftsplan med sertifiserte fagarbeidere.',
  ],
  [
    'Utførelse med løpende egenkontroll og HMS i fokus',
    'Arbeidet utføres etter godkjente prosedyrer med kontroll av fuge, varmetilførsel, bakgass og mål, kombinert med ryddig HMS-arbeid og SJA på anlegg.',
  ],
  [
    'Sluttkontroll, dokumentasjon (FDV/sveiselogg) og overlevering',
    'Før overlevering gjennomføres visuell kontroll (VT), eventuell NDT-oppfølging og sammenstilling av sveiselogg, 3.1-materialsertifikater og FDV-underlag.',
  ],
];

pages['/prosjekter'] = layout(
  '/prosjekter',
  'Leveranseområder og kvalitetssikring',
  'Eksempler på gjennomførte oppdrag innen syrefaste rørgater, bærende stålkonstruksjoner, aluminiumsveising og industriservice hos Weldcore Nordic AS.',
  `
  ${hero(
    'Leveranseområder og kvalitetssikring',
    'Se eksempler på typiske oppdrag vi løser for kundene våre, og hvordan vi jobber strukturert fra teknisk underlag til ferdig godkjent sveis.',
    'Referanseområder & Metodikk'
  )}

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="idx">Eksempler på leveranser</span>
          <h2>Typiske oppdrag for industri, bygg og maritim sektor</h2>
          <p class="sub">Filtrer på fagområde for å se hvordan vi løser oppdrag innen rørsveising, stålkonstruksjoner og mekanisk industriservice.</p>
        </div>
      </div>

      <div class="filters" role="group" aria-label="Filtrer prosjekter etter fagområde">
        ${[
          ['all', 'Alle'],
          ['pipe', 'Rør & Prosess'],
          ['steel', 'Stål & Bygg'],
          ['service', 'Industriservice'],
        ].map(([k, t], i) => `<button type="button" class="${i ? '' : 'on'}" data-f="${k}" aria-pressed="${i ? 'false' : 'true'}">${t}</button>`).join('')}
      </div>

      <div class="grid3">
        ${prj.map(([k, tag, t, d, imageId, spec]) => `
          <article class="card proj" data-c="${k}">
            <figure class="photo sm">${img(imageId, t)}</figure>
            <span class="tag">${tag}</span>
            <h3>${t}</h3>
            <p>${d}</p>
            <div class="meta-row"><span>${spec}</span></div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section dark">
    <div class="wrap">
      <span class="badge">Kvalitetssikring i alle ledd</span>
      <h2>Vår arbeidsmetodikk – 4 faste steg</h2>
      <p class="lead">Strukturert styring fra tegningsgrunnlag til ferdig dokumentert leveranse sikrer forutsigbarhet for prosjektleder, byggherre og tredjeparts kontrollør.</p>
      <div class="grid4">
        ${steps.map(([t, d], i) => `
          <div class="step">
            <span class="num big">Steg 0${i + 1}</span>
            <h3>${t}</h3>
            <p>${d}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  ${cta('Har du et lignende prosjekt eller behov for ekstra sveisekapasitet?', 'Ta kontakt med oss for en teknisk gjennomgang av tegninger, materialkrav og fremdriftsplan.', 'Be om tilbud eller kapasitet')}`,
  `<script>
    document.querySelectorAll('.filters button').forEach(function(b){
      b.addEventListener('click', function(){
        document.querySelectorAll('.filters button').forEach(function(x){
          x.classList.remove('on');
          x.setAttribute('aria-pressed', 'false');
        });
        b.classList.add('on');
        b.setAttribute('aria-pressed', 'true');
        document.querySelectorAll('.proj').forEach(function(c){
          c.hidden = (b.dataset.f !== 'all' && c.dataset.c !== b.dataset.f);
        });
      });
    });
  </script>`
);

// =========================================
// SIDE 4: OM OSS ("/om-oss")
// =========================================
pages['/om-oss'] = layout(
  '/om-oss',
  'Om Weldcore Nordic AS',
  'Et spesialisert sveise- og stålselskap etablert for å levere høy teknisk kvalitet, pålitelig kapasitet og ryddig prosjekthåndtering.',
  `
  ${hero(
    'Om Weldcore Nordic AS',
    'Et spesialisert sveise- og stålselskap etablert for å levere høy teknisk kvalitet, pålitelig kapasitet og ryddig prosjekthåndtering.',
    'Selskapet & Vår Standard'
  )}

  <section class="section">
    <div class="wrap split">
      <div class="prose">
        <span class="idx">Sveisefaglig tyngde og gjennomføringskraft</span>
        <h2>En trygg utførende partner for krevende stål- og sveisearbeider</h2>
        <p>I prosjekter der stålkonstruksjoner skal bære tung last eller rørgater skal tåle høyt trykk og korrosive miljøer, finnes det ingen snarveier. Weldcore Nordic AS ble startet med en tydelig ambisjon: å være en samarbeidspartner som oppdragsgivere kan stole 100 prosent på når det gjelder både sveisefaglig utførelse og avtalte tidsfrister.</p>
        <p>Vi arbeider tett med hovedentreprenører, mekaniske verksteder, industribedrifter og tekniske rådgivere. Enten vi går inn i et prosjekt med egne sveisere for å avlaste ved arbeidstopper, eller vi tar totalansvaret for prefabrikasjon og montasje av en komplett leveranse, møter vi forberedt med riktig utstyr og oppdatert kompetanse.</p>
        <p>For oss handler godt håndverk like mye om sikkerhet, orden og dokumentasjon som selve lysbuen. Vi følger strenge rutiner for HMS, materialkontroll og sporbarhet, slik at hver leveranse fra Weldcore Nordic AS tåler både teknisk kontroll og mange tiår med krevende drift.</p>
      </div>
      <figure class="photo">
        ${img(IMG.qc, 'Kvalitetskontroll og fagarbeid hos Weldcore Nordic AS')}
        <figcaption class="img-caption">
          <div>Fagkompetanse, HMS og full sporbarhet</div>
          <span>Weldcore Nordic AS</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="section alt">
    <div class="wrap">
      <span class="idx">Kjerneverdier i praksis</span>
      <h2>Vår standard</h2>
      <p class="sub">Tre ufravikelige prinsipper styrer hvordan vi planlegger, sveiser, monterer og dokumenterer hvert eneste oppdrag.</p>
      <div class="grid3 trio">
        <div class="card">
          <span class="tick"></span>
          <h3>Teknisk presisjon</h3>
          <p>Sveiser utført etter gjeldende standarder og kundens spesifikasjoner. Vi følger kvalifiserte sveiseprosedyrer (WPS), kontrollerer fugegeometri og dokumenterer tilsatsmaterialer og sertifikater nøye.</p>
        </div>
        <div class="card">
          <span class="tick"></span>
          <h3>Høy oppetid og respons</h3>
          <p>Vi snur oss raskt når prosjektet krever ekstra kapasitet. Ved driftsstans, ombygginger eller stramme byggetider mobiliserer vi kvalifiserte sveisere og montører med kort responstid.</p>
        </div>
        <div class="card">
          <span class="tick"></span>
          <h3>Sikkerhet først</h3>
          <p>Nullvisjon for skader og ryddig opptreden på alle anlegg. Vi etterlever alle krav til verneutstyr, sikker jobb-analyse (SJA), gassmåling og varme arbeider både i verksted og ute på byggeplass.</p>
        </div>
      </div>
    </div>
  </section>

  ${cta('Ønsker du å diskutere et kommende prosjekt eller rammeavtale?', 'Ta kontakt med oss for en uforpliktende fagprat om kapasitet, prefabrikasjon eller innleie av sertifiserte sveisere.', 'Kontakt oss i dag')}
  `
);

// =========================================
// SIDE 5: KONTAKT & FORESPØRSEL ("/kontakt")
// =========================================
const sel = (id, label, opts) => `
  <label>${label}
    <select name="${id}" required>
      <option value="">Velg alternativ …</option>
      ${opts.map(o => `<option value="${o}">${o}</option>`).join('')}
    </select>
  </label>`;

const inp = (id, label, type = 'text', placeholder = '', req = true) => `
  <label>${label}
    <input name="${id}" type="${type}" placeholder="${placeholder}"${req ? ' required' : ''}>
  </label>`;

pages['/kontakt'] = layout(
  '/kontakt',
  'Kontakt oss for pristilbud eller kapasitet',
  'Send forespørsel om sertifisert sveising, stålkonstruksjoner, rørsveising, industriservice eller innleie av sveisere til Weldcore Nordic AS.',
  `
  ${hero(
    'Kontakt oss for pristilbud eller kapasitet',
    'Send oss en kort beskrivelse av prosjektet eller behovet ditt, så tar vi raskt kontakt for en teknisk gjennomgang.',
    'Forespørsel & Pristilbud'
  )}

  <section class="section">
    <div class="wrap csplit">
      <aside>
        <div class="card">
          <span class="tick"></span>
          <h3>Weldcore Nordic AS</h3>
          <p>Direkte kontaktpunkter for tilbudsforespørsler, prosjektledelse og akutt utrykning ved driftsstans.</p>
          <dl class="info">
            <dt>Telefon (Sentralbord)</dt>
            <dd><a href="tel:+4740000000">+47 400 00 000</a></dd>
            <dt>E-post (Tilbud &amp; Tegninger)</dt>
            <dd><a href="mailto:post@weldcore.no">post@weldcore.no</a></dd>
            <dt>Vakt / prosjekttelefon</dt>
            <dd><a href="tel:+4740000001">+47 400 00 001 (Døgnvakt ved driftsstans)</a></dd>
            <dt>Arbeidstider</dt>
            <dd>Man–fre 07:00–16:00 (Vakttelefon 24/7 ved avtale/utrykning)</dd>
          </dl>
        </div>

        <div class="card dark-card">
          <span class="tick"></span>
          <h3>Rask avklaring på forespørsler</h3>
          <ol class="steps-list">
            <li>Send inn beskrivelse eller forespørsel</li>
            <li>Vi gjennomgår omfang, tegninger og tidsramme</li>
            <li>Du får rask tilbakemelding på kapasitet og pris</li>
          </ol>
        </div>
      </aside>

      <form class="card form" id="f" novalidate>
        <div class="form-header">
          <h3>Send forespørsel om oppdrag eller kapasitet</h3>
          <p>Fyll ut skjemaet nedenfor. Har du tegninger (PDF/DWG/IFC) eller WPS-krav, tar vi imot disse så snart vi oppretter dialog.</p>
        </div>
        ${inp('firma', 'Bedriftsnavn', 'text', 'F.eks. Nordisk Entreprenør AS')}
        ${inp('kontakt', 'Kontaktperson', 'text', 'Navn og tittel')}
        ${inp('tlf', 'Telefonnummer', 'tel', '+47 000 00 000')}
        ${inp('epost', 'E-postadresse', 'email', 'navn@bedrift.no')}
        <div class="full">
          ${inp('sted', 'Lokasjon / Prosjektsted', 'text', 'Kommune, anleggsplass eller verkstedleveranse')}
        </div>
        ${sel('type', 'Type oppdrag', [
          'Sertifisert sveising',
          'Stålkonstruksjoner & Montasje',
          'Rørsveising & Prosess',
          'Industriservice & Vedlikehold',
          'Innleie av sveisere',
          'Annet',
        ])}
        ${sel('start', 'Ønsket oppstart', [
          'Akutt',
          'Så snart som mulig',
          'Innen 2–4 uker',
          'Planlagt fremtidig prosjekt',
        ])}
        <label class="full">Beskrivelse av oppdraget / materialkrav
          <textarea name="beskrivelse" rows="6" placeholder="Beskriv kort omfang, materialkvalitet (f.eks. S355, 316L, aluminium), dimensjoner, tegningsgrunnlag eller ønsket antall sveisere/montører …" required></textarea>
        </label>
        <button class="btn full" type="submit">Send forespørsel</button>
        <p class="ok full" id="ok" hidden>Takk for forespørselen! Vi har mottatt opplysningene dine og tar raskt kontakt for teknisk gjennomgang.</p>
      </form>
    </div>
  </section>`,
  `<script>
    (function(){
      var f = document.getElementById('f');
      var ok = document.getElementById('ok');
      if (!f) return;
      f.addEventListener('submit', function(e){
        e.preventDefault();
        if (!f.reportValidity()) return;
        ok.hidden = false;
        f.reset();
        ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    })();
  </script>`
);

// Skriv genererte filer til både rot (for lokal server) og dist/ (for Firebase Hosting "site": "weldcore")
const distDir = path.join(__dirname, 'dist');
fs.mkdirSync(distDir, { recursive: true });

for (const [r, html] of Object.entries(pages)) {
  const relIdx = r === '/' ? 'index.html' : path.join(r.slice(1), 'index.html');
  // Skriv til rot
  const rootTarget = path.join(__dirname, relIdx);
  fs.mkdirSync(path.dirname(rootTarget), { recursive: true });
  fs.writeFileSync(rootTarget, html);

  // Skriv til dist/
  const distTarget = path.join(distDir, relIdx);
  fs.mkdirSync(path.dirname(distTarget), { recursive: true });
  fs.writeFileSync(distTarget, html);
}

// Kopier statiske ressurser (style.css og firebase.js) til dist/
for (const asset of ['style.css', 'firebase.js']) {
  const srcAsset = path.join(__dirname, asset);
  if (fs.existsSync(srcAsset)) {
    fs.copyFileSync(srcAsset, path.join(distDir, asset));
  }
}

console.log('Bygget', Object.keys(pages).length, 'sider til rot og dist/ (klar for Firebase Hosting: site "weldcore")');
