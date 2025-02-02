import prisma from "./client";

function customersRepository() {
    const employeesTable = prisma.clockInEmployee;
    const timesheetTable = prisma.employeesTimesheet;
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
    function clockInTimesheet({
                                 fullYear,
                                 month,
                                 day,
                                 hour,
                                 minute,
                             }: {
                                 fullYear: number;
                                 month: string;
                                 day: number;
                                 hour: number;
                                 minute: number
                             },
                              employeeId: number,
                              wage: number) {
        return timesheetTable.create({
            data: {
                ClockInEmployeeId: employeeId,
                PaidWage: wage,
                ClockInTimeYear: fullYear + '',
                ClockInTimeMonth: month,
                ClockInTimeDay: day,
                ClockInTimeHour: hour,
                ClockInTimeMinute: minute,
                ClockOutTimeYear: '',
                ClockOutTimeMonth: '',
                ClockOutTimeDay: 0,
                ClockOutTimeHour: 0,
                ClockOutTimeMinute: 0
            }
        })
    }
    async function clockOutTimesheet({
                                 fullYear,
                                 month,
                                 day,
                                 hour,
                                 minute,
                             }: {
                                 fullYear: number;
                                 month: string;
                                 day: number;
                                 hour: number;
                                 minute: number
                             },
                              employeeId: number) {
        const timesheetEntry = await timesheetTable.findFirst({
            where: {
                ClockInEmployeeId: employeeId,
                ClockOutTimeYear: '',
                ClockOutTimeMonth: '',
                ClockOutTimeDay: 0,
                ClockOutTimeHour: 0,
                ClockOutTimeMinute: 0
            }
        });
        return timesheetTable.update({
            where: {
                id: timesheetEntry!.id
            },
            data: {
                ClockOutTimeYear: fullYear + '',
                ClockOutTimeMonth: month,
                ClockOutTimeDay: day,
                ClockOutTimeHour: hour,
                ClockOutTimeMinute: minute
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
    function list() {
        return employeesTable.findMany({
            select: {
                id: true,
                EmployeeName: true,
                CurrentWage: true,

            }
        });
    }
    return {
        create, update, find, list, clockInTimesheet, clockOutTimesheet
    }
}

const EmployeesRepository = customersRepository();

export default EmployeesRepository;