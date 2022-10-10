# MCCSS User Registration Demo
This is a demo solution for MCCSS user registration, which include both frontend and backend as follows:

+ mccss-demo-api: Backend API application
+ mccss-registration: Frontend Angular application

## Get started

### Install MySQL

Install MySQL database, or run MySQL using docker.

Initialize database based on *DB_SCRIPTS/mccss_ddl.sql*

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
