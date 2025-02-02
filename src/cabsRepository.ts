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
    function findFirst(status: string) {
        return cabsTable.findFirst({
            where: {
                Status: status
            }
        });
    }
    function deleteItem(id: number) {
        return prisma.cabs.delete({
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