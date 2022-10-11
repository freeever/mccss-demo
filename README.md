# MCCSS User Registration Demo
This is a demo solution for MCCSS user registration, which include both frontend and backend as follows:

+ mccss-demo-api: Backend API application
+ mccss-registration: Frontend Angular application

## Get started

### Setup MySQL

#### Option 1
+ Install MySQL database
+ Initialize database based on *mccss-demo-api/DB_SCRIPTS/mccss_ddl.sql*

#### Option 2
Run MySQL using docker
```shell
cd DB_SCRIPTS
docker compose up
```

### Clone the repo

```shell
git clone git@github.com:freeever/mccss-demo.git
cd mccss-demo
```

### Build and launch backend API application

```shell
cd mccss-demo-api
mvn clean install
mvnw spring-boot:run
```

### Test
```shell
curl http://localhost:8080/welcome
```
Expected response: Welcome to MCCSS!

### Build and launch frontend Angular application

```shell
npm install
npm start
```

Open your browser on http://localhost:4200
