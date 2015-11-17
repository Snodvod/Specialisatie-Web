# New web technology - Node.js

## Inleiding

### Wat is Node.js

Node.js is een platform dat gebaseerd is op Google's V8 Javascript engine. Een open source engine die javascript compileert naar machinetaal dmv C++. De engine optimaliseerd eerst de code enkele keren alvorens ze gecompileerd wordt. Node.js is een back-end taal die gebruikt maakt van javascript wat een zuivere front-end taal is. Ze kan dus als vervanging voor ander back-end talen worden gebruikt zoals bijvoorbeeld php.

Door het gebruik van javascript kunnen er asynchrone calls gemaakt worden. Hierdoor wordt de server en applicatie verder gerund als er zware functies of opdrachten worden uitgevoerd. Hierdoor is node.js een heel erg lichte en snel werkende back-end oplossing.

### Modules

Node.js werkt met modules, de code van deze modules moet geïmporteerd worden door middel van de `require()` functie. In combinatie met het package.json file waar eventuele extra benodigde modules in kunnen worden gerequired, en npm install kunnen alle modules worden geïnstalleerd.

### Http

De basis van een applicatie in node is de http module. Deze module geeft een object terug waarmee de server kan worden opgestart. Dit gebeurt uiteraard eerst door de http module te requiren `var http = require('http');` en daarna door de functie `createServer` te callen van deze module. Bij elke HTTP request wordt er een request en response object gemaakt waarmee je respectievelijk data kan op vragen en een teruggeven naar de applicatie. Verdere uitleg hierover volgt in de voorbeelden.

## Eerste applicatie

Op basis van het boek 'The Node Beginner Book' heb ik een simpele applicatie gemaakt om de basis van Node onder de knie te krijgen. Het betreft routing en een file upload die gestored wordt in een locale map.

### server.js

Dit is de core van de applicatie, de server wordt hier opgestart en via de module 'url' kan de juiste pathname worden geparsed om te gebruiken in de routing.

### Algemene flow

Wat gebeurt er als de gebruiker `node index.js` invoert in de CLI... index.js required alle lokale bestanden die nodig zijn en maakt een handle object met key value pairs waarmee in de router.js via de pathname van de url de juiste requesthandler wordt gecalled. Het array 'handle' geeft dus functies mee als value aan server.js. Dit gebeurt onderaan in `server.start` waarbij ook de route functie van router wordt meegegeven aan de server. In de server start functie zien we dus deze 2 argumenten terugkomen.

De server haalt het juiste pathname op en called dan de functie `route(handle, pathname, response, request);` die is meegeven via index. onderaan `exports.start = start` zorgt ervoor dat deze wanneer deze 'server' module gerequired wordt en er een functie van wordt gebruikt, dat de juist functie gecalled wordt.

In de router wordt gecheckt of de meegegeven handle een functie is. Is dit niet zo, wat wil zeggen dat de pathname die ingevoerd is niet terug te vinden is in het handle object, dan wordt er een 404 response gereturned. Zo wel dan wordt de juist functie in requesthandler gecalled.

Het laatste stuk van deze applicatie is dus de requestHandlers.js. De modules 'fs' en 'formidable' worden gerequired om later te gebruiken bij file upload. De functie `start` spreekt voor zich, een simpel upload form als response. De functie `upload` is iets complexer. De 'formidable' en 'fs' module worden hier gebruikt, formidable zorgt voor een parsing van de request, wat in dit geval een afbeelding is die geupload wordt, en als 2e argument wordt er een anonieme functie gecalled. De 'fs' module wordt gebruikt om het bestand te hernoemen naar de gewenste bestandsnaam. De anonieme functie daar wordt gecalled om een eventuele windows error op te vangen wanneer er al een bestand bestaat in de directory met die naam.

Dan wordt er een response geschreven waarbij de `/show` handler wordt aangeroepen in de image tag. Hierdoor wordt dan de show functie onderaan gecalled die via 'fs' het bestand inleest en de afbeelding toont of een error geeft.

## Chatroom applicatie

### Socket.io

Socket.io is een library voor javascript die realtime communicatie in 2 richtingen tussen web clients en servers mogelijk maakt. Het bestaat uit een client-side library die in de browser runt, en de server-side library die op node draait. Het is net als node een event-driven library. Socket.io zoals de naam doet vermoeden maakt gebruikt van het websocket protocol en wordt voornamelijk gebruikt om gemakkelijk te broadcasten naar meerdere sockets maar kan bijvoorbeeld door middel van de 'Johnny Five' module gebruikt worden om arduino boards mee aan te sturen vanuit een web interface. Socket.io maakt gebruik van event emitters en listeners waardoor er gemakkelijk van client naar server kan worden gecommuniceerd.

### Structuur

De applicatie bestaat uit een '/lib' folder met daarin 'chat_server.js' die alle socket.io server side logica bevat. De public folder bevat de html file en de client side socket.io logica in de '/javascripts' folder: chat.js en chat_ui.js.

### Werking

'Chat_server.js' heeft `exports.listen = function(server)` enzovoorts, deze anonieme functie zorgt ervoor dat eender wanneer er in de http server een `socket.emit` gebeurt, deze wordt opgevangen en gehandled. De helper functies die dit bestand verder bevat zijn deze handlers, ze bevatten allemaal een `socket.on()` functie. `Enkel assignGuestName` is een normale functie die doet wat ze zegt te doen. Langs de andere kant wordt er hier ook 4 keer een `socket.emit('nameResult')` gebruikt om een gewijzigde naam door te sturen naar de client side.

Aan de client side in 'chat.js' worden er bij het versturen van een message, veranderen van room en veranderen van nickname emits gedaan die zoals voorheen vermeld worden opgevangen in 'chat_server.js'. Als laatste is er chat_ui.js die zorgt voor de correcte weergave van de gestuurde messages en de user input correct processed. De functie `processUserInput` roept de juiste functie op van chat.js.

## Andere oefeningen

Verder heb ik nog enkele andere voorbeelden gemaakt die me interessant leken.