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
        if (status === 'TransportingCustomer') {
            const collectedFare = 5;
            const customer = await prisma.customers
                .findFirst({ where: { Status: "CustomerAssignCab" }});
            await prisma.cabRevenue.create({
                data: {
                    CabId: firstCab!.id,
                    CustomerId: customer!.id,
                    Fare: collectedFare
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