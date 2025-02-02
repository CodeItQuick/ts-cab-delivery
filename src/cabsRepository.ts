import prisma from "./client";

function cabsRepository() {
    const cabsTable = prisma.cabs;
    function create() {
        return cabsTable.create({
            data: {
                CabName: "Evan's Cab",
                Status: "Available",
                Revenue: 0
            }
        });
    }
    async function update(id: number, status: string) {
        const firstCab = await cabsTable.findFirst({
            where: {
                id: id
            }
        });
        return cabsTable.update({
            where: {
                id: firstCab!.id
            },
            data: {
                Status: status,
                Revenue: +firstCab!.Revenue.toString() + 5
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