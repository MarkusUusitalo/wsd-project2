import { sql } from "../database/database.js";

const deleteAnswerOption = async (id) => {
    await deleteAnswer(id);
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;

}

const deleteAllAnswersOfQuestion = async (question_id) => {
    await sql`DELETE FROM question_answer_options WHERE question_id = ${question_id}`;
}

const getAnswerOptions = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
}

const getAnswerOption = async (id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
    return rows[0];
}

const addAnswerOption = async (question_id, option_text, is_correct ) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${question_id}, ${option_text}, ${is_correct})`;
}

const getCorrectAnswer = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id} AND is_correct = true`;
    if (rows.length > 0) {
        return rows[0];
    }
    else{
        return 0;
    }
}

const deleteAnswer = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${id}`;

}

export { deleteAnswerOption, deleteAllAnswersOfQuestion, getAnswerOptions, addAnswerOption, getCorrectAnswer, getAnswerOption, deleteAnswer }