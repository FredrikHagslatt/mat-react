-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: freppan

INSERT INTO public.ingredients (name) VALUES ('Bacon');
INSERT INTO public.ingredients (name) VALUES ('Champinjoner');
INSERT INTO public.ingredients (name) VALUES ('Gullök');
INSERT INTO public.ingredients (name) VALUES ('Paprikor med skjysst färg');
INSERT INTO public.ingredients (name) VALUES ('Creme fraiche (vitlök & parmesan)');
INSERT INTO public.ingredients (name) VALUES ('Creme fraiche (paprika & chili)');
INSERT INTO public.ingredients (name) VALUES ('Creme fraiche');
INSERT INTO public.ingredients (name) VALUES ('Pasta');
INSERT INTO public.ingredients (name) VALUES ('Tortellinis');
INSERT INTO public.ingredients (name) VALUES ('Philadelphia');
INSERT INTO public.ingredients (name) VALUES ('Röd pesto');
INSERT INTO public.ingredients (name) VALUES ('Soltorkade tomater');
INSERT INTO public.ingredients (name) VALUES ('Fläskfilé');
INSERT INTO public.ingredients (name) VALUES ('Vitlök');
INSERT INTO public.ingredients (name) VALUES ('Kvibille ädelost');
INSERT INTO public.ingredients (name) VALUES ('Tomatpuré');
INSERT INTO public.ingredients (name) VALUES ('Köttbuljong');
INSERT INTO public.ingredients (name) VALUES ('Kalvfond');
INSERT INTO public.ingredients (name) VALUES ('Paprika');
INSERT INTO public.ingredients (name) VALUES ('Grädde');
INSERT INTO public.ingredients (name) VALUES ('Vatten');
INSERT INTO public.ingredients (name) VALUES ('Rediga kycklingbröst');
INSERT INTO public.ingredients (name) VALUES ('mjöl');
INSERT INTO public.ingredients (name) VALUES ('smör');
INSERT INTO public.ingredients (name) VALUES ('champinjoner');
INSERT INTO public.ingredients (name) VALUES ('vitlök');
INSERT INTO public.ingredients (name) VALUES ('Kycklingbuljongtärning');
INSERT INTO public.ingredients (name) VALUES ('Citronjuice');
INSERT INTO public.ingredients (name) VALUES ('Dijonsenap');

-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: freppan


INSERT INTO public.recipes (id, name, url, image, queue_pos, description_type) VALUES (31, 'Biff Stroganoff', 'https://www.ica.se/recept/biff-stroganoff-713113/', 'biff_stroganoff.jpg', 14, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (29, 'Paneer masala', 'https://www.arla.se/recept/paneer-masala/', 39, 'external');
INSERT INTO public.recipes (id, name, queue_pos) VALUES (19, 'Pestopasta', 20);
INSERT INTO public.recipes (id, name, queue_pos) VALUES (33, 'Köttbullar med mos', 19);
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (34, 'Potatis- och purjulöksoppa', 'https://www.ica.se/recept/kramig-potatis-och-purjolokssoppa-716077/?fbclid=IwAR1iAeq9i_hTThumFcRYaDEQAlabl7McopIaJaC6qy3b-3BQGSTe8k0Jl1s', 8, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (38, 'Abbalax', 'https://www.abba.se/products/citronsas/', 24, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (22, 'Tomatsoppa', 'https://www.koket.se/anders_leven/soppor_och_grytor/gronsaker/tomatsoppa_med_basilikatoast/?fbclid=IwAR2pWyTsjepaonxuk0UIfIugu5YBtX-dN2BA7gYeTw1yLnZyFQ7b7hWcFsI', 64, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (17, 'Kräftstjärtspasta', 'https://www.arla.se/recept/morotspasta-med-kraftor/', 51, 'external');
INSERT INTO public.recipes (id, name, queue_pos, description_type) VALUES (23, 'Tacopaj', 49, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (27, 'Enchiladas', 'https://www.santamariaworld.com/se/recept/enchiladas-med-kyckling/?fbclid=IwAR0xpPIemDLKOkArF5kHfIfT5aZYP53OgWB_UaAM5FPPBCljmAQ2gAsoYTA', 35, 'external');
INSERT INTO public.recipes (id, name, queue_pos, description_type) VALUES (39, 'Fiskpinnar med stuvad spenat', 16, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (20, 'Krämig kycklinggryta med bacon och soltorkade tomater', 'https://www.tasteline.com/recept/kramig-kycklinggryta-med-kycklingbacon-och-soltorkade-tomater/', 13, 'external');
INSERT INTO public.recipes (id, name, queue_pos, description_type) VALUES (21, 'Thaisoppa', 11, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (28, 'Asiatisk kokosgryta med lax', 'https://www.tasteline.com/recept/asiatisk-kokosgryta-med-lax/', 7, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (13, 'Busenkel korvröra', 'http://matochmera.se/recepie.php?recepie_id=31348', 104, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (12, 'Fredrik hittar på något nytt', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 98, 'external');
INSERT INTO public.recipes (id, name, url, image, queue_pos, description_type) VALUES (46, 'Flygande Jacob', 'https://www.ica.se/recept/flygande-jacob-717569/', 'flygande_jacob.jpg', 58, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (37, 'Laxsida i ugn', 'https://zeinaskitchen.se/hel-laxsida-i-ugn/', 34, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (45, 'Krämig svampkyckling', 'https://www.saltandlavender.com/creamy-mushroom-chicken/?fbclid=IwAR3o6VgU57vmQDUYdbrNOk-cYlYy0gNp_9mHPJCEdgKQwWdKPTwoiP4WmSo', 31, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (11, 'Karin hittar på något nytt', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 28, 'external');
INSERT INTO public.recipes (id, name, url, image, queue_pos, description_type) VALUES (32, 'Vegetarisk lasagne', 'https://www.tasteline.com/recept/vegetarisk-lasagne-med-spenat-och-keso/', 'veg_lasagne.jpg', 2, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (24, 'Köttgryta', 'https://www.arla.se/recept/bygardens-kottgryta/?fbclid=IwAR3GeiH6b96FLRpUs8prXps7C7y2Za0BotG4rieKPqOtSbXagAW41WN_7N4', 10, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (26, 'Halloumipasta', 'https://www.ica.se/recept/kramig-pasta-med-halloumi-och-tomat-719023/?fbclid=IwAR1xArtwvt6rCF9gp3FWrgJiwSsQiEPIx_fEH2Ccvt2sqVCCO1erqeJcxT0', 6, 'external');
INSERT INTO public.recipes (id, name, url, image, queue_pos, description_type) VALUES (14, 'Korv Stroganoff med ris', 'https://www.ica.se/recept/korvstroganoff-med-ris-533512/', 'korv_stroganoff.jpg', 1, 'external');
INSERT INTO public.recipes (id, name, url, image, queue_pos, description_type) VALUES (36, 'Gulasch', 'https://www.tasteline.com/recept/gulaschsoppa-2/', 'gulasch.jpg', 4, 'external');
INSERT INTO public.recipes (id, name, url, queue_pos, description_type) VALUES (41, 'Köttfärssoppa', 'https://www.ica.se/recept/kottfarssoppa-587342/?fbclid=IwAR1qP4O4PhFaAYfJVEMTSIcj_iPnzrI5U1w39XHlA3bP0UmynbuaGhRKLYY', 3, 'external');
INSERT INTO public.recipes (id, name, url, image, queue_pos, description_type) VALUES (35, 'Falukorv i ugn', 'https://www.koket.se/morberg-lagar-husmanskost/per-morberg/falukorv-i-ugn-a-la-per-morberg/', 'falukorv_i_ugn.jpg', 0, 'external');
INSERT INTO public.recipes (name, url, image, description_type) VALUES ('Club sandwichtårta', 'https://www.ica.se/recept/smorgastarta-a-la-club-sandwich-714805/', 'club_sandwich_cake.jpg', 'external');

INSERT INTO public.recipes (id, name, queue_pos, description) VALUES (15, 'Ädelostgryta med fläsk', 9, 'Skär fläskfilén i bitar och bryn i en stekpanna eller gryta.
Tillsätt allt utan paprika, låt koka ca 10 min.
Smaka av med salt och peppar, tillsätt paprika och låt koka 5 min till.
Servera med ris (gärna kokt).');

INSERT INTO public.recipes (id, name, queue_pos, description) VALUES (43, 'Tortellinis med röd pestosås', 44, 'Koka tortellinis.
Dela tomaterna i lagom bitar.
Hiva i allt utan tortellinisarna i en kastrull, blanda och värm.
Smaka av med salt och peppar, servera tortellinis och sås separat eller blandad.

Hiva i stekt haloumi i mixen om du känner dig lite extra spexig.
Det passar även bra med kokt broccoli som tillbehör.');

INSERT INTO public.recipes (id, name, queue_pos, description) VALUES (16, 'Bacon- och grönsaksgryta', 47, 'Stek bacon, champinjoner och lök.
Tillsätt all creme fraiche och låt sjuda i ca 10 min.
Hiva i paprikan och låt sjuda ca 5 min till.
Servera med pasta.');


-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: freppan

INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 1, 3, 'pkt');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 2, 1, 'gäng');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 3, 1, 'st');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 4, 2, 'st');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 5, 2, 'pkt');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 6, 2, 'pkt');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 7, 1, 'klick');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (16, 8, 1, 'pkt');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (43, 9, 1, 'pkt');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (43, 7, 2, 'dl');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (43, 10, 200, 'g');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (43, 11, 100, 'g');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (43, 12, 1, 'gäng');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 13, 1, 'st');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 14, 1, 'klyfta');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 15, 70, 'g');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 16, 2, 'msk');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 17, 1, 'tärning');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 18, 1, 'msk');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 19, 1, 'st');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 7, 3, 'dl');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 20, 1, 'skvätt');
INSERT INTO public.association_table (recipe_id, ingredient_id, quantity, unit) VALUES (15, 21, 2, 'dl');

