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
    async function findFirst(status: string, errMessage: string = "No customer found") {
        const firstCustomer = await customersTable.findFirst({
            where: {
                Status: status
            }
        });
        if (!firstCustomer?.id) {
            throw new Error(errMessage);
        }
        return firstCustomer;
    }
    function deleteItem(id: number) {
        return customersTable.delete({
            where: {
                id
            }
        });
    }
    return {
        create, update, findFirst, deleteItem
    }
}

const CustomersRepository = customersRepository();

export default CustomersRepository;