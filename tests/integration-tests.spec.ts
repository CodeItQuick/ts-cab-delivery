import prisma from "../src/client";
import {addCab, removeCab} from "../src/fleetController";
import {
    cabDropOffCustomer,
    cabPickUpCustomer,
    cabRideRequest,
    customerCall,
    customerCancelledRide
} from "../src/customerListController";
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
    test("dispatch can request a cab through cabRideRequest", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const addedCab = await addCab();
        await customerCall();

        const customer = await cabRideRequest();

        expect(addedCab.CabName).toBe(cab.CabName);
        expect(addedCab.Status).toBe(cab.Status);
        expect(customer.Status).toBe("InitialCabCall");
    })
    test("dispatch can request a cab through cabRideRequest and it fails when no customers have called in", async () => {
        await addCab();
        await expect(cabRideRequest()).rejects.toThrowError("No customers have called in");
    })
    test("dispatch can request a cab through cabRideRequest and it fails when no cabs available", async () => {
        await expect(cabRideRequest()).rejects.toThrowError("No available cabs");
    })
    test("dispatch can pick up a customer", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const addedCab = await addCab();
        await customerCall();
        await cabRideRequest();

        const customer = await cabPickUpCustomer();

        expect(addedCab.CabName).toBe(cab.CabName);
        expect(addedCab.Status).toBe(cab.Status);
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CustomerAssignCab");
    })
    test("dispatch can request a cab through cabPickUpCustomer and it fails when no customers have called in", async () => {
        await addCab();
        await expect(cabPickUpCustomer()).rejects.toThrowError("No customers available to pickup");
    })
    test("dispatch can request a cab through cabPickUpCustomer and it fails when no cabs available", async () => {
        await expect(cabPickUpCustomer()).rejects.toThrowError("No available cabs");
    })
    test("dispatch can drop off a customer", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const addedCab = await addCab();
        await customerCall();
        await cabRideRequest();
        await cabPickUpCustomer();

        const customer = await cabDropOffCustomer();

        expect(addedCab.CabName).toBe(cab.CabName);
        expect(addedCab.Status).toBe(cab.Status);
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CabDropOffCustomer");
    })
    test("dispatch can request a cab through cabDropOffCustomer and it fails when no customers have called in", async () => {
        await addCab();
        await expect(cabDropOffCustomer()).rejects.toThrowError("No customers available to drop off");
    })
    test("dispatch can request a cab through cabDropOffCustomer and it fails when no cabs available", async () => {
        await expect(cabDropOffCustomer()).rejects.toThrowError("No available cabs");
    })
    test("dispatch can cancel a ride", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const addedCab = await addCab();
        await customerCall();
        await cabRideRequest();

        const customer = await customerCancelledRide();

        expect(addedCab.CabName).toBe(cab.CabName);
        expect(addedCab.Status).toBe(cab.Status);
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CustomerCancelledRide");
    })
})
