## REDACTED Frontend Code Challenge

### The Challenge

The end goal for this challenge is for you to use the data provided by the `json-server` to display a list of products with it's associated user via the `created_by_id` field and the `/users` api end point. The UI choices are up to you.

A few examples include but not limited to:

- filter by active products
- filter by colors
- search by product name
- paginate the products list
- add the ability to create a new product or delete one
- show all products given a certain user
- add tests around your code

We ask that you spend no more than an hour or so working on this - it does not need to be polished or production-ready. We just want to hear about it and be able to ask questions about decisions made and thought processes. Our only parameter is that we'd like it to be in JS.

### Setup

In order to setup this repo you will first need to clone it locally and then change into the `frontend-challenge` and run `yarn install`.

```
git clone https://github.com/firehydrant/frontend-challenge
cd frontend-challenge
yarn install
```

### Starting the Server

This repo is setup to run both an instance of `create-react-app` as well as a local `json-server` using the `yarn dev` command.

```
yarn dev
```

### Create React App Info

This is a bare bones setup. Feel free to use libraries you would like to add.

### JSON Server Info

If you would like to look at your options for querying the server for pagination, filtering and such you can view the documentation https://github.com/typicode/json-server.

The current server holds data for three different data types listed below and runs on `http://localhost:3001`. This server uses faker behind the scenes to generate the data on each boot up.

```
// /products
// returns an Array[] of products

{
  "id": 1,
  "name": "Incredible Granite Mouse",
  "created_at": "2055-10-10T06:44:45.088Z",
  "summary": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
  "color": "tan",
  "active": false,
  "created_by_id": 85
}
```

```
// /users
// returns an Array[] of users

{
  "id": 1,
  "name": "Sergio Lueilwitz",
  "email": "Alek_Okuneva76@yahoo.com",
  "avatar": "https://cdn.fakercloud.com/avatars/Chakintosh_128.jpg"
}
```

```
// /colors
// returns an Array[] of colors

{
  "id": 1,
  "name": "tan"
}
```
