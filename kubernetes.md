---
title: "Kubernetes статьи"
layout: default
nav_order: 2
---

# 📚 Статьи по Kubernetes

Здесь собраны все мои статьи и материалы по Kubernetes, сгруппированные по темам.

## 📊 Все статьи

{% assign categories = site.posts | map: 'category' | uniq %}
{% for category in categories %}
  {% if category %}
    <h2>{{ category | capitalize }}</h2>
    <div class="category-posts">
    {% for post in site.posts %}
      {% if post.category == category %}
      <div class="post-item">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <div class="post-meta">
          <span>{{ post.date | date: "%d.%m.%Y" }}</span> • 
          <span>Время чтения: {{ post.content | number_of_words | divided_by: 200 | plus: 1 }} мин.</span>
        </div>
        <p>{{ post.description | default: post.excerpt }}</p>
      </div>
      {% endif %}
    {% endfor %}
    </div>
  {% endif %}
{% endfor %}

## 🔥 По темам

<div class="topic-grid">
  <div class="topic">
    <h3>🐳 Основы</h3>
    <ul>
      {% for post in site.posts %}
        {% if post.tags contains "основы" or post.tags contains "базовый" %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
  
  <div class="topic">
    <h3>⚙️ Настройка</h3>
    <ul>
      {% for post in site.posts %}
        {% if post.tags contains "настройка" or post.tags contains "конфигурация" %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
  
  <div class="topic">
    <h3>🔧 Инструменты</h3>
    <ul>
      {% for post in site.posts %}
        {% if post.tags contains "helm" or post.tags contains "kustomize" or post.tags contains "операторы" %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
</div>
