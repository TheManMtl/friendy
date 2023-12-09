 docker build -t front -f ./frontend/Dockerfile .

 docker compose up -f ./frontend/docker-compose.yml -d --remove-orphans