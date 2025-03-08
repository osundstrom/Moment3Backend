# Dt201G - Moment 3

## Info
Uppgiften använder sig av MongoDB som databas, den är uppladdad via Render. Då det används Render både för funktioner vid inlogg och hämta innehåll till den (hemliga sidan) så kan det ta en stund då Render går ner i viloläge då den ej används. 

I databasen finns det två collection som ser ut enligt nedan.
 
### Users

| id   | username    | password    | account_created   | __v  | 
| ---- | -------------- | ---------- | ---------- | -------- |
| 1  | Användarnamn  | Lösenord   | 2021-01-01 T 15:05:40     | 0 |

### Articles

| id   | title    | description    | content  | author |  post_created  |  image  | __v  | 
| ---- | -------------- | ---------- | ---------- | -------- |  --------  |  --------  | --------  | 
| 1  | Titel  | Kort beskrivning   | Längre artikel  | Författare | 2021-01-01 T 15:05:40  |   bild(sträng) |  0 | 



## Användning
 Hur man användet det:

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| GET   | /article    | Hämtar datan   | 
| POST   | /article    | Registrerar en ny artikel, funkar endast då man är inloggad   | 
| PUT   | /article:id    | Ändrar en artikel baserat på id, funkar endast då man är inloggad | 
| DELETE   | /article:id    | Raderar en artikel baserat på id, funkar endast då man är inloggad | 
| POST   | /register    | Registrerar ny användare | 
| POST   | /login    | Loggar in med en befintlig användare | 

