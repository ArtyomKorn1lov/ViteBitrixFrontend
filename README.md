# Frontend-расширения для многостраничных php-сайтов

### Цель создания:
Отказаться от использования классических расширений 1С-Битрикс, в пользу современных решений

### Проект включает:
- `/local/js/app` - frontend-проект, реализующий функционал frontend-расширений
- `/local/modules/main.site/lib/Core/Providers/ViteFrontendBridge.php` - php-мост, реализующий подключение frontend-расширений в проекте
- `/local/modules/main.site/assets/js/script.js` - javascript-провайдер, выполнящий функцию асинхронного подключения frontend-расширений, в процессе работы страницы в браузере

### Детальный readme про компоненты программной системы есть в `/local/js/app` и `/local/modules/main.site`