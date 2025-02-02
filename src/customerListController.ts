import prisma from "./client";
import CustomerRepository from "./customerRepository";
import customerRepository from "./customerRepository";

// type cabStatus = 'Available' | 'TransportingCustomer' | 'CustomerRideRequested';

async function customerCall() {
    return CustomerRepository.create();
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
    const firstAvailableCustomer = await customerRepository.findFirst("InitialCustomerCall");
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers have called in");
    }
    await prisma.cabs.update({
        where: {
            id: availableCab?.id ?? 0
        },
        data: {
            id: availableCab?.id ?? 0,
            Status: "CustomerRideRequested",
        }
    })
    return CustomerRepository.update(firstAvailableCustomer?.id!, "InitialCabCall");
}
async function cabPickUpCustomer() {
    const availableCab = await prisma.cabs.findFirst({
        where: {
            Status: "CustomerRideRequested"
        }
    });
    if (!availableCab?.id) {
        throw new Error("No assigned cab to pickup customer");
    }
    const firstAvailableCustomer = await customerRepository.findFirst("InitialCabCall");
    await prisma.cabs.update({
        where: {
            id: availableCab?.id ?? 0
        },
        data: {
            id: availableCab?.id ?? 0,
            Status: "TransportingCustomer",
        }
    });
    return CustomerRepository.update(firstAvailableCustomer?.id!, "CustomerAssignCab");
}

async function cabDropOffCustomer() {
    const availableCab = await prisma.cabs.findFirst({
        where: {
            Status: "TransportingCustomer"
        }
    });
    if (!availableCab?.id) {
        throw new Error("No cab transporting a customer");
    }
    const firstAvailableCustomer = await customerRepository.findFirst("CustomerAssignCab");
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers available to drop off")
    }
    await prisma.cabs.update({
        where: {
            id: availableCab?.id ?? 0
        },
        data: {
            id: availableCab?.id ?? 0,
            Status: "Available",
        }
    });
    return CustomerRepository.update(firstAvailableCustomer?.id!, "CabDropOffCustomer");
}
async function customerCancelledRide() {
    const firstAvailableCustomer = await customerRepository.findFirst("InitialCustomerCall");
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers have called in")
    }
    return CustomerRepository.update(firstAvailableCustomer?.id!, "CustomerCancelledRide");
}


export { customerCall, cabRideRequest, cabPickUpCustomer, cabDropOffCustomer, customerCancelledRide };