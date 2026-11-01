// Countdown to Christmas - v2
(()=>{
const $=s=>document.querySelector(s),pad=n=>String(n).padStart(2,"0");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let AC;const ac=()=>{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();return AC};
const COL=["#ff3b57","#ffcf5c","#12d6a0","#cfe9ff"],PENTA=[784,880,988,1175,1319,1568];
const sp=[];
const burst=(x,y,n=26)=>{if(reduce)return;for(let i=0;i<n;i++){const a=Math.random()*6.283,v=n>1?1+Math.random()*4.5:Math.random()*.8;sp.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(n>1?1.5:0),l:1,c:COL[i%4],r:2+Math.random()*2.5})}if(sp.length>400)sp.splice(0,sp.length-400)};
const ding=f=>{try{const c=ac(),t=c.currentTime;[[f,.22],[f*2.76,.07]].forEach(([fr,v])=>{const o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=fr;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+1.8);o.connect(g).connect(c.destination);o.start(t);o.stop(t+1.8)})}catch(e){}};
/* ---- Countdown ---- */
const target=()=>{const n=new Date(),y=n.getFullYear();return n>=new Date(y,11,26)?new Date(y+1,11,25):new Date(y,11,25)};
const prev={},d=$("#d");
const set=(id,v)=>{const e=$("#"+id);if(e&&prev[id]!==v){e.textContent=v;if(prev[id]!==undefined){e.classList.remove("pop");void e.offsetWidth;e.classList.add("pop")}prev[id]=v}};
const bar=p=>{$("#bar").style.width=p+"%";$("#pct").textContent=Math.round(p)+"% of the way to Christmas"};
function tick(){
 if(!d)return;const n=new Date(),t=target();
 if(n.getMonth()===11&&n.getDate()===25){set("d","🎄");$("#lbl").textContent="Merry Christmas!";["h","m","s"].forEach(i=>set(i,"00"));bar(100);document.title="🎄 Merry Christmas!";return}
 const s=Math.floor((t-n)/1000),dd=Math.floor(s/86400),st=new Date(t.getFullYear(),10,1);
 set("d",dd);$("#lbl").textContent=dd===1?"day until Christmas":"days until Christmas";
 set("h",pad(Math.floor(s%86400/3600)));set("m",pad(Math.floor(s%3600/60)));set("s",pad(s%60));
 bar(Math.max(0,Math.min(100,(n-st)/(t-st)*100)));
 document.title="🎄 "+dd+" day"+(dd===1?"":"s")+" until Christmas";
}
tick();setInterval(tick,1000);
/* ---- Advent ---- */
const facts=["“Silent Night” was first performed on Christmas Eve 1818 in Oberndorf, Austria.","Candy canes are often traced back to 17th-century Germany.","Poinsettias are native to Mexico.","Rudolph was created in 1939 as a giveaway for the Montgomery Ward store.","The first artificial trees were made in Germany from dyed goose feathers.","“Jingle Bells” was published in 1857 under the title “One Horse Open Sleigh”.","In Iceland, 13 Yule Lads visit children over the 13 nights before Christmas.","Santa Claus is inspired by Saint Nicholas, a bishop known for his generosity.","The first commercial Christmas card was printed in London in 1843.","In Japan, a bucket of fried chicken has become a Christmas Eve tradition.","Tinsel was originally made from real silver.","In Catalonia, children “feed” a log called Caga Tió until Christmas.","Eggnog traces back to medieval Britain.","In Norway, people hide their brooms on Christmas Eve.","Evergreen wreaths stand for life continuing through winter.","Printed Advent calendars appeared in Germany in the early 1900s.","“Xmas” uses X, the Greek letter chi, first letter of “Christos”.","Kissing under mistletoe is an English custom from the 18th century.","Gingerbread houses became popular after the Brothers Grimm’s Hansel and Gretel.","In the Philippines, Christmas music starts as early as September.","Santa’s sleigh would need to travel faster than light to reach every home in one night.","“Silent Night” is the most recorded Christmas song in history.","In Ukraine, spider-web ornaments on the tree are said to bring luck.","Christmas became a US federal holiday in 1870."];
const adv=$("#advent");
if(adv){
 const n=new Date(),y=n.getFullYear(),dec=n.getMonth()===11,today=dec?n.getDate():(n>=new Date(y,11,26)?31:0),rev=$("#reveal"),g=$("#garland");
 let saved=[];try{saved=JSON.parse(localStorage.getItem("adv"+y)||"[]")}catch(e){}
 const opened=new Set(saved);
 for(let i=1;i<=24;i++){
  const b=document.createElement("button");b.className="door"+(i>today?" locked":"")+(opened.has(i)?" open":"");b.textContent=i;b.setAttribute("aria-label","Door "+i);
  b.onclick=()=>{
   if(i>today){b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);rev.textContent="Door "+i+" opens on December "+i+".";return}
   const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,36);ding(PENTA[i%6]);
   b.classList.add("open");opened.add(i);try{localStorage.setItem("adv"+y,JSON.stringify([...opened]))}catch(e){}
   rev.textContent="December "+i+" — "+facts[i-1];
  };
  adv.append(b);
  const l=document.createElement("i");l.className="bulb"+(i<=today?" on":"");g.append(l);
 }
 $("#cap").textContent=today?Math.min(today,24)+" of 24 lights on":"The garland lights up one bulb a day from December 1.";
}
/* ---- Baubles ---- */
document.querySelectorAll(".bauble").forEach((b,i)=>{
 b.onclick=()=>{const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,34);ding(PENTA[i%6]);b.classList.remove("ring");void b.offsetWidth;b.classList.add("ring")};
 b.onanimationend=e=>{if(e.animationName==="ring")b.classList.remove("ring")};
});
/* ---- Tree ---- */
const lg=$("#lights");
if(lg){
 const tiers=[[30,105,52],[70,155,60],[115,215,75]];
 for(let i=0;i<20;i++){
  const[ay,by,hw]=tiers[i%3],y=ay+18+Math.random()*(by-ay-26),w=hw*(y-ay)/(by-ay),x=100+(Math.random()*2-1)*(w-8);
  const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx",x.toFixed(1));c.setAttribute("cy",y.toFixed(1));c.setAttribute("r",4.5);c.setAttribute("class","lt");
  c.dataset.k=i%4;c.style.fill=COL[i%4];c.style.animationDelay=(Math.random()*-2)+"s";
  c.onclick=()=>{const k=(+c.dataset.k+1)%4;c.dataset.k=k;c.style.fill=COL[k];ding(PENTA[Math.floor(Math.random()*6)]);const r=c.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,12)};
  lg.append(c);
 }
 $("#star").onclick=e=>{const r=e.target.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,60);ding(1568)};
}
/* ---- Santa ---- */
const santa=$("#santa"),fly=()=>{if(!santa||reduce)return;santa.classList.remove("fly");void santa.offsetWidth;santa.classList.add("fly")};
if(santa){$("#fly").onclick=fly;setTimeout(fly,9000);setInterval(fly,60000)}
/* ---- Secret Santa ---- */
const dr=$("#draw");
if(dr)dr.onclick=()=>{
 const names=[...new Set($("#names").value.split(/\n|,/).map(s=>s.trim()).filter(Boolean))],out=$("#pairs");out.textContent="";
 if(names.length<3){out.textContent="Add at least 3 different names, one per line.";return}
 let r;do{r=[...names];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}}while(r.some((x,i)=>x===names[i]));
 names.forEach((nm,i)=>{const b=document.createElement("button");b.className="pair";b.textContent=nm+" draws…";
  b.onclick=()=>{const o=b.dataset.o==="1";b.dataset.o=o?"0":"1";b.textContent=o?nm+" draws…":nm+" → "+r[i];if(!o){const q=b.getBoundingClientRect();burst(q.left+q.width/2,q.top+q.height/2,20);ding(PENTA[i%6])}};
  out.append(b)});
};
/* ---- Games ---- */
const mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e};
const gc=$("#gift");
if(gc){
 const W=400,H=500,dpr=Math.min(devicePixelRatio||1,2),g=gc.getContext("2d"),ov=$("#gov"),ot=$("#got"),hud=$("#ghud");
 gc.width=W*dpr;gc.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);
 let items=[],px=W/2,score=0,lives=5,run=false,last=0,spawn=0,best=0;const keys={};
 try{best=+localStorage.getItem("giftbest")||0}catch(e){}
 const hp=()=>{hud.textContent="Score "+score+"   Lives "+"♥".repeat(Math.max(0,lives))+"   Best "+Math.max(best,score)};
 const pos=(x,y)=>{const r=gc.getBoundingClientRect();return[r.left+x/W*r.width,r.top+y/H*r.height]};
 const end=()=>{run=false;if(score>best){best=score;try{localStorage.setItem("giftbest",best)}catch(e){}}
  ot.textContent="Game over — "+score+" point"+(score===1?"":"s")+". Best: "+best+".";$("#gbtn").textContent="Play again";ov.hidden=false;hp()};
 const frame=t=>{
  if(!run)return;
  const dt=Math.min(.05,(t-last)/1000);last=t;
  px=Math.max(46,Math.min(W-46,px+((keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0))*420*dt));
  spawn-=dt;
  if(spawn<=0){spawn=Math.max(.34,.9-score*.012);const r=Math.random();items.push({x:22+Math.random()*(W-44),y:-20,v:(130+Math.min(score,70)*4)*(.85+Math.random()*.3),t:r<.15?2:r<.21?1:0})}
  g.clearRect(0,0,W,H);g.textAlign="center";g.font="30px serif";
  for(let i=items.length-1;i>=0;i--){
   const it=items[i];it.y+=it.v*dt;
   if(it.y>H-66&&it.y<H-34&&Math.abs(it.x-px)<46){
    items.splice(i,1);const[a,b]=pos(it.x,it.y);
    if(it.t===2){lives--;ding(165);burst(a,b,14)}else{score+=it.t?3:1;ding(PENTA[score%6]);burst(a,b,10)}
    continue}
   if(it.y>H+20){items.splice(i,1);if(it.t===0)lives--;continue}
   if(it.t===2){g.fillStyle="#1a1a1a";g.beginPath();g.arc(it.x,it.y,14,0,6.3);g.fill();g.fillStyle="rgba(255,255,255,.3)";g.beginPath();g.arc(it.x-5,it.y-5,4,0,6.3);g.fill()}
   else g.fillText(it.t?"⭐":"🎁",it.x,it.y+10);
  }
  g.fillStyle="#ff3b57";g.beginPath();g.moveTo(px-46,H-66);g.lineTo(px+46,H-66);g.lineTo(px+34,H-30);g.lineTo(px-34,H-30);g.closePath();g.fill();
  g.fillStyle="#cfe9ff";g.fillRect(px-42,H-60,84,6);g.fillRect(px-38,H-44,76,6);
  hp();
  if(lives<=0)return end();
  requestAnimationFrame(frame)};
 $("#gbtn").onclick=()=>{items=[];score=0;lives=5;spawn=.4;px=W/2;ov.hidden=true;run=true;last=performance.now();requestAnimationFrame(frame)};
 const mv=e=>{const r=gc.getBoundingClientRect();px=(e.clientX-r.left)/r.width*W};
 gc.addEventListener("pointermove",mv);gc.addEventListener("pointerdown",mv);
 addEventListener("keydown",e=>{if(run&&(e.key==="ArrowLeft"||e.key==="ArrowRight")){keys[e.key]=true;e.preventDefault()}});
 addEventListener("keyup",e=>{keys[e.key]=false});
 hp();
}
const qz=$("#quiz");
if(qz){
 const Q=[["Where was “Silent Night” first performed, on Christmas Eve 1818?",["Vienna","Oberndorf, Austria","Munich","Bethlehem"],1,"It premiered in a small church in Oberndorf, near Salzburg."],
 ["In which year was Rudolph the Red-Nosed Reindeer created?",["1919","1939","1959","1979"],1,"Rudolph was created in 1939 for the Montgomery Ward department store."],
 ["Which country is the poinsettia native to?",["Brazil","Mexico","Spain","India"],1,"Poinsettias grow wild in Mexico."],
 ["Which saint inspired Santa Claus?",["Saint Peter","Saint Francis","Saint Nicholas","Saint George"],2,"Saint Nicholas was a bishop known for his generosity."],
 ["Where was the first commercial Christmas card printed, in 1843?",["London","New York","Berlin","Paris"],0,"It was commissioned in London by Sir Henry Cole."],
 ["Which food is a famous Christmas Eve tradition in Japan?",["Sushi","Fried chicken","Ramen","Tempura"],1,"A bucket of fried chicken has become a Christmas tradition there."],
 ["How many Yule Lads visit children in Iceland?",["7","9","13","24"],2,"One arrives each night during the 13 nights before Christmas."],
 ["Where does the X in “Xmas” come from?",["A cross shape","The Greek letter chi","The Roman numeral ten","A printing error"],1,"Chi is the first letter of “Christos” in Greek."],
 ["Under what title was “Jingle Bells” first published in 1857?",["One Horse Open Sleigh","Sleigh Ride","The Merry Bells","Winter Wonderland"],0,"The song first appeared as “One Horse Open Sleigh”."],
 ["What were the first artificial Christmas trees in Germany made from?",["Plastic","Dyed goose feathers","Paper","Tin"],1,"They were made of goose feathers dyed green."]];
 let list,i,sc;
 const show=()=>{qz.textContent="";
  if(i>=list.length){
   qz.append(mk("p","qn","Final score"),mk("p","score",sc+" / "+list.length),mk("p","qq",sc>=9?"Santa’s chief elf!":sc>=7?"Festive expert!":sc>=4?"Good Christmas spirit!":"Time to read the Christmas story!"));
   const row=mk("div","row");row.style.justifyContent="flex-start";
   const again=mk("button","btn solid","Play again");again.onclick=start;
   const cp=mk("button","btn","Copy my score");cp.onclick=()=>{try{navigator.clipboard.writeText("I scored "+sc+"/"+list.length+" on the Christmas quiz! "+location.href.split("#")[0]+"#games").then(()=>cp.textContent="Copied ✓")}catch(e){}};
   row.append(again,cp);qz.append(row);if(sc>=7)burst(innerWidth/2,innerHeight/3,60);return}
  const[q,o,a,f]=list[i],opts=o.map((t,k)=>[t,k===a]).sort(()=>Math.random()-.5);
  qz.append(mk("p","qn","Question "+(i+1)+" of "+list.length+" · Score "+sc),mk("p","qq",q));
  opts.forEach(([t,ok])=>{const b=mk("button","opt",t);b.dataset.ok=ok?1:0;
   b.onclick=()=>{
    qz.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.ok==="1")x.classList.add("ok")});
    if(ok){sc++;ding(PENTA[3+i%3]);const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,24)}else{b.classList.add("bad");ding(196)}
    qz.append(mk("p","fact",f));
    const n=mk("button","btn solid",i+1>=list.length?"See my score":"Next question");n.style.marginTop="1rem";n.onclick=()=>{i++;show()};qz.append(n);n.focus({preventScroll:true})};
   qz.append(b)});
 };
 const start=()=>{list=[...Q].sort(()=>Math.random()-.5);i=0;sc=0;show()};
 start();
}
/* ---- Share ---- */
const sh=$("#share");
if(sh)sh.onclick=()=>{const u=location.href.split("#")[0];
 if(navigator.share)navigator.share({title:document.title,url:u}).catch(()=>{});
 else try{navigator.clipboard.writeText(u).then(()=>sh.textContent="Link copied ✓")}catch(e){}};
/* ---- Snow + sparkles ---- */
const c=$("#snow");
if(c&&!reduce){
 const x=c.getContext("2d");let W,H,wind=0,tw=0;const f=[];
 const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener("resize",rs);
 for(let i=0;i<Math.min(170,Math.floor(innerWidth/8));i++)f.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2.8+.6,v:Math.random()*.8+.3,p:Math.random()*6});
 addEventListener("pointermove",e=>{tw=(e.clientX/innerWidth-.5)*3;if(Math.random()<.45)burst(e.clientX,e.clientY,1)});
 addEventListener("pointerdown",e=>{if(!e.target.closest("button,a,textarea"))burst(e.clientX,e.clientY,18)});
 (function loop(){
  x.clearRect(0,0,W,H);wind+=(tw-wind)*.03;
  for(const s of f){s.p+=.01;s.y+=s.v+s.r*.2;s.x+=Math.sin(s.p)*.4+wind*s.r*.4;
   if(s.y>H){s.y=-5;s.x=Math.random()*W}if(s.x>W+5)s.x=-5;if(s.x<-5)s.x=W+5;
   x.fillStyle="rgba(255,255,255,.18)";x.beginPath();x.arc(s.x,s.y,s.r*2,0,6.3);x.fill();
   x.fillStyle="rgba(255,255,255,.9)";x.beginPath();x.arc(s.x,s.y,s.r,0,6.3);x.fill()}
  for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.08;p.vx*=.98;p.l-=.022;
   if(p.l<=0){sp.splice(i,1);continue}
   x.globalAlpha=p.l;x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.r*p.l,0,6.3);x.fill()}
  x.globalAlpha=1;requestAnimationFrame(loop)})();
}
/* ---- Music ---- */
const mb=$("#music");
if(mb){
 let timer,mg,on=false;
 const E=659,G=784,C=523,D=587,F=698;
 const song=[[E,1],[E,1],[E,2],[E,1],[E,1],[E,2],[E,1],[G,1],[C,1.5],[D,.5],[E,4],[F,1],[F,1],[F,1.5],[F,.5],[F,1],[E,1],[E,1],[E,.5],[E,.5],[E,1],[D,1],[D,1],[E,1],[D,2],[G,2]];
 const play=()=>{const c=ac();let t=c.currentTime+.05;const u=.28;
  for(const[fr,l]of song){const o=c.createOscillator(),g=c.createGain();o.type="triangle";o.frequency.value=fr;
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+l*u);
   o.connect(g).connect(mg);o.start(t);o.stop(t+l*u);t+=l*u}
  timer=setTimeout(play,(t-c.currentTime+1.2)*1000)};
 mb.onclick=()=>{on=!on;mb.setAttribute("aria-pressed",on);mb.textContent=on?"🔔 Music on":"🔔 Music off";
  if(on){mg=ac().createGain();mg.connect(AC.destination);play()}else{clearTimeout(timer);mg&&mg.disconnect()}};
}
})();
