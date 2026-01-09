---
title: "Полезные ссылки"
layout: default
nav_order: 3
---

# 🔗 Полезные ссылки по Kubernetes

Коллекция полезных ресурсов, инструментов и документации.

## 📚 Официальная документация

| Ресурс | Описание |
|--------|----------|
| [kubernetes.io](https://kubernetes.io/) | Официальная документация |
| [Kubernetes Docs](https://kubernetes.io/docs/) | Полная документация |
| [Kubernetes Blog](https://kubernetes.io/blog/) | Официальный блог |
| [Kubernetes GitHub](https://github.com/kubernetes/kubernetes) | Исходный код |

## 🛠 Инструменты

### CLI инструменты
- [kubectl](https://kubernetes.io/docs/reference/kubectl/) - Основной CLI инструмент
- [k9s](https://k9scli.io/) - Терминальный UI для Kubernetes
- [Lens](https://k8slens.dev/) - IDE для Kubernetes
- [Helm](https://helm.sh/) - Менеджер пакетов для Kubernetes

### Мониторинг и логи
- [Prometheus](https://prometheus.io/) - Мониторинг
- [Grafana](https://grafana.com/) - Визуализация метрик
- [Loki](https://grafana.com/oss/loki/) - Система логов
- [Jaeger](https://www.jaegertracing.io/) - Трейсинг

## 🎓 Обучение

### Бесплатные курсы
- [Kubernetes Basics на K8s.io](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Learnk8s](https://learnk8s.io/)
- [Kubernetes Tutorials](https://kubernetestutorials.com/)

### Практика
- [Katacoda Kubernetes](https://www.katacoda.com/courses/kubernetes)
- [Play with Kubernetes](https://labs.play-with-k8s.com/)
- [Kubernetes The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)

## 📖 Книги и блоги

### Блоги
- [Kubernetes Blog](https://kubernetes.io/blog/)
- [Medium Kubernetes](https://medium.com/tag/kubernetes)
- [Dev.to Kubernetes](https://dev.to/t/kubernetes)

### Книги
- "Kubernetes in Action" - Marko Luksa
- "Kubernetes: Up and Running" - Kelsey Hightower
- "Cloud Native DevOps with Kubernetes" - John Arundel

## 🚀 Полезные ресурсы

```yaml
# Примеры манифестов
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
