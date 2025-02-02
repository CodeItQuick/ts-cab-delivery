/*
  Warnings:

  - Added the required column `ClockInTimeMinute` to the `EmployeesTimesheet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmployeesTimesheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClockInEmployeeId" INTEGER NOT NULL,
    "PaidWage" DECIMAL NOT NULL,
    "ClockInTimeYear" TEXT NOT NULL,
    "ClockInTimeMonth" TEXT NOT NULL,
    "ClockInTimeDay" INTEGER NOT NULL,
    "ClockInTimeHour" INTEGER NOT NULL,
    "ClockInTimeMinute" INTEGER NOT NULL,
    CONSTRAINT "EmployeesTimesheet_ClockInEmployeeId_fkey" FOREIGN KEY ("ClockInEmployeeId") REFERENCES "ClockInEmployee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmployeesTimesheet" ("ClockInEmployeeId", "ClockInTimeDay", "ClockInTimeHour", "ClockInTimeMonth", "ClockInTimeYear", "PaidWage", "id") SELECT "ClockInEmployeeId", "ClockInTimeDay", "ClockInTimeHour", "ClockInTimeMonth", "ClockInTimeYear", "PaidWage", "id" FROM "EmployeesTimesheet";
DROP TABLE "EmployeesTimesheet";
ALTER TABLE "new_EmployeesTimesheet" RENAME TO "EmployeesTimesheet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
