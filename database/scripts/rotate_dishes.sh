#!/bin/bash
# Get a random dish to place first in queue
id=$(psql -qt -U $POSTGRES_USER -c "SELECT id FROM recipes WHERE queue_pos > 9 ORDER BY RANDOM() LIMIT 1;")
# Increse all queue_pos by one
psql -q -U $POSTGRES_USER -c "UPDATE recipes SET queue_pos = queue_pos + 1;"
# Set the randomly chosen dish first in queue
psql -q -U $POSTGRES_USER -c "UPDATE recipes SET queue_pos = 0 WHERE id = $id;"
