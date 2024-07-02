/*
  Warnings:

  - Made the column `characterId` on table `Relations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN "relationId" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relationshipPersonId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "Relations_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relations_relationshipPersonId_fkey" FOREIGN KEY ("relationshipPersonId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Relations" ("characterId", "id", "relationshipPersonId") SELECT "characterId", "id", "relationshipPersonId" FROM "Relations";
DROP TABLE "Relations";
ALTER TABLE "new_Relations" RENAME TO "Relations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
