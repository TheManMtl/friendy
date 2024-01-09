 docker build -t backend -f ./backend/Dockerfile .

 docker compose -f ./backend/docker-compose.yml up -d --remove-orphans