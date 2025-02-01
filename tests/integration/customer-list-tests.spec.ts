import prisma from "../../src/client";
import {addCab} from "../../src/fleetController";
import {
    cabDropOffCustomer,
    cabPickUpCustomer,
    cabRideRequest,
    customerCall,
    customerCancelledRide
} from "../../src/customerListController";
import {beforeEach, describe, expect, test} from "@jest/globals";

describe("Integration tests: Dispatch ", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
    })
    test("requests cab to pickup customer", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const addedCab = await addCab();
        await customerCall();

        const customer = await cabRideRequest();

        expect(addedCab.CabName).toBe(cab.CabName);
        expect(await prisma.cabs.findFirst({ where: { Status: "CustomerRideRequested" }})).toBeTruthy();
        expect(customer.Status).toBe("InitialCabCall");
    })
    test("attempts to request cab to pickup customer and it fails when no customers have called in", async () => {
        await addCab();
        await expect(cabRideRequest()).rejects.toThrowError("No customers have called in");
    })
    test("attempts to request cab to pickup customer and it fails when no cabs available", async () => {
        await expect(cabRideRequest()).rejects.toThrowError("No available cabs");
    })
    test("asks can pick up a customer", async () => {
        const cab = {
            CabName: "Evan's Cab",
            Status: "Available"
        }
        const addedCab = await addCab();
        await customerCall();
        await cabRideRequest();

        const customer = await cabPickUpCustomer();

        expect(addedCab.CabName).toBe(cab.CabName);
        expect(await prisma.cabs.findFirst({ where: { Status: "TransportingCustomer" }})).toBeTruthy();
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CustomerAssignCab");
    })
    test("attempts to ask cab to pick up a customer and it fails when no cab assigned to pickup customer", async () => {
        await expect(cabPickUpCustomer()).rejects.toThrowError("No assigned cab to pickup customer");
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
        expect(await prisma.cabs.findFirst({ where: { Status: "Available" }})).toBeTruthy();
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CabDropOffCustomer");
    })
    test("dispatch can request a cab through cabDropOffCustomer and it fails when no cabs available", async () => {
        await addCab();
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
    test("dispatch can request a cab through customerCancelledRide and it fails when no customers have called in", async () => {
        await addCab();
        await expect(customerCancelledRide()).rejects.toThrowError("No customers have called in");
    })
})
