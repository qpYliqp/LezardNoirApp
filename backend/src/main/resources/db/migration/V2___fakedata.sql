INSERT INTO book (title, price, pages, isbn, nuart, note, summary, hook, marketing) VALUES
    ('Hirayusumi Tome 1', 13.0, 192, '978-2-35348-278-8', 'xxx xxx x', 'note', 'Un manga à travers lequel on découvre un Japon différent de celui souvent véhiculé…', NULL, NULL),
    ('Hirayusumi Tome 2', 13.0, 192, '978-2-35348-279-5', 'xxx xxx x', 'note', 'Un manga à travers lequel on découvre un Japon différent de celui souvent véhiculé…', NULL, NULL),
    ('Hirayusumi Tome 3', 13.0, 176, '978-2-35348-333-4', 'xxx xxx x', 'note', 'Un manga à travers lequel on découvre un Japon différent de celui souvent véhiculé…', NULL, NULL),
    ('Hirayusumi Tome 4', 13.0, 160, '978-2-35348-352-5', 'xxx xxx x', 'note', 'Un manga à travers lequel on découvre un Japon différent de celui souvent véhiculé…', NULL, NULL),
    ('Mauvaise Herbe Tome 1', 13.0, 204, '978-2-35348-164-4', 'xxx xxx x', 'note', 'À travers ce drame abordant de nombreuses questions contemporaines…', NULL, NULL),
    ('Mauvaise Herbe Tome 2', 13.0, 186, '978-2-35348-187-3', 'xxx xxx x', 'note', 'À travers ce drame abordant de nombreuses questions contemporaines…', NULL, NULL),
    ('Mauvaise Herbe Tome 3', 13.0, 186, '978-2-35348-194-1', 'xxx xxx x', 'note', 'À travers ce drame abordant de nombreuses questions contemporaines…', NULL, NULL),
    ('Mauvaise Herbe Tome 4', 13.0, 192, '978-2-35348-215-3', 'xxx xxx x', 'note', 'À travers ce drame abordant de nombreuses questions contemporaines…', NULL, NULL),
    ('Le Monde selon Setchan', 13.0, 180, '978-2-35348-179-8', 'xxx xxx x', 'note', 'Un portrait désabusé de la jeunesse tokyoïte…', NULL, NULL),
    ('Le Dragon sous le croissant de Lune', 8.5, 224, '978-2-35348-369-3', 'xxx xxx x', 'note', 'Une certaine vision du monde de sport…', NULL, NULL),
    ('Pack intégrale « Chii­sakobé »', 60.0, 896, '978-2-35348-342-6', 'xxx xxx x', 'note', 'Adaptation du célèbre roman de Shûgorô Yamamoto…', NULL, NULL),
    ('Dans la prison', 18.0, 192, '978-2-35348-205-4', 'xxx xxx x', 'note', 'Cet ouvrage constitue un remarquable témoignage…', NULL, NULL),
    ('Hirayusumi Tome 5', 13.0, 176, '978-2-35348-357-0', 'xxx xxx x', 'note', 'Un manga à travers lequel on découvre un Japon différent de celui souvent véhiculé…', NULL, NULL),
    ('Hirayusumi Tome 6', 13.0, 158, '978-2-35348-366-2', 'xxx xxx x', 'note', 'Un manga à travers lequel on découvre un Japon différent de celui souvent véhiculé…', NULL, NULL),
    ('Hoshi dans le jardin des filles Vol.1', 12.0, 176, '978-2-35348-280-1', 'xxx xxx x', 'note', 'Hoshi est le professeur principal d’une classe de deuxième année…', NULL, NULL),
    ('Hoshi dans le jardin des filles Vol.2', 12.0, 168, '978-2-35348-281-8', 'xxx xxx x', 'note', 'Hoshi est le professeur principal d’une classe de deuxième année…', NULL, NULL),
    ('Hoshi dans le jardin des filles Vol.3', 12.0, 184, '978-2-35348-334-1', 'xxx xxx x', 'note', 'Hoshi est le professeur principal d’une classe de deuxième année…', NULL, NULL);

INSERT into author(name) VALUES
    ('Keigo Shinzo'),
    ('Tomoko OSHIMA'),
    ('Kenichirô Nagao'),
    ('Kazuichi HANAWA'),
    ('Yama WAYAMA');


INSERT INTO book_author (book_id, author_id)
VALUES
    ((SELECT id FROM book WHERE id=1),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=2),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=3),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=4),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=5),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=6),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=7),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=8),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=9),(SELECT id FROM author WHERE id=2)),
    ((SELECT id FROM book WHERE id=10),(SELECT id FROM author WHERE id=3)),
    ((SELECT id FROM book WHERE id=11),(SELECT id FROM author WHERE id=4)),
    ((SELECT id FROM book WHERE id=12),(SELECT id FROM author WHERE id=4)),
    ((SELECT id FROM book WHERE id=13),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=14),(SELECT id FROM author WHERE id=1)),
    ((SELECT id FROM book WHERE id=15),(SELECT id FROM author WHERE id=5)),
    ((SELECT id FROM book WHERE id=16),(SELECT id FROM author WHERE id=5)),
    ((SELECT id FROM book WHERE id=17),(SELECT id FROM author WHERE id=5));


