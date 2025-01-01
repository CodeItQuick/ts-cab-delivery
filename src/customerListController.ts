import prisma from "./client";

// type cabStatus = 'Available' | 'TransportingCustomer' | 'CustomerRideRequested';

async function customerCall() {
    return prisma.customers.create({
        data: {
            CustomerName: "Dan",
            Status: "InitialCustomerCall"
        }
    });
}


export { customerCall };