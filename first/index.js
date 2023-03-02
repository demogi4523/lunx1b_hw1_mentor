// Преобразование строки к нижнему регистру, но первая буква большая. "Abscd"

/**
 * Just capitlize input string
 * @param {string} s - input string
 */
export function capitalize(s) {
  const firstSymbol = s.charAt(0);
  const restString = s.slice(1);

  return firstSymbol.toUpperCase() + restString.toLowerCase();
}

// Преобразование строки с целью правильно расстановки пробелов.
// "Вот пример строки,в которой используются знаки препинания.
// После знаков должны стоять пробелы , а перед знаками их быть не должно .
// Если есть лишние подряд идущие пробелы, они должны быть устранены."
//  => "Вот пример строки,в которой используются знаки препинания.
// После знаков должны стоять пробелы, а перед знаками их быть не должно.
// Если есть лишние подряд идущие пробелы, они должны быть устранены."

/**
 *                                      // TODO: add funcion description
 * @param {string} text - input string
 */
export function text_pretty(text) {
  const punctuationMarksPattern = /[,.!?:;-]/ig;
  const punctuationMarkRGX = [...text.matchAll(punctuationMarksPattern)].reverse();
  const sentences = [];
  let sentenceEnd = text.length - 1;

  for (let index = 0; index < punctuationMarkRGX.length; index++) {
    const punctuationMarkIndex = punctuationMarkRGX[index].index;
    const punctuationMark = punctuationMarkRGX[index][0];

    const oldSentence = text.slice(punctuationMarkIndex, sentenceEnd);
    sentences.push(punctuationMark + ' ' + oldSentence.trim().slice(1));
    sentenceEnd = punctuationMarkIndex;
  }
  const oldSentence = text.slice(0, sentenceEnd);
  sentences.push(oldSentence.trimEnd());

  return sentences.reverse().join('').replaceAll('  ', ' ');
}

// Посдчитывающие кол-во слов в строке.

/**
 * Just count words amount in the input string
 * @param {string} s - input string
 */
export function words_count(s) {
  const word_pattern = /\w+/ig; // word regexp
  const words = [...s.matchAll(word_pattern)];

  return words.length;
}

// Подсчитывающий, уникальные слова.
// "Текст, в котором слово текст несколько раз встречается и слово тоже" - в ответе,
// что "слово - 2 раза, текст - 2 раза, в - 1 раз, несколько - 1 раз".
// Самостоятельно придумать наиболее удачную структуру данных для ответа.

/**
 * Just count words amount in the input string
 * @param {string} text - input string
 * @returns {object}
 */
export function get_unique_words(text, ignoreCase=true) {
  const word_pattern = /\w+/ig; // word regexp
  const words = [...text.matchAll(word_pattern)];
  const answer = {};

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index][0];
    const internal_form = ignoreCase ? word.toUpperCase() : word;

    if (answer.hasOwnProperty(internal_form)) {
      answer[internal_form] += 1;
    } else {
      answer[internal_form] = 1;
    }
  }

  return JSON.stringify(answer);
}
