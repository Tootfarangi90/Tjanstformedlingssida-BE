# Tjänstförmedling backend

## Table of content

### Technologies

Nodejs
MongoDB
Trello

### TTFHW

```javascript
cd ~
cd workspace
cd tjänstförmedling
git clone "https://github.com/Tootfarangi90/Tjanstformedlingssida-BE.git"
git pull
npm i
touch .env
code .
```

### Onboarding

### Sequence Diagram

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
