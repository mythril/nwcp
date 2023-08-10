let enabled = import.meta.env.DEV;

const debugPojo = {
  enable: {
    writable: false,
    configurable: false,
    value: () => {
      enabled = true;
    }
  },
  disable: {
    writable: false,
    configurable: false,
    value: () => {
      enabled = false;
    }
  },
  isEnabled: {
    writable: false,
    configurable: false,
    value: () => {
      return enabled;
    }
  }
};

const debugProto = Object.create(console, debugPojo);

const handler = {
  get(target: typeof debugProto, prop: symbol | string) {
    const field =
      prop in target ? target[prop as keyof typeof target] : undefined;
    if (
      !enabled &&
      !Object.prototype.hasOwnProperty.call(debugPojo, prop.toString())
    ) {
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

const debug = new Proxy(debugProto, handler);

export default debug;
