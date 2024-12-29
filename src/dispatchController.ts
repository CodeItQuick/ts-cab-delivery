import {PrismaClient} from "@prisma/client";

// type cabStatus = 'Available' | 'TransportingCustomer' | 'CustomerRideRequested';

function addCab() {
    const prismaClient = new PrismaClient();
    prismaClient.cabs.create({
        data: {
            CabName: "Evan's Cab",
            Status: "Available"
        }
    })
    return true;
}

export { addCab };