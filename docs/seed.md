## Wgranie danych testowych do bazy (Windows = PS, inne systemy bez znaczenia):

#### W przypadku gdy nasz kontener nazywa się coderscamp2021projectfullstack_mongodb_1, należy użyć komend podanych poniżej:

Usunięcie obecnej bazy danych (**UWAŻAĆ!!**):

```bash
docker exec -it coderscamp2021projectfullstack_mongodb_1 bash -c "mongo dev -u root -p root  --authenticationDatabase admin --eval 'db.dropDatabase()'"

```

```bash
docker cp .\mongo-seed\addresses.json coderscamp2021projectfullstack_mongodb_1:/tmp/addresses.json;
docker cp .\mongo-seed\auth.json coderscamp2021projectfullstack_mongodb_1:/tmp/auth.json;
docker cp .\mongo-seed\dishes.json coderscamp2021projectfullstack_mongodb_1:/tmp/dishes.json;
docker cp .\mongo-seed\restaurants.json coderscamp2021projectfullstack_mongodb_1:/tmp/restaurants.json;
docker cp .\mongo-seed\users.json coderscamp2021projectfullstack_mongodb_1:/tmp/users.json;
```

<br/>

```bash
docker exec coderscamp2021projectfullstack_mongodb_1 mongoimport --uri "mongodb://root:root@localhost:27017/dev?authSource=admin" -c addresses --jsonArray --file /tmp/addresses.json;
docker exec coderscamp2021projectfullstack_mongodb_1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c auth --jsonArray --file /tmp/auth.json;
docker exec coderscamp2021projectfullstack_mongodb_1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c dishes --jsonArray --file /tmp/dishes.json;
docker exec coderscamp2021projectfullstack_mongodb_1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c restaurants --jsonArray --file /tmp/restaurants.json;
docker exec coderscamp2021projectfullstack_mongodb_1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c users --jsonArray --file /tmp/users.json
```

#### W przypadku gdy nasz kontener nazywa się coderscamp2021projectfullstack-mongodb-1, należy użyć komend podanych poniżej:

Usunięcie obecnej bazy danych (**UWAŻAĆ!!**):

```bash
docker exec -it coderscamp2021projectfullstack-mongodb-1 bash -c "mongo dev -u root -p root  --authenticationDatabase admin --eval 'db.dropDatabase()'"

```

```bash
docker cp .\mongo-seed\addresses.json coderscamp2021projectfullstack-mongodb-1:/tmp/addresses.json;
docker cp .\mongo-seed\auth.json coderscamp2021projectfullstack-mongodb-1:/tmp/auth.json;
docker cp .\mongo-seed\dishes.json coderscamp2021projectfullstack-mongodb-1:/tmp/dishes.json;
docker cp .\mongo-seed\restaurants.json coderscamp2021projectfullstack-mongodb-1:/tmp/restaurants.json;
docker cp .\mongo-seed\users.json coderscamp2021projectfullstack-mongodb-1:/tmp/users.json;
```

<br/>

```bash
docker exec coderscamp2021projectfullstack-mongodb-1 mongoimport --uri "mongodb://root:root@localhost:27017/dev?authSource=admin" -c addresses --jsonArray --file /tmp/addresses.json;
docker exec coderscamp2021projectfullstack-mongodb-1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c auth --jsonArray --file /tmp/auth.json;
docker exec coderscamp2021projectfullstack-mongodb-1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c dishes --jsonArray --file /tmp/dishes.json;
docker exec coderscamp2021projectfullstack-mongodb-1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c restaurants --jsonArray --file /tmp/restaurants.json;
docker exec coderscamp2021projectfullstack-mongodb-1 mongoimport --uri 'mongodb://root:root@localhost:27017/dev?authSource=admin' -c users --jsonArray --file /tmp/users.json
```
