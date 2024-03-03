declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    joinWithWord: (word: string) => string;
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.joinWithWord = function (this: string[], word: string): string {
  return joinWithWord(this, word);
};

export function joinWithWord(array: string[], word: string): string {
  if (array.length === 0) {
    return "";
  } else if (array.length === 1) {
    return array[0];
  } else if (array.length === 2) {
    return array.join(` ${word} `);
  } else {
    const last = array.pop();
    return `${array.join(", ")} ${word} ${last}`;
  }
}

export function uppercaseStringProperties(obj: unknown): unknown {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, value.toUpperCase()];
    }
    return [key, value];
  });

  return Object.fromEntries(entries);
}
