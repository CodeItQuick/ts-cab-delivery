import {testPrintLnObj} from "../../src/printLn";
import program from "../../src/program";

import prisma from "../../src/client";
import {beforeEach, describe, expect, test} from "@jest/globals";

function messageReader(messages: string[]) {
    let storedMessages = messages;
    return () => {
        return new Promise<string | undefined>(
            (res) => res(storedMessages.shift()));
    };
}

describe("End-to-end tests", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
    })
    test("program can select option 1 then 0", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
    })
    test("program can remove a cab", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "2", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch recorded cab was removed.");
    })
    test("program reports if no cab removed", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["2", "0"]));

        expect(printLnFn.messages).toContain("No available cabs");
    })
    test("program can take a customer call", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch received customer call for a ride.");
    })
    test("program can assign a cab", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "5", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch received customer call for a ride.");
        expect(printLnFn.messages).toContain("Dispatch recorded cab requested.");
    })
    test("program can pickup a customer", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "5", "6", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch received customer call for a ride.");
        expect(printLnFn.messages).toContain("Dispatch recorded cab requested.");
        expect(printLnFn.messages).toContain("Dispatch recorded cab has picked up customer."); // TODO: change message
    })
    test("program can drop off a cab", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "5", "6", "7", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch received customer call for a ride.");
        expect(printLnFn.messages).toContain("Dispatch recorded cab requested.");
        expect(printLnFn.messages).toContain("Dispatch recorded cab has picked up customer.");
        expect(printLnFn.messages).toContain("Dispatch recorded customer is dropped off.");
    })
    test("program can drop off multiple customer calls with a single cab", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "3", "5", "6", "7", "5", "6", "7", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages.filter(x => x === "Dispatch recorded customer is dropped off.").length).toEqual(2);
    })
    test("program can drop off and handle a cancel request for multiple customers", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "3", "5", "6", "7", "4", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch recorded customer is dropped off.");
        expect(printLnFn.messages).toContain("Dispatch recorded customer cancelled a ride.");
    })
    test("program can cancel a cab", async () => {
        const printLnFn = { ...testPrintLnObj, messages: [] };

        await program(printLnFn, messageReader(["1", "3", "4", "0"]));

        expect(printLnFn.messages).toContain("Dispatch recorded cab was added.");
        expect(printLnFn.messages).toContain("Dispatch received customer call for a ride.");
        expect(printLnFn.messages).toContain("Dispatch recorded customer cancelled a ride.");
    })
})
