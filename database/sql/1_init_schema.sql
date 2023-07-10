CREATE TABLE recipes (
    id                  serial PRIMARY KEY,
    created_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name                varchar(64) NOT NULL UNIQUE,
    image               varchar(300) NOT NULL DEFAULT 'no_image_added.jpg',
    queue_pos           int NOT NULL DEFAULT 99,
    description_type    varchar(16) NOT NULL DEFAULT 'internal',
    description         varchar(1024)
    url                 varchar(300),
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
