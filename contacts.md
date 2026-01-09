
## 5. Страница контактов `contacts.md`

```markdown
---
title: "Контакты"
layout: default
nav_order: 4
---

# 📞 Контакты

Свяжитесь со мной для обсуждения проектов, вопросов или сотрудничества.

## 📫 Способы связи

<div class="contact-methods">
  <div class="contact-method">
    <h3>📧 Email</h3>
    <p><a href="mailto:ваш.email@example.com">ваш.email@example.com</a></p>
    <p>Отвечаю в течение 24 часов</p>
  </div>
  
  <div class="contact-method">
    <h3>💼 LinkedIn</h3>
    <p><a href="https://linkedin.com/in/ваш-профиль" target="_blank">linkedin.com/in/ваш-профиль</a></p>
    <p>Профессиональные контакты</p>
  </div>
  
  <div class="contact-method">
    <h3>💻 GitHub</h3>
    <p><a href="https://github.com/ваш-username" target="_blank">github.com/ваш-username</a></p>
    <p>Мои проекты и код</p>
  </div>
  
  <div class="contact-method">
    <h3>🐦 Twitter / X</h3>
    <p><a href="https://twitter.com/ваш-username" target="_blank">@ваш-username</a></p>
    <p>Короткие обновления и мысли</p>
  </div>
</div>

## 📝 Форма обратной связи

<div class="contact-form">
  <p>Или напишите мне прямо здесь:</p>
  
  <form action="https://formspree.io/f/ваш-form-id" method="POST">
    <div class="form-group">
      <label for="name">Ваше имя:</label>
      <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Ваш email:</label>
      <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="subject">Тема:</label>
      <select id="subject" name="subject">
        <option value="question">Вопрос по Kubernetes</option>
        <option value="collaboration">Сотрудничество</option>
        <option value="feedback">Обратная связь</option>
        <option value="other">Другое</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="message">Сообщение:</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    
    <button type="submit" class="btn">Отправить сообщение</button>
  </form>
</div>

## 🕒 Время работы

- **Рабочие дни:** Пн-Пт, 9:00-18:00
- **Ответ на email:** В течение 24 часов
- **Консультации:** По предварительной договоренности

---

*Примечание: Для работы формы обратной связи нужно зарегистрироваться на [Formspree](https://formspree.io/) или использовать другой сервис форм.*
