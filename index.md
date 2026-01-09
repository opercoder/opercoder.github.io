---
title: "Главная | Kubernetes Guide"
layout: default
nav_order: 1
---

# 🚀 Kubernetes Guide

Добро пожаловать в мой блог о Kubernetes и DevOps! Здесь я делюсь знаниями, опытом и полезными материалами по контейнеризации и оркестрации.

## 📌 Навигация по сайту

<div class="nav-cards">
  <div class="nav-card">
    <h3><a href="./kubernetes">📚 Kubernetes</a></h3>
    <p>Статьи и руководства по Kubernetes</p>
  </div>
  
  <div class="nav-card">
    <h3><a href="./links">🔗 Полезные ссылки</a></h3>
    <p>Ресурсы, инструменты и документация</p>
  </div>
  
  <div class="nav-card">
    <h3><a href="./contacts">📞 Контакты</a></h3>
    <p>Связь со мной и обратная связь</p>
  </div>
</div>

## 📝 Последние добавленные посты

{% assign sorted_posts = site.posts | sort: 'date' | reverse %}
{% for post in sorted_posts limit:5 %}
<div class="post-preview">
  <h3>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h3>
  <div class="post-meta">
    <span class="date">{{ post.date | date: "%d.%m.%Y" }}</span>
    {% if post.tags %}
      <span class="tags">
        {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>
        {% endfor %}
      </span>
    {% endif %}
  </div>
  <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
  <a href="{{ post.url }}" class="read-more">Читать далее →</a>
</div>
{% endfor %}

<hr>

<div class="all-posts-link">
  <a href="./kubernetes" class="btn">📚 Все статьи по Kubernetes</a>
</div>

## 🎯 О чем этот сайт?

Этот сайт посвящен:
- **Kubernetes** и контейнеризации
- **DevOps** практикам
- **Cloud Native** технологиям
- Автоматизации и CI/CD

Подписывайтесь на обновления и следите за новыми материалами!
