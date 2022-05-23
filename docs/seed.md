# CodersCamp 2021 - Projekt Fullstack
## Zarządzanie bazą danych MongoDB w Dockerze
Na Windowsie należy skorzystać z PowerShella, na innym systemie operacyjnym z dowolnej dostępnej powłoki. Poradnik zakłada, że na systemie zainstalowany i skonfigurowany jest [Docker](https://docs.docker.com/get-docker/).

### Uruchomienie kontenera
```bash
$ docker-compose up -d
```
Wymienione komendy zakładają, że kontener z bazą danych nosi nazwę `coderscamp2021projectfullstack_mongodb_1`. W przypadku innej nazwy należy odpowiednio podmienić `coderscamp2021projectfullstack_mongodb_1` na nazwę naszego kontenera w każdej wykonywanej komendzie. Nazwę kontenera można sprawdzić wykonując komendę `$ docker ps`, lub przeglądając listę kontenerów w Docker Desktop.

### Usunięcie obecnej bazy danych
⚠️ Ostrożnie, komenda usuwa wszystkie kolekcje i dokumenty z bazy! ⚠️
```bash
$ docker exec coderscamp2021projectfullstack_mongodb_1 mongosh dev -u root -p root --authenticationDatabase admin --eval 'db.dropDatabase()'
```

### Skopiowanie lokalnych plików z danymi do kontenera
Przed importem do bazy, pliki z folderu `mongo-seed` należy skopiować do kontenera:
```bash
# Pojedyncza kolekcja (np. auth):
$ docker cp ./mongo-seed/auth.json coderscamp2021projectfullstack_mongodb_1:/tmp/auth.json

# Wszystkie kolekcje na raz:
$ docker cp ./mongo-seed/. coderscamp2021projectfullstack_mongodb_1:/tmp/
```

Poprawność skopiowania danych można sprawdzić komendą:
```bash
$ docker exec coderscamp2021projectfullstack_mongodb_1 sh -c "head /tmp/*.json"
```

### Import danych
```bash
# Pojedyncza kolekcja (np. addresses):
$ docker exec coderscamp2021projectfullstack_mongodb_1 mongoimport -u root -p root --authenticationDatabase admin -d dev --jsonArray --upsertFields _id --file /tmp/dishes.json -c dishes

# Wszystkie kolekcje na raz:
$ docker exec coderscamp2021projectfullstack_mongodb_1 sh -c 'cd /tmp && for FILE in *.json; do mongoimport -u root -p root --authenticationDatabase admin -d dev --jsonArray --upsertFields _id --file "/tmp/$FILE" -c ${FILE%.json}; done'
```
