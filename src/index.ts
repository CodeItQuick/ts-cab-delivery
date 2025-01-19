import program from "./program";
import printLnObj from "./printLn";
import { config } from 'dotenv';

config();
Promise.resolve(program(printLnObj)).then().catch(console.error);
console.log('worked');

