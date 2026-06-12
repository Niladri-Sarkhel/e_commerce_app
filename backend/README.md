how to run the docker nodejs shell : 
docker compose run --rm --service-ports api_server sh
docker compose exec -it api_server sh

sudo chown -R $USER:$USER .
