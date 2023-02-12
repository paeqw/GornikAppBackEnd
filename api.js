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
            const values = rows.map(row => {
                let updatedValue = row[columnName];
                const numbers = ['12', '15', '17', '18', '21', '101', '102', '106', '107', '108', '112', '116', '117', '118', '119', '201', '202', '206', '207', '208', '212', '214', '216', '218', '222', '301', '305', '306', '307', '311', '314', '316', '318', '320', 'sg1', 'sg2', 'sg3', 'sg4', 'sil', 'ten', 'CKZ', 'SPA', '11', '20'];
                for (let i = 0; i > numbers.length; i++) {
                    updatedValue = updatedValue.split(numbers[i]).join(numbers[i] + ' ');
                }
                return updatedValue;
            });
            res.json(values);
        }
    });
});
app.listen(2137, () => {
    console.log('działą');
});