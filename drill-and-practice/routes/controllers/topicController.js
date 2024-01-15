import * as topicService from "../../services/topicService.js";

import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const addTopic = async ({ request, response, state, render }) => {
    const user = await state.session.get("user");
    if (!user || !user.admin) {
      render("topics.eta", { topics: await topicService.listTopics(), user: user , error: "Only admins can add topics." });
      return;
    }

    const body = request.body({ type: "form" });
    const params = await body.value;
    console.log(params.get("name"));
    const rows = await topicService.findTopic(params.get("name"));
    console.log(rows);
    if (rows.length > 0) {
        
        render("topics.eta", { topics: await topicService.listTopics(), user: user , error: "Topic already exists." });
        return;
    }
    await topicService.addTopic(params.get("name"), user.id);
    response.redirect("/topics");
};

async function listTopics({ render, state }) {
    
    const user = state.session.get("user");
    render("topics.eta", { topics: await topicService.listTopics(), user: user });

};

const deleteTopic = async ({ params, response, state }) => {
    const user = await state.session.get("user");
    if (!user || !user.admin) {
      response.redirect("/topics");
      return;
    }
    await answerService.deleteAnswer(params.id)
    await answerService.deleteAnswerOption(params.id);
    await questionService.deleteAllQuestionsOFTopic(params.id);
    await topicService.deleteTopic(params.id);
    response.redirect("/topics");
};

const showTopic = async ({ params, render }) => {
    render("topic.eta", {topic: await topicService.getTopic(params.id), questions: await questionService.getQuestions(params.id)});
};

const selectRandomTopic = async ({response}) => {
    const topics = await topicService.listTopics();
    if (topics.length > 0) {
        const randomIndex = Math.floor(Math.random() * topics.length);
        const topic = topics[randomIndex];
        return topic
    }
    else {
        response.body = { error: "No topics available." };
        response.status = 404; 
    }
};

export { addTopic, listTopics, deleteTopic, showTopic, selectRandomTopic };