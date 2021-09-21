Init commit

Login to database:

1. See container name with "docker-compose ps" when located in the working directory.

2. See postgres username in .env

3. Start shell in container using "docker exec -it containername /bin/bash"

4. run "psql -U username" to login to database.

If you only added tables and dont need to modify anything manually,
you can run after step 3:
psql -U username -f /docker-entrypoint-initdb.d/1_init_schema.sql
psql -U username -f /docker-entrypoint-initdb.d/2_sample_info.sql