# Умный Todo List с Redux и аналитикой дедлайнов

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9.5-purple)](https://redux-toolkit.js.org)
[![date-fns](https://img.shields.io/badge/date--fns-2.30.0-green)](https://date-fns.org)

Менеджер задач с визуализацией сроков выполнения и сортировкой

![to_do_list](https://github.com/user-attachments/assets/06bd1a50-27fc-4215-a2bc-02938da26249)

## Ключевые особенности
- **Динамическая группировка задач** по датам выполнения
- **Умная цветовая индикация** дедлайнов:
  - 🔴 Просроченные
  - 🟣 Будущие
- **Трех-уровневая фильтрация**:
  - Все задачи
  - Активные
  - Завершенные
- **Детальная аналитика**:
  - Время создания и завершения
  - Автоматическое определение статуса
- **Оптимизированное управление состоянием** через Redux Toolkit

## Технологический стек
- **React** + **Redux Toolkit**
- **date-fns** для манипуляций с датами
- **Адаптивный UI** c Bootstrap

## Быстрый старт
1. Клонируйте репозиторий:
```bash
git clone https://github.com/ваш-логин/redux-todo-list.git
```
2.Установите зависимости:
``` bash
npm install
```
3. Запустите приложение
``` bash
npm run dev
```
## Структура компонентов
```
src/
├── store/               # Redux настройки
│   └── todoSlice.js     # Логика задач
├── components/
│   └── Todo.jsx         # Основной компонент
|   └── store.js
└── App.jsx              # Корневой компонент
```

## Основной функционал
1.Динамическое добавление задач
```
const handleAddTodo = () => {
  if (text && deadline) {
    dispatch(addTodo({ 
      text, 
      deadline,
      createdAt: new Date().toISOString()
    }));
  }
};
```
2. Сортировка
```
const groupedTodos = filteredTodos.reduce((acc, todo) => {
  const dateKey = format(parseISO(todo.deadline), 'yyyy-MM-dd');
  acc[dateKey] = [...(acc[dateKey] || []), todo];
  return acc;
}, {});
```
## Особенности реализации
- Оптимизированное хранилище:
  - Использование Redux Toolkit для эффективного управления состоянием
  - Мемоизация селекторов
  - Сериализуемые действия

- Безопасная работа с датами:
  - Валидация вводимых значений
  - Автоматический парсинг ISO-формата
  - Локализованный вывод дат

- Доступность:
  - Семантическая HTML-разметка
  - Клавиатурная навигация

## Ограничения и улучшения
  - Добавить drag-and-drop сортировку
  - Реализовать синхронизацию с LocalStorage
  - Добавить категории задач
