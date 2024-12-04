# Коллекция Postman, содержащая все запросы (просто импортировать)
https://api.postman.com/collections/38809726-8a5385fc-d9c9-40f8-b580-31afe77f45db?access_key=PMAT-01JE7PERJQ35FEYXZJJBQ749PE
# Миграции
- Для миграции: npx sequelize-cli db:migrate
- Для отката миграции: npx sequelize-cli db:migrate:undo:all
# На сервере прописан сидинг, чтобы заполнить базу данных 50ю записями
- Для его вызова - npx sequelize-cli db:seed:all
- Для отката сидинга - npx sequelize-cli db:seed:undo:all
