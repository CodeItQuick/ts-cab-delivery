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
});
