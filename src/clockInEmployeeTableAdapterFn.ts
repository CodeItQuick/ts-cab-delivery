import prisma from "./client";
import {TableAdapterFn} from "./tableAdapterFn";

export type Employee = {
    id?: number;
    CurrentWage?: number;
    EmployeeName?: string;
}

export function clockInEmployeeTableAdapterFn(table: typeof prisma.clockInEmployee): TableAdapterFn<Employee> {
    const entities = table;
    const create = async (entity: Employee) => {
        const employeeClient = await entities.create({
            data: {
                CurrentWage: entity.CurrentWage || 10,
                EmployeeName: entity.EmployeeName || "",
            }
        });

        return employeeClient.id;
    }

    const updateBy =
        async (entity: Employee, filterBy: keyof Employee) => {
            await entities.update({
                where: {
                    id: entity.id
                },
                data: {
                    [filterBy]: entity[filterBy]
                }
            })
        }
    const find =
        async (entityId: number) => {
            const employee = await entities.findFirst({
                where: {
                    id: entityId
                }
            });
            return {
                id: employee!.id,
                EmployeeName: employee?.EmployeeName,
                CurrentWage: employee?.CurrentWage
            } as Employee;
        }
    const deleteEntity = async (entityId: number) => {
        await entities.delete({
            where: {
                id: entityId
            }
        })
    }

    const list =
        async (include: { [k in keyof Employee]?: boolean }) => {
            return (await entities.findMany({
                select: {
                    id: true,
                    EmployeeName: include["EmployeeName"],
                    CurrentWage: include["CurrentWage"],
                }
            })).map(x =>
                ({
                    id: x.id,
                    EmployeeName: x.EmployeeName,
                    CurrentWage: x.CurrentWage as unknown as number
                } as Employee));
        }

    return {create, updateBy, find, deleteEntity, list};
}