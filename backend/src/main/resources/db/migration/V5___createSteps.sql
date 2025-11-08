CREATE TABLE IF NOT EXISTS production_step
(
    id BIGSERIAL PRIMARY KEY,
    name varchar(240)

);

INSERT INTO production_step (name) VALUES
   ('COUVERTURE'),('MARKETING'), ('TRADUCTION');

CREATE TABLE IF NOT EXISTS book_step
(
    id BIGSERIAL PRIMARY KEY,
    end_date Date,
    book_id BIGINT NOT NULL REFERENCES book(id) ON DELETE CASCADE,
    step_id BIGINT NOT NULL REFERENCES production_step(id),
    status_id BIGINT NOT NULL REFERENCES status(id),

    CONSTRAINT uk_book_step UNIQUE (book_id, step_id)
);

CREATE INDEX IF NOT EXISTS idx_book_step_book ON book_step(book_id);
CREATE INDEX IF NOT EXISTS idx_book_step_step ON book_step(step_id);
CREATE INDEX IF NOT EXISTS idx_book_step_status ON book_step(status_id);

INSERT INTO book_step (book_id, step_id, status_id, end_date)
SELECT
    b.id                           AS book_id,
    ps.id                          AS step_id,
    1                              AS status_id,
    DATE '2025-11-01' + (TRUNC(random() * 92))::int     AS end_date
FROM book b CROSS JOIN production_step ps
LEFT JOIN book_step bs ON book_id = b.id AND step_id = ps.id
WHERE bs.id is NULL
ON CONFLICT (book_id, step_id) DO NOTHING;
