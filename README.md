## Мобильное приложение WebZaim

### Установка и запуск

1. Настройка окружения
    https://reactnative.dev/docs/0.69/environment-setup

2. В корне проекта создать два файла `.env.development` и `.env.production`

Заполнить `env` файлы корретными данными

| Настройка              | Описание                                                               |
|------------------------|------------------------------------------------------------------------|
| ENV                    | production и developnet соответственно                                 |
| API_URL                | url backend                                                            |
| X_APP_TOKEN_IOS        | авторизационный token для API_URL ios                                  |
| X_APP_TOKEN_ANDROID    | авторизационный token для API_URL android                              |
| API_DADATA_URL         | url backend для Dadata                                                 |
| DADATA_TOKEN           | авторизационный token для API_DADATA_URL, одинаковый для обоих платформ |
| VK_URL                 | ссылка на группу ВКонтакте (экран Ещё)                                 |
| PHONE                  | телефон горячей линии, c разделителями 8-800-700-8706                  |
| APPSTORE_URL           | ссылка на приложение в сторе для обновления                            |
| GOOGLEPLAY_URL         | ссылка на приложение в сторе для обновления                            |
| APP_METRICA_KEY        | ключ для использования в SDK                                           |
| PRIVACY_POLICY         | ссылка политики конфиденциальности                                     |

3. Утановка зависимостей и запуск

```bash
yarn install
```
```bash
cd ./ios && pod install
```
```bash
yarn android или yarn ios
```

Проброс портов для Android:

```bash
adb reverse tcp:8081 tcp:8081
```


### Сборка на прод:

1. Подъем версии:

**./android/app/build.gradle** - изменение версии (versionCode, versionName) (versionCode поднимается всегда при отправки в стор)

**./ios/webzaim/Info.plist** - изменение верссии (CFBundleShortVersionString, CFBundleVersion) или черех XCode.

**package.json** - version

**app.json** - version (отправляется на backend для проверки актуальности версии приложения)

2. Сборка Android:

в `./android/app/` должен лежать `key.jks` (сертификт)

```bash
cd ./android && ./gradlew clean
```
```bash
./gradlew bundleRelease
```
3. Сборка iOS:

через XCode (не забыть поменять schema на release)

