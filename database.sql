CREATE TABLE client (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  id_card_number INT UNSIGNED,
  address VARCHAR(100),
  phone VARCHAR(50),
  status Tinyint(1) DEFAULT 1
) ENGINE = InnoDB;

CREATE TABLE product (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100),
  unit_value DECIMAL(20,2),
  unit_code VARCHAR(50),
  stock INT UNSIGNED DEFAULT 0,
  apply_igv Tinyint(1) DEFAULT 1,
  status Tinyint(1) DEFAULT 1
) ENGINE = InnoDB; 

CREATE TABLE invoice_draft_correlative (
  counter INT UNSIGNED DEFAULT 0
) ENGINE = InnoDB;


CREATE TABLE invoicing_header (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  invoicing_id VARCHAR(20) UNIQUE NOT NULL,
  issue_date Datetime,
  due_date Datetime,
  currency ENUM('SOLES','DÓLARES') NOT NULL,
  payment_condition ENUM('CONTADO','CRÉDITO') NOT NULL,
  total DECIMAL(20,2),
  status Tinyint(1) DEFAULT 1,
  client_id INT UNSIGNED,
  CONSTRAINT `fk_client_invoicing_header`
    FOREIGN KEY (client_id) REFERENCES client (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE invoicing_detail (
  invoicing_id VARCHAR(20) NOT NULL,
  quantity INT UNSIGNED, 
  discount DECIMAL(20,2),
  product_description VARCHAR(100),
  product_unit_value DECIMAL(20,2),
  product_unit_code VARCHAR(50),
  product_apply_igv Tinyint(1) DEFAULT 1,
  status Tinyint(1) DEFAULT 1,
  CONSTRAINT `fk_invoicing_detail_header`
    FOREIGN KEY (invoicing_id) REFERENCES invoicing_header (invoicing_id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE = InnoDB;
