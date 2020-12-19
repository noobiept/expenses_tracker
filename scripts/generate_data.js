/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

function generate(length) {
    const expenses = [];

    for (let a = 0; a < length; a++) {
        expenses.push({
            id: uuidv4(),
            transactionDate: faker.date.past(),
        });
    }

    return {
        expenses,
    };
}

function generateData(path, length) {
    const data = generate(length);

    fs.writeFileSync(path, JSON.stringify(data));
}

generateData("./db.json", 1000);
