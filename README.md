# Docker Workshop

## Overview

Auf diesem Branch schauen wir uns an, was es für Nachteile hat, wenn wir nicht den Source Code im Dockercontainer Build Step kompilieren.

<button>[Weiter zu: Build Step in Dockerfile >](https://gitlab.uni-ulm.de/softwaregrundprojekt/2023-2024/workshops/docker-workshop/-/tree/step-2)</button>

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

