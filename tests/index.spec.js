import printLnObj from "../src/printLn";
import program from "../src";
test("program prints first line of selection menu", async () => {
    const printLnFn = printLnObj;
    await program(printLnFn);
    expect(true).toBe("0. Exit");
});
//# sourceMappingURL=index.spec.js.map