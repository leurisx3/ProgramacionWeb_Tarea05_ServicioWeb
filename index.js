const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const readline = require('readline');
const app = express();
app.use(bodyParser.json())

app.get("/users", (request, response) => {

    function convert() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream('users.txt');

            stream.on('error', reject);

            const reader = readline.createInterface({
                input: stream
            });

            const array = [];

            reader.on('line', line => {
                array.push(JSON.parse(line));
            });

            reader.on('close', () => resolve(array));
        });
    }

    convert('users.txt')
        .then(res => {
            response.json(res);
        })
        .catch(err => console.error(err));
})

app.post("/addUsers", (request, response) => {

    var user = request.body
    user.name = user.name
    user.lastName = user.lastName
    var data = JSON.stringify(user) + '\r\n'

    fs.appendFile('users.txt', data, finished)

    function finished(err) {
        console.log('all set')
    }
    response.json(user)
})

const port = 8080
app.listen(port)