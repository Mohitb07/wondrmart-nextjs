export const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
