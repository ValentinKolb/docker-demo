![How To Docker](assets/banner.png)

In diesem Repo werden wir uns mit Docker beschäftigen. Wir werden uns ansehen, warum wir Docker verwenden wollen, wie
wir Dockerfiles schreiben, Images bauen und Container starten.

Außerdem werden wir uns mit Docker Compose beschäftigen, und wie wir Docker Compose verwenden können, um schon während
der
Entwicklung die Anwendung in einem Dockercontainer auszuführen.

## Übersicht

> [!TIP]
> Wir werden uns Schritt für Schritt mit Docker beschäftigen. Jeder Schritt baut auf dem vorherigen auf.
> Für jeden Schritt gibt es einen eigenen Ordner, in dem sich ein Dockerfile befindet.

0. [Warum Docker?](#warum-docker)
1. [Einstieg - Dockerfile `./1-getting-started`](#einstieg)
2. [Ausführen einer Anwendung in einem Dockercontainer `./2-app-container`](#ausführen-der-anwendung-in-einem-dockercontainer)
3. [Bauen einer Anwendung mit Docker `./3-build-in-dockerfile`](#anwendung-mit-docker-bauen)
4. [Multi-Stage Builds `./4-multi-stage-builds`](#multi-stage-builds)
5. [Docker Compose `./5-docker-compose`, `./6-docker-compose-build`](#docker-compose)
6. [Docker Compose für Entwicklung `./7-docker-compose-dev`](#docker-compose-für-entwicklung)
7. [Traefik `./8-traefik`](#traefik)
8. [Docker Cheat Sheet](#docker-cheat-sheet)

Bei den Schritten wo wir eine Beispielanwendung verwenden, handelt es sich um eine einfache Node.js-Anwendung (Typescript).
Diese Anwendung liegt jeweils in den Ordnern in einem Unterordner (`sampleApp`, z.B. `./2-app-container/sampleApp`).

## Warum Docker?

> [!TIP]
> Docker ist eine Open-Source-Plattform und wurde ursprünglich von Google entwickelt um
> Anwendungen wie z.B. ihre Suchmaschine zu verteilt zu deployen.

### Wie ist eine Anwendung aufgebaut?

Hier sehen wir eine typische Anwendung. Sie besteht aus verschiedenen Komponenten, die zusammenarbeiten, um die
gewünschte Funktionalität zu erreichen.

![Anwendung](assets/application.png)

Der traditionelle Ansatz zur Bereitstellung einer Anwendung hat jedoch einige Herausforderungen:

- **Abhängigkeiten**: Die Anwendung benötigt bestimmte Abhängigkeiten, um zu funktionieren (z.B. Bibliotheken,
  Datenbanken).
- **Konfiguration**: Die Anwendung benötigt eine Konfiguration, um zu wissen, wie sie sich verhalten soll.
- **Umgebung**: Die Anwendung benötigt eine Umgebung, in der sie ausgeführt werden kann (z.B. Betriebssystem,
  Laufzeitumgebung).
- **Deployment**: Die Anwendung muss auf einem Server bereitgestellt werden, damit sie von Benutzern verwendet werden
  kann.
- **Skalierung**: Die Anwendung muss in der Lage sein, mit steigender Benutzerzahl umzugehen.
- **Wartung**: Die Anwendung muss gewartet werden, um sicherzustellen, dass sie weiterhin funktioniert.

### Wie kann Docker helfen?

> "We can solve any problem by introducing an extra level of indirection."
> - David Wheeler

> [!NOTE]
> In einem Docker Container können wir eine Anwendung und alle ihre Abhängigkeiten zusammenfassen.
> Dadurch wird die Anwendung portabel und kann überall ausgeführt werden, wo Docker installiert ist.

![Docker](assets/container.png)

Diesen Container können wir dann auf einem Server bereitstellen, um die Anwendung zu deployen.
Außerdem können wir dann auf demselben Server mehrere Container starten, um auch andere
Anwendungen zu deployen, ohne dass sie sich gegenseitig beeinflussen.

Auch andere Herausforderungen wie Skalierung und Wartung können mit Docker gelöst werden.

So können wir z.B. mit Docker Compose mehrere Container starten, die zusammenarbeiten, um die gewünschte Funktionalität
zu erreichen.
Außerdem können wir mit Docker Swarm oder Kubernetes Container auf mehreren Servern starten, um die Anwendung zu
skalieren.

Mit dem folgenden Befehl können wir einen Container starten:

```bash
$ docker run \
 -v /host/foo/file:/container/bar/file \
 –p 3000:5000 \
 —name name_of_container \
 tag_of_image
```

### Wie komme ich zu einem Docker Container?

> [!NOTE]
> Jeder Docker Container basiert auf einem Docker Image. Ein Image ist eine Art Vorlage, die verwendet wird, um einen
> Container zu erstellen.

Docker Images sind in Layern aufgebaut. Jeder Layer enthält eine Änderung am Dateisystem.
Wenn ein Container erstellt wird, werden diese Layer zusammengeführt, um das Dateisystem des Containers zu erstellen.

Diese Layer werden in einem Dockerfile definiert. Ein Dockerfile ist eine Textdatei, die die Schritte zum Erstellen
eines Docker Images beschreibt.

Außerdem können wir in einem Dockerfile auch Umgebungsvariablen, Argumente und Befehle definieren, die beim Starten des
Containers ausgeführt werden sollen.

Jedes Image basiert auf einem Basisimage. Das Basisimage enthält das Betriebssystem und die Laufzeitumgebung, die für
die Anwendung benötigt werden.

## Einstieg

> [!TIP]
> Installiere Docker auf deinem System, um den Beispielen in diesem Repo zu folgen.

Als Erstes schauen wir uns eine simple Dockerfile an, um die Syntax zu verstehen.

Dabei wollen wir in dem Dockercontainer nur das Linux-Commando `echo` ausführen.

Schaue dir das Dockerfile
an: [Dockerfile](https://github.com/ValentinKolb/docker-demo/blob/main/1-getting-started/Dockerfile)

Führe folgende Befehle aus, um das Dockerimage zu bauen und den Container zu starten:

```bash
# clonen dieses Repositories
git clone https://github.com/ValentinKolb/docker-demo.git

# in den Ordner wechseln
cd docker-demo/1-getting-started

# bauen des Dockerimages mit dem Namen "getting-started"
docker build -t "getting-started" .

# starten des Containers
docker run getting-started

# starten des Containers mit angegebenem Argument
docker run getting-started "Hello Docker"
```

## Unsere Anwendung

> [!NOTE]
> Jetzt wollen wir eine Anwendung in einem Dockercontainer ausführen.
> Dabei Kompilieren wir die Anwendung lokal und starten sie dann in einem Dockercontainer.

> [!TIP]
> Installiere [Node.js](https://nodejs.org/en/download), um die Anwendung lokal auszuführen.

Als Beispielanwendung verwenden wir eine einfache Node.js-Anwendung (Typescript).
Um dem Beispiel zu folgen, sind keine Node.js und Typescript-Kenntnisse erforderlich.
Die Anwendung rendert eine einfache Webseite und bietet HTTP-Endpunkte für das Abrufen von Umgebungsvariablen an.

### Überblick über die Anwendung

Die Anwendung bietet drei Befehle:

- `npm run start:dev`: Startet die Anwendung im Entwicklungsmodus.
- `npm run build`: **Kompiliert** die Anwendung von Typescript in Javascript.
- `npm run start:prod`: Startet die kompilierte Anwendung.

### Ausführen der Anwendung lokal

Folgende Befehle führen die Anwendung im Entwicklungsmodus aus:

```bash
# in den Ordner wechseln
cd 2-app-container/sampleApp

# installieren der Abhängigkeiten
npm install

# starten der Anwendung im Entwicklungsmodus
npm run start:dev
```

### Lokales Kompilieren und Ausführen der Anwendung

Folgende Befehle kompilieren die Anwendung und führen sie lokal aus:

```bash
# in den Ordner wechseln
cd sampleApp

# kompilieren der Anwendung
npm run build # dieser Befehl funktioniert nur, wenn `npm install` bereits ausgeführt wurde

# starten der kompilierten Anwendung
npm run start:prod
```

Nun kann die Anwendung unter [http://localhost:3000](http://localhost:3000) aufgerufen werden.

### Ausführen der Anwendung in einem Dockercontainer

> [!NOTE]
> Jetzt wollen wir die Anwendung in einem Dockercontainer ausführen.

Dazu schauen wir uns das Dockerfile
an: [Dockerfile](https://github.com/ValentinKolb/docker-demo/blob/main/2-app-container/Dockerfile)

Um die Anwendung zu starten, müssen wir erst den Sourcecode kompilieren.
Dies wurde bereits im vorherigen Schritt durchgeführt. Dabei wurde der Order `.sampleApp/out/` erstellt, in dem sich
der kompilierte Code befindet.

Dieser kompilierter Code wird in der Dockerfile in den Ordner `/app` des Containers kopiert.

```Dockerfile
# Copy compiled source code
COPY ./sampleApp/out ./out
```

Danach kann das Dockerimage gebaut und der Container gestartet werden:

```bash
# in den Ordner wechseln
cd 2-app-container

# bauen des Dockerimages mit dem Namen (aka Tag) "app-container"
# Achtung: Dieser Befehl funktioniert nur, wenn `npm install` und `npm run build` bereits ausgeführt wurden, dies beheben wir im nächsten Schritt
docker build --tag "app-container" .

# starten des Containers
docker run -p 5432:3000 app-container
```

Damit von außen auf die Anwendung zugegriffen werden kann, muss der Port 3000 freigegeben werden.
Der Port 3000 des Containers wird auf den Port 5432 des Hosts gemappt. Dabei kann der Port des Hosts beliebig gewählt
werden: `-p <HOST-PORT>:<CONTAINER-PORT>`.

Nun kann die Anwendung unter [http://localhost:5432](http://localhost:5432) aufgerufen werden.

## Anwendung mit Docker bauen

> [!NOTE]
> Nun soll auch das Kompilieren der Anwendung in einem Dockercontainer erfolgen.

### Warum in einem Dockercontainer bauen?

- **Portabilität**: Die Anwendung kann auf jedem System (z.B. CI/CD-Pipeline) gebaut werden, auf dem Docker installiert
  ist.
- **Reproduzierbarkeit**: Der Build-Prozess ist immer gleich, unabhängig von der Umgebung.
- **Isolation**: Der Build-Prozess ist von der Umgebung isoliert, um Konflikte zu vermeiden.

### Überblick über den Build-Prozess

Was also hat sich geändert? Vorher haben wir die Anwendung lokal kompiliert und dann in einem Dockercontainer
ausgeführt.
Jetzt wollen wir die Anwendung in einem Dockercontainer kompilieren und dann in einem anderen Dockercontainer ausführen.

Dazu kopieren wir nun den Sourcecode in den Dockercontainer und kompilieren ihn dort.

```Dockerfile
# Copy the source code
COPY ./sampleApp/src ./src
COPY ./sampleApp/tsconfig.json ./

# Compile the TypeScript code
RUN npm run build
```

Anschließend können wir das Dockerimage bauen und den Container starten:

```bash
# in den Ordner wechseln
cd 3-build-in-dockerfile

# bauen des Dockerimages mit dem Namen (aka Tag) "build-in-dockerfile"
docker build --tag "build-in-dockerfile" .

# starten des Containers
docker run -p 5432:3000 build-in-dockerfile
```

Nun kann die Anwendung wieder unter [http://localhost:5432](http://localhost:5432) aufgerufen werden.

## Multi-Stage Builds

> [!NOTE]
> In diesem Schritt wollen wir den Build-Prozess optimieren, indem wir Multi-Stage Builds verwenden.

### Warum Multi-Stage Builds?

- **Effizienz**: Nur die benötigten Dateien werden in das finale Image kopiert.
- **Größe**: Das finale Image ist kleiner, da nur die benötigten Dateien enthalten sind.
- **Closed Source**: Der Sourcecode ist nicht im finalen Image enthalten.

### Überblick über den Build-Prozess

In einem Multi-Stage Build können wir mehrere Stages definieren, die nacheinander ausgeführt werden.
Jede Stage kann auf das Ergebnis der vorherigen Stage zugreifen.

Dabei ist jede Stage ein eigenes Image, das auf dem vorherigen Image basiert.

Um eine Stage zu definieren, verwenden wir das Schlüsselwort `FROM` mit einem Namen für das Image.

```Dockerfile
# Stage 1: Build the application
FROM node:14 AS build

# ...

# Stage 2: Run the application
FROM node:14 AS run

# ...

# Copy only the compiled code from the builder container
COPY --from=builder /app/out ./out
# Copy the third-party dependencies from the builder container (no need to install them again)
COPY --from=builder /app/node_modules ./node_modules

# ...
```

Anschließend können wir das Dockerimage bauen und den Container starten:

```bash
# in den Ordner wechseln
cd 4-multi-stage-builds

# bauen des Dockerimages mit dem Namen (aka Tag) "multi-stage-builds"
docker build --tag "multi-stage-builds" .

# starten des Containers
docker run -p 5432:3000 multi-stage-builds

# images und deren Größe anzeigen
docker images
```

## Docker Compose

### Einführung

> [!NOTE]
> In diesem Schritt wollen wir Docker Compose verwenden, um den Container zu starten.

> [!TIP]
> Docker Compose ist Teil von Docker und wird automatisch installiert, wenn Docker installiert wird.

**Was ist Docker Compose?**

Docker Compose ist ein Tool zur Definition und Ausführung von Docker-Anwendungen mit mehreren Containern.
Dabei wird der Anwendungsstack in einer einzigen Datei definiert, der `docker-compose.yml`. So müssen
nicht alle Befehle manuell in der Konsole eingegeben werden.

**Warum Docker Compose verwenden?**

* Vereinfacht die Verwaltung von Multi-Container-Anwendungen.
* Definiert den Anwendungsstack in einer einzigen Datei.
* Erleichtert die Skalierung und Aktualisierung von Diensten.

**Vergleich von Docker Compose mit herkömmlichem Docker**

* Docker: Einzelne Containerverwaltung.
* Docker Compose: Orchestrierung von Multi-Container-Anwendungen.

### Docker Compose Beispiel

> [!NOTE]
> In diesem Schritt wollen wir Docker Compose verwenden, das im letzten Schritt erstellte Dockerimage zu starten.

Dazu schauen wir uns die `docker-compose.yml`
an: [docker-compose.yml](https://github.com/ValentinKolb/docker-demo/blob/main/5-docker-compose/docker-compose.yml)

In der `docker-compose.yml` definieren wir die Services, die wir starten wollen.

```yaml
services:
  example-app:
    image: multi-stage-builds
    ports:
      - "5432:3000"
    environment:
      - "FOO=bar"
    volumes:
      - ./example.html:/app/public/example.html
```

* Mit dem `services`-Schlüsselwort definieren wir eine Liste von Services.
* Mit dem `example-app`-Schlüsselwort definieren wir den Namen des Services.
* Mit dem `image`-Schlüsselwort definieren wir das Dockerimage, das verwendet werden soll.
* Mit dem `ports`-Schlüsselwort definieren wir die Ports, die freigegeben werden sollen.
* Mit dem `environment`-Schlüsselwort definieren wir die Umgebungsvariablen, die gesetzt werden sollen.
* Mit dem `volumes`-Schlüsselwort definieren wir die Volumes, die gemountet werden sollen.

Nun können wir den Container starten:

```bash
# wechseln in den Ordner
cd 5-docker-compose

# starten der Container
docker compose up
```

Da wir über die Umgebungsvariable `FOO=bar` verfügen, können wir die Umgebungsvariable auf der Webseite
der Beispielanwendung sehen: [http://localhost:5432/env/FOO](http://localhost:5432/env/FOO)

Außerdem können wir als per Bind-Mount gemountete die Datei `example.html` im Browser
sehen: [http://localhost:5432/example.html](http://localhost:5432/example.html)

### Docker Compose mit Build

> [!NOTE]
> In diesem Schritt wollen wir Docker Compose verwenden, um den Docker Container zu bauen und zu starten.

> [!TIP]
> Docker Images können auch direkt in Docker Compose gebaut werden. Dies sollte jedoch nur für die Entwicklung
> verwendet werden.
> Für Produktion sollte das Dockerimage z.B. in einer Pipeline gebaut und dann über eine Registry bereitgestellt werden.

**Was ist der Unterschied?**

Bisher haben wir das Dockerimage manuell mit `docker build ...` gebaut und dann den Container mithilfe von Docker
Compose gestartet.
Jetzt wollen wir Docker Compose verwenden, um direkt das Dockerimage zu bauen und dann den Container zu starten.

Dazu schauen wir uns die `docker-compose.yml`
an: [docker-compose.yml](https://github.com/ValentinKolb/docker-demo/blob/main/6-docker-compose-build/docker-compose.yml)

**Was hat sich geändert?**

```diff
services:
  example-app:
-    image: multi-stage-builds
+    build:
+      context: .
+      dockerfile: Dockerfile
```

* Mit dem `build`-Schlüsselwort können wir das Dockerimage direkt aus dem Dockerfile bauen.
* Mit dem `context`-Schlüsselwort können wir das Verzeichnis angeben, in dem sich das Dockerfile befindet.
* Mit dem `dockerfile`-Schlüsselwort können wir das Dockerfile angeben, das verwendet werden soll.

Nun können wir das Dockerimage bauen und den Container starten:

```bash
# wechseln in den Ordner
cd 6-docker-compose-build

# starten und bauen der Container
docker compose up --build --force-recreate
```

* Da wir den `--build`-Flag verwenden, wird das Dockerimage vor dem Start des Containers gebaut.
* Da wir den `--force-recreate`-Flag verwenden, wird der Container neu erstellt, auch wenn er bereits existiert.

### Docker Compose für Entwicklung

> [!NOTE]
> In diesem Schritt wollen wir Docker Compose verwenden, um die Anwendung schon während der Entwicklung
> in einem Dockercontainer auszuführen. Dazu soll der Container bei Änderungen am Sourcecode automatisch neu gebaut
> und gestartet werden.

**Was ist neu in diesem Schritt?**

In den vorherigen Schritten haben wir Docker Compose verwendet, um den Container zu starten.
Jetzt wollen wir Docker Compose verwenden, um den Container während der Entwicklung neu zu bauen und zu starten.

Diese `docker-compose.yml` ist speziell für die Entwicklung
konfiguriert: [docker-compose.yml](https://github.com/ValentinKolb/docker-demo/blob/main/7-docker-compose-dev/docker-compose.yml)

**Was hat sich geändert?**

```diff
services:
  example-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5432:3000"
+   develop:
+     watch:
+       - action: sync
+         path: ./sampleApp/public
+         target: /app/public
+       - action: rebuild
+         path: ./sampleApp/src
```

* Mit dem `develop`-Schlüsselwort definieren wir eine Liste von Entwicklungsmodi.
* Mit dem `watch`-Schlüsselwort definieren wir eine Liste von Dateien und Ordnern, die überwacht werden sollen.
* Mit dem `action`-Schlüsselwort definieren wir die Aktion, die bei Änderungen ausgeführt werden soll.
    * Die Aktion `sync` synchronisiert die Dateien und Ordner zwischen dem Host und dem Container. Dies ist nützlich, um
      Änderungen an nicht kompilierten Dateien sofort zu sehen.
    * Die Aktion `rebuild` baut das Dockerimage neu, wenn Änderungen am Sourcecode vorgenommen wurden.

Nun können wir den Container im Watch-Modus starten:

```bash
# wechseln in den Ordner
cd 7-docker-compose-dev

# starten des Containers im Watch-Modus
docker compose watch # oder docker compose up --watch
```

## Traefik

> [!NOTE]
> In diesem Schritt wollen wir Traefik verwenden, um HTTP Requests an die Anwendung in einem Dockercontainer zu routen.

### Was ist ein Reverse Proxy?

Ein Reverse Proxy ist ein Server, der Anfragen von Clients entgegennimmt und sie an die entsprechenden Server
weiterleitet.
So können mehrere Webanwendungen auf einem Server ausgeführt werden, ohne dass sie sich gegenseitig beeinflussen.

#### Generelle Aufgaben eines Reverse Proxys

- **Routing**: Leitet Anfragen an die entsprechenden Server weiter.
- **Load Balancing**: Verteilt Anfragen auf mehrere Server.
- **SSL Termination**: Entschlüsselt SSL-Verkehr und leitet ihn an die Server weiter.
- **Caching**: Speichert häufig angeforderte Ressourcen, um die Antwortzeit zu verbessern.
- **Sicherheit**: Schützt die Server vor Angriffen und überwacht den Datenverkehr.
- **Logging**: Protokolliert den Datenverkehr für die Analyse und Überwachung.
- **Monitoring**: Überwacht die Server und benachrichtigt bei Ausfällen.

### Was ist Traefik?

Traefik ist ein moderner Reverse Proxy, der speziell für Containerumgebungen entwickelt wurde. Er ist einfach zu
konfigurieren und bietet viele Funktionen, die für Containerumgebungen nützlich sind.

### Aufbau von Traefik

![traefik components](/assets/traefik.png)

> [!TIP]
> Traefik besteht aus mehreren Komponenten, die zusammenarbeiten, um den Datenverkehr zu routen.

- **Entrypoints**: Definieren die Ports, auf denen Traefik Anfragen entgegennimmt.
    - HTTP: Port 80
    - HTTPS: Port 443
- **Routers**: Leiten Anfragen an die entsprechenden Dienste weiter.
    - z.B. `example.com` → Docker-Container `example-app`
- **Services**: Definieren die Dienste, die von Traefik geroutet werden.
    - z.B. Docker-Container `example-app`
- **Middlewares**: Definieren die Middleware, die auf die Anfragen angewendet werden soll.
    - z.B. SSL-Termination, Authentifizierung

#### Zusätzliche Komponenten

> [!TIP]
> Traefik bietet zusätzliche Komponenten, die die Funktionalität erweitern, allerdings nicht direkt mit dem Routing
> zusammenhängen.

- **Providers**: Definieren die Quelle der Konfiguration (z.B. Docker, Kubernetes).
    - z.B. Docker-Provider (Docker Labels), Kubernetes-Provider, File-Provider (`.yml` und `.toml`)
- **Web-Dashboard**: Zeigt die Konfiguration und den Status von Traefik an.
- **Plugins**: Erweitern die Funktionalität von Traefik und können selbst entwickelt werden (Golang)
    - z.B. Let's Encrypt (SSL Zertifikate), Prometheus (Monitoring), Consul (Service Discovery), ...

### Traefik Beispiel

> [!NOTE]
> In diesem Schritt wollen wir Traefik verwenden, um HTTP Requests an die Anwendung in einem Dockercontainer zu routen.

Dazu schauen wir uns die `docker-compose.yml` an: [docker-compose.yml](./8-traefik/docker-compose.yml)

Um die Anwendung und Traefik zu starten, führen wir folgende Befehle aus:

```bash
# wechseln in den Ordner
cd 8-traefik

# starten der Container
docker compose up
```

## Docker Cheat Sheet

```bash
# Anzeigen von allen laufenden Containern
$~ docker ps
CONTAINER ID   IMAGE      COMMAND      CREATED      STATUS      PORTS                     NAMES
845adedf395c   foo_bar    ".."         1 sec ago    RUNNING     0.0.0.0:5432->3000/tcp    ...

# Anzeigen von allen Containern (auch beendete)
$~ docker ps -a

# Erstellen eines Containern basierend auf einem Image
$~ docker run [IMAGE_TAG]

# Starten und Stoppen von Containern
$~ docker start / stop [CONTAINER_ID / NAME]

# Entfernen von Containern
$~ docker rm [CONTAINER_ID / NAME]

# Streamen des STDIN / STDOUT eines Containers
$~ docker attach [CONTAINER_ID / NAME]

# Ausführen von Befehlen in einem Container, z.B. starten eines Terminals
$~ docker exec –it [CONTAINER_ID / NAME] /bin/bash
```

## Dieses Repo

![QR Code](assets/qr.png)