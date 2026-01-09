title: "Kubernetes Guide"
description: "Статьи и материалы по Kubernetes"
baseurl: "" # оставьте пустым для username.github.io
url: "" # ваш URL
theme: minima

# Настройки сайта
author:
  name: "Ваше Имя"
  email: "ваш.email@example.com"

# Настройка плагинов
plugins:
  - jekyll-feed
  - jekyll-seo-tag

# Меню навигации
header_pages:
  - kubernetes.md
  - links.md
  - contacts.md

# Сортировка меню
defaults:
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "default"
      nav_order: 10 # значение по умолчанию

# Дата в русском формате
date_format: "%d.%m.%Y"
