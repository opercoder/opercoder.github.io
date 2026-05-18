# Обновление сертификатов k8s

Если истек срок действия (обычно 365 дней) сертификатов в kubernetes и невозможно подключиться к кластеру, то нужно выполнить следующие действия на control-plane нодах поочередно:

``` bash
# Проверка срока действия серификатов
kubeadm certs check-expiration
# Проверка, что etcd не управляется кластером
ls /etc/kubernetes/manifests/ | grep etcd
grep -r "etcd" /etc/kubernetes/manifests/kube-apiserver.yaml
# Если etcd не управляется кластером, то выполните
kubeadm certs renew admin.conf
kubeadm certs renew apiserver
kubeadm certs renew apiserver-kubelet-client
kubeadm certs renew controller-manager.conf
kubeadm certs renew front-proxy-client
kubeadm certs renew scheduler.conf
systemctl restart kubelet
systemctl status kubelet
# Перезапуск k8s системных подов
cd /etc/kubernetes/manifests/
mv kube-apiserver.yaml kube-scheduler.yaml kube-controller-manager.yaml /tmp/
mv /tmp/kube-apiserver.yaml /tmp/kube-scheduler.yaml /tmp/kube-controller-manager.yaml ./
# Если остались зависшие поды
kubectl get pods -n kube-system | grep -E "(kube-apiserver|kube-scheduler|kube-controller)"
crictl pods | grep -E "(kube-apiserver|kube-controller|kube-scheduler)" | grep -v "Exited"
kubectl get pods -n kube-system | grep -E "(kube-apiserver|kube-scheduler|kube-controller)"
crictl stopp f43471f91a156
crictl pods | grep -E "(kube-apiserver|kube-controller|kube-scheduler)" | grep -v "Exited"
crictl rm f43471f91a156
# Проверяем, что сертификаты на месте и их срок действия
kubeadm certs check-expiration | grep -E "(admin|apiserver)"
```
