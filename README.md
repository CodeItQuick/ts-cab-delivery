# Getting Started


# Testing Philosophy

## Architecture

| program                      |
|------------------------------| 
| input/output adapter layers | 
| controllers/translation layer | 
| repository layer | 
| database layer|



## User Interface Interactions

### Setting up the database to run the entire program

We first define a client in the production code as:  
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma
```

We inject a test database/ensure we are not on the production database, and then
wipe the database before every test. 
```typescript
describe("End-to-end tests", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
        await prisma.employeesTimesheet.deleteMany();
        await prisma.clockInEmployee.deleteMany();
    });
});
```

This allows storage and mutation of the data as the program runs.

### Setting "Commands" for Program Input
The console application takes input from the user in the form of numbers formatted as strings. Valid inputs include:  
```
0
1
2
3
4
5
6
7
8
```

It uses the following function in production:
```typescript
import inquirer from 'inquirer'; // external dependency

async function getPrompt(): Promise<string | undefined> {
    const prompt: { name?: string } = await
        inquirer.prompt([{message: "Enter a selection: ", type: "input", name: "name"}]);
    return prompt?.name;
}
```

It uses the following function in testing:
```typescript
function getPrompt(messages: string[]) {
    let storedMessages = messages;
    return () => {
        return new Promise<string | undefined>(
            (res) => res(storedMessages.shift()));
    };
}
```


### "Spying" on Program Output
The console application sends output to the console.

It uses the following function in production:
```typescript
type TPrintLnObj = { printLn: IPrintLn, messages: string[] };
const printLnObj: TPrintLnObj = {
    printLn: function (message: string) {
        console.log(message); // print the message to the console
        this.messages = [...this.messages, message]
    },
    messages: []
}
```

It uses the following function in testing:
```typescript
const testPrintLnObj: TPrintLnObj = {
    printLn: function (message: string) {
        this.messages = [...this.messages, message]
    },
    messages: []
}
```

### End to End Testing
The above handling of input and output allows for the following handling of end-to-end tests:

```typescript

test("program can select option 1 then 0", async () => {
    const printLnFn = { ...testPrintLnObj, messages: [] }; 
    // given we entered "1" and "0"

    // when we call the program
    await program(printLnFn, getPrompt(["1", "0"])); 

    // then we print to the console a cab was added
    expect(printLnFn.messages).toContain("Dispatch recorded cab was added."); 
})
```

If a build-up of state is required, the current program is brought into that state through calling
the functions as they would be by the user. For example:

```typescript
test("program can drop off multiple customer calls with a single cab", async () => {
    const printLnFn = { ...testPrintLnObj, messages: [] };

    await program(printLnFn, getPrompt(["1", "3", "3", "5", "6", "7", "5", "6", "7", "0"]));

    expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
    expect(printLnFn.messages.filter(x => x === "Dispatch recorded customer is dropped off.").length).toEqual(2);
})
```

## Integration Testing: More "tightly scoped" testing

We setup the database similar to before. The "Repository Layer" acts in a manner to retrieve
domain objects from the database directly and isolate any of the code necessary for its retrieval
from the database. 

For example:
```typescript
import prisma from "./client"; // prisma is an ORM/database code. It will only be imported/used in the repository layer

function cabsRepository() {
    const cabsTable = prisma.cabs;
    function create() {
        return cabsTable.create({
            data: {
                CabName: "Evan's Cab",
                Status: "Available"
            }
        });
    }
    return {
        create
    }
}
```

We can then test this code directly in a similar manner to our end-to-end tests but more simplified:

```typescript
import prisma from "../../src/client";
import {addCab, removeCab} from "../../src/fleetController";
import {beforeEach, describe, expect, test} from "@jest/globals";

describe("Integration tests", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
    })

    test("the addCab method creates a new cab in the database", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }

        const firstCab = await addCab();

        expect(firstCab.CabName).toBe(cab.CabName);
        expect(firstCab.Status).toBe(cab.Status);
    });
});
```