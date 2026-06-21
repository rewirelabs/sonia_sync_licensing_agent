# SonIA — Brief per Claude Design

> Come si usa: incolla **prima** il *Master context* (una volta). Poi lancia i prompt 1→6 in sequenza, uno per board, correggendo a voce tra l'uno e l'altro. Dark-only. Output jury-facing (hackathon internazionale → label in EN, dati multilingua reali).

---

## ⬛ MASTER CONTEXT (incolla per primo)

Sto costruendo il sistema visivo di **SonIA**, un agente per sync licensing musicale: l'utente (un music supervisor) descrive una scena/brief e SonIA restituisce una shortlist di brani con la **finestra ottimale di ~30 secondi** già individuata. La feature hero è il **Section Aligner**: incrocia i testi sincronizzati (Musixmatch) con le curve emotive del brano (Cyanite) per trovare quella finestra.

**Direzione di design — una regola sopra tutte: "il dato è la decorazione".**
Tutto ciò che a schermo è colorato o animato deriva da un segnale reale (curva emotiva, mood del testo, match score, stato brand-safety). Niente gradient o accenti inventati per atmosfera. Il telaio è anthracite Rewire, quieto e disciplinato. La firma di SonIA vive in tre soli elementi: lo **spettro emotivo** (gradiente che mappa l'intensità della curva), il **mark a forma d'onda**, e il **Section Aligner**. Registro: engineering-grade, strumento da professionista — non creative-agency, non chatbot carino.

**Persona SonIA**: una supervisor musicale esperta. Concisa, competente, anticipa. Non entusiastica, niente emoji, niente "felice di aiutarti".

**Palette (dark-only)**
- Fondo: `#14161B` base · `#1C1F26` superfici · `#242832` elevato · bordi `#2E333D`/`#3A4150`
- Testo: `#F4F5F7` primario · `#A6ADB8` secondario · `#6B7280` muted
- Azione (SOLO CTA/stati attivi): arancione `#FF6A2C` (hover `#FF7E47`)
- Micro-accento (focus, dettagli tecnici, pochissimo): cyan `#2DD4BF`
- **Spettro emotivo** (intensità bassa→alta): `#4C6EF5` calm → `#2DD4BF` mellow → `#FACC15` warm → `#FF6A2C` energetic → `#F0386B` intense
- Brand-safety (mai colore da solo, sempre icona+label): clear `#34D399` · review `#FBBF24` · block `#F0386B`

**Tipografia**
- Display/heading: **Space Grotesk** (geometrico, tecnico)
- Body/UI: **Inter**
- Dati/numeri-misura (timestamp, durate, finestre, score): **JetBrains Mono**

**Raggi**: contenuti (6–10px). Il pill (999px) è riservato solo alle bolle conversazionali di SonIA.

Conferma di aver capito la direzione, poi aspetta i prompt board per board.

---

## 1 — Brand board / foundations
Crea una board di fondazione: il **mark di SonIA** come forma d'onda che funge da firma audio, in quattro stati (idle = baseline piatta, listening, thinking, speaking). Accanto: la palette in uso, la scala tipografica (Space Grotesk display + Inter body + JetBrains Mono data) con esempi reali, e una campionatura dello **spettro emotivo** come gradiente continuo. Tutto su fondo `#14161B`.

## 2 — Component language
Su un'unica board, il vocabolario dei componenti: bottone primario (arancione), secondario ghost, terziario testo; **chip di mood** (fill colorato a bassa opacità + testo/bordo pieni, un hue per categoria); **badge brand-safety** nei tre stati con icona+label; input e select con focus ring cyan; **match ring** (anello 0–100, gradiente cyan→arancione); e una **track card** che li assembla (artwork, titolo in Space Grotesk, artista/durata/lingua in mono, mood chips, match ring, badge safety, una mini-sparkline della finestra).

## 3 — Section Aligner (HERO — spendici la cura maggiore)
La schermata intera del Section Aligner. Timeline orizzontale per l'intera durata del brano: la **curva emotiva** come area riempita con il gradiente dello spettro (più alta la curva = colori più caldi/intensi); i **testi sincronizzati** segnati ai loro istanti; la **finestra ottimale di 30s** incorniciata da un bracket arancione con label tempo in mono (`01:12–01:42`) e una riga di motivazione di SonIA. Aggiungi uno scrubber in hover che mostra istante, intensità e verso corrente. È la schermata che la giuria deve ricordare: deve rendere visibile l'incrocio testo×emozione.

## 4 — Shortlist
La vista risultati: il brief strutturato in alto (chip editabili: mood, energia, durata, lingua, brand-safety), sotto una lista di **track card** ordinate per match score. Filtri rapidi. Da ogni card si apre il Section Aligner.

## 5 — Brief composer
Il punto d'ingresso: campo dove il supervisor descrive la scena; SonIA rilancia l'interpretazione **strutturata** come chip editabili. Mostra la presenza di SonIA (mark a onda) e un esempio del suo microcopy conciso. Empty state incluso ("Descrivi la scena. Mood, energia, durata, lingua: SonIA fa il resto.").

## 6 — App shell
Assembla il layout completo: rail sinistro (SonIA + storico brief), canvas centrale (Brief → Shortlist → Aligner), context panel destro (dettaglio brano: mood, metadata, brand-safety). Densità alta, da strumento pro. Mostra come collassa su mobile.

---

*Nota anti-drift: il documento `SonIA_Design_System.md` e `sonia-tokens.css` restano il canone. Se in Design emerge un colore/scelta nuova che ti convince, aggiornala nel md così il codice di Gianma e il visuale non divergono.*
