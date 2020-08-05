import { config, mockData, sleep } from "./helpers";

export const getData = async () => {
  await sleep(1000);
  return { data: mockData, config };
};
