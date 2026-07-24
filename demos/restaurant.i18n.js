/* =============================================================
   Trattoria del Mare — i18n engine
   Same framework-free engine as the dental demo, restaurant copy.
   ============================================================= */
(function () {
    const DEFAULT_LANG = 'it';
    const SUPPORTED = ['it', 'en'];
    const STORAGE_KEY = 'trattoriadelmare.lang';

    const dict = {
        it: {
            /* Meta */
            'meta.title': 'Trattoria del Mare · Ristorante di pesce a Catania',
            'meta.description': 'Trattoria del Mare — Cucina di pesce siciliana a Catania. Pescato del giorno, materie prime del territorio, cantina selezionata. Prenota il tuo tavolo: +39 095 111 22 33.',
            'meta.og.locale': 'it_IT',

            /* Topbar */
            'topbar.hours': 'Mar–Dom 12:30–15:00 · 19:30–23:30 · Lun chiuso',
            'topbar.patientArea': 'Gift card',
            'topbar.langLabel': 'Lingua',
            'topbar.backPortfolio': 'Portfolio VP',

            /* Nav */
            'nav.services': 'Esperienza',
            'nav.about': 'Chi Siamo',
            'nav.team': 'Lo Chef',
            'nav.pricing': 'Menù',
            'nav.reviews': 'Recensioni',
            'nav.faq': 'FAQ',
            'nav.ai': 'Assistente AI',
            'nav.contact': 'Prenota',
            'nav.callNow': 'Prenota un Tavolo',
            'nav.skipTo': 'Salta al contenuto principale',
            'nav.brand.sub': 'Cucina di mare · dal 1987',
            'nav.openMenu': 'Apri menu',

            /* Hero */
            'hero.badge': 'Pescato del giorno · Prenota il tuo tavolo',
            'hero.title.part1': 'Il vero',
            'hero.title.accent': 'sapore del mare',
            'hero.title.part2': 'nel cuore di Catania.',
            'hero.lead': "Dal 1987 portiamo in tavola il pescato del golfo di Catania, materie prime del territorio e ricette della tradizione siciliana rivisitate con cura. Un'esperienza autentica, a due passi dal mare.",
            'hero.cta.call': 'Prenota +39 095 111 22 33',
            'hero.cta.book': 'Prenota Online',
            'hero.aiCta': 'Preferisci scrivere? Chiedi al nostro assistente AI disponibilità e menù',
            'hero.trust.years': 'Anni di<br>tradizione',
            'hero.trust.patients': 'Coperti<br>ogni anno',
            'hero.trust.reviews': '512 recensioni<br>Google',
            'hero.float.security.title': 'Pescato fresco',
            'hero.float.security.desc': 'Consegnato ogni mattina',
            'hero.float.warranty.title': 'Cantina selezionata',
            'hero.float.warranty.desc': 'Oltre 120 etichette',

            /* AI Lane (unused) */
            'lane.badge': 'Assistente AI · Online',
            'lane.title': 'Il tuo assistente virtuale è qui',
            'lane.desc': 'Chiedi disponibilità, menù o allergeni. Rispondiamo 24/7.',
            'lane.hint': "Clicca sull'icona qui sotto",

            /* Trust bar */
            'trust.label': 'Riconoscimenti',

            /* Esperienza (was services) */
            'services.eyebrow': 'La nostra esperienza',
            'services.title': 'Molto più di una cena',
            'services.lead': 'Ogni piatto racconta il mare di Sicilia: materie prime selezionate, cotture rispettose e un servizio che ti fa sentire a casa.',
            'services.more': 'Scopri di più',
            'services.igiene.title': 'Pescato del Giorno',
            'services.igiene.desc': 'Pesce fresco selezionato ogni mattina al mercato del pesce di Catania.',
            'services.implant.title': 'Cucina della Tradizione',
            'services.implant.desc': 'Ricette siciliane di mare tramandate e reinterpretate dal nostro chef.',
            'services.ortho.title': 'Cantina & Vini',
            'services.ortho.desc': 'Oltre 120 etichette siciliane e nazionali, con abbinamenti consigliati.',
            'services.esthetic.title': 'Terrazza sul Mare',
            'services.esthetic.desc': 'Cena a lume di candela sulla nostra terrazza con vista sul golfo.',
            'services.pedo.title': 'Eventi Privati',
            'services.pedo.desc': 'Cerimonie, compleanni e cene aziendali con menù personalizzati.',
            'services.3d.title': 'Menù Degustazione',
            'services.3d.desc': 'Un percorso di 6 portate per scoprire il meglio della nostra cucina.',

            /* Call banner 1 */
            'call1.title': 'I tavoli migliori vanno a ruba',
            'call1.desc': 'Assicurati il tuo posto per una cena indimenticabile. Prenota oggi, siamo aperti dal martedì alla domenica.',

            /* Chi siamo */
            'about.eyebrow': 'Chi siamo',
            'about.title': 'Una famiglia, una passione per il mare.',
            'about.p1': "Dal 1987 la famiglia Marino accoglie i propri ospiti con la stessa passione di sempre: portare in tavola il vero sapore del mare di Sicilia, in un ambiente caldo e accogliente a due passi dal porto.",
            'about.p2.prefix': 'Il nostro',
            'about.p2.strong': 'chef Salvatore Marino',
            'about.p2.rest': ", seconda generazione, unisce la tradizione della cucina siciliana di mare a un tocco contemporaneo, valorizzando ogni ingrediente del territorio.",
            'about.stat.specialists': 'Piatti in menù',
            'about.stat.patients': 'Ospiti felici',
            'about.stat.success': 'Prodotti a km 0',
            'about.visualBadge': 'Sala accogliente',

            /* Team (Chef) */
            'team.eyebrow': 'La brigata',
            'team.title': 'Chi c\'è in cucina',
            'team.lead': 'Una squadra affiatata che mette passione e competenza in ogni piatto che arriva al tuo tavolo.',
            'team.rossi.role': 'Chef & Patron',
            'team.rossi.spec': 'Cucina di mare siciliana. Oltre 30 anni di esperienza tra i fornelli.',
            'team.bianchi.role': 'Sous Chef',
            'team.bianchi.spec': 'Specialista in crudi di pesce e primi piatti della tradizione.',
            'team.costa.role': 'Pasticcere',
            'team.costa.spec': 'Dolci siciliani artigianali: cannoli, cassata e semifreddi.',
            'team.ferrara.role': 'Sommelier',
            'team.ferrara.spec': 'Cura la cantina e consiglia gli abbinamenti vino perfetti.',

            /* Gallery */
            'gallery.eyebrow': 'La nostra cucina',
            'gallery.title': 'Le specialità che arrivano al tuo tavolo',
            'gallery.lead': 'Un assaggio di ciò che ti aspetta: piatti di mare preparati ogni giorno con il pescato fresco del golfo di Catania.',
            'gallery.1.cap': 'Crudi di mare',
            'gallery.2.cap': 'Spaghetti allo scoglio',
            'gallery.3.cap': 'Pescato alla griglia',
            'gallery.4.cap': 'Antipasti del giorno',
            'gallery.5.cap': 'La nostra sala',
            'gallery.6.cap': 'Dolci siciliani',

            /* Menù (was pricing) */
            'pricing.eyebrow': 'Il nostro menù',
            'pricing.title': 'Dal mare alla tavola',
            'pricing.lead': 'Una selezione dei nostri piatti. Il menù cambia con la stagione e il pescato del giorno. Chiedi allo staff le specialità di oggi.',
            'pricing.col.service': 'Piatto',
            'pricing.col.description': 'Descrizione',
            'pricing.col.price': 'Prezzo',
            'pricing.free': 'Stagionale',
            'pricing.cat1.title': 'Antipasti di Mare',
            'pricing.cat1.sub': 'Per iniziare, il meglio del nostro golfo',
            'pricing.cat2.title': 'Primi Piatti',
            'pricing.cat2.sub': 'Pasta fresca e risotti di mare',
            'pricing.cat3.title': 'Secondi di Pesce',
            'pricing.cat3.sub': 'Il pescato del giorno, cucinato con cura',
            'pricing.cat4.title': 'Dolci & Cantina',
            'pricing.cat4.sub': 'Dolci siciliani e una selezione di vini',
            'pricing.cta.title': 'Vuoi prenotare un tavolo?',
            'pricing.cta.desc': 'Ti confermiamo la disponibilità in pochi minuti. Menù degustazione su richiesta.',
            'pricing.cta.btn': 'Prenota Ora',
            /* Menu rows */
            'p.firstVisit.n': 'Antipasto del pescatore',
            'p.firstVisit.d': 'Degustazione di crudi di mare, gamberi rossi e ostriche.',
            'p.hygiene.n': 'Insalata di polpo',
            'p.hygiene.d': 'Polpo tenero, patate, olive taggiasche e sedano croccante.',
            'p.whitening.n': 'Cozze e vongole',
            'p.whitening.d': 'Sauté di frutti di mare con crostini all\'aglio.',
            'p.sealing.n': 'Alici marinate',
            'p.sealing.d': 'Alici fresche marinate agli agrumi di Sicilia.',
            'p.filling.n': 'Frittura di paranza',
            'p.filling.d': 'Croccante frittura di pesce misto del golfo.',
            'p.endo.n': 'Carpaccio di spada',
            'p.endo.d': 'Pesce spada affumicato con rucola e grana.',
            'p.extSimple.n': 'Spaghetti alle vongole',
            'p.extSimple.d': 'Spaghetti di Gragnano con vongole veraci e bottarga.',
            'p.extWisdom.n': 'Risotto alla pescatora',
            'p.extWisdom.d': 'Risotto mantecato con frutti di mare e zafferano.',
            'p.implant.n': 'Linguine all\'astice',
            'p.implant.d': 'Linguine con astice fresco e pomodorino ciliegino.',
            'p.crownImp.n': 'Pasta con le sarde',
            'p.crownImp.d': 'Un classico siciliano: sarde, finocchietto e pinoli.',
            'p.allOn4.n': 'Couscous di pesce',
            'p.allOn4.d': 'Couscous alla trapanese con zuppa di pesce misto.',
            'p.sinusLift.n': 'Paccheri gambero e pistacchio',
            'p.sinusLift.d': 'Paccheri con gamberi rossi e granella di pistacchio di Bronte.',
            'p.orthoConsult.n': 'Grigliata mista di mare',
            'p.orthoConsult.d': 'Selezione di pesce e crostacei alla griglia.',
            'p.mobile.n': 'Pesce del giorno al forno',
            'p.mobile.d': 'Pescato fresco cotto al forno con patate ed erbe (al kg).',
            'p.fixed.n': 'Tonno scottato',
            'p.fixed.d': 'Filetto di tonno rosso in crosta di sesamo, verdure di stagione.',
            'p.invisalign.n': 'Spada alla ghiotta',
            'p.invisalign.d': 'Pesce spada in umido con capperi, olive e pomodoro.',
            'p.retainer.n': 'Gamberoni alla griglia',
            'p.retainer.d': 'Gamberoni freschi grigliati con olio agli agrumi.',
            'p.crown.n': 'Cannolo siciliano',
            'p.crown.d': 'Cialda croccante con ricotta fresca di pecora e pistacchio.',
            'p.bridge.n': 'Cassata siciliana',
            'p.bridge.d': 'Il dolce simbolo della Sicilia, con ricotta e pasta reale.',
            'p.veneer.n': 'Semifreddo ai pistacchi',
            'p.veneer.d': 'Semifreddo artigianale al pistacchio di Bronte DOP.',
            'p.denture.n': 'Etna Bianco DOC',
            'p.denture.d': 'Carricante in purezza, minerale e fresco (calice / bottiglia).',
            'p.partialD.n': 'Nero d\'Avola DOC',
            'p.partialD.d': 'Rosso siciliano corposo (calice / bottiglia).',
            'p.bite.n': 'Passito di Pantelleria',
            'p.bite.d': 'Vino da dessert dolce e aromatico (calice).',

            /* AI Mid banner */
            'aiMid.title': 'Hai domande su menù o allergeni?',
            'aiMid.desc': 'Chiedi al nostro assistente AI: ti dice cosa c\'è nel piatto, i vini in abbinamento e verifica la disponibilità dei tavoli in tempo reale.',
            'aiMid.btn': "Parla con l'AI",

            /* Testimonials */
            'test.eyebrow': 'La parola ai nostri ospiti',
            'test.title': '4.8 stelle su 512 recensioni Google',
            'test.lead': 'La soddisfazione di chi si siede alla nostra tavola è la ricetta del nostro successo.',
            'test.1.text': 'Pesce freschissimo e servizio impeccabile. Gli spaghetti alle vongole sono i migliori che abbia mai mangiato. Torneremo sicuramente!',
            'test.1.meta': 'Cena romantica · Mag 2026',
            'test.2.text': "Location stupenda con vista sul mare. Il menù degustazione vale ogni centesimo, e il sommelier ci ha consigliato un abbinamento perfetto.",
            'test.2.meta': 'Anniversario · Apr 2026',
            'test.3.text': 'Abbiamo festeggiato il compleanno di mia madre. Staff gentilissimo, dolci fatti in casa spettacolari. Esperienza da 10 e lode.',
            'test.3.meta': 'Festa in famiglia · Mar 2026',

            /* FAQ */
            'faq.eyebrow': 'Domande frequenti',
            'faq.title': 'Tutto quello che vuoi sapere',
            'faq.1.q': 'È necessario prenotare?',
            'faq.1.a': 'Consigliamo sempre la prenotazione, soprattutto nei weekend e in terrazza. Puoi prenotare per telefono, online o chiedendo al nostro assistente AI.',
            'faq.2.q': 'Avete opzioni per intolleranze e allergie?',
            'faq.2.a': 'Sì. Disponiamo di <strong>opzioni senza glutine</strong> e adattiamo molti piatti per intolleranze. Segnalacelo alla prenotazione o chiedi allo staff gli allergeni di ogni piatto.',
            'faq.3.q': 'Il menù è adatto anche a chi non mangia pesce?',
            'faq.3.a': "Certo. Oltre alle nostre specialità di mare, proponiamo <strong>piatti di carne e opzioni vegetariane</strong> preparati con la stessa cura.",
            'faq.4.q': 'Organizzate eventi e cerimonie?',
            'faq.4.a': 'Sì, organizziamo cerimonie, compleanni e cene aziendali con menù personalizzati. Contattaci per un preventivo dedicato.',
            'faq.5.q': 'C\'è un parcheggio?',
            'faq.5.a': 'Disponiamo di un <strong>parcheggio convenzionato</strong> a 50 metri dal ristorante. Su richiesta è disponibile anche il servizio di voiturier nel weekend.',
            'faq.6.q': 'Accettate gruppi numerosi?',
            'faq.6.a': 'Sì, accogliamo gruppi fino a 60 persone. Per gruppi oltre le 10 persone proponiamo menù concordati. Prenota con anticipo per garantirti il posto.',

            /* Call banner 2 */
            'call2.title': 'Il tuo tavolo ti aspetta',
            'call2.desc': 'Chiamaci ora e prenota la tua serata al mare. Ti risponde subito una persona vera.',

            /* Contatti */
            'contact.eyebrow': 'Prenota',
            'contact.title': 'Prenota il tuo tavolo',
            'contact.lead': 'Compila il modulo o chiamaci direttamente. Ti confermiamo la prenotazione entro un\'ora.',
            'contact.where': 'Dove siamo',
            'contact.addressL': 'Indirizzo',
            'contact.address': 'Via del Porto 45, 95121 Catania (CT)',
            'contact.phoneL': 'Telefono',
            'contact.emailL': 'Email',
            'contact.hoursL': 'Orari di apertura',
            'contact.hoursV': 'Mar–Dom 12:30–15:00 · 19:30–23:30<br>Lunedì chiuso',
            'contact.mapTitle': 'Via del Porto 45, Catania',
            'contact.mapDesc': 'Sul lungomare, a 2 minuti dal porto · Parcheggio convenzionato a 50 m',
            'contact.form.title': 'Richiedi prenotazione',
            'contact.form.first': 'Nome',
            'contact.form.last': 'Cognome',
            'contact.form.phone': 'Telefono',
            'contact.form.email': 'Email',
            'contact.form.serviceL': 'Numero di persone',
            'contact.form.messageL': 'Note (opzionale)',
            'contact.form.messageP': 'Allergie, occasione speciale, richieste particolari...',
            'contact.form.gdpr': 'Ho letto e accetto la <a href="#">privacy policy</a> e autorizzo il trattamento dei miei dati personali ai sensi del GDPR 679/2016.',
            'contact.form.submit': 'Invia richiesta',
            'contact.form.reply': 'Conferma garantita entro 1 ora',
            'contact.form.demoAlert': 'Demo: nessuna prenotazione è stata inviata realmente.',
            'contact.form.opt.firstVisit': '2 persone',
            'contact.form.opt.hygiene': '3–4 persone',
            'contact.form.opt.implant': '5–6 persone',
            'contact.form.opt.invisalign': '7–10 persone',
            'contact.form.opt.whitening': 'Più di 10 persone',
            'contact.form.opt.other': 'Evento privato',

            /* AI Explain */
            'ai.eyebrow': 'Assistente AI · sempre attivo',
            'ai.title': 'Il maître che non dorme mai',
            'ai.lead': 'Verifica disponibilità, scopri il menù del giorno e prenota il tuo tavolo in qualsiasi momento — anche a ristorante chiuso.',
            'ai.chat.name': 'Marco · Assistente AI',
            'ai.chat.status': 'Online ora',
            'ai.chat.1': "Buongiorno! Sono Marco, l'assistente della Trattoria del Mare. Come posso aiutarti?",
            'ai.chat.2': 'Avete un tavolo per 2 sabato sera?',
            'ai.chat.3': "Sabato alle 20:30 abbiamo disponibilità in terrazza! Vuoi che prenoti per 2 persone? Posso anche suggerirti il menù degustazione di pesce.",
            'ai.side.eyebrow': 'Come funziona',
            'ai.side.title': 'Chiedi. Scegli. Prenota.',
            'ai.side.lead': 'Il nostro assistente AI conosce il menù, i vini in carta, gli allergeni e la disponibilità dei tavoli. Puoi parlargli a voce o scrivere.',
            'ai.feat.1': '<strong>Menù e allergeni</strong> in tempo reale, per ogni piatto.',
            'ai.feat.2': '<strong>Disponibile 24/7</strong> — prenota anche fuori orario di servizio.',
            'ai.feat.3': "<strong>Prenotazioni assistite</strong>: sceglie l'orario e il tavolo giusto per te.",
            'ai.feat.4': '<strong>Consigli sui vini</strong>: abbinamenti su misura per il tuo menù.',
            'ai.cta.title': 'Inizia la conversazione',
            'ai.cta.desc': "Clicca qui o sull'icona in basso a destra ↓",

            /* Footer */
            'footer.tagline': 'Cucina di mare siciliana',
            'footer.desc': 'Dal 1987 portiamo in tavola il vero sapore del mare di Sicilia, con passione e materie prime del territorio.',
            'footer.services': 'Menù',
            'footer.links': 'Link utili',
            'footer.contacts': 'Contatti',
            'footer.legal': 'Trattoria del Mare S.r.l. · P.IVA 02345678901 · REA CT-234567<br>Via del Porto 45, 95121 Catania · © 2026 Tutti i diritti riservati',
            'footer.privacy': 'Privacy Policy',
            'footer.cookie': 'Cookie Policy',
            'footer.notes': 'Note legali',
            'footer.rates': 'Allergeni',

            /* Cookie */
            'cookie.title': '🍪 Utilizziamo i cookie',
            'cookie.desc': 'Utilizziamo cookie tecnici e di analytics per migliorare la tua esperienza. Puoi accettare, rifiutare o personalizzare la tua scelta.',
            'cookie.accept': 'Accetta tutti',
            'cookie.essential': 'Solo essenziali',

            'mobile.call': 'Prenota ora'
        },

        en: {
            /* Meta */
            'meta.title': 'Trattoria del Mare · Seafood Restaurant in Catania',
            'meta.description': 'Trattoria del Mare — Sicilian seafood cuisine in Catania. Catch of the day, local produce, curated wine cellar. Book your table: +39 095 111 22 33.',
            'meta.og.locale': 'en_US',

            /* Topbar */
            'topbar.hours': 'Tue–Sun 12:30–15:00 · 19:30–23:30 · Mon closed',
            'topbar.patientArea': 'Gift card',
            'topbar.langLabel': 'Language',
            'topbar.backPortfolio': 'Back to portfolio',

            /* Nav */
            'nav.services': 'Experience',
            'nav.about': 'About',
            'nav.team': 'The Chef',
            'nav.pricing': 'Menu',
            'nav.reviews': 'Reviews',
            'nav.faq': 'FAQ',
            'nav.ai': 'AI Assistant',
            'nav.contact': 'Book',
            'nav.callNow': 'Book a Table',
            'nav.skipTo': 'Skip to main content',
            'nav.brand.sub': 'Seafood cuisine · since 1987',
            'nav.openMenu': 'Open menu',

            /* Hero */
            'hero.badge': 'Catch of the day · Book your table',
            'hero.title.part1': 'The real',
            'hero.title.accent': 'taste of the sea',
            'hero.title.part2': 'in the heart of Catania.',
            'hero.lead': "Since 1987 we bring to the table the catch of the Gulf of Catania, local produce and traditional Sicilian recipes revisited with care. An authentic experience, just steps from the sea.",
            'hero.cta.call': 'Book +39 095 111 22 33',
            'hero.cta.book': 'Book Online',
            'hero.aiCta': 'Prefer to type? Ask our AI assistant about availability and menu',
            'hero.trust.years': 'Years of<br>tradition',
            'hero.trust.patients': 'Guests<br>each year',
            'hero.trust.reviews': '512 Google<br>reviews',
            'hero.float.security.title': 'Fresh catch',
            'hero.float.security.desc': 'Delivered every morning',
            'hero.float.warranty.title': 'Curated cellar',
            'hero.float.warranty.desc': 'Over 120 labels',

            /* AI Lane (unused) */
            'lane.badge': 'AI Assistant · Online',
            'lane.title': 'Your virtual assistant is here',
            'lane.desc': 'Ask about availability, menu or allergens. We answer 24/7.',
            'lane.hint': 'Click the icon below',

            /* Trust bar */
            'trust.label': 'Awards',

            /* Experience */
            'services.eyebrow': 'Our experience',
            'services.title': 'Much more than a dinner',
            'services.lead': 'Every dish tells the story of the Sicilian sea: selected produce, respectful cooking and service that makes you feel at home.',
            'services.more': 'Learn more',
            'services.igiene.title': 'Catch of the Day',
            'services.igiene.desc': 'Fresh fish selected every morning at the Catania fish market.',
            'services.implant.title': 'Traditional Cuisine',
            'services.implant.desc': 'Sicilian seafood recipes handed down and reinterpreted by our chef.',
            'services.ortho.title': 'Wine Cellar',
            'services.ortho.desc': 'Over 120 Sicilian and national labels, with recommended pairings.',
            'services.esthetic.title': 'Seaside Terrace',
            'services.esthetic.desc': 'Candlelit dinner on our terrace overlooking the gulf.',
            'services.pedo.title': 'Private Events',
            'services.pedo.desc': 'Ceremonies, birthdays and corporate dinners with custom menus.',
            'services.3d.title': 'Tasting Menu',
            'services.3d.desc': 'A 6-course journey to discover the best of our kitchen.',

            /* Call banner 1 */
            'call1.title': 'The best tables go fast',
            'call1.desc': 'Secure your spot for an unforgettable dinner. Book today — open Tuesday to Sunday.',

            /* About */
            'about.eyebrow': 'About us',
            'about.title': 'One family, one passion for the sea.',
            'about.p1': "Since 1987 the Marino family has welcomed its guests with the same passion as always: bringing the true taste of the Sicilian sea to the table, in a warm and welcoming setting steps from the harbour.",
            'about.p2.prefix': 'Our',
            'about.p2.strong': 'chef Salvatore Marino',
            'about.p2.rest': ", second generation, blends the tradition of Sicilian seafood cuisine with a contemporary touch, celebrating every local ingredient.",
            'about.stat.specialists': 'Dishes on the menu',
            'about.stat.patients': 'Happy guests',
            'about.stat.success': 'Local products',
            'about.visualBadge': 'Cosy dining room',

            /* Team (Chef) */
            'team.eyebrow': 'The brigade',
            'team.title': 'Who\'s in the kitchen',
            'team.lead': 'A close-knit team that puts passion and skill into every dish that reaches your table.',
            'team.rossi.role': 'Chef & Patron',
            'team.rossi.spec': 'Sicilian seafood cuisine. Over 30 years of experience at the stove.',
            'team.bianchi.role': 'Sous Chef',
            'team.bianchi.spec': 'Specialist in raw fish and traditional first courses.',
            'team.costa.role': 'Pastry Chef',
            'team.costa.spec': 'Artisan Sicilian desserts: cannoli, cassata and semifreddo.',
            'team.ferrara.role': 'Sommelier',
            'team.ferrara.spec': 'Curates the cellar and recommends the perfect wine pairings.',

            /* Gallery */
            'gallery.eyebrow': 'Our kitchen',
            'gallery.title': 'The specialities that reach your table',
            'gallery.lead': 'A taste of what awaits you: seafood dishes prepared daily with the fresh catch of the Gulf of Catania.',
            'gallery.1.cap': 'Raw seafood',
            'gallery.2.cap': 'Seafood spaghetti',
            'gallery.3.cap': 'Grilled catch',
            'gallery.4.cap': 'Starters of the day',
            'gallery.5.cap': 'Our dining room',
            'gallery.6.cap': 'Sicilian desserts',

            /* Menu */
            'pricing.eyebrow': 'Our menu',
            'pricing.title': 'From the sea to the table',
            'pricing.lead': 'A selection of our dishes. The menu changes with the season and the catch of the day. Ask our staff for today\'s specials.',
            'pricing.col.service': 'Dish',
            'pricing.col.description': 'Description',
            'pricing.col.price': 'Price',
            'pricing.free': 'Seasonal',
            'pricing.cat1.title': 'Seafood Starters',
            'pricing.cat1.sub': 'To begin, the best of our gulf',
            'pricing.cat2.title': 'First Courses',
            'pricing.cat2.sub': 'Fresh pasta and seafood risotto',
            'pricing.cat3.title': 'Fish Main Courses',
            'pricing.cat3.sub': 'The catch of the day, cooked with care',
            'pricing.cat4.title': 'Desserts & Cellar',
            'pricing.cat4.sub': 'Sicilian desserts and a wine selection',
            'pricing.cta.title': 'Want to book a table?',
            'pricing.cta.desc': 'We confirm availability within minutes. Tasting menu on request.',
            'pricing.cta.btn': 'Book Now',
            /* Menu rows */
            'p.firstVisit.n': "Fisherman's platter",
            'p.firstVisit.d': 'Tasting of raw seafood, red prawns and oysters.',
            'p.hygiene.n': 'Octopus salad',
            'p.hygiene.d': 'Tender octopus, potatoes, taggiasca olives and crunchy celery.',
            'p.whitening.n': 'Mussels & clams',
            'p.whitening.d': 'Sautéed shellfish with garlic croutons.',
            'p.sealing.n': 'Marinated anchovies',
            'p.sealing.d': 'Fresh anchovies marinated in Sicilian citrus.',
            'p.filling.n': 'Fried "paranza"',
            'p.filling.d': 'Crispy fried mixed fish from the gulf.',
            'p.endo.n': 'Swordfish carpaccio',
            'p.endo.d': 'Smoked swordfish with rocket and grana cheese.',
            'p.extSimple.n': 'Spaghetti with clams',
            'p.extSimple.d': 'Gragnano spaghetti with clams and bottarga.',
            'p.extWisdom.n': 'Seafood risotto',
            'p.extWisdom.d': 'Creamy risotto with shellfish and saffron.',
            'p.implant.n': 'Lobster linguine',
            'p.implant.d': 'Linguine with fresh lobster and cherry tomatoes.',
            'p.crownImp.n': 'Pasta with sardines',
            'p.crownImp.d': 'A Sicilian classic: sardines, wild fennel and pine nuts.',
            'p.allOn4.n': 'Fish couscous',
            'p.allOn4.d': 'Trapani-style couscous with mixed fish soup.',
            'p.sinusLift.n': 'Prawn & pistachio paccheri',
            'p.sinusLift.d': 'Paccheri with red prawns and Bronte pistachio crumble.',
            'p.orthoConsult.n': 'Mixed grilled seafood',
            'p.orthoConsult.d': 'A selection of grilled fish and shellfish.',
            'p.mobile.n': 'Baked fish of the day',
            'p.mobile.d': 'Fresh catch baked with potatoes and herbs (per kg).',
            'p.fixed.n': 'Seared tuna',
            'p.fixed.d': 'Red tuna fillet in sesame crust, seasonal vegetables.',
            'p.invisalign.n': 'Swordfish "alla ghiotta"',
            'p.invisalign.d': 'Braised swordfish with capers, olives and tomato.',
            'p.retainer.n': 'Grilled king prawns',
            'p.retainer.d': 'Fresh king prawns grilled with citrus oil.',
            'p.crown.n': 'Sicilian cannolo',
            'p.crown.d': 'Crunchy shell filled with fresh sheep ricotta and pistachio.',
            'p.bridge.n': 'Sicilian cassata',
            'p.bridge.d': 'The symbol dessert of Sicily, with ricotta and marzipan.',
            'p.veneer.n': 'Pistachio semifreddo',
            'p.veneer.d': 'Artisan semifreddo with Bronte PDO pistachio.',
            'p.denture.n': 'Etna Bianco DOC',
            'p.denture.d': 'Pure Carricante, mineral and fresh (glass / bottle).',
            'p.partialD.n': "Nero d'Avola DOC",
            'p.partialD.d': 'Full-bodied Sicilian red (glass / bottle).',
            'p.bite.n': 'Passito di Pantelleria',
            'p.bite.d': 'Sweet, aromatic dessert wine (glass).',

            /* AI Mid banner */
            'aiMid.title': 'Questions about the menu or allergens?',
            'aiMid.desc': 'Ask our AI assistant: it tells you what\'s in each dish, the wine pairings and checks table availability in real time.',
            'aiMid.btn': 'Chat with the AI',

            /* Testimonials */
            'test.eyebrow': 'What our guests say',
            'test.title': '4.8 stars on 512 Google reviews',
            'test.lead': 'The satisfaction of those who sit at our table is the recipe for our success.',
            'test.1.text': 'Super fresh fish and impeccable service. The spaghetti with clams are the best I have ever had. We will definitely be back!',
            'test.1.meta': 'Romantic dinner · May 2026',
            'test.2.text': "Stunning location with sea view. The tasting menu is worth every cent, and the sommelier recommended a perfect pairing.",
            'test.2.meta': 'Anniversary · Apr 2026',
            'test.3.text': 'We celebrated my mother\'s birthday. Lovely staff, spectacular homemade desserts. A 10 out of 10 experience.',
            'test.3.meta': 'Family celebration · Mar 2026',

            /* FAQ */
            'faq.eyebrow': 'Frequently asked questions',
            'faq.title': 'Everything you want to know',
            'faq.1.q': 'Do I need to book?',
            'faq.1.a': 'We always recommend booking, especially at weekends and on the terrace. You can book by phone, online or by asking our AI assistant.',
            'faq.2.q': 'Do you have options for intolerances and allergies?',
            'faq.2.a': 'Yes. We offer <strong>gluten-free options</strong> and adapt many dishes for intolerances. Let us know when booking or ask our staff about the allergens in each dish.',
            'faq.3.q': 'Is the menu suitable for those who don\'t eat fish?',
            'faq.3.a': "Of course. Alongside our seafood specialities, we offer <strong>meat dishes and vegetarian options</strong> prepared with the same care.",
            'faq.4.q': 'Do you organize events and ceremonies?',
            'faq.4.a': 'Yes, we organize ceremonies, birthdays and corporate dinners with custom menus. Contact us for a dedicated quote.',
            'faq.5.q': 'Is there parking?',
            'faq.5.a': 'We have <strong>partner parking</strong> 50 metres from the restaurant. Valet service is also available on weekends on request.',
            'faq.6.q': 'Do you accept large groups?',
            'faq.6.a': 'Yes, we welcome groups of up to 60 people. For groups over 10 we offer set menus. Book in advance to secure your spot.',

            /* Call banner 2 */
            'call2.title': 'Your table is waiting',
            'call2.desc': 'Call us now and book your evening by the sea. A real person answers right away.',

            /* Contact */
            'contact.eyebrow': 'Book',
            'contact.title': 'Book your table',
            'contact.lead': 'Fill in the form or call us directly. We confirm your booking within one hour.',
            'contact.where': 'Where we are',
            'contact.addressL': 'Address',
            'contact.address': 'Via del Porto 45, 95121 Catania (CT), Italy',
            'contact.phoneL': 'Phone',
            'contact.emailL': 'Email',
            'contact.hoursL': 'Opening hours',
            'contact.hoursV': 'Tue–Sun 12:30–15:00 · 19:30–23:30<br>Closed on Monday',
            'contact.mapTitle': 'Via del Porto 45, Catania',
            'contact.mapDesc': 'On the seafront, 2 min from the harbour · Partner parking 50 m away',
            'contact.form.title': 'Request a booking',
            'contact.form.first': 'First name',
            'contact.form.last': 'Last name',
            'contact.form.phone': 'Phone',
            'contact.form.email': 'Email',
            'contact.form.serviceL': 'Number of people',
            'contact.form.messageL': 'Notes (optional)',
            'contact.form.messageP': 'Allergies, special occasion, particular requests...',
            'contact.form.gdpr': 'I have read and accept the <a href="#">privacy policy</a> and authorize the processing of my personal data pursuant to GDPR 679/2016.',
            'contact.form.submit': 'Send request',
            'contact.form.reply': 'Confirmation guaranteed within 1 hour',
            'contact.form.demoAlert': 'Demo: no booking was actually sent.',
            'contact.form.opt.firstVisit': '2 people',
            'contact.form.opt.hygiene': '3–4 people',
            'contact.form.opt.implant': '5–6 people',
            'contact.form.opt.invisalign': '7–10 people',
            'contact.form.opt.whitening': 'More than 10 people',
            'contact.form.opt.other': 'Private event',

            /* AI Explain */
            'ai.eyebrow': 'AI Assistant · always on',
            'ai.title': 'The maître that never sleeps',
            'ai.lead': 'Check availability, discover the daily menu and book your table anytime — even when the restaurant is closed.',
            'ai.chat.name': 'Marco · AI Assistant',
            'ai.chat.status': 'Online now',
            'ai.chat.1': "Good morning! I'm Marco, the assistant at Trattoria del Mare. How can I help you?",
            'ai.chat.2': 'Do you have a table for 2 on Saturday night?',
            'ai.chat.3': "On Saturday at 8:30 pm we have availability on the terrace! Shall I book for 2? I can also suggest our seafood tasting menu.",
            'ai.side.eyebrow': 'How it works',
            'ai.side.title': 'Ask. Choose. Book.',
            'ai.side.lead': 'Our AI assistant knows the menu, the wine list, the allergens and table availability. You can talk to it by voice or type.',
            'ai.feat.1': '<strong>Menu and allergens</strong> in real time, for every dish.',
            'ai.feat.2': '<strong>Available 24/7</strong> — book even outside service hours.',
            'ai.feat.3': "<strong>Assisted booking</strong>: it picks the right time and table for you.",
            'ai.feat.4': '<strong>Wine advice</strong>: tailored pairings for your menu.',
            'ai.cta.title': 'Start the conversation',
            'ai.cta.desc': 'Click here or on the icon at the bottom-right ↓',

            /* Footer */
            'footer.tagline': 'Sicilian seafood cuisine',
            'footer.desc': 'Since 1987 we bring the true taste of the Sicilian sea to the table, with passion and local produce.',
            'footer.services': 'Menu',
            'footer.links': 'Useful links',
            'footer.contacts': 'Contact',
            'footer.legal': 'Trattoria del Mare S.r.l. · VAT 02345678901 · REA CT-234567<br>Via del Porto 45, 95121 Catania · © 2026 All rights reserved',
            'footer.privacy': 'Privacy Policy',
            'footer.cookie': 'Cookie Policy',
            'footer.notes': 'Legal notes',
            'footer.rates': 'Allergens',

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

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = table[key];
            if (val != null) el.innerHTML = val;
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s && s.trim());
                if (!attr || !key) return;
                const val = table[key];
                if (val != null) el.setAttribute(attr, val.replace(/<[^>]*>/g, ''));
            });
        });

        document.documentElement.setAttribute('lang', lang);
        const title = table['meta.title'];
        if (title) document.title = title;
        const md = document.querySelector('meta[name="description"]');
        if (md && table['meta.description']) md.setAttribute('content', table['meta.description']);
        const ogl = document.querySelector('meta[property="og:locale"]');
        if (ogl && table['meta.og.locale']) ogl.setAttribute('content', table['meta.og.locale']);

        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang-btn') === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    window.__setLang = function (lang) {
        if (!SUPPORTED.includes(lang)) return;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
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
