import employeesRepository from "./employeesRepository";

async function createEmployee() {
    return employeesRepository.create();
}
async function promoteEmployee(employeeId: number, wage: number) {
    const promotedEmployee = await employeesRepository.update(employeeId, wage);
    return promotedEmployee;
}
async function employeeList() {
    return employeesRepository.list();
}
async function clockIn(employeeId: number, now: Date = new Date()) {
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
    return employeesRepository.clockInTimesheet(timeSheetEntry, employeeWithId.id, +employeeWithId.CurrentWage);
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
    return employeesRepository.clockOutTimesheet(timeSheetEntry, employeeWithId.id);
}

export { createEmployee, promoteEmployee, employeeList, clockIn, clockOut };