import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIAZ7LLEYQJ3TT4D747",
  secretAccessKey: "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",
  region: "us-east-1",
});

s3 = new AWS.S3();

const getAnswerData = (book, subject, topic, success) => {
  const objectParams = {
    Bucket: "yos-examination",
    Key: "YOS/" + book + "/" + subject + "/" + topic + "/answers",
  };
  console.log(objectParams.Key);
  s3.getObject(objectParams, async (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      success(data.Body.toString("utf-8"));
    }
  });
};

const getAvailableTopics = (book, subject, success) => {
  const objectParams = {
    Bucket: "yos-examination",
    Key: "YOS/" + book + "/" + subject + "/topics.tpc",
  };
  s3.getObject(objectParams, async (err, data) => {
    console.log("received " + data.Body.toString("utf-8").split(/\r?\n/));
    if (err) {
      console.log(err, err.stack);
    } else {
      success(data.Body.toString("utf-8").split(/\r?\n/));
    }
  });
};

const getQuestionImgFromDatabase = (
  book,
  subject,
  topic,
  testFile,
  success
) => {
  const objectParams = {
    Bucket: "yos-examination",
    Key: "YOS/" + book + "/" + subject + "/" + topic + "/" + testFile,
  };
  console.log(topic, testFile);
  s3.getObject(objectParams, async (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      success(data.Body.toString("base64"));
    }
  });
};

const getQuestionAfterTheQuestion = (ques, ansdata) => {
  // ques is in the form [testNo from 1, quesNo from 1]
  const answerTable = ansdata.split(/\r?\n/);

  if (ques[0] <= answerTable.length) {
    // if the test is in the answer sheet
    if (ques[1] + 1 <= answerTable[ques[0] - 1].length) {
      // if the next question exists in the same test
      return {
        ques: [ques[0], ques[1] + 1],
        ans: answerTable[ques[0] - 1][ques[1] - 1],
      };
    } else {
      // the next question is in the next test possibly
      if (ques[0] + 1 <= answerTable.length) {
        // there is a next test
        return { ques: [ques[0] + 1, 1], ans: answerTable[ques[0]][0] };
      } else {
        // there is no next test :()
        return null;
      }
    }
  }
};

const getRandomQFromAnsData = (ansdata) => {
  const answerTable = ansdata.split(/\r?\n/);
  const NoOfAllQuestions = ansdata.length - (answerTable.length - 1) * 2; // - to remove the newline characters
  const randomQ = Math.floor(Math.random() * NoOfAllQuestions);

  let goneThrough = 0;
  for (let j = 0; j < answerTable.length; j++) {
    const l = randomQ - answerTable[j].length - goneThrough;
    if (l < 0) {
      // Formatted question, test as if you want to get it from the database start at 1 1
      const testQ = [randomQ - goneThrough + 1, j + 1];
      return { ques: testQ, ans: answerTable[j][randomQ - goneThrough] };
    }
    goneThrough += answerTable[j].length;
  }
};
// HERE

const getQuesFromArray = (ques, ansdata) => {
  const answerTable = ansdata.split(/\r?\n/);
  if (answerTable[ques[0] - 1]) {
    if (answerTable[ques[1] - 1]) {
      return {
        ques: [ques[0], ques[1]],
        ans: answerTable[ques[0] - 1][ques[1] - 1],
      };
    }
  }
};
const getQuestionsFromTopic = async (
  subject,
  topic,
  no = 1,
  fromQues = [1, 1],
  include = true,
  success
) => {
  const finalQuestions = [];
  // console.log()
  getAnswerData("Puza", subject, topic, async (ansData) => {
    let ques = null;
    if (include) {
      ques = getQuesFromArray(fromQues, ansData);
    } else {
      ques = getQuestionAfterTheQuestion(fromQues, ansData);
    }
    for (let i = 0; i < no; i++) {
      if (!ques) break;
      const testQFormat =
        "t" +
        ques.ques[0].toString().padStart(2, 0) +
        "q" +
        ques.ques[1].toString().padStart(2, 0) +
        ".jpg";

      console.log("getting", ques);

      await new Promise((res) =>
        getQuestionImgFromDatabase(
          "Puza",
          subject,
          topic,
          testQFormat,
          (imgdata) => {
            finalQuestions.push({
              subject: subject,
              topic: topic,
              name: testQFormat.slice(0, -4),
              ques: "data:image/jpeg;base64," + imgdata,
              ans: ques.ans,
            });
            res();
          }
        )
      );
      ques = getQuestionAfterTheQuestion(ques.ques, ansData);
    }
    success(finalQuestions);
  });
};

const getNumberOfQuestionsInTopic = (subject, topic, success) => {
  getAnswerData("Puza", subject, topic, async (ansData) => {
    const answerTable = ansData.split(/\r?\n/);
    const NoOfAllQuestions = ansData.length - (answerTable.length - 1) * 2;
    success(NoOfAllQuestions);
  });
};

const getQuestionsRTopics = async (Topics, No, success) => {
  const finalQuestions = []; // the final questionimg and answer array [ ques: "base64 data", ans: "A"]
  const topicQuestions = []; // stores stuff like ["Rational Numbers", "Rational Numbers", "Triangles", ...]
  for (i = 0; i < No; i++) {
    // Choose a random topic for each question from the topic list and add it to th exam
    const selt = Math.floor(Math.random() * Topics.length);
    topicQuestions.push(Topics[selt]);
  }
  const topicsAnswers = []; // stores things like {"Rational Numbers": "AAABCDDBC...", ...}
  for (t of Topics) {
    console.log(t);
    await new Promise((res) =>
      getAnswerData(t.name, (ansdata) => {
        topicsAnswers.push({ name: t.name, answers: ansdata });
        res();
      })
    );
  }

  for (t of topicQuestions) {
    const tAnswers = topicsAnswers.find((n) => n.name == t.name)["answers"];

    const ques = getRandomQFromAnsData(tAnswers);
    const testQFormat =
      "t" +
      ques.ques[1].toString().padStart(2, 0) +
      "q" +
      ques.ques[0].toString().padStart(2, 0) +
      ".jpg";

    await new Promise((res) =>
      getQuestionImgFromDatabase(t.name, testQFormat, (imgdata) => {
        finalQuestions.push({
          topic: t.name,
          ques: "data:image/jpeg;base64," + imgdata,
          ans: ques.ans,
        });
        res();
      })
    );
  }

  success(finalQuestions);
};

export default s3client = {
  getQuestionsFromTopic,
  getAvailableTopics,
  getNumberOfQuestionsInTopic,
};
