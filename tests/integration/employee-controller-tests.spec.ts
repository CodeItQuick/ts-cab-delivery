import prisma from "../../src/client";
import {beforeEach, describe, expect, test} from "@jest/globals";
import {createEmployee, employeeList, promoteEmployee} from "../../src/employeeController";

describe("Employee Repository Integration tests", () => {
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
        await prisma.clockInEmployee.deleteMany();
        await prisma.employeesTimesheet.deleteMany();
    })

    test("can create a new employee", async () => {
        const employee = await createEmployee();

        expect(employee.CurrentWage.toString()).toEqual("10");
        expect(employee.EmployeeName).toEqual("Evan");
    })
    test("can promote an existing employee", async () => {
        const employeeWithId = await createEmployee();

        const employee = await promoteEmployee(employeeWithId!.id, 20);

        expect(employee.CurrentWage.toString()).toEqual("20");
        expect(employee.EmployeeName).toEqual("Evan");
    })
    test("can list all current employees", async () => {
        const employees = await employeeList();

        expect(employees.length).toEqual(0);
        expect(typeof employees).toEqual("object")
    })
    test("can list all current employees", async () => {
        await createEmployee();
        await createEmployee();
        await createEmployee();

        const employees = await employeeList();

        expect(employees.length).toEqual(3);
    })
})
