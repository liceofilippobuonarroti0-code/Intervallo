'use strict';
(() => {
  const config = window.INTERVALLO_CONFIG || {};
  const main = document.getElementById('contenuto');
  const nav = document.getElementById('navigation');
  const menu = document.getElementById('menu-toggle');
  const paths = {
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6m2 10v-3a6 6 0 0 0-3-5"/>',
    book: '<path d="M12 5v16M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2Z"/>',
    voice: '<path d="m4 10 15-6v16L4 14ZM4 10v4H2v-4m4 5 2 6h4l-3-7M22 9v6"/>',
    chart: '<path d="M4 21V12h4v9m3 0V4h4v17m3 0v-7h4v7M2 21h21"/>',
    trophy: '<path d="M7 3h10v6a5 5 0 0 1-10 0Zm0 2H3v3a5 5 0 0 0 5 5m9-8h4v3a5 5 0 0 1-5 5m-4 1v6m-5 1h10"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-13 4h3m3 0h3"/>',
    tag: '<path d="M3 3h8l10 10-8 8L3 11Z"/><circle cx="7" cy="7" r="1"/>',
    shirt: '<path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4a4 4 0 0 1-8 0Z"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
    spark: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Zm8 0v4m-2-2h4"/>',
    file: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h8"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-6 2 2-6a10 10 0 0 1-1-4 9 9 0 0 1 18 0Z"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0v6l-2 4h16l-2-4Zm-8 13h4"/>',
    settings: '<path d="m9 3-1 3-3 1-2 4 2 2v4l4 2 3-1 3 1 4-2v-4l2-2-2-4-3-1-1-3Z"/><circle cx="12" cy="11" r="3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>'
  };
  const svg = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
  const icon = (name, tone = '') => `<span class="icon ${tone}">${svg(name)}</span>`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const badge = (text, tone = '') => `<span class="badge ${tone}">${text}</span>`;
  const link = (route, text) => `<a class="text-link" href="#${route}">${text}<span aria-hidden="true">↗</span></a>`;
  const button = (route, text, tone = '') => `<a class="button ${tone}" href="#${route}">${text}<span aria-hidden="true">↗</span></a>`;
  function externalUrl(value) {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; }
  }
  function tournamentUrl() {
    return esc(externalUrl(config.torneoUrl) || 'https://liceofilippobuonarroti0-code.github.io/torneo-buonarroti/');
  }
  const tournamentButton = (text = 'Entra nel sito del torneo', tone = '') => `<a class="button ${tone}" href="${tournamentUrl()}">${text}<span aria-hidden="true">↗</span></a>`;
  const development = (title, description) => `<aside class="development">${icon('lock')}<div><h2>${title}</h2><p>${description}</p></div></aside>`;
  const placeholder = (name, title, text) => `<div class="placeholder">${svg(name)}<h3>${title}</h3><p>${text}</p></div>`;
  const heading = (number, title, description = '') => `<div class="section-heading"><div><p class="eyebrow">${number}</p><h2>${title}</h2></div>${description ? `<p>${description}</p>` : ''}</div>`;
  function pageHero(category, title, description, parent = '', status = '') {
    return `<section class="page-hero"><div class="container"><div class="breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span>${parent ? `<a href="#${parent[0]}">${parent[1]}</a><span aria-hidden="true">/</span>` : ''}<span>${category}</span></div><p class="eyebrow">${category} ${status ? badge(status) : ''}</p><h1>${title}</h1><p class="lead">${description}</p></div></section>`;
  }
  function featureCard(name, title, description, route, status = 'Prossimamente', tone = '') {
    return `<article class="card"><div class="card-top">${icon(name,tone)}${badge(status,status === 'Disponibile' ? 'live' : 'neutral')}</div><h3>${title}</h3><p>${description}</p>${link(route, status === 'Disponibile' ? 'Scopri di più' : 'Esplora la sezione')}</article>`;
  }
  const sportDisplay = () => `<div class="sport-display"><small>TORNEO D’ISTITUTO · BUONARROTI</small><span class="sport-star" aria-hidden="true">✦</span><div class="sport-year">2026<span style="color:#837b9f">/</span>27</div><div class="sport-row"><span>01 · Calcetto</span><span>02 · Basket</span><span>03 · Pallavolo</span></div></div>`;
  function news() {
    const notices = Array.isArray(config.comunicazioni) ? config.comunicazioni.filter(n => n && typeof n.titolo === 'string' && typeof n.testo === 'string') : [];
    if (!notices.length) return `<article class="notice">${badge('Il progetto')}<div><h3>Un nuovo punto d’incontro, per tutti.</h3><p>intervallo. prende forma: il sito del torneo è già consultabile. Qui troverai anche le comunicazioni sulle assemblee, gli eventi e le prossime novità della scuola.</p></div></article>`;
    return notices.map(n => `<article class="notice">${badge(esc(n.categoria || 'Novità'))}<div><h3>${esc(n.titolo)}</h3><p>${esc(n.testo)}</p></div></article>`).join('');
  }
  function home() {
    return `<div class="hero-wrap"><section class="hero container"><div><p class="eyebrow"><span class="eyebrow-line"></span>INTERVALLO / IL TUO SPAZIO</p><h1>La scuola.<br>Fuori dagli<br><span class="accent">schemi.</span></h1><p class="hero-description">Studiare, incontrarsi, dire la propria.<br>La vita al Buonarroti, tutta in un posto.</p><div class="actions">${button('campus','Esplora il Campus','light')}${button('community','La tua Community','ghost')}</div></div><aside class="orbit-card" aria-label="In evidenza"><div class="orbit-top"><span>UNA SCUOLA. MILLE POSSIBILITÀ.</span><b aria-hidden="true">✦</b></div><div class="orbit-art" aria-hidden="true"><span>i<i>.</i></span></div><p class="orbit-title">Il prossimo passo?<br>Farlo insieme.</p><div class="orbit-links"><a href="#tornei"><span><i class="dot green"></i>Tornei d’istituto</span><small>SCOPRI IL TORNEO</small><span aria-hidden="true">↗</span></a><a href="#assemblee"><span><i class="dot"></i>Assemblee</span><small>LA TUA VOCE</small><span aria-hidden="true">↗</span></a><a href="#studio"><span><i class="dot"></i>Study Class</span><small>IN SVILUPPO</small><span aria-hidden="true">↗</span></a></div></aside></section><div class="hero-bottom container"><span>PENSATO PER GLI STUDENTI DEL BUONARROTI</span><a href="#scopri">Trova il tuo spazio <span aria-hidden="true">↓</span></a></div></div>
    <section id="scopri" class="section container">${heading('01 / PER TE','Ogni giorno, qualcosa in più.','Dalla tua classe a tutta la scuola.<br>Scegli da dove cominciare.')}<div class="grid three">${featureCard('voice','Assemblee','Uno spazio per le comunicazioni dei rappresentanti e le idee per i prossimi incontri.','assemblee','In sviluppo','orange')}${featureCard('book','Study Class','Trova il tuo gruppo, condividi i dubbi. E quella verifica fa un po’ meno paura.','studio','In sviluppo')}${featureCard('chart','Sondaggi','Come sarà la prossima assemblea? Una pagina per dare spazio alla tua voce.','sondaggi','In sviluppo','blue')}</div></section>
    <section class="tournament-band"><div class="container tournament-layout"><div><p class="eyebrow">02 / TORNEI D’ISTITUTO</p><h2>Una scuola.<br>Tre sport.<br>La tua squadra.</h2><p>Calcetto, basket e pallavolo: il torneo del Buonarroti ha il suo spazio. Regolamenti, iscrizioni e comunicazioni, tutti sul sito dedicato.</p><div class="actions">${button('tornei','Scopri il torneo')}${link('campus','Tutto il Campus')}</div></div>${sportDisplay()}</div></section>
    <section class="section container">${heading('03 / DALLA TUA SCUOLA','Ci vediamo qui.','Novità e comunicazioni.<br>Un punto da cui ripartire.')}<div>${news()}</div><div class="grid two" style="margin-top:24px">${featureCard('calendar','Oltre la campanella','Musica, incontri e momenti da vivere insieme. Scopri lo spazio dedicato agli eventi.','eventi','Prossimamente','blue')}${featureCard('people','Ogni idea conta.','Le proposte degli studenti e le scelte che fanno crescere la scuola.','community','In sviluppo')}</div></section>
    <aside class="closing"><div class="container"><div><h2>Il bello è esserci.<br>Insieme, ancora di più.</h2><p>Fai spazio alla tua vita a scuola.</p></div>${button('campus','Esplora il Campus','light')}</div></aside>`;
  }
  function campus() {
    return pageHero('Campus','Oltre la campanella<span class="accent">.</span>','La vita a scuola non finisce in classe. Uno spazio per incontrarsi, giocare e sentirsi parte del Buonarroti.') + `<div class="page-content container"><div class="grid two">${featureCard('trophy','Tornei d’istituto','La tua squadra, la tua scuola. Calcetto, basket e pallavolo nel torneo 2026/27.','tornei','Disponibile','orange')}${featureCard('calendar','Eventi','I momenti da vivere, anche dopo la campanella. Musica, incontri e nuove occasioni.','eventi','Prossimamente','blue')}${featureCard('tag','Sconti studenti','Piccoli vantaggi per le tue grandi giornate. Le convenzioni dedicate agli studenti.','sconti','Prossimamente','green')}${featureCard('shirt','Merch','Un po’ della tua scuola, da portare con te. Lo spazio per il merch del Buonarroti.','merch','Prossimamente','blue')}</div></div>`;
  }
  function tournaments() {
    return pageHero('Tornei d’istituto','Si gioca. Insieme<span class="accent">.</span>','Qui trovi esclusivamente i tornei organizzati per gli studenti dell’istituto. Scegli l’edizione e vai al suo sito dedicato.',['campus','Campus']) + `<div class="page-content container"><div class="tournament-layout" style="padding-top:0"><div><p class="eyebrow">LICEO FILIPPO BUONARROTI</p><h2>Torneo d’Istituto<br>2026/27</h2><p>Forma la tua squadra e scegli il tuo campo. Il sito dedicato raccoglie i tre regolamenti, le informazioni sulle iscrizioni, le squadre e gli aggiornamenti degli organizzatori.</p><div class="actions">${tournamentButton()}</div><p class="form-note">La disponibilità delle iscrizioni è indicata sul sito del torneo.</p></div>${sportDisplay()}</div><div class="grid three">${['Calcetto','Basket','Pallavolo'].map((s,i) => `<article class="card"><p class="eyebrow">0${i+1} / LO SPORT</p><h3 style="margin-top:20px">${s}</h3><p>Consulta il regolamento di ${s.toLowerCase()} sul sito dedicato.</p><a class="text-link" style="margin-top:24px" href="${tournamentUrl()}#regolamento-${s.toLowerCase()}">Il regolamento ↗</a></article>`).join('')}</div>${link('campus','Torna al Campus')}</div>`;
  }
  function studio() {
    return pageHero('Studio / Study Class','Il prossimo passo?<br>Farlo insieme<span class="accent">.</span>','Studia insieme agli altri studenti della tua scuola. Trova un gruppo, organizza un incontro e condividi gli appunti.','','In sviluppo') + `<div class="page-content container">${development('Study Class non ancora accessibili','La pagina è pronta come anteprima. Ricerca, creazione, partecipazione, chat e condivisione dei materiali saranno disponibili in una fase successiva.')}<div class="grid two"><article class="card"><p class="eyebrow">IL TUO PROSSIMO GRUPPO</p><h2 style="font-size:2rem;margin-top:15px">Trova la tua Study Class.</h2><div class="preview-toolbar"><input aria-label="Cerca Study Class, in sviluppo" placeholder="Cerca un argomento, una materia…" disabled><select aria-label="Filtra materia, in sviluppo" disabled><option>Tutte le materie</option><option>Matematica</option><option>Fisica</option><option>Inglese</option></select></div>${placeholder('people','Il tuo gruppo ti aspetta','Le tue Study Class e i gruppi della scuola appariranno qui quando il servizio sarà attivo.')}<div class="actions"><button class="button" disabled>Crea Study Class</button></div></article><article class="card"><div class="card-top">${icon('book')}${badge('Anteprima','neutral')}</div><h3>Tutto il gruppo, in un posto.</h3><p>Ogni Study Class avrà un suo spazio per organizzare lo studio.</p><ul class="feature-list"><li>Info: materia, classe, data, orario, luogo e modalità</li><li>Persone: partecipanti e creatore del gruppo</li><li>Chat: domande e organizzazione dell’incontro</li><li>Materiali: appunti, PDF e immagini condivise</li></ul>${link('study-class','Esplora la pagina di un gruppo')}</article><article class="card wide"><p class="eyebrow">CREA STUDY CLASS / IN SVILUPPO</p><h3 style="margin-top:14px">Dal dubbio al gruppo.</h3><p>Il modulo di creazione prevederà titolo, materia, descrizione, classe, data, orari, modalità in presenza o online, luogo, numero massimo di partecipanti e chiusura delle adesioni.</p><div class="actions"><button class="button secondary" disabled>Creazione non disponibile</button></div></article></div></div>`;
  }
  function studyClass() {
    return pageHero('Study Class / Il gruppo','Lo spazio del gruppo<span class="accent">.</span>','Un’anteprima della pagina che raccoglierà tutte le informazioni della tua Study Class.',['studio','Studio'],'In sviluppo') + `<div class="page-content container">${development('Nessun gruppo attivo in questa anteprima','Partecipanti, conversazioni e file verranno mostrati qui quando le Study Class saranno disponibili.')}<div class="grid two"><article class="card"><h3>Info del gruppo</h3><ul class="feature-list"><li>Materia e argomento di studio</li><li>Scuola, classe e creatore</li><li>Data, orario e luogo dell’incontro</li><li>In presenza, online o modalità ibrida</li><li>Partecipanti, posti disponibili e termine delle adesioni</li></ul><div class="actions"><button class="button" disabled>Partecipazione non disponibile</button></div></article><article class="card"><h3>Persone</h3>${placeholder('people','Ci ritroveremo qui.','Creatore e partecipanti saranno visibili quando il gruppo sarà attivo.')}</article><article class="card"><h3>Chat</h3>${placeholder('chat','La conversazione inizia qui.','Uno spazio per chiarire i dubbi e organizzarsi insieme.')}<div class="actions"><button class="button secondary" disabled>Invio messaggi in sviluppo</button></div></article><article class="card"><h3>Materiali</h3>${placeholder('file','Spazio ai tuoi appunti.','PDF e immagini condivisi dal gruppo.')}<div class="actions"><button class="button secondary" disabled>Caricamento in sviluppo</button></div></article></div><a class="back-link" href="#studio">← Torna a Studio</a></div>`;
  }
  function community() {
    return pageHero('Community','La scuola siamo noi<span class="accent">.</span>','Idee, scelte e una voce che conta. La tua.') + `<div class="page-content container"><div class="grid two">${featureCard('voice','Assemblee','Le comunicazioni dei rappresentanti, le informazioni sugli incontri e le idee da portare in assemblea.','assemblee','In sviluppo','orange')}${featureCard('chart','Sondaggi','Uno spazio per scegliere le attività e dire la tua sulle prossime iniziative della scuola.','sondaggi','In sviluppo','blue')}<article class="card wide"><div class="card-top">${icon('people')}${badge('In sviluppo','neutral')}</div><h3>Le vostre proposte</h3><p>Ogni idea conta. Qui troverai le proposte degli studenti, dalla vita in classe agli spazi della scuola.</p>${placeholder('spark','La prossima idea potrebbe essere la tua.','La raccolta delle proposte è in preparazione. Non ci sono ancora proposte pubblicate.')}<div class="actions">${externalUrl(config.proposteFormUrl) ? `<a class="button" href="${esc(externalUrl(config.proposteFormUrl))}" target="_blank" rel="noopener noreferrer">Invia una proposta ↗</a>` : '<button class="button" disabled>Nuova proposta · prossimamente</button>'}</div></article></div></div>`;
  }
  function polls() {
    return pageHero('Sondaggi','Dì la tua<span class="accent">.</span>','Le scelte della scuola passano anche da te. Uno spazio per ascoltare le idee e scegliere insieme.',['community','Community'],'In sviluppo') + `<div class="page-content container">${development('I sondaggi non sono ancora attivi','Questa è un’anteprima della pagina. Non è possibile votare e non vengono raccolte risposte.')}<div class="grid two"><article class="card"><p class="preview-label">ESEMPIO DI SONDAGGIO · NON ATTIVO</p><h2 style="font-size:2rem">Quale attività vorresti alla prossima assemblea?</h2><fieldset style="border:0;padding:0;margin:0" disabled><legend class="muted" style="margin-top:18px">Opzioni dimostrative</legend><div class="locked-options">${['Torneo','Ospite','Musica','Dibattito'].map(o => `<label class="locked-option"><input type="radio" name="poll-preview" style="width:auto;min-height:0" disabled>${o}</label>`).join('')}</div></fieldset><div class="actions"><button class="button" disabled>Votazione non disponibile</button></div></article><article class="card help-card"><div class="card-top">${icon('chart','blue')}${badge('Prossimamente','neutral')}</div><h3>Ogni scelta, il suo spazio.</h3><p>Quando il servizio sarà pronto, troverai il sondaggio attivo, le indicazioni per partecipare e gli eventuali risultati pubblicati dai rappresentanti.</p><p>Il metodo di raccolta delle risposte è ancora da definire.</p>${placeholder('chart','Nessun risultato pubblicato.','I risultati verranno condivisi dopo l’apertura e la conclusione dei sondaggi.')}</article></div></div>`;
  }
  function assemblies() {
    return pageHero('Assemblee','La tua voce<br>in assemblea<span class="accent">.</span>','Novità, idee e informazioni per gli incontri d’istituto. Il punto di riferimento per le comunicazioni dei rappresentanti.',['community','Community'],'In sviluppo') + `<div class="page-content container">${development('La sezione assemblee è in preparazione','La pagina è già consultabile. Programma, partecipazione e comunicazioni saranno disponibili dopo la conferma degli organizzatori.')}<div class="grid two"><article class="card"><div class="card-top">${icon('voice','orange')}${badge('In aggiornamento','neutral')}</div><h3>La prossima assemblea</h3><p>Data, orari, luogo, programma e indicazioni per partecipare verranno pubblicati dopo la conferma degli organizzatori.</p>${placeholder('calendar','Ci vediamo qui.','Non è ancora stato pubblicato un programma per la prossima assemblea.')}</article><article class="card"><div class="card-top">${icon('chart','blue')}${badge('In sviluppo','neutral')}</div><h3>Le idee partono da voi.</h3><p>Le proposte e i sondaggi aiuteranno a dare forma ai prossimi incontri. Puoi già esplorare le pagine dedicate.</p><div class="actions">${button('sondaggi','La pagina dei sondaggi','secondary')}${link('community','Le vostre proposte')}</div></article><article class="card wide"><p class="eyebrow">COMUNICAZIONI DEI RAPPRESENTANTI</p><h3 style="margin-top:15px">Tutto quello che serve sapere.</h3><p>Le comunicazioni sulle assemblee saranno raccolte in questa sezione. Non ci sono ancora avvisi pubblicati.</p></article></div></div>`;
  }
  const futureSections = {
    eventi: ['Eventi','Ci vediamo fuori dall’aula<span class="accent">.</span>','I momenti da vivere, anche dopo la campanella. Musica, incontri e occasioni per conoscersi.','calendar','blue','Il prossimo evento','Data, luogo, programma e indicazioni per partecipare verranno pubblicati quando l’evento sarà confermato.','Il calendario prende forma.','Non ci sono ancora eventi pubblicati.','Le informazioni in un posto solo.',['Calendario degli eventi','Programma e luogo degli incontri','Indicazioni per partecipare e iscriversi']],
    sconti: ['Sconti studenti','Piccoli vantaggi.<br>Grandi giornate<span class="accent">.</span>','Lo spazio per le convenzioni e le iniziative dedicate agli studenti del Buonarroti.','tag','green','Le convenzioni della scuola','Qui troverai le attività aderenti, le offerte e le condizioni per accedere agli sconti.','Le opportunità stanno arrivando.','Non ci sono ancora convenzioni pubblicate.','Tutto chiaro, prima di scegliere.',['Attività e negozi convenzionati','Condizioni e validità delle offerte','Modalità per usufruire degli sconti']],
    merch: ['Merch','Un po’ di scuola.<br>Da portare con te<span class="accent">.</span>','Lo spazio dedicato al merch del Buonarroti e alle prossime iniziative degli studenti.','shirt','blue','La prossima collezione','Articoli, taglie, prezzi e modalità di prenotazione verranno pubblicati quando saranno definiti.','Il Buonarroti, anche fuori da scuola.','Non ci sono ancora articoli disponibili.','Dall’idea alla tua felpa.',['Articoli e immagini della collezione','Taglie, prezzi e disponibilità','Informazioni su prenotazione e ritiro']]
  };
  function future(key) {
    const [category,title,desc,name,tone,cardTitle,body,emptyTitle,emptyBody,secondTitle,items] = futureSections[key];
    return pageHero(category,title,desc,['campus','Campus'],'Prossimamente') + `<div class="page-content container"><div class="grid two"><article class="card"><div class="card-top">${icon(name,tone)}${badge('Prossimamente','neutral')}</div><h3>${cardTitle}</h3><p>${body}</p>${placeholder(name,emptyTitle,emptyBody)}</article><article class="card"><p class="eyebrow">LO SPAZIO È PRONTO</p><h3 style="margin-top:18px">${secondTitle}</h3><p>La sezione raccoglierà:</p><ul class="feature-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>${link('campus','Scopri il Campus')}</article></div></div>`;
  }
  function infoPage(key) {
    if (key === 'notifiche') return pageHero('Notifiche','Niente da perdere<span class="accent">.</span>','Uno spazio per gli aggiornamenti dei tuoi gruppi e della scuola.','','In sviluppo') + `<div class="page-content container"><article class="card">${placeholder('bell','Le novità ti aspettano qui.','Questa versione non invia notifiche. Per gli aggiornamenti puoi consultare le comunicazioni nella Home.')}<div class="actions">${button('home','Vai alle comunicazioni')}</div></article></div>`;
    return pageHero('Il progetto','intervallo<span class="accent">.</span>','La tua scuola, tutta in un posto. Uno spazio per studiare insieme e vivere il Buonarroti.') + `<div class="page-content container"><div class="grid two"><article class="card help-card"><p class="eyebrow">IL PROGETTO</p><h3 style="margin-top:18px">Un punto di incontro.</h3><p>intervallo. porta sul web le sezioni dell’app: Home, Studio, Community e Campus. Assemblee, eventi, tornei d’istituto, proposte, sconti e merch hanno ciascuno il proprio spazio.</p><p>Questa prima versione è un’anteprima del portale. Il sito del torneo è già consultabile; Study Class, sondaggi e le altre iniziative saranno completati nelle prossime fasi.</p></article><article class="card help-card"><p class="eyebrow">APERTO A TUTTI</p><h3 style="margin-top:18px">Entra e scopri la tua scuola.</h3><p>Tutte le sezioni del portale sono consultabili liberamente, senza login o profilo personale.</p><p>Chat, file, creazione dei gruppi e votazioni non sono ancora attivi. Nessuna risposta ai sondaggi viene raccolta in questa versione.</p>${link('campus','Esplora il Campus')}</article></div></div>`;
  }
  const routes = {
    home: [home,'Home','home'], campus: [campus,'Campus','campus'], tornei: [tournaments,'Tornei d’istituto','campus'],
    studio: [studio,'Study Class','studio'], 'study-class': [studyClass,'Il gruppo','studio'], community: [community,'Community','community'],
    sondaggi: [polls,'Sondaggi','community'], assemblee: [assemblies,'Assemblee','community'],
    eventi: [() => future('eventi'),'Eventi','campus'], sconti: [() => future('sconti'),'Sconti studenti','campus'], merch: [() => future('merch'),'Merch','campus'],
    notifiche: [() => infoPage('notifiche'),'Notifiche',''], informazioni: [() => infoPage('informazioni'),'Il progetto','']
  };
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); }
  menu.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded',String(open)); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  function render(moveFocus = true) {
    let key = location.hash.slice(1) || 'home';
    if (['profilo','impostazioni','login'].includes(key)) {
      key = 'home';
      history.replaceState(null, '', '#home');
    }
    if (key === 'contenuto') {
      if (!main.children.length) renderHomeForAnchor();
      closeMenu(); main.focus({preventScroll:true}); main.scrollIntoView();
      return;
    }
    if (key === 'scopri') {
      if (!document.getElementById('scopri')) renderHomeForAnchor();
      document.getElementById('scopri')?.scrollIntoView();
      return;
    }
    const route = routes[key];
    if (!route) {
      main.innerHTML = pageHero('Pagina non trovata','Qui c’è ancora spazio<span class="accent">.</span>','La pagina che cerchi non esiste. Torna alla Home per esplorare il portale.') + `<div class="container page-content">${button('home','Torna alla Home')}</div>`;
      document.title = 'Pagina non trovata · intervallo.';
    } else {
      main.innerHTML = route[0]();
      document.title = `${route[1]} · intervallo. · Buonarroti`;
    }
    document.querySelectorAll('[data-nav]').forEach(a => { if (route && a.dataset.nav === route[2]) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    closeMenu();
    if (moveFocus) { main.focus({preventScroll:true}); window.scrollTo(0,0); }
  }
  function renderHomeForAnchor() {
    main.innerHTML = home();
    document.title = 'Home · intervallo. · Buonarroti';
    document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === 'home') a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    closeMenu();
  }
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href') === location.hash) { event.preventDefault(); render(); }
  });
  window.addEventListener('hashchange', () => render());
  render(false);
})();
