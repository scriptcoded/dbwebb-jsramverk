# Redovisning jsramverk

## Kraven

### Krav 1: Skriva ut PDF

Jag vet av erfarenhet att generera PDFer i Node.js är en ganska enkel uppgift.
Biblioteket `html-pdf` gör det enkelt att ta en HTML-sida med lite CSS och
konvertera till en PDF, och eftersom jag använt det tidigare med gott resultat
kände jag att det var ett uppenbart val. Eftersom jag valt att använda Tailwind
i frontenden, och gärna ville ha samma styling i min PDF, fick jag generera
CSS-filen från Tailwind manuellt och kopiera in denna i min backend. Det funkar
helt okej, men är långt från optimalt. Renderingen krävde lite extra Linux-paket
på servern, men Azure är lite bökigt, så kunde inte installera dessa på någon
schysst sätt automatiskt, så fick SSHa in och installera paketen manuellt. Det
är inte en jättebra lösning då en restart av servern gör att paketen
försvinner... Men men, det fungerar!

### Krav 2: Kommentarer

Jag började på kommentarsfunktionen, men stötte på en del patrull i TipTap.
Skulle nog kunna gräva lite djupare och testa lite andra metoder för att göra
custom extensions, men valde att hoppa över detta kravet.

### Krav 3: Maila inbjudan

Än en gång något jag gjort tidigare. SendGrid är min go-to när det gäller att
skicka mail, så att fixa templates och få in det i koden var enkelt. Det kluriga
var att hålla koll på invite tokens. Jag valde att lägga ett fält på min
document-modell, `invitationTokens`. Detta fält håller en lista med tokens som
kan genereras av någon med tillgång till dokumentet. Ett mail skickas sedan till
den inbjudne personen med en länk till registreringssidan. Token ligger i
query-parametrarna och skickas vidare till backenden när användaren registrerar
sig, och detta gör att användaren läggs till på det korrekta dokumentet. Token
tas sedan bort från dokumentet. Det finns ingen tidsgräns på hur länge en token
gäller, men vi kan väl lita på användarna... Right...?

### Krav 4: Code-mode

Denna hoppade jag över helt och hållet. Nog ingen galet stor insats, men har
lite tidsbrist, tyvärr.

### Krav 5: Testning

Blev inte världens enklaste kodbas att testa. Så hoppade detta också...

### Krav 6: Sälj in GraphQL

Lade denna i ett separat dokument då det är en del text:
https://github.com/scriptcoded/dbwebb-jsramverk/blob/main/graphql.md

## Allmänt om projektet

Det har varit ett ganska roligt projekt, och hade jag gett mig själv mer tid
hade det säkert varit ännu roligare. Projektet har känts lagom med tanke på vad
vi gjort i kursen, och det har kännt som en rimlig mängd uppgifter/krav. Det var
väldigt skönt att vi fick lov att bygga vidare på den applikation vi redan hade,
då att bygga en helt ny hade känns som dubbelt arbete som inte gett så mycket.
Det var också roligt att kraven lät en tänka utanför boxen, och att man fick
lära sig lite nya verktyg och trix såsom att generera PDFer och skicka mail. Bra
saker att kunna.

## Tankar om kursen

Detta har varit en riktigt rolig kurs. Jag är glad att vi fått lov att välja
ramverk själva, och att många av uppgifterna varit öppna för tolkning. Den nya
hemsidan har funkat väldigt bra, och känner att upplägget här varit enklare att
hänga med på än på dbwebb.se (även om jag skryter om hur coolt det är att allt
finns samlat där för mina vänner).

Jag läste att ni tidigare använt DigitalOcean, och förstår att no-code-lösningen
App Service känns smidigare än att tvinga folk att sätta upp Linuxservrar (bara
antar att det är så ni gjort det tidigare). Azure har varit riktigt klurigt att
arbeta med, och personligen känner jag att tom. AWS är enklare att arbeta i, och
det är inte direkt kännt för att vara enkelt. Verkar även som att många kursare
haft mycket strul med Azure. Ni vet redan säkert om det, men passar på att
nämna att DigitalOcean har släppt en egen variant av no-code deployments, App
Platform, som verkar vara likt det Azure erbjuder. Kanske kan vara värt att
titta på i framtiden. https://www.digitalocean.com/products/app-platform/

Summa summarum, bra kurs. Väldigt bra kurs. Är glad att man anammar det som är
hett just nu, och webbramverk är ju just det, jäkligt hett. 10/10 POJOS, would
recommend.
