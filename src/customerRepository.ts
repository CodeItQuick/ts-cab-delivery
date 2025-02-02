import prisma from "./client";

function customersRepository() {
    const customersTable = prisma.customers;
    function create() {
        return customersTable.create({
            data: {
                CustomerName: "Dan",
                Status: "InitialCustomerCall"
            }
        });
    }
    function update(id: number, status: string) {
        return prisma.customers.update({
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
        return prisma.customers.findFirst({
            where: {
                Status: status
            }
        });

    }
    return {
        create, update, findFirst
    }
}

const CustomerRepository = customersRepository();

export default CustomerRepository;