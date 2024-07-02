/*
  Warnings:

  - Added the required column `historyId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `historyId` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "behalf" TEXT,
    "description" TEXT NOT NULL,
    "historyId" INTEGER NOT NULL,
    CONSTRAINT "Group_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("behalf", "description", "id", "name") SELECT "behalf", "description", "id", "name" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE TABLE "new_Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER,
    "cityId" INTEGER,
    "historyId" INTEGER NOT NULL,
    CONSTRAINT "Place_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Place_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Place" ("characterId", "cityId", "description", "id", "name") SELECT "characterId", "cityId", "description", "id", "name" FROM "Place";
DROP TABLE "Place";
ALTER TABLE "new_Place" RENAME TO "Place";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
