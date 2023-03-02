import { Product } from "./index.js";

function demo(productsObjs, filterForProducts) {
    const products = productsObjs.map((objProduct) => {
        return new Product(
            objProduct.name,
            objProduct.price,
            objProduct.description,
            objProduct.quantity,
        );
    });
    
    const filteredProducts = Product.filter(products, filterForProducts);

    console.log("Products: " + products);
    console.log("Filter: " + filterForProducts);
    console.log("Result: " + filteredProducts);
    console.log();
}

const productObjsArray1 = [
    {
        name: 'Toy',
        price: 123,
        description: 'Just toy',
        quantity: 12,
    },
    {
        name: 'Yo Sweater',
        price: 1000,
        description: 'Warm siberian sweater',
        quantity: 3,
    },
    {
        name: 'Toy YoYo',
        price: 70,
        description: 'Time killer and even weapon:)',
        quantity: 200,
    },
];
const filterForProducts1Number1 = 'name-contains-Toy&price->=70';
const filterForProducts1Number2 = filterForProducts1Number1 + '&quantity-<100';

const productObjsArray2 = [
    {
        name: 'Beerg',
        price: 100,
        description: 'Good German Beer',
        quantity: 12,
    },
    {
        name: 'Bbeer',
        price: 40,
        description: 'Bad German Beer',
        quantity: 122,
    },
    {
        name: 'Lager',
        price: 160,
        description: 'Good German Beer',
        quantity: 7,
    },
    {
        name: 'Whiskey',
        price: 1200,
        description: 'Scotland Classic Whiskey',
        quantity: 12,
    },
    {
        name: 'Scotch',
        price: 2000,
        description: 'Just perfect',
        quantity: 5,
    },
];
const filterForProducts2 = 'description-starts-Good&description-ends-Beer&price->100'; 

demo(productObjsArray1, filterForProducts1Number1);
demo(productObjsArray1, filterForProducts1Number2);
demo(productObjsArray2, filterForProducts2);
