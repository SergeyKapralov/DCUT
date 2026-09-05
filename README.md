# DCUT

SPA с имитацией аутентификации и каруселью на главной странице. Учебный проект, построенный по методологии Feature-Sliced Design (FSD).

## Стек

- React 19 + TypeScript (strict)
- Vite
- Mantine (UI)
- Embla Carousel
- React Router
- zustand (+ persist в localStorage)
- Tailwind CSS
- i18next (ru / en)

## Возможности

- **Аутентификация (имитация):** страница `/login`, форма с валидацией email и пароля (не менее 3 символов), токен сохраняется в localStorage. Неавторизованный пользователь перенаправляется на `/login`, авторизованный — с логина на главную. Кнопка выхода очищает токен.
- **Карусель на главной:** слайды с полями `id`, `title`, `annotation`, `isChecked`. Навигация стрелками и пагинацией, добавление слайда через модальное окно (обязателен `title`), удаление с подтверждением, статус просмотра. Данные сохраняются в localStorage.
- **Переключатели темы и языка:** авто/светлая/тёмная тема, русский/английский.

## Структура (FSD)

```
src/
├── app/          # инициализация, роутер, провайдеры
├── pages/        # страницы (HomePage, LoginPage, NotFoundPage)
├── widgets/      # карусель
├── features/     # auth, theme, i18n, layout
├── entities/     # carousel (модель и стор)
└── shared/       # ui, хуки, утилиты, стили
```

Зависимости направлены только от верхних слоёв к нижним, импорты идут через публичные API слайсов (`index.ts`).

## Запуск

```bash
npm install
npm run dev      # локальный сервер
```

## Команды

| Команда                | Назначение                               |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | запуск dev-сервера                       |
| `npm run build`        | сборка + генерация `dist/404.html` (SPA) |
| `npm run preview`      | предпросмотр сборки                      |
| `npm run lint`         | проверка ESLint                          |
| `npm run format`       | форматирование Prettier                  |
| `npm run format:check` | проверка форматирования                  |

## Деплой

Публикация на GitHub Pages автоматически: при push в `main` workflow (`.github/workflows/deploy.yml`) собирает проект и публикует артефакт. Адрес: `https://sergeykapralov.github.io/DCUT/`.

Для глубоких ссылок используется фолбэк `404.html`: Vite собирает сайт с `base: "/DCUT/"`, после сборки `index.html` копируется в `dist/404.html`, и GH Pages отдаёт его для неизвестных маршрутов (React Router рендерит нужную страницу).

## Теория

Ответы на вопросы по TypeScript — в файле [THEORY.md](./THEORY.md).
