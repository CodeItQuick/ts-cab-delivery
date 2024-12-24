import inquirer from 'inquirer';

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

let prompt;

while (prompt?.name !== '0') {
    menuOptions.forEach(x => console.log(x));

    prompt = await inquirer.prompt([{ message: "Enter a selection: ", type: "input", name: "name" }]);

    console.log(`You selected ${prompt.name}`);
}

