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
    })
    test("the removeCab method removes an existing cab in the database", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        await addCab();

        const firstCab = await removeCab();

        expect(firstCab.CabName).toBe(cab.CabName);
        expect(firstCab.Status).toBe(cab.Status);
    })
    test("the removeCab method throws an error if no valid cabs found", async () => {
        await expect(removeCab()).rejects.toThrow("No available cabs");
    })
})
