const fs = require('fs');
const cheerio = require('cheerio');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'planoddzialow'
});

//pewnie da sie to lepiej zrobic
//zajme sie tym pozniej
const NrDoKlasy = {
    1: "1a", 2: "1b", 3: "1c", 4: "2a", 5: "2b", 6: "3a", 7: "3b", 8: "4a", 9: "4b", 10: "1at", 11: "1bt", 12: "1ct", 13: "1dt", 14: "1et", 15: "1ft", 16: "2at", 17: "2bt", 18: "2ct", 19: "2dt", 20: "3at", 21: "3bt", 22: "3ct", 23: "3dt", 24: "3et", 25: "4at", 26: "4bt", 27: "4ct", 28: "4dt", 29: "4atg", 30: "4btg", 31: "4ctg", 32: "4dtg", 33: "1ab", 34: "2ab", 35: "3ab"
}

const ktoryOddzialLicz = process.argv[2];
console.log(`zajmuje sie oddzialem ${NrDoKlasy[ktoryOddzialLicz]}`);
connection.query('truncate table ' + NrDoKlasy[ktoryOddzialLicz]);
fs.readFile('oddzial' + ktoryOddzialLicz + '.html', 'utf8', (err, html) => {
    if (err) throw err;
    const $ = cheerio.load(html);
    const table = $('table');
    table.find('tr').each((i, row) => {
        const data = {};
        $(row).find('td').each((j, cell) => {
            const header = $(table.find('th')[j]).text();
            const value = $(cell).text();
            data[header] = value;
        });
        if (i != 0) {
            connection.query('INSERT INTO ' + NrDoKlasy[ktoryOddzialLicz] + ' (Nr, Godz, Poniedziałek, Wtorek, Środa, Czwartek, Piątek) VALUES (?,?,?,?,?,?,?)', [data.Nr, data.Godz, data.Poniedziałek, data.Wtorek, data.Środa, data.Czwartek, data.Piątek], (err, results) => {
                if (err) throw err;

            });
        }
    });
});
console.log(`działą wszystko dodano do tabeli ${NrDoKlasy[ktoryOddzialLicz]}`);