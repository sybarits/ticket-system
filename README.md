# Ticket System for me


* add below where src/main/resources/application.yml
```yaml
spring:
  data:
    mongodb:
      host: 127.0.0.1
      port: 27017
      authentication-database: admin
      username: "name"
      password: "password"
      database: "db name"
      # uri: mongodb: //127.0.0.1:27017/cloud
```

* add OAUTH2.0 token where src/main.resources/client_secret_@@@@@.json