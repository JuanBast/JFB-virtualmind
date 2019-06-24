# JFB-virtualmind
This is a test for a work interview.

# Requirements
Nodejs and MySQL must to be installed.

# Steps to configure the project.

1- Run "server/src/database/jfb_virtualmind.sql" file to generate the MySQL database.

2- Configure the DB data for your environment. In the file "server/src/database.js".

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'jfb_virtualmind' // Don't change the database name.
});

3- Is necesary to run both npm start command for server and client as well.

For the express server, open a terminal inside the folder "server", and run:
npm run dev

For the react client, open a terminal inside the folder "client", and run:
npm start

Hope you like it! xD
