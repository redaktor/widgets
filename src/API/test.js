//var qw = require('qtypes');
var API = require('../../_build/API/base/Array/main').default;
var arr = new API([1,false,2,[3]]);
console.log(arr[-1]);
arr.intersection([1,2]).then(v => console.log(v.value));
//arr.filter((v) => !!v).count().then((x) => console.log( '::', x.value ));

//.then((a) => console.log('::',a.value))

//var fp = '/Users/sebi/Downloads/flasync-master/test/test';
//new API().sync.doAsync().write('hello').fromFile(fp).write('!!!').hello.subtext.hello;
//.doAsync().doSync().P.then((r) => console.log(r))
// console.log( )
//.then((r) => console.log(r))
