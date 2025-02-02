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
    return {
        create, update, findFirst
    }
}

const CabsRepository = cabsRepository();

export default CabsRepository;