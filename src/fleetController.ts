import cabsRepository from "./cabsRepository";

// type cabStatus = 'Available' | 'TransportingCustomer' | 'CustomerRideRequested';

async function addCab() {
    return cabsRepository.create();
}

async function removeCab() {
    const cab = await cabsRepository.findFirst("Available");
    if (!cab || !cab?.id ) {
        throw new Error("No available cabs");
    }
    return cabsRepository.deleteItem(cab.id!);
}

export { addCab, removeCab };