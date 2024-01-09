import { sql } from "../database/database.js";

const deleteQuestion = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${id}`;
}

const deleteAllQuestionsOFTopic = async (topic_id) => {
    await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topic_id})`;
    await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topic_id})`;
    await sql`DELETE FROM questions WHERE topic_id = ${topic_id}`;
    await sql`DELETE FROM topics WHERE id = ${topic_id}`;
}

const addQuestion = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${user_id}, ${topic_id}, ${question_text})`;
}

const getQuestion = async(id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return rows[0];

}
const getQuestions = async (topic_id) => {
    const rows  = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
    return rows;
}

const addQuestionAnswerByUser = async (user_id, question_id, answer_id) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${user_id}, ${question_id}, ${answer_id})`;
}

const selectRandomQuestion = async (topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id} ORDER BY RANDOM() LIMIT 1`;
    return rows[0];
}


export { deleteQuestion, deleteAllQuestionsOFTopic, addQuestion, getQuestions, getQuestion, addQuestionAnswerByUser, selectRandomQuestion }