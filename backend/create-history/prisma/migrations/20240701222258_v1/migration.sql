/*
  Warnings:

  - You are about to drop the column `relationshipPersonId` on the `Relations` table. All the data in the column will be lost.
  - You are about to drop the column `relationshipType` on the `Relations` table. All the data in the column will be lost.
  - Added the required column `relationCharacterId` to the `Relations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationType` to the `Relations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relationType" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "relationCharacterId" INTEGER NOT NULL,
    CONSTRAINT "Relations_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relations_relationCharacterId_fkey" FOREIGN KEY ("relationCharacterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Relations" ("characterId", "id") SELECT "characterId", "id" FROM "Relations";
DROP TABLE "Relations";
ALTER TABLE "new_Relations" RENAME TO "Relations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
