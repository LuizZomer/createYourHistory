-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weaponId" TEXT,
    "birthPlaceId" INTEGER,
    "personality" TEXT NOT NULL,
    "bestFriend" INTEGER,
    "enemy" INTEGER,
    "groupId" INTEGER,
    "favoritePlace" INTEGER,
    CONSTRAINT "Character_favoritePlace_fkey" FOREIGN KEY ("favoritePlace") REFERENCES "Place" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_birthPlaceId_fkey" FOREIGN KEY ("birthPlaceId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Character_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("bestFriend", "birthPlaceId", "description", "enemy", "favoritePlace", "groupId", "id", "name", "personality", "weaponId") SELECT "bestFriend", "birthPlaceId", "description", "enemy", "favoritePlace", "groupId", "id", "name", "personality", "weaponId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
