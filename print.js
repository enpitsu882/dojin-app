'use strict'
const dojinApp = require('./index.js');

// add と list のテスト
dojinApp.add('参加費', -2000, 2, '2021-03-04');
dojinApp.add('移動費', -5000, 2, '2021-03-01');
dojinApp.add('秘封ガール', 1000, 5, '2021-05-04');
dojinApp.add('秘封ガール', 1000, 2, '2021-05-05');
console.log(dojinApp.list())

dojinApp.correct('参加費', -5000, 2, '2021-03-04');
console.log(dojinApp.list());

dojinApp.correct('焼肉代', 5000, 2, '2021-03-05')

console.log('テストが正常に完了しました');