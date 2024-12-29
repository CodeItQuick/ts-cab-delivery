import { testPrintLnObj } from "../src/printLn";
import program from "../src/program";
import { addCab } from "../src/dispatchController";

function messageReader(messages: string[]) {
    let storedMessages = messages;
    return () => new Promise<string | undefined>(
        (res, rej) =>
            res(storedMessages.pop()));
}

describe("End to end tests", () => {
    test("program contains exit command prompt", async () => {
        const printLnFn = testPrintLnObj
        await program(printLnFn, messageReader(["0"]));

        expect(printLnFn.messages).toContain("0. Exit");
    })
    test("program can select option 1 then 0", async () => {
        const printLnFn = testPrintLnObj
        await program(printLnFn, messageReader(["1", "0"]));

        expect(printLnFn.messages).toContain("0. Exit");
    })
    test("dispatchController routes the add cab command correctly", async () => {
        const didAdd = addCab();

        expect(didAdd).toBe(true);
    })
})
