/****************************************************************************/
/*                                                                          */
/*             CREATE DATABASE AND                                          */
/*                                                                          */
/*             CREATE TABLE TO DATABASE                                     */
/*                                                                          */
/*             FINAL PROJECT - DATABASE                                     */
/*                                                                          */
/*             SHEEP001 GROUP                                               */
/*                                                                          */
/****************************************************************************/


CREATE DATABASE myshop COLLATE utf8_unicode_ci;


CREATE TABLE Shopuser(
    User_ID             INT(11)         NOT NULL AUTO_INCREMENT,
    Email               VARCHAR(60)     NOT NULL UNIQUE,
    Password            VARCHAR(30)     NOT NULL,
    Username            VARCHAR(60)     NOT NULL UNIQUE,
    Address_1           VARCHAR(300)    NOT NULL,
    Address_2           VARCHAR(300)            ,
    Country             VARCHAR(30)     NOT NULL CHECK (Country IN ('China', 'Italy', 'Japan', 'Thailand', 'United Kingdom', 'United States of America')),
    City                VARCHAR(30)     NOT NULL,
    PostCode            VARCHAR(10)     NOT NULL,
    Phone               VARCHAR(20)     NOT NULL UNIQUE,
    BirthDate           DATE            NOT NULL,
    Gender              VARCHAR(10)     NOT NULL CHECK (Gender IN ('Male','Female', 'Others')),
    Created             DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Last_login          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    Last_logout         TIMESTAMP       NULL,
    CONSTRAINT          USER_PK         PRIMARY KEY(User_ID)
    );

CREATE TABLE Delivery_Address(
    Delivery_add_ID     INT(11)                     NOT NULL AUTO_INCREMENT,
    User_ID             INT(11)                     NOT NULL,
    FirstName           VARCHAR(60)                 NOT NULL,
    MiddleName          VARCHAR(60)                         ,
    LastName            VARCHAR(60)                 NOT NULL,
    Address_1           VARCHAR(300)                NOT NULL,
    Address_2           VARCHAR(300)                        ,
    Country             VARCHAR(30)                 NOT NULL CHECK (Country IN ('China', 'Italy', 'Japan', 'Thailand', 'United Kingdom', 'United States of America')),
    City                VARCHAR(30)                 NOT NULL,
    PostCode            VARCHAR(10)                 NOT NULL,
    Phone               VARCHAR(20)                 NOT NULL,
    CONSTRAINT          DELIVERY_ADD_PK             PRIMARY KEY(Delivery_add_ID),
    CONSTRAINT          DELIVER_ADD_USER_FK         FOREIGN KEY (User_ID)
					            REFERENCES shopuser(User_ID)
					            ON UPDATE CASCADE ON DELETE CASCADE
    );
    

CREATE TABLE Order_list(
    Order_ID            INT(11)         NOT NULL AUTO_INCREMENT,
    Delivery_add_ID     INT(11)         NOT NULL,
    OrderDateTime       DATETIME        NOT NULL,
    PaymentStatus       BOOLEAN         NOT NULL,
    Tax                 NUMERIC(11,2)   NOT NULL,
    Total               NUMERIC(11,2)   NOT NULL,
    CONSTRAINT          ORDER_PK        PRIMARY KEY(Order_ID),
    CONSTRAINT          ORDER_DEL_ADD_FK FOREIGN KEY(Delivery_add_ID)
                                         REFERENCES Delivery_Address(Delivery_add_ID)
                                         ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE ShipmentType(
    ShipmentType_ID     INT(11)         NOT NULL AUTO_INCREMENT,
    Shipment_Type       VARCHAR(30)     NOT NULL UNIQUE,
    CONSTRAINT          SHIPTYPE_PK     PRIMARY KEY(ShipmentType_ID)
    );   

CREATE TABLE category(
    category_ID         INT(11)         NOT NULL AUTO_INCREMENT,
    Product_Category    VARCHAR(60)     NOT NULL UNIQUE,
    CONSTRAINT          CATEGORY_PK     PRIMARY KEY(category_ID)
    );

CREATE TABLE subcategory(
    subcategory_ID         INT(11)             NOT NULL AUTO_INCREMENT,
    category_ID            INT(11)             NOT NULL,
    Product_SubCategory    VARCHAR(60)         NOT NULL ,
    CONSTRAINT             SUBCATEGORY_PK      PRIMARY KEY(subcategory_ID),
    CONSTRAINT             SUBCATE_CATE_FK     FOREIGN KEY(category_ID)
                                               REFERENCES category(category_ID)
                                               ON UPDATE CASCADE ON DELETE CASCADE
    );


CREATE TABLE Product(
    Product_ID          INT(11)             NOT NULL AUTO_INCREMENT,
    Seller              INT(11)             NOT NULL,
    SubCategory_ID      INT(11)             NOT NULL,
    Product_Name        VARCHAR(60)         NOT NULL,
    Product_Description VARCHAR(300)        NOT NULL,
    Product_InStock     INT(11)             NOT NULL DEFAULT 0 CHECK (Product_InStock >= 0),
    Product_Price       NUMERIC(11,2)       NOT NULL CHECK (Product_InStock >= 0),
    Product_img_dir     VARCHAR(255)        NOT NULL,
    Product_Rate        INT(1)              NOT NULL DEFAULT 0 CHECK (Product_Rate <= 5 AND Product_Rate >= 0),
    CONSTRAINT          PRODUCT_PK          PRIMARY KEY(Product_ID),
    CONSTRAINT          PRODUCT_USER_FK     FOREIGN KEY(Seller)
                                            REFERENCES shopuser(User_ID)
                                            ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT          PRODUCT_SUBCATE_FK  FOREIGN KEY(SubCategory_ID)
                                            REFERENCES subcategory(subcategory_ID)
                                            ON UPDATE CASCADE ON DELETE RESTRICT
    );



CREATE TABLE SubOrderDetail(
    SubOrderDetail_ID     INT(11)                  NOT NULL AUTO_INCREMENT,
    Order_ID              INT(11)                  NOT NULL,
    Product_ID            INT(11)                  NOT NULL,
    ShipmentType_ID       INT(11)                  NOT NULL,
    Quantity              INT(11)                  NOT NULL,
    Subtotal              DOUBLE(11,2)             NOT NULL,
    Tracking_Number       VARCHAR(20)              NOT NULL,
    Shipment_DateTime     DATETIME                         ,
    Comment_Message       VARCHAR(500)                     ,
    User_Rate             INT(1)                   CHECK (User_Rate <= 5 AND User_Rate >= 0),
    CONSTRAINT            SUBORDER_PK              PRIMARY KEY (SubOrderDetail_ID),     
    CONSTRAINT            SUBORDER_ORDER_FK        FOREIGN KEY(Order_ID)
                                                   REFERENCES Order_list(Order_ID)
                                                   ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT            SUBORDER_PRODUCT_FK      FOREIGN KEY(Product_ID)
                                                   REFERENCES product(Product_ID)
                                                   ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT            SUBORDER_SHIPTYPE_FK     FOREIGN KEY(ShipmentType_ID)
                                                   REFERENCES ShipmentType(ShipmentType_ID)
                                                   ON UPDATE CASCADE ON DELETE RESTRICT
    );



CREATE TABLE Staff(
    Staff_ID            INT(11)         NOT NULL AUTO_INCREMENT,
    Username            VARCHAR(60)     NOT NULL UNIQUE,
    Password            VARCHAR(30)     NOT NULL,
    Position            VARCHAR(30)     NOT NULL,
    Email               VARCHAR(60)     NOT NULL UNIQUE,
    FirstName           VARCHAR(60)     NOT NULL,
    MiddleName          VARCHAR(60)             ,
    LastName            VARCHAR(60)     NOT NULL,
    Address_1           VARCHAR(300)    NOT NULL,
    Address_2           VARCHAR(300)            ,
    Country             VARCHAR(30)     NOT NULL CHECK (Country IN ('China', 'Italy', 'Japan', 'Thailand', 'United Kingdom', 'United States of America')),
    City                VARCHAR(30)     NOT NULL,
    PostCode            VARCHAR(10)     NOT NULL,
    Phone               VARCHAR(20)     NOT NULL UNIQUE,
    BirthDate           DATE                    ,
    Gender              VARCHAR(10)     NOT NULL CHECK (Gender IN ('Male','Female', 'Others')),
    CONSTRAINT          STAFF_PK        PRIMARY KEY(Staff_ID)
    );


CREATE TABLE Support(
    Case_ID                     INT(11)                NOT NULL AUTO_INCREMENT,
    User_ID                     INT(11)                NOT NULL,
    Staff_ID                    INT(11)                NOT NULL,
    Problem_Issue_Datetime      TIMESTAMP              NOT NULL,
    Problem_Fixed_Datetime      TIMESTAMP              NULL        ,
    Problem_Topic               VARCHAR(100)           NOT NULL,
    Problem_Description         VARCHAR(500)           NOT NULL,
    Problem_Replied             VARCHAR(500)                   ,
    Problem_Status              BOOLEAN                NOT NULL,
    CONSTRAINT            SUPPORT_PK               PRIMARY KEY (Case_ID),     
    CONSTRAINT            SUPPORT_USER_FK          FOREIGN KEY(User_ID)
                                                   REFERENCES shopuser(User_ID)
                                                   ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT            SUPPORT_STAFF_FK         FOREIGN KEY(Staff_ID)
                                                   REFERENCES Staff(Staff_ID)
                                                   ON UPDATE CASCADE ON DELETE RESTRICT
    );

