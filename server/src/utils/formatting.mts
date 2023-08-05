declare global {
  interface Array<T> {
    joinWithWord(word: string): string;
  }
}

Array.prototype.joinWithWord = function (word: string): string {
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
