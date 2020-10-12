# LibQuality

> REST API for Venturus Quality Dashboard

## TL;DR

### Running server API:

```shell
git clone https://github.com/quantodaniel/LibQuality
cd LibQuality
cp .env.example .env
yarn run dev
```

### List of endpoints:

| Description                | Endpoint                          |
| -------------------------- | --------------------------------- |
| Find repositories          | GET /search/?q=react              |
| Get repository data        | GET /repos/:owner/:repo/metadata  |
| Show repository statistics | GET /repos/:owner/:repo/analytics |

## Introduction

These API Endpoints lets you search for repositores by name and get simple raw data from any public repository.

The following premises were taken for the purpose of this development:

- No authentication methods or token validations are in place
- The current IP accessing the API is used as User key
- Given the [Github rate limit rules](https://docs.github.com/en/free-pro-team@latest/rest/reference/rate-limit) (just 60 requests each hour) only the last month of data will be fetched

## Installation

First install all the dependencies required to run containers with docker and starting the server.

LibQuality requires the following tools to run:

| Tools          | Installation guide                          |
| -------------- | ------------------------------------------- |
| Docker         | https://www.docker.com/get-started          |
| Docker Compose | https://docs.docker.com/compose/install/    |
| yarn           | https://classic.yarnpkg.com/en/docs/install |

## Running the server:

Clone the repository:

```shell
git clone https://github.com/quantodaniel/LibQuality
```

Open your OS Terminal and run these commands in order to create a new `.env` file and install all the dependencies:

```shell
cd LibQuality
cp .env.example .env
yarn install
```

Run containers:

```shell
yarn run dev
```

Now the server should be running on port `3000`.

## Usage

Find repositories:

```
GET /search/?q=react
```

**Response:**

```ts
[
  {
    owner: string;
    repo: string;
    metadata_url: "/repos/:owner/:repo/metadata";
  }
]
```

Get repository data:

```
GET /repos/:owner/:repo/metadata
```

**Response:**

```ts
{
  owner: string;
  repo: string;
  open_issues_count: number;
  open_issues_avg: number;
  open_issues_std: number;
}
```

Show repository statistics:

```
GET /repos/:owner/:repo/analytics
```

**Response:**

```ts
[
  {
    _id: Date;
    open: number;
    closed: number;
  }
]
```

## Running tests

Open your OS Terminal and run these commands:

```shell
yarn run test
```

## Development

Aiming performance and blazing fast development time this API follows the SOLID pattern and also uses some libs to better communicate with Github API.

| Lib                   | Description                                    |
| --------------------- | ---------------------------------------------- |
| @octokit/rest         | GitHub REST API client for JavaScript          |
| @octokit/plugin-retry | Retries requests for server 4xx/5xx responses  |
| express               | Backend web application framework              |
| body-parser           | Node.js body parsing middleware                |
| celebrate             | Wraps the JOI validation library               |
| cors                  | Manages cross-origin resource sharing          |
| date-fns              | Toolset for manipulating dates                 |
| dotenv                | Loads environment variables from a .env file   |
| helmet                | Secure Express by setting various HTTP headers |
| jest                  | JavaScript Testing Framework                   |
| mongoose              | Schema based solution for MongoDB validation   |
| morgan                | HTTP request logger                            |
| request-ip            | Module for retrieving a request's IP address   |
