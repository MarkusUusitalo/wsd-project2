import { sql } from "../database/database.js";

const addTopic = async (name, user_id) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${user_id})`;
}

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name`;
    return rows;

}

const deleteTopic = async (id) => {
    
    await sql`DELETE FROM topics WHERE id = ${id}`;

}

const getTopic = async (id) => {
    const rows = await sql`SELECT * FROM topics WHERE id = ${id}`;
    return rows[0];
}

const findTopic = async (name) => {
    const rows = await sql`SELECT * FROM topics WHERE name = ${name}`;
    return rows;
}

export {addTopic, listTopics, deleteTopic, getTopic, findTopic} 