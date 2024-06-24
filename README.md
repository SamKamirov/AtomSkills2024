# Ссылки на документы

<<<<<<< HEAD
## 1. Подготовка

### Установка Nginx
Установите пакет `nginx`

```
sudo apt update
sudo apt install nginx
```

Проверьте работу nginx используя команду

```
systemctl status nginx
```

или вписав в поисковой строке браузера адрес `http://ip-адрес-сервера`

### Установка Node

Установите Node.js

```
sudo apt install nodejs npm

node --version
```

### Установка GO

```
wget https://dl.google.com/go/go1.22.2.linux-amd64.tar.gz
```

```
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
```

```
export PATH=$PATH:/usr/local/go/bin
```

Проверка установки

```
go version
```


### Установите Докер

```
sudo apt-get update
```

```
sudo apt-get install ca-certificates curl
```

```
sudo install -m 0755 -d /etc/apt/keyrings
```

```
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

```
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

#### Добавьте репозиторий докера:
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```
sudo apt-get update
```

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Установите пакет файервола

```
sudo apt-get install ufw -y 
```

```
sudo ufw enable 
```

```
sudo ufw default allow incoming 
```

```
sudo ufw allow http 
```

```
sudo ufw allow 80 
```

```
sudo ufw allow 8082
```

```
sudo ufw status verbose
```


## 2. Склонируйте репозиторий

Используя комманду `git clone` скопируйте репозиторий.

```
git clone https://github.com/SamKamirov/AtomSkills2024.git
```

## 3. Деплой

### Перейдите в директорию серверной части приложения

```
cd ~/AtomSkills2024/template/backend
```

Создайте конфигурационный файл Docker

```
touch Dockerfile
```

Откройте файл

```
sudo vim Dockerfile
```

Запишите в него следующую конфигурацию

```
FROM golang:1.22.2

WORKDIR /app

COPY . .
 
WORKDIR /app/to-do
RUN go mod download

COPY *.go ./

RUN go build -o ./docker-to-do

CMD ["./docker-to-do"]
```

Нажмите `Esc`
Сохраните файл используя `Shift + :`. Затем введите `w` и нажмите `Enter`
Закройте файл используя `Shift + :`. Затем введите `q` и нажмите `Enter`

Соберите образ

```
sudo docker build --tag backend .
```

### Перейдите в директорию серверной части приложения

```
cd ~/AtomSkills2024/template/frontend
```

Создайте конфигурационный файл Docker

```
touch Dockerfile
```

Откройте файл

```
vim Dockerfile
```

Запишите в него следующую конфигурацию

```
FROM busybox:1.35

RUN adduser -D static
USER static
WORKDIR app/
COPY . .

CMD ["busybox", "httpd", "-f", "-v", "-p", "8082"]
```

Нажмите `Esc`
Сохраните файл используя `Shift + :`. Затем введите `w` и нажмите `Enter`
Закройте файл используя `Shift + :`. Затем введите `q` и нажмите `Enter`

Соберите образ

```
sudo docker build --tag frontend .
```

## 4. Запустите образы

Просмотрите список образов

```
docker image ls
```

```
sudo docker run -d -p 8081:8081 backend
```

```
sudo docker run -d -p 8082:8082 frontend
```

## 5. Проверка

Перейдите по ссылке http://45.86.181.61:8082/

# Альтернативная инструкция

## Установка зависимостей для запуска
Для старта проекта вам необходимо установить Docker, если вы пользовать MacOS, Windows вы можете воспользоваться данной [ссылкой](https://www.docker.com/products/docker-desktop/) и скачать приложение. Это настольный клиент которые позволяет легко запустить Docker.

В случае если у вас имеется только консоль и система UNIX, в этом примере это Linux, вам следует выполнить следующую [инструкцию](#установите-докер)

## Запуск проекта

Для того что бы запустить проект у вас должны быть установлены зависимости которые были перечислены выше, после того как все выше указанные инструменты были установлены вам необходимо выполнить следующие команды из дериктории проекта:

> Внимание!
У вас на сервере должны быть не заняты следующие порты: 8081 и 8100

```bash
  cd template
  cd deploy

  docker compose up --build -d
```

После запуска вы можете перейти на локальный сервер: http://localhost:8100 и увидеть запущенное приложение.




=======
- Докуметация по развертывыанию находится [здесь](./docs/Инструкция%20по%20развертыванию.md)

- Документация пользователя находится [здесь](./docs/Инструкция%20пользователя.md)
>>>>>>> trial

- Руководство администратора находится [здесь](./docs/Руководство%20администратора.md)

- Техническая документация находится [здесь](./docs/Техническая%20документация.md)

*в случае если ссылки не сработали, перейдите в папку docs*