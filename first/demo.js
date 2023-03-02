import { capitalize, text_pretty, words_count, get_unique_words } from "./index.js";

const args = [];
process.argv.forEach(function (val) {
  args.push(val);
})


if (args[2] == 1) {
    const s1 = 'AsggWSFG';
    console.log("Before capitalize: " + s1);
    console.log("After capitalize: " + capitalize(s1));
    console.log();
    
    const s2 = 'asfgsg';
    console.log("Before capitalize: " + s2);
    console.log("After capitalize: " + capitalize(s2));
    console.log();

    const s3 = 'xzbFW';
    console.log("Before capitalize: " + s3);
    console.log("After capitalize: " + capitalize(s3));
    console.log();
}
if (args[2] == 2) {
    const text1 = 'I , Be .Happy?Now ! ';
    console.log("Before : " + text1);
    console.log("After : " + text_pretty(text1));
    console.log();
    
    const text2 = "I'd like you to meet Mr Mark Porter ,Miss Elizabeth Taylor ,Capt . ";
    console.log("Before : " + text2);
    console.log("After : " + text_pretty(text2));
    console.log();

    const text3 = 'Вот пример строки,в которой используются знаки препинания.После знаков должны стоять пробелы ,а перед знаками их быть не должно.Если есть лишние подряд идущие пробелы, они должны быть устранены.';
    console.log("Before : " + text3);
    console.log("After : " + text_pretty(text3));
    console.log();
}
if (args[2] == 3) {
    const text1 = 'I believe I can fly';
    console.log("Text: " + text1);
    console.log("Words: " + words_count(text1));
    console.log();
    
    const text2 = 'Excuse me, Sir!';
    console.log("Text: " + text2);
    console.log("Words: " + words_count(text2));
    console.log();

    const text3 = 'Lalaland is perfect now';
    console.log("Text: " + text3);
    console.log("Words: " + words_count(text3));
    console.log();
}
if (args[2] == 4) {
    const text1 = 'Beer Whiskey Vodka Absent Coffee Beer Beer Whiskey coffee';
    console.log("Text: " + text1);
    console.log("Unique words: " + get_unique_words(text1));
    console.log();
    
    const text2 = 'apple, lemon, pineapple, apple';
    console.log("Text: " + text2);
    console.log("Unique words: " + get_unique_words(text2));
    console.log();

    const text3 = 'Trunc manc manc trunc gg gg hh gg';
    console.log("Text: " + text3);
    console.log("Unique words: " + get_unique_words(text3));
    console.log();
}

const availableOptions = new Set(["1", "2", "3", "4"]);
if (availableOptions.has(args[2]) == false) {
    console.log("Error: available tasks is: " + Array.from(availableOptions).join(', '))
}