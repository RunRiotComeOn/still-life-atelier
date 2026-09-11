(function(root){
const uniq=a=>new Set(a).size===a.length;
const mono=a=>a.every((v,i)=>!i||v>a[i-1])||a.every((v,i)=>!i||v<a[i-1]);
const rows=a=>[a.slice(0,3),a.slice(3,6),a.slice(6,9)];
const cols=a=>[0,1,2].map(c=>[a[c],a[c+3],a[c+6]]);
const same=a=>new Set(a).size===1;
const attrs=a=>({c:a.map(v=>Math.floor(v/3)),s:a.map(v=>v%3)});
const latin=a=>{const{c,s}=attrs(a);return [...rows(c),...cols(c),...rows(s),...cols(s)].every(uniq)};
const lengths=[3,6,1,5,2,4];
// Tile backs are connection diagrams: N=0, E=1, S=2, W=3.
const strokes=[[0,2],[1,2],[0,1],[0,3],[2,3],[],[1,3],[0,2],[1,3]];
const sizes=[2,0,1,0,1,2,1,2,0];
function neighbours(p){return [p>=3?p-3:-1,p%3<2?p+1:-1,p<6?p+3:-1,p%3>0?p-1:-1]}
function connection(a){const active=a.map((id,i)=>strokes[id].length?i:-1).filter(i=>i>=0);let ends=0;const graph=new Map(active.map(i=>[i,[]]));for(const p of active){const ns=neighbours(p);for(const d of strokes[a[p]]){const q=ns[d];if(q<0){ends++;continue}if(!strokes[a[q]].includes((d+2)%4))return[false,false];graph.get(p).push(q)}}const visited=new Set(),todo=[active[0]];while(todo.length){const p=todo.pop();if(visited.has(p))continue;visited.add(p);todo.push(...graph.get(p))}const unseen=new Set(active);let open=true;while(unseen.size){const todo=[unseen.values().next().value];let exits=0;while(todo.length){const p=todo.pop();if(!unseen.has(p))continue;unseen.delete(p);exits+=2-graph.get(p).length;todo.push(...graph.get(p))}if(exits!==2)open=false}return[visited.size===8&&ends===0,open&&ends>0]}
function connectedColors(a){return [0,1,2].every(c=>{const group=a.map((id,p)=>Math.floor(id/3)===c?p:-1).filter(p=>p>=0);const seen=new Set(),todo=[group[0]];while(todo.length){const p=todo.pop();if(seen.has(p))continue;seen.add(p);todo.push(...neighbours(p).filter(q=>group.includes(q)&&!seen.has(q)))}return seen.size===3})}
const checks=[
 a=>[mono(a),mono(a.map(v=>lengths[v]))],
 a=>{const{c,s}=attrs(a);return [rows(c).every(same)&&cols(s).every(same),rows(s).every(same)&&cols(c).every(same),latin(a)]},
 a=>{const p=a.map(v=>Math.floor(v/2));const adjacent=[0,1].some(off=>[0,2,4,6].every(i=>p[(i+off)%8]===p[(i+off+1)%8]));const opposite=[0,1,2,3].every(i=>p[i]===p[i+4]);const size=a.map(v=>[2,7,0,5,3,6,1,4][v]);const circular=[1,7].some(step=>size.every((v,i)=>i===0||v===(size[i-1]+step)%8));return [adjacent,opposite,circular]},
 a=>[a.every((v,i)=>v===i),...connection(a)],
 a=>{const stable=cols(a).every(col=>col.every((id,r)=>sizes[id]===r));const hollow=[0,3,6].every(p=>a[p]%3!==1&&a[p+2]%3!==1&&a[p]%3!==a[p+2]%3&&sizes[a[p]]===sizes[a[p+2]])&&[1,4,7].every(p=>a[p]%3===1);const garden=connectedColors(a)&&a.every((id,p)=>neighbours(p).filter(q=>q>=0).every(q=>a[q]%3!==id%3));return[stable,hollow,garden]}
];
function check(level,a){if(!Array.isArray(a)||a.length!==(level===0?6:level===2?8:9)||!uniq(a)||a.some(v=>!Number.isInteger(v)||v<0||v>=a.length))return Array(level===0?2:3).fill(false);return checks[level](a)}
root.PuzzleRules={check,lengths,latin,strokes,sizes,connection};if(typeof module!=='undefined')module.exports=root.PuzzleRules;
})(typeof window==='undefined'?globalThis:window);




