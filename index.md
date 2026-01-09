---
title: "Главная"
layout: home
nav_order: 1
---

# Мой сайт

## Быстрые ссылки:
- [📖 Блог](./blog)
- [👨‍💻 Проекты](./projects)
- [📞 Контакты](./contact)

## Последние посты:
{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }}) – {{ post.date | date: "%d.%m.%Y" }}
{% endfor %}
