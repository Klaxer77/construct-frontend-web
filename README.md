# Frontend Web Construct (Система управления строительством)

<img src="https://construct-prod.hb.ru-msk.vkcloud-storage.ru/construct.png" width="200">

# Скачиваем docker с официального сайта для своей операционной системы:
```commandline
https://www.docker.com/products/docker-desktop
```

# Стягиваем к себе репозиторий:
```commandline
git clone https://github.com/Klaxer77/construct-frontend-web.git
```

# Используем docker:
Собрать образ и запустить контейнеры:
```commandline
docker-compose -f docker-compose.dev.yml up --build -d
```

# Поосле запуска frontend будет доступен по адресу:
```commandline
http://localhost:3000/login
```

# Нужные env уже занесены