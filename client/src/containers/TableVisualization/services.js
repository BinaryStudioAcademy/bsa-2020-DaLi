import mockData from "./mockData";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getData = async () => {
  await sleep(1000);
  return mockData;
};
