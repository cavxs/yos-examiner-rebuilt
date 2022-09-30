import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLastQuestionAt = async (book, subject, topic, lastQAt) => {
  // lastQAt is a [testNo, qNo]
  // this is for requesting questions from the server, which means it does get the last solved whether it was right or not.
  await AsyncStorage.setItem(
    "lastQuestionAT/" + book + "/" + subject + "/" + topic,
    lastQAt
  );
};

export const getLastQuestionAt = async (book, subject, topic, success) => {
  // lastQAt is a [testNo, qNo]
  success(
    await AsyncStorage.getItem(
      "lastQuestionAT/" + book + "/" + subject + "/" + topic
    )
  );
};

export const setSolvedQuestionNo = async (
  book,
  subject,
  topic,
  solved,
  success = () => {}
) => {
  // the number of correctly solved questions to increase the value of progress on each topic
  const item = "solvedQNo/" + book + "/" + subject + "/" + topic;
  console.log("Storage: setting", item, "to", solved);
  await AsyncStorage.setItem(item, solved)
    .then(console.log("yayyoyo"))
    .catch((err) => console.error(err));
};

export const getSolvedQNo = async (book, subject, topic, success) => {
  const item = "solvedQNo/" + book + "/" + subject + "/" + topic;
  console.log("Storage: getting", item);
  await AsyncStorage.getItem(item).then(success);
};

export const setWrongQuestions = async (book, subject, topic, wrongQ) => {
  // Setting the wrong questions in a topic to an array. A question will be stored as tXXqYY
  const item = "wrongQuestions/" + book + "/" + subject + "/" + topic;
  await AsyncStorage.setItem(item, JSON.stringify(wrongQ));
};

export const getWrongQuestions = async (book, subject, topic, success) => {
  // Getting the wrong questions in a topic.
  const item = "wrongQuestions/" + book + "/" + subject + "/" + topic;
  return await AsyncStorage.getItem(item).then(success);
};

export const questionNameToArray = (qName) => {
  return [Number(qName.slice(1, 3)), Number(qName.slice(4, 6))];
};

export const clearStorage = async (all = true, callback = () => void 0) => {
  console.log("clearing storage");
  if (all) {
    await AsyncStorage.clear();
    callback();
  }
};
