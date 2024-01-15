import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";

const deleteQuestion = async ({ request, response }) => {
    const body = request.body({ type: "form"});
    const params = await body.value;

    await questionService.deleteQuestion(params.get("question_id"));
    response.redirect("/topics/" + params.get("topic_id"));

}
 
const deleteAllQuestionsOFTopic = async ({ request, response }) => {
    const body = request.body({ type: "form"});
    const params = await body.value;

    await questionService.deleteAllQuestionsOFTopic(params.get("topic_id"));

}
const addQuestion = async({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await questionService.addQuestion(params.get("user_id"), params.get("topic_id"), params.get("question_text"));
    console.log(params.get("topic_id"));
    response.redirect("/topics/" + params.get("topic_id"));
}

const showQuestion = async ({ params, render }) => {
    const topicId = params.id;
    const questionId = params.qId;

    const question = await questionService.getQuestion(questionId);
    const options = await answerService.getAnswerOptions(questionId);

    await render("question.eta", { question, options });
}

const randomQuestionByTopic = async ({ params, response, render }) => {

    const topicId = params.tId;
    const questions = await questionService.getQuestions(topicId);
    
    if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];

        response.redirect(`/quiz/${topicId}/questions/${question.id}`);
    }
    else {
        
        render("quizTopics.eta", { topics: await topicService.listTopics(), error: "No questions yet of this topic" });
        // response.redirect(`/topics/${topicId}`);
    }
}

const showQuiz = async ({ params, render }) => {
    await render("quiz.eta", { question: await questionService.getQuestion(params.qId), options: await answerService.getAnswerOptions(params.qId), topicId: params.tId })

}

const showQuizTopics = async ({ render }) => {
    await render("quizTopics.eta", { topics: await topicService.listTopics() });
}

const addQuestionAnswerByUser = async ({ params, response, state }) => {
    const user = await state.session.get("user");
    const userId = 1;
    
    await questionService.addQuestionAnswerByUser(userId, params.qId, params.oId);
    const option = await answerService.getAnswerOption(params.oId);

    if (option.is_correct) {
        response.redirect("/quiz/" + params.tId + "/questions/" + params.qId + "/correct");
    }

    else {
        response.redirect("/quiz/" + params.tId + "/questions/" + params.qId + "/incorrect");
    }
    
}

const showCorrect = async ({ params, render }) => {
    await render("correct.eta",{ topic: await topicService.getTopic(params.tId) });
} 

const showIncorrect = async ({ params, render }) => {
    const correctAnswerObject = await answerService.getCorrectAnswer(params.qId);
    let correctAnswerText;

    if (correctAnswerObject) {
        correctAnswerText = correctAnswerObject.option_text;
    } else {
        correctAnswerText = "No correct answer available";
    }

    await render("incorrect.eta", { 
        topic: await topicService.getTopic(params.tId), 
        correctAnswer: correctAnswerText 
    });
}


export { deleteQuestion, deleteAllQuestionsOFTopic, addQuestion, showQuestion, randomQuestionByTopic, showQuiz, showQuizTopics, addQuestionAnswerByUser, showCorrect, showIncorrect } 