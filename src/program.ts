import inquirer from 'inquirer';
import {TPrintLnObj} from "./printLn";
import {addCab, removeCab} from "./fleetController";
import {
    cabRideRequest,
    cabPickUpCustomer,
    customerCall,
    cabDropOffCustomer,
    customerCancelledRide
} from "./customerListController";
import {createEmployee, deleteEmployee, employeeList} from "./employeeController";

async function getPrompt(): Promise<string | undefined> {
    const prompt: { name?: string } = await
        inquirer.prompt([{message: "Enter a selection: ", type: "input", name: "name"}]);
    return prompt?.name;
}

const program = async function Program(
    printLnObj: TPrintLnObj,
    promptFn: () => Promise<string | undefined> = getPrompt,
    menuPrintLn: TPrintLnObj = printLnObj) {
    const menuOptions = [
        "0. Exit",
        "1. (Incoming Radio) Add New Cab Driver",
        "2. (Incoming Radio) Remove Cab Driver",
        "3. (Incoming Call) Customer Request Ride",
        "4. (Incoming Call) Cancel Cab Driver Fare",
        "5. (Outgoing Radio) Send Cab Driver Ride Request",
        "6. (Incoming Radio) Cab Notifies Passenger Picked Up",
        "7. (Incoming Radio) Cab Notifies Passenger Dropped Off",
        "8. (Employee Tracking) Create New Employee Entry",
        "9. (Employee Tracking) List All Current Employees",
        "10. (Employee Tracking) Delete Employee Entry"
    ];

    let prompt = undefined;

    while (prompt !== '0') {
        menuOptions.forEach(x => menuPrintLn.printLn(x)); // Note: do not print menu to debug output

        prompt = await promptFn();

        printLnObj.printLn(`You selected ${prompt}`);

        try {
            if (prompt !== undefined && +prompt === 1) {
                const addedCab = await addCab();
                if (addedCab.Status === 'Available') {
                    printLnObj.printLn('Dispatch recorded cab was added.');
                }
            }
            if (prompt !== undefined && +prompt === 2) {
                const removedCab = await removeCab();
                if (removedCab.CabName.length) {
                    printLnObj.printLn("Dispatch recorded cab was removed.");
                }
            }
            if (prompt !== undefined && +prompt === 3) {
                const customerRide = await customerCall();
                if (!!customerRide) {
                    printLnObj.printLn("Dispatch received customer call for a ride.");
                }
            }
            if (prompt !== undefined && +prompt === 4) {
                const customerRide = await customerCancelledRide();
                if (!!customerRide) {
                    printLnObj.printLn("Dispatch recorded customer cancelled a ride.");
                }
            }
            if (prompt !== undefined && +prompt === 5) {
                const assignCustomer = await cabRideRequest();
                if (assignCustomer.CustomerName.length) {
                    printLnObj.printLn("Dispatch recorded cab requested.");
                }
            }
            if (prompt !== undefined && +prompt === 6) {
                const assignCustomer = await cabPickUpCustomer();
                if (assignCustomer.CustomerName.length) {
                    printLnObj.printLn("Dispatch recorded cab has picked up customer.");
                }
            }
            if (prompt !== undefined && +prompt === 7) {
                const customerRide = await cabDropOffCustomer();
                if (!!customerRide) {
                    printLnObj.printLn("Dispatch recorded customer is dropped off.");
                }
            }
            if (prompt !== undefined && +prompt === 8) {
                const employee = await createEmployee();
                if (!!employee) {
                    printLnObj.printLn("Created a new employee for time tracking.");
                }
            }
            if (prompt !== undefined && +prompt === 9) {
                const employees = await employeeList();
                if (!!employees) {
                    menuPrintLn.printLn("Employee#\tName\tWage");
                    employees.forEach(employee =>
                        printLnObj.printLn(`${employee.id}\t${employee.EmployeeName}\t${employee.CurrentWage}`))
                }
            }
            if (prompt !== undefined && +prompt === 10) {
                const deletedEmployeeNumber = await promptFn();
                if (deletedEmployeeNumber === undefined) {
                    throw new Error("Not a valid employee id");
                }
                const employeeId = +deletedEmployeeNumber;
                const employees = await deleteEmployee(employeeId);
                if (!!employees) {
                    printLnObj.printLn("Deleted an employee from time tracking.");
                    printLnObj.printLn("Employee#\tName\tWage");
                }
            }
        }
        catch (ex: any) {
            printLnObj.printLn(ex.message);
        }
    }
}

export default program;
export { getPrompt };