-- Table Status
CREATE TABLE IF NOT EXISTS status
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
INSERT INTO status (name)
VALUES ('A faire'),
       ('En cours'),
       ('Terminé'),
       ('En retard')
ON CONFLICT DO NOTHING;

ALTER TABLE book
    ADD COLUMN status_id BIGINT,
    ALTER COLUMN status_id SET DEFAULT 1,
    ADD CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES status (id);
