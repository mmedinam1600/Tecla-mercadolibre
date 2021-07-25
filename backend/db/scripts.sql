CREATE DATABASE tecla_mercadolibre;

USE tecla_mercadolibre;

CREATE TABLE RolModel(
    rol_id INT NOT NULL IDENTITY(1,1),
    name VARCHAR(25) NOT NULL,
    PRIMARY KEY(rol_id),
);

INSERT INTO RolModel(name) VALUES('user'); /* Este rol puede listar sus productos en la tienda, agregar su dirección */
INSERT INTO RolModel(name) VALUES('moderator'); /* Este rol puede eliminar productos inadecuados de la tienda */
INSERT INTO RolModel(name) VALUES('administrator'); /* Este rol puede crear categorias y asignar roles */

SELECT * FROM RolModel;

CREATE TABLE Users(
    user_id INT NOT NULL IDENTITY(1,1), /* ID incremental de 1 comenzando en 1 */
    first_name VARCHAR(255) NOT NULL, /* Nombre más largo del mundo 45 */
    last_name VARCHAR(50) NOT NULL, /* Apellido más largo del mundo 24 */
    email VARCHAR(320) NOT NULL, /* Longitud máximo de un email 64@255  TOTAL 320 chars */
    encrypted_password VARCHAR(255) NOT NULL, /* Pendiente por revisar la longitud del cifrado a utilizar */
    country_code SMALLINT, /* solo ocupa 2 bytes y longitud de hasta 5 numeros */
    mobile_number VARCHAR(10), /* número telefonico */
    rol_id INT DEFAULT 1, /* RolModel del usuario  */
    active BIT DEFAULT 1, /* 0 = NO | 1 = SI */
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, /* Fecha del usuario actualizado */
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, /* Fecha del usuario creado */
    PRIMARY KEY(user_id),
    FOREIGN KEY(rol_id) REFERENCES RolModel(rol_id),
);

INSERT INTO Users
    (first_name, last_name, email, encrypted_password,
     country_code, mobile_number, rol_id)
     VALUES ('Jose Praxedes', 'Dominguez Acosta', 'ostion@mail.com', 'AES', 52, 5565748376, 1);
INSERT INTO Users
(first_name, last_name, email, encrypted_password,
 country_code, mobile_number, rol_id)
VALUES ('Rogelio', 'Portillo Lopez', 'roge@mail.com', 'AES', 52, 5565748377, 1);
INSERT INTO Users
(first_name, last_name, email, encrypted_password,
 country_code, mobile_number, rol_id)
VALUES ('Jose', 'Ortiz Pelaez', 'pepe@mail.com', 'AES', 52, 5565748378, 1);
INSERT INTO Users
(first_name, last_name, email, encrypted_password,
 country_code, mobile_number, rol_id)
VALUES ('Admin', '', 'admin@mail.com', 'AES', 52, 5565748378, 3);

SELECT * FROM Users;

/* Obtener usuarios con el rol administrador */
SELECT *
FROM Users
INNER JOIN RolModel on Users.rol_id = RolModel.rol_id
WHERE RolModel.name = 'administrator';

CREATE TABLE Addresses(
    address_id int NOT NULL IDENTITY(1,1),
    fullname VARCHAR(300) NOT NULL, /* Nombre de quien recibe */
    postal_code int NOT NULL, /* Código postal de el domicilio */
    state VARCHAR(255) NOT NULL, /* Estado del país */
    city_hall VARCHAR(255) NOT NULL, /* Alcaldía */
    colony VARCHAR(255) NOT NULL, /* Colonia */
    street TEXT NOT NULL, /* Calle */
    number SMALLINT, /* Número de casa */
    inner_number SMALLINT, /* Número de interior */
    street1 TEXT, /* Entre calle 1 */
    street2 TEXT, /* Entre calle 2 */
    is_office BIT NOT NULL, /* 1 = Trabajo | 0 = Casa */
    mobile_number VARCHAR(10) NOT NULL,
    additional_info TEXT,
    PRIMARY KEY(address_id),
);


INSERT INTO Addresses
(fullname, postal_code, state, city_hall, colony,
 street, number, inner_number, street1, street2,
 is_office, mobile_number, additional_info)
 VALUES('Rodolfo Ruiz Parra', 01290, 'Ciudad de México', 'Álvaro Obregón', 'Presidentes',
        'Adolfo de la Huerta', 30, 1, 'Adolfo Ruiz Cortines', 'Adolfo Lopez Mateos', 0, 5564494464, 'Edificio verde');

INSERT INTO Addresses
(fullname, postal_code, state, city_hall, colony,
 street, number, inner_number, street1, street2,
 is_office, mobile_number, additional_info)
VALUES('Alberto Garza Lopez', 01290, 'Ciudad de México', 'Álvaro Obregón', 'Presidentes',
       'Adolfo de la Huerta', 30, 1, 'Adolfo Ruiz Cortines', 'Adolfo Lopez Mateos', 0, 5564494464, 'Edificio verde');

INSERT INTO Addresses
(fullname, postal_code, state, city_hall, colony,
 street, number, inner_number, street1, street2,
 is_office, mobile_number, additional_info)
VALUES('Rodrigo Gomez Gutierrez', 01290, 'Ciudad de México', 'Álvaro Obregón', 'Presidentes',
       'Adolfo de la Huerta', 30, 1, 'Adolfo Ruiz Cortines', 'Adolfo Lopez Mateos', 0, 5564494464, 'Edificio verde');

INSERT INTO Addresses
(fullname, postal_code, state, city_hall, colony,
 street, number, inner_number, street1, street2,
 is_office, mobile_number, additional_info)
VALUES('Emmanuel Lopez Gatel', 01290, 'Ciudad de México', 'Álvaro Obregón', 'Presidentes',
       'Adolfo de la Huerta', 30, 1, 'Adolfo Ruiz Cortines', 'Adolfo Lopez Mateos', 0, 5564494464, 'Edificio verde');

INSERT INTO Addresses
(fullname, postal_code, state, city_hall, colony,
 street, number, inner_number, street1, street2,
 is_office, mobile_number, additional_info)
VALUES('Diego Hoyos Ramirez', 01290, 'Ciudad de México', 'Álvaro Obregón', 'Presidentes',
       'Adolfo de la Huerta', 30, 1, 'Adolfo Ruiz Cortines', 'Adolfo Lopez Mateos', 0, 5564494464, 'Edificio verde');

INSERT INTO Addresses
(fullname, postal_code, state, city_hall, colony,
 street, number, inner_number, street1, street2,
 is_office, mobile_number, additional_info)
VALUES('Raul Torres Ramirez', 01290, 'Ciudad de México', 'Álvaro Obregón', 'Presidentes',
       'Adolfo de la Huerta', 30, 1, 'Adolfo Ruiz Cortines', 'Adolfo Lopez Mateos', 0, 5564494464, 'Edificio verde');

/* Obtiene el ID del último registro hecho */
SELECT SCOPE_IDENTITY() AS id;

SELECT * FROM Addresses;

CREATE TABLE AddressUsers(
    address_id INT NOT NULL,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    FOREIGN KEY(address_id) REFERENCES Addresses(address_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
);

/* El cliente con el ID 4 le registramos 2 domicilios y el cliente con el ID 3 solo 1 domicilio. */
INSERT INTO AddressUsers(address_id, user_id) VALUES (1,4);
INSERT INTO AddressUsers(address_id, user_id) VALUES (2,4);
INSERT INTO AddressUsers(address_id, user_id) VALUES (2,3);
INSERT INTO AddressUsers(address_id, user_id) VALUES (4,2);
INSERT INTO AddressUsers(address_id, user_id) VALUES (5,1);

SELECT * FROM AddressUsers;

/* Consulta para obtener los domicilios de un cliente por su ID */
SELECT * FROM AddressUsers
INNER JOIN Addresses ON AddressUsers.address_id = Addresses.address_id
WHERE AddressUsers.user_id = 4;


CREATE TABLE Categories(
    id_category INT NOT NULL IDENTITY(1,1),
    name_category VARCHAR(255) NOT NULL,
    users_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_category),
    FOREIGN KEY (users_id) REFERENCES Users(user_id)
);

INSERT INTO Categories
(name_category, users_id, active)
VALUES('Bebés', 4, 1);

select * from Categories;



CREATE TABLE Products(
    id_product INT NOT NULL IDENTITY(1,1),
    title VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    unit_price MONEY NOT NULL,
    condition VARCHAR(10) NOT NULL,
    quantity_stock INT NOT NULL,
    category_id INT NOT NULL,
    users_id INT NOT NULL,
    active TINYINT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_product),
    FOREIGN KEY (category_id) REFERENCES Categories(id_category),
    FOREIGN KEY (users_id) REFERENCES Users(user_id)
);


INSERT INTO Products
(title, thumbnail, unit_price, condition, quantity_stock, category_id, users_id, active)
VALUES('Llanta', 'http://imgur.com/', 500, 'nuevo', 200, 1, 4, 1);

select * from Products;

CREATE TABLE Purchases(
    id_purchase INT NOT NULL IDENTITY(1,1),
    users_id INT NOT NULL,
    items TEXT NOT NULL,
    total MONEY NOT NULL,
    status_purchase TINYINT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_purchase),
    FOREIGN KEY (users_id) REFERENCES Users(user_id)
);

INSERT INTO Purchases
(users_id, items, total, status_purchase)
VALUES(4, '2 llantas', 200, 1);

select * from Purchases;


CREATE TABLE InventoryTracking(
    id_action INT NOT NULL IDENTITY(1,1),
    type_action VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    product_id INT NOT NULL,
    users_id INT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_action),
    FOREIGN KEY (product_id) REFERENCES Products(id_product),
    FOREIGN KEY (users_id) REFERENCES Users(user_id)
);

INSERT INTO InventoryTracking
    (type_action, quantity, product_id, users_id)
    VALUES('compra', 10, 1, 4);

SELECT * FROM InventoryTracking;

