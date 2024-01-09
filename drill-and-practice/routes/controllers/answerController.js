import * as answerService from '../../services/answerService.js';

const addAnswer = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    await answerService.addAnswerOption(params.get('question_id'), params.get('option_text'), params.get('is_correct') === "on");

    response.redirect('/topics/' + params.get('topic_id') + "/questions/" + params.get('question_id'));
}

const deleteAnswerOption = async ({ params, request, response }) => {
    const body = request.body({ type: "form" });
    const vals = await body.value;
    const oId = params.oId;
    await answerService.deleteAnswer(oId);
    await answerService.deleteAnswerOption(oId);
    response.redirect('/topics/' + vals.get('topic_id') + "/questions/" + vals.get('question_id'));
}

export {addAnswer, deleteAnswerOption}