import {sql} from "../database/database.js";

const topicCount = async () => {
    const rows = await sql`SELECT COUNT(*) FROM topics`;
    return rows[0].count;
}

const questionCount = async () => {
    const rows = await sql`SELECT COUNT(*) FROM questions`;
    return rows[0].count;
}

const answerCount = async () => {
    const rows = await sql`SELECT COUNT(*) FROM question_answers`;
    return rows[0].count;
}

export {topicCount, questionCount, answerCount};