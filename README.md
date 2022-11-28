# Ticket System for me


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
```

* add OAUTH2.0 token where src/main.resources/client_secret_@@@@@.json


* insert data bellow for auth
```javascript
db.authPages.insert({
    "administrator":["CloudUsers", "CloudUser", "CloudUserInputs", "Tickets", "Ticket", "TicketInputs", "NewResearchersTable", "NewResearcher", "NewResearcherInputs", "Tickets", "Ticket", "TicketInputs"],
    "cloudSerivce":["CloudUsers", "CloudUser", "CloudUserInputs", "Tickets", "Ticket", "TicketInputs"],
    "newResearcher":["NewResearchersTable", "NewResearcher", "NewResearcherInputs", "Tickets", "Ticket", "TicketInputs"],
})
```