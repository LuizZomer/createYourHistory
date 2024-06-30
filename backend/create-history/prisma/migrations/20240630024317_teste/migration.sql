/*
  Warnings:

  - You are about to drop the column `bestFriend` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `enemy` on the `Character` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relationshipPersonId" INTEGER NOT NULL,
    "characterId" INTEGER,
    CONSTRAINT "Relations_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weaponId" INTEGER,
    "birthPlaceId" INTEGER,
    "personality" TEXT NOT NULL,
    "groupId" INTEGER,
    "favoritePlace" INTEGER,
    CONSTRAINT "Character_favoritePlace_fkey" FOREIGN KEY ("favoritePlace") REFERENCES "Place" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_birthPlaceId_fkey" FOREIGN KEY ("birthPlaceId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("birthPlaceId", "description", "favoritePlace", "groupId", "id", "name", "personality", "weaponId") SELECT "birthPlaceId", "description", "favoritePlace", "groupId", "id", "name", "personality", "weaponId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
