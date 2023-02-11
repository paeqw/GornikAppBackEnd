const express = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'planoddzialow'
});

const app = express();
//http://192.168.100.27:2137/column?table=3bt&name=Poniedziałek
app.get('/column', (req, res) => {
    const tableName = req.query.table;
    const columnName = req.query.name;
    if (!tableName || !columnName) {
        res.status(400).send("podaj nazwe tabeli i kolumny debilu");
        return;
    }

    connection.query(`SELECT ${columnName} FROM ${tableName}`, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const values = rows.map(row => row[columnName]);
            res.json(values);
        }
    });
});
app.listen(2137, () => {
    console.log('działą');
});