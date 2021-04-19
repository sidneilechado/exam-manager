# Exam Manager API

## How to run the project
* Clone the git repo
* You can either use docker-compose or local (I kept a free Postgres on `ormconfig` for the sake of it being easier to test)
* If you want to run locally, run `npm install` then `npm run dev`
* If you want to use docker-compose, run `docker-compose up --build`
* Default URL should be http://exam-manager.localhost:3000/

## Documentation
* You can find it on `url/api/documentation` e.g (http://exam-manager.localhost:3000/api/documentation), it uses Swagger and OpenAPI.
* You can also use the Postman collection I created for the easeness of testing (https://documenter.getpostman.com/view/15371096/TzJsfdvr)

## Some business rules to consider
* There are no limits to the creation of exams, they can have the same name, description, etc.
* For questions I made some validations, you can't create options with the same key or value, so if any is duplicated, it will fail.
* You have two ways to insert options into a question, one per time or through modifying the whole question.
