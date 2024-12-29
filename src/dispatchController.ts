import prisma from "./client";

// type cabStatus = 'Available' | 'TransportingCustomer' | 'CustomerRideRequested';

async function addCab() {
    return prisma.cabs.create({
        data: {
            CabName: "Evan's Cab",
            Status: "Available"
        }
    });
}

export { addCab };