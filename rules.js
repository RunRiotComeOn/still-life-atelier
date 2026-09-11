(function(root){
const uniq=a=>new Set(a).size===a.length;
const mono=a=>a.every((v,i)=>!i||v>a[i-1])||a.every((v,i)=>!i||v<a[i-1]);
const rows=a=>[a.slice(0,3),a.slice(3,6),a.slice(6,9)];
const cols=a=>[0,1,2].map(c=>[a[c],a[c+3],a[c+6]]);
const same=a=>new Set(a).size===1;
const attrs=a=>({c:a.map(v=>Math.floor(v/3)),s:a.map(v=>v%3)});
const latin=a=>{const{c,s}=attrs(a);return [...rows(c),...cols(c),...rows(s),...cols(s)].every(uniq)};
const lengths=[3,6,1,5,2,4],marks=[4,1,5,2,6,3];
const checks=[
 a=>[mono(a),mono(a.map(v=>lengths[v])),mono(a.map(v=>marks[v]))],
 a=>{const{c,s}=attrs(a);return [rows(c).every(same)&&cols(s).every(same),rows(s).every(same)&&cols(c).every(same),latin(a)]},
 a=>{const p=a.map(v=>Math.floor(v/2));const adjacent=[0,1].some(off=>[0,2,4,6].every(i=>p[(i+off)%8]===p[(i+off+1)%8]));const opposite=[0,1,2,3].every(i=>p[i]===p[i+4]);const size=a.map(v=>[2,7,0,5,3,6,1,4][v]);const circular=[1,7].some(step=>size.every((v,i)=>i===0||v===(size[i-1]+step)%8));return [adjacent,opposite,circular]},
 a=>{const n=a.map(v=>[2,7,4,9,1,6,5,3,8][v]);const magic=[...rows(n),...cols(n),[n[0],n[4],n[8]],[n[2],n[4],n[6]]].every(row=>row.reduce((x,y)=>x+y,0)===15);return[a.every((v,i)=>v===i),mono(n),magic]},
 a=>{const snake=[0,1,2,5,4,3,6,7,8].map(i=>a[i]);return[mono(snake),a[4]===4&&a[0]===0&&[0,1,2,3].every(i=>a[i]+a[8-i]===8),latin(a)&&a[4]===4]}
];
function check(level,a){if(!Array.isArray(a)||a.length!==(level===0?6:level===2?8:9)||!uniq(a)||a.some(v=>!Number.isInteger(v)||v<0||v>=a.length))return[false,false,false];return checks[level](a)}
root.PuzzleRules={check,lengths,marks,latin};if(typeof module!=='undefined')module.exports=root.PuzzleRules;
})(typeof window==='undefined'?globalThis:window);



