# JFB-virtualmind
This is a test for a work interview.

# Requirements

-Nodejs: 
$ node -v
v12.4.0

-npm:
$ npm version
{
  server: '1.0.0',
  npm: '6.9.0',
  ares: '1.15.0',
  brotli: '1.0.7',
  cldr: '35.1',
  http_parser: '2.8.0',
  icu: '64.2',
  llhttp: '1.1.3',
  modules: '72',
  napi: '4',
  nghttp2: '1.38.0',
  node: '12.4.0',
  openssl: '1.1.1b',
  tz: '2019a',
  unicode: '12.1',
  uv: '1.29.1',
  v8: '7.4.288.27-node.18',
  zlib: '1.2.11'
}

- MySQL:
$ mysql --version
mysql  Ver 14.14 Distrib 5.7.26, for Linux (x86_64) using  EditLine wrapper


# Steps to configure the project.

1- Run "server/src/database/jfb_virtualmind.sql" file to generate the MySQL database.

2- In the file "server/src/database.js". Configure the DB data for your environment.

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'jfb_virtualmind' // Don't change the database name.
});

3- Is necesary to run both npm start command for server and client as well.

First, for the express server, open a terminal inside the folder "server", and then run:
npm run dev

Next, for the react client, open a terminal inside the folder "client", and then run:
npm install

npm start

Hope you like it! xD
