## 🚀 API

Ao executar via docker a <api-base> = localhost:8009
Ao executar pela ide ou via terminal a <api-base> = localhost:8000

## LOGIN
`POST`
`http://<api-base>/auth/login/`

`Body`
```
{"email":"paulo@gmail.com","password":"123"}
```


`Response`
```
{
    "token": "<token_jwt>"
}
```



#HEADER
Para a chamada das demais api usar o header a seguir:

`Authorization` : `JWT <token_jwt>` 


# USER API
### USER LIST
`GET`
`http://<api-base>/users/`

`Status` :`200` 

`Response`
```
[
    {
        "id": 5,
        "url": "http://<api-base>/users/5/",
        "email": "indt@indt.org",
        "first_name": "INDT",
        "last_name": "ADMIN",
        "is_active": true,
        "is_superuser": true
    },
    {
        "id": 11,
        "url": "http://<api-base>/users/11/",
        "email": "paulogean10@gmail.com",
        "first_name": "PAULO",
        "last_name": "LOPES",
        "is_active": true,
        "is_superuser": true
    }
]
```


### USER CREATE
`POST`
`http://<api-base>/users/`

`Body`
```
{
    "email":"paulolopes@email.com",
    "first_name":"PAULO",
    "last_name":"LOPES",
    "is_active":true,
    "is_superuser":true,
    "password":"123"
}
```

`Status` :`201` 

`Response`
```

{
    "id": 17,
    "url": "http://<api-base>/users/17/",
    "email": "paulolopes@email.com",
    "first_name": "PAULO",
    "last_name": "LOPES",
    "is_active": true,
    "is_superuser": true
}
```

### USER UPDATE
`PUT`
`http://<api-base>/users/`

`Body`
```
{
    "email":"paulolopes@email.com",
    "first_name":"PAULO",
    "last_name":"LOPES",
    "is_active":true,
    "is_superuser":true,
    "password":"123"
}
```

`Status` :`200` 
`Response`
```

{
    "id": 17,
    "url": "http://<api-base>/users/17/",
    "email": "paulolopes@email.com",
    "first_name": "PAULO",
    "last_name": "LOPES",
    "is_active": true,
    "is_superuser": true
}
```


### USER DELETE
`DELETE`
`http://<api-base>/users/<id_user>/`



`Status` :`204` 

`Response` 
```

{
    "id": 17,
    "url": "http://<api-base>/users/17/",
    "email": "paulolopes@email.com",
    "first_name": "PAULO",
    "last_name": "LOPES",
    "is_active": true,
    "is_superuser": true
}
```


### USER REPORT
`GET`
`http://<api-base>/report_user/`

`Status` :`200` 

`Response`
```
[
    {
        "is_superuser": true,
        "is_active": true,
        "total": 5
    },
    {
        "is_superuser": false,
        "is_active": false,
        "total": 1
    },
    {
        "is_superuser": true,
        "is_active": false,
        "total": 1
    },
    {
        "is_superuser": false,
        "is_active": true,
        "total": 5
    }
]
```