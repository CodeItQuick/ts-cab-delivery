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
async function cabRideRequest() {
    const firstAvailableCustomer = await prisma.customers.findFirst({
        where: {
            Status: "InitialCustomerCall"
        }
    });
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers have called in")
    }
    return prisma.customers.update({
        where: {
            id: firstAvailableCustomer?.id ?? 0
        },
        data: {
            id: firstAvailableCustomer?.id ?? 0,
            CustomerName: firstAvailableCustomer?.CustomerName ?? "",
            Status: "InitialCabCall",
        }
    })
}
async function customerAssignCab() {
    const firstAvailableCustomer = await prisma.customers.findFirst({
        where: {
            Status: "InitialCabCall"
        }
    });
    const allCustomers = await prisma.customers.findMany();
    console.log(allCustomers);
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers available to pickup")
    }
    return prisma.customers.update({
        where: {
            id: firstAvailableCustomer?.id ?? 0
        },
        data: {
            id: firstAvailableCustomer?.id ?? 0,
            CustomerName: firstAvailableCustomer?.CustomerName ?? "",
            Status: "CustomerAssignCab",
        }
    })
}


export { customerCall, cabRideRequest, customerAssignCab };