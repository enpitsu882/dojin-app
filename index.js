'use strict'

// key: 収支の名前
// value: 収支データのオブジェクト{ amount: 金額, num: 個数, date: 日付 }
const itemDataMap = new Map();
let totalAmount = 0;

/**
 * 収支を追加する
 * @param {string} itemName
 * @param {number} amount
 * @param {number} num
 * @param {string} date
 */
function add(itemName, amount, num, date) {
    totalAmount += amount * num;
    const value = { amount: amount, num: num, date: date };
    itemDataMap.set(itemName, value);
}

/**
 * 収支のリストを取得する
 * @return {array}
 */
function list() {
    const itemData = Array.from(itemDataMap);
    const output = itemData.map(([key, value]) => {
        return `name: ${key}, amount: ${value.amount}, num: ${value.num}, date: ${value.date}`;
    });
    output.push(`total: ${totalAmount}`);
    return output
}

/**
 * 特定の収支を修正する
 * @param {string} itemName
 * @param {number} amount
 * @param {number} num
 * @param {string} date
 * @return {array}
 */
function correct(itemName, amount, num, date) {
    if (itemDataMap.has(itemName)) {
        let value = itemDataMap.get(itemName);
        totalAmount -= value.amount * value.num;
        totalAmount += amount * num;
        value = { amount: amount, num: num, date: date };
        itemDataMap.set(itemName, value);
    } else {
        return `${itemName}は登録されていません`;
    }
}

/**
 * 特定の収支を削除する
 * @param {string} itemName
 * @return {array}
 */
function del(itemName) {
    if (itemDataMap.has(itemName)) {
        let value = itemDataMap.get(itemName);
        totalAmount -= value.amount * value.num;
        itemDataMap.delete(itemName);
    } else {
        return `${itemName}は登録されていません`;
    }
}

module.exports = { add, list, correct, del };