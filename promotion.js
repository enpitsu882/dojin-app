'use strict'
const dojinApp = require('./index.js');
const assert = require('assert');

// add と list のテスト
dojinApp.add('参加費', 2000, 1, '2021-03-04');
dojinApp.add('移動費', 5000, 1, '2021-03-01');
dojinApp.add('秘封ガール', 1000, 5, '2021-05-04');
assert.deepStrictEqual(
    dojinApp.list(),
    [
        'name: 参加費, amount: 2000, num: 1, date: 2021-03-04',
        'name: 移動費, amount: 5000, num: 1, date: 2021-03-01',
        'name: 秘封ガール, amount: 1000, num: 5, date: 2021-05-04',
        'total: 12000'
    ]
)
console.log("dojinApp.add('参加費', 2000, 1, '2021-03-04');")
console.log("dojinApp.add('移動費', 5000, 1, '2021-03-01');")
console.log("dojinApp.add('秘封ガール', 1000, 5, '2021-05-04');")
console.log("dojinApp.list();")
console.log(dojinApp.list())

// correct のテスト（修正先が存在する）
dojinApp.correct('参加費', 5000, 2, '2021-03-04');
assert.deepStrictEqual(
    dojinApp.list(),
    [
        'name: 参加費, amount: 5000, num: 2, date: 2021-03-04',
        'name: 移動費, amount: 5000, num: 1, date: 2021-03-01',
        'name: 秘封ガール, amount: 1000, num: 5, date: 2021-05-04',
        'total: 20000'
    ]
)
console.log("dojinApp.correct('参加費', 5000, 2, '2021-03-04');")
console.log("dojinApp.list();")
console.log(dojinApp.list())

// correct のテスト（修正先が存在しない）
assert.deepStrictEqual(
    dojinApp.correct('焼肉代', 5000, 2, '2021-03-05'),
    `焼肉代は登録されていません`
)
console.log("dojinApp.correct('焼肉代', 5000, 2, '2021-03-05');")
console.log(dojinApp.correct('焼肉代', 5000, 2, '2021-03-05'))


// del のテスト（削除先が存在する）
dojinApp.del('参加費');
dojinApp.del('移動費');
dojinApp.del('秘封ガール');
assert.deepStrictEqual(dojinApp.list(), ['total: 0']);
console.log("dojinApp.del('参加費');")
console.log("dojinApp.del('移動費');")
console.log("dojinApp.del('秘封ガール');")
console.log("dojinApp.list();")
console.log(dojinApp.list())

// del のテスト（削除先が存在しない）
assert.deepStrictEqual(
    dojinApp.del('参加費'),
    `参加費は登録されていません`
)
console.log("dojinApp.del('参加費');")
console.log(dojinApp.del('参加費'))

console.log('テストが正常に完了しました');