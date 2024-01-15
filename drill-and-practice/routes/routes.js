import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as userController from "./controllers/userController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as quizApi from "./apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/users", userController.listUsers);

router.get("/auth/register", userController.showRegistrationForm);
router.post("/auth/register", userController.registerUser);

router.get("/auth/login", userController.showLoginForm);
router.post("/auth/login", userController.userLogin);

router.post("/topics", topicController.addTopic);
router.get("/topics", topicController.listTopics);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.get("/topics/:id", topicController.showTopic);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.showQuestion);
router.post("/topics/:id/questions/:qId/options", answerController.addAnswer);
router.post("/topics/:id/questions/:qId/options/:oId/delete", answerController.deleteAnswerOption);
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);

router.get("/quiz", questionController.showQuizTopics);
router.get("/quiz/:tId", questionController.randomQuestionByTopic);
router.get("/quiz/:tId/questions/:qId", questionController.showQuiz);
router.post("/quiz/:tId/questions/:qId/options/:oId", questionController.addQuestionAnswerByUser);
router.get("/quiz/:tId/questions/:qId/correct", questionController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", questionController.showIncorrect);

router.get("/api/questions/random", quizApi.getRandomQuestion);
router.post("/api/questions/answer", quizApi.answerQuestion);

export { router };
