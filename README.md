# Бэкенд приложения для бронирования места на мероприятия

## Используемый стек

- Node JS,
- Express,
- Typescript,
- PostgreSQL,
- Prisma ORM 

## Запуск

1. Склонируйте проект `git clone https://github.com/brearey/kotelnikov.git`
2. Скопируйте `.env.example` в файл `.env`, заполните свои данные
3. Запустить базу данных postgres `docker compose up` (треубуется установленный docker)
4. Применить миграцию создания таблиц в БД `npx prisma migrate dev`
4. Запустить приложение `npm run dev`
5. Добавьте тестовые мероприятия в БД командой `npm run seed`

## Работа с API

> base url = http://localhost:5000/api

1. Эндпоинт GET `/health` проверяет работу приложения
2. Эндпоинт GET `/bookings` получить список всех бронирований для `user_id`
3. Эндпоинт POST `/bookings/reserve` создать бронирование для `user_id` на `event_id`
4. Эндпоинт GET `/events` получить список всех мероприятий
