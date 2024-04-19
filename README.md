# Docker Workshop

## Overview

Auf diesem Branch schauen wir uns an, wie wir in der Dockerfile der Source Code kompilieren können.

<button>[< Zurück zu: Kein Build in Dockerfile](https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop/-/tree/step-1)</button> <button>[Weiter zu: Multi Step Build in Dockerfile >](https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop/-/tree/step-3)</button>

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

