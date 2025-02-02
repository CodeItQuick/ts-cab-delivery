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

export { createEmployee, promoteEmployee, employeeList };