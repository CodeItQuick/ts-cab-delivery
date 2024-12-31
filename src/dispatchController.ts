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

async function removeCab() {
    const minId = await prisma.cabs.aggregate({
        _min: {
            id: true
        },
        where: {
            Status: 'Available'
        }
    });
    if (minId?._min === null || minId?._min === undefined) {
        throw new Error("No available cabs");
    }
    const minIdNumber = minId._min.id ?? 0;
    return prisma.cabs.delete({
        where: {
            id: minIdNumber
        }
    });
}

export { addCab, removeCab };