# (В процессе наполнения) СМЭВ4

> Полезные ссылки  
[Обучающие материалы](https://info.gosuslugi.ru/articles/Дополнительные_обучающие_материалы/)  
[Дистрибутив](https://info.gosuslugi.ru/docs/section/%D0%9F%D0%9E_%D0%B4%D0%BB%D1%8F_%D0%A1%D0%9C%D0%AD%D0%92/)  
[Документация](https://docs.rtk-soft.ru/podd-docs/latest/podd_source/podd/index.html)  
[Обучение на Stepik](https://stepik.org/course/210236/syllabus)  
[Инструкции по работе в ЛК УВ](https://info.gosuslugi.ru/download.php?id=742)  
[Инструкции по работе в ЕИП НСУД](https://info.gosuslugi.ru/download.php?id=3654)
[Техническое описание ПО "Витрина данных"](https://info.gosuslugi.ru/download.php?id=4223)

## Процесс подключения к СМЭВ4. Опыт развертывания и встречающиеся ошибки  

На момент создания статьи существует 3 стенда СМЭВ: для разработчиков, тестовый и продуктивный.  
Для подключения к продуктивному контуру потребуется подключение по защищенному каналу связи и сертификаты, выданные УЦ, которые загружаются в ЛК УВ. Для подключения к первым двум - сертификат и криптоконтейнер Крипто Про создаются онлайн с возможностью скачивания.  

## Регламентные процедуры

### ЛК УВ (личный кабинет участника взаимодействия)

1. Регистрация информационной системы (далее - ИС).  
1.1 Быстрые действия - Информационные системы - Добавить систему - ВЫБРАТЬ СРЕДУ - новая - для прода загрузить сертификат / для тест сгенерировать - скачать архив с контейнером, запомнить имя и пароль - потом можно будет найти систему.  
1.2 На основной вкладке Системы нажать редактировать и ВЫБРАТЬ РОЛЬ (потребитель или поставщик) - можно скачать установочный пакет. Внутри скачанного архива находится файл **application.yml**, из которого можно забрать параметры:

``` yaml
# Общие настройки агента
agent:
  # Идентификатор агента
  id: TEST01
  ogrn: '1000000000000'
keys:
  alias: x1234567
  password: x1234567
```

1.3 Получение доступа к РЗ (для потребителя).

### ЕИП НСУД

Регистрация модели и РЗ.  

1. Регистрация Витрины в СМЭВ 4.  
Поставщик данных формирует описание создаваемой Витрины данных (схема Витрины данных) в ЕИП НСУД и направляет на согласование в Центр компетенций в соответствии с разделами 3.5.12 и 3.5.13 Инструкции по работе в ЕИП НСУД.  
Для сохраненной схемы Витрины данных доступно направление в тестовую среду СМЭВ 4 без согласования с Центром компетенций.  
После согласования модель Витрины данных переходит в статус «Согласовано».  
Для схемы Витрины данных в статусе «Согласовано» доступно формирование xml схемы Витрины данных для создания на ее основе структуры физической Витрины данных и направления в продуктивную среду СМЭВ 4.  
1. Подключение Витрины данных к СМЭВ4.  
Поставщик данных передает модель данных Витрины для загрузки в тестовую среду СМЭВ4 путем нажатия кнопки «Отправить в СМЭВ4» в ЕИП НСУД (пункт 3.5.13 Инструкции по работе в ЕИП НСУД). Загрузка модели происходит автоматически.  
Поставщик данных осуществляет сопоставление Витрины данных и ИС через ЛК УВ (СМЭВ4 -> Добавить связь витрины СМЭВ 4) в соответствии с п. 5.6.1 Руководства пользователя ЛК УВ. Сопоставление Витрины данных и ИС возможно только после выбора соответствующей «Роли в СМЭВ4».  
После успешного сопоставления Витрины данных и ИС Поставщику автоматически предоставляются права доступа ИС к своей Витрине.  
Запрещено использовать в данных тестовой среды СМЭВ4 любые персональные или служебные данные, все данные должны быть тестовыми.  

## Быстрая установка

В архиве, скачанного из ЛК УВ, есть инструкция по быстрому развертыванию в докере агента СМЭВ4 с помощью готового образа на базе CentOS 7, скрипты, а также тестовые ключи и сертификат. Лицензию Крипто Про также не загружаем, используем демо версию.  

Для запуска необходимо:

- распаковать zip архив;
- дать необходимые права доступа на ключи:

``` bash
chmod -R 755 ./agent/keys
chown -R 1000:1000 ./agent/keys
chmod +x ./*.sh
```

- исправить application.yml блок ntp:

``` yml
# Вместо этой строки:
#    - host: {host=qs-podd.test.gosuslugi.ru} 
# прописать:
    - host: "qs-podd.test.gosuslugi.ru"
```

## Установка агента для тестовой среды в докер

Понадобятся ключи, сертификат, пользователь и пароль от криптоконтейнера, мнемоника, указанные в ЛК УВ.  

Сборка образа планируется на базе ОС Astra Linux 1.8.  
[Отсюда](https://info.gosuslugi.ru/docs/section/ПО_для_СМЭВ/) можно скачать дистрибутив и руководство администратора.  

### Необходимо закупить

- лицензия на Крипто Про (СКЗИ CryptoPro CSP версии 5.0 R3);
- докер-образ с Astra Linux 1.8.  

### Подготовка к развертыванию агента

В папку files кладется архив с Крипто Про: **files/linux-amd64.tgz**.  

Поднимается kafka для витрин

Сначала собирается образ агента для соответствующей среды и роли. Для этого заполняется файл: **einfahrt/application.yml**. В докерфайл прописываются следующие отличия от официальной документации для Альт Линукс:  

1. Установка JDK 17 из репозитория Astra Linux вместо предлагаемой установки платной версии - JDK 17 LTS Axiom.
1. Создание пользователя app, от которого запускается приложение.
1. Установка Крипто Про.
1. Расскомментируется строка в конце файла с установкой агента.

Обязательно выполните:  

``` bash
chown -R 1000:1000 ./keys
```

---
Dockerfile:  

``` dockerfile
# Based on official ALT 8 SP Server 10 image and certified Axiom JDK 17.0
#
# USAGE:
# START_CMD can be redefined as axternal parameter. By default - "java -cp app/* -jar app/app.jar"
# JDK_JAVA_OPTIONS can be EXTENDED by external parameter with the same name, but can't be redefined
# also checks presence of mounted external file certs/cacerts, if exist it will be used instead of default

# В следующей строке указать базовый образ выбранной операционной системы
FROM epicmorg/astralinux:1.8-rootfs

COPY files/ /tmp/

RUN apt-get update \
    && apt-get install -y locales unzip openssl \
    && apt-get clean \
    && adduser --uid 1000 --home /egov --disabled-password --gecos "" app \
    && usermod -L app \
    && mkdir -p /egov/java/app \
    && chown -R 1000:1000 /egov/java \
    && cd /tmp \
    && apt-get install -y openjdk-17-jdk \
    && tar xzvf linux-amd64.tgz \
    && cd linux-amd64_deb \
    && for deb in lsb-cprocsp-base*.deb lsb-cprocsp-rdr-64-*.deb lsb-cprocsp-kc1-64-*.deb \
                  lsb-cprocsp-capilite-64-*.deb lsb-cprocsp-devel-*.deb lsb-cprocsp-kc2-64-*.deb \
                  cprocsp-curl-64-*.deb; do \
        if [ -f "$deb" ]; then \
            dpkg -i --force-depends "$deb" || true; \
        fi; \
    done \
    && apt-get install -f -y \
    && if [ -f install.sh ]; then ./install.sh; fi \
    && cd /tmp \
    && rm -rf linux-amd64_deb linux-amd64.tgz \
&& echo -e '#!/bin/bash -l \n\
[ -z "${START_CMD}" ] && START_CMD="java -jar app/app.jar" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-exports=java.base/sun.security.util=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-exports=java.base/sun.security.x509=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-exports=java.base/sun.security.pkcs=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-exports=java.base/sun.security.provider=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-exports=java.base/sun.security.tools.keytool=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-exports=java.base/sun.net=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-opens=java.base/jdk.internal.misc=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-opens=java.base/java.lang=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-opens=java.base/java.nio=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-opens=java.xml/org.w3c.dom=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} --add-opens=java.base/java.util=ALL-UNNAMED" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -Dio.netty.tryReflectionSetAccessible=true" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -Dsaffron.default.charset=UTF-16LE" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -Dsaffron.default.collation.name=UTF-16LE\$en_US" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -Dsaffron.default.nationalcharset=UTF-16LE" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -XX:+UseContainerSupport" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -XX:InitialRAMPercentage=80.0" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -XX:MaxRAMPercentage=80.0" \n\
DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -XX:+FlightRecorder" \n\
[ -f certs/cacerts ] && DEFAULT_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} -Djavax.net.ssl.keyStore=certs/cacerts -Djavax.net.ssl.trustStore=certs/cacerts" \n\
JDK_JAVA_OPTIONS="${DEFAULT_JAVA_OPTIONS} ${JDK_JAVA_OPTIONS}" \n\
export JDK_JAVA_OPTIONS \n\
[ -d /chgCfgTmp ] && cp -f /chgCfgTmp/* /egov/java \n\
exec ${START_CMD} \n' >/docker-entrypoint.sh \
&& chmod 755 /docker-entrypoint.sh

ENV PATH=${PATH}:/opt/cprocsp/bin/amd64

WORKDIR /egov/java

ENTRYPOINT ["/docker-entrypoint.sh"]

RUN chown -R 1000 /etc/opt/cprocsp \
&& echo -e '[ -s /egov/csp.lic ] && /opt/cprocsp/sbin/amd64/cpconfig -license -set $(cat /egov/csp.lic)' >>/etc/profile.d/license_cpro.sh

#############################################
#          APPLICATION specific             #
#############################################

# При сборке образа, ниже должна быть раскомментирована только одна строка!

# Раскомментировать при сборке образа Агента СМЭВ4
COPY einfahrt/app/app.jar app/app.jar

# Раскомментировать при сборке образа Prohibitor
#COPY prohibitor/app/app.jar app/app.jar

# Раскомментировать при сборке образа Notarius
#COPY notarius-ng/app/app.jar app/app.jar
```

---
Конфигурация агента application.yml:  

``` yml
##### ОБЯЗАТЕЛЬНЫ К ЗАПОЛНЕНИЮ ТОЛЬКО ЗНАЧЕНИЯ ОБОЗНАЧЕННЫЕ ЗВЕЗДОЧКАМИ                    #####
##### ОЗНАКОМИТЕСЬ С "Руководством администратора" ДЛЯ ПОЛУЧЕНИЯ ПОДРОБНОЙ ИНФОРМАЦИИ      #####
##### ПРИ РЕДАКТИРОВАНИИ ИНФОРМАЦИИ В ДОПОЛНИТЕЛЬНЫХ (ЗАКОММЕНТИРОВАННЫХ) БЛОКАХ И ИХ      #####
##### РАСКОММЕНТИРОВАНИИ, ВАЖНО СОХРАНИТЬ И НЕ ИЗМЕНЯТЬ КОЛИЧЕСТВО ПРОБЕЛОВ В НАЧАЛЕ СТРОК #####

agent:
  # Идентификатор агента
  id: 'MNEMONIKA'
  ogrn: 'OGRN'

rsocket:
  keep-alive:
    interval: 20000
    max-lifetime: 180000

#logging:
#  level:
#    ru.rtlabs.rsocket: DEBUG
#    io.rsocket: DEBUG
#    ru.rtlabs.transport.oauth: DEBUG
#    ru.rtlabs.broker.client: DEBUG

keys:
  alias: 'ALIAS'
  password: 'PASS'

# Общие настройки витрины
datamart:
  # подключение к kafka для взаимодействия с витриной
  # сервера kafka указываются в формате ip:port
  # возможно указание списка адресов через запятую: ip1:port,ip2:port2 и т.д.
  integration:
    kafka:
      kafka-bootstrap-servers: 'KAFKA'
##### Следующий блок параметров раскомментировать и заполнять ТОЛЬКО при взаимодействии   #####
##### агента с компонентами витрины по REST                                               #####
#    type: HTTP
#    prostore:
#      host: '*** СЕРВЕР Prostore ***'
#      port: '*** Порт Prostore ***'
#    blobAdapter:
#      host: '*** СЕРВЕР Blob Adapter ***'
#      port: '*** Порт Blob Adapter ***'

# Настройки регистрации витрин
datamart-registration:
  # Список витрин для регистрации. Можно задать пустой список []
  datamarts:
    - id: vitrina_1
    - id: vitrina_2
#    - id: '*** МНЕМОНИКА ВИТРИНЫ ***'

##### Следующий блок параметров раскомментировать и заполнять ТОЛЬКО при использовании    #####
##### масштабированного варианта запуска агента                                           #####
#  # УНИКАЛЬНЫЙ ИДЕНТИФИКАТОР КАЖДОГО ЭКЗЕМПЛЯРА АГЕНТА
#  # ТРЕБУЕТСЯ ТОЛЬКО ДЛЯ МАСШТАБИРОВАННЫХ АГЕНТОВ
#agent-info:
#  instanceId: agent-instance-1

##### Следующий блок параметров раскомментировать и заполнять только                      #####
##### при использовании   печатных форм                                                   #####
#printable-form:
#  # Максимальный размер данных для подписания
#  max-content-length: 268435456
#  # Настройка каким сертификатом подписать результат какого запроса.
#  # Пары значений "название регламентированного запроса": "алиас сертификата"
#  forms:
#    v1_printable_form_address: 'Указать_алиас_сертификата'
#  signature:
#    printable-form-keys:
#      -
#        certificateAlias:'Указать_алиас_сертификата'
#        privateKeyAlias: 'Указать_алиас_сертификата'
#        privateKeyPass: 'Указать_пароль_ключа'

##### Следующий блок параметров раскомментировать и заполнять только                      #####
##### при использовании API gateway                                                       #####
##### Параметры HTTP-клиента для отправки запросов на стороне поставщика                  #####
#api-gateway:
#  client:
#    impl: APACHE
#    options:
#      default-host: *** hostname api-gateway СЕРВЕРА ***
#      default-port: *** порт api-gateway СЕРВЕРА     ***
#      ssl: false
#      verifyHost: false
#      maxPoolSize: 100







##############################################################################################
#####      DO NOT EDIT BELOW THIS LINE    #####    НЕ РЕДАКТИРОВАТЬ НИЖЕ ЭТОЙ СТРОКИ     #####
##############################################################################################

# Настройки подключения ко всем ЦОД с установленным ПО Ядра СМЭВ4
data-center:
  # Конфигурация ядер
  nodes:
    - node-id: NODE1
      # Адреса брокеров
      broker-addresses:
        - host: podd.test.gosuslugi.ru
          port: 6651
        - host: podd.test.gosuslugi.ru
          port: 6652
      auth:
        oauth:
          # НЕ ИСПОЛЬЗОВАТЬ УКАЗАНИЕ IP АДРЕСА! Для обращения к сервису аутентификации обязательно указание доменного имени
          auth-server:
            - url: https://podd.test.gosuslugi.ru/auth
  # Общий блок настроек для всех Ядер СМЭВ4
  default-node:
    auth:
      # Включение авторизации
      enabled: true

ntp:
  enabled: false
  servers:
    - host: "qs-podd.test.gosuslugi.ru"
    - host: "i22dns02.unix.local"
```

---
Скрипт для запуска контейнера:  

``` bash
#!/bin/bash

IMG="einfahrt"

stop()
{
    echo $1
    exit 1
}

if [ -f ./configure ]; then
    . ./configure
else
    stop "No configuration found; exiting"
fi

echo "Checking for image and configuration compatibility"
[ ! -f application.yml ] && stop "File application.yml not found; exiting" || chmod 0666 application.yml
CFG_VERSION=$(head -1 application.yml | awk -F" " '{print $2}')
[ -z ${CFG_VERSION} ] && CFG_VERSION="unknown"
IMG_VERSION=$(expr "$(docker image history --no-trunc ${IMG}:latest |grep LABEL|grep build_release)" : '.*\(build_release.*\)'|cut -d' ' -f1|cut -d= -f2)

if [[ ${CFG_VERSION} != ${IMG_VERSION} ]]; then

echo "WARNING! Versions of configuration file and image are not he same!"
echo "Configuration file version is ${CFG_VERSION}, image version is ${IMG_VERSION}"
echo "Do you want to continue (y/n)?"
read ANSWER
[ "${ANSWER,,}" != "y" ] && stop "Startup aborted"
fi

TAG='latest'
DIR=$(pwd)

[ ! -d keys ] && stop "\"keys\" directory not found; exiting"

MOUNTS=" --mount type=bind,source=${DIR}/application.yml,target=/egov/java/application.yml,readonly --mount type=bind,source=${DIR}/keys,target=/var/opt/cprocsp/keys/app"
[ -d certs ] && MOUNTS="${MOUNTS} --mount type=bind,source=${DIR}/certs,target=/egov/java/certs,readonly"

# check exisence of mandatory objects; set permissions
for OBJECT in certs keys; do
    [ -d ${OBJECT} ] && find ${OBJECT} \( -type f -exec chmod 0666 {} + \) -o \( -type d -exec chmod 0777 {} + \)
done

# Если есть лицензия КриптоПро CSP, она должна находиться в текстовом виде в файле licenses/csp.lic
# При отсутствии внешнего файла с лицензией, будет использовано trial лицензирование CryptoPro
[ -f licenses/csp.txt ] && MOUNTS="${MOUNTS} --mount type=bind,source=${DIR}/licenses/csp.txt,target=/egov/csp.lic,readonly"

# custom logger configuration, if exists
if [ -f customLogLevels.xml ]; then
    chmod 0666 customLogLevels.xml
    MOUNTS="${MOUNTS} --mount type=bind,source=${DIR}/customLogLevels.xml,target=/chgCfgTmp/customLogLevels.xml"
fi

# expose ports
for OBJECT in 8183 8192 8171 8172; do
    PORTS="${PORTS} -p ${OBJECT}:${OBJECT}"
done

echo "Checking for already started container, stop it if running"
[ ! -z $(docker ps |awk '{print $NF}'|grep "^${IMG}$") ] && docker stop ${IMG} >/dev/null
[ ! -z $(docker ps -a |awk '{print $NF}'|grep "^${IMG}$") ] && docker rm ${IMG} >/dev/null

echo "Starting docker container"
# Важно! Для корректного использования ключей CryptoPro,
# процесс в контейнере docker должен выполняться пользователем app (id=1000)
# использование ключа «--user=1000» обязательно!
docker run  \
    -d \
    --user=1000 \
    --name ${IMG} \
    --add-host podd.gosuslugi.ru:172.20.59.5 \
    --add-host podd1.gosuslugi.ru:109.207.15.26 \
    --add-host podd2.gosuslugi.ru:109.207.15.58 \
    --add-host podd3.gosuslugi.ru:109.207.15.154 \
    --add-host podd4.gosuslugi.ru:109.207.15.186 \
    --add-host podd-cross.gosuslugi.ru:172.20.59.5 \
    --add-host podd1-cross.gosuslugi.ru:109.207.15.26 \
    --add-host podd2-cross.gosuslugi.ru:109.207.15.58 \
    --add-host podd3-cross.gosuslugi.ru:109.207.15.154 \
    --add-host podd4-cross.gosuslugi.ru:109.207.15.186 \
    ${PORTS} \
    ${MOUNTS} \
    ${IMG}:${TAG}

[ $? -eq 0 ] && echo "Application started. Container name: ${IMG}. Available ports: 8183 (jdbc), 8192 (REST, driver download, OpenAPI specifications), 8171 (API gateway), 8172 (API GW target arch)" || echo "Error starting docker. Run diag.sh and follow instruction"
```

## Создание витрины данных

### ШАГ 1. Регистрация модели данных

Предусловие: необходим доступ в ЕИП НСУД.  
На этом шаге вы можете зарегистрировать в ЕИП НСУД реальную модель Витрины.  
Если у вас нет такой Витрины, предлагаем вам в учебных целях создать простую модель, состоящую из двух таблиц, зарегистрировать ее и отправить информацию о ней в тестовый сервис СМЭВ4 (ПОДД).  
Подробнее о том, как создать модель и как отправить информацию о ней в СМЭВ4, можно прочитать в документации ЕИП НСУД.  
**Итог шага:** мнемоника Витрины и скрипт создания БД.

### ШАГ 2. Регистрация системы

Предусловие: необходим доступ в ЛК УВ.  
Вы можете зарегистрировать вашу информационную систему (ИС) с ролью Поставщик в тестовой среде.  
Если у вас ещё нет информационной системы, то предлагаем вам зарегистрировать тестовую ИС с тестовой ЭП, сгенерированной в ЛК УВ, и присвоить ей роль Поставщик в СМЭВ4.  
**Итог шага:** мнемоника системы и Агента СМЭВ4, контейнер ЭП.

### ШАГ 3. Привязка Витрины к системе

Предусловие: необходим доступ в ЛК УВ и ЕИП НСУД.  
Данный шаг вы будете выполнять в ЛК УВ. Чтобы ваша ИС стала Поставщиком, необходимо связать ее с вашей Витриной в ЛК УВ — указать это в карточке системы.  

### ШАГ 4. Получение учебной сборки ПО «Витрина данных»

На этом шаге вы познакомитесь с лицензионным договором присоединения – это документ о предоставлении права использования экспериментальной версии программного обеспечения для работы в Системе межведомственного электронного взаимодействия (СМЭВ). Вам необходимо ознакомиться и согласиться с его содержанием. В соответствии со статьей 428 и пунктом 5 статьи 1286 Гражданского кодекса Российской Федерации необходимо осуществить присоединение к этому лицензионному договору, тем самым вы обязуетесь его соблюдать и нести ответственность за его нарушение.  
После присоединения к лицензионному договору (на следующем шаге данного раздела) вам станут доступны ссылки на скачивание ПО.  
**Итог шага:** получен для скачивания ПО Datamart Studio и «Витрина данных».

### ШАГ 5. Подготовка инфраструктуры

**Итог шага:** подготовлены виртуальные машины (ВМ) с необходимой ОС, настроено окружение.

### ШАГ 6. Установка Datamart Studio, добавление в неё информации о Витрине и ВМ

Вам понадобится мнемоника Витрины, полученная на Шаге 1. Если готовой мнемоники нет, можно использовать вымышленную.  
**Итог шага:** установлена и подготовлена к установке Витрины программа Datamart Studio.

### ШАГ 7. Установка Витрины

Установка компонентов Витрины с помощью Datamart Studio рассматривается отдельно.  
**Итог шага:** развернута Витрина.

### ШАГ 8. Установка и настройка Агента СМЭВ4

Дистрибутив ПО «Агент СМЭВ4» входит в учебную сборку ПО «Витрина данных».  
Если у вас есть артефакты, полученные в результате выполнения Шага 2 (мнемоника системы и Агента СМЭВ4, контейнер ЭП), то настройте Агент с реальными данными и проверьте его работу.  
**Итог шага:** установлен Агент СМЭВ4.

### ШАГ 9. Проверка работы Витрины

НАДО ЗАПОЛНИТЬ.
