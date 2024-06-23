# Tissu Collectif [Work in progress]

Welcome to Tissu Collectif Repository 🚀

## Introduction

Tissu Collectif is a vintage clothing management software. The application simplifies and automates the management of your vintage clothing inventories.

## Setup

Create a .env file which must look like this:

```
NODE_ENV=""
JWT_SECRET=""
PASSWORD_KEY=""
MONGO_USER=""
MONGO_PASSWORD=""
URL_MONGO=""
URL_MONGO_TEST=""
DB_NAME=""
USERS_COLLECTION=""
CONTRACTS_COLLECTION=""
BALES_COLLECTION=""
SUPPLIERS_COLLECTION=""
CLOTHES_COLLECTION=""
```

## Usage

Launch the project with Docker using

```
docker compose up --build -d
```
