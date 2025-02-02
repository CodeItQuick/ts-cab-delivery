-- CreateTable
CREATE TABLE "ClockInEmployee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EmployeeName" TEXT NOT NULL,
    "CurrentWage" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "EmployeesTimesheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClockInEmployeeId" INTEGER NOT NULL,
    "PaidWage" DECIMAL NOT NULL,
    "ClockInTimeYear" TEXT NOT NULL,
    "ClockInTimeMonth" TEXT NOT NULL,
    "ClockInTimeDay" INTEGER NOT NULL,
    "ClockInTimeHour" INTEGER NOT NULL,
    CONSTRAINT "EmployeesTimesheet_ClockInEmployeeId_fkey" FOREIGN KEY ("ClockInEmployeeId") REFERENCES "ClockInEmployee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
