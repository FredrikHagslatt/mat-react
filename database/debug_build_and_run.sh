sudo docker stop matdatabase
sudo docker rm matdatabase
sudo docker build -t mat/database .
sudo docker run -it --name matdatabase --env-file ../.env mat/database
