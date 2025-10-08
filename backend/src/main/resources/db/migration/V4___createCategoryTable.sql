CREATE TABLE IF NOT EXISTS category (
        id BIGSERIAL PRIMARY KEY,
        category VARCHAR(255) NOT NULL);

ALTER TABLE book
    ADD COLUMN category_id BIGINT;

INSERT INTO category (category) VALUES
    ('Architecture'),
    ('Jeunesse'),
    ('Manga');