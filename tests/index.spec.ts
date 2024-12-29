import { testPrintLnObj } from "../src/printLn";
import program from "../src/program";
import { addCab } from "../src/dispatchController";
import {describe, test, expect, vi} from 'vitest';
import prisma from '../src/__mocks__/client'
vi.mock('../src/client')

function messageReader(messages: string[]) {
    let storedMessages = messages;
    return () => new Promise<string | undefined>(
        (res, rej) =>
            res(storedMessages.pop()));
}

describe("End to end tests", () => {
    test("program contains exit command prompt", async () => {
        const printLnFn = testPrintLnObj
        await program(printLnFn, messageReader(["0"]));

        expect(printLnFn.messages).toContain("0. Exit");
    })
    test("program can select option 1 then 0", async () => {
        const printLnFn = testPrintLnObj
        await program(printLnFn, messageReader(["1", "0"]));

        expect(printLnFn.messages).toContain("0. Exit");
    })
    test("the addCab method creates a new cab in the database", async () => {
        const cab = {
            id: 1,
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const cabs = prisma.cabs;
        cabs.create.mockResolvedValue(cab);
        const createSpy = vi.spyOn(cabs, 'create');

        const firstCab = await addCab();

        expect(firstCab.CabName).toBe(cab.CabName);
        expect(firstCab.Status).toBe(cab.Status);
        expect(firstCab.id).toBe(cab.id);
        expect(createSpy).toHaveBeenCalledWith({ data: {
            CabName: cab.CabName,
            Status: cab.Status
        }})
    })
})
