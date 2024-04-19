# Docker Workshop

## Overview

Auf diesem Branch schauen wir uns an, wie wir Multi Step Dockerfiles nutzen können (auch Multi Stage genannt)

<button>[< Zurück zu: Build Step in Dockerfile](https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop/-/tree/step-2)</button> <button>[Weiter zu: Docker Compose >](https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop/-/tree/step-4)</button>

## Beispiel Server

Für dieses Projekt wir ein NodeJS Server als Beispiel Anwendung genutzt. Der Webserver ist unter http://localhost:3000/ aufrufbar.

## Locales Setup

Hierzu muss NodeJs und npm installiert werden

### Development SetUp

```bash
git clone https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop.git
npm install
npm run start:dev
```

### Production Setup

```bash
git clone https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop.git
npm install
npm run build
npm run start:prod
```

