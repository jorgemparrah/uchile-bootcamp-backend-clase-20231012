CREATE DATABASE EJEMPLO_PEDIDOS;

USE EJEMPLO_PEDIDOS;

CREATE TABLE `PROVEEDORES` (
  `rut` VARCHAR(100) PRIMARY KEY,
  `nombre` VARCHAR(100),
  `direccion` VARCHAR(100)
);

CREATE TABLE `PRODUCTOS_POR_PROVEEDOR` (
  `rutProveedor` VARCHAR(100),
  `codigoProducto` INTEGER,
  PRIMARY KEY (`rutProveedor`, `codigoProducto`)
);

CREATE TABLE `PRODUCTOS` (
  `codigo` INTEGER PRIMARY KEY,
  `nombre` VARCHAR(100),
  `precio` INTEGER,
  `nombreCategoria` VARCHAR(100)
);

CREATE TABLE `PRODUCTOS_POR_PEDIDO` (
  `codigoProducto` INTEGER,
  `numeroPedido` INTEGER,
  `cantidad` INTEGER,
  PRIMARY KEY (`codigoProducto`, `numeroPedido`)
);

CREATE TABLE `PEDIDOS` (
  `numero` INTEGER PRIMARY KEY,
  `fecha` DATETIME,
  `rutCliente` VARCHAR(100)
);

CREATE TABLE `CLIENTES` (
  `rut` VARCHAR(100) PRIMARY KEY,
  `nombre` VARCHAR(100),
  `direccion` VARCHAR(100),
  `frecuente` boolean
);

CREATE TABLE `CATEGORIAS` (
  `nombre` VARCHAR(100) PRIMARY KEY,
  `idDescuento` INTEGER
);

CREATE TABLE `DESCUENTOS` (
  `id` INTEGER PRIMARY KEY,
  `porcentaje` INTEGER
);

CREATE TABLE `TELEFONOS_CLIENTES` (
  `id` INTEGER PRIMARY KEY,
  `numero` VARCHAR(100),
  `rutCliente` VARCHAR(100)
);

CREATE TABLE `TELEFONOS_PROVEEDORES` (
  `id` INTEGER PRIMARY KEY,
  `numero` VARCHAR(100),
  `rutProveedor` VARCHAR(100)
);

ALTER TABLE `PRODUCTOS_POR_PROVEEDOR` ADD FOREIGN KEY (`rutProveedor`) REFERENCES `PROVEEDORES` (`rut`);

ALTER TABLE `PRODUCTOS_POR_PROVEEDOR` ADD FOREIGN KEY (`codigoProducto`) REFERENCES `PRODUCTOS` (`codigo`);

ALTER TABLE `PRODUCTOS` ADD FOREIGN KEY (`nombreCategoria`) REFERENCES `CATEGORIAS` (`nombre`);

ALTER TABLE `PRODUCTOS_POR_PEDIDO` ADD FOREIGN KEY (`codigoProducto`) REFERENCES `PRODUCTOS` (`codigo`);

ALTER TABLE `PRODUCTOS_POR_PEDIDO` ADD FOREIGN KEY (`numeroPedido`) REFERENCES `PEDIDOS` (`numero`);

ALTER TABLE `PEDIDOS` ADD FOREIGN KEY (`rutCliente`) REFERENCES `CLIENTES` (`rut`);

ALTER TABLE `CATEGORIAS` ADD FOREIGN KEY (`idDescuento`) REFERENCES `DESCUENTOS` (`id`);

ALTER TABLE `TELEFONOS_CLIENTES` ADD FOREIGN KEY (`rutCliente`) REFERENCES `CLIENTES` (`rut`);

ALTER TABLE `TELEFONOS_PROVEEDORES` ADD FOREIGN KEY (`rutProveedor`) REFERENCES `PROVEEDORES` (`rut`);
