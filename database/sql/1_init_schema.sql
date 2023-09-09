CREATE TABLE recipes (
    id                  serial PRIMARY KEY,
    created_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name                varchar(64) NOT NULL UNIQUE,
    image               varchar(300) DEFAULT NULL,
    queue_pos           int NOT NULL DEFAULT 99,
    type    varchar(16) NOT NULL DEFAULT 'Internal',
    description         text,
    url                 varchar(300)
);


CREATE TABLE ingredients (
    id                  serial PRIMARY KEY,
    created_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name                varchar(64) NOT NULL UNIQUE
);


CREATE TABLE association_table(
    created_at              timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    recipe_id               int NOT NULL REFERENCES recipes(id),
    ingredient_id           int NOT NULL REFERENCES ingredients(id),
    quantity                real NOT NULL,
    unit                    varchar(16) NOT NULL,
    CONSTRAINT unique_recipe_ingredient_id UNIQUE(recipe_id, ingredient_id)
);

CREATE TABLE users (
    id                  serial PRIMARY KEY,
    created_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    username            varchar(64) NOT NULL UNIQUE,
    password_hash       CHAR(60)
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
       NEW.updated_at = now(); 
       RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_recipes_timestamp BEFORE UPDATE
ON recipes FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_ingredients_timestamp BEFORE UPDATE
ON ingredients FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_association_table_timestamp BEFORE UPDATE
ON association_table FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_users_timestamp BEFORE UPDATE
ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at();