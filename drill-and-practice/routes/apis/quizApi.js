import * as questionService from "../../services/questionService.js";
import * as topicController from "../controllers/topicController.js";
import * as answerService from "../../services/answerService.js";

const getRandomQuestion = async ({ response }) => {
    const topic = await topicController.selectRandomTopic(response);
    console.log("random topic", topic);
    const id = topic.id;
    const question = await questionService.selectRandomQuestion(id);
    console.log("random question", question);
    if (!question) {
        response.body = {};
    } else {
        const options = await answerService.getAnswerOptions(question.id);
        response.body = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: options.map(option => ({
                optionId: option.id,
                optionText: option.text
            }))
        };
    }
};

const answerQuestion = async ({ request, response }) => {
    console.log("request.body", request.body);
    const answer = await request.body().value;
    const is_correct = await answerService.getAnswerOption(answer.questionId).is_correct;

    if (is_correct) {
        response.body = { correct: true };
    }
    else {
        response.body = { correct: false };
    }
};



export { getRandomQuestion, answerQuestion };