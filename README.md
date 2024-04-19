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

## Multi-Stage Builds

> [!NOTE]
> Jetzt wollen wir unsere Anwendung in einem Multi-Stage Build bauen.

Im letzten Schritt haben wir unsere Anwendung in einem Dockercontainer gebaut. Das hat gut funktioniert, dies hatte
zur Folge, dass wir ein großes Image hatten da wir alle Build-Dependencies und den Sourcecode auch im finalen Image
hatten.

In diesem Schritt wollen wir das Image kleiner machen. Dazu werden wir einen Multi-Stage Build verwenden. Das bedeutet,
dass wir mehrere `FROM`-Anweisungen in unserem Dockerfile haben. Jede `FROM`-Anweisung definiert einen neuen Build-Step.

Im ersten Build-Step bauen wir unsere Anwendung und im zweiten Build-Step kopieren wir das Ergebnis des ersten Build-Steps
in ein neues Image. Das Ergebnis ist ein kleineres Image, da wir nur die notwendigen Dateien kopieren.

> [!TIP]
> Schaue dir die Dockerfile an, um zu sehen, wie wir die Anwendung im Container bauen.
 
Um die Anwendung zu bauen, führe folgenden Befehl aus:

```bash
# anzeigen der größe des letzten Images
docker inspect --size docker-demo

docker build -t docker-demo .

# anzeigen der größe des neuen Images
docker inspect --size docker-demo

docker run -p 3000:3000 docker-demo
```

