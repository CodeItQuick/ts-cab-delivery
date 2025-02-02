-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CabRevenue" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CabId" INTEGER NOT NULL,
    "Fare" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CabRevenue_CabId_fkey" FOREIGN KEY ("CabId") REFERENCES "Cabs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CabRevenue" ("CabId", "Id") SELECT "CabId", "Id" FROM "CabRevenue";
DROP TABLE "CabRevenue";
ALTER TABLE "new_CabRevenue" RENAME TO "CabRevenue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
