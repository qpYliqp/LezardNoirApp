-- Table Author
CREATE TABLE IF NOT EXISTS author (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

-- Table Book
CREATE TABLE IF NOT EXISTS book (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    price NUMERIC(10,2),
    pages INT,
    isbn VARCHAR(255),
    nuart VARCHAR(255),
    note TEXT,
    summary TEXT,
    hook TEXT,
    marketing TEXT
    );

-- Table de jointure ManyToMany book_author
CREATE TABLE IF NOT EXISTS book_author (
   book_id BIGINT NOT NULL,
   author_id BIGINT NOT NULL,
   PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES author(id) ON DELETE CASCADE
    );

-- Insert un auteur par défaut
INSERT INTO author (name) VALUES ('Jean Dupont')
    ON CONFLICT DO NOTHING;

-- Insert un livre par défaut
INSERT INTO book (title, price, pages, isbn, nuart, note, summary, hook, marketing)
VALUES (
           'Mon Premier Livre', 19.90, 200, '123-4567890123', 'Roman', 'Note exemple',
           'Résumé exemple', 'Accroche exemple', 'Marketing exemple'
       )
    ON CONFLICT DO NOTHING;

-- Lier le livre et l'auteur
INSERT INTO book_author (book_id, author_id)
VALUES (
           (SELECT id FROM book WHERE title='Mon Premier Livre'),
           (SELECT id FROM author WHERE name='Jean Dupont')
       )
    ON CONFLICT DO NOTHING;
