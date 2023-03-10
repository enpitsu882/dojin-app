'use strict'
const assert = require('assert');

// テストの前にjsonファイルを削除する
const fs = require('fs');
fs.unlinkSync('./itemData.json');
const dojinApp = require('./index.js');

// add と list のテスト
dojinApp.add('参加費', -2000, 2, '2021-03-04');
dojinApp.add('移動費', -5000, 2, '2021-03-01');
dojinApp.add('秘封ガール', 1000, 5, '2021-05-04');
dojinApp.add('秘封ガール', 1000, 2, '2021-05-05');
assert.deepStrictEqual(
    dojinApp.list(),
    [
        [
            { name: '参加費', amount: -2000, num: 2, date: '2021-03-04' },
            { name: '移動費', amount: -5000, num: 2, date: '2021-03-01' },
            { name: '秘封ガール', amount: 1000, num: 5, date: '2021-05-04' }
        ],
        'total: -9000'
    ]
)

// correct のテスト（修正先が存在する）
dojinApp.correct('参加費', -5000, 2, '2021-03-04');
assert.deepStrictEqual(
    dojinApp.list(),
    [
        [
          { name: '参加費', amount: -5000, num: 2, date: '2021-03-04' },
          { name: '移動費', amount: -5000, num: 2, date: '2021-03-01' },
          { name: '秘封ガール', amount: 1000, num: 5, date: '2021-05-04' }
        ],
        'total: -15000'
    ]
)

// correct のテスト（修正先が存在しない）
dojinApp.correct('焼肉代', 5000, 2, '2021-03-05');
assert.deepStrictEqual(
    dojinApp.list(),
    [
        [
          { name: '参加費', amount: -5000, num: 2, date: '2021-03-04' },
          { name: '移動費', amount: -5000, num: 2, date: '2021-03-01' },
          { name: '秘封ガール', amount: 1000, num: 5, date: '2021-05-04' }
        ],
        'total: -15000'
    ]
)

// del のテスト（削除先が存在する）
dojinApp.del('参加費');
dojinApp.del('移動費');
dojinApp.del('秘封ガール');
assert.deepStrictEqual(dojinApp.list(), [[], 'total: 0']);

// del のテスト（削除先が存在しない）
dojinApp.del('参加費');
assert.deepStrictEqual(dojinApp.list(), [[], 'total: 0']);

console.log('テストが正常に完了しました');