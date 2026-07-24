/* =============================================================
   Barberia Etna — i18n engine
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
    const STORAGE_KEY = 'barberiaetna.lang';

    const dict = {
        it: {
            /* Meta */
            'meta.title': 'Barberia Etna · Barbershop a Catania',
            'meta.description': 'Barberia Etna — Barbershop a Catania dal 2015. Taglio, barba, rasatura tradizionale con panno caldo e pacchetti sposo. Prenota ora: +39 095 222 33 44.',
            'meta.og.locale': 'it_IT',

            /* Topbar */
            'topbar.hours': 'Mar–Sab 9:00–19:30 · Dom–Lun chiuso',
            'topbar.patientArea': 'Prenota online',
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
            'nav.callNow': 'Prenota Ora',
            'nav.skipTo': 'Salta al contenuto principale',
            'nav.brand.sub': 'Barbershop · dal 2015',
            'nav.openMenu': 'Apri menu',

            /* Hero */
            'hero.badge': 'Walk-in benvenuti · Prenota subito',
            'hero.title.part1': 'Il tuo',
            'hero.title.accent': 'stile',
            'hero.title.part2': 'nelle mani di veri barbieri.',
            'hero.lead': "Dal 2015 tagliamo, rifiniamo e curiamo la barba nel cuore di Catania. Rasatura tradizionale con panno caldo, prodotti premium e quell'atmosfera vintage da vera bottega. Entra da estraneo, esci come un signore.",
            'hero.cta.call': 'Chiama +39 095 222 33 44',
            'hero.cta.book': 'Prenota Online',
            'hero.aiCta': 'Preferisci scrivere? Parla ora con il nostro assistente AI',
            'hero.trust.years': 'Anni di<br>mestiere',
            'hero.trust.patients': 'Clienti<br>fidelizzati',
            'hero.trust.reviews': '268 recensioni<br>Google',
            'hero.float.security.title': 'Igiene garantita',
            'hero.float.security.desc': 'Lame monouso e sterilizzazione',
            'hero.float.warranty.title': 'Rifinitura gratis',
            'hero.float.warranty.desc': 'Ritocco contorni entro 7 giorni',

            /* AI Lane */
            'lane.badge': 'Assistente AI · Online',
            'lane.title': 'Il tuo assistente virtuale è qui',
            'lane.desc': "Chiedi info su prezzi, prenota un taglio o un pacchetto barba. Rispondiamo 24/7, anche in vocale.",
            'lane.hint': 'Clicca sull\'icona qui sotto',

            /* Trust bar */
            'trust.label': 'Prodotti che usiamo',

            /* Servizi */
            'services.eyebrow': 'I nostri servizi',
            'services.title': 'Taglio, barba e molto di più',
            'services.lead': "Dal taglio classico alla rasatura con rasoio a mano libera: ogni servizio è pensato per farti sentire al top, con la cura artigianale di una bottega di quartiere.",
            'services.more': 'Scopri di più',
            'services.igiene.title': 'Taglio Uomo',
            'services.igiene.desc': 'Taglio su misura con forbici e macchinetta, shampoo e styling finale con prodotti professionali.',
            'services.implant.title': 'Barba & Rifinitura',
            'services.implant.desc': 'Regolazione, modellatura e contorni netti per una barba curata in ogni dettaglio.',
            'services.ortho.title': 'Rasatura Tradizionale',
            'services.ortho.desc': 'Rasoio a mano libera, panno caldo e olio pre-barba: la vera esperienza da barbiere di una volta.',
            'services.esthetic.title': 'Taglio + Barba',
            'services.esthetic.desc': 'Il pacchetto completo: taglio su misura e barba modellata, il look total che fa la differenza.',
            'services.pedo.title': 'Taglio Bambino',
            'services.pedo.desc': 'Un primo taglio senza stress, con pazienza e un approccio amichevole per i più piccoli.',
            'services.3d.title': 'Colore & Trattamenti',
            'services.3d.desc': 'Colore, colpi di sole, trattamenti anticaduta e cheratina per capelli e barba in forma.',

            /* Call banner 1 */
            'call1.title': 'Niente più code al sabato',
            'call1.desc': 'Prenota il tuo posto in poltrona e salta la fila. Accettiamo anche walk-in negli orari di apertura.',

            /* Chi siamo */
            'about.eyebrow': 'Chi siamo',
            'about.title': 'Una bottega vintage, un mestiere autentico.',
            'about.p1': "Dal 2015 Barberia Etna è il punto di riferimento a Catania per chi cerca un taglio fatto come si deve. Poltrone in pelle, rasoi a mano libera e quell'atmosfera da barbiere di una volta, con la qualità dei prodotti di oggi.",
            'about.p2.prefix': 'Il nostro',
            'about.p2.strong': 'maestro barbiere',
            'about.p2.rest': ", Salvo Rizzo, guida un team di 4 professionisti che ogni giorno si prende cura del look di uomini di tutte le età, dal taglio classico alle tendenze più attuali.",
            'about.stat.specialists': 'Barbieri in bottega',
            'about.stat.patients': 'Clienti fidelizzati',
            'about.stat.success': 'Recensioni a 5 stelle',
            'about.visualBadge': 'Bottega dal 2015',

            /* Team */
            'team.eyebrow': 'Il team',
            'team.title': 'I nostri barbieri',
            'team.lead': 'Ogni membro del team è un professionista con anni di esperienza tra forbici, rasoio e macchinetta, in continuo aggiornamento sulle ultime tendenze.',
            'team.rossi.role': 'Maestro barbiere · Titolare',
            'team.rossi.spec': 'Rasatura tradizionale e tagli classici. Oltre 15 anni di mestiere, fondatore della bottega nel 2015.',
            'team.bianchi.role': 'Barbiere',
            'team.bianchi.spec': 'Specialista di fade e tagli moderni. Contorni al rasoio e styling di precisione.',
            'team.costa.role': 'Barbiere junior',
            'team.costa.spec': 'Tagli uomo e bambino, rifiniture barba. Sempre aggiornato sulle tendenze urban.',
            'team.ferrara.role': 'Hair stylist',
            'team.ferrara.spec': 'Colore, colpi di sole e trattamenti per capelli e barba. Cura del dettaglio e consulenza look.',

            /* Gallery */
            'gallery.eyebrow': 'Il nostro lavoro',
            'gallery.title': 'Tagli che parlano da soli',
            'gallery.lead': 'Ogni testa è un pezzo unico. Dai un\'occhiata al lavoro che esce ogni giorno dalla nostra bottega.',
            'gallery.1.cap': 'Fade & contorni',
            'gallery.2.cap': 'Rasatura tradizionale',
            'gallery.3.cap': 'Barba modellata',
            'gallery.4.cap': 'Taglio classico',
            'gallery.5.cap': 'La bottega',
            'gallery.6.cap': 'Styling di precisione',

            /* Listino */
            'pricing.eyebrow': 'Listino servizi',
            'pricing.title': 'Prezzi chiari, nessuna sorpresa',
            'pricing.lead': 'Consulta il prezzo di ogni servizio. Le tariffe sono valide fino al 31/12/2026 e includono shampoo e styling finale dove previsto.',
            'pricing.col.service': 'Servizio',
            'pricing.col.description': 'Descrizione',
            'pricing.col.price': 'Prezzo',
            'pricing.free': 'Omaggio',
            'pricing.cat1.title': 'Capelli',
            'pricing.cat1.sub': 'Taglio uomo, bambino, styling e rasatura a zero',
            'pricing.cat2.title': 'Barba',
            'pricing.cat2.sub': 'Regolazione, rasatura tradizionale e modellatura',
            'pricing.cat3.title': 'Trattamenti',
            'pricing.cat3.sub': 'Shampoo trattanti, maschere e cura del cuoio capelluto',
            'pricing.cat4.title': 'Extra & Colore',
            'pricing.cat4.sub': 'Colore, colpi di sole, cheratina e pacchetto sposo',
            'pricing.cta.title': 'Non sai quale servizio scegliere?',
            'pricing.cta.desc': 'La consulenza look in poltrona è gratuita: passa a trovarci o chiama, ti consigliamo il taglio giusto per te.',
            'pricing.cta.btn': 'Prenota Ora',
            /* Services rows — Cat 1 Capelli */
            'p.firstVisit.n': 'Consulenza look',
            'p.firstVisit.d': 'Valutazione di viso e capelli con consiglio sul taglio e sullo stile più adatti.',
            'p.hygiene.n': 'Taglio uomo',
            'p.hygiene.d': 'Taglio su misura con forbici e macchinetta, rifinitura contorni e styling.',
            'p.whitening.n': 'Taglio + shampoo',
            'p.whitening.d': 'Taglio completo con shampoo lavaggio e piega finale con prodotti premium.',
            'p.sealing.n': 'Taglio bambino (fino a 12 anni)',
            'p.sealing.d': 'Taglio dedicato ai più piccoli, con pazienza e un approccio amichevole.',
            'p.filling.n': 'Piega & styling',
            'p.filling.d': 'Messa in piega e styling con cera, pomata o gel a seconda del look.',
            'p.endo.n': 'Rasatura a zero',
            'p.endo.d': 'Taglio total a macchinetta uniforme, con rifinitura contorni.',
            /* Cat 2 Barba */
            'p.extSimple.n': 'Regolazione barba',
            'p.extSimple.d': 'Rifinitura di lunghezza e contorni con macchinetta e forbici.',
            'p.extWisdom.n': 'Rasatura tradizionale panno caldo',
            'p.extWisdom.d': 'Rasoio a mano libera, panno caldo e olio pre-barba: esperienza completa.',
            'p.implant.n': 'Modellatura barba',
            'p.implant.d': 'Disegno e definizione della forma della barba su misura del viso.',
            'p.crownImp.n': 'Trattamento barba',
            'p.crownImp.d': 'Scrub, olio e balsamo per una barba morbida, idratata e in forma.',
            'p.allOn4.n': 'Barba + rifinitura contorni',
            'p.allOn4.d': 'Regolazione completa con contorni netti e finitura al rasoio.',
            'p.sinusLift.n': 'Colorazione barba',
            'p.sinusLift.d': 'Tintura per uniformare il colore e coprire i primi grigi.',
            /* Cat 3 Trattamenti */
            'p.orthoConsult.n': 'Shampoo trattante',
            'p.orthoConsult.d': 'Lavaggio con shampoo specifico per cute e tipo di capello.',
            'p.mobile.n': 'Maschera ristrutturante',
            'p.mobile.d': 'Trattamento nutriente per capelli sfibrati o stressati.',
            'p.fixed.n': 'Trattamento anticaduta',
            'p.fixed.d': 'Fiala e massaggio stimolante per rinforzare il capello.',
            'p.invisalign.n': 'Massaggio cuoio capelluto',
            'p.invisalign.d': 'Massaggio rilassante e stimolante della cute, ottimo pre-taglio.',
            'p.retainer.n': 'Rituale relax completo',
            'p.retainer.d': 'Shampoo, massaggio e trattamento cute: la pausa che ti meriti.',
            /* Cat 4 Extra & Colore */
            'p.crown.n': 'Colore / tintura capelli',
            'p.crown.d': 'Colorazione uniforme per coprire i grigi o cambiare tono.',
            'p.bridge.n': 'Colpi di sole',
            'p.bridge.d': 'Schiariture su ciocche selezionate per un effetto naturale.',
            'p.veneer.n': 'Trattamento alla cheratina',
            'p.veneer.d': 'Trattamento lisciante e rinforzante per capelli disciplinati.',
            'p.denture.n': 'Pacchetto sposo',
            'p.denture.d': 'Prova + taglio, barba e styling nel giorno delle nozze. Look impeccabile.',
            'p.partialD.n': 'Pacchetto Taglio + Barba',
            'p.partialD.d': 'Il combo completo: taglio su misura e barba modellata.',
            'p.bite.n': 'Rasatura testa + barba',
            'p.bite.d': 'Rasatura a zero della testa e rifinitura barba in un unico servizio.',

            /* AI Mid banner */
            'aiMid.title': 'Non trovi il servizio che cerchi?',
            'aiMid.desc': 'Chiedi direttamente al nostro assistente AI: risponde su prezzi, disponibilità in poltrona e ti aiuta a prenotare in tempo reale, 24 ore su 24.',
            'aiMid.btn': "Parla con l'AI",

            /* Testimonials */
            'test.eyebrow': 'Le voci dei nostri clienti',
            'test.title': '4.9 stelle su 268 recensioni Google',
            'test.lead': 'La fiducia dei nostri clienti è il nostro biglietto da visita migliore.',
            'test.1.text': 'Miglior taglio che abbia mai fatto a Catania. Salvo ha capito subito cosa volevo e il fade è venuto perfetto. Atmosfera top, ci torno di sicuro.',
            'test.1.meta': 'Taglio + fade · Mar 2026',
            'test.2.text': "La rasatura col panno caldo è un'altra cosa. Mai sentita la pelle così liscia e zero irritazioni. Un rituale che ogni uomo dovrebbe provare.",
            'test.2.meta': 'Rasatura tradizionale · Gen 2026',
            'test.3.text': 'Mi sono sposato il mese scorso e il pacchetto sposo è stato perfetto. Prova, taglio e barba il giorno delle nozze: ero impeccabile in ogni foto.',
            'test.3.meta': 'Pacchetto sposo · Feb 2026',

            /* FAQ */
            'faq.eyebrow': 'Domande frequenti',
            'faq.title': 'Le risposte che cerchi',
            'faq.1.q': 'Serve prenotare o posso passare direttamente?',
            'faq.1.a': 'Accettiamo volentieri i walk-in negli orari di apertura, ma nei giorni di punta (venerdì e sabato) la prenotazione ti evita l\'attesa. Puoi prenotare per telefono, dal modulo o con il nostro assistente AI.',
            'faq.2.q': 'Fate la rasatura tradizionale con il rasoio a mano libera?',
            'faq.2.a': 'Sì, è una delle nostre specialità. La rasatura tradizionale include <strong>panno caldo, olio pre-barba e rasoio a mano libera</strong>, con lame sempre monouso per la massima igiene.',
            'faq.3.q': 'Accettate clienti senza appuntamento (walk-in)?',
            'faq.3.a': 'Assolutamente sì. Se c\'è posto in poltrona ti serviamo subito, altrimenti ti diamo un orario indicativo. Per essere sicuro di trovare posto, meglio prenotare.',
            'faq.4.q': 'Fate il taglio anche ai bambini?',
            'faq.4.a': 'Certo. Abbiamo un taglio dedicato ai più piccoli (fino a 12 anni) con un approccio paziente e amichevole, per un\'esperienza serena anche al primo taglio.',
            'faq.5.q': 'Organizzate pacchetti per sposi o eventi?',
            'faq.5.a': 'Sì. Il <strong>pacchetto sposo</strong> include una prova preliminare e taglio, barba e styling il giorno delle nozze. Su richiesta organizziamo anche sessioni per gruppi ed eventi.',
            'faq.6.q': 'C\'è parcheggio nelle vicinanze?',
            'faq.6.a': 'Siamo in Via Umberto 78, in pieno centro. C\'è un parcheggio a pagamento a 100 metri e diverse fermate AMT nelle immediate vicinanze.',

            /* Call banner 2 */
            'call2.title': 'Pronto per il tuo nuovo look?',
            'call2.desc': 'Chiamaci ora e prenota la tua poltrona. Ti risponde una persona vera in meno di 20 secondi.',

            /* Contatti */
            'contact.eyebrow': 'Contattaci',
            'contact.title': 'Prenota il tuo appuntamento',
            'contact.lead': 'Compila il modulo o chiamaci direttamente. Ti ricontattiamo entro 2 ore lavorative.',
            'contact.where': 'Dove siamo',
            'contact.addressL': 'Indirizzo',
            'contact.address': 'Via Umberto 78, 95129 Catania (CT)',
            'contact.phoneL': 'Telefono',
            'contact.emailL': 'Email',
            'contact.hoursL': 'Orari di apertura',
            'contact.hoursV': 'Mar–Sab 9:00–19:30<br>Domenica e Lunedì chiuso',
            'contact.mapTitle': 'Via Umberto 78, Catania',
            'contact.mapDesc': 'In pieno centro · Parcheggio a pagamento a 100 m',
            'contact.form.title': 'Prenota appuntamento',
            'contact.form.first': 'Nome',
            'contact.form.last': 'Cognome',
            'contact.form.phone': 'Telefono',
            'contact.form.email': 'Email',
            'contact.form.serviceL': 'Servizio di interesse',
            'contact.form.messageL': 'Messaggio (opzionale)',
            'contact.form.messageP': 'Raccontaci che look hai in mente...',
            'contact.form.gdpr': 'Ho letto e accetto la <a href="#">privacy policy</a> e autorizzo il trattamento dei miei dati personali ai sensi del GDPR 679/2016.',
            'contact.form.submit': 'Invia richiesta',
            'contact.form.reply': 'Risposta garantita entro 2 ore lavorative',
            'contact.form.demoAlert': 'Demo: nessuna richiesta è stata inviata realmente.',
            'contact.form.opt.firstVisit': 'Taglio',
            'contact.form.opt.hygiene': 'Barba',
            'contact.form.opt.implant': 'Taglio + Barba',
            'contact.form.opt.invisalign': 'Colore',
            'contact.form.opt.whitening': 'Pacchetto sposo',
            'contact.form.opt.other': 'Altro (specificare nel messaggio)',

            /* AI Explain */
            'ai.eyebrow': 'Assistente AI · sempre attivo',
            'ai.title': 'La reception che non chiude mai',
            'ai.lead': 'Ricevi risposte immediate su prezzi, servizi e disponibilità in poltrona anche fuori orario — senza attese al telefono, senza compilare form.',
            'ai.chat.name': 'Dario · Assistente AI',
            'ai.chat.status': 'Online ora',
            'ai.chat.1': "Ciao! Sono Dario, l'assistente della Barberia Etna. Come posso aiutarti?",
            'ai.chat.2': 'Avete posto oggi pomeriggio per taglio + barba?',
            'ai.chat.3': "Sì! Oggi abbiamo disponibilità alle 16:30 e alle 17:15. Il pacchetto <strong>Taglio + Barba</strong> costa <strong>€ 30</strong> e dura circa 45 minuti. Vuoi che ti prenoti uno dei due orari?",
            'ai.side.eyebrow': 'Come funziona',
            'ai.side.title': 'Chiedi. Scegli. Prenota.',
            'ai.side.lead': 'Il nostro assistente AI conosce tutti i servizi, il listino aggiornato e la disponibilità in poltrona. Puoi parlargli a voce o scrivere.',
            'ai.feat.1': '<strong>Risposte immediate</strong> su prezzi e servizi, senza attese al telefono.',
            'ai.feat.2': '<strong>Disponibile 24/7</strong> — anche di sera, la domenica e nei festivi.',
            'ai.feat.3': "<strong>Prenotazioni assistite</strong>: ti aiuta a scegliere il barbiere e l'orario giusto.",
            'ai.feat.4': '<strong>Privacy garantita</strong>: nessun dato salvato senza il tuo consenso esplicito.',
            'ai.cta.title': 'Inizia la conversazione',
            'ai.cta.desc': "Clicca qui o sull'icona in basso a destra ↓",

            /* Footer */
            'footer.tagline': 'Barbershop dal 2015',
            'footer.desc': 'Dal 2015 curiamo il look degli uomini di Catania con la passione del mestiere e la qualità dei prodotti premium.',
            'footer.services': 'Servizi',
            'footer.links': 'Link utili',
            'footer.contacts': 'Contatti',
            'footer.legal': 'Barberia Etna di Salvo Rizzo · P.IVA 09876543210 · REA CT-654321<br>Via Umberto 78, 95129 Catania (CT) · Autorizzazione SCIA n. 789/2015 - Comune di Catania<br>© 2026 Tutti i diritti riservati',
            'footer.privacy': 'Privacy Policy',
            'footer.cookie': 'Cookie Policy',
            'footer.notes': 'Note legali',
            'footer.rates': 'Trasparenza tariffaria',

            /* Cookie */
            'cookie.title': '🍪 Utilizziamo i cookie',
            'cookie.desc': 'Utilizziamo cookie tecnici e di analytics per migliorare la tua esperienza. Puoi accettare, rifiutare o personalizzare la tua scelta.',
            'cookie.accept': 'Accetta tutti',
            'cookie.essential': 'Solo essenziali',

            'mobile.call': 'Prenota ora'
        },

        en: {
            /* Meta */
            'meta.title': 'Barberia Etna · Barbershop in Catania',
            'meta.description': 'Barberia Etna — Barbershop in Catania since 2015. Haircut, beard, traditional hot-towel shave and groom packages. Book now: +39 095 222 33 44.',
            'meta.og.locale': 'en_US',

            /* Topbar */
            'topbar.hours': 'Tue–Sat 9:00–19:30 · Sun–Mon closed',
            'topbar.patientArea': 'Book online',
            'topbar.langLabel': 'Language',
            'topbar.backPortfolio': 'Back to portfolio',

            /* Nav */
            'nav.services': 'Services',
            'nav.about': 'About',
            'nav.team': 'Team',
            'nav.pricing': 'Prices',
            'nav.reviews': 'Reviews',
            'nav.faq': 'FAQ',
            'nav.ai': 'AI Assistant',
            'nav.contact': 'Contact',
            'nav.callNow': 'Book Now',
            'nav.skipTo': 'Skip to main content',
            'nav.brand.sub': 'Barbershop · since 2015',
            'nav.openMenu': 'Open menu',

            /* Hero */
            'hero.badge': 'Walk-ins welcome · Book today',
            'hero.title.part1': 'Your',
            'hero.title.accent': 'style',
            'hero.title.part2': 'in the hands of real barbers.',
            'hero.lead': "Since 2015 we cut, shape and groom beards in the heart of Catania. Traditional hot-towel shave, premium products and that vintage barbershop feel. Walk in a stranger, walk out a gentleman.",
            'hero.cta.call': 'Call +39 095 222 33 44',
            'hero.cta.book': 'Book Online',
            'hero.aiCta': 'Prefer to type? Chat now with our AI assistant',
            'hero.trust.years': 'Years of<br>craft',
            'hero.trust.patients': 'Loyal<br>clients',
            'hero.trust.reviews': '268 Google<br>reviews',
            'hero.float.security.title': 'Hygiene guaranteed',
            'hero.float.security.desc': 'Single-use blades & sterilization',
            'hero.float.warranty.title': 'Free touch-up',
            'hero.float.warranty.desc': 'Line-up within 7 days',

            /* AI Lane */
            'lane.badge': 'AI Assistant · Online',
            'lane.title': 'Your virtual assistant is here',
            'lane.desc': "Ask about prices, book a haircut or a beard package. We answer 24/7, also by voice.",
            'lane.hint': 'Click the icon below',

            /* Trust bar */
            'trust.label': 'Products we use',

            /* Servizi */
            'services.eyebrow': 'Our services',
            'services.title': 'Haircut, beard and much more',
            'services.lead': "From the classic cut to the straight-razor shave: every service is designed to make you look your best, with the craftsmanship of a neighborhood barbershop.",
            'services.more': 'Learn more',
            'services.igiene.title': "Men's Haircut",
            'services.igiene.desc': 'Tailored cut with scissors and clippers, shampoo and final styling with professional products.',
            'services.implant.title': 'Beard & Line-up',
            'services.implant.desc': 'Trimming, shaping and crisp outlines for a beard groomed down to the last detail.',
            'services.ortho.title': 'Traditional Shave',
            'services.ortho.desc': 'Straight razor, hot towel and pre-shave oil: the real old-school barbershop experience.',
            'services.esthetic.title': 'Haircut + Beard',
            'services.esthetic.desc': 'The full package: tailored cut and shaped beard, the total look that makes the difference.',
            'services.pedo.title': "Kids' Haircut",
            'services.pedo.desc': 'A stress-free first cut, with patience and a friendly approach for the little ones.',
            'services.3d.title': 'Colour & Treatments',
            'services.3d.desc': 'Colour, highlights, anti-hair-loss and keratin treatments to keep hair and beard in shape.',

            /* Call banner 1 */
            'call1.title': 'No more Saturday queues',
            'call1.desc': 'Book your chair and skip the line. We also welcome walk-ins during opening hours.',

            /* Chi siamo */
            'about.eyebrow': 'About us',
            'about.title': 'A vintage shop, an authentic craft.',
            'about.p1': "Since 2015 Barberia Etna has been the go-to spot in Catania for those after a haircut done right. Leather chairs, straight razors and that old-school barbershop feel, with the quality of today's products.",
            'about.p2.prefix': 'Our',
            'about.p2.strong': 'master barber',
            'about.p2.rest': ", Salvo Rizzo, leads a team of 4 professionals who take care of the look of men of all ages every day, from the classic cut to the latest trends.",
            'about.stat.specialists': 'Barbers in the shop',
            'about.stat.patients': 'Loyal clients',
            'about.stat.success': '5-star reviews',
            'about.visualBadge': 'Shop since 2015',

            /* Team */
            'team.eyebrow': 'The team',
            'team.title': 'Our barbers',
            'team.lead': 'Every team member is a professional with years of experience across scissors, razor and clippers, always keeping up with the latest trends.',
            'team.rossi.role': 'Master barber · Owner',
            'team.rossi.spec': 'Traditional shaving and classic cuts. Over 15 years of craft, founder of the shop in 2015.',
            'team.bianchi.role': 'Barber',
            'team.bianchi.spec': 'Fade and modern-cut specialist. Razor line-ups and precision styling.',
            'team.costa.role': 'Junior barber',
            'team.costa.spec': "Men's and kids' cuts, beard trims. Always up to date on urban trends.",
            'team.ferrara.role': 'Hair stylist',
            'team.ferrara.spec': 'Colour, highlights and treatments for hair and beard. Attention to detail and look consulting.',

            /* Gallery */
            'gallery.eyebrow': 'Our work',
            'gallery.title': 'Cuts that speak for themselves',
            'gallery.lead': 'Every head is one of a kind. Take a look at the work that comes out of our shop every day.',
            'gallery.1.cap': 'Fade & line-up',
            'gallery.2.cap': 'Traditional shave',
            'gallery.3.cap': 'Shaped beard',
            'gallery.4.cap': 'Classic cut',
            'gallery.5.cap': 'The shop',
            'gallery.6.cap': 'Precision styling',

            /* Listino */
            'pricing.eyebrow': 'Service menu',
            'pricing.title': 'Clear prices, no surprises',
            'pricing.lead': 'Check the price of every service. Rates are valid until 31/12/2026 and include shampoo and final styling where applicable.',
            'pricing.col.service': 'Service',
            'pricing.col.description': 'Description',
            'pricing.col.price': 'Price',
            'pricing.free': 'Free',
            'pricing.cat1.title': 'Hair',
            'pricing.cat1.sub': "Men's cut, kids' cut, styling and buzz cut",
            'pricing.cat2.title': 'Beard',
            'pricing.cat2.sub': 'Trimming, traditional shave and shaping',
            'pricing.cat3.title': 'Treatments',
            'pricing.cat3.sub': 'Treatment shampoos, masks and scalp care',
            'pricing.cat4.title': 'Extra & Colour',
            'pricing.cat4.sub': 'Colour, highlights, keratin and groom package',
            'pricing.cta.title': "Not sure which service to pick?",
            'pricing.cta.desc': 'The in-chair look consultation is free: drop by or call, we\'ll recommend the right cut for you.',
            'pricing.cta.btn': 'Book Now',
            /* Services rows — Cat 1 Hair */
            'p.firstVisit.n': 'Look consultation',
            'p.firstVisit.d': 'Face and hair assessment with advice on the cut and style that suit you best.',
            'p.hygiene.n': "Men's haircut",
            'p.hygiene.d': 'Tailored cut with scissors and clippers, line-up and styling.',
            'p.whitening.n': 'Haircut + shampoo',
            'p.whitening.d': 'Full cut with shampoo wash and final styling using premium products.',
            'p.sealing.n': "Kids' haircut (up to 12)",
            'p.sealing.d': 'A cut for the little ones, with patience and a friendly approach.',
            'p.filling.n': 'Styling & finish',
            'p.filling.d': 'Blow-dry and styling with wax, pomade or gel depending on the look.',
            'p.endo.n': 'Buzz cut',
            'p.endo.d': 'Even all-over clipper cut with a clean line-up.',
            /* Cat 2 Beard */
            'p.extSimple.n': 'Beard trim',
            'p.extSimple.d': 'Length and outline trim with clippers and scissors.',
            'p.extWisdom.n': 'Traditional hot-towel shave',
            'p.extWisdom.d': 'Straight razor, hot towel and pre-shave oil: the full experience.',
            'p.implant.n': 'Beard shaping',
            'p.implant.d': 'Designing and defining the beard shape to suit your face.',
            'p.crownImp.n': 'Beard treatment',
            'p.crownImp.d': 'Scrub, oil and balm for a soft, hydrated and healthy beard.',
            'p.allOn4.n': 'Beard + line-up',
            'p.allOn4.d': 'Full trim with crisp outlines and a razor finish.',
            'p.sinusLift.n': 'Beard colouring',
            'p.sinusLift.d': 'Tint to even out the colour and cover the first greys.',
            /* Cat 3 Treatments */
            'p.orthoConsult.n': 'Treatment shampoo',
            'p.orthoConsult.d': 'Wash with a shampoo tailored to your scalp and hair type.',
            'p.mobile.n': 'Restructuring mask',
            'p.mobile.d': 'Nourishing treatment for weakened or stressed hair.',
            'p.fixed.n': 'Anti-hair-loss treatment',
            'p.fixed.d': 'Ampoule and stimulating massage to strengthen the hair.',
            'p.invisalign.n': 'Scalp massage',
            'p.invisalign.d': 'Relaxing, stimulating scalp massage, great before a cut.',
            'p.retainer.n': 'Full relax ritual',
            'p.retainer.d': 'Shampoo, massage and scalp treatment: the break you deserve.',
            /* Cat 4 Extra & Colour */
            'p.crown.n': 'Hair colour / tint',
            'p.crown.d': 'Even colouring to cover greys or change tone.',
            'p.bridge.n': 'Highlights',
            'p.bridge.d': 'Lightening on selected strands for a natural effect.',
            'p.veneer.n': 'Keratin treatment',
            'p.veneer.d': 'Smoothing and strengthening treatment for manageable hair.',
            'p.denture.n': 'Groom package',
            'p.denture.d': 'Trial + cut, beard and styling on the wedding day. Flawless look.',
            'p.partialD.n': 'Haircut + Beard package',
            'p.partialD.d': 'The full combo: tailored cut and shaped beard.',
            'p.bite.n': 'Head shave + beard',
            'p.bite.d': 'Full head shave and beard line-up in a single service.',

            /* AI Mid banner */
            'aiMid.title': "Can't find the service you're after?",
            'aiMid.desc': 'Ask our AI assistant directly: it answers about prices, chair availability and helps you book in real time, 24 hours a day.',
            'aiMid.btn': 'Chat with the AI',

            /* Testimonials */
            'test.eyebrow': 'Our clients speak',
            'test.title': '4.9 stars on 268 Google reviews',
            'test.lead': "Our clients' trust is our best business card.",
            'test.1.text': 'Best haircut I have ever had in Catania. Salvo got exactly what I wanted and the fade came out perfect. Great atmosphere, definitely coming back.',
            'test.1.meta': 'Haircut + fade · Mar 2026',
            'test.2.text': "The hot-towel shave is on another level. Never felt my skin this smooth and zero irritation. A ritual every man should try.",
            'test.2.meta': 'Traditional shave · Jan 2026',
            'test.3.text': 'I got married last month and the groom package was perfect. Trial, cut and beard on the big day: I looked flawless in every photo.',
            'test.3.meta': 'Groom package · Feb 2026',

            /* FAQ */
            'faq.eyebrow': 'Frequently asked questions',
            'faq.title': 'The answers you are looking for',
            'faq.1.q': 'Do I need to book or can I just drop by?',
            'faq.1.a': 'We happily welcome walk-ins during opening hours, but on peak days (Friday and Saturday) booking saves you the wait. You can book by phone, through the form or with our AI assistant.',
            'faq.2.q': 'Do you do the traditional straight-razor shave?',
            'faq.2.a': 'Yes, it is one of our specialties. The traditional shave includes <strong>hot towel, pre-shave oil and straight razor</strong>, with single-use blades every time for maximum hygiene.',
            'faq.3.q': 'Do you accept walk-in customers?',
            'faq.3.a': 'Absolutely. If a chair is free we serve you right away, otherwise we give you an estimated time. To be sure of a spot, booking is best.',
            'faq.4.q': 'Do you also cut kids\' hair?',
            'faq.4.a': 'Of course. We have a dedicated cut for the little ones (up to 12) with a patient, friendly approach, for a calm experience even at the very first cut.',
            'faq.5.q': 'Do you offer packages for grooms or events?',
            'faq.5.a': 'Yes. The <strong>groom package</strong> includes a preliminary trial and cut, beard and styling on the wedding day. On request we also arrange sessions for groups and events.',
            'faq.6.q': 'Is there parking nearby?',
            'faq.6.a': 'We are in Via Umberto 78, right in the city centre. There is a paid car park 100 metres away and several AMT bus stops in the immediate vicinity.',

            /* Call banner 2 */
            'call2.title': 'Ready for your new look?',
            'call2.desc': 'Call us now and book your chair. A real person answers in less than 20 seconds.',

            /* Contatti */
            'contact.eyebrow': 'Contact us',
            'contact.title': 'Book your appointment',
            'contact.lead': 'Fill in the form or call us directly. We will get back to you within 2 working hours.',
            'contact.where': 'Where we are',
            'contact.addressL': 'Address',
            'contact.address': 'Via Umberto 78, 95129 Catania (CT), Italy',
            'contact.phoneL': 'Phone',
            'contact.emailL': 'Email',
            'contact.hoursL': 'Opening hours',
            'contact.hoursV': 'Tue–Sat 9:00–19:30<br>Sunday and Monday closed',
            'contact.mapTitle': 'Via Umberto 78, Catania',
            'contact.mapDesc': 'Right in the city centre · Paid parking 100 m away',
            'contact.form.title': 'Book an appointment',
            'contact.form.first': 'First name',
            'contact.form.last': 'Last name',
            'contact.form.phone': 'Phone',
            'contact.form.email': 'Email',
            'contact.form.serviceL': 'Service of interest',
            'contact.form.messageL': 'Message (optional)',
            'contact.form.messageP': 'Tell us the look you have in mind...',
            'contact.form.gdpr': 'I have read and accept the <a href="#">privacy policy</a> and authorize the processing of my personal data pursuant to GDPR 679/2016.',
            'contact.form.submit': 'Send request',
            'contact.form.reply': 'Guaranteed reply within 2 working hours',
            'contact.form.demoAlert': 'Demo: no request was actually sent.',
            'contact.form.opt.firstVisit': 'Haircut',
            'contact.form.opt.hygiene': 'Beard',
            'contact.form.opt.implant': 'Haircut + Beard',
            'contact.form.opt.invisalign': 'Colour',
            'contact.form.opt.whitening': 'Groom package',
            'contact.form.opt.other': 'Other (specify in message)',

            /* AI Explain */
            'ai.eyebrow': 'AI Assistant · always on',
            'ai.title': 'The front desk that never closes',
            'ai.lead': 'Instant answers about prices, services and chair availability — even after hours. No phone queues, no forms to fill in.',
            'ai.chat.name': 'Dario · AI Assistant',
            'ai.chat.status': 'Online now',
            'ai.chat.1': "Hi! I'm Dario, Barberia Etna's assistant. How can I help you?",
            'ai.chat.2': 'Any slots this afternoon for a haircut + beard?',
            'ai.chat.3': "Yes! Today we have openings at 4:30 pm and 5:15 pm. The <strong>Haircut + Beard</strong> package is <strong>€30</strong> and takes about 45 minutes. Would you like me to book one of the two slots?",
            'ai.side.eyebrow': 'How it works',
            'ai.side.title': 'Ask. Choose. Book.',
            'ai.side.lead': 'Our AI assistant knows all the services, the up-to-date price list and chair availability. You can talk to it by voice or type.',
            'ai.feat.1': '<strong>Instant answers</strong> on prices and services, no phone queues.',
            'ai.feat.2': '<strong>Available 24/7</strong> — in the evening, on Sundays and on holidays too.',
            'ai.feat.3': "<strong>Assisted booking</strong>: it helps you pick the right barber and time slot.",
            'ai.feat.4': '<strong>Privacy guaranteed</strong>: no data stored without your explicit consent.',
            'ai.cta.title': 'Start the conversation',
            'ai.cta.desc': 'Click here or on the icon at the bottom-right ↓',

            /* Footer */
            'footer.tagline': 'Barbershop since 2015',
            'footer.desc': 'Since 2015 we have shaped the look of the men of Catania with a passion for the craft and the quality of premium products.',
            'footer.services': 'Services',
            'footer.links': 'Useful links',
            'footer.contacts': 'Contact',
            'footer.legal': 'Barberia Etna di Salvo Rizzo · VAT 09876543210 · REA CT-654321<br>Via Umberto 78, 95129 Catania (CT) · SCIA authorization no. 789/2015 - Municipality of Catania<br>© 2026 All rights reserved',
            'footer.privacy': 'Privacy Policy',
            'footer.cookie': 'Cookie Policy',
            'footer.notes': 'Legal notes',
            'footer.rates': 'Price transparency',

            /* Cookie */
            'cookie.title': '🍪 We use cookies',
            'cookie.desc': 'We use technical and analytics cookies to improve your experience. You can accept, refuse or customize your choice.',
            'cookie.accept': 'Accept all',
            'cookie.essential': 'Essential only',

            'mobile.call': 'Book now'
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
