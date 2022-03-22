# CodersCamp 2021 - Projekt Node.js

<div align="center">

[![Demo](https://img.shields.io/badge/-demo-green?logo=github)](https://coderscamp2021-hk-fullstack.herokuapp.com/api/)
[![Codecov](https://img.shields.io/codecov/c/github/CodersCamp2021-HK/CodersCamp2021.Project.Fullstack?logo=codecov)](https://app.codecov.io/gh/CodersCamp2021-HK/CodersCamp2021.Project.Fullstack)
[![Figma](https://img.shields.io/badge/-Figma-blueviolet?logo=figma)](https://www.figma.com/file/Cwxh4WHHLxBhhyxJQIgsI9/Project.Fullstack?node-id=10%3A13)
[![Figma](https://img.shields.io/badge/-figJam-violet?logo=figJam)](https://www.figma.com/file/51gzaCTbilz6X9r0PZxmhX/Project.Fullstack?node-id=0%3A1)

</div>

<br/>

<p>
🍲🍝🍜 <strong>JeszCoChcesz</strong> 🍲🍝🍜 catering skierowany do ludzi, którzy nie lubią, gdy narzuca im się wybory jedzeniowe, a jednocześnie dbają o zbilansowane odżywianie. Aplikacja wyliczy dla Ciebie wartości odżywcze Twoich posiłków, dzięki czemu będziesz mógł jeść ulubione dania przy jednoczesnym trzymaniu się wyznaczonej diety. Skomponuj swoje menu z dań z ulubionych restauracji, a my dostarczymy Ci zamówienie pod same drzwi. To także system partnerski zrzeszający najlepsze restauracje w Twoim mieście.</p>

<br/>
<br/>

## 🖥️ Użyte technologie

<br/>

### Główne:

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Docker](https://docs.docker.com/get-docker/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [NestJS](https://nestjs.com/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Swagger](https://swagger.io/tools/swaggerhub)

<br/>

### Pomocnicze:

- Yarn
- Jest
- ESLint
- VS Code
- Git
- GitHub
- Figma
- PassportJWT
- REST Client
  <br/>
  <br/>

## ⚙️ Instalacja projektu

<br/>

Do przygotowania środowiska dev użyliśmy m.in. [Dockera](https://docs.docker.com/get-docker/), więc zakładamy, że jest on wcześniej zainstalowany i skonfigurowany.
<br/>
<br/>

#### Instalacja i urochomienie projektu z wykorzystaniem `yarn`

```bash
yarn install
docker-compose up
```

Uruchomienie serwera developerskiego (aplikacja będzie dostępna pod http://localhost:4000/api):

```bash
yarn dev
```

Wygenerowanie plików produkcyjnych:

```bash
yarn build
```

<br/>

### Pozostałe komendy

Sprawdzenie projektu za pomocą [ESLint](https://eslint.org/):

```bash
yarn lint
```

Uruchomienie wszystkich testów:

```bash
yarn test
```

<br/>
<br/>

## Korzystanie z aplikacji

<br/>

Osoba niezalogowana ma dostęp do listy restauracji i dań. Ponadto dania i restauracje może filtrować na podstawie miasta, rodzaju kuchni, rodzaju posiłku i tagów.
Aby w pełni korzystać z aplikacji, należy założyć konto i się zalogować. Istnieje możliwość rejestracji jako restauracja partnerska (`Partner`) i zwykły użytkownik (`User`).

**`Partner` – restauracja partnerska**

1. Rejestruje się podając email oraz NIP i ustawiając hasło.

2. Po rejestracji i zalogowaniu uzupełnia profil (nazwa restauracji, opis, logo, tagi, adres(y), telefon).

3. Po uzupełnieniu profilu partner może dodawać dania (nazwa, opis dania, tagi, lista składników, alergeny, kaloryczność, wartości odżywcze).

4. Partner może edytować i usuwać dania.

**`User` - użytkownik**

1. Rejestruje się podając email i ustawiając hasło. Użytkownik otrzymuje wiadomość e-mail potwierdzającą rejestrację.

2. Po rejestracji i zalogowaniu może uzupełnić profil (imię, nazwisko, adres(y), nr telefonu, dane karty) lub zacząć kompletować zamówienie.

3. Użytkownik może dodawać dania i restauracje do ulubionych.

4. Zamawianie:

   4.1. Złożenie zamówienia jest możliwe po uzupełnieniu danych na profilu.

   4.2. Zamówienie składa się z posiłków rozplanowanych na kilka dni (docelowo 1-7 dni).

   4.3. Użytkownik ustala godzinę, o której codziennie będzie otrzymywał posiłki na dany dzień.

   4.4. Podczas dodawania dań użytkownik może spersonalizować posiłek poprzez usunięcie wybranych składników (wcześniej oznaczonych przez restaurację jako możliwe do usunięcia).

   4.5. Użytkownik otrzymuje wiadomość e-mail potwierdzającą złożenie zamówienia.

<br/>

## 📢 Wykonywanie zapytań / testowanie endpointów 📣

<br/>

### Swagger

Zbiór wszystkich dostępnych zapytań widocznych z poziomu przeglądarki.
<br/>

<figure>
    <img src="./docs/swagger.png" alt="">
    <figcaption>Przykładowy widok</figcaption>
</figure>

### REST Client

Rozszerzenie do VSCode, które pozwala na wykonywanie zapytań z poziomu edytora kodu.
<br/>

<figure>
    <img src="./docs/rest_client.png" alt="">
    <figcaption>Przykładowy widok</figcaption>
</figure>

<br/>
<br/>

## 👨‍💻 Autorzy 👩‍💻

<br/>

**Mentor**: [@htk4](https://github.com/htk4)

Scrum Master: [@mmejer](https://github.com/mmejer)

Project Manager: [@jskrajna](https://github.com/jskrajna)

Tech Lead: [@KamilDudek](https://github.com/KamilDudek)

Po trochę z każdej roli: [@tchojnacki](https://github.com/tchojnacki)
