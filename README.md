# Project 2: Quiz app

This app is a quiz app that allows users to create quizzes and take quizzes created by other users. The app is running on adress:
https://wsd-project2-drillandpractice.onrender.com/


## How to run the app
run docker compose up --build in your terminal and open http://localhost:7777 in your browser

## How to run the tests
The tests are in e2e-playwright folder.
Tests can be run with command: docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf

## How to use the app
Main page shows links to topics and quizzes. These cannot be accessed without logging in. If a user is not logged in, they can only see the main page and the login and registeration pages. If a user is logged in, they can create new quizzes and topics, and take quizzes. Main page also has links to login and register. If a user registers, they are guided to the login page for logging in. 
After the user is logged in the topics page can be accessed. Only admins can add topcs to the page. Users can only click on the topics and add questions to the topics. Question answer options can also be added to the questions by clicking on the questions and filling a form. Quizz can be accessed from the main page. Quizz lets a user choose the topic after which a user is asked random questions of the topic.

ADMIN USER: username: admin@admin.com, password: 123456






