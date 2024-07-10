import { vi, describe, expect, test, beforeEach, afterAll } from 'vitest'

const path = require('path');
const ScoreCounter = require('score-tests');

const testSuiteName = 'ShoppingCart Tests';
const scoresDir = path.join(__dirname, '..', '..', '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  test('ShoppingCart.js exports a ShoppingCart class', async () => {
    // we have to do this weird import statement like this because
    // 1. we want to reset the module import every time
    // 2. ShoppingCart is a default export
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const item = new ShoppingCart(); ``
    expect(item instanceof ShoppingCart).toBe(true);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('Instances of ShoppingCart have the correct instance properties. Private properties are not accessible.', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');
    const cart = new ShoppingCart();
    const cartPropertyNames = Object.getOwnPropertyNames(cart);
    expect(cartPropertyNames).toEqual(['id'])

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('Instances of ShoppingCart have unique, ascending ids, starting with 1', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const cart1 = new ShoppingCart();
    const cart2 = new ShoppingCart();
    const cart3 = new ShoppingCart();

    expect(cart1).toEqual({ id: 1 })
    expect(cart2).toEqual({ id: 2 })
    expect(cart3).toEqual({ id: 3 })

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('cart.createItem instantiates and returns a new CartItem', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');
    const { default: CartItem } = await import('./CartItem');

    const cart = new ShoppingCart();
    const itemName = 'apple';
    const itemPrice = 5;
    const newItem = cart.createItem(itemName, itemPrice);
    console.log(newItem);

    expect(newItem instanceof CartItem).toBe(true);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('cart.getItems() returns an array of all cart items', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const cart = new ShoppingCart();
    const item1 = cart.createItem('a', 1);
    const item2 = cart.createItem('b', 2);
    const item3 = cart.createItem('c', 3);

    const allItems = cart.getItems();
    expect(allItems.length).toBe(3);
    expect(allItems[0]).toBe(item1);
    expect(allItems[1]).toBe(item2);
    expect(allItems[2]).toBe(item3);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('cart.getItems() returns a copy of the private cart items array', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');
    const { default: CartItem } = await import('./CartItem');

    const cart = new ShoppingCart();
    cart.createItem('a', 1);
    cart.createItem('b', 2);
    cart.createItem('c', 3);

    // get the array of items. it should be a copy
    const allItems = cart.getItems();

    // manually push a new value into the copy
    allItems.push(new CartItem('d', 4));

    // when we get the items again, it should not include
    // the added item
    const allItemsAgain = cart.getItems();
    expect(allItemsAgain.length).toBe(3);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('cart.getTotal() returns the sum of all cart item prices', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const cart = new ShoppingCart();
    cart.createItem('a', 1);
    cart.createItem('b', 2);
    cart.createItem('c', 3);
    expect(cart.getTotal()).toBe(6);

    const anotherCart = new ShoppingCart();
    anotherCart.createItem('a', 5);
    anotherCart.createItem('b', 5);
    anotherCart.createItem('c', 5);

    expect(anotherCart.getTotal()).toBe(15);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('cart.removeItem() removes a cart item by id', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const cart = new ShoppingCart();
    const item1 = cart.createItem('a', 1);
    const item2 = cart.createItem('b', 2);
    const item3 = cart.createItem('c', 3);



    // removing item2 using its id
    cart.removeItem(item2.id);
    expect(cart.getItems().length).toBe(2);

    const foundItem = cart.getItems().find((item) => item.id === item2.id);
    expect(foundItem).toBe(undefined);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('ShoppingCart has a static listAll method', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const classMethods = Object.getOwnPropertyNames(ShoppingCart);

    expect(classMethods.includes('listAll')).toBeTruthy();
    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('ShoppingCart.listAll() returns a list of all instances of ShoppingCart', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const cart1 = new ShoppingCart();
    const cart2 = new ShoppingCart();
    const cart3 = new ShoppingCart();

    const allCarts = ShoppingCart.listAll();
    expect(allCarts.length).toBe(3);

    expect(allCarts.includes(cart1)).toBeTruthy();
    expect(allCarts.includes(cart2)).toBeTruthy();
    expect(allCarts.includes(cart3)).toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('ShoppingCart.listAll() returns a copy of the private list of carts, not the original', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');

    const cart1 = new ShoppingCart();
    const cart2 = new ShoppingCart();
    const cart3 = new ShoppingCart();

    // get the carts. this should be a copy
    const allCarts = ShoppingCart.listAll();

    // if we add a random object to the copy it shouldn't 
    // effect the private original list of all carts
    const randomObj = {};
    allCarts.push(randomObj)

    const allCartsAgain = ShoppingCart.listAll();
    expect(allCartsAgain.length).toBe(3);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  test('ShoppingCart.findBy returns the correct cart when given an id', async () => {
    const { default: ShoppingCart } = await import('./ShoppingCart');


    const cart1 = new ShoppingCart();
    const cart2 = new ShoppingCart();
    const cart3 = new ShoppingCart();

    expect(ShoppingCart.findBy(cart1.id)).toBe(cart1);
    expect(ShoppingCart.findBy(cart2.id)).toBe(cart2);
    expect(ShoppingCart.findBy(cart3.id)).toBe(cart3);
    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => {
    scoreCounter.add(expect);
    vi.resetModules();
  })
  afterAll(scoreCounter.export);
})