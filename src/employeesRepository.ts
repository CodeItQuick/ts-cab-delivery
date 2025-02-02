import prisma from "./client";

function customersRepository() {
    const employeesTable = prisma.clockInEmployee;
    // const timesheetTable = prisma.employeesTimesheet;
    function create() {
        return employeesTable.create({
            data: {
                CurrentWage: 10,
                EmployeeName: "Evan"
            }
        });
    }
    function update(id: number, currentWage: number) {
        return employeesTable.update({
            where: {
                id: id
            },
            data: {
                CurrentWage: currentWage
            }
        })
    }
    async function find(id: number, errMessage: string = "No employee found") {
        const employee = await employeesTable.findFirst({
            where: {
                id
            }
        });
        if (!employee?.id) {
            throw new Error(errMessage);
        }
        return employee;
    }
    return {
        create, update, find
    }
}

const EmployeesRepository = customersRepository();

export default EmployeesRepository;