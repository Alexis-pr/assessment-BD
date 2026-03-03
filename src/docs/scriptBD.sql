


CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "customer_name" varchar,
  "customer_phone" varchar,
  "customer_email" varchar,
  "customer_address" varchar,
  "created_at" timestamp
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "id_product" int,
  "id_transaction" int,
  "created_at" timestamp
);

CREATE TABLE "product" (
  "id_product" SERIAL PRIMARY KEY,
  "id_category" int,
  "id_supplier" int,
  "product_name" varchar,
  "unit_price" numeric,
  "quantity" int,
  "total_line_value" int,
  "created_at" timestamp
);

CREATE TABLE "supplier" (
  "id" SERIAL PRIMARY KEY,
  "supplier_name" varchar,
  "supplier_email" varchar,
  "created_at" timestamp
);

CREATE TABLE "transactions" (
  "id_transaction" SERIAL PRIMARY KEY,
  "date" date
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "product_category" varchar,
  "created_at" timestamp
);

ALTER TABLE "orders" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id") DEFERRABLE INITIALLY immediate   ;

ALTER TABLE "orders" ADD FOREIGN KEY ("id_product") REFERENCES "product" ("id_product") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "orders" ADD FOREIGN KEY ("id_transaction") REFERENCES "transactions" ("id_transaction") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "product" ADD FOREIGN KEY ("id_category") REFERENCES "categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "product" ADD FOREIGN KEY ("id_supplier") REFERENCES "supplier" ("id") DEFERRABLE INITIALLY IMMEDIATE;

select * from customers limit 10;

