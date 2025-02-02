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
    test("records cab assigned to pickup customer", async () => {
        await addCab();
        await customerCall();

        const customer = await cabRideRequest();

        expect(await prisma.cabs.findFirst({ where: { Status: "CustomerRideRequested" }})).toBeTruthy();
        expect(customer.Status).toBe("InitialCabCall");
    })
    test("records cab assigned to pickup customer and it fails when no customers have called in", async () => {
        await addCab();
        await expect(cabRideRequest()).rejects.toThrowError("No customers have called in");
    })
    test("records cab assigned to pickup customer and it fails when no cabs available", async () => {
        await expect(cabRideRequest()).rejects.toThrowError("No available cabs");
    })
    test("records cab picked up a customer", async () => {
        await addCab();
        await customerCall();
        await cabRideRequest();

        const customer = await cabPickUpCustomer();

        const cabs = await prisma.cabs.findFirst({ where: { Status: "TransportingCustomer" }});

        expect(cabs).toBeTruthy();
        expect(cabs!.Revenue.toString()).toEqual("5");
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CustomerAssignCab");
    })
    test("attempts to record cab picked up a customer and it fails when no cab was assigned to pickup customer", async () => {
        await expect(cabPickUpCustomer()).rejects.toThrowError("No assigned cab to pickup customer");
    })
    test("records cab dropped off a customer", async () => {
        await addCab();
        await customerCall();
        await cabRideRequest();
        await cabPickUpCustomer();

        const customer = await cabDropOffCustomer();

        expect(await prisma.cabs.findFirst({ where: { Status: "Available" }})).toBeTruthy();
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CabDropOffCustomer");
    })
    test("attempts to record cab dropped off customer and it fails when no cab transporting a customer", async () => {
        await expect(cabDropOffCustomer()).rejects.toThrowError("No cab transporting a customer");
    })
    test("records customer ride request cancelled", async () => {
        await addCab();
        await customerCall();

        const customer = await customerCancelledRide();

        expect(await prisma.customers.findFirst({ where: { Status: "CustomerCancelledRide" }})).toBeTruthy();
        expect(customer).toBeTruthy();
        expect(customer.Status).toBe("CustomerCancelledRide");
    })
    test("attempts to record customer ride cancelled and it fails when no customers have called in", async () => {
        await addCab();
        await expect(customerCancelledRide()).rejects.toThrowError("No customers have called in");
    })
})
