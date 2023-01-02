# Ticket System for me


### Google Sheet Token
* add OAUTH2.0 token where src/main.resources/client_secret_@@@@@.json


## DB setting
* add below where src/main/resources/application.yml

```yaml
spring:
  data:
    mongodb:
      #host: 127.0.0.1
      host: 192.168.0.2
      port: 27017
      authentication-database: admin
      username: "name"
      password: "password"
      database: "db name"
      # uri: mongodb: //127.0.0.1:27017/cloud
  servlet:
    multipart:
      enabled: true
      max-file-size: 16MB
      max-request-size: 16MB
  jwt:
    secret: # your secret key
```

synology 상에 도커를 설치한다.

도커를 실행하고, 레지스트리에서 mongo를 검색하여 설치한다.
이때 버전은 4.4 버전을 설치 한다. 그외 버전은 실행이 안되더라.

이미지 다운로드가 완료되면 컨테이너를 생성한다.
생성시 환경변수를 아래와 같이 추가한다. 자세한 사항은 https://www.vbflash.net/112 이 페이지를 참고한다.
MONGO_INITDB_ROOT_USERNAME: Admin ID
MONGO_INITDB_ROOT_PASSWORD: Admin Password

이 값들은 mongodb를 세팅하기 위해 사용할 admin 계정이다.

/data/db 경로에 외부 볼륨을 마운트 해주어 컨테이너가 중지되어도 데이터가 유실 되지 않도록 한다.
/etc/mongod.conf 파일 마운트를 하여 시작될때 설정이 적용되도록 해준다.
net 부분과 security 부분을 수정해주어 외부 접근시 로근인이 가능하도록 해준다.

```yaml
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: enabled

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

```

### MongoDB Backup

* 실행중인 MongoDB 컨테이너에 접속하는 명령어는 아래와 같다.
```
$ sudo docker exec -it <container ID> /bin/bash
```

* 데이터가 있을 경우 몽고디비 백업 파일을 준비한다.
```
$ mongodump --out <dump data path> --host 127.0.0.1 --port 27017 -u <username> -p <password> --db <덤프할 db명>
```

* 몽고디비에 들어가야할 데이터들을 아래 명령어들을 통해 넣어준다.
```
$ mongorestore --host 127.0.0.1 -u admin-ID -p admin-password --port 27017 dump_file_path
```

* E11000 duplicate key error collection 에러 발생시에는 db에 접속하여 use 'database' 한 후 db.dropDatabase() 를 해서 기존에 존재하던 데이터베이스를 삭제하면 에러가 발생하지 않는다.


* db에 admin으로 접속하여 아래와 같이 명령어를 입력하여 유저를 추가한다. (mongosh는 신버전에서 사용)

```
$ mongo --port 27017 -u admin-ID -p admin-password --authenticationDatabase "admin"
$ mongosh --port 27017 -u admin-ID -p admin-password --authenticationDatabase "admin"

> use admin;
> db.createUser({user: "id", pwd: "password", roles:[{role:"readWrite", db:"qcloud_db"},{role:"userAdmin", db:"qcloud_db"},{role:"dbAdmin", db:"qcloud_db"},]});
```


### Insert data bellow for auth
```javascript
db.authPages.insert({
    "administrator":["CloudUsers", "CloudUser", "CloudUserInputs", "Tickets", "Ticket", "TicketInputs", "NewResearchersTable", "NewResearcher", "NewResearcherInputs", "Tickets", "Ticket", "TicketInputs"],
    "cloudSerivce":["CloudUsers", "CloudUser", "CloudUserInputs", "Tickets", "Ticket", "TicketInputs"],
    "newResearcher":["NewResearchersTable", "NewResearcher", "NewResearcherInputs", "Tickets", "Ticket", "TicketInputs"],
})
```


## nginx vhosts setting
* make /etc/nginx/conf.d/vhosts.conf file
* server_name -> your domain name
* root -> your static files directory
```
server {
    listen 80 default_server;
    server_name /var/www/example.com;

    root /var/www/example.com;
    index index.html index.htm;      

    location ~* \.(?:manifest|appcache|html?|xml|json)$ {
      expires -1;
      # access_log logs/static.log; # I don't usually include a static log
    }

    location ~* \.(?:css|js)$ {
      try_files $uri =404;
      expires 1y;
      access_log off;
      add_header Cache-Control "public";
    }

    # Any route containing a file extension (e.g. /devicesfile.js)
    location ~ ^.+\..+$ {
      try_files $uri =404;
    }

    # Any route that doesn't have a file extension (e.g. /devices)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```


## Spring Boot Server docker image 만들기

프로젝트 root 위치에서 아래 명령어를 이용해 spring boot 프로젝트를 빌드한다.
```
$ ./gradlew build
```

build/libs 위치에 jar 파일이 생성되었을 것이다. 이 파일이 빌드 결과물이다.
이 결과물을 docker 위치에 옮기고 이름을 qcenter-server.jar(Dockerfile에서 사용하는 파일 이름) 로 바꾸어 준다. 
```
$ cp ./build/libs/*.jar ./docker/qcenter-server.jar
```

docker 위치에 가면 미리 작성된 Dockerfile이 있다. 이를 이용해 이미지를 만들고, tar 파일로 export 해본다.
```
sudo docker build -t qcenter-backend:0.2 .
sudo docker save -o qcenter-backend.0.2.tar qcenter-backend:0.2
```
tar 파일을 배포할 곳에 전송한다.

