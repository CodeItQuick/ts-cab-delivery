import {testPrintLnObj} from "../src/printLn";
import program from "../src/program";
import {addCab, removeCab} from "../src/fleetController";
import {describe, expect, test, vi} from 'vitest';
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
        const cab = {
            id: 1,
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const cabs = prisma.cabs;
        cabs.create.mockResolvedValue(cab);
        const createSpy = vi.spyOn(cabs, 'create');

        await program(printLnFn, messageReader(["0", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(createSpy).toHaveBeenCalledWith({ data: {
                CabName: cab.CabName,
                Status: cab.Status
            }})
    })
    test("program can remove a cab", async () => {
        const printLnFn = testPrintLnObj
        const cab = {
            id: 1,
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const cabs = prisma.cabs;
        cabs.create.mockResolvedValue(cab);
        cabs.aggregate.mockResolvedValue({
            _min: {
                id: 1
            },
            _count: undefined, _avg: undefined, _sum: undefined, _max: undefined
        });
        cabs.delete.mockResolvedValue(cab);
        const createSpy = vi.spyOn(cabs, 'create');

        await program(printLnFn, messageReader(["0", "2", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(printLnFn.messages).toContain("Cab was removed");
        expect(createSpy).toHaveBeenCalledWith({ data: {
                CabName: cab.CabName,
                Status: cab.Status
            }})
    })
    test("program reports if no cab removed", async () => {
        const printLnFn = testPrintLnObj
        const cabs = prisma.cabs;
        cabs.aggregate.mockResolvedValue({
            _min: {
                id: 0
            },
            _count: undefined, _avg: undefined, _sum: undefined, _max: undefined
        });

        await program(printLnFn, messageReader(["0", "2"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("No available cabs");
    })
    test("program can take a customer call", async () => {
        const printLnFn = testPrintLnObj
        const cab = {
            id: 1,
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const cabs = prisma.cabs;
        cabs.create.mockResolvedValue(cab);
        const createSpy = vi.spyOn(cabs, 'create');
        const customerList = prisma.customers
        let customer = {
            id: 1,
            CustomerName: "Dan",
            Status: "InitialCustomerCall"
        };
        customerList.create.mockResolvedValue(customer);
        const createCustomerSpy = vi.spyOn(customerList, 'create');

        await program(printLnFn, messageReader(["0", "7", "1"]));

        expect(printLnFn.messages).toContain("0. Exit");
        expect(printLnFn.messages).toContain("New cab was added");
        expect(printLnFn.messages).toContain("Customer called for a ride");
        expect(createSpy).toHaveBeenCalledWith({ data: {
                CabName: cab.CabName,
                Status: cab.Status
            }});
        expect(createCustomerSpy).toHaveBeenCalledWith({ data: {
                CustomerName: "Dan",
                Status: "InitialCustomerCall"
            }});
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
        expect(firstCab.Status).toBe(cab.Status );
        expect(firstCab.id).toBe(cab.id);
        expect(createSpy).toHaveBeenCalledWith({ data: {
            CabName: cab.CabName,
            Status: cab.Status
        }})
    })
    test("the removeCab method removes an existing cab in the database", async () => {
        const cab = {
            id: 1,
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const cabs = prisma.cabs;
        cabs.aggregate.mockResolvedValue({ _min: cab, _count: undefined, _avg: undefined, _sum: undefined, _max: undefined })
        cabs.delete.mockResolvedValue(cab);
        const deleteSpy = vi.spyOn(cabs, 'delete');

        const firstCab = await removeCab();

        expect(firstCab.CabName).toBe(cab.CabName);
        expect(firstCab.Status).toBe(cab.Status);
        expect(firstCab.id).toBe(cab.id);
        expect(deleteSpy).toHaveBeenCalledWith({
            where: { id: 1 }
        })
    })
    test("the removeCab method throws an error if no valid cabs found", async () => {
        const cab = {
            id: null,
            CabName: null,
            Status: null
        }
        const cabs = prisma.cabs;
        cabs.aggregate.mockResolvedValue({ _min: cab, _count: undefined, _avg: undefined, _sum: undefined, _max: undefined })

        await expect(removeCab()).rejects.toThrow("No available cabs");
    })
    test("the removeCab method throws an error if undefined cabs found", async () => {
        const cabs = prisma.cabs;
        cabs.aggregate.mockResolvedValue({ _min: undefined, _count: undefined, _avg: undefined, _sum: undefined, _max: undefined })

        await expect(removeCab()).rejects.toThrow("No available cabs");
    })
})
