/*
  Warnings:

  - You are about to drop the column `relationsshipType` on the `Relations` table. All the data in the column will be lost.
  - Added the required column `relationshipType` to the `Relations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relationshipType" TEXT NOT NULL,
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
