import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  render("main.eta", {topicCount: await statisticsService.topicCount(), questionCount: await statisticsService.questionCount(), answerCount: await statisticsService.answerCount()});
};

export { showMain };
