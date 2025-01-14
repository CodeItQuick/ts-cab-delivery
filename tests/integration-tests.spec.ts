import { testPrintLnObj } from "../src/printLn";
import program from "../src/program";
import { beforeEach, describe, expect, test } from 'vitest';
import prisma from "../src/client";

function messageReader(messages: string[]) {
    let storedMessages = messages;
    return () => new Promise<string | undefined>(
        (res, rej) =>
            res(storedMessages.pop()));
}

describe("Integration tests", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
    })
    test("program contains exit command prompt", async () => {
        const printLnFn = testPrintLnObj
        await program(printLnFn, messageReader(["0"]));

        expect(printLnFn.messages).toContain("0. Exit");
    })
    test("program can select option 1 then 0", async () => {
        const printLnFn = testPrintLnObj

        await program(printLnFn, messageReader(["0", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
    })
    test("program can remove a cab", async () => {
        const printLnFn = testPrintLnObj

        await program(printLnFn, messageReader(["0", "2", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(printLnFn.messages).toContain("Cab was removed");
    })
    test("program reports if no cab removed", async () => {
        const printLnFn = testPrintLnObj

        await program(printLnFn, messageReader(["0", "2"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("No available cabs");
    })
    test("program can take a customer call", async () => {
        const printLnFn = testPrintLnObj

        await program(printLnFn, messageReader(["0", "7", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(printLnFn.messages).toContain("Customer called for a ride");
    })
    test("program can assign a cab", async () => {
        const printLnFn = testPrintLnObj

        await program(printLnFn, messageReader(["0", "3", "7", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(printLnFn.messages).toContain("Customer called for a ride");
        expect(printLnFn.messages).toContain("Dispatch requested a cab.");
    })
    test("program can assign a cab", async () => {
        const printLnFn = testPrintLnObj

        await program(printLnFn, messageReader(["0", "4", "3", "7", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(printLnFn.messages).toContain("Customer called for a ride");
        expect(printLnFn.messages).toContain("Dispatch requested a cab.");
        expect(printLnFn.messages).toContain("Cab can pickup customer.");
    })
})
