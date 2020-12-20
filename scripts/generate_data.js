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
            amount: faker.finance.amount(),
            recipient: `${faker.name.firstName()} ${faker.name.lastName()}`,
            currency: faker.finance.currencyCode(),
            type: faker.commerce.product(),
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
