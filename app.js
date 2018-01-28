const express = require('express');
const app = express();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

function generateConfig(databaseName){
    return config =
        {
            userName: 'critters', // update me
            password: 'cr1tt#rs', // update me
            server: 'critterserver.database.windows.net', // update me
            options:
                {
                    database: databaseName,
                    encrypt: true
                }
        };
}
// Create connection to database
// This needs to be varied by school

var connection = new Connection(generateConfig('critter'));


app.get('/increment', function (req, res) {
    console.log('Starting GET Request');
    var query = req.query.species;
    var SQL = "UPDATE Bites SET bites=bites+1 WHERE SubCatgory='"+querySort(query)+"'";
    console.log('Reading rows from the Table...');
    var result = [];
    // Read all rows from table
    request = new Request(
        SQL,
        function (err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            console.log(result);
            res.send(true);
        }
    );
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            result.push(column.value);
        });

    });
    connection.execSql(request);
});
function querySort(query) {
    return query.replace('_',' ')

}
app.get('/critter', function (req, res) {
    console.log('Starting GET Request');
    var query = req.query.species;
    var SQL = "SELECT b.Bites, c.DangerLevel, c.Description FROM critter c LEFT JOIN  BITES b ON b.SubCatgory = c.SubCatagory WHERE b.SubCatgory='"+querySort(query)+"'";
    console.log('Reading rows from the Table...');
    var result = [];
    // Read all rows from table
    request = new Request(
        SQL,
        function (err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            console.log(result);
            res.send(result);
        }
    );
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            result.push(column.value);
        });

    });
    connection.execSql(request);
});

app.get('/stats', function (req, res) {
    console.log('Starting GET Request');
    var SQL = "SELECT * FROM BITES b;";
    console.log('Reading rows from the Table...');
    var result = [];
    // Read all rows from table
    request = new Request(
        SQL,
        function (err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            console.log(result);
            res.send(result);
        }
    );
    request.on('row', function (columns) {
        var line = []
        columns.forEach(function (column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            line.push(column.value);
        });
        result.push(line)

    });
    connection.execSql(request);
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Up and running at localhost:", port)
});

module.exports = app;