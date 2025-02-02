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
    function update(id: number, status: string) {
        return cabsTable.update({
            where: {
                id: id ?? 0
            },
            data: {
                id: id ?? 0,
                Status: status
            }
        })
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