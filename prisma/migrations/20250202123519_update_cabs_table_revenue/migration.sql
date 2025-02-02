-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cabs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CabName" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Revenue" BIGINT NOT NULL DEFAULT 0
);
INSERT INTO "new_Cabs" ("CabName", "Status", "id") SELECT "CabName", "Status", "id" FROM "Cabs";
DROP TABLE "Cabs";
ALTER TABLE "new_Cabs" RENAME TO "Cabs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
