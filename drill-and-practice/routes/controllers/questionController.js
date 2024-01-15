import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";

const deleteQuestion = async ({ params, response }) => {

    await questionService.deleteQuestion(params.qId);
    response.redirect("/topics/" + params.id);

}
 
const deleteAllQuestionsOFTopic = async ({ params, response }) => {

    await questionService.deleteAllQuestionsOFTopic(params.id);
    

}
const addQuestion = async({ request, response, params, state }) => {
    const body = request.body({ type: "form" });
    const bodyValues = await body.value;
    
    const user = await state.session.get("user");
    await questionService.addQuestion(user.id, params.id, bodyValues.get("question_text"));
    console.log(params.id);
    response.redirect("/topics/" + params.id);
}

const showQuestion = async ({ params, render }) => {
    const topicId = params.id;
    const questionId = params.qId;

    const question = await questionService.getQuestion(questionId);
    const options = await answerService.getAnswerOptions(questionId);

    await render("question.eta", { question, options, topicId: topicId });
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
    const userId = user.id;
    
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