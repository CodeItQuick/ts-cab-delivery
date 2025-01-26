import program from "./program";
import printLnObj from "./printLn";
import { config } from 'dotenv';

config();
await program(printLnObj);

