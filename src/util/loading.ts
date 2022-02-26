export const sleep = (fn: Function, time: number) => {
  setTimeout(() => {
    fn();
  }, time);
};
