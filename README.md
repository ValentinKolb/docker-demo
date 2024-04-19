![How To Docker](assets/banner.png)

In diesem Repo werden wir uns mit Docker beschäftigen. Wir werden uns ansehen, warum wir Docker verwenden wollen, wie
wir Dockerfiles schreiben, Images
bauen und Container starten.

## Übersicht

> [!TIP]
> Wir werden uns Schritt für Schritt mit Docker beschäftigen. Jeder Schritt baut auf dem vorherigen auf.
> Für jeden Schritt gibt es einen eigenen Ordner, in dem sich ein Dockerfile befindet.

1. [Getting Started - Dockerfile `./1-getting-started`](https://github.com/ValentinKolb/docker-demo/tree/main/1-getting-started)
2. [Ausführen einer Anwendung in einem Dockercontainer `./2-app-container`](https://github.com/ValentinKolb/docker-demo/tree/main/2-app-container)
3. [Bauen einer Anwendung mit Docker `./3-build-in-dockerfile`](https://github.com/ValentinKolb/docker-demo/tree/main/3-build-in-dockerfile)
4. [Multi-Stage Builds `./4-multi-stage-builds`](https://github.com/ValentinKolb/docker-demo/tree/main/4-multi-stage-builds)

Außerdem gibt es noch einen Ordner mit einer Beispielanwendung, die wir in einem Dockercontainer ausführen wollen.

- [Beispielanwendung `./sampleApp`](https://github.com/ValentinKolb/docker-demo/tree/main/sampleApp)

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

<pre>
$ docker run \
 -v <span style="color:#FAA21A">/host/foo/file:/container/bar/file</span> \
 –p <span style="color:#ED1846">3000:5000</span> \
 —name <span style="color: #117E3F">name_of_container</span> \
 tag_of_image 
</pre>

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

git clone https://github.com/ValentinKolb/docker-demo.git

cd docker-demo/1-getting-started

# Baue das Dockerimage und gebe ihm den Namen "getting-started"
docker build -t "getting-started" .

# Starte den Container mit dem gebauten Image
docker run getting-started

# Starte den Container mit einem anderen CMD
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
- `npm run build`: Kompiliert die Anwendung von Typescript in Javascript.
- `npm run start:prod`: Startet die kompilierte Anwendung.

### Ausführen der Anwendung lokal

Folgende Befehle führen die Anwendung im Entwicklungsmodus aus:

```bash
cd sampleApp

# Installieren der Abhängigkeiten
npm install

# Starten der Anwendung im Entwicklungsmodus
npm run start:dev
```

### Lokales Kompilieren und Ausführen der Anwendung

Folgende Befehle kompilieren die Anwendung und führen sie lokal aus:

```bash
cd sampleApp

# Kompilieren der Anwendung
npm run build

# Starten der kompilierten Anwendung
npm run start:prod
```

Nun kann die Anwendung unter [http://localhost:3000](http://localhost:3000) aufgerufen werden.

### Ausführen der Anwendung in einem Dockercontainer

> [!NOTE]
> Jetzt wollen wir die Anwendung in einem Dockercontainer ausführen.

Dazu schauen wir uns das Dockerfile an: [Dockerfile](https://github.com/ValentinKolb/docker-demo/blob/main/2-app-container/Dockerfile)

Um die Anwendung zu starten, müssen wir erst den Sourcecode kompilieren.
Dies wurde bereits im vorherigen Schritt durchgeführt. Dabei wurde der Order `.sampleApp/out/` erstellt, in dem sich
der kompilierte Code befindet.

Dieser kompilierter Code wird in der Dockerfile in den Ordner `/app` des Containers kopiert.

```Dockerfile
# Copy compiled source code
COPY ../sampleApp/out ./out
```

Danach kann das Dockerimage gebaut und der Container gestartet werden:

```bash
# bauen des Dockerimages mit dem Namen (aka Tag) "app-container"
docker build --tag "app-container" --file 2-app-container/Dockerfile .

# starten des Containers
docker run -p 5000:3000 app-container
```

Damit von außen auf die Anwendung zugegriffen werden kann, muss der Port 3000 freigegeben werden.
Der Port 3000 des Containers wird auf den Port 5000 des Hosts gemappt. Dabei kann der Port des Hosts beliebig gewählt
werden: `-p <HOST-PORT>:<CONTAINER-PORT>`.

Nun kann die Anwendung unter [http://localhost:5000](http://localhost:5000) aufgerufen werden.

## Anwendung mit Docker bauen

> [!NOTE]
> Nun soll auch das Kompilieren der Anwendung in einem Dockercontainer erfolgen.

### Warum in einem Dockercontainer bauen?

- **Portabilität**: Die Anwendung kann auf jedem System (z.B. CI/CD-Pipeline) gebaut werden, auf dem Docker installiert ist.
- **Reproduzierbarkeit**: Der Build-Prozess ist immer gleich, unabhängig von der Umgebung.
- **Isolation**: Der Build-Prozess ist von der Umgebung isoliert, um Konflikte zu vermeiden.

### Überblick über den Build-Prozess

Was also hat sich geändert? Vorher haben wir die Anwendung lokal kompiliert und dann in einem Dockercontainer ausgeführt.
Jetzt wollen wir die Anwendung in einem Dockercontainer kompilieren und dann in einem anderen Dockercontainer ausführen.

Dazu kopieren wir nun den Sourcecode in den Dockercontainer und kompilieren ihn dort.

```Dockerfile
# Copy the source code
COPY ../sampleApp/src ./src
COPY ../sampleApp/tsconfig.json ./

# Compile the TypeScript code
RUN npm run build
```

Anschließend können wir das Dockerimage bauen und den Container starten:

```bash
# bauen des Dockerimages mit dem Namen (aka Tag) "build-in-dockerfile"
docker build --tag "build-in-dockerfile" --file 3-build-in-dockerfile/Dockerfile .

# starten des Containers
docker run -p 5000:3000 build-in-dockerfile
```

Nun kann die Anwendung wieder unter [http://localhost:5000](http://localhost:5000) aufgerufen werden.

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
# grob die Größe des Images mit Sourcecode anzeigen
docker inspect --size multi-stage-builds

# bauen des Dockerimages mit dem Namen (aka Tag) "multi-stage-builds"
docker build --tag "multi-stage-builds" --file 4-multi-stage-builds/Dockerfile .

# starten des Containers
docker run -p 5000:3000 multi-stage-builds

# grob die Größe des finalen Images anzeigen
docker inspect --size multi-stage-builds
```

## Docker Cheat Sheet

```bash
# Anzeigen von allen laufenden Containern
$~ docker ps
CONTAINER ID   IMAGE      COMMAND      CREATED      STATUS      PORTS                     NAMES
845adedf395c   foo_bar    ".."         1 sec ago    RUNNING     0.0.0.0:5000->3000/tcp    ...

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