export class Product {
    constructor(name, price, description, quantity) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    }

    static filter(productArray, statement) {
        const predicats = Product._parse(statement);
        return productArray.filter((product) => {
            return predicats.reduce((previosValue, predicat) => {
                return previosValue && predicat(product);
            }, true);
        });
    }

    static _parse(statement) {
        const tokens = statement.split('&');
        const predicats = [];
        const stringFilters = new Set([
            'contains',
            'starts',
            'ends',
        ]);

        const numberFilters = new Set([
            '>',
            '>=',
            '=',
            '<',
            '<=',
        ]); 
        // TODO: заменить на динамическое получение всех строковых свойств объекта 
        const stringFields = new Set([
            'name',
            'description',
        ]);

        // TODO: заменить на динамическое получение всех строковых свойств объекта 
        const numberFields = new Set([
            'price',
            'quantity',
        ]);
        

        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            const pattern = /[-]/;
            const atoms = token.split(pattern);
            if (atoms.length > 3 || atoms.length < 2) {
                throw new Error("Parse on atom's stage Error.\nToken: " + token + "\nAtoms: " + atoms);
            }
            // Условие для строковых свойств(name, description)
            // например: name-starts-fd
            if (atoms.length == 3) {
                const property = atoms[0];
                const stringFilter = atoms[1];
                const value = atoms[2];

                if (stringFields.has(property) == false) {
                    throw new Error("Parse on atom's stage Error.\nUndefined property: " + property + "\nAvailable properties: " + Array.from(stringFields).join(', '));
                }

                if (stringFilters.has(stringFilter) == false) {
                    throw new Error("Parse on atom's stage Error.\nUndefined filter: " + stringFilter + "\nAvailable filters: " + Array.from(stringFilters).join(', '));
                }


                switch (stringFilter) {
                    case 'contains':
                        {
                            predicats.push((product) => {
                                const prop = product[property].toString();
                                return prop.indexOf(value) != -1;
                            });
                            break;
                        }
                    case 'starts':
                        {
                            predicats.push((product) => {
                                const prop = product[property].toString();
                                return prop.startsWith(value)
                            });
                            break;
                        }
                    case 'ends':
                        {
                            predicats.push((product) => {
                                const prop = product[property].toString();
                                return prop.endsWith(value)
                            });
                            break;
                        }
                    default: {
                        throw new Error("Parse on atom's stage Error.\nUnexpected behavior with string filter on atoms: " + atoms + "]nGetting property-filter-value: "+ property + "-" + stringFilter + "-" + value);
                    }
                }
            }
            // Условие для числовых свойств(price, quantity)
            // например, price-=2
            if (atoms.length == 2) {
                const property = atoms[0].trim();
                if (numberFields.has(property) == false) {
                    throw new Error("Parse on atom's stage Error.\nUndefined property: " + property + "\nAvailable properties: " + Array.from(numberFields).join(', '));
                }

                let numberFilter, value;

                if (isNaN(parseInt(atoms[1][1]))) {
                    numberFilter = atoms[1][0] + atoms[1][1];
                    value = parseInt(atoms[1].slice(2));
                } else {
                    numberFilter = atoms[1][0];
                    value = parseInt(atoms[1].slice(1));
                }

                if (isNaN(value)) {
                    throw new Error("Parse on atom's stage Error.\nWrong statement: " + atoms[0] + "-" + atoms[1]);
                }

                if (numberFilters.has(numberFilter) == false) {
                    throw new Error("Parse on atom's stage Error.\nUndefined filter: " + atoms[0] + "\nAvailable filters: " + Array.from(stringFilters).join(', '));
                }

                switch (numberFilter) {
                    case '>':
                        {
                            predicats.push((product) => product[property] > value);
                            break;
                        }
                    case '>=':
                        {
                            predicats.push((product) => product[property] >= value);
                            break;
                        }
                    case '=':
                        {
                            predicats.push((product) => product[property] == value);
                            break;
                        }
                    case '<':
                        {
                            predicats.push((product) => product[property] < value);
                            break;
                        }
                    case '<=':
                        {
                            predicats.push((product) => product[property] <= value);
                            break;
                        }
                    default: {
                        throw new Error("Parse on atom's stage Error.\nUnexpected behavior with number filter on atoms: " + atoms + "]nGetting property-filter-value: "+ property + "-" + numberFilter + "-" + value);
                    }
                }
            }
        }
        return predicats;
    }

    toString() {
        return JSON.stringify(this);
    }
}
