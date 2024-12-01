import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (date) => {
    const data = { date };
    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { "--date": date }).push();
    });
};

const makeCommits = (weeks) => {
    if (weeks === 0) return;

    const commitsInWeek = random.int(6, 10);

    for (let i = 0; i < commitsInWeek; i++) {
        const day = random.int(0, 6);

        const date = moment()
            .subtract(1, "y")
            .add(1, "d")
            .add(weeks, "w")
            .add(day, "d")
            .format();

        console.log(`Коммит на дату: ${date}`);
        markCommit(date);
    }

    setTimeout(() => makeCommits(weeks - 1), 1000);
};

makeCommits(52);
