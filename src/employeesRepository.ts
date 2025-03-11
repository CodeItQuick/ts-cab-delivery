import prisma from "./client";
import {clockInEmployeeTableAdapterFn, Employee} from "./clockInEmployeeTableAdapterFn";
import {employeesTimesheetTableAdapterFn, Timesheet} from "./employeesTimesheetTableAdapterFn";
import {TableAdapterFn} from "./tableAdapterFn";

export function customersRepository(employeeTableAdapterFn: TableAdapterFn<Employee> = clockInEmployeeTableAdapterFn(prisma.clockInEmployee), timesheetTableAdapterFn: TableAdapterFn<Timesheet> = employeesTimesheetTableAdapterFn(prisma.employeesTimesheet)) {
    const employeeTable = employeeTableAdapterFn;
    const timesheetsTable = timesheetTableAdapterFn;
    const timesheetTable = prisma.employeesTimesheet;
    async function create() {
        const entityId = await employeeTable.create({
                CurrentWage: 10,
                EmployeeName: "Evan"
        });
        return employeeTable.find(entityId)
    }
    async function deleteEmployee(employeeId: number) {
        const deletedElement = await employeeTable.find(employeeId);
        await employeeTable.deleteEntity(employeeId);
        return deletedElement;
    }
    async function update(id: number, currentWage: number) {
        await employeeTable.updateBy({ id, CurrentWage: currentWage }, "CurrentWage");
        return employeeTable.find(id);
    }
    async function clockInTimesheet({
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
        const timesheetTableId = await timesheetsTable.create({
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
        });
        return timesheetsTable.find(timesheetTableId);
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
        const employee = await employeeTable.find(id);
        if (!employee?.id) {
            throw new Error(errMessage);
        }
        return employee;
    }
    function list() {
        return employeeTable.list({
                id: true,
                EmployeeName: true,
                CurrentWage: true,
        });
    }
    return {
        create, deleteEmployee, update, find, list, clockInTimesheet, clockOutTimesheet
    }
}

const EmployeesRepository = customersRepository();

export default EmployeesRepository;