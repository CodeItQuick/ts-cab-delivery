import prisma from "./client";
import CustomersRepository from "./customersRepository";
import customerRepository from "./customersRepository";
import cabsRepository from "./cabsRepository";

// type cabStatus = 'Available' | 'TransportingCustomer' | 'CustomerRideRequested';

async function customerCall() {
    return CustomersRepository.create();
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
    await cabsRepository.update(availableCab.id!, "CustomerRideRequested");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "InitialCabCall");
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
    await cabsRepository.update(availableCab.id!, "TransportingCustomer");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "CustomerAssignCab");
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
    await cabsRepository.update(availableCab.id!, "Available");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "CabDropOffCustomer");
}
async function customerCancelledRide() {
    const firstAvailableCustomer = await customerRepository.findFirst("InitialCustomerCall");
    if (!firstAvailableCustomer?.id) {
        throw new Error("No customers have called in")
    }
    return CustomersRepository.update(firstAvailableCustomer?.id!, "CustomerCancelledRide");
}


export { customerCall, cabRideRequest, cabPickUpCustomer, cabDropOffCustomer, customerCancelledRide };