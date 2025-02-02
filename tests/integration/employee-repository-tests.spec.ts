import prisma from "../../src/client";
import {beforeEach, describe, expect, test} from "@jest/globals";
import EmployeesRepository from "../../src/employeesRepository";

describe("Employee Repository Integration tests", () => {
    const employeeRepository = EmployeesRepository;
    beforeEach(async () => {
        await prisma.cabs.deleteMany();
        await prisma.customers.deleteMany();
        await prisma.clockInEmployee.deleteMany();
        await prisma.employeesTimesheet.deleteMany();
    })

    test("can create a new employee", async () => {
        const employee = await employeeRepository.create();

        expect(employee.CurrentWage.toString()).toEqual("10");
        expect(employee.EmployeeName).toEqual("Evan");
    })
    test("can promote an existing employee", async () => {
        const employeeWithId = await employeeRepository.create();
        const employee = await employeeRepository.update(employeeWithId!.id, 20);

        expect(employee.CurrentWage.toString()).toEqual("20");
        expect(employee.EmployeeName).toEqual("Evan");
    })
    test("can find an existing employee", async () => {
        const employeeWithId = await employeeRepository.create();
        const employee = await employeeRepository.find(employeeWithId!.id);

        expect(employee.CurrentWage.toString()).toEqual("10");
        expect(employee.EmployeeName).toEqual("Evan");
    })
    test("can list all existing employees", async () => {
        await employeeRepository.create();
        await employeeRepository.create();

        const employees = await employeeRepository.list();

        expect(employees.length).toEqual(2);
    })
})
