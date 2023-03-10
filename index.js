'use strict'

// { name: 名前, amount: 金額, num: 個数, date: 日付 }
let itemData = [];
let totalAmount = 0;
const fs = require('fs');
const fileName = './itemData.json';

// 同期的にファイルから復元
try {
    const data = fs.readFileSync(fileName, 'utf8');
    itemData = JSON.parse(data);
} catch (err) {
    console.log(`${fileName}から復元できませんでした`);
}

/**
 * 収支をファイルに保存する
 */
const saveItemData = () => {
    fs.writeFileSync(fileName, JSON.stringify(itemData), 'utf8');
}

/**
 * 収支を追加する
 * @param {string} name
 * @param {number} amount
 * @param {number} num
 * @param {string} date
 */
const add = (name, amount, num, date) => {
    const indexFound = itemData.findIndex(itemData => itemData.name === name);
    if (indexFound !== -1) {
        console.log(`${name}は既に登録されています`);
    } else {
        totalAmount += amount * num;
        const value = { name: name, amount: amount, num: num, date: date };
        itemData.push(value);
        console.log(`${name}を登録しました`);
        saveItemData();
    }
}

/**
 * 収支のリストを取得する
 * @return {array}
 */
const list = () => {
    return [itemData, `total: ${totalAmount}`]
}

/**
 * 特定の収支を修正する
 * @param {string} name
 * @param {number} amount
 * @param {number} num
 * @param {string} date
 */
const correct = (name, amount, num, date) => {
    const indexFound = itemData.findIndex(itemData => itemData.name === name);
    if (indexFound !== -1) {
        const newValue = { name: name, amount: amount, num: num, date: date };
        totalAmount -= itemData[indexFound].amount * itemData[indexFound].num;
        totalAmount += newValue.amount * newValue.num;
        itemData[indexFound] = newValue;
        console.log(`${name}を修正しました`);
        saveItemData();
    } else {
        console.log(`${name}は登録されていません`)
    }
}

/**
 * 特定の収支を削除する
 * @param {string} name
 * @return {array}
 */
const del = (name) => {
    const indexFound = itemData.findIndex(itemData => itemData.name === name);
    if (indexFound !== -1) {
        totalAmount -= itemData[indexFound].amount * itemData[indexFound].num;
        itemData.splice(indexFound, 1);
        console.log(`${name}を削除しました`);
        saveItemData();
    } else {
        console.log(`${name}は登録されていません`);
    }
}

module.exports = { add, list, correct, del };