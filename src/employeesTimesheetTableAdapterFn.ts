import prisma from "./client";
import {TableAdapterFn} from "./tableAdapterFn";

export type Timesheet = {
    id?: number;
    ClockInEmployeeId: number;
    PaidWage: number;
    ClockInTimeYear: string;
    ClockInTimeMonth: string;
    ClockInTimeDay: number;
    ClockInTimeHour: number;
    ClockInTimeMinute: number;
    ClockOutTimeYear: string;
    ClockOutTimeMonth: string;
    ClockOutTimeDay: number;
    ClockOutTimeHour: number;
    ClockOutTimeMinute: number;
}

export function employeesTimesheetTableAdapterFn(table: typeof prisma.employeesTimesheet): TableAdapterFn<Timesheet> {
    const entities = table;
    const create = async (entity: Timesheet) => {
        const employeeClient = await entities.create({
            data: {
                ClockInEmployeeId: entity.ClockInEmployeeId,
                PaidWage: entity.PaidWage,
                ClockInTimeYear: entity.ClockInTimeYear,
                ClockInTimeMonth: entity.ClockInTimeMonth,
                ClockInTimeDay: entity.ClockInTimeDay,
                ClockInTimeHour: entity.ClockInTimeHour,
                ClockInTimeMinute: entity.ClockInTimeMinute,
                ClockOutTimeYear: entity.ClockOutTimeYear,
                ClockOutTimeMonth: entity.ClockOutTimeMonth,
                ClockOutTimeDay: entity.ClockOutTimeDay,
                ClockOutTimeHour: entity.ClockOutTimeHour,
                ClockOutTimeMinute: 0
            }
        });

        return employeeClient.id;
    }

    const updateBy =
        async (entity: Timesheet, filterBy: keyof Timesheet) => {
            await entities.update({
                where: {
                    id: entity.ClockInEmployeeId
                },
                data: {
                    [filterBy]: entity[filterBy]
                }
            })
        }
    const find =
        async (entityId: number) => {
            const timesheet = await entities.findFirst({
                where: {
                    id: entityId
                }
            });
            return {...timesheet, PaidWage: timesheet?.PaidWage as unknown as number} as Timesheet;
        }
    const deleteEntity = async (entityId: number) => {
        await entities.delete({
            where: {
                id: entityId
            }
        })
    }

    const list =
        async (include: { [k in keyof Timesheet]?: boolean }) => {
            return (await entities.findMany({
                select: {
                    id: true,
                    ...include
                }
            })).map(timesheet =>
                ({...timesheet, PaidWage: timesheet?.PaidWage as unknown as number} as Timesheet));
        }

    return {create, updateBy, find, deleteEntity, list};
}