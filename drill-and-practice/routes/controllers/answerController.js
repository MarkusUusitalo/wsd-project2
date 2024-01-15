import * as answerService from '../../services/answerService.js';

const addAnswer = async ({ request, response, state, params }) => {
    const body = request.body({ type: "form" });
    const bodyValues = await body.value;

    const user = await state.session.get("user");
    await answerService.addAnswerOption(params.qId, bodyValues.get('option_text'), bodyValues.get('is_correct') === "on");

    response.redirect('/topics/' + params.id + "/questions/" + params.qId);
}

const deleteAnswerOption = async ({ params, response }) => {
    const oId = params.oId;
    await answerService.deleteAnswer(oId);
    await answerService.deleteAnswerOption(oId);
    response.redirect('/topics/' + params.id + "/questions/" + params.qId);
}

export {addAnswer, deleteAnswerOption}