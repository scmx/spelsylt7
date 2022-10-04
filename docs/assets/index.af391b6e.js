var K=Object.defineProperty;var L=(n,t,e)=>t in n?K(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(L(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();class A{constructor(){r(this,"keys",{..._});r(this,"onKeydown",t=>{for(const[e,s]of k)s.has(t.code)&&(this.keys[e]=!0)});r(this,"onKeyup",t=>{for(const[e,s]of k)s.has(t.code)&&(this.keys[e]=!1)});r(this,"onBlur",()=>{this.keys={..._}});addEventListener("keydown",this.onKeydown),addEventListener("keyup",this.onKeyup),addEventListener("blur",this.onBlur)}}const _={up:!1,left:!1,down:!1,right:!1,space:!1,shift:!1},k=new Map([["up",new Set(["ArrowUp","KeyW"])],["left",new Set(["ArrowLeft","KeyA"])],["down",new Set(["ArrowDown","KeyS"])],["right",new Set(["ArrowRight","KeyD"])],["space",new Set(["Space"])],["shift",new Set(["ShiftLeft","ShiftRight"])]]),m=class{constructor({x:t,y:e},s){r(this,"stale",!1);r(this,"pos");r(this,"seed");r(this,"colors",Array(100).fill("").map(()=>`hsl(${Math.floor(360*Math.random())}, 40%, 40%)`));this.pos={x:t,y:e},this.seed=s}update(){}draw1(t,e){const{tile:s}=e.canvas,i=e.resolve(this.pos),o=m.size*s;t.fillStyle=this.colors[0],t.fillRect(i.x+s,i.y+s,o,o)}draw(t,e){const{tile:s}=e.canvas,i=e.resolve(this.pos);for(let o=0;o<m.size**2;o++){const a=i.x+s*(o%m.size),l=i.y+s*Math.floor(o/m.size);t.fillStyle=this.colors[o],t.fillRect(a,l,s,s)}}};let d=m;r(d,"size",4);class I{constructor(t){r(this,"seed");r(this,"chunks",new Map);this.seed=t}update(t,e){this.loadUnloadChunks(e)}draw(t,e){for(const[,s]of this.chunks)s.draw(t,e)}loadUnloadChunks(t){const{min:e,max:s}=t;for(const[,h]of this.chunks)h.stale=!0;const i=Math.floor(e.x/d.size)*d.size,o=Math.floor(e.y/d.size)*d.size,a=Math.floor(s.x/d.size)*d.size,l=Math.floor(s.y/d.size)*d.size;for(let h=o;h<=l;h+=d.size)for(let c=i;c<=a;c+=d.size){const u=`${c}:${h}`,p=this.chunks.get(u);p?p.stale=!1:this.chunks.set(u,new d({x:c,y:h},this.seed))}for(const[h,c]of this.chunks)c.stale&&this.chunks.delete(h)}}class E{constructor(t,e){r(this,"input",new A);r(this,"player");r(this,"tiles");r(this,"viewport");this.viewport=t,this.player=e,this.tiles=new I(1337)}update(t){const{input:e,viewport:s}=this;this.viewport.update(t,e),this.tiles.update(t,s),this.player.update(t,s,e)}draw(t){const{viewport:e}=this,{width:s,height:i,mid:o}=e.canvas,a=Math.min(s,i),l=a/3;this.tiles.draw(t,e),this.player.draw(t,e);const h=t.createRadialGradient(o.x,o.y,l,o.x,o.y,a);h.addColorStop(.9,"black"),h.addColorStop(.4,"transparent"),t.fillStyle=h,t.fillRect(0,0,s,i)}}class R{constructor({x:t,y:e}){r(this,"state",f(O));r(this,"skin",f(B));r(this,"hair",f(N));r(this,"facing",v.right);r(this,"top",f(H));r(this,"bottom",f(P));r(this,"shoes",f(j));r(this,"frame",{x:0,timer:0,interval:1e3/8});r(this,"images",[]);r(this,"speed",1);r(this,"pos");r(this,"accessory");this.pos={x:t,y:e},Math.random()<.2&&(this.accessory=z.tie_red),this.loadImages()}update(t,e){this.frame.timer<this.frame.interval?this.frame.timer+=t:(this.frame.timer=0,this.frame.x=(this.frame.x+1)%q[this.state])}move(t,e,s){if(e||s){const i=Math.atan2(s,e);this.state=w.walk,this.facing=T(e,s),this.pos.x+=Math.cos(i)*this.speed*t*.003,this.pos.y+=Math.sin(i)*this.speed*t*.003}else this.state!==w.idle&&(this.state=w.idle,this.frame.x=0);this.loadImages()}draw(t,e){const{mid:s,tile:i}=e.canvas,{frame:o}=this,a=i*4,l=a/2;for(const h of this.images)t.drawImage(h,o.x*64,this.facing*64,64,64,s.x-l,s.y-l,a,a)}loadImages(){W(this).then(t=>{this.images=t})}getSprite(){const{x:t,y:e}=this.pos,s=32;return{min:{x:t-s,y:e-s},max:{x:t+s,y:e+s}}}}var v=(n=>(n[n.right=0]="right",n[n.left=1]="left",n[n.down=2]="down",n[n.up=3]="up",n))(v||{}),w=(n=>(n.idle="idle",n.jump="jump",n.run="run",n.walk="walk",n))(w||{}),z=(n=>(n.tie_red="tie_red",n))(z||{});const H=["overhalls","shirt_green","shirt_white"],P=["jeans","khakis"],j=["black","brown","red","yellow"],b=new Map;async function W(n){const{state:t,skin:e,hair:s,top:i,bottom:o,shoes:a,accessory:l}=n,h=s.split("_")[0];async function c(p){let g=b.get(p);return g||(g=new Promise(($,M)=>{const y=new Image;y.src=`/spelsylt7//assets/${p}`,y.onload=()=>$(y),y.onerror=S=>{console.error(n);debugger;M(S)}}),b.set(p,g),g)}const u=[c(`character/adult/body/${t}/${t}_${e}_skintone.png`),c(`character/adult/hairs/${t}/${h}/${t}_hairs_${s}.png`),c(`character/adult/clothing/${t}/top/${t}_clothing_top_${i}.png`),c(`character/adult/clothing/${t}/bottom/${t}_clothing_bottom_${o}.png`),c(`character/adult/clothing/${t}/shoes/${t}_clothing_shoes_${a}.png`)];return l&&u.push(c(`character/adult/clothing/${t}/acessories/${t}_clothing_acessories_${l}.png`)),Promise.all(u)}const q={idle:2,jump:6,run:4,walk:6},O=["idle","jump","run","walk"],B=["black","caucasian","indian"],N=["balding_gray","bigbun_black","bigbun_blonde","bigbun_brown_light","bigbun_brown_dark","bigbun_purple","bigbun_red","long_black","long_blonde","long_brown_dark","long_brown_light","long_purple","long_red","ponytail_black","ponytail_blonde","ponytail_brown_dark","ponytail_brown_light","ponytail_purple","ponytail_red","short_black","short_blonde","short_brown_dark","short_brown_light","short_brown_medium","short_purple","short_red","small_black","small_blonde","small_brown_dark","small_brown_light","small_purple","small_red","spikey_black","spikey_blonde","spikey_brown_dark","spikey_brown_light","spikey_purple","spikey_red"];function T(n,t){return n===0?t<0?3:2:n>0?0:1}function f(n){return n[Math.floor(Math.random()*n.length)]}class U extends R{constructor({x:e,y:s}){super({x:e,y:s});r(this,"speed",1)}update(e,s,i){if(super.update(e,s),i){const{up:o,left:a,down:l,right:h}=i.keys,c=a&&!h?-1:!a&&h?1:0,u=o&&!l?-1:!o&&l?1:0;this.move(e,c,u)}}draw(e,s){super.draw(e,s)}}const x=window.devicePixelRatio;class Y{constructor(t,e){r(this,"zoom",1);r(this,"offset",{x:0,y:0});r(this,"size",{width:0,height:0});r(this,"ratio",1);r(this,"canvas",{width:innerWidth,height:innerHeight,tile:80,mid:{x:innerWidth/2,y:innerHeight/2}});r(this,"ctx");r(this,"target");r(this,"_resize",()=>{this.ctx.canvas.style.width=`${innerWidth}px`,this.ctx.canvas.style.height=`${innerHeight-7}px`,this.canvas.width=this.ctx.canvas.width=x*innerWidth,this.canvas.height=this.ctx.canvas.height=x*(innerHeight-7),this.canvas.mid={x:this.canvas.width/2,y:this.canvas.height/2},this.canvas.tile=this.canvas.width/this.size.width,this.ratio=this.ctx.canvas.width/this.ctx.canvas.height,this.ctx.imageSmoothingEnabled=!1});this.ctx=t,this.target=e,addEventListener("resize",this._resize),this._resize(),this._updateZoom(1)}update(t,e){e.keys.space&&this._updateZoom(Math.max(.3,Math.min(6,this.zoom+(e.keys.shift?-.01:.01))))}resolve(t){const e=(t.x-this.min.x)*this.canvas.tile,s=(t.y-this.min.y)*this.canvas.tile;return{x:e,y:s}}get min(){const t=this.target.pos,{width:e,height:s}=this.size,{offset:i}=this,o=t.x+i.x-e/2,a=t.y+i.y-s/2;return{x:o,y:a}}get max(){const t=this.target.pos,{width:e,height:s}=this.size,{offset:i}=this,o=t.x+i.x+e/2,a=t.y+i.y+s/2;return{x:o,y:a}}_updateZoom(t){this.zoom=t;const e=100*this.zoom**2,s=Math.sqrt(e*this.ratio);this.size={width:s,height:e/s},this.canvas.tile=this.canvas.width/s}}function Z(){const n=canvas.getContext("2d");if(!n)throw new Error("Failed to get context");const t=new U({x:0,y:0}),e=new Y(n,t),s=new E(e,t);let i=0,o=0;function a(l){const h=l-o;o=l,s.update(h),s.draw(n),i=requestAnimationFrame(a)}cancelAnimationFrame(i),i=requestAnimationFrame(a)}Z();
