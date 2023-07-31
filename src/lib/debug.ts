const development = import.meta.env.DEV;

const handler = {
  get(target: typeof console, prop: symbol | string) {
    const field =
      prop in target ? target[prop as keyof typeof target] : undefined;
    if (!development) {
      return () => {
        //noop
      };
    }
    if (field === undefined) {
      return undefined;
    }
    return field;
  }
};

const debug = new Proxy(console, handler);

export default debug;
