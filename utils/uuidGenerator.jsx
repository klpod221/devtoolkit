import { v1, v3, v4, v5, v6, v7 } from "uuid";

const uuidGenerator = (version, options) => {
  const quantity = options.quantity || 1;

  switch (version) {
    case 1:
      return [...Array(quantity)].map(() => v1());

    case 3:
      return [...Array(quantity)].map(() =>
        v3(options.name, options.namespace)
      );

    case 4:
      return [...Array(quantity)].map(() => v4());

    case 5:
      return [...Array(quantity)].map(() =>
        v5(options.name, options.namespace)
      );

    case 6:
      return [...Array(quantity)].map(() => v6());

    case 7:
      return [...Array(quantity)].map(() => v7());
  }
};

export default uuidGenerator;
