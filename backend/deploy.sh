 docker build -t back -f ./backend/Dockerfile .

 docker compose -f ./backend/docker-compose.yml up -d --remove-orphans