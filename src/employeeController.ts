import employeesRepository from "./employeesRepository";

export function EmployeeService(employeeRepository: typeof employeesRepository) {
    const clockIn = async (employeeId: number, now: Date) => {
        const month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"][now.getMonth()];
        const timeSheetEntry = {
            fullYear: now.getFullYear(),
            month,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes()
        };
        const employeeWithId = await employeeRepository.find(employeeId);
        return employeeRepository.clockInTimesheet(timeSheetEntry, employeeWithId?.id!, +employeeWithId?.CurrentWage!);
    }
    return { clockIn };
}

async function clockIn(employeeId: number, now: Date = new Date()) {
    const employeeService = EmployeeService(employeesRepository);
    return employeeService.clockIn(employeeId, now);
}

async function createEmployee() {
    return employeesRepository.create();
}
async function deleteEmployee(employeeId: number) {
    return employeesRepository.deleteEmployee(employeeId);
}
async function promoteEmployee(employeeId: number, wage: number) {
    return employeesRepository.update(employeeId, wage);
}
async function employeeList() {
    return employeesRepository.list();
}
async function clockOut(employeeId: number, now: Date = new Date()) {
    const fullYear = now.getFullYear();
    const month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][now.getMonth()];
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeSheetEntry = {
        fullYear,
        month,
        day,
        hour,
        minute
    };
    const employeeWithId = await employeesRepository.find(employeeId);
    return employeesRepository.clockOutTimesheet(timeSheetEntry, employeeWithId?.id!);
}

export { createEmployee, deleteEmployee, promoteEmployee, employeeList, clockIn, clockOut };