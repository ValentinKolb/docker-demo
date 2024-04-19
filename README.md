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

## Bauen einer Anwendung mit Docker

> [!NOTE]
> In diesem Schritt werden wir die Anwendung im Dockercontainer bauen.

Im letzten Schritt haben wir die Anwendung lokal gebaut und dann
den Sourcecode in den Container kopiert. Das ist nicht ideal, da wir
nicht sicherstellen können, dass die Umgebung in der der Container
gebaut wird, alle Abhängigkeiten erfüllt.

Zum Beispiel könnten wir das Dockerimage in einer CI/CD Pipeline bauen.
Dann müssten wir aber extra Node.js auf dem CI/CD Server installieren.

Eine bessere Lösung ist es, die Anwendung direkt im Dockercontainer zu bauen,
da wir dann sicherstellen können, dass die Umgebung immer gleich ist.

Dazu verändern wird das Dockerfile so, dass wir die Anwendung im Container bauen.

> [!TIP]
> Schaue dir die Dockerfile an, um zu sehen, wie wir die Anwendung im Container bauen.

Um nun die Anwendung im Dockercontainer zu bauen, müssen wird folgende Schritte durchführen:

1. Wir erstellen ein neues Dockerfile, das die Anwendung im Container baut.
2. Wir bauen das Dockerimage.
3. Wir starten den Container und überprüfen, ob die Anwendung gebaut wurde.

```bash
# 1. Anpassen des Dockerfiles

docker build -t docker-demo-build .

docker run -p 3000:3000 docker-demo-build

# webserver startet auf http://localhost:3000
```
