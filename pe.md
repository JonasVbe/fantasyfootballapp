# Permanente evaluatie

**De applicatie gaat een fantasy voetbal spel zijn, waarbij een gebruiker een ploeg aanmaakt met spelers actief in de jupiler pro league.**

**De gebruiker kan zijn ploegnaam zelf kiezen**
**De gebruiker mag maximum 3 spelers van 1 bestaand team uit de jupiler pro league kiezen. (max. 3 spelers van royal antwerp bv.)**
**Elke speler heeft een bepaalde waarde, de gebruiker heeft een maximum bedrag om uit te geven aan zijn ploeg.**

**Een ploeg bestaat uit 15 spelers, waarvan 11 actieve spelers en 4 wisselspelers(de bank).** 
**Van deze 15 spelers zijn er 2 keepers, 5 verdedigers, 5 middenvelders en 3 aanvallers.**

**Er moeten per positie steeds minstens: 1 keeper, 3 verdedigers, 2 middenvelders en 1 aanvaller**
**En maximum 1 keeper, 5 verdedigers, 5 middenvelders en 3 aanvallers op het veld staan.**

**Per speeldag krijgt elke speler punten op basis van zijn prestaties in de wedstrijd. Als een speler niet speelt en nul punten heeft, wordt hij (automatisch) gewisseld met een speler op de bank de wel gespeeld heeft.**
**Als een speler nul punten heeft, maar wel heeft gespeeld, bv. door veel tegendoelpunten of kaarten, wordt deze speler niet gewisseld.**
**Één speler kan aangeduid worden als ploeg kapitein de punten van deze speler worden verdubbeld.**
**De gebruiker kan zijn ploeg aanpassen voor elke speeldag. En krijgt 1 transfer per week, als een gebruiker zijn transfer niet gebruikt kan deze opgespaard worden en heeft de speler de week erna 2 transfers, een speler kan steeds meer transfers doen, maar dit gaat ten kosten van minpunten op de komende speeldag.**

**De gebruiker speelt automatisch mee met een algemene league van waar alle gebruikers aan deelnemen. Dit is een punten league, waarbij de speler met de meeste verzamelde punten op de eerste plaats staat**
**Er is ook een mogelijkheid om zelf een competitie op te starten met vrienden, hierbij zal de aanmaker van de competitie de keuze hebben om een puntenleague zoals hierboven beschreven staat aan te maken of een traditionele league**

**Bij een traditionele league speelt elke gebruiker afwisselend tegen elkaar, in dit onderlinge duel zal de gebruiker met het meeste punten drie competitie punten, bij evenveel punten krijgt elke gebruiker in dit onderlinge duel 1 punt. (zoals bij echte voetbalmatchen.)**
**Bij een traditionele league is er een maximum van spelers die kunnen deelnemen (het totaal aantal speeldagen gedeeld door 2) als er een oneven aantal deelnemers is zal 1 ploeg toegevoegd worden aan de competitie die steeds het gemiddeld aantal punten van de speeldag haalt.**
**De volgorde van de onderlinge duels wordt bepaald bij het ingaan van de eerste speeldag, dit zal willekeurig gebeuren, maar elke deelnemer zal 1 keer tegen elkaar spelen voordat er opnieuw tegen eerdere tegenstanders wordt gespeeld.**


## Inloggen:
### Scherm 1: login
Login scherm met twee inputvelden gebruikersnaam en wachtwoord en 2 knoppen: login en register
### Scherm 2: register
Register scherm met 2 knoppen: register en back

## De Applicatie
Onderaan (voorlopig) 3 tabs: ploeg, kalender, statistieken 

Mogelijk uitbreiding met een tab voor instellingen (optioneel en tijdsafhankelijk)

## Tab ploeg:
Bovenaan naam van je ploeg en een titel met de komende speeldag nummer.

Daaronder drie tabs: opstelling, punten, transfers, competities
### Scherm 3: opstelling
Hier krijgt de gebruiker een overzicht van zijn spelers en kan hij zijn ploeg voor de komende speeldag aanpassen; actieve spelers en wisselspelers aanpassen en een kapitein aanduiden. 


Het systeem zorgt ervoor dat er steeds 11 spelers opgesteld zijn en dat de formatie klopt.
Steeds 1 keeper, minstens 3 verdedigers max 5, minstens 3 middenvelders max 5, minstens 1 aanvaller max 3.

De gebruiker zet ook zijn wisselspelers (veldspelers) in volgorde van voorkeur zetten, de eerste zal de gewisseld worden als er 1 actieve speler niet gespeeld heeft en de tweede als er 2 actieve spelers niet gespeeld hebben enz.

Er zal ook rekening gehouden worden met de minimum bezetting van elke positie. Bv. als de gebruiker maar 3 verdedigers opgesteld heeft, één van die verdedigers niet heeft gespeeld en een aanvaller is de eerste wisselspeler zal de verdediger gewisseld worden met de eerste verdediger op de bank.


### Scherm 4: punten
Hier krijgt de gebruiker een overzicht van de punten die zijn spelers behaald hebben in de vorige speeldag, er zal ook de mogelijkheid zijn om verder terug te kijken naar eerdere speeldagen. 
Het scherm zal lijken op het scherm van de opstelling met het verschil dat de gebruiker hier geen aanpassingen kan doen aan zijn ploeg kan maken.

### Scherm 5: transfers
Dit scherm zal weer lijken op de vorige schermen, maar als de gebruiker hier op een speler drukt kan hij deze verkopen en een andere speler uit de jupiler pro league met dezelfde positie kunnen aankopen. 

### Scherm 6: competities
Hier krijgt de gebruiker een overzicht van de competities waar hij aan deelneemt, de gebruiker kan hier ook een competitie id invoeren om deel te nemen aan een competitie.
Als de gebruiker op een competitie klikt zal hij naar een overzichtscherm van deze competitie.
### Scherm 6.1: competitie details
Hier krijgt de gebruiker een overzicht van de gekozen competitie met standen.
De gebruiker kan hier ook op een andere gebruiker klikken om de puntenpagina van diens ploeg te bekijken.

#### Bij een punten league
Zal de gebruiker een overzicht krijgen van de standen van de competitie. 
(met misschien mogelijkheid om te filteren op stand voor bepaalde maanden of speeldagen afzonderlijk afhankelijk van tijd)

#### bij een traditionele league
Zal de gebruiker die nieuwe tabs zien verschijnen met standen, wedstrijden en resultaten.
#### Scherm 6.2: standen
Zal de gebruiker een overzicht krijgen van de standen van de competitie. Inclusief aantal overwinningen, aantal gelijke spelen, aantal verloren wedstrijden, totale punten en competitiepunten.
#### Scherm 6.3: wedstrijden
Zal de gebruiker een overzicht krijgen van alle wedstrijden die zijn eigen ploeg speelt, van speeldag 1 tot en met de laatste speeldag.
Bij de afgelopen wedstrijden zal een score weergegeven worden van het onderlinge duel (behaalde punten tegenover behaalde punten tegenstander)
Voor de nog te komen wedstrijden zal de score nog blanco zijn. 
#### Scherm 6.4: resultaten
Zal de gebruiker een overzicht krijgen van alle resultaten van de onderlinge wedstrijden in zijn competitie van de afgelopen speeldag, en alle geplande wedstrijden in zijn competitie voor de komende speeldag.

## Tab kalender:
Bovenaan standaard de tile van de komende speeldag + nummer speeldag.
Met knoppen om naar de vorige speeldag te gaan of de volgende.
### Scherm 7: kalender inhoud
Hier krijgt een speler een overzicht van alle matchen die op de komende speeldag gespeeld worden. Maar dan van de echte ploegen.
Bv. Royal Antwerp - Club Brugge etc...
De speeldag die getoond wordt is steeds de eerstvolgende speeldag die nog niet volledig is afgewerkt. 
Een gebruiker kan echter met de bovenaan vernoemde knoppen naar eerdere of latere speeldagen navigeren. 
Als een wedstrijd gespeeld is wordt de score van de wedstrijd getoond.

## Tab statistieken:
### Scherm 8: statistieken
Hier krijgt de gebruiken een overzicht van allerlei statistieken, zoals bijvoorbeeld, maar niet gelimiteerd tot:
* Algemene rang van de gebruiker
* Totaal behaalde punten van de gebruiker
* Aantal gebruikers van de app.
* team id van de gebruiker
* of speeldagen afgelopen zijn en punten geconfirmeerd zijn
* hoogst behaalde punten door 1 gebruiker in de afgelopen speeldag
* speler die in de meeste teams voorkomt.
* spelers die deze speeldag het meeste punten behaald hebben.
* spelers die deze speeldag het vaakst aangekocht zijn.
* 
## Gebruikte plug-ins & online services
### Api's
Een voetbal api die gebruikt kan worden om details op de halen van ploegen spelers en wedstrijden.
Dit zal gebruikt worden om voetbal data van de echte ploegen op te halen in de echte wereld.
### Database
Er zal een database gebruikt moeten worden om alles wat met het spel, te maken heeft, gebruikers, teams, competities, speeldagen, wedstrijden, speler punten, etc... op te slaan.

### Plugins
Plugin om pushberichten te sturen bv 2 uur voor het verstrijken van de deadline voor de komende speeldag.

# Feedback

**Wordt verder aangevuld door jouw docent.**

