FROM postgres:12
COPY sql/ /docker-entrypoint-initdb.d

#RUN mkdir /scripts
#COPY scripts /scripts
#RUN chmod -R 755 /scripts

RUN mkdir /conf
COPY conf/postgresql.conf /conf
RUN chown -R postgres:postgres /conf

RUN mkdir /logs
RUN chown -R postgres:postgres /logs

CMD ["postgres", "-c", "config_file=/conf/postgresql.conf"]
