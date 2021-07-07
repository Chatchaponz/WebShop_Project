/****************************************************************************/
/*                                                                          */
/*             INSERT DATA INTO TABLE                                       */
/*                                                                          */
/*             FINAL PROJECT - DATABASE                                     */
/*                                                                          */
/*             SHEEP001 GROUP                                               */
/*                                                                          */
/****************************************************************************/


/* SHOP USER DATA   */

insert into shopuser (`Email`, `Password`, `Username`, `Address_1`, `Country`, `City`, `PostCode`, `Phone`, `BirthDate`, `Gender`, `Created`, `Last_login`, `Last_logout`) 
VALUES ('lur.ry@mail.com', '123456', 'lurry_69', '12/34  BanWan R.', 'Thailand', 'bkk', '10148', '+66 960513241', '1997-01-12', 'Male', '2020-12-31 13:55:42', '2021-03-30 12:45:12', '2021-03-30 13:02:24')
,('hahaha@mail.com', 'Asd6asd', 'sanman_12', '100/104 Siam R.', 'United States of America', 'ohio', '15487', '+66 960548541', '1992-06-12', 'Others', '2021-01-15 01:25:51', '2021-04-12 23:45:42', '2021-04-13 03:15:27')
,('Aeyaya@mail.com', 'IAM_CAT44', 'antty_69', '54/44 Namille R.', 'Italy', 'Rome', '10150', '+66 915049907', '1983-04-12', 'Male', '2021-02-12 17:05:26', '2021-04-25 12:11:14', '2021-04-25 12:25:35')
,('Thanku@mail.com', 'asid12648', 'qurry_12', '75/62 Tigrx R.', 'China', 'Chiang hai', '15040', '+66 955650555', '2000-03-13', 'Female', '2021-02-13 18:42:12', '2021-02-13 18:42:12', '2021-02-13 18:43:52')
,('orsadnsoo@mail.com', 'UMSBVzH8P$t&', 'lnwzaHogger', '41/6, Brick R.', 'Thailand', 'bkk', '10799', '+66 9521125', '1996-02-12', 'Male', '2020-11-17 18:13:45', '2021-05-02 08:15:47', '2021-05-02 08:20:12')
,('kstlnsd_as@mail.com', 'NULs&T', 'naenaelei', 'Pathum Wan', 'Thailand', 'bkk', '10110', '+66 699699678', '2001-05-07', 'Female', '2021-03-26 20:13:38', '2021-03-26 20:13:38', '2021-03-26 20:21:14')
,('beeper45@mail.com', 'aAS2252s', 'mumasni', '11/16 Vipawadeerangsit', 'Japan', 'Nagoya', '10400', '+66 982155510', '2000-02-12', 'Male', '2020-12-10 08:45:29', '2021-06-02 18:15:51', '2021-06-02 19:15:19')
,('som.sang_as@mail.com', 'maibokkrai', 'somsang', '17 Pathum Wan', 'United Kingdom', 'london', '10112', '+66 982547854', '2001-02-27', 'Female', '2020-12-02 07:42:32', '2021-05-17 20:07:54', '2021-05-17 20:45:49');

/*==========================================================================*/


/*    DELIVERY ADD DATA    */

insert into delivery_address (`User_ID`, `FirstName`, `MiddleName`, `LastName`, `Address_1`, `Country`, `City`, `PostCode`, `Phone`)
VALUES ( 1,'Lur', 'jr.', 'Natry', '12/34  BanWan R.', 'Thailand', 'bkk', '10148', '+66 960513241')
,( 2, 'San', NULL, 'Ryaaa', '100/104 Siam R.', 'Thailand', 'bkk', '15487', '+66 960513241')
,( 3, 'prompto', NULL, 'Deesawan', '15/16, Vipawadeerangsit', 'Thailand', 'bkk', '10400', '+66 915049907')
,( 4, 'Nyya', NULL, 'Pithi', '41/6, Brick R.', 'Thailand', 'bkk', '10799', '+66 955650555')
,( 5, 'Gangan', NULL, 'Pathom', '11/16, Vipawadeerangsit', 'Thailand', 'bkk', '10400', '+66 9521125')
,( 6, 'Nakapop', NULL, 'Songsri', '10 Pathum Wan', 'Thailand', 'bkk', '10110', '+66 699699678')
,( 7, 'Naprapha', NULL, 'Preithong', '17 Pathum Wan', 'Thailand', 'bkk', '10110', '+66 982155510')
,( 8, 'SomSang', NULL, 'TalodKan', '77 Pathum Sang', 'Thailand', 'bkk', '10112', '+66 982547854');


/*==========================================================================*/


/*    ORDER DATA    */

insert into order_list ( `Delivery_add_ID`, `OrderDateTime`, `PaymentStatus`,  `Tax`, `Total`)
VALUES( 1, '2021-02-12', 1, 7.00, 139999*1.07)
,( 1, '2021-02-15', 1, 7.00, 49*1.07)
,( 4, '2021-02-22', 1, 7.00, 11857*1.07)
,( 8, '2021-03-14', 1, 7.00, 69900*2*1.07)
,( 2, '2021-03-14', 1, 7.00, 5990*1.07)
,( 7, '2021-04-14', 1, 7.00, 1790*1.07)
,( 1, '2021-04-24', 1, 7.00, 4249*1.07)
,( 2, '2021-04-29', 1, 7.00, 1290*1.07)
,( 3, '2021-04-30', 1, 7.00,  1790*2*1.07)
,( 4, '2021-04-30', 1, 7.00, 1290*5*1.07)
,( 6, '2021-05-01', 1, 7.00, 7980*1.07);


/*==========================================================================*/


/*    SHIPMENT TYPE    */

INSERT INTO shipmentType (`Shipment_Type`)
VALUES ('registered')
      ,('ems');

/*==========================================================================*/



/*    CATEGORY TYPE    */

INSERT INTO Category(`Product_Category`)
VALUES ('Clothes')
,('Electronics')
,('General')
,('Furniture');

/*==========================================================================*/



/*    SUBCATEGORY TYPE    */

INSERT INTO SubCategory(`category_ID`, `Product_SubCategory`)
VALUES ( 1,'Accessories')
,(1, 'Protection Gear')
,(1, 'Shoes')
,(2, 'Computer Acceccories')
,(2, 'Appliances')
,(2, 'Phone')
,(3, 'Household')
,(3, 'Stationery')
,(4, 'Living Room')
,(4, 'Office')
,(4, 'Shelf')
,(2, 'Personal Item');

/*==========================================================================*/



/*    PRODUCT    */

INSERT INTO product (`Seller`, `SubCategory_ID`, `Product_Name`, `Product_Description`, `Product_Instock`, `Product_Price`, `Product_img_dir`, `Product_Rate`)
VALUES (8, 1, 'Seiko MM 300', 'Seiko Prospex Marine Master 300', 10,  69900 , 'web_img/SEIKO MM300.png', 4)                                           /*1*/  /**/
,(8, 2,'Brown Gloves', 'Brown cold protection gloves', 54,  199 , 'web_img/gloves.jpg', 2)                                                            /*2*/  /**/
,(7, 2,'Rubber Gloves', 'Rubber gloves', 12, 49, 'web_img/rubberglove.jpg', 2)                                                                        /*3*/  /**/
,(6, 3,'Converse Chuck Taylor All star',  'Converse Chuck Taylor All star', 45, 2099, 'web_img/Converse Chuck Taylor All star.jpg', 3)                /*4*/  /**/
,(7, 3,'Hippo Slippers', 'Yellow slippers ', 43, 169, 'web_img/Slipper.jpg', 5)                                                                       /*5*/  /**/
,(2, 4,'Woozik Head phone', 'Woozik In-ears Blutooth Head phone ', 28, 450, 'web_img/woozik In-ears Blutooth headphone.jpg', 4)                       /*6*/  /**/
,(2, 5,'Elekta Kettle', 'Elekta - Electric kettle ', 57, 1290, 'web_img/elektra-kettle.jpg', 1)                                                       /*7*/  /**/
,(2, 5,'Panasonic Shaver', 'Panasonic- Electronic shaver ', 45, 2890, 'web_img/PANASONIC Electronic shaver.jpg', 4)                                   /*8*/  /**/
,(8, 5,'Dyson Vacuum Cleaner', 'Dyson Electric functional vacuum cleaner ', 83, 5990, 'web_img/Dyson vacuum cleaner.jpg', 3)                          /*9*/  /**/
,(4, 5,'Samsung Vacuum Cleaner', 'Samsung floor care vacuum cleaner', 53, 5990, 'web_img/Samsung Vacuum cleaner.png', 5)                              /*10*/ /**/
,(8, 5,'Electrolux Vacuum Claner',  'Electrolux EC31-2BB card vacuum cleaner', 3, 6900, 'web_img/electrolux-vacuum.jpg', 5)                           /*11*/ /**/
,(8, 6,'Google Phone', 'Google Android Smart Phone', 5, 4750, 'web_img/Google Android phone.png', 4)                                                  /*12*/ /**/
,(8, 6,'Home Telephone', 'Classic home telephone', 78, 450, 'web_img/Home telephone.jpg', 2)                                                          /*13*/ /**/
,(5, 5,'Electrolux Fan ', 'Electrolux 16 inches floor fan with 3 fan blades', 5, 799, 'web_img/Electrolux Fan.jpg', 1)                                /*14*/ /**/
,(3, 5,'Electrolux Rice cooker', 'Electrolux ERC1300 1.3 liters silver color', 15, 1790, 'web_img/Electrolux Rice cooker.jpg', 3)                     /*15*/ /**/
,(2, 5,'Panasonic Rice cooker', 'Panasonic 1.8L Mechanical Jar rice cooker SRJP185TSK', 14, 1099, 'web_img/Panasonic Rice cooker.jpg', 4)             /*16*/ /**/
,(7, 4,'Monster Head gear',  'Monster 7.1 Surround Head gear', 9, 1290, 'web_img/monster-headgear.jpg', 3)                                            /*17*/ /**/
,(8, 7,'Barber Scissors', 'Professional hair cutting scisscors', 14, 299, 'web_img/Barber Scissors.jpeg', 2)                                          /*18*/ /**/
,(7, 8,'Calculator', 'General calculator', 25, 259, 'web_img/Calculator.jpg', 3)                                                                      /*19*/ /**/
,(7, 8,'Fountain Pen ', 'Pointed Fountain pen', 12, 69, 'web_img/Fountain pen.png', 2)                                                                /*20*/ /**/
,(7, 8,'Staedtler Eraser',  'Staedtler High quality big size eraser ', 42, 25, 'web_img/Staedtler eraser.png', 4)                                     /*21*/ /**/
,(4, 9,'Wooden Chair', 'Wooden chair with fashionable back rest ', 20, 659, 'web_img/Wooden chair.jpg', 5)                                            /*22*/ /**/
,(2, 10,'Office Chair ', 'Comfortable office chair, Adjustable height', 32, 2599, 'web_img/Office chair.png', 2)                                      /*23*/ /**/
,(6, 11,'Book sheilf', 'Book sheilf with half cabinet', 42, 1890, 'web_img/Book shelf.jpg', 5)                                                        /*24*/ /**/
,(6, 11,'Wooden Sheif2','Small wooden sheilf ', 13, 700, 'web_img/Wooden shelf2.jpg', 2)                                                              /*25*/ /**/
,(2, 11,'Wooden Sheif3',  'High wooden sheilf', 20, 990, 'web_img/Wooden shelf3.jpg', 4)                                                              /*26*/ /**/
,(3, 9,'Dining Table Set', 'One set is included , 1 long wooden talble and 8 wooden chairs', 15, 13990, 'web_img/Dining table set.jpg', 2)            /*27*/ /**/
,(8, 9,'Glass table ', 'Transparent glass table', 4, 3590, 'web_img/Glass table.jpg', 3)                                                              /*28*/ /**/
,(7, 9,'Wooden Table',  'Round wooden table by ZorZon company', 7, 890, 'web_img/Circular wooden tale.jpg', 4)                                        /*29*/ /**/
,(8, 9,'Stainless Table', 'Round stainless table By pamolok', 10, 1600,'web_img/Stainless table.jpg', 2)                                              /*30*/ /**/
,(5, 5,'Hatari Fan', 'HATARI HE-T14M3 Fan', 17, 890, 'web_img/HATARI HE_T14M3_purple fan.jpg', 4)                                                     /*31*/ /**/
,(6, 12,'Panasonic Shaver SW', 'Wet & Dry Electric Shaver Star Wars Special Edition SW6700/14', 15, 200, 'web_img/SW Shaver5.jpeg', 5);                /*32*/ /**/

/*==========================================================================*/


/*    SUBORDER DETAIL    */

INSERT into suborderdetail ( `Order_ID`, `Product_ID`, `ShipmentType_ID`, `Quantity`, `Subtotal`, `Tracking_Number`, `Shipment_DateTime`, `Comment_Message`, `User_Rate`)
VALUES ( 1, 1, 1, 2, 139800, 'ADS00001', '2021-02-28', 'so so', 3)
,( 1, 2, 1, 1, 199, 'ADS00001', '2021-02-28', 'beautiful but shoddy', 2)
,( 2, 3, 1, 1, 49, 'ADS00002', '2021-03-05', 'nice', 4)
,( 3, 12, 2, 1, 4750, 'ADS00003', '2021-03-26', 'good', 5)
,( 3, 11, 2, 1, 6900, 'ADS00003', '2021-03-26', 'okay quality', 4)
,( 3, 20, 2, 3, 69*3, 'ADS00003', '2021-03-26', 'okay quality', 4)
,( 4, 1, 1, 2, 69900*2, 'ADS00007', '2021-04-01', 'not so good as expected', 3)
,( 5, 9, 1, 1,  5990, 'ADS00012', '2021-04-29', 'Awesome!!', 5)
,( 6, 15, 2, 1, 1790, 'ADS000015', '2021-05-12', 'Worth it.', 5)
,( 7, 29, 2, 1, 3590, 'ADS000016', '2021-05-15', 'Good Texture.', 5)
,( 7, 22, 2, 1, 659, 'ADS000019', '2021-05-15', 'Expensive for this quality.', 3)
,( 8, 17, 2, 1, 1290, 'ADS000020', '2021-05-15', 'Cool look and sound quality is also good but it heavy to wear a little', 4)
,( 9, 15, 2, 2, 1790*2, 'ADS000025', '2021-05-16', 'ship on date, quality might know soon after i use.', 4)
,( 10, 7, 2, 5, 1290*5, 'ADS000026', '2021-05-18', 'Cool Kettle for cool people', 5)
,( 11, 32, 2, 1, 4980, 'ADS000028', '2021-05-19', 'Well only look is difference sure thing it like a collection', 4);

/*==========================================================================*/



/*    STAFF    */

INSERT into staff ( `Username` , `Email`, `Password`, `Position`, `FirstName`, `MiddleName`, `LastName`, `Address_1`, `Address_2`, `Country`, `City`, `PostCode`, `Phone`, `BirthDate`, `Gender`)
VALUES ( 'Staff001', 'caramc_1996@company.com', '6J,}m!{Y', 'Customer Support', 'Cara', 'Custard', 'Melt', '11/1 Dessert R.', NULL, 'China', 'Joturo.exe', 'PK04I23', '+66 812574953', '2000-03-30', 'Female')
,( 'Staff002', 'palladddd@company.com', 'Ug=3X:E', 'Customer Support', 'Pallad', NULL, 'Reckless', '85/12 AroiDee R.', NULL, 'Japan', 'bkk', '10196', '+66 948754953', '1993-08-12', 'Male')
,( 'Staff003', 're_redfield_c@company.com', '888$21Aa_', 'Customer Support', 'Claire', NULL, 'Redfield', '75/12 Avenuy R.', NULL, 'ThaiLand', 'bkk', '10120', '+66 947854475', '1995-07-10', 'Female')
,( 'Staff004', 'apple.pie@company.com', '25370513', 'Customer Support', 'Apple', NULL, 'Pies', '1/9999, Prachachuen11', 'Bang Sue, Bang Sue', 'ThaiLand', 'bkk', '10800', '+66 648754953', '1990-11-18', 'Female')
,( 'Staff005', 'pineee.treee@company.com', '{ckLM,X`4t', 'Customer Support', 'Tree', NULL, 'Pine', '99/999 DouTriNine R.', NULL, 'ThaiLand', 'bkk', '10500', '+66 694758754', '2000-06-19', 'Female')
,( 'Staff006', 'farmer.johny@company.com', '123456789#', 'Customer Support', 'John', NULL, 'Chaorai', 'Pathumwan, Pathumwan', NULL, 'Thailand', 'Bangkok', '10330', '+66 625988188', '1984-12-03', 'Male')
,( 'Staff007', 'nitipiyayayayaya@company.com', '221A5123d$2', 'Customer Support', 'Niti', NULL, 'Piya', '9/1 Moo7, Takua Pa', NULL, 'Thailand', 'Phangnga', '82190', '+66 642475453', '1988-06-26', 'Male')
,( 'Staff008', 'basturdjtkst@company.com', '6k0Q&yg%p4', 'Customer Support', 'Jato', NULL, 'KonkanEng', '2/14 SongKra', NULL, 'Thailand', 'Joturo.exe', '15485', '+66 812574954', '1994-08-25', 'Male')
,( 'Staff009', 'ivainvanvainvan@company.com', 'E=mc^2', 'Customer Support', 'Ivan', NULL, 'Ivain', '14/12 Samaya R.', NULL, 'Thailand', 'Joturo.exe', '48715', '+66 812547651', '1984-09-14', 'Male')
,( 'Staff010', 'wang2lom2lang@company.com', 'P-9c`r_', 'Customer Support', 'Wang', 'Lomlom', 'Langlang', '44/4 Sinwang R.', NULL, 'Thailand', 'Joturo.exe', '45126', '+66 687574843', '1999-01-11', 'Male');

/*==========================================================================*/



/*    SUPPORT    */

INSERT INTO support (`User_ID`, `Staff_ID`, `Problem_Issue_Datetime`, `Problem_Fixed_Datetime`, `Problem_Topic`, `Problem_Description`, `Problem_Replied`,  `Problem_Status`)
VALUES ( 1, 2, '2021-02-03', '2021-02-05', 'Cannot login', 'I do not know why I can not login, I am sure I use the correct Email and password.', 'Please send your Email and password. We will check for them', 1)
,( 2, 3, '2021-03-30', NULL, 'Cannot add product into cart', 'I can not add product into my cart.', NULL, 0)
,( 3, 8, '2021-03-19', '2021-03-20', 'Cannot add product into cart', 'I can not buy', 'Please refresh the page and try to buy again', 1)
,( 2, 2, '2021-03-18', '2021-03-19', 'Cannot login', 'I can not register', 'Refresh the page and try again', 1)
,( 5, 2, '2021-03-29', '2021-03-29', 'Cannot logout', 'I can not logout from the web', 'May be the page is freezed, try to refresh the page',  1)
,( 4, 4, '2021-04-12', NULL, 'Cannot delete product from cart', 'I can not delete product from my cart.', NULL,  0)
,( 2, 8, '2021-04-14', '2021-04-15', 'Cannot login', 'I can not register, it say my Email is used but I never register before', 'Plesae send your Email we will check for it',  1)
,( 3, 4, '2021-04-12', '2021-04-14', 'Cannot login', 'My friend click register but it did not success', 'Maybe the username is used',  1)
,( 7, 3, '2021-03-30', NULL, 'Cannot access the cart', 'I can not access my cart.', NULL,  0)
,( 6, 8, '2021-04-07', NULL, 'Store page has crashed', 'I cannot access the main page', NULL,  0)
,( 7, 3, '2021-03-30', '2021-05-19', 'Profile detail does not update', 'My profile detail is not updated like it should be.','refresh the page or logout and login again',  1)
,( 8, 7, '2021-05-12', '2021-05-15', 'How to delete product from cart', 'I can not remove product from my cart', 'May be the page is freezed, try to refresh the page',  1)
,( 4, 4, '2021-05-13', '2021-05-15', 'How to add product into cart', 'I can not find place to add product from my cart','It is the orange add-to-cart button',  1)
,( 6, 8, '2021-05-20', '2021-05-24',  'Store page has crashed', 'I cannot access the main page', 'Sorry, now our web page is on updating. Please a little bit',  1)
,( 3, 2, '2021-05-27', '2021-06-01', 'Cannot add product into cart', 'I can not buy again', 'Please refresh the page and try to buy again', 1)
,( 6, 10, '2021-05-28', '2021-06-02', 'Cannot add product into cart', 'I cannot push the buy button', 'Please refresh the page and try again',  1)
,( 1, 10, '2021-06-03', '2021-06-03','My profile page is not reachable', 'I think I cannot access my profile page', 'Sorry, now our web page is on updating. Please a little bit', 1)

/*==========================================================================*/
