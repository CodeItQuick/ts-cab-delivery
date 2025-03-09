import {describe, expect, test} from "@jest/globals";
import {TableAdapterFn} from "../../src/tableAdapterFn";
import {Employee} from "../../src/clockInEmployeeTableAdapterFn";

function testableEmployeeRepository(): TableAdapterFn<Employee> {
    const entities: Employee[] = [];
    const create = async (entity: Employee) => {
        entities.push({ ...entity, id: entities.length + 1 });
        return entities[entities.length]?.id || 0;
    }
    const updateBy =
        async (entity: Employee, filterBy: keyof Employee) => {
        let foundEntity: Employee | undefined = entities.find(x => x.id === entity.id);
        if (foundEntity === undefined) {
            throw new Error(`could not find entity with id: ${entity.id}`);
        }
        entities[foundEntity.id as number] = {
            [filterBy]: entity[filterBy],
            CurrentWage: foundEntity.CurrentWage,
            EmployeeName: foundEntity.EmployeeName
        };

    }
    const find = async (entityId: number) => {
        return entities.find(x => x.id === entityId);
    }
    const deleteEntity = async (entityId: number) => {
        const deleteEntity = entities.find(x => x.id === entityId)! as Employee;
        const indexToDelete = entities.indexOf(deleteEntity);
        entities.splice(indexToDelete, 1);
    }
    const list =
        async(include: { [k in keyof Employee]?: boolean })=> {
            return entities.map(x => ({
                id: include["id"] ? x.id : undefined,
                EmployeeName: include["EmployeeName"] ? x.id : undefined,
                CurrentWage: include["CurrentWage"] ? x.id : undefined,
            } as Employee));
    }
    return { updateBy, find, create, deleteEntity, list };
}

describe("Employee Repository Integration tests", () => {
    test("can update a new employee", async () => {
        const employeeRepository = testableEmployeeRepository();
        const employeeOne: Employee = { id: 1, CurrentWage: 10, EmployeeName: "Evan" };
        await employeeRepository.create(employeeOne);

        await employeeRepository.updateBy(employeeOne, "EmployeeName");

        const employeeFound = await employeeRepository.find(employeeOne.id as number);
        expect(employeeFound?.EmployeeName).toEqual("Evan");
    });
    test("can delete a new employee", async () => {
        const employeeRepository = testableEmployeeRepository();
        const employeeOne: Employee = { id: 1, CurrentWage: 10, EmployeeName: "Evan" };
        await employeeRepository.create(employeeOne);
        await employeeRepository.deleteEntity(employeeOne.id as number);

        const foundEmployee = await employeeRepository
            .find(employeeOne.id as number);

        expect(foundEmployee).toEqual(undefined);
    });
    test("can delete the second employee", async () => {
        const employeeRepository = testableEmployeeRepository();
        const employeeOne: Employee = { CurrentWage: 10, EmployeeName: "Evan" };
        await employeeRepository.create(employeeOne);
        await employeeRepository.create(employeeOne);
        await employeeRepository.create(employeeOne);

        await employeeRepository.deleteEntity(2);

        expect(await employeeRepository.find(1)).toBeTruthy();
        expect(await employeeRepository.find(2)).toEqual(undefined);
        expect(await employeeRepository.find(3)).toBeTruthy();
    });
    // test("can promote an existing employee", async () => {
    //     const employeeWithId = await createEmployee();
    //
    //     const employee = await promoteEmployee(employeeWithId!.id, 20);
    //
    //     expect(employee.CurrentWage.toString()).toEqual("20");
    //     expect(employee.EmployeeName).toEqual("Evan");
    // });
    test("can list all current employees", async () => {
        const employeeRepository = testableEmployeeRepository();
        const employeeOne: Employee = { CurrentWage: 10, EmployeeName: "Evan" };
        await employeeRepository.create(employeeOne);
        await employeeRepository.create(employeeOne);

        const employees = await employeeRepository.list(
            { id: true, EmployeeName: true, CurrentWage: true });

        expect(employees.length).toEqual(2);
        expect(typeof employees).toEqual("object")
    });
    // test("can list all current employees", async () => {
    //     await createEmployee();
    //     await createEmployee();
    //     await createEmployee();
    //
    //     const employees = await employeeList();
    //
    //     expect(employees.length).toEqual(3);
    // });
    // test("can clock into the timesheet system", async () => {
    //     const employeeWithId = await createEmployee();
    //
    //     const timesheetEntry =
    //         await clockIn(employeeWithId.id, new Date("Sun Feb 02 2025 15:38:25 GMT-0400 (Atlantic Standard Time)"));
    //
    //     expect(timesheetEntry.ClockInTimeYear).toEqual("2025");
    //     expect(timesheetEntry.ClockInTimeMonth).toEqual("February");
    //     expect(timesheetEntry.ClockInTimeDay).toEqual(2);
    //     expect(timesheetEntry.ClockInTimeHour).toEqual(15);
    //     expect(timesheetEntry.ClockInTimeMinute).toEqual(38);
    // });
    // test("can clock out of the timesheet system", async () => {
    //     const employeeWithId = await createEmployee();
    //     await clockIn(employeeWithId.id, new Date("Sun Feb 02 2025 15:38:25 GMT-0400 (Atlantic Standard Time)"));
    //
    //     const timesheetEntry =
    //         await clockOut(employeeWithId.id,
    //             new Date("Sun Feb 02 2025 16:38:25 GMT-0400 (Atlantic Standard Time)"));
    //
    //     expect(timesheetEntry.ClockInTimeYear).toEqual("2025");
    //     expect(timesheetEntry.ClockInTimeMonth).toEqual("February");
    //     expect(timesheetEntry.ClockInTimeDay).toEqual(2);
    //     expect(timesheetEntry.ClockInTimeHour).toEqual(15);
    //     expect(timesheetEntry.ClockInTimeMinute).toEqual(38);
    //     expect(timesheetEntry.ClockOutTimeYear).toEqual("2025");
    //     expect(timesheetEntry.ClockOutTimeMonth).toEqual("February");
    //     expect(timesheetEntry.ClockOutTimeDay).toEqual(2);
    //     expect(timesheetEntry.ClockOutTimeHour).toEqual(16);
    //     expect(timesheetEntry.ClockOutTimeMinute).toEqual(38);
    // });
});
