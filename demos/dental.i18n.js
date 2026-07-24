/* =============================================================
   Studio Sorriso — i18n engine
   -----------------------------------------------------------------
   Enterprise-style, framework-free.
   - Reads current language from ?lang= URL param or localStorage
   - Persists user choice
   - Translates any element with [data-i18n="key"]
   - Translates attributes with [data-i18n-attr="attr:key"]
   - Updates <html lang>, meta description, og:locale, page title
   - Exposes window.__setLang(lang) for the switcher
   ============================================================= */
(function () {
    const DEFAULT_LANG = 'it';
    const SUPPORTED = ['it', 'en'];
    const STORAGE_KEY = 'studiosorriso.lang';

    const dict = {
        it: {
            /* Meta */
            'meta.title': 'Studio Dentistico Sorriso · Odontoiatria a Catania',
            'meta.description': 'Studio Dentistico Sorriso — Odontoiatria specialistica a Catania. Prima visita gratuita, pagamento rateale, équipe di specialisti. Prenota ora: +39 095 000 00 00.',
            'meta.og.locale': 'it_IT',

            /* Topbar */
            'topbar.hours': 'Lun–Ven 9:00–19:00 · Sab 9:00–13:00',
            'topbar.patientArea': 'Area pazienti',
            'topbar.langLabel': 'Lingua',
            'topbar.backPortfolio': 'Portfolio VP',

            /* Nav */
            'nav.services': 'Servizi',
            'nav.about': 'Chi Siamo',
            'nav.team': 'Team',
            'nav.pricing': 'Listino',
            'nav.reviews': 'Recensioni',
            'nav.faq': 'FAQ',
            'nav.ai': 'Assistente AI',
            'nav.contact': 'Contatti',
            'nav.callNow': 'Chiama Ora',
            'nav.skipTo': 'Salta al contenuto principale',
            'nav.brand.sub': 'Odontoiatria · dal 1998',
            'nav.openMenu': 'Apri menu',

            /* Hero */
            'hero.badge': 'Prima visita gratuita · Prenota subito',
            'hero.title.part1': 'Il tuo',
            'hero.title.accent': 'sorriso',
            'hero.title.part2': 'merita specialisti di fiducia.',
            'hero.lead': "Da oltre 25 anni ci prendiamo cura della salute dei tuoi denti con un'équipe di specialisti, tecnologie di ultima generazione e un percorso di cura trasparente. Pagamento rateale a tasso zero fino a 24 mesi.",
            'hero.cta.call': 'Chiama +39 095 000 00 00',
            'hero.cta.book': 'Prenota Online',
            'hero.aiCta': 'Preferisci scrivere? Parla ora con il nostro assistente AI',
            'hero.trust.years': 'Anni di<br>esperienza',
            'hero.trust.patients': 'Pazienti<br>trattati',
            'hero.trust.reviews': '342 recensioni<br>Google',
            'hero.float.security.title': 'Sicurezza',
            'hero.float.security.desc': 'Protocolli certificati ISO',
            'hero.float.warranty.title': 'Garanzia 5 anni',
            'hero.float.warranty.desc': 'Su impianti e protesi',

            /* AI Lane */
            'lane.badge': 'Assistente AI · Online',
            'lane.title': 'Il tuo assistente virtuale è qui',
            'lane.desc': "Chiedi info su costi, prenota una visita o parla di un'urgenza. Rispondiamo 24/7, anche in vocale.",
            'lane.hint': 'Clicca sull\'icona qui sotto',

            /* Trust bar */
            'trust.label': 'Partner tecnologici',

            /* Servizi */
            'services.eyebrow': 'I nostri servizi',
            'services.title': 'Un centro odontoiatrico completo',
            'services.lead': "Dalla prevenzione all'implantologia avanzata: tutti i trattamenti sotto un unico tetto, con specialisti dedicati per ogni ambito.",
            'services.more': 'Scopri di più',
            'services.igiene.title': 'Igiene e Prevenzione',
            'services.igiene.desc': 'Visite di controllo, ablazione tartaro e sigillature per proteggere il tuo sorriso ogni giorno.',
            'services.implant.title': 'Implantologia',
            'services.implant.desc': 'Impianti singoli, All-on-Four e chirurgia guidata computerizzata con garanzia 5 anni.',
            'services.ortho.title': 'Ortodonzia Invisibile',
            'services.ortho.desc': 'Provider Invisalign certificato per allineamenti dentali estetici e discreti.',
            'services.esthetic.title': 'Estetica Dentale',
            'services.esthetic.desc': 'Faccette in ceramica, sbiancamento professionale e ricostruzioni estetiche.',
            'services.pedo.title': 'Pedodonzia',
            'services.pedo.desc': 'Cure dedicate ai più piccoli, con un approccio ludico e senza paura del dentista.',
            'services.3d.title': 'Diagnostica 3D',
            'services.3d.desc': 'TAC Cone Beam, panoramica digitale e scansione intraorale per diagnosi millimetriche.',

            /* Call banner 1 */
            'call1.title': 'Non aspettare che il problema peggiori',
            'call1.desc': 'La prima visita è gratuita e senza impegno. Prenotala oggi: siamo disponibili tutti i giorni feriali.',

            /* Chi siamo */
            'about.eyebrow': 'Chi siamo',
            'about.title': 'Uno studio moderno, un approccio personale.',
            'about.p1': "Dal 1998 lo Studio Sorriso è un punto di riferimento a Catania per l'odontoiatria specialistica. Il nostro impegno è offrire cure di eccellenza in un ambiente accogliente, con tecnologie all'avanguardia e un percorso di cura trasparente.",
            'about.p2.prefix': 'Il nostro',
            'about.p2.strong': 'direttore sanitario',
            'about.p2.rest': ", Dr. Marco Rossi, guida un'équipe multidisciplinare di 8 specialisti che collaborano ogni giorno per prendersi cura della salute orale di adulti e bambini.",
            'about.stat.specialists': 'Specialisti in équipe',
            'about.stat.patients': 'Pazienti soddisfatti',
            'about.stat.success': 'Successo implantare',
            'about.visualBadge': 'Studio moderno',

            /* Team */
            'team.eyebrow': 'Il team',
            'team.title': 'I nostri specialisti',
            'team.lead': 'Ogni membro del nostro team è un professionista qualificato con specializzazioni universitarie e formazione internazionale continua.',
            'team.rossi.role': 'Direttore sanitario',
            'team.rossi.spec': 'Implantologia avanzata e chirurgia orale. Iscritto Albo Odontoiatri CT n. 1234.',
            'team.bianchi.role': 'Ortodonzia',
            'team.bianchi.spec': 'Ortodonzia intercettiva e Invisalign. Certified Diamond Provider.',
            'team.costa.role': 'Endodonzia',
            'team.costa.spec': 'Cure canalari con microscopio operatorio e ritrattamenti complessi.',
            'team.ferrara.role': 'Pedodonzia',
            'team.ferrara.spec': 'Odontoiatria infantile con approccio ludico e prevenzione precoce.',

            /* Gallery */
            'gallery.eyebrow': 'La nostra struttura',
            'gallery.title': 'Uno studio pensato per il tuo comfort',
            'gallery.lead': 'Ambienti moderni, sterilizzazione certificata e tecnologie di ultima generazione: tutto per rendere ogni visita serena e sicura.',
            'gallery.1.cap': 'Sala operativa',
            'gallery.2.cap': 'Tecnologia digitale',
            'gallery.3.cap': 'Accoglienza',
            'gallery.4.cap': 'Diagnostica 3D',
            'gallery.5.cap': 'Igiene e sterilizzazione',
            'gallery.6.cap': 'Il tuo sorriso',

            /* Listino */
            'pricing.eyebrow': 'Listino prestazioni',
            'pricing.title': 'Trasparenza sui costi',
            'pricing.lead': 'Nessuna sorpresa: consulta i prezzi di ogni trattamento. Le tariffe sono valide fino al 31/12/2026 e includono materiali e follow-up post-operatorio.',
            'pricing.col.service': 'Prestazione',
            'pricing.col.description': 'Descrizione',
            'pricing.col.price': 'Costo',
            'pricing.free': 'Gratuita',
            'pricing.cat1.title': 'Igiene, Prevenzione e Conservativa',
            'pricing.cat1.sub': 'Visite di controllo, pulizia dentale e cura della carie',
            'pricing.cat2.title': 'Chirurgia e Implantologia',
            'pricing.cat2.sub': 'Estrazioni, impianti singoli e riabilitazioni complete',
            'pricing.cat3.title': 'Ortodonzia',
            'pricing.cat3.sub': 'Apparecchi tradizionali e ortodonzia invisibile',
            'pricing.cat4.title': 'Protesi ed Estetica',
            'pricing.cat4.sub': 'Corone, ponti, faccette e riabilitazioni protesiche',
            'pricing.cta.title': 'Preventivo personalizzato senza impegno',
            'pricing.cta.desc': 'Ricevi in 24 ore un piano di cura dettagliato con opzioni di pagamento rateale.',
            'pricing.cta.btn': 'Chiama Ora',
            /* Services rows */
            'p.firstVisit.n': 'Prima visita e diagnosi',
            'p.firstVisit.d': 'Visita di controllo completa con piano di trattamento personalizzato.',
            'p.hygiene.n': 'Igiene professionale',
            'p.hygiene.d': 'Ablazione del tartaro con ultrasuoni e lucidatura.',
            'p.whitening.n': 'Sbiancamento professionale',
            'p.whitening.d': 'Trattamento in studio con gel a base di perossido.',
            'p.sealing.n': 'Sigillatura dei solchi',
            'p.sealing.d': 'Prevenzione della carie per pazienti pediatrici (per dente).',
            'p.filling.n': 'Otturazione in composito',
            'p.filling.d': 'Ricostruzione estetica in composito fotopolimerizzabile.',
            'p.endo.n': 'Devitalizzazione (endodonzia)',
            'p.endo.d': 'Cura canalare monoradicolata o pluriradicolata.',
            'p.extSimple.n': 'Estrazione semplice',
            'p.extSimple.d': 'Estrazione dentale non chirurgica.',
            'p.extWisdom.n': 'Estrazione dente del giudizio',
            'p.extWisdom.d': 'Estrazione chirurgica di ottavo incluso o semi-incluso.',
            'p.implant.n': 'Impianto singolo',
            'p.implant.d': 'Impianto in titanio con chirurgia guidata e corona provvisoria.',
            'p.crownImp.n': 'Corona su impianto',
            'p.crownImp.d': 'Corona definitiva in zirconia-ceramica.',
            'p.allOn4.n': 'All-on-Four (per arcata)',
            'p.allOn4.d': "Riabilitazione completa dell'arcata su 4 impianti.",
            'p.sinusLift.n': 'Rialzo del seno mascellare',
            'p.sinusLift.d': 'Grande rialzo per implantologia posteriore.',
            'p.orthoConsult.n': 'Consulenza ortodontica',
            'p.orthoConsult.d': 'Valutazione iniziale e studio del caso.',
            'p.mobile.n': 'Apparecchio mobile',
            'p.mobile.d': 'Trattamento intercettivo per pazienti in età evolutiva.',
            'p.fixed.n': 'Apparecchio fisso (per arcata)',
            'p.fixed.d': 'Ortodonzia tradizionale con brackets in metallo o ceramica.',
            'p.invisalign.n': 'Ortodonzia invisibile (Invisalign)',
            'p.invisalign.d': 'Allineatori trasparenti su misura, ciclo completo di trattamento.',
            'p.retainer.n': 'Contenzione post-trattamento',
            'p.retainer.d': 'Splint o retainer fisso/rimovibile.',
            'p.crown.n': 'Corona in zirconia-ceramica',
            'p.crown.d': 'Corona estetica su dente naturale.',
            'p.bridge.n': 'Ponte in zirconia (3 elementi)',
            'p.bridge.d': 'Riabilitazione fissa per sostituzione di un elemento mancante.',
            'p.veneer.n': 'Faccetta dentale',
            'p.veneer.d': 'Faccetta in ceramica ultra-sottile per estetica del sorriso.',
            'p.denture.n': 'Protesi mobile totale (per arcata)',
            'p.denture.d': 'Dentiera completa in resina con denti in ceramica.',
            'p.partialD.n': 'Protesi scheletrata',
            'p.partialD.d': 'Protesi parziale con struttura in lega e ganci di ritenzione.',
            'p.bite.n': 'Bite notturno',
            'p.bite.d': 'Splint occlusale per bruxismo e disordini temporo-mandibolari.',

            /* AI Mid banner */
            'aiMid.title': 'Non trovi la prestazione che cerchi?',
            'aiMid.desc': 'Chiedi direttamente al nostro assistente AI: risponde su costi, disponibilità e ti aiuta a prenotare in tempo reale, 24 ore su 24.',
            'aiMid.btn': "Parla con l'AI",

            /* Testimonials */
            'test.eyebrow': 'Le voci dei nostri pazienti',
            'test.title': '4.9 stelle su 342 recensioni Google',
            'test.lead': 'La fiducia dei nostri pazienti è la nostra certificazione più importante.',
            'test.1.text': 'Ho fatto un impianto e sono rimasto senza parole. Zero dolore, staff gentilissimo e il Dr. Rossi ha spiegato ogni passaggio. Consigliatissimo.',
            'test.1.meta': 'Impianto singolo · Mar 2026',
            'test.2.text': "Ho scelto Invisalign per non sentirmi in imbarazzo al lavoro. La Dr.ssa Bianchi è stata bravissima, in 14 mesi denti perfetti. Ne è valsa la pena.",
            'test.2.meta': 'Invisalign · Gen 2026',
            'test.3.text': 'Porto mia figlia di 6 anni. La Dr.ssa Ferrara è magica con i bambini: giochi, spiegazioni semplici, mai una lacrima. Grazie di cuore!',
            'test.3.meta': 'Pedodonzia · Feb 2026',

            /* FAQ */
            'faq.eyebrow': 'Domande frequenti',
            'faq.title': 'Le risposte che cerchi',
            'faq.1.q': 'La prima visita è veramente gratuita?',
            'faq.1.a': 'Sì. La prima visita comprende un check-up completo, panoramica digitale se necessaria e un piano di trattamento personalizzato. Nessun impegno di procedere con le cure.',
            'faq.2.q': 'È possibile pagare a rate?',
            'faq.2.a': 'Certo. Offriamo <strong>finanziamento a tasso zero fino a 24 mesi</strong> tramite i nostri partner finanziari. La richiesta si valuta in 5 minuti direttamente in studio.',
            'faq.3.q': 'Che garanzie offrite su impianti e protesi?',
            'faq.3.a': "Tutti gli impianti hanno una <strong>garanzia di 5 anni</strong> su rottura o fallimento dell'osteointegrazione. Le protesi definitive sono coperte da garanzia di 2 anni sui materiali e sulla manifattura.",
            'faq.4.q': 'Trattate anche i bambini?',
            'faq.4.a': 'Sì, abbiamo un reparto di pedodonzia dedicato con la Dr.ssa Sofia Ferrara, specialista in odontoiatria infantile. Utilizziamo un approccio ludico per evitare paure e traumi ai piccoli pazienti.',
            'faq.5.q': 'Fate anche urgenze e visite fuori orario?',
            'faq.5.a': 'Per le urgenze contattare il numero <strong>+39 095 000 00 00</strong>. Garantiamo un appuntamento entro 24 ore per emergenze dolorose o traumi dentali.',
            'faq.6.q': 'Come raggiungervi con i mezzi pubblici?',
            'faq.6.a': 'Siamo in Via Etnea 123, a 5 minuti a piedi dalla stazione metropolitana di Piazza Stesicoro. Autobus AMT linee 429, 449 e BRT1 fermano a 100 metri. Parcheggio convenzionato a 50 metri.',

            /* Call banner 2 */
            'call2.title': 'Pronto a iniziare?',
            'call2.desc': 'Chiamaci ora e prenota la tua prima visita gratuita. Ti risponde una persona vera in meno di 20 secondi.',

            /* Contatti */
            'contact.eyebrow': 'Contattaci',
            'contact.title': 'Prenota la tua visita',
            'contact.lead': 'Compila il modulo o chiamaci direttamente. Ti ricontattiamo entro 2 ore lavorative.',
            'contact.where': 'Dove siamo',
            'contact.addressL': 'Indirizzo',
            'contact.address': 'Via Etnea 123, 95124 Catania (CT)',
            'contact.phoneL': 'Telefono',
            'contact.emailL': 'Email',
            'contact.hoursL': 'Orari di apertura',
            'contact.hoursV': 'Lun–Ven 9:00–19:00<br>Sabato 9:00–13:00',
            'contact.mapTitle': 'Via Etnea 123, Catania',
            'contact.mapDesc': 'A 5 minuti dalla metro Stesicoro · Parcheggio convenzionato a 50 m',
            'contact.form.title': 'Richiedi appuntamento',
            'contact.form.first': 'Nome',
            'contact.form.last': 'Cognome',
            'contact.form.phone': 'Telefono',
            'contact.form.email': 'Email',
            'contact.form.serviceL': 'Prestazione di interesse',
            'contact.form.messageL': 'Messaggio (opzionale)',
            'contact.form.messageP': 'Raccontaci di cosa hai bisogno...',
            'contact.form.gdpr': 'Ho letto e accetto la <a href="#">privacy policy</a> e autorizzo il trattamento dei miei dati personali ai sensi del GDPR 679/2016.',
            'contact.form.submit': 'Invia richiesta',
            'contact.form.reply': 'Risposta garantita entro 2 ore lavorative',
            'contact.form.demoAlert': 'Demo: nessuna richiesta è stata inviata realmente.',
            'contact.form.opt.firstVisit': 'Prima visita gratuita',
            'contact.form.opt.hygiene': 'Igiene professionale',
            'contact.form.opt.implant': 'Implantologia',
            'contact.form.opt.invisalign': 'Ortodonzia invisibile',
            'contact.form.opt.whitening': 'Sbiancamento',
            'contact.form.opt.other': 'Altro (specificare nel messaggio)',

            /* AI Explain */
            'ai.eyebrow': 'Assistente AI · sempre attivo',
            'ai.title': 'La segreteria che non chiude mai',
            'ai.lead': 'Ricevi risposte immediate su costi, servizi e appuntamenti anche fuori orario — senza attese al telefono, senza compilare form.',
            'ai.chat.name': 'Sofia · Assistente AI',
            'ai.chat.status': 'Online ora',
            'ai.chat.1': "Ciao! Sono Sofia, l'assistente dello Studio Sorriso. Come posso aiutarti?",
            'ai.chat.2': 'Quanto costa un impianto singolo?',
            'ai.chat.3': "L'impianto singolo costa <strong>€ 1.100</strong> e include chirurgia guidata e corona provvisoria. La prima visita è gratuita: vuoi che ti prenoti un appuntamento?",
            'ai.side.eyebrow': 'Come funziona',
            'ai.side.title': 'Chiedi. Ascolta. Prenota.',
            'ai.side.lead': 'Il nostro assistente AI conosce tutti i nostri servizi, il listino aggiornato e la disponibilità degli specialisti. Puoi parlargli a voce o scrivere.',
            'ai.feat.1': '<strong>Risposte immediate</strong> su costi e prestazioni, senza attese al telefono.',
            'ai.feat.2': '<strong>Disponibile 24/7</strong> — anche di notte, nei weekend e nei festivi.',
            'ai.feat.3': "<strong>Prenotazioni assistite</strong>: ti aiuta a scegliere lo specialista e l'orario giusto.",
            'ai.feat.4': '<strong>Privacy garantita</strong>: nessun dato salvato senza il tuo consenso esplicito.',
            'ai.cta.title': 'Inizia la conversazione',
            'ai.cta.desc': "Clicca qui o sull'icona in basso a destra ↓",

            /* Footer */
            'footer.tagline': 'Odontoiatria specialistica',
            'footer.desc': 'Da oltre 25 anni ci prendiamo cura del sorriso delle famiglie di Catania e provincia con professionalità e passione.',
            'footer.services': 'Servizi',
            'footer.links': 'Link utili',
            'footer.contacts': 'Contatti',
            'footer.legal': 'Studio Dentistico Sorriso S.r.l. · P.IVA 01234567890 · REA CT-123456<br>Direttore Sanitario: Dr. Marco Rossi · Iscr. Albo Odontoiatri CT n. 1234<br>Aut. San. n. 456/2005 - Comune di Catania · © 2026 Tutti i diritti riservati',
            'footer.privacy': 'Privacy Policy',
            'footer.cookie': 'Cookie Policy',
            'footer.notes': 'Note legali',
            'footer.rates': 'Trasparenza tariffaria',

            /* Cookie */
            'cookie.title': '🍪 Utilizziamo i cookie',
            'cookie.desc': 'Utilizziamo cookie tecnici e di analytics per migliorare la tua esperienza. Puoi accettare, rifiutare o personalizzare la tua scelta.',
            'cookie.accept': 'Accetta tutti',
            'cookie.essential': 'Solo essenziali',

            'mobile.call': 'Chiama ora'
        },

        en: {
            /* Meta */
            'meta.title': 'Sorriso Dental Clinic · Dentistry in Catania',
            'meta.description': 'Sorriso Dental Clinic — Specialist dentistry in Catania. Free first visit, interest-free installments, team of specialists. Book now: +39 095 000 00 00.',
            'meta.og.locale': 'en_US',

            /* Topbar */
            'topbar.hours': 'Mon–Fri 9:00–19:00 · Sat 9:00–13:00',
            'topbar.patientArea': 'Patient area',
            'topbar.langLabel': 'Language',
            'topbar.backPortfolio': 'Back to portfolio',

            /* Nav */
            'nav.services': 'Services',
            'nav.about': 'About',
            'nav.team': 'Team',
            'nav.pricing': 'Pricing',
            'nav.reviews': 'Reviews',
            'nav.faq': 'FAQ',
            'nav.ai': 'AI Assistant',
            'nav.contact': 'Contact',
            'nav.callNow': 'Call Now',
            'nav.skipTo': 'Skip to main content',
            'nav.brand.sub': 'Dentistry · since 1998',
            'nav.openMenu': 'Open menu',

            /* Hero */
            'hero.badge': 'Free first visit · Book today',
            'hero.title.part1': 'Your',
            'hero.title.accent': 'smile',
            'hero.title.part2': 'deserves specialists you can trust.',
            'hero.lead': "For over 25 years we have cared for the health of your teeth with a team of specialists, state-of-the-art technology and a transparent care path. Interest-free installments up to 24 months.",
            'hero.cta.call': 'Call +39 095 000 00 00',
            'hero.cta.book': 'Book Online',
            'hero.aiCta': 'Prefer to type? Chat now with our AI assistant',
            'hero.trust.years': 'Years of<br>experience',
            'hero.trust.patients': 'Patients<br>treated',
            'hero.trust.reviews': '342 Google<br>reviews',
            'hero.float.security.title': 'Safety',
            'hero.float.security.desc': 'ISO certified protocols',
            'hero.float.warranty.title': '5-year warranty',
            'hero.float.warranty.desc': 'On implants and prosthetics',

            /* AI Lane */
            'lane.badge': 'AI Assistant · Online',
            'lane.title': 'Your virtual assistant is here',
            'lane.desc': "Ask about prices, book a visit or talk about an emergency. We answer 24/7, also by voice.",
            'lane.hint': 'Click the icon below',

            /* Trust bar */
            'trust.label': 'Technology partners',

            /* Servizi */
            'services.eyebrow': 'Our services',
            'services.title': 'A complete dental center',
            'services.lead': "From prevention to advanced implantology: every treatment under one roof, with dedicated specialists for each field.",
            'services.more': 'Learn more',
            'services.igiene.title': 'Hygiene & Prevention',
            'services.igiene.desc': 'Check-ups, scaling and sealings to protect your smile every day.',
            'services.implant.title': 'Implantology',
            'services.implant.desc': 'Single implants, All-on-Four and computer-guided surgery with 5-year warranty.',
            'services.ortho.title': 'Invisible Orthodontics',
            'services.ortho.desc': 'Certified Invisalign provider for aesthetic, discreet alignments.',
            'services.esthetic.title': 'Cosmetic Dentistry',
            'services.esthetic.desc': 'Ceramic veneers, professional whitening and aesthetic reconstructions.',
            'services.pedo.title': 'Pediatric Dentistry',
            'services.pedo.desc': 'Care for younger patients with a playful, fear-free approach.',
            'services.3d.title': '3D Diagnostics',
            'services.3d.desc': 'Cone Beam CT, digital panoramic and intraoral scanning for millimetric accuracy.',

            /* Call banner 1 */
            'call1.title': "Don't wait for the problem to get worse",
            'call1.desc': 'The first visit is free and with no obligation. Book it today: we are available every weekday.',

            /* Chi siamo */
            'about.eyebrow': 'About us',
            'about.title': 'A modern practice, a personal approach.',
            'about.p1': "Since 1998 Studio Sorriso has been a reference point in Catania for specialist dentistry. Our commitment is to deliver excellent care in a welcoming environment, with cutting-edge technology and a transparent care path.",
            'about.p2.prefix': 'Our',
            'about.p2.strong': 'medical director',
            'about.p2.rest': ", Dr. Marco Rossi, leads a multidisciplinary team of 8 specialists working together every day to care for the oral health of adults and children.",
            'about.stat.specialists': 'Specialists in team',
            'about.stat.patients': 'Happy patients',
            'about.stat.success': 'Implant success rate',
            'about.visualBadge': 'Modern facility',

            /* Team */
            'team.eyebrow': 'The team',
            'team.title': 'Our specialists',
            'team.lead': 'Each member of our team is a qualified professional with university-level specializations and continuous international training.',
            'team.rossi.role': 'Medical director',
            'team.rossi.spec': 'Advanced implantology and oral surgery. Registered Dental Board of Catania no. 1234.',
            'team.bianchi.role': 'Orthodontics',
            'team.bianchi.spec': 'Interceptive orthodontics and Invisalign. Certified Diamond Provider.',
            'team.costa.role': 'Endodontics',
            'team.costa.spec': 'Root canal treatments with surgical microscope and complex retreatments.',
            'team.ferrara.role': 'Pediatric Dentistry',
            'team.ferrara.spec': 'Child dentistry with a playful approach and early prevention.',

            /* Gallery */
            'gallery.eyebrow': 'Our practice',
            'gallery.title': 'A clinic designed for your comfort',
            'gallery.lead': 'Modern spaces, certified sterilisation and state-of-the-art technology: everything to make every visit calm and safe.',
            'gallery.1.cap': 'Treatment room',
            'gallery.2.cap': 'Digital technology',
            'gallery.3.cap': 'Reception',
            'gallery.4.cap': '3D diagnostics',
            'gallery.5.cap': 'Hygiene & sterilisation',
            'gallery.6.cap': 'Your smile',

            /* Listino */
            'pricing.eyebrow': 'Price list',
            'pricing.title': 'Transparent pricing',
            'pricing.lead': 'No surprises: check the price of every treatment. Rates are valid until 31/12/2026 and include materials and post-op follow-up.',
            'pricing.col.service': 'Service',
            'pricing.col.description': 'Description',
            'pricing.col.price': 'Price',
            'pricing.free': 'Free',
            'pricing.cat1.title': 'Hygiene, Prevention & Restorative',
            'pricing.cat1.sub': 'Check-ups, dental cleaning and cavity care',
            'pricing.cat2.title': 'Oral Surgery & Implantology',
            'pricing.cat2.sub': 'Extractions, single implants and full-arch rehabilitations',
            'pricing.cat3.title': 'Orthodontics',
            'pricing.cat3.sub': 'Traditional braces and invisible aligners',
            'pricing.cat4.title': 'Prosthetics & Aesthetics',
            'pricing.cat4.sub': 'Crowns, bridges, veneers and prosthetic rehabilitations',
            'pricing.cta.title': 'Custom quote with no commitment',
            'pricing.cta.desc': 'Receive a detailed care plan with installment options within 24 hours.',
            'pricing.cta.btn': 'Call Now',
            /* Services rows */
            'p.firstVisit.n': 'First visit and diagnosis',
            'p.firstVisit.d': 'Comprehensive check-up with a personalized treatment plan.',
            'p.hygiene.n': 'Professional hygiene',
            'p.hygiene.d': 'Ultrasonic scaling and polishing.',
            'p.whitening.n': 'Professional whitening',
            'p.whitening.d': 'In-office treatment with peroxide gel.',
            'p.sealing.n': 'Pit and fissure sealing',
            'p.sealing.d': 'Cavity prevention for pediatric patients (per tooth).',
            'p.filling.n': 'Composite filling',
            'p.filling.d': 'Aesthetic restoration in light-cured composite.',
            'p.endo.n': 'Root canal (endodontics)',
            'p.endo.d': 'Single or multi-rooted root canal treatment.',
            'p.extSimple.n': 'Simple extraction',
            'p.extSimple.d': 'Non-surgical tooth extraction.',
            'p.extWisdom.n': 'Wisdom tooth extraction',
            'p.extWisdom.d': 'Surgical extraction of impacted or partially impacted third molar.',
            'p.implant.n': 'Single implant',
            'p.implant.d': 'Titanium implant with guided surgery and temporary crown.',
            'p.crownImp.n': 'Crown on implant',
            'p.crownImp.d': 'Definitive crown in zirconia-ceramic.',
            'p.allOn4.n': 'All-on-Four (per arch)',
            'p.allOn4.d': "Full-arch rehabilitation on 4 implants.",
            'p.sinusLift.n': 'Maxillary sinus lift',
            'p.sinusLift.d': 'Major sinus lift for posterior implantology.',
            'p.orthoConsult.n': 'Orthodontic consultation',
            'p.orthoConsult.d': 'Initial evaluation and case study.',
            'p.mobile.n': 'Removable appliance',
            'p.mobile.d': 'Interceptive treatment for developing patients.',
            'p.fixed.n': 'Fixed braces (per arch)',
            'p.fixed.d': 'Traditional orthodontics with metal or ceramic brackets.',
            'p.invisalign.n': 'Invisible orthodontics (Invisalign)',
            'p.invisalign.d': 'Custom clear aligners, full treatment cycle.',
            'p.retainer.n': 'Post-treatment retention',
            'p.retainer.d': 'Fixed or removable retainer/splint.',
            'p.crown.n': 'Zirconia-ceramic crown',
            'p.crown.d': 'Aesthetic crown on natural tooth.',
            'p.bridge.n': 'Zirconia bridge (3 elements)',
            'p.bridge.d': 'Fixed rehabilitation to replace one missing element.',
            'p.veneer.n': 'Dental veneer',
            'p.veneer.d': 'Ultra-thin ceramic veneer for smile aesthetics.',
            'p.denture.n': 'Full removable denture (per arch)',
            'p.denture.d': 'Complete denture in resin with ceramic teeth.',
            'p.partialD.n': 'Skeletal partial denture',
            'p.partialD.d': 'Partial denture with alloy frame and retention clasps.',
            'p.bite.n': 'Night guard',
            'p.bite.d': 'Occlusal splint for bruxism and TMJ disorders.',

            /* AI Mid banner */
            'aiMid.title': "Can't find the treatment you need?",
            'aiMid.desc': 'Ask our AI assistant directly: it answers about costs, availability and helps you book in real time, 24 hours a day.',
            'aiMid.btn': 'Chat with the AI',

            /* Testimonials */
            'test.eyebrow': 'Patient voices',
            'test.title': '4.9 stars on 342 Google reviews',
            'test.lead': "Our patients' trust is our most important certification.",
            'test.1.text': 'I had an implant and I was speechless. Zero pain, super friendly staff and Dr. Rossi walked me through every step. Highly recommended.',
            'test.1.meta': 'Single implant · Mar 2026',
            'test.2.text': "I chose Invisalign to avoid feeling awkward at work. Dr. Bianchi was amazing, perfect teeth in 14 months. Totally worth it.",
            'test.2.meta': 'Invisalign · Jan 2026',
            'test.3.text': 'I bring my 6-year-old daughter. Dr. Ferrara is magical with kids: games, simple explanations, never a tear. Thank you so much!',
            'test.3.meta': 'Pediatric · Feb 2026',

            /* FAQ */
            'faq.eyebrow': 'Frequently asked questions',
            'faq.title': 'The answers you are looking for',
            'faq.1.q': 'Is the first visit really free?',
            'faq.1.a': 'Yes. The first visit includes a complete check-up, digital panoramic if needed, and a personalized treatment plan. No obligation to proceed with the treatment.',
            'faq.2.q': 'Can I pay in installments?',
            'faq.2.a': 'Absolutely. We offer <strong>interest-free financing up to 24 months</strong> through our financial partners. Approval takes 5 minutes right at the practice.',
            'faq.3.q': 'What warranty do you offer on implants and prosthetics?',
            'faq.3.a': "All implants come with a <strong>5-year warranty</strong> against fracture or osseointegration failure. Definitive prosthetics have a 2-year warranty on materials and workmanship.",
            'faq.4.q': 'Do you also treat children?',
            'faq.4.a': 'Yes, we have a dedicated pediatric department led by Dr. Sofia Ferrara, a specialist in pediatric dentistry. We use a playful approach to avoid fears and traumas in our youngest patients.',
            'faq.5.q': 'Do you handle emergencies or after-hours visits?',
            'faq.5.a': 'For emergencies please call <strong>+39 095 000 00 00</strong>. We guarantee an appointment within 24 hours for painful emergencies or dental trauma.',
            'faq.6.q': 'How do I reach you by public transport?',
            'faq.6.a': 'We are in Via Etnea 123, 5 minutes on foot from the Piazza Stesicoro metro station. AMT bus lines 429, 449 and BRT1 stop 100 metres away. Partner parking at 50 metres.',

            /* Call banner 2 */
            'call2.title': 'Ready to get started?',
            'call2.desc': 'Call us now and book your free first visit. A real person answers in less than 20 seconds.',

            /* Contatti */
            'contact.eyebrow': 'Contact us',
            'contact.title': 'Book your visit',
            'contact.lead': 'Fill in the form or call us directly. We will get back to you within 2 working hours.',
            'contact.where': 'Where we are',
            'contact.addressL': 'Address',
            'contact.address': 'Via Etnea 123, 95124 Catania (CT), Italy',
            'contact.phoneL': 'Phone',
            'contact.emailL': 'Email',
            'contact.hoursL': 'Opening hours',
            'contact.hoursV': 'Mon–Fri 9:00–19:00<br>Saturday 9:00–13:00',
            'contact.mapTitle': 'Via Etnea 123, Catania',
            'contact.mapDesc': '5 min from Stesicoro metro · Partner parking 50 m away',
            'contact.form.title': 'Request an appointment',
            'contact.form.first': 'First name',
            'contact.form.last': 'Last name',
            'contact.form.phone': 'Phone',
            'contact.form.email': 'Email',
            'contact.form.serviceL': 'Service of interest',
            'contact.form.messageL': 'Message (optional)',
            'contact.form.messageP': 'Tell us what you need...',
            'contact.form.gdpr': 'I have read and accept the <a href="#">privacy policy</a> and authorize the processing of my personal data pursuant to GDPR 679/2016.',
            'contact.form.submit': 'Send request',
            'contact.form.reply': 'Guaranteed reply within 2 working hours',
            'contact.form.demoAlert': 'Demo: no request was actually sent.',
            'contact.form.opt.firstVisit': 'Free first visit',
            'contact.form.opt.hygiene': 'Professional hygiene',
            'contact.form.opt.implant': 'Implantology',
            'contact.form.opt.invisalign': 'Invisible orthodontics',
            'contact.form.opt.whitening': 'Whitening',
            'contact.form.opt.other': 'Other (specify in message)',

            /* AI Explain */
            'ai.eyebrow': 'AI Assistant · always on',
            'ai.title': 'The receptionist that never closes',
            'ai.lead': 'Instant answers about prices, services and appointments — even after hours. No phone queues, no forms to fill in.',
            'ai.chat.name': 'Sofia · AI Assistant',
            'ai.chat.status': 'Online now',
            'ai.chat.1': "Hi! I'm Sofia, Studio Sorriso's assistant. How can I help you?",
            'ai.chat.2': 'How much is a single implant?',
            'ai.chat.3': "A single implant is <strong>€1,100</strong> and includes guided surgery and a temporary crown. The first visit is free — would you like me to book you an appointment?",
            'ai.side.eyebrow': 'How it works',
            'ai.side.title': 'Ask. Listen. Book.',
            'ai.side.lead': 'Our AI assistant knows all our services, the up-to-date price list and specialist availability. You can talk to it by voice or type.',
            'ai.feat.1': '<strong>Instant answers</strong> on prices and services, no phone queues.',
            'ai.feat.2': '<strong>Available 24/7</strong> — at night, on weekends and on holidays too.',
            'ai.feat.3': "<strong>Assisted booking</strong>: it helps you pick the right specialist and time slot.",
            'ai.feat.4': '<strong>Privacy guaranteed</strong>: no data stored without your explicit consent.',
            'ai.cta.title': 'Start the conversation',
            'ai.cta.desc': 'Click here or on the icon at the bottom-right ↓',

            /* Footer */
            'footer.tagline': 'Specialist dentistry',
            'footer.desc': 'For over 25 years we have cared for the smiles of families in Catania and its province with professionalism and passion.',
            'footer.services': 'Services',
            'footer.links': 'Useful links',
            'footer.contacts': 'Contact',
            'footer.legal': 'Studio Dentistico Sorriso S.r.l. · VAT 01234567890 · REA CT-123456<br>Medical Director: Dr. Marco Rossi · Dental Board of Catania no. 1234<br>Health Authorization no. 456/2005 - Municipality of Catania · © 2026 All rights reserved',
            'footer.privacy': 'Privacy Policy',
            'footer.cookie': 'Cookie Policy',
            'footer.notes': 'Legal notes',
            'footer.rates': 'Price transparency',

            /* Cookie */
            'cookie.title': '🍪 We use cookies',
            'cookie.desc': 'We use technical and analytics cookies to improve your experience. You can accept, refuse or customize your choice.',
            'cookie.accept': 'Accept all',
            'cookie.essential': 'Essential only',

            'mobile.call': 'Call now'
        }
    };

    function detectLang() {
        try {
            const params = new URLSearchParams(window.location.search);
            const q = params.get('lang');
            if (q && SUPPORTED.includes(q)) return q;
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED.includes(stored)) return stored;
            const nav = (navigator.language || '').slice(0, 2).toLowerCase();
            if (SUPPORTED.includes(nav)) return nav;
        } catch (e) { /* localStorage may be blocked */ }
        return DEFAULT_LANG;
    }

    function translate(lang) {
        const table = dict[lang] || dict[DEFAULT_LANG];

        // Text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = table[key];
            if (val != null) el.innerHTML = val;
        });

        // Attribute translations: data-i18n-attr="attr:key;attr2:key2"
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s && s.trim());
                if (!attr || !key) return;
                const val = table[key];
                if (val != null) el.setAttribute(attr, val.replace(/<[^>]*>/g, ''));
            });
        });

        // Document-level updates
        document.documentElement.setAttribute('lang', lang);
        const title = table['meta.title'];
        if (title) document.title = title;
        const md = document.querySelector('meta[name="description"]');
        if (md && table['meta.description']) md.setAttribute('content', table['meta.description']);
        const ogl = document.querySelector('meta[property="og:locale"]');
        if (ogl && table['meta.og.locale']) ogl.setAttribute('content', table['meta.og.locale']);

        // Update lang-switcher active state
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang-btn') === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    window.__setLang = function (lang) {
        if (!SUPPORTED.includes(lang)) return;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
        // Reflect in URL for share/SEO without full reload
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);
        } catch (e) { /* ignore */ }
        translate(lang);
    };

    window.__getLang = function () {
        return document.documentElement.getAttribute('lang') || DEFAULT_LANG;
    };

    document.addEventListener('DOMContentLoaded', () => {
        translate(detectLang());
    });
})();
