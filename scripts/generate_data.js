/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

function randomBool() {
    return Math.random() < 0.9;
}

function includeValue(val) {
    return randomBool() ? val : undefined;
}

function getPastDate() {
    const str = faker.date.past();
    const date = dayjs(str);

    return date.unix();
}

function generate(length) {
    const expenses = [];

    for (let a = 0; a < length; a++) {
        expenses.push({
            id: uuidv4(),
            transactionDate: includeValue(getPastDate()),
            amount: includeValue(faker.finance.amount()),
            recipient: includeValue(
                `${faker.name.firstName()} ${faker.name.lastName()}`
            ),
            currency: includeValue(faker.finance.currencyCode()),
            type: includeValue(faker.commerce.product()),
        });
    }

    return {
        expenses,
    };
}

function generateData(path, length) {
    const data = generate(length);

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

generateData("./db.json", 1000);
