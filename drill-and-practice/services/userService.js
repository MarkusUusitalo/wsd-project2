import { sql } from "../database/database.js";
import { bcrypt } from "../deps.js";

const addUser = async (email, password) => {
    await sql`INSERT INTO users (email, password) VALUES (${email}, ${password})`;
}

const deleteUser = async (email, password) => {
    await sql`DELETE FROM users WHERE email = ${email} AND password = ${password}`;
}

const listUsers = async () => {
    const rows = await sql`SELECT * FROM users`;
    return rows;
}

const authenticate = async (email, password) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = rows[0];
    if (user) {
        const hash = user.password;
        const passwordCorrect = await bcrypt.compare(password, hash);
        if (passwordCorrect) {
            return user;
        }
    } 
    return null;
}

const findUser = async ( email ) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    return rows;

}

export{ addUser, deleteUser, listUsers, authenticate, findUser };