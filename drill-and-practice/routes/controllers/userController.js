import * as userService from "../../services/userService.js";

import { bcrypt } from "../../deps.js";

const showRegistrationForm = ({ render }) => {
    render("register.eta");
};

const showLoginForm = ({ render }) => {
    render("login.eta");
};

const userLogin = async ({ request, response, state }) => {
    const bodyResult = request.body({ type: "form" });
    const formData = await bodyResult.value;
    const email = formData.get("email");
    const password = formData.get("password");
    const userFromDatabase = await userService.findUser(email);
    if (userFromDatabase.length != 1) {
        console.log("user not found");
        response.redirect("/");
        return;
    }

    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        response.redirect("/auth/login"); 
        return;
    }

    await state.session.set("user", user);
    response.redirect("/topics");
};

const registerUser = async ({ request, response, render }) => {
    const bodyResult = await request.body({ type: "form" });
    const formData = await bodyResult.value;
    const rows = await userService.findUser(formData.get("email"));
    
    if (rows.length > 0) {
        render("register.eta", { error: "The email is already reserved." });
        return;
    }
    else {
        
        await userService.addUser(
            formData.get("email"),
            await bcrypt.hash(formData.get("password"))
        );

        response.redirect("/auth/login");
    }

};

const listUsers = async ({ render }) => {

    render("users.eta", { users: await userService.listUsers() });
  };

export { showRegistrationForm, registerUser, listUsers, showLoginForm, userLogin };