var Ft=Object.defineProperty;var Kt=(i,t,n)=>t in i?Ft(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var d=(i,t,n)=>(Kt(i,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerpolicy&&(e.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?e.credentials="include":o.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(o){if(o.ep)return;o.ep=!0;const e=n(o);fetch(o.href,e)}})();function Ut(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var _t={exports:{}},G={exports:{}};(function(i,t){t=i.exports=n,t.getSerialize=s;function n(o,e,r,a){return JSON.stringify(o,s(e,a),r)}function s(o,e){var r=[],a=[];return e==null&&(e=function(l,c){return r[0]===c?"[Circular ~]":"[Circular ~."+a.slice(0,r.indexOf(c)).join(".")+"]"}),function(l,c){if(r.length>0){var h=r.indexOf(this);~h?r.splice(h+1):r.push(this),~h?a.splice(h,1/0,l):a.push(l),~r.indexOf(c)&&(c=e.call(this,l,c))}else r.push(c);return o==null?c:o.call(this,l,c)}}})(G,G.exports);var Dt=G.exports,jt=function(){var i=4022871197,t=function(n){if(n){n=n.toString();for(var s=0;s<n.length;s++){i+=n.charCodeAt(s);var o=.02519603282416938*i;i=o>>>0,o-=i,o*=i,i=o>>>0,o-=i,i+=o*4294967296}return(i>>>0)*23283064365386963e-26}else i=4022871197};return t},J=function(i){return function(){var t=48,n=1,s=t,o=new Array(t),e,r,a=0,l=new jt;for(e=0;e<t;e++)o[e]=l(Math.random());var c=function(){++s>=t&&(s=0);var f=1768863*o[s]+n*23283064365386963e-26;return o[s]=f-(n=f|0)},h=function(f){return Math.floor(f*(c()+(c()*2097152|0)*11102230246251565e-32))};h.string=function(f){var y,m="";for(y=0;y<f;y++)m+=String.fromCharCode(33+h(94));return m};var u=function(){var f=Array.prototype.slice.call(arguments);for(e=0;e<f.length;e++)for(r=0;r<t;r++)o[r]-=l(f[e]),o[r]<0&&(o[r]+=1)};return h.cleanString=function(f){return f=f.replace(/(^\s*)|(\s*$)/gi,""),f=f.replace(/[\x00-\x1F]/gi,""),f=f.replace(/\n /,`
`),f},h.hashString=function(f){for(f=h.cleanString(f),l(f),e=0;e<f.length;e++)for(a=f.charCodeAt(e),r=0;r<t;r++)o[r]-=l(a),o[r]<0&&(o[r]+=1)},h.seed=function(f){(typeof f>"u"||f===null)&&(f=Math.random()),typeof f!="string"&&(f=Dt(f,function(y,m){return typeof m=="function"?m.toString():m})),h.initState(),h.hashString(f)},h.addEntropy=function(){var f=[];for(e=0;e<arguments.length;e++)f.push(arguments[e]);u(a+++new Date().getTime()+f.join("")+Math.random())},h.initState=function(){for(l(),e=0;e<t;e++)o[e]=l(" ");n=1,s=t},h.done=function(){l=null},typeof i<"u"&&h.seed(i),h.range=function(f){return h(f)},h.random=function(){return h(Number.MAX_VALUE-1)/Number.MAX_VALUE},h.floatBetween=function(f,y){return h.random()*(y-f)+f},h.intBetween=function(f,y){return Math.floor(h.random()*(y-f+1))+f},h}()};J.create=function(i){return new J(i)};var Ht=J;const Vt=Ht;class Bt{constructor(t){this.p=new Uint8Array(512),this.seed(t)}gen(){}seed(t){const n=Vt.create(t||Math.random());for(let s=0;s<256;s++)this.p[s]=s;for(let s=0;s<256;s++){const o=n(256),e=this.p[s];this.p[s]=this.p[o],this.p[o]=e}for(let s=0;s<256;s++)this.p[s+256]=this.p[s]}transform(t){return((...s)=>t.apply(this,s)).bind(this)}octavate(...t){const n=t[0],s=t.slice(1);let o=0,e=0;for(let r=0;r<n;r++){const a=1<<r;o+=this.gen.apply(this,s.map(l=>l*a))/a}for(let r=0;r<n;r++)e+=1/(1<<r);return o/e}}var L=Bt;class st{constructor(t){this.x=t}dot(t){return this.x*t}}const nt=[new st(1),new st(-1)];function qt(i,t){return nt[i[t]%nt.length]}var Mt={grad1:qt};function bt(...i){const t=i.slice(1),n=i[0]-t.reduce((s,o)=>s+o*o,0);return n*n*n*n}function Wt(i,t,n){return i*(1-n)+t*n}function Xt(i){return i*i*i*(10+i*(-15+i*6))}const Zt=bt.bind(null,1),Yt=bt.bind(null,.5);var N={lerp:Wt,fade:Xt,cut1:Zt,cut:Yt};const Gt=L,{grad1:ot}=Mt,{cut1:it}=N;class Jt extends Gt{gen(t){const n=Math.floor(t)%256,s=t-n,o=it(s)*ot(this.p,n).dot(s),e=it(s-1)*ot(this.p,n+1).dot(s-1);return .5*(o+e)}}var Qt=Jt;class z{constructor(t,n){this.x=t,this.y=n}dot(t,n){return this.x*t+this.y*n}}const rt=[new z(1,0),new z(1,1),new z(0,1),new z(-1,1),new z(-1,0),new z(-1,-1),new z(0,-1),new z(1,-1)];function te(i,t,n){const s=i[t+i[n]]%rt.length;return rt[s]}const ee=.5*(Math.sqrt(3)-1),se=(3-Math.sqrt(3))/6;var kt={grad2:te,S2_TO_C:ee,C_TO_S2:se};const ne=L,{grad2:V,S2_TO_C:oe,C_TO_S2:F}=kt,{cut:B}=N;class ie extends ne{gen(t,n){const s=(t+n)*oe,o=Math.trunc(t+s),e=Math.trunc(n+s),r=(o+e)*F,a=o-r,l=e-r,c=t-a,h=n-l,u=c>h?1:0,f=c>h?0:1,y=c-u+F,m=h-f+F,$=c-1+2*F,S=h-1+2*F,b=B(c,h)*V(this.p,o,e).dot(c,h),C=B(y,m)*V(this.p,o+u,e+f).dot(y,m),H=B($,S)*V(this.p,o+1,e+1).dot($,S);return 70*(b+C+H)}}var re=ie;const ae=L,{grad1:at}=Mt,{lerp:ce,fade:le}=N;class he extends ae{gen(t){const n=Math.floor(t)%256,s=t-n,o=at(this.p,n).dot(s),e=at(this.p,n+1).dot(s-1);return ce(o,e,le(s))}}var de=he;const fe=L,{grad2:K}=kt,{fade:q,lerp:W}=N;class ue extends fe{gen(t,n){const s=Math.trunc(t)%256,o=Math.trunc(n)%256,e=t-s,r=n-o,a=K(this.p,s,o).dot(e,r),l=K(this.p,s+1,o).dot(e-1,r),c=K(this.p,s,o+1).dot(e,r-1),h=K(this.p,s+1,o+1).dot(e-1,r-1);return W(W(a,l,q(e)),W(c,h,q(e)),q(r))}}var pe=ue;class _{constructor(t,n,s){this.x=t,this.y=n,this.z=s}dot(t,n,s){return this.x*t+this.y*n+this.z*s}}const ct=[new _(1,1,1),new _(-1,1,1),new _(1,-1,1),new _(-1,-1,1),new _(1,1,0),new _(-1,1,0),new _(1,-1,0),new _(-1,-1,0),new _(1,1,-1),new _(-1,1,-1),new _(1,-1,-1),new _(-1,-1,-1)];function ge(i,t,n,s){const o=i[t+i[n+i[s]]]%ct.length;return ct[o]}var me={grad3:ge};const ye=L,{grad3:P}=me,{fade:X,lerp:E}=N;class we extends ye{gen(t,n,s){const o=Math.trunc(t)%256,e=Math.trunc(n)%256,r=Math.trunc(s)%256,a=t-o,l=n-e,c=s-r,h=P(this.p,o,e,r).dot(a,l,c),u=P(this.p,o+1,e,r).dot(a-1,l,c),f=P(this.p,o,e+1,r).dot(a,l-1,c),y=P(this.p,o+1,e+1,r).dot(a-1,l-1,c),m=P(this.p,o,e,r+1).dot(a,l,c-1),$=P(this.p,o+1,e,r+1).dot(a-1,l,c-1),S=P(this.p,o,e+1,r+1).dot(a,l-1,c-1),b=P(this.p,o+1,e+1,r+1).dot(a-1,l-1,c-1);return E(E(E(h,u,a),E(f,y,a),X(l)),E(E(m,$,a),E(S,b,a),X(l)),X(c))}}var ve=we;class p{constructor(t,n,s,o){this.x=t,this.y=n,this.z=s,this.t=o}dot(t,n,s,o){return this.x*t+this.y*n+this.z*s+this.t*o}}const lt=[new p(0,1,1,1),new p(0,1,1,-1),new p(0,1,-1,1),new p(0,1,-1,-1),new p(0,-1,1,1),new p(0,-1,1,-1),new p(0,-1,-1,1),new p(0,-1,-1,-1),new p(1,0,1,1),new p(1,0,1,-1),new p(1,0,-1,1),new p(1,0,-1,-1),new p(-1,0,1,1),new p(-1,0,1,-1),new p(-1,0,-1,1),new p(-1,0,-1,-1),new p(1,1,0,1),new p(1,1,0,-1),new p(1,-1,0,1),new p(1,-1,0,-1),new p(-1,1,0,1),new p(-1,1,0,-1),new p(-1,-1,0,1),new p(-1,-1,0,-1),new p(1,1,1,0),new p(1,1,-1,0),new p(1,-1,1,0),new p(1,-1,-1,0),new p(-1,1,1,0),new p(-1,1,-1,0),new p(-1,-1,1,0),new p(-1,-1,-1,0)];function xe(i,t,n,s,o){const e=i[t+i[n+i[s+i[o]]]]%lt.length;return lt[e]}var _e={grad4:xe};const Me=L,{grad4:w}=_e,{fade:T,lerp:v}=N;class be extends Me{gen(t,n,s,o){const e=Math.trunc(t)%256,r=Math.trunc(n)%256,a=Math.trunc(s)%256,l=Math.trunc(o)%256,c=t-e,h=n-r,u=s-a,f=o-l,y=w(this.p,e,r,a,l).dot(c,h,u,f),m=w(this.p,e+1,r,a,l).dot(c-1,h,u),$=w(this.p,e,r+1,a,l).dot(c,h-1,u),S=w(this.p,e+1,r+1,a,l).dot(c-1,h-1,u),b=w(this.p,e,r,a+1,l).dot(c,h,u-1),C=w(this.p,e+1,r,a+1,l).dot(c-1,h,u-1),H=w(this.p,e,r+1,a+1,l).dot(c,h-1,u-1),It=w(this.p,e+1,r+1,a+1,l).dot(c-1,h-1,u-1),Et=w(this.p,e,r,a,l+1).dot(c,h,u,f-1),Tt=w(this.p,e+1,r,a,l+1).dot(c-1,h,u,f-1),Lt=w(this.p,e,r+1,a,l+1).dot(c,h-1,u,f-1),Nt=w(this.p,e+1,r+1,a,l+1).dot(c-1,h-1,u,f-1),At=w(this.p,e,r,a+1,l+1).dot(c,h,u-1,f-1),Ot=w(this.p,e+1,r,a+1,l+1).dot(c-1,h,u-1,f-1),Rt=w(this.p,e,r+1,a+1,l+1).dot(c,h-1,u-1,f-1),Ct=w(this.p,e+1,r+1,a+1,l+1).dot(c-1,h-1,u-1,f-1);return v(v(v(v(y,m,c),v($,S,c),T(h)),v(v(b,C,c),v(H,It,c),T(h)),T(u)),v(v(v(Et,Tt,c),v(Lt,Nt,c),T(h)),v(v(At,Ot,c),v(Rt,Ct,c),T(h)),T(u)),T(f))}}var ke=be;const{lerp:ht,fade:dt}=N;function $t(i,t){return t.length===1?i[t[0]]:i[t[0]+$t(i,t.slice(1))]}class $e{constructor(t){this.R=t}dot(t){let n=0;for(let s=0;s<t.length;s++)n+=this.R[s]*t[s];return n}}const D=[];function Se(i){for(let t=0;t<i*2;t++){const n=new Array(i).fill(0);n[t%i]=t/i>=1?1:-1,D[t]=new $e(n)}}function Q(i,t){if(t.length===1)return ht(i[0],i[1],dt(t[0]));const n=i.slice(0,Math.floor(i.length/2)),s=i.slice(Math.ceil(i.length/2));return ht(Q(n,t.slice(0,t.length-1)),Q(s,t.slice(0,t.length-1)),dt(t[t.length-1]))}function ze(i,t,n,s){const o=[];D.length===0&&Se(t);for(let e=0;e<2<<t-1;e++){const r=n.slice(),a=s.slice();let l=e;for(let c=0;c<t;c++)l&1&&(r[c]+=1,a[c]-=1),l=l>>1;o[e]=D[$t(i,r)%D.length].dot(a)}return o}var Pe={lerpN:Q,getNs:ze};const Ie=L,{lerpN:Ee,getNs:Te}=Pe;class Le extends Ie{gen(...t){const n=[],s=[];for(let e=0;e<t.length;e++)n[e]=Math.trunc(t[e])%256,s[e]=t[e]-n[e];const o=Te(this.p,t.length,n,s);return Ee(o,s)}}var Ne=Le;const Ae=Qt,Oe=re,Re=de,Ce=pe,Fe=ve,Ke=ke,Ue=Ne;var De={Simplex1:Ae,Simplex2:Oe,Perlin1:Re,Perlin2:Ce,Perlin3:Fe,Perlin4:Ke,PerlinN:Ue};(function(i){i.exports=De})(_t);const je=Ut(_t.exports);class He{constructor({x:t,y:n}){d(this,"collisionRadius",.3);d(this,"pos");d(this,"collision");const s=this.pos={x:t,y:n},o={x:t+1,y:n+1};this.collision={min:s,max:o}}update(t,n){}draw(t,n){const{tile:s}=n.canvas,o=n.resolve(this.pos),e=s/2;t.drawImage(image_outside,5*16,8*16,16,16*2,o.x-e,o.y-e-s,s,s*2),n.debug&&(t.beginPath(),t.arc(o.x,o.y,s*this.collisionRadius,0,Math.PI*2),t.closePath(),t.strokeStyle="red",t.stroke())}}const Ve=new je.Perlin2("seed");var j=(i=>(i.water="water",i.sand="sand",i.grass="grass",i))(j||{});const x=class{constructor({x:t,y:n},s){d(this,"stale",!1);d(this,"pos");d(this,"seed");d(this,"noise");d(this,"tiles");d(this,"hoverIndexes",new Set);d(this,"obstacles",new Set);this.pos={x:t,y:n},this.seed=s,this.noise=Array(x.size**2).fill("").map((e,r)=>Ve.gen(Math.abs((2e3+t+r%x.size)/32),Math.abs((2e3+n+Math.floor(r/x.size))/32))),this.tiles=this.noise.map(e=>e<.15?"grass":e>.19?"water":"sand");const o=this.noise.map((e,r)=>[e,r]).filter(([e])=>e<.01&&Math.random()**e<1.5&&Math.random()<.1).map(([,e])=>({x:t+e%x.size,y:n+Math.floor(e/x.size)})).map(e=>new He(e));for(const e of o)this.obstacles.add(e)}update(t,n,s){const{pos:o,max:e}=this;this.hoverIndexes.clear();for(const[,{x:r,y:a}]of s.pointers)r>=o.x&&r<=e.x&&a>=o.y&&a<=e.y&&this.hoverIndexes.add(Math.floor(a-o.y)*x.size+Math.floor(r-o.x))}drawTerrain(t,n){const{tile:s}=n.canvas,o=n.resolve(this.pos);for(let e=0;e<x.size**2;e++){const r=o.x+s*(e%x.size),a=o.y+s*Math.floor(e/x.size),l=this.tiles[e];if(n.debug)t.fillStyle=`hsl(${Math.floor(this.noise[e]*180+180)}, 100%, 50%)`,t.fillRect(r,a,s+1,s+1);else if(l==="grass")t.fillStyle="#83cd56",t.fillRect(r,a,s+1,s+1);else{const c={grass:{x:2,y:9},sand:{x:51,y:1},water:{x:1,y:9}}[l];t.drawImage(image_terrain,c.x*16,c.y*16,16,16,r,a,s+1,s+1)}this.hoverIndexes.has(e)&&(t.fillStyle="rgba(255, 255, 255, 0.3)",t.fillRect(r,a,s+1,s+1))}}drawObstacles(t,n){for(const s of this.obstacles)s.draw(t,n)}draw(t,n){this.drawTerrain(t,n),this.drawObstacles(t,n)}get max(){return{x:this.pos.x+x.size,y:this.pos.y+x.size}}};let g=x;d(g,"size",16);class St{constructor({x:t,y:n}){d(this,"state",M.idle);d(this,"skin",A(Ye));d(this,"hair",A(Ge));d(this,"facing",A(Je));d(this,"top",A(Be));d(this,"bottom",A(qe));d(this,"shoes",A(We));d(this,"frame",{x:0,timer:0,interval:1e3/8});d(this,"images",[]);d(this,"speed",1);d(this,"xmov",0);d(this,"ymov",0);d(this,"target");d(this,"collisionRadius",.4);d(this,"tileType",j.grass);d(this,"pos");d(this,"nextPos");d(this,"accessory");d(this,"tool");this.pos={x:t,y:n},Math.random()<.2&&(this.accessory=zt.tie_red),this.loadImages()}updateFrame(t,{idleStill:n}={}){this.frame.timer<this.frame.interval?this.frame.timer+=t:(this.frame.timer=0,this.frame.x=n&&this.state===M.idle?0:(this.frame.x+1)%Ze[this.state])}setNextPos(t,n=this.speed){let s=0;if(this.xmov||this.ymov){const o=Math.atan2(this.ymov,this.xmov);this.state=n>.5?M.run:M.walk,this.facing=Qe(this.xmov,this.ymov),s=n*t*.003,this.loadImages();const{x:e,y:r}=this.pos;this.nextPos={x:e+Math.cos(o)*s,y:r+Math.sin(o)*s}}else this.state!==M.idle&&(this.state=M.idle,this.frame.x=0,this.loadImages())}pointToTarget(){if(!this.target)return;const t=this.target.x-this.pos.x,n=this.target.y-this.pos.y;Math.hypot(n,t)<.5?(delete this.target,this.xmov=0,this.ymov=0,this.state=M.idle):(this.xmov=Math.min(t,t>>-1|1),this.ymov=Math.min(n,n>>-1|1))}draw(t,n){const{tile:s}=n.canvas,o=n.resolve(this.pos);this.drawAt(t,o,s),n.debug&&(t.beginPath(),t.arc(o.x,o.y,s*this.collisionRadius,0,Math.PI*2),t.closePath(),t.lineWidth=3,t.strokeStyle="rgba(255, 0, 0, 0.3)",this.tileType===j.water&&(console.log(this.tileType,this),t.strokeStyle="blue"),t.stroke())}drawAt(t,n,s,o=this.frame){const e=s*4,r=e/2,a=e/8;for(const l of this.images)l.dataset.still?t.drawImage(l,n.x,n.y,a,a):t.drawImage(l,o.x*64,this.facing*64,64,64,n.x-r,n.y-r,e,e)}loadImages(){Xe(this).then(t=>{this.images=t})}getSprite(){const{x:t,y:n}=this.pos,s=32;return{min:{x:t-s,y:n-s},max:{x:t+s,y:n+s}}}get collision(){const{x:t,y:n}=this.pos,s={x:t-.5,y:n-.5},o={x:t+.5,y:n+.5};return{min:s,max:o}}}var et=(i=>(i[i.right=0]="right",i[i.left=1]="left",i[i.down=2]="down",i[i.up=3]="up",i))(et||{}),M=(i=>(i.idle="idle",i.jump="jump",i.run="run",i.walk="walk",i))(M||{}),zt=(i=>(i.tie_red="tie_red",i))(zt||{});const Be=["overhalls","shirt_green","shirt_white"],qe=["jeans","khakis"],We=["black","brown","red","yellow"],ft=new Map;async function Xe(i){const{state:t,skin:n,hair:s,top:o,bottom:e,shoes:r,accessory:a,tool:l}=i,c=s.split("_")[0];async function h(f,y={}){let m=ft.get(f);return m||(m=new Promise(($,S)=>{const b=new Image;b.src=`/spelsylt7/assets/${f}`,b.onload=()=>$(b),b.onerror=C=>{console.error(y);debugger;S(C)},y.still&&(b.dataset.still="1")}),ft.set(f,m),m)}const u=[h(`character/adult/body/${t}/${t}_${n}_skintone.png`),h(`character/adult/hairs/${t}/${c}/${t}_hairs_${s}.png`),h(`character/adult/clothing/${t}/top/${t}_clothing_top_${o}.png`),h(`character/adult/clothing/${t}/bottom/${t}_clothing_bottom_${e}.png`),h(`character/adult/clothing/${t}/shoes/${t}_clothing_shoes_${r}.png`)];return a&&u.push(h(`character/adult/clothing/${t}/acessories/${t}_clothing_acessories_${a}.png`)),l==="keyboard"&&u.push(h("martin-garrido-cVUPic1cbd4-unsplash.png",{still:!0})),Promise.all(u)}const Ze={idle:2,jump:6,run:4,walk:6},Ye=["black","caucasian","indian"],Ge=["balding_gray","bigbun_black","bigbun_blonde","bigbun_brown_light","bigbun_brown_dark","bigbun_purple","bigbun_red","long_black","long_blonde","long_brown_dark","long_brown_light","long_purple","long_red","ponytail_black","ponytail_blonde","ponytail_brown_dark","ponytail_brown_light","ponytail_purple","ponytail_red","short_black","short_blonde","short_brown_dark","short_brown_light","short_brown_medium","short_purple","short_red","small_black","small_blonde","small_brown_dark","small_brown_light","small_purple","small_red","spikey_black","spikey_blonde","spikey_brown_dark","spikey_brown_light","spikey_purple","spikey_red"],Je=[0,1,2,3];function Qe(i,t){return i===0?t<0?3:2:i>0?0:1}function A(i){return i[Math.floor(Math.random()*i.length)]}function ts(i,t="asc"){return function(s,o){const e=i(s),r=i(o);return t==="asc"?e<r?-1:e>r?1:0:e<r?1:e>r?-1:0}}function tt(i,t){return Math.hypot(i.y-t.y,i.x-t.x)}function ut(i,t){const n=i.collisionRadius+t.collisionRadius,s=tt(i.pos,t.pos),o=tt(i.nextPos||i.pos,t.nextPos||t.pos);return o<n&&o<s}class pt{constructor(t){d(this,"keys",{...gt});d(this,"pointers",new Map);d(this,"viewport");d(this,"_hasInteracted",!1);d(this,"onFirstInteraction");d(this,"onKeypress",()=>{this.hasInteracted()});d(this,"onKeydown",t=>{let n=!1;for(const[s,o]of mt)o.has(t.code)&&(this.keys[s]=!0,n=!0);n&&this.hasInteracted()});d(this,"onKeyup",t=>{console.log("onKeyup",t);let n=!1;for(const[s,o]of mt)o.has(t.code)&&(this.keys[s]=!1,n=!0);n&&this.hasInteracted()});d(this,"onBlur",()=>{this.keys={...gt}});d(this,"onPointerDown",t=>{this.hasInteracted();const{clientX:n,clientY:s}=t,{canvas:o,min:e}=this.viewport,r=n*window.devicePixelRatio/o.tile+e.x,a=s*window.devicePixelRatio/o.tile+e.y;this.pointers.set(t.pointerId,{x:r,y:a})});d(this,"onPointerMove",t=>{if(t.pressure<.5)return;const{clientX:n,clientY:s}=t,{canvas:o,min:e}=this.viewport,r=n*window.devicePixelRatio/o.tile+e.x,a=s*window.devicePixelRatio/o.tile+e.y;this.pointers.set(t.pointerId,{x:r,y:a})});d(this,"onPointerUp",t=>{this.pointers.delete(t.pointerId)});d(this,"onPointerLeave",t=>{this.pointers.delete(t.pointerId)});this.viewport=t,addEventListener("keydown",this.onKeydown),addEventListener("keyup",this.onKeyup),addEventListener("blur",this.onBlur),addEventListener("pointerdown",this.onPointerDown,{passive:!1}),addEventListener("pointermove",this.onPointerMove,{passive:!1}),addEventListener("pointerup",this.onPointerUp,{passive:!1}),addEventListener("pointerleave",this.onPointerLeave,{passive:!1}),addEventListener("pointerout",this.onPointerLeave,{passive:!1}),addEventListener("pointercancel",this.onPointerLeave,{passive:!1}),document.addEventListener("touchstart",n,{passive:!1}),document.addEventListener("touchmove",s,{passive:!1});function n(a){a.preventDefault()}function s(a){a.preventDefault()}function o(a){a.preventDefault()}function e(a){a.preventDefault()}function r(a){a.preventDefault()}addEventListener("contextmenu",o,{passive:!1}),addEventListener("selectstart",e,{passive:!1}),addEventListener("selectionchange",r,{passive:!1})}hasInteracted(){var t;this._hasInteracted||(console.log("hasInteracted"),this._hasInteracted=!0,(t=this.onFirstInteraction)==null||t.call(this))}}const gt={up:!1,left:!1,down:!1,right:!1,space:!1,shift:!1,interact:!1},mt=new Map([["up",new Set(["ArrowUp","KeyW"])],["left",new Set(["ArrowLeft","KeyA"])],["down",new Set(["ArrowDown","KeyS"])],["right",new Set(["ArrowRight","KeyD"])],["space",new Set(["Space"])],["shift",new Set(["ShiftLeft","ShiftRight"])],["interact",new Set(["KeyE"])]]),yt=window.devicePixelRatio;var R=(i=>(i.menu="menu",i.playing="playing",i.interaction="interaction",i))(R||{});const wt={normal:{min:.4,max:6,start:1,speed:.05},god:{min:.4,max:40,start:20,speed:.08}};class es{constructor(t){d(this,"zoom",1);d(this,"gameMode","normal");d(this,"gameState","playing");d(this,"debug",!1);d(this,"offset",{x:0,y:0});d(this,"size",{width:0,height:0});d(this,"ratio",1);d(this,"canvas",{width:innerWidth,height:innerHeight,tile:80,mid:{x:innerWidth/2,y:innerHeight/2}});d(this,"ctx");d(this,"target");d(this,"_resize",()=>{this.ctx.canvas.style.width=`${innerWidth}px`,this.ctx.canvas.style.height=`${innerHeight-7}px`,this.canvas.width=this.ctx.canvas.width=yt*innerWidth,this.canvas.height=this.ctx.canvas.height=yt*(innerHeight-7),this.canvas.mid={x:this.canvas.width/2,y:this.canvas.height/2},this.canvas.tile=this.canvas.width/this.size.width,this.ratio=this.ctx.canvas.width/this.ctx.canvas.height,this.ctx.imageSmoothingEnabled=!1,this._updateZoom(this.zoom)});this.ctx=t,this.target={pos:{x:0,y:0}},addEventListener("resize",this._resize),this._resize(),this._updateZoom(this.zoom)}update(t,n){if(n.keys.space){const{min:s,max:o,speed:e}=wt[this.gameMode],r=1+(n.keys.shift?-e:e);this._updateZoom(Math.max(s,Math.min(o,this.zoom*r)))}}resolve(t){const n=(t.x-this.min.x)*this.canvas.tile,s=(t.y-this.min.y)*this.canvas.tile;return{x:n,y:s}}unresolve({clientX:t,clientY:n}){const s=t/this.canvas.tile,o=n/this.canvas.tile;return{x:s,y:o}}get min(){const t=this.target.pos,{width:n,height:s}=this.size,{offset:o}=this,e=t.x+o.x-n/2,r=t.y+o.y-s/2;return{x:e,y:r}}get max(){const t=this.target.pos,{width:n,height:s}=this.size,{offset:o}=this,e=t.x+o.x+n/2,r=t.y+o.y+s/2;return{x:e,y:r}}_updateZoom(t){this.zoom=t;const n=100*this.zoom**2,s=Math.sqrt(n*this.ratio);this.size={width:s,height:n/s},this.canvas.tile=this.canvas.width/s}toggleGameMode(){this.gameMode==="normal"?this.gameMode="god":this.gameMode="normal",this.zoom=wt[this.gameMode].start,this._updateZoom(this.zoom)}}const Z=dialog_canvas.getContext("2d");let Pt=[];try{speechSynthesis.cancel(),Pt=speechSynthesis.getVoices()}catch(i){console.error(i)}console.log(Pt);class ss{constructor(t,n,s){d(this,"player");d(this,"viewport");d(this,"npcs");d(this,"current");this.player=t,this.viewport=n,this.npcs=s,dialog_no_button.addEventListener("click",()=>{delete this.current,dialog.close(),n.gameState=R.playing})}update(t,n,s){var o;if((o=this.current)==null||o.updateFrame(t),s){const{player:e}=this;let r=()=>()=>!1;s.keys.interact?r=()=>()=>!0:s!=null&&s.pointers.size&&(r=()=>{const h=[...s==null?void 0:s.pointers.values()].filter(u=>Y(u,e.pos)<2);return u=>s.keys.interact||h.some(f=>Y(u.pos,f)<2)});const a=[...this.npcs].filter(h=>Y(h.pos,e.pos)<2).find(r());if(!a||this.current)return;n.gameState=R.interaction,this.current=a,this.current.state=M.idle,this.current.facing=et.down,dialog.showModal();let l=vt(["Hello","Hi","Howdie"]);dialog_content.textContent=l;let c=new SpeechSynthesisUtterance(l);c.lang="en-US",speechSynthesis.speak(c),setTimeout(()=>{l=vt(["Can you fix my computer?","The thing seems to be broken..","It broke, can you fix it?"]),dialog_content.textContent=l,c=new SpeechSynthesisUtterance(l),c.lang="en-US",speechSynthesis.speak(c)},2e3)}}draw(t,n){this.current&&(Z.clearRect(0,0,dialog_canvas.width,dialog_canvas.height),Z.imageSmoothingEnabled=!1,this.current.drawAt(Z,{x:70,y:70},128))}}function Y(i,t){return Math.hypot(t.y-i.y,t.x-i.x)}function vt(i){return i[Math.floor(Math.random()*i.length)]}const ns=[{name:"field_theme_1.wav",length:80},{name:"field_theme_2.wav",length:96},{name:"night_theme_1.wav",length:87.272721}];let k,U,O,I=new Audio;I.loop=!0;I.src="/music/music.wav";class os{constructor(){d(this,"track",ns[0])}play(){if(console.log("play"),!k){k=new AudioContext,U=k.createGain(),O=k.createMediaElementSource(I),O.connect(U).connect(k.destination),I.play();return}if(k.state==="suspended"){k.resume().then(()=>{O=k.createMediaElementSource(I),O.connect(U).connect(k.destination),I.play()});return}O=k.createMediaElementSource(I),O.connect(U).connect(k.destination),I.play()}}class is extends St{constructor(){super(...arguments);d(this,"markedForDeletion",!1);d(this,"speed",as([.1,.2,.3,.4,.5,.6]))}update(n,s){this.updateFrame(n,{idleStill:!0}),this.xmov=0,this.ymov=0,this.target?this.pointToTarget():Math.random()<.01&&(this.target=rs(this.pos)),this.setNextPos(n)}}function rs({x:i,y:t}){return{x:i+xt(),y:t+xt()}}function xt(){const i=Math.random()*4-2;return Math.floor(i*Math.abs(i)**3)}function as(i){return i[Math.floor(Math.random()*i.length)]}class cs extends St{constructor({x:n,y:s}){super({x:n,y:s});d(this,"speed",1);this.tool="keyboard",this.facing=et.down}update(n,s,o){if(this.updateFrame(n),[R.playing].includes(s.gameState)){if(o!=null&&o.pointers.size)for(const[,r]of o==null?void 0:o.pointers)this.target=r;if(this.xmov=0,this.ymov=0,o){const{up:r,left:a,down:l,right:c}=o.keys;this.xmov=a&&!c?-1:!a&&c?1:0,this.ymov=r&&!l?-1:!r&&l?1:0}const e=s.gameMode==="god"?30:1;!this.xmov&&!this.ymov&&this.target&&this.pointToTarget(),this.setNextPos(n,e)}}}class ls{constructor(t){d(this,"seed");d(this,"chunks",new Map);this.seed=t}update(t,n,s){this.loadUnloadChunks(n);for(const[,o]of this.chunks)o.update(t,n,s)}drawTerrain(t,n){for(const[,s]of this.chunks)s.drawTerrain(t,n)}get entities(){return[...this.chunks.values()].flatMap(t=>[...t.obstacles])}findTileType(t,n=!1){const s=Math.floor(t.x/g.size)*g.size,o=Math.floor(t.y/g.size)*g.size,e=this.chunks.get(`${s}:${o}`);if(!e)return j.grass;const r=Math.abs(Math.floor(t.x%g.size))+Math.abs(Math.floor(t.y%g.size))*g.size;return n&&console.log(r,e.tiles[r]),e.tiles[r]}loadUnloadChunks(t){const{min:n,max:s}=t;for(const[,l]of this.chunks)l.stale=!0;const o=Math.floor(n.x/g.size)*g.size,e=Math.floor(n.y/g.size)*g.size,r=Math.floor(s.x/g.size)*g.size,a=Math.floor(s.y/g.size)*g.size;for(let l=e;l<=a;l+=g.size)for(let c=o;c<=r;c+=g.size){const h=`${c}:${l}`,u=this.chunks.get(h);u?u.stale=!1:this.chunks.set(h,new g({x:c,y:l},this.seed))}for(const[l,c]of this.chunks)c.stale&&this.chunks.delete(l)}}class hs{constructor(t){d(this,"input");d(this,"player");d(this,"music");d(this,"tiles");d(this,"viewport");d(this,"interactionManager");d(this,"npcs",new Set);this.viewport=t,this.music=new os,this.input=new pt(t),this.player=new cs({x:0,y:0}),this.viewport.target=this.player,this.interactionManager=new ss(this.player,t,this.npcs),this.input=new pt(t),this.input.onFirstInteraction=()=>{console.log("onFirstInteraction"),this.music.play()},this.tiles=new ls(1337),window.game=this}update(t){const{input:n,viewport:s}=this;if([R.playing,R.menu].includes(s.gameState)){this.viewport.update(t,n),this.tiles.update(t,s,n);let o=[this.player,...this.npcs];for(const e of o)e.update(t,s,this.input);o=o.filter(e=>e.nextPos);for(const e of o)for(const r of o)e!==r&&ut(e,r)&&(delete e.nextPos,delete r.nextPos,e.state&&(e.state=M.idle),r.state&&(r.state=M.idle));o=o.filter(e=>e.nextPos);for(const e of o)for(const r of this.entities)e!==r&&ut(e,r)&&(delete e.nextPos,e.state&&(e.state=M.idle));o=o.filter(e=>e.nextPos);for(const e of o)e.nextPos&&(e.pos=e.nextPos,delete e.nextPos);for(const e of this.npcs)tt(e.pos,this.player.pos)>100&&this.npcs.delete(e);Math.random()<.2&&this.npcs.size<30&&this.npcs.add(new is({x:this.player.pos.x+Math.floor(Math.random()*100-50),y:this.player.pos.y+Math.floor(Math.random()*100-50)}));for(const e of[this.player])e.tileType=this.tiles.findTileType(e.pos,!0);for(const e of[...this.npcs])e.tileType=this.tiles.findTileType(e.pos)}this.interactionManager.update(t,this.viewport,n)}draw(t){const{viewport:n}=this,{width:s,height:o,mid:e}=n.canvas,r=Math.min(s,o),a=r/3;this.tiles.drawTerrain(t,n);for(const c of this.entities)c.draw(t,this.viewport);const l=t.createRadialGradient(e.x,e.y,a,e.x,e.y,r);l.addColorStop(.9,"rgba(0, 0, 0, 0.3)"),l.addColorStop(.4,"transparent"),t.fillStyle=l,t.fillRect(0,0,s,o),this.interactionManager.draw(t,this.viewport)}get entities(){const{width:t}=this.viewport.size;return[this.player,...this.npcs,...this.tiles.entities].sort(ts(({pos:s})=>s.x+s.y*t))}}function ds(){const i=canvas.getContext("2d");if(!i)throw new Error("Failed to get context");const t=new es(i),n=new hs(t);let s=0,o=0;function e(r){const a=r-o;o=r,i.clearRect(0,0,canvas.width,canvas.height),n.draw(i),n.update(a),s=requestAnimationFrame(e)}cancelAnimationFrame(s),s=requestAnimationFrame(e),toggle.addEventListener("click",r=>{r==null||r.preventDefault(),t.toggleGameMode(),toggle.blur();const a=new SpeechSynthesisUtterance("Kan du laga min skrivare?");a.lang="sv-SE",a.rate=1,a.volume=.1,speechSynthesis.speak(a)}),addEventListener("keydown",r=>{r.key==="d"&&(t.debug=!t.debug)})}ds();