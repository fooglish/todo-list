# Общая информация 

Персональный server-side ежедневник с базой данных (H2). Взаимодействие клиент-сервер осуществляется посредством HTTP-запросов GET, POST, PUT, DELETE. 

- Доступ к базе данных: http://localhost:8080/h2/
- JDBC URL: jdbc:h2:mem:memDb

## Проверка функционала

- Для проверки полного функционала приложения используйте инструменты для тестирования API. 
- Также можете использовать пользовательский интерфейс доступный по адресу localhost:8080 после запуска приложения (WiP :bug:). 

Пример POST-запроса на localhost:8080/todo:

```
{
    "title": "Do a barrel roll",
		"priority": 4
}
```

Пример DELETE-запроса:
`http://localhost:8080/todo/delete/3` - удалит задачу с ID 3
