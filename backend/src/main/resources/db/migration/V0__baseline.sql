-- Table Author
CREATE TABLE IF NOT EXISTS author
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table Book
CREATE TABLE IF NOT EXISTS book
(
    id             BIGSERIAL PRIMARY KEY,
    title          VARCHAR(255),
    price          NUMERIC(10, 2),
    pages          INT,
    isbn           VARCHAR(255),
    nuart          VARCHAR(255),
    note           TEXT,
    summary        TEXT,
    hook           TEXT,
    marketing      TEXT,
    cover_filename VARCHAR(245),
    release_date   DATE
);

-- Table de jointure ManyToMany book_author
CREATE TABLE IF NOT EXISTS book_author
(
    book_id   BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE,
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES author (id) ON DELETE CASCADE
);




