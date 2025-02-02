import prisma from "./client";

function cabsRepository() {
    const cabsTable = prisma.cabs;
    function create() {
        return cabsTable.create({
            data: {
                CabName: "Evan's Cab",
                Status: "Available"
            }
        });
    }
    async function update(id: number, status: string) {
        const firstCab = await cabsTable.findFirst({
            where: {
                id: id
            }
        });
        let collectedFare = 0;
        if (status === 'TransportingCustomer') {
            collectedFare += 5;
            await prisma.cabRevenue.create({
                data: {
                    CabId: firstCab!.id,
                    Fare: 5
                }
            });
        }
        return cabsTable.update({
            where: {
                id: firstCab!.id
            },
            data: {
                Status: status
            }
        });
    }
    async function findFirst(status: string, errMessage: string = "No cabs found") {
        const firstCab = await cabsTable.findFirst({
            where: {
                Status: status
            }
        });
        if (!firstCab?.id) {
            throw new Error(errMessage);
        }
        return firstCab;
    }
    function deleteItem(id: number) {
        return cabsTable.delete({
            where: {
                id
            }
        });
    }
    return {
        create, update, findFirst, deleteItem
    }
}

const CabsRepository = cabsRepository();

export default CabsRepository;