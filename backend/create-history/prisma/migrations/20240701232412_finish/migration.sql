/*
  Warnings:

  - Added the required column `historyId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `historyId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `historyId` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL
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
    "favoritePlaceId" INTEGER,
    "relationId" INTEGER,
    "historyId" INTEGER NOT NULL,
    CONSTRAINT "Character_favoritePlaceId_fkey" FOREIGN KEY ("favoritePlaceId") REFERENCES "Place" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_birthPlaceId_fkey" FOREIGN KEY ("birthPlaceId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("birthPlaceId", "description", "favoritePlaceId", "groupId", "id", "name", "personality", "relationId", "weaponId") SELECT "birthPlaceId", "description", "favoritePlaceId", "groupId", "id", "name", "personality", "relationId", "weaponId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "historyId" INTEGER NOT NULL,
    CONSTRAINT "City_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_City" ("description", "id", "name") SELECT "description", "id", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE TABLE "new_Weapon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER,
    "historyId" INTEGER NOT NULL,
    CONSTRAINT "Weapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Weapon_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Weapon" ("characterId", "description", "id", "name", "power") SELECT "characterId", "description", "id", "name", "power" FROM "Weapon";
DROP TABLE "Weapon";
ALTER TABLE "new_Weapon" RENAME TO "Weapon";
CREATE UNIQUE INDEX "Weapon_characterId_key" ON "Weapon"("characterId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
