 docker build -t front -f ./frontend/Dockerfile .

 docker compose -f ./frontend/docker-compose.yml up -d --remove-orphans