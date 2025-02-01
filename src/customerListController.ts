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
    const availableCab = await prisma.cabs.findFirst({
        where: {
            Status: "Available"
        }
    });
    if (!availableCab?.id) {
        throw new Error("No available cabs");
    }
    const firstAvailableCustomer = await prisma.customers.findFirst({
        where: {
            Status: "InitialCustomerCall"
        }
    });
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers have called in");
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
async function cabPickUpCustomer() {
    const availableCab = await prisma.cabs.findFirst({
        where: {
            Status: "Available"
        }
    });
    if (!availableCab?.id) {
        throw new Error("No available cabs");
    }
    const firstAvailableCustomer = await prisma.customers.findFirst({
        where: {
            Status: "InitialCabCall"
        }
    });
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

async function cabDropOffCustomer() {
    const availableCab = await prisma.cabs.findFirst({
        where: {
            Status: "Available"
        }
    });
    if (!availableCab?.id) {
        throw new Error("No available cabs");
    }
    const firstAvailableCustomer = await prisma.customers.findFirst({
        where: {
            Status: "CustomerAssignCab"
        }
    });
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers available to drop off")
    }
    return prisma.customers.update({
        where: {
            id: firstAvailableCustomer?.id ?? 0
        },
        data: {
            id: firstAvailableCustomer?.id ?? 0,
            CustomerName: firstAvailableCustomer?.CustomerName ?? "",
            Status: "CabDropOffCustomer",
        }
    })
}
async function customerCancelledRide() {
    const firstAvailableCustomer = await prisma.customers.findFirst({
        where: {
            Status: "InitialCabCall"
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
            Status: "CustomerCancelledRide",
        }
    })
}


export { customerCall, cabRideRequest, cabPickUpCustomer, cabDropOffCustomer, customerCancelledRide };