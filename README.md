# pt.md-api
Posta Moldovei Terminals API base on pt.md library (https://pt.md)

## Prerequisites

- [ ] NodeJS >= v8.x.x

## Installation

```bash
npm install pt.md-api
```

## Usage

### Configuration

```bash
cp .env.sample .env
```

> We advice to `.env` and change `JWT_SECRET` due to security reasons

### Production

```bash
npm run start
```

> Production involves pm2 tool usage, thus once started you should run `npm run stop` to stop the server

### Development

```bash
npm run start:dev
```

### Example Usage

```bash
curl -XPOST http://localhost:3001/rpc -H 'Content-Type: application/json' -H 'Authorization: Bearer your-jwt-token' -d '{"jsonrpc":"2.0","method":"ping","params":[],"id":0}'
```

You should see: `{"jsonrpc":"2.0","id":0,"result":"pong"}`

## API

REST Api:

- `[POST] path=/token | body={"username":"","password":""}` Obtain jWT token for further calls

RPC Methods (`/rpc`):

- `method=ping | params=[]` Is a RPC healthcheck method
- `method=list | params=[from, to, page, size]` Retrieve list of items delivered or to be delivered
  - *from[date] - list from date, default `now - 7 days`
  - *to[date] - list to date, default `now`
  - *page[int] - list from page starting w/ 1, default `1`
  - *size[int] - items per page, default `100`
- `method=pay | params=[id]` Pay for an order
  - !id[int] - Id of the order (`orderID`)

**All RPC method should be authorized using JWT token obtained from `/token` endpoint.**

> All date types are passed as strings to `new Date()` constructor (@ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## TODO

- [ ] Add JWT tokens expiration and invalidation logic
