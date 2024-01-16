# Tissu Collectif

Welcome to Tissu Collectif Repository 🚀

## Introduction

Tissu Collectif is a vintage clothing management software. The application simplifies and automates the management of your vintage clothing inventories.

## Setup

Create a .env file which must look like this:

```
JWT_SECRET=""
PASSWORD_KEY=""
MONGO_USER=""
MONGO_PASSWORD=""
URL_MONGO=""
DB_NAME=""
USERS_COLLECTION=""
```

## Launching

Launch the project with Docker.

Use

```
docker-compose up --build -d
```
or

```
docker compose up --build -d
```