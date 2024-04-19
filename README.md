# How To Docker

In diesem Repo werden wir uns mit Docker beschäftigen. Wir werden uns ansehen, wie wir Dockerfiles schreiben, Images
bauen und Container starten.

## Übersicht

> [!TIP]
> Verschiedene Branches zeigen verschiedene Schritte, die wir durchgehen werden. Jeder Branch baut auf dem vorherigen
> auf.

1. [Einstieg](https://github.com/ValentinKolb/docker-demo/tree/main)
2. [Ausführen einer Anwendung in einem Dockercontainer](https://github.com/ValentinKolb/docker-demo/tree/step-1)
3. [Bauen einer Anwendung mit Docker](https://github.com/ValentinKolb/docker-demo/tree/step-2)
4. [Multi-Stage Builds](https://github.com/ValentinKolb/docker-demo/tree/step-3)

## Ausführen einer Anwendung in einem Dockercontainer

> [!NOTE]
> Jetzt wollen wir eine Anwendung in einem Dockercontainer ausführen. Dabei Kompilieren wir die Anwendung lokal und
> starten sie dann in einem Dockercontainer.

> [!TIP]
> Installiere [Node.js](https://nodejs.org/en/download), um die Anwendung lokal auszuführen.

Als Beispielanwendung verwenden wir eine einfache Node.js-Anwendung (Typescript).
Um dem Beispiel zu folgen, musst du keine Node.js-Kenntnisse oder Erfahrung mit Typescript haben.
Die Anwendung rendert eine einfache Webseite und bietet HTTP-Endpunkte
für das Abrufen von Umgebungsvariablen an.

### Ausführen der Anwendung lokal

Um die Anwendung lokal auszuführen, führe die folgenden Schritte aus:

1. Installieren Sie Node.js
2. Installieren Sie die Abhängigkeiten mit `npm install`
3. Starten Sie die Anwendung mit `npm start:dev`

```bash
npm install
npm run start:dev
```

### Lokales Kompilieren und Ausführen der Anwendung

Um die Anwendung zu kompilieren, führe die folgenden Schritte aus:

```bash
npm run build
npm run start:prod
```

### Ausführen der Anwendung in einem Dockercontainer

Um die Anwendung in einem Dockercontainer auszuführen, führe die folgenden Schritte aus:

1. Kompiliere die Anwendung mit `npm run build`
2. Baue das Dockerimage mit `docker build -t docker-demo .`
3. Starte den Dockercontainer mit `docker run -p 3000:3000 docker-demo`

```bash
npm run build
docker build -t docker-demo .
docker run -p 3000:3000 docker-demo
# Öffne http://localhost:3000 im Browser
```