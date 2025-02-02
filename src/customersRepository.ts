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
        return customersTable.update({
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
        return customersTable.findFirst({
            where: {
                Status: status
            }
        });

    }
    return {
        create, update, findFirst
    }
}

const CustomersRepository = customersRepository();

export default CustomersRepository;