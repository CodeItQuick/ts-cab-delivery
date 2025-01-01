import inquirer from 'inquirer';
import {TPrintLnObj} from "./printLn";
import {addCab, removeCab} from "./fleetController";
import {customerCall} from "./customerListController";

async function getPrompt(): Promise<string | undefined> {
    const prompt: { name?: string } = await inquirer.prompt([{message: "Enter a selection: ", type: "input", name: "name"}]);
    return prompt?.name;
}

const program = async function Program(
    printLnObj: TPrintLnObj, promptFn: () => Promise<string | undefined> = getPrompt) {
    const menuOptions = [
        "0. Exit",
        "1. (Incoming Radio) Add New Cab Driver",
        "2. (Incoming Radio) Remove Cab Driver",
        "3. (Outgoing Radio) Send Cab Driver Ride Request",
        "4. (Incoming Radio) Cab Notifies Passenger Picked Up",
        "5. (Incoming Radio) Cab Notifies Passenger Dropped Off",
        "6. (Incoming Call) Cancel Cab Driver Fare",
        "7. (Incoming Call) Customer Request Ride"
    ];

    let prompt = undefined;

    while (prompt !== '0') {
        menuOptions.forEach(x => printLnObj.printLn(x));

        prompt = await promptFn();

        printLnObj.printLn(`You selected ${prompt}`);

        try {
            if (prompt !== undefined && +prompt === 1) {
                const addedCab = await addCab();
                if (addedCab.Status === 'Available') {
                    printLnObj.printLn('New cab was added');
                }
            }
            if (prompt !== undefined && +prompt === 2) {
                const removedCab = await removeCab();
                if (removedCab.CabName.length) {
                    printLnObj.printLn("Cab was removed");
                }
            }
            if (prompt !== undefined && +prompt === 7) {
                const customerRide = await customerCall();
                if (!!customerRide) {
                    printLnObj.printLn("Customer called for a ride");
                }
            }
        }
        catch (ex) {
            printLnObj.printLn(ex.message);
        }
    }

}

export default program;