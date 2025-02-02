-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CabRevenue" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CabId" INTEGER,
    "Fare" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CabRevenue_CabId_fkey" FOREIGN KEY ("CabId") REFERENCES "Cabs" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CabRevenue" ("CabId", "Fare", "Id") SELECT "CabId", "Fare", "Id" FROM "CabRevenue";
DROP TABLE "CabRevenue";
ALTER TABLE "new_CabRevenue" RENAME TO "CabRevenue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
