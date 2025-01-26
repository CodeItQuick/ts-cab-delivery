interface IPrintLn {
    (message: string): void
}


type TPrintLnObj = { printLn: IPrintLn, messages: string[] };
const printLnObj: TPrintLnObj = {
    printLn: function (message: string) {
        console.log(message);
        this.messages = [...this.messages, message]
    },
    messages: []
}
const testPrintLnObj: TPrintLnObj = {
    printLn: function (message: string) {
        this.messages = [...this.messages, message]
    },
    messages: []
}

export { testPrintLnObj };
export type { TPrintLnObj };
export default printLnObj;