// 2.Написать модуль, который способен выполнять операции с числами любой длины.
// Методы для сложения, умножения, вычитания и деления.
export class BiggyNumber{
    // val is string
    constructor(val) {
        this._input = val;
        this.val = this._init(this._input);
        // this.fixed_length = 15; // Number.MAX_SAFE_INTEGER.length - 1
        this.fixed_length = 2;
        
    }

    // val is string
    _init(val) {
        const res = [];
        const reverse_val = val.split('').reverse().join('');
        // const fixed_length = 15;
        const fixed_length = 2;
        let val_length = val.length;
        let start = 0;

        while (start < val_length) {
            const s = reverse_val.slice(start, start + fixed_length);
            const rev_s = s.split('').reverse().join('');
            res.push(rev_s);
            start += fixed_length;
        }
        return res.reverse();
    }

    _get_length() {
        return Math.ceil(this._input.length / this.fixed_length);
    }

    add(otherBiggyNumber) {
        if (this._get_length() > otherBiggyNumber._get_length()) {
            return otherBiggyNumber.add(this);
        }

        const res = [];

        let reminder = 0;
        let currentGroupIndex = 1;
        const len = this._get_length();
        const otherLen = otherBiggyNumber._get_length();
        const coMultiplier = Math.pow(10, this.fixed_length);

        while (len >= currentGroupIndex) {
            const currentGroup = this.val[len - currentGroupIndex];
            const currentOtherGroup = otherBiggyNumber.val[otherLen - currentGroupIndex];
            const groupSumInt = parseInt(currentGroup) + parseInt(currentOtherGroup) + reminder;
            
            let currentResGroup = groupSumInt.toString();
            if (currentResGroup > coMultiplier) {
                reminder = 1;
                currentResGroup -= coMultiplier;
            }
            res.push(currentResGroup.toString());

            currentGroupIndex += 1;
        }

        for (let index = currentGroupIndex; index <= otherLen; index++) {
            const group = otherBiggyNumber.val[otherLen - index];
            res.push((parseInt(group) + reminder).toString());
            reminder = 0;
        }
        res.reverse();
        const q = res.join('');
        // console.log(q);
        return new BiggyNumber(q);
    }

    subtract(otherBiggyNumber) {
        
    }
    
    multiply(otherBiggyNumber) {

    }

    divide(otherBiggyNumber) {

    }

    valueOf() {

    }

    toString() {
        // console.log(this.val);
        return this.val.join('');
    }
}