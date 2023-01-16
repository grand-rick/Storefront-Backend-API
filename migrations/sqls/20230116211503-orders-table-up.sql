CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    product_quantity bigint,
    product_id integer REFERENCES products(id),
    user_id integer REFERENCES users(id)
);