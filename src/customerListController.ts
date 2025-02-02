import CustomersRepository from "./customersRepository";
import customerRepository from "./customersRepository";
import cabsRepository from "./cabsRepository";

async function customerCall() {
    return CustomersRepository.create();
}
async function cabRideRequest() {
    const availableCab = await cabsRepository.findFirst("Available", "No available cabs");
    const firstAvailableCustomer = await customerRepository
        .findFirst("InitialCustomerCall", "No customers have called in");
    await cabsRepository.update(availableCab.id!, "CustomerRideRequested");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "InitialCabCall");
}
async function cabPickUpCustomer() {
    const availableCab = await cabsRepository.findFirst("CustomerRideRequested", "No assigned cab to pickup customer");
    const firstAvailableCustomer = await customerRepository.findFirst("InitialCabCall");
    await cabsRepository.update(availableCab.id!, "TransportingCustomer");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "CustomerAssignCab");
}

async function cabDropOffCustomer() {
    const availableCab = await cabsRepository.findFirst("TransportingCustomer", "No cab transporting a customer");
    const firstAvailableCustomer = await customerRepository.findFirst("CustomerAssignCab", "No customers available to drop off");
    await cabsRepository.update(availableCab.id!, "Available");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "CabDropOffCustomer");
}
async function customerCancelledRide() {
    const firstAvailableCustomer = await customerRepository.findFirst("InitialCustomerCall", "No customers have called in");
    return CustomersRepository.update(firstAvailableCustomer?.id!, "CustomerCancelledRide");
}


export { customerCall, cabRideRequest, cabPickUpCustomer, cabDropOffCustomer, customerCancelledRide };