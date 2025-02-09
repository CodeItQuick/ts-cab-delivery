import prisma from "../../src/client";
import {beforeEach, describe, expect, test} from "@jest/globals";
import {
    clockIn,
    clockOut,
    createEmployee,
    deleteEmployee,
    employeeList,
    promoteEmployee
} from "../../src/employeeController";

describe("Employee Repository Integration tests", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
        await prisma.employeesTimesheet.deleteMany();
        await prisma.clockInEmployee.deleteMany();
    });
    test("can create a new employee", async () => {
        const employee = await createEmployee();

        expect(employee.CurrentWage.toString()).toEqual("10");
        expect(employee.EmployeeName).toEqual("Evan");
    });
    test("can delete a new employee", async () => {
        const newEmployee = await createEmployee();

        const deletedEmployee = await deleteEmployee(newEmployee.id);

        expect(deletedEmployee.CurrentWage.toString()).toEqual("10");
        expect(deletedEmployee.EmployeeName).toEqual("Evan");
    });
    test("can promote an existing employee", async () => {
        const employeeWithId = await createEmployee();

        const employee = await promoteEmployee(employeeWithId!.id, 20);

        expect(employee.CurrentWage.toString()).toEqual("20");
        expect(employee.EmployeeName).toEqual("Evan");
    });
    test("can list all current employees", async () => {
        const employees = await employeeList();

        expect(employees.length).toEqual(0);
        expect(typeof employees).toEqual("object")
    });
    test("can list all current employees", async () => {
        await createEmployee();
        await createEmployee();
        await createEmployee();

        const employees = await employeeList();

        expect(employees.length).toEqual(3);
    });
    test("can clock into the timesheet system", async () => {
        const employeeWithId = await createEmployee();

        const timesheetEntry =
            await clockIn(employeeWithId.id, new Date("Sun Feb 02 2025 15:38:25 GMT-0400 (Atlantic Standard Time)"));

        expect(timesheetEntry.ClockInTimeYear).toEqual("2025");
        expect(timesheetEntry.ClockInTimeMonth).toEqual("February");
        expect(timesheetEntry.ClockInTimeDay).toEqual(2);
        expect(timesheetEntry.ClockInTimeHour).toEqual(15);
        expect(timesheetEntry.ClockInTimeMinute).toEqual(38);
    });
    test("can clock out of the timesheet system", async () => {
        const employeeWithId = await createEmployee();
        await clockIn(employeeWithId.id, new Date("Sun Feb 02 2025 15:38:25 GMT-0400 (Atlantic Standard Time)"));

        const timesheetEntry =
            await clockOut(employeeWithId.id,
                new Date("Sun Feb 02 2025 16:38:25 GMT-0400 (Atlantic Standard Time)"));

        expect(timesheetEntry.ClockInTimeYear).toEqual("2025");
        expect(timesheetEntry.ClockInTimeMonth).toEqual("February");
        expect(timesheetEntry.ClockInTimeDay).toEqual(2);
        expect(timesheetEntry.ClockInTimeHour).toEqual(15);
        expect(timesheetEntry.ClockInTimeMinute).toEqual(38);
        expect(timesheetEntry.ClockOutTimeYear).toEqual("2025");
        expect(timesheetEntry.ClockOutTimeMonth).toEqual("February");
        expect(timesheetEntry.ClockOutTimeDay).toEqual(2);
        expect(timesheetEntry.ClockOutTimeHour).toEqual(16);
        expect(timesheetEntry.ClockOutTimeMinute).toEqual(38);
    });
});
