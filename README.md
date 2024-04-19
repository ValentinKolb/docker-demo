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

## Einstieg

> [!TIP]
> Installiere Docker auf deinem System, um die Beispiele auszuführen.

Auf diesem Branch schauen wir uns eine simple Dockerfile an, um die Syntax zu verstehen.

Dabei wollen wir in dem Dockercontainer nur das Linux-Commando `echo` ausführen.

Schaue dir das Dockerfile an: [Dockerfile](Dockerfile)

Führe folgende Befehle aus, um das Dockerimage zu bauen und den Container zu starten:

```bash
# Baue das Dockerimage und gebe ihm den Namen "docker-demo"
docker build -t docker-demo .

# Starte den Container mit dem gebauten Image
docker run docker-demo

# Starte den Container mit einem anderen CMD
docker run docker-demo "Hello Docker"
```