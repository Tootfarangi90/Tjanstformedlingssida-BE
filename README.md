# Tjänstförmedling backend



## Scheduele 

| # Our   |      # Weekly      |  # Plans |
|----------|-------------|------|
| Dag |  Tid | Plats |
| Måndag |    10.00   |   Stan |
| Tisdag |    09.00   |   Skolan |
| Onsdag |    10.00   |   Online/discord |
| Torsdag |   09.00   |   Skolan |
| Fredag |    13.00   |   Online |



## Technologies

**Backend technologies:**
+ Nodejs
+ MongoDB

**Test technologies:**
+ Jestjs




## TTFHW

To access the repository, make sure you are a collaborator, so that you can clone the repo in your workspace folder with this command:

```javascript
git clone "https://github.com/Tootfarangi90/Tjanstformedlingssida-BE.git"
```

How to receive the latest data:

```javascript
git pull
```

How to install all the modules:

```javascript
npm i
```

How to open up the project at Visual studio code: 

```javascript
code .
```



## Onboarding

Nodemon is saved under dependecies, so you start the project like this:

```javascript
npm run dev
```



## Script for development environment

We use docker for our development environment and down under you can see how to set up docker.


+ For the database:

```javascript
docker pull mongo:latest
docker run -d -p 27017:27017 -v ~/mongodb-docker:/data/db --name mymongo mongo:4.4-rc
    docker ps
    
    docker start mymongo

    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    
    mongo
    
    docker logs test-mongodb --follow
```

+ For the backend:

```javascript
FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]
```

## Script for testing

We used jest js for testing our application

Steps for starting your test environment

```console
npm i jest --save-dev

npm i jest-runner-groups

mkdir __tests__

touch ./__tests__/unitTest.js

touch ./__tests__/componentTest.js

touch ./__tests__/integrationTest.js

```

Add this to package.json
Give each command a group name

```javascript
  "scripts": {
    ...

    "test": "jest --group=unit",
    "component": "jest --group=component",
    "integration": "jest --group=integration"
  },

...

```

```javascript
  "jest": {
    "runner": "groups"
  },

```


Give each file one or more group names to that you can easily choose which one to run.

```javascript
/**
 * Unit test

@group unit

*/

...

```

```console
 npm test
```

```javascript
/**
 * Component test

@group component

*/

...

```

```console
npm run component
```

```javascript
/**
 * Integration test

@group integration

*/

...

```

```console
npm run integration
```




## Sequence diagram for JWT:

```mermaid
sequenceDiagram
participant User
participant Client
participant API
User->>Client: Enter username and password
Client->>API: Sign in (POST request) with username and password
loop Token
API->>API: Validation & generate token
end
API->>Client: Returns the accessToken (JWT)
Client->>User: GET /users/me with JWT in header
User->>Client: Keeps navigating
Client->>API: Send JWT token on every request
```


