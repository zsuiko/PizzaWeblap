BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "AspNetRoleClaims" (
	"Id"	INTEGER NOT NULL,
	"RoleId"	TEXT NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetRoles" (
	"Id"	TEXT NOT NULL,
	"Name"	TEXT,
	"NormalizedName"	TEXT,
	"ConcurrencyStamp"	TEXT,
	CONSTRAINT "PK_AspNetRoles" PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "AspNetUserClaims" (
	"Id"	INTEGER NOT NULL,
	"UserId"	TEXT NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserLogins" (
	"LoginProvider"	TEXT NOT NULL,
	"ProviderKey"	TEXT NOT NULL,
	"ProviderDisplayName"	TEXT,
	"UserId"	TEXT NOT NULL,
	CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY("LoginProvider","ProviderKey"),
	CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserRoles" (
	"UserId"	TEXT NOT NULL,
	"RoleId"	TEXT NOT NULL,
	CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY("UserId","RoleId"),
	CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE,
	CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUserTokens" (
	"UserId"	TEXT NOT NULL,
	"LoginProvider"	TEXT NOT NULL,
	"Name"	TEXT NOT NULL,
	"Value"	TEXT,
	CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY("UserId","LoginProvider","Name"),
	CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "AspNetUsers" (
	"Id"	TEXT NOT NULL,
	"FirstName"	TEXT NOT NULL,
	"LastName"	TEXT NOT NULL,
	"Address"	TEXT NOT NULL,
	"City"	TEXT NOT NULL,
	"PostalCode"	TEXT NOT NULL,
	"UserName"	TEXT,
	"NormalizedUserName"	TEXT,
	"Email"	TEXT,
	"NormalizedEmail"	TEXT,
	"EmailConfirmed"	INTEGER NOT NULL,
	"PasswordHash"	TEXT,
	"SecurityStamp"	TEXT,
	"ConcurrencyStamp"	TEXT,
	"PhoneNumber"	TEXT,
	"PhoneNumberConfirmed"	INTEGER NOT NULL,
	"TwoFactorEnabled"	INTEGER NOT NULL,
	"LockoutEnd"	TEXT,
	"LockoutEnabled"	INTEGER NOT NULL,
	"AccessFailedCount"	INTEGER NOT NULL,
	CONSTRAINT "PK_AspNetUsers" PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "CartItems" (
	"Id"	INTEGER NOT NULL,
	"CartId"	INTEGER NOT NULL,
	"ProductId"	INTEGER NOT NULL,
	"Quantity"	INTEGER NOT NULL,
	"Price"	TEXT NOT NULL,
	CONSTRAINT "PK_CartItems" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_CartItems_Carts_CartId" FOREIGN KEY("CartId") REFERENCES "Carts"("Id") ON DELETE CASCADE,
	CONSTRAINT "FK_CartItems_Products_ProductId" FOREIGN KEY("ProductId") REFERENCES "Products"("Id") ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS "Carts" (
	"Id"	INTEGER NOT NULL,
	"UserId"	TEXT NOT NULL,
	"IsActive"	INTEGER NOT NULL,
	"CreatedAt"	TEXT NOT NULL,
	CONSTRAINT "PK_Carts" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_Carts_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "OrderItems" (
	"Id"	INTEGER NOT NULL,
	"OrderId"	INTEGER NOT NULL,
	"ProductId"	INTEGER NOT NULL,
	"Quantity"	INTEGER NOT NULL,
	"Price"	TEXT NOT NULL,
	CONSTRAINT "PK_OrderItems" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_OrderItems_Orders_OrderId" FOREIGN KEY("OrderId") REFERENCES "Orders"("Id") ON DELETE CASCADE,
	CONSTRAINT "FK_OrderItems_Products_ProductId" FOREIGN KEY("ProductId") REFERENCES "Products"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Orders" (
	"Id"	INTEGER NOT NULL,
	"UserId"	TEXT NOT NULL,
	"OrderDate"	TEXT NOT NULL,
	"TotalAmount"	TEXT NOT NULL,
	"Status"	INTEGER NOT NULL,
	"DeliveryAddress"	TEXT,
	CONSTRAINT "PK_Orders" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_Orders_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Payments" (
	"Id"	INTEGER NOT NULL,
	"OrderId"	INTEGER NOT NULL,
	"Amount"	TEXT NOT NULL,
	"PaymentDate"	TEXT NOT NULL,
	"Status"	INTEGER NOT NULL,
	"PaymentMethod"	TEXT NOT NULL,
	"TransactionId"	TEXT NOT NULL,
	CONSTRAINT "PK_Payments" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_Payments_Orders_OrderId" FOREIGN KEY("OrderId") REFERENCES "Orders"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Products" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT NOT NULL,
	"Description"	TEXT NOT NULL,
	"ImageUrl"	TEXT NOT NULL,
	"Price"	TEXT NOT NULL,
	"IsAvailable"	INTEGER NOT NULL,
	"Category"	INTEGER NOT NULL,
	"CreatedAt"	TEXT NOT NULL,
	"UpdatedAt"	TEXT NOT NULL,
	CONSTRAINT "PK_Products" PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "RefreshTokens" (
	"Id"	INTEGER NOT NULL,
	"UserId"	TEXT NOT NULL,
	"Token"	TEXT NOT NULL,
	"Expires"	TEXT NOT NULL,
	"Revoked"	TEXT,
	CONSTRAINT "PK_RefreshTokens" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_RefreshTokens_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
	"MigrationId"	TEXT NOT NULL,
	"ProductVersion"	TEXT NOT NULL,
	CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY("MigrationId")
);
INSERT INTO "AspNetRoles" VALUES ('6f7b80cf-52c4-4bcd-becf-99fff804ad7c','User','USER',NULL);
INSERT INTO "AspNetRoles" VALUES ('ac2ed7fa-97f7-4817-88bb-8e77f3d4e611','Admin','ADMIN',NULL);
INSERT INTO "AspNetUserRoles" VALUES ('c93a243c-a523-4086-9e76-fcbac3e2d8cc','ac2ed7fa-97f7-4817-88bb-8e77f3d4e611');
INSERT INTO "AspNetUsers" VALUES ('c93a243c-a523-4086-9e76-fcbac3e2d8cc','Admin','Admin','Admin utca 12.','Admin city','0000','admin@admin','ADMIN@ADMIN','admin@admin','ADMIN@ADMIN',0,'AQAAAAIAAYagAAAAEBMFaks8BuY7KLylYaiOa4eR72jyVYaICV52lYuo9DhdnPDkVJ6ZVFHLXeOjP3HVnw==','MED76XC4J6TLFLNWUBUHPXYFJYBNMWHR','fdf84962-8fa2-4004-94a1-3115543ec36a','00000000000',0,0,NULL,1,0);
INSERT INTO "Products" VALUES (1,'Margherita pizza','Klasszikus margherita pizza','https://www.donpepe.hu/storage/products/big/mapi_1.jpg','2798.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (2,'Pepperoni pizza','pizzaparadicsom, mozzarella, paprikás vastagkolbász','https://www.donpepe.hu/storage/products/big/szalpi_1.jpg','3100.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (3,'PEPSI COLA','PEPSI COLA','https://www.donpepe.hu/storage/products/big/pcu5_2.jpg','790.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (4,'Aphrodité pizza','tejföl, roston csirke, koktélparadicsom, fehérkrém, olívabogyó, bazsalikom, mozzarella','https://www.donpepe.hu/storage/products/big/aphpi_1.jpg','3490.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (5,'MOZZARELLA CAPRESE PIZZA',' paradicsomszósz, olivabogyó, paradicsom, mozzarella, érlelt sonka, friss bazsalikom - figyelem: ez egy úgynevezett hideg feltétes pizza, a kemencében sütés után utólagosan kerülnek rá az érlelt sonka, vizes mozzarella és friss bazsalikom feltétek','https://www.donpepe.hu/storage/products/big/mcapi.jpg','3990.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (6,'Bolognai pizza marhahúsos',' pizzaparadicsom, mozzarella, zöldséges-darálthúsos ragu','https://www.donpepe.hu/storage/products/big/bolopi_1.jpg','3290.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (7,'Bugaci májas pizza',' pizzaparadicsom, mozzarella, csirkemájas ragu, hegyes erős paprika','https://www.donpepe.hu/storage/products/big/bugpi_1.jpg','2690.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (8,'CANADA DRY','CANADA DRY','https://www.donpepe.hu/storage/products/big/canu5_2.jpg','790.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (9,'Duplán jó! két kolbászos - két sajtos pizza',' pizzaparadicsom, füstölt mozzarella, natúr mozzarella, chorizó, kolbász, kukoricadara','https://www.donpepe.hu/storage/products/big/dupi_1.jpg','3590.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (10,'26 CM-ES DUPLÁN JÓ! KÉT KOLBÁSZOS - KÉT SAJTOS PIZZA',' pizzaparadicsom, füstölt mozzarella, natúr mozzarella, chorizó, száraz kolbász, kukoricadara','https://www.donpepe.hu/storage/products/big/du26ha.jpg','3590.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (11,'Fokhagymás-tejfölös csirkés pizza',' fokhagyma, mozzarella, tejföl, csirkecomb','https://www.donpepe.hu/storage/products/big/focspi_1.jpg','3390.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (12,'Fokhagymás-tejfölös pizza',' fokhagyma, mozzarella, tejföl, paprikás vastagkolbász, sonka, hagyma, paradicsomkarika','https://www.donpepe.hu/storage/products/big/fotpi_1.jpg','3390.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (13,'Hawaii pizza',' pizzaparadicsom, mozzarella, kukorica, sonka, ananász','https://www.donpepe.hu/storage/products/big/hawpi_1.jpg','3490.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (14,'Hús hússal pizza',' pizzaparadicsom, mozzarella, tarja, paprikás vastagkolbász, roston csirke, bacon, érlelt sonka - FIGYELEM: ez egy különleges, úgynevezett utólagos feltétezésű pizza, aminek sajátossága, hogy a kemencében sülést követően kerül rá az érlelt sonka HIDEGEN!','https://www.donpepe.hu/storage/products/big/huhpi_1.jpg','3990.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (15,'Jalapeno papa pizza',' pizzaparadicsom, mozzarella, roston csirke, bacon, jalapeno','https://www.donpepe.hu/storage/products/big/jalapi_1.jpg','3490.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (16,'Juhtúrós - csirkés pizza',' pizzaszósz, roston csirke, vöröshagyma, paradicsom, kaliforniai paprika, juhtúró, mozzarella','https://www.donpepe.hu/storage/products/big/jucpi_1.jpg','3490.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (17,'Keménylegény pizza',' tejföl, mustár, fokhagyma, mozzarella, főtt-füstölt tarja, főtt-füstölt császárszalonna, hegyes erős paprika','https://www.donpepe.hu/storage/products/big/kempi_1.jpg','3390.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (18,'MIRINDA 0,5 L','MIRINDA 0,5 L','https://www.donpepe.hu/storage/products/big/mirnzu5.jpg','790.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (19,'7UP ZÉRO 0,5 L','7UP ZÉRO 0,5 L','https://www.donpepe.hu/storage/products/big/7upzu5.jpg','790.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (20,'PEPSI ZERO 0,5 L','PEPSI ZERO 0,5 L','https://www.donpepe.hu/storage/products/big/npb_2.jpg','890.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (21,'SZENTKIRÁLYI SZÉNSAVMENTES 1,5 L-ES','SZENTKIRÁLYI SZÉNSAVMENTES 1,5 L-ES','https://www.donpepe.hu/storage/products/big/lszkm_2.jpg','690.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (22,'SZENTKIRÁLYI SZÉNSAVAS 1,5 L ','SZENTKIRÁLYI SZÉNSAVAS 1,5 L ','https://www.donpepe.hu/storage/products/big/lszk_2.jpg','690.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (23,'LIPTON ICE TEA CITROM 1,5 L','LIPTON ICE TEA CITROM 1,5 L','https://www.donpepe.hu/storage/products/big/litc15_2.jpg','990.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (24,'LIPTON ICE TEA ŐSZIBARACK 1,5 L','LIPTON ICE TEA ŐSZIBARACK 1,5 L','https://www.donpepe.hu/storage/products/big/litb15_2.jpg','990.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (25,'LIPTON ICE TEA ŐSZIBARACK ZERO 1,5 L','LIPTON ICE TEA ŐSZIBARACK ZERO 1,5 L','https://www.donpepe.hu/storage/products/big/litbz15_2.jpg','990.0',1,1,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (26,'Sajtimádó pizza','cheddar sajtszósz, parmezán, füstölt mozzarella, vizes mozzarella, natur mozzarella, trappista, márványsajt, fehérkrém, camembert','https://www.donpepe.hu/storage/products/big/sipi_1.jpg','4690.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (27,'Négysajtos-rukkolás pizza','pizzaparadicsom, natur mozzarella, füstölt mozzarella, trappista, márványsajt, rukkola','https://www.donpepe.hu/storage/products/big/nsrupi_1.jpg','3390.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (28,'Tonhalas pizza','fokhagymás tejföl, tonhal, olívabogyó, kapribogyó, citrom, mozzarella','https://www.donpepe.hu/storage/products/big/tohpi_1.jpg','3990.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (29,'Son-go-ku pizza','pizzaparadicsom, mozzarella, sonka, gomba, kukorica','https://www.donpepe.hu/storage/products/big/sgkpi_1.jpg','3490.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "Products" VALUES (30,'Mexikói pizza','pizzaparadicsom, mozzarella, kukorica, császárszalonna, bab, chili','https://www.donpepe.hu/storage/products/big/mexpi_1.jpg','3390.0',1,0,'0001-01-01 00:00:00','0001-01-01 00:00:00');
INSERT INTO "RefreshTokens" VALUES (393,'c93a243c-a523-4086-9e76-fcbac3e2d8cc','CV1fCSNExejyVpUpwliehZ+u7l/tcRK/5TmoRjanFSwyhtbsOsTLbD7MIoSggCYeyZtFt6KPfDsRYx1dRLEL8Q==','2025-05-03 21:56:10.3635134',NULL);
INSERT INTO "__EFMigrationsHistory" VALUES ('20250423140608_init','8.0.3');
CREATE INDEX IF NOT EXISTS "EmailIndex" ON "AspNetUsers" (
	"NormalizedEmail"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" (
	"RoleId"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" (
	"UserId"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" (
	"UserId"
);
CREATE INDEX IF NOT EXISTS "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" (
	"RoleId"
);
CREATE INDEX IF NOT EXISTS "IX_CartItems_CartId" ON "CartItems" (
	"CartId"
);
CREATE INDEX IF NOT EXISTS "IX_CartItems_ProductId" ON "CartItems" (
	"ProductId"
);
CREATE INDEX IF NOT EXISTS "IX_Carts_UserId" ON "Carts" (
	"UserId"
);
CREATE INDEX IF NOT EXISTS "IX_OrderItems_OrderId" ON "OrderItems" (
	"OrderId"
);
CREATE INDEX IF NOT EXISTS "IX_OrderItems_ProductId" ON "OrderItems" (
	"ProductId"
);
CREATE INDEX IF NOT EXISTS "IX_Orders_UserId" ON "Orders" (
	"UserId"
);
CREATE UNIQUE INDEX IF NOT EXISTS "IX_Payments_OrderId" ON "Payments" (
	"OrderId"
);
CREATE INDEX IF NOT EXISTS "IX_RefreshTokens_UserId" ON "RefreshTokens" (
	"UserId"
);
CREATE UNIQUE INDEX IF NOT EXISTS "RoleNameIndex" ON "AspNetRoles" (
	"NormalizedName"
);
CREATE UNIQUE INDEX IF NOT EXISTS "UserNameIndex" ON "AspNetUsers" (
	"NormalizedUserName"
);
COMMIT;
