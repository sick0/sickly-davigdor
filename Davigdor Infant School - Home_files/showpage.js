
/*
 * flowplayer.js 3.1.0. The Flowplayer API
 *
 * Copyright 2009 Flowplayer Oy
 *
 * This file is part of Flowplayer.
 *
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Date: 2009-04-15 06:02:21 +0000 (Wed, 15 Apr 2009)
 * Revision: 199
 */
(function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return document.getElementById(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.substring(0,q)||"*";var o=s.substring(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).substring(2,10)}var h=function(t,r,s){var q=this;var p={};var u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.substring(0,v.length-1);var w="onBefore"+v.substring(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(v=="onStart"||v=="onUpdate"){i(A,y);if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var s={};var o=this;var u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var y=q._api().fp_getPlugin(p);if(!y){return}i(o,y);delete o.methods;if(!u){m(y.methods,function(){var A=""+this;o[A]=function(){var B=[].slice.call(arguments);var C=q._api().fp_invoke(p,A,B);return C=="undefined"?o:C}});u=true}}var z=s[w];if(z){z.apply(o,v);if(w.substring(0,1)=="_"){delete s[w]}}}})};function b(o,t,z){var E=this,y=null,x,u,p=[],s={},B={},r,v,w,D,A,q;i(E,{id:function(){return r},isLoaded:function(){return(y!==null)},getParent:function(){return o},hide:function(F){if(F){o.style.height="0px"}if(y){y.style.height="0px"}return E},show:function(){o.style.height=q+"px";if(y){y.style.height=A+"px"}return E},isHidden:function(){return y&&parseInt(y.style.height,10)===0},load:function(F){if(!y&&E._fireEvent("onBeforeLoad")!==false){m(a,function(){this.unload()});x=o.innerHTML;if(x&&!flashembed.isSupported([9,0])){wrappper.innerHTML=""}flashembed(o,t,{config:z});if(F){F.cached=true;j(B,"onLoad",F)}}return E},unload:function(){try{if(!y||y.fp_isFullscreen()){return E}}catch(F){return E}if(x.replace(/\s/g,"")!==""){if(E._fireEvent("onBeforeUnload")===false){return false}y.fp_close();y=null;o.innerHTML=x;E._fireEvent("onUnload")}return E},getClip:function(F){if(F===undefined){F=D}return p[F]},getCommonClip:function(){return u},getPlaylist:function(){return p},getPlugin:function(F){var H=s[F];if(!H&&E.isLoaded()){var G=E._api().fp_getPlugin(F);if(G){H=new l(F,G,E);s[F]=H}}return H},getScreen:function(){return E.getPlugin("screen")},getControls:function(){return E.getPlugin("controls")},getConfig:function(F){return F?k(z):z},getFlashParams:function(){return t},loadPlugin:function(I,H,K,J){if(typeof K=="function"){J=K;K={}}var G=J?e():"_";E._api().fp_loadPlugin(I,H,K,G);var F={};F[G]=J;var L=new l(I,null,E,F);s[I]=L;return L},getState:function(){return y?y.fp_getState():-1},play:function(F){function G(){if(F!==undefined){E._api().fp_play(F)}else{E._api().fp_play()}}if(y){G()}else{E.load(function(){G()})}return E},getVersion:function(){var G="flowplayer.js 3.1.0";if(y){var F=y.fp_getVersion();F.push(G);return F}return G},_api:function(){if(!y){throw"Flowplayer "+E.id()+" not loaded when calling an API method"}return y},setClip:function(F){E.setPlaylist([F]);return E},getIndex:function(){return w}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,Fullscreen*,FullscreenExit,Error").split(","),function(){var F="on"+this;if(F.indexOf("*")!=-1){F=F.substring(0,F.length-1);var G="onBefore"+F.substring(2);E[G]=function(H){j(B,G,H);return E}}E[F]=function(H){j(B,F,H);return E}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,reset,close,setPlaylist").split(","),function(){var F=this;E[F]=function(G){if(!y){return E}var H=(G===undefined)?y["fp_"+F]():y["fp_"+F](G);return H=="undefined"?E:H}});E._fireEvent=function(O){if(typeof O=="string"){O=[O]}var P=O[0];var L=O[1];var K=O[2];var J=O[3];if(z.debug){g(O)}if(!y&&P=="onLoad"&&L=="player"){y=y||c(v);A=y.clientHeight;m(p,function(){this._fireEvent("onLoad")});m(s,function(Q,R){R._fireEvent("onUpdate")});u._fireEvent("onLoad")}if(P=="onLoad"&&L!="player"){return}if(P=="onError"){if(typeof L=="string"||(typeof L=="number"&&typeof K=="number")){L=K;K=J}}if(P=="onContextMenu"){m(z.contextMenu[L],function(Q,R){R.call(E)});return}if(P=="onPluginEvent"){var F=L.name||L;var G=s[F];if(G){G._fireEvent("onUpdate",L);G._fireEvent(K,O.slice(3))}return}if(P=="onPlaylistReplace"){p=[];var M=0;m(L,function(){p.push(new h(this,M++,E))})}var N=true;if(typeof L=="number"&&L<p.length){D=L;var H=p[L];if(H){N=H._fireEvent(P,K,J)}if(!H||N!==false){N=u._fireEvent(P,K,J,H)}}var I=0;m(B[P],function(){N=this.call(E,L,K);if(this.cached){B[P].splice(I,1)}if(N===false){return false}I++});return N};function C(){if($f(o)){$f(o).getParent().innerHTML="";w=$f(o).getIndex();a[w]=E}else{a.push(E);w=a.length-1}q=parseInt(o.style.height,10)||o.clientHeight;if(typeof t=="string"){t={src:t}}r=o.id||"fp"+e();v=t.id||r+"_api";t.id=v;z.playerId=r;if(typeof z=="string"){z={clip:{url:z}}}if(typeof z.clip=="string"){z.clip={url:z.clip}}z.clip=z.clip||{};if(o.getAttribute("href",2)&&!z.clip.url){z.clip.url=o.getAttribute("href",2)}u=new h(z.clip,-1,E);z.playlist=z.playlist||[z.clip];var F=0;m(z.playlist,function(){var H=this;if(typeof H=="object"&&H.length){H={url:""+H}}m(z.clip,function(I,J){if(J!==undefined&&H[I]===undefined&&typeof J!="function"){H[I]=J}});z.playlist[F]=H;H=new h(H,F,E);p.push(H);F++});m(z,function(H,I){if(typeof I=="function"){j(B,H,I);delete z[H]}});m(z.plugins,function(H,I){if(I){s[H]=new l(H,I,E)}});if(!z.plugins||z.plugins.controls===undefined){s.controls=new l("controls",null,E)}s.canvas=new l("canvas",null,E);t.bgcolor=t.bgcolor||"#000000";t.version=t.version||[9,0];t.expressInstall="http://www.flowplayer.org/swf/expressinstall.swf";function G(H){if(!E.isLoaded()&&E._fireEvent("onBeforeClick")!==false){E.load()}return f(H)}x=o.innerHTML;if(x.replace(/\s/g,"")!==""){if(o.addEventListener){o.addEventListener("click",G,false)}else{if(o.attachEvent){o.attachEvent("onclick",G)}}}else{if(o.addEventListener){o.addEventListener("click",f,false)}E.load()}}if(typeof o=="string"){flashembed.domReady(function(){var F=c(o);if(!F){throw"Flowplayer cannot access element: "+o}else{o=F;C()}})}else{C()}}var a=[];function d(o){this.length=o.length;this.each=function(p){m(o,p)};this.size=function(){return o.length}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var r=arguments[1];var q=(arguments.length==3)?arguments[2]:{};if(typeof o=="string"){if(o.indexOf(".")!=-1){var t=[];m(n(o),function(){t.push(new b(this,k(r),k(q)))});return new d(t)}else{var s=c(o);return new b(s!==null?s:o,r,q)}}else{if(o){return new b(o,r,q)}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(document.all){window.onbeforeunload=function(){$f("*").each(function(){if(this.isLoaded()){this.close()}})}}if(typeof jQuery=="function"){jQuery.prototype.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var e=typeof jQuery=="function";function i(){if(c.done){return false}var k=document;if(k&&k.getElementsByTagName&&k.getElementById&&k.body){clearInterval(c.timer);c.timer=null;for(var j=0;j<c.ready.length;j++){c.ready[j].call()}c.ready=null;c.done=true}}var c=e?jQuery:function(j){if(c.done){return j()}if(c.timer){c.ready.push(j)}else{c.ready=[j];c.timer=setInterval(i,13)}};function f(k,j){if(j){for(key in j){if(j.hasOwnProperty(key)){k[key]=j[key]}}}return k}function g(j){switch(h(j)){case"string":j=j.replace(new RegExp('(["\\\\])',"g"),"\\$1");j=j.replace(/^\s?(\d+)%/,"$1pct");return'"'+j+'"';case"array":return"["+b(j,function(m){return g(m)}).join(",")+"]";case"function":return'"function()"';case"object":var k=[];for(var l in j){if(j.hasOwnProperty(l)){k.push('"'+l+'":'+g(j[l]))}}return"{"+k.join(",")+"}"}return String(j).replace(/\s/g," ").replace(/\'/g,'"')}function h(k){if(k===null||k===undefined){return false}var j=typeof k;return(j=="object"&&k.push)?"array":j}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function b(j,m){var l=[];for(var k in j){if(j.hasOwnProperty(k)){l[k]=m(j[k])}}return l}function a(q,s){var o=f({},q);var r=document.all;var m='<object width="'+o.width+'" height="'+o.height+'"';if(r&&!o.id){o.id="_"+(""+Math.random()).substring(9)}if(o.id){m+=' id="'+o.id+'"'}o.src+=((o.src.indexOf("?")!=-1?"&":"?")+Math.random());if(o.w3c||!r){m+=' data="'+o.src+'" type="application/x-shockwave-flash"'}else{m+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}m+=">";if(o.w3c||r){m+='<param name="movie" value="'+o.src+'" />'}o.width=o.height=o.id=o.w3c=o.src=null;for(var j in o){if(o[j]!==null){m+='<param name="'+j+'" value="'+o[j]+'" />'}}var n="";if(s){for(var l in s){if(s[l]!==null){n+=l+"="+(typeof s[l]=="object"?g(s[l]):s[l])+"&"}}n=n.substring(0,n.length-1);m+='<param name="flashvars" value=\''+n+"' />"}m+="</object>";return m}function d(l,o,k){var j=flashembed.getVersion();f(this,{getContainer:function(){return l},getConf:function(){return conf},getVersion:function(){return j},getFlashvars:function(){return k},getApi:function(){return l.firstChild},getHTML:function(){return a(o,k)}});var p=o.version;var q=o.expressInstall;var n=!p||flashembed.isSupported(p);if(n){o.onFail=o.version=o.expressInstall=null;l.innerHTML=a(o,k)}else{if(p&&q&&flashembed.isSupported([6,65])){f(o,{src:q});k={MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title};l.innerHTML=a(o,k)}else{if(l.innerHTML.replace(/\s/g,"")!==""){}else{l.innerHTML="<h2>Flash version "+p+" or greater is required</h2><h3>"+(j[0]>0?"Your version is "+j:"You have no flash plugin installed")+"</h3>"+(l.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");if(l.tagName=="A"){l.href="http://www.adobe.com/go/getflashplayer"}}}}if(!n&&o.onFail){var m=o.onFail.call(this);if(typeof m=="string"){l.innerHTML=m}}}window.flashembed=function(k,l,j){if(typeof k=="string"){var m=document.getElementById(k);if(m){k=m}else{c(function(){flashembed(k,l,j)});return}}if(!k){return}var n={width:"100%",height:"100%",allowFullScreen:true,allowscriptaccess:"always",quality:"high",version:null,onFail:null,expressInstall:null,w3c:false};if(typeof l=="string"){l={src:l}}f(n,l);return new d(k,n,j)};f(window.flashembed,{getVersion:function(){var l=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var k=navigator.plugins["Shockwave Flash"].description;if(typeof k!="undefined"){k=k.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var m=parseInt(k.replace(/^(.*)\..*$/,"$1"),10);var q=/r/.test(k)?parseInt(k.replace(/^.*r(.*)$/,"$1"),10):0;l=[m,q]}}else{if(window.ActiveXObject){try{var o=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(p){try{o=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");l=[6,0];o.AllowScriptAccess="always"}catch(j){if(l[0]==6){return}}try{o=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(n){}}if(typeof o=="object"){k=o.GetVariable("$version");if(typeof k!="undefined"){k=k.replace(/^\S+\s+(.*)$/,"$1").split(",");l=[parseInt(k[0],10),parseInt(k[2],10)]}}}}return l},isSupported:function(j){var l=flashembed.getVersion();var k=(l[0]>j[0])||(l[0]==j[0]&&l[1]>=j[1]);return k},domReady:c,asString:g,getHTML:a});if(e){jQuery.prototype.flashembed=function(k,j){return this.each(function(){flashembed(this,k,j)})}}})();




/* swfobject */

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();



/* Flexpaper setup */

var containers = new Array();
var flexPaperIncrement = 0;

if(window.addEventListener)
window.addEventListener('DOMMouseScroll', handleWheel, false);
window.onmousewheel = document.onmousewheel = handleWheel;

if(window.attachEvent) 
window.attachEvent("onmousewheel", handleWheel);

function handleWheel(event){
	for (c in containers) {
		try{
			if(!window.document.getElementById(containers[c]).hasFocus()){continue;}
			window.document.getElementById(containers[c]).setViewerFocus(true);
			window.document.getElementById(containers[c]).focus();
			
			if(navigator.appName == "Netscape"){
				if (event.detail)
					delta = 0;
				if (event.preventDefault){
					event.preventDefault();
					event.returnValue = false;
				}
			}
		}catch(err){continue;}
	}
}

function flexPaperSetup(filename, container, width, height, swfpath) {
	if (typeof(width) == 'undefined' || width <= 0) {
		width = "600";
	}
	if (typeof(height) == 'undefined' || height <= 0) {
		height = "500";
	}
	if (typeof(swfpath) == 'undefined') {
		swfpath = "";
	}
	
	containers[flexPaperIncrement] = container;
	flexPaperIncrement++;
	
	<!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
	var swfVersionStr = "9.0.124";
	<!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
	var xiSwfUrlStr = "${expressInstallSwf}";
	var flashvars = { 
		'SwfFile' : escape(filename),
		'Scale' : 0.6, 
		'ZoomTransition' : "easeOut",
		'ZoomTime' : 0.5,
		'ZoomInterval' : 0.1,
		'FitPageOnLoad' : false,
		'FitWidthOnLoad' : true,
		'PrintEnabled' : true,
		'FullScreenAsMaxWindow' : true,
		'ProgressiveLoading' : true,

      PrintToolsVisible : true,
      ViewModeToolsVisible : true,
      ZoomToolsVisible : true,
      FullScreenVisible : true,
      NavToolsVisible : true,
      CursorToolsVisible : false,
      SearchToolsVisible : true,




		'localeChain' : "en_US"
		};
	var params = {
		'quality' : "high",
		'bgcolor' : "#ffffff",
		'allowscriptaccess' : "sameDomain",
		'allowfullscreen' : "true",
                'wmode' : "transparent"
		}
	var attributes = {
		'id' : container,
		'name' : container,
		'class' : "flexpaper_object"
		};
	swfobject.embedSWF(
		swfpath + "FlexPaperViewer.swf",
		container, 
		width,
		height, 
		swfVersionStr,
		xiSwfUrlStr, 
		flashvars,
		params,
		attributes
		);
	swfobject.createCSS("#"+container, "display:block;text-align:left;margin:10px 0px;");
}

/* showpage.js */

var login = 0;
if (parent.refreshed == false)
{
	parent.refreshed = true;
	location.reload(true);
}



function save()
{
	tinyMCE.triggerSave();
	document.forms[0].submit();
}



window.onunload = function() { if(top.nopage) top.nopage(); };

speed=1000;
len=40;
tid = 0;
num=0;
clockA = new Array();
timeA = new Array();
formatA = new Array();
dd = new Date();
var d,x;

function doDate(x)
{
  for (i=0;i<num;i++) {
	dt = new Date();

	if (timeA[i] != 0) {
	  v1 = Math.round(( timeA[i] - dt )/1000) ;
	  if (v1 < 0)
		clockA[i].date.value = "**BANG!**";
	  if (formatA[i] == 1)
		clockA[i].date.value = v1;
	  else if (formatA[i] ==2) {
		sec = v1%60;
	v1 = Math.floor( v1/60);
	min = v1 %60 ;
	hour = Math.floor(v1 / 60);
	if (sec < 10 ) sec = "0"+sec;
	if (min < 10 ) min = "0"+min;
		clockA[i].date.value = hour+"h "+min+"m "+sec+"s";
		}
	  else if (formatA[i] ==3) {
		sec = v1%60;
	v1 = Math.floor( v1/60);
	min = v1 %60 ;
	v1 = Math.floor(v1 / 60);
	hour = v1 %24 ;
	day = Math.floor(v1 / 24);
	if (sec < 10 ) sec = "0"+sec;
	if (min < 10 ) min = "0"+min;
	if (hour < 10 ) hour = "0"+hour;
		clockA[i].date.value = day+"d "+hour+"h "+min+"m "+sec+"s";
		}
	  else if (formatA[i] ==4 ) {
		sec = v1%60;
	v1 = Math.floor( v1/60);
	min = v1 %60 ;
	v1 = Math.floor(v1 / 60);
	hour = v1 %24 ;
	day = Math.floor(v1 / 24);
		clockA[i].date.value = day+(day==1?"day ":" days ")+hour+(hour==1?"hour ":" hours ")+min+(min==1?"min ":" mins ")+sec+(sec==1?"sec ":" secs ")
		}
	  else
		clockA[i].date.value = "Invalid Format spec";
	  }
	else
	  clockA[i].date.value = "Countdown till when?";
	}

  tid=window.setTimeout("doDate()",speed);
}

function start(d,x,format) {
  clockA[num] = x
  timeA[num] = new Date(d);
  formatA[num] = format;
  if (num == 0)
	tid=window.setTimeout("doDate()",speed);
  num++;
}

function CountdownLong(t,format,len)
{
  document.write('<FORM name=form'+num+'><input name=date size=')
  document.write(len)
  document.write(' value="Countdown: Requires Javascript" style="text-align: center" readonly></FORM>')
  start(t,document.forms["form"+num],format);
}
function hangman(words,index,divid,all_letters,description)
{
	var splits = words.split(",");
	var word = splits[index];
	
	var descriptionsplits = description.split(",");
	var descp = descriptionsplits[index];
	
			
	var done = 1;
	var matched = 0;
	var max = 6;
	var wrong = 0;
	var alpha = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
	alpha = alpha.split(",");
	var len_alpha = alpha.length;
	var html = "";
	var html3 = "";
	var html4 = "Hint: "+descp;
	for (var x=0; x < word.length; x++)
	{
		var letters = all_letters.split(word.substr(x,1));
		if(letters.join('').length==all_letters.length)//not matched
		{
			if (word.substr(x,1)==" ")
				html3+="&nbsp;<font size=1>&nbsp;</font>";
			else
				html3+="_<font size=1>&nbsp;</font>";
				
			done=0;
			
		}
		else//matched
		{
			if (word.substr(x,1)==" ")
				html3+="&nbsp;&nbsp;";
			else
				html3+=word.substr(x,1);
			
			matched++;
		}
		
		if(matched==word.replace(" ","").length)
			done=1;
		
	}
	
	if (done==0)
	{
		var html2= "<BR/><H4>";
		for (var c=0; c<len_alpha; c++)
		{
			var letters = all_letters.split(alpha[c]);
			if(letters.join('').length==all_letters.length)//not matched
			{
					html2+= "<A HREF=\"#hangman1\" onClick=\"hangman('"+words+"',"+index+",'"+divid+"','"+(alpha[c]+all_letters)+"','"+description+"');\">"+alpha[c]+"</A>&nbsp;";
					//href='javascript:self.scroll(0,0);			   
			}
			else//matched
			{
				var letters2 = word.split(alpha[c]);
				if(letters2.join('').length==word.length)//not matched
				{
					html2+= "<FONT color='red'>"+alpha[c]+"</font>&nbsp;";					
					wrong++;
				}
				else
				{
					html2+= "<B>"+alpha[c]+"</B>&nbsp;";				  
				}
			}
		}
		html2+="</H4>";
		var nwrong=wrong; if (nwrong>6) nwrong=6;
		if (wrong >=max)
		{
		  index = index+1;
		  if (index>(splits.length-1)) index=0;
		  html+= "<p><BR><IMG SRC='" + uri + "images/hangman_"+nwrong+".gif' ALIGN='MIDDLE' BORDER='0' WIDTH='100' HEIGHT='100'/></P>";
		  
		  html+="<p><H1>"+html3+"</H1><BR><FONT color=\"red\"><BIG>SORRY, YOU ARE HANGED!!!</BIG></FONT><BR><BR>";
		  html+="The phrase was \"<B>"+word+"</B>\"</div>";
		  html2="<P><A href='#hangman1' onClick=\"hangman('"+words+"',"+index+",'"+divid+"','','"+description+"');\">Play again</A></P>";
		  document.getElementById(divid).innerHTML=html2+html;
		}
		else
		{
			html+= "<p><BR><IMG SRC='" + uri + "images/hangman_"+nwrong+".gif' ALIGN='MIDDLE' BORDER='0' WIDTH='100' HEIGHT='100'/>&nbsp; # Wrong Guesses Left: <B>"+(max-wrong)+"</B>";
			document.getElementById(divid).innerHTML="<div id='hangman'>Choose a letter:"+html2+html+"<BR/><BR/>"+html4+"<BR/><H1>"+html3+"</H1><BR/></div>";
		}
	}
	
	
	else
	{
		
		index = index+1;
		if (index>(splits.length-1)) index=0;
		html+="<H1><font size=5>Congratulations!!! You win!!!</font></H1>";	  
		html+="<A HREF=\"#hangman1\" onClick=\"hangman('"+words+"',"+index+",'"+divid+"','','"+description+"');\">Play again</A></div>";
		document.getElementById(divid).innerHTML=html;
	}
	//parent.window.scroll(0,800);
}	 
function Countdown2001seconds()
{
  CountdownLong("January 01, 2001 00:00:00",1,8);
}

function Countdown2001()
{
  CountdownLong("January 01, 2001 00:00:00",4,30);
}

function Countdown(t)
{
  CountdownLong(t,4,30);
}

/* Ajax Request */

function AjaxRequest() {
	var req = new Object();

	// -------------------
	// Instance properties
	// -------------------

	/**
	 * Timeout period (in ms) until an async request will be aborted, and
	 * the onTimeout function will be called
	 */
	req.timeout = null;

	/**
	 *	Since some browsers cache GET requests via XMLHttpRequest, an
	 * additional parameter called AjaxRequestUniqueId will be added to
	 * the request URI with a unique numeric value appended so that the requested
	 * URL will not be cached.
	 */
	req.generateUniqueUrl = true;

	/**
	 * The url that the request will be made to, which defaults to the current
	 * url of the window
	 */
	req.url = window.location.href;

	/**
	 * The method of the request, either GET (default), POST, or HEAD
	 */
	req.method = "GET";

	/**
	 * Whether or not the request will be asynchronous. In general, synchronous
	 * requests should not be used so this should rarely be changed from true
	 */
	req.async = true;

	/**
	 * The username used to access the URL
	 */
	req.username = null;

	/**
	 * The password used to access the URL
	 */
	req.password = null;

	/**
	 * The parameters is an object holding name/value pairs which will be
	 * added to the url for a GET request or the request content for a POST request
	 */
	req.parameters = new Object();

	/**
	 * The sequential index number of this request, updated internally
	 */
	req.requestIndex = AjaxRequest.numAjaxRequests++;

	/**
	 * Indicates whether a response has been received yet from the server
	 */
	req.responseReceived = false;

	/**
	 * The name of the group that this request belongs to, for activity
	 * monitoring purposes
	 */
	req.groupName = null;

	/**
	 * The query string to be added to the end of a GET request, in proper
	 * URIEncoded format
	 */
	req.queryString = "";

	/**
	 * After a response has been received, this will hold the text contents of
	 * the response - even in case of error
	 */
	req.responseText = null;

	/**
	 * After a response has been received, this will hold the XML content
	 */
	req.responseXML = null;

	/**
	 * After a response has been received, this will hold the status code of
	 * the response as returned by the server.
	 */
	req.status = null;

	/**
	 * After a response has been received, this will hold the text description
	 * of the response code
	 */
	req.statusText = null;

	/**
	 * An internal flag to indicate whether the request has been aborted
	 */
	req.aborted = false;

	/**
	 * The XMLHttpRequest object used internally
	 */
	req.xmlHttpRequest = null;

	// --------------
	// Event handlers
	// --------------

	/**
	 * If a timeout period is set, and it is reached before a response is
	 * received, a function reference assigned to onTimeout will be called
	 */
	req.onTimeout = null;

	/**
	 * A function reference assigned will be called when readyState=1
	 */
	req.onLoading = null;

	/**
	 * A function reference assigned will be called when readyState=2
	 */
	req.onLoaded = null;

	/**
	 * A function reference assigned will be called when readyState=3
	 */
	req.onInteractive = null;

	/**
	 * A function reference assigned will be called when readyState=4
	 */
	req.onComplete = null;

	/**
	 * A function reference assigned will be called after onComplete, if
	 * the statusCode=200
	 */
	req.onSuccess = null;

	/**
	 * A function reference assigned will be called after onComplete, if
	 * the statusCode != 200
	 */
	req.onError = null;

	/**
	 * If this request has a group name, this function reference will be called
	 * and passed the group name if this is the first request in the group to
	 * become active
	 */
	req.onGroupBegin = null;

	/**
	 * If this request has a group name, and this request is the last request
	 * in the group to complete, this function reference will be called
	 */
	req.onGroupEnd = null;

	// Get the XMLHttpRequest object itself
	req.xmlHttpRequest = AjaxRequest.getXmlHttpRequest();
	if (req.xmlHttpRequest==null) { return null; }

	// -------------------------------------------------------
	// Attach the event handlers for the XMLHttpRequest object
	// -------------------------------------------------------
	req.xmlHttpRequest.onreadystatechange =
	function() {
		if (req==null || req.xmlHttpRequest==null) { return; }
		if (req.xmlHttpRequest.readyState==1) { req.onLoadingInternal(req); }
		if (req.xmlHttpRequest.readyState==2) { req.onLoadedInternal(req); }
		if (req.xmlHttpRequest.readyState==3) { req.onInteractiveInternal(req); }
		if (req.xmlHttpRequest.readyState==4) { req.onCompleteInternal(req); }
	};

	// ---------------------------------------------------------------------------
	// Internal event handlers that fire, and in turn fire the user event handlers
	// ---------------------------------------------------------------------------
	// Flags to keep track if each event has been handled, in case of
	// multiple calls (some browsers may call the onreadystatechange
	// multiple times for the same state)
	req.onLoadingInternalHandled = false;
	req.onLoadedInternalHandled = false;
	req.onInteractiveInternalHandled = false;
	req.onCompleteInternalHandled = false;
	req.onLoadingInternal =
		function() {
			if (req.onLoadingInternalHandled) { return; }
			AjaxRequest.numActiveAjaxRequests++;
			if (AjaxRequest.numActiveAjaxRequests==1 && typeof(window['AjaxRequestBegin'])=="function") {
				AjaxRequestBegin();
			}
			if (req.groupName!=null) {
				if (typeof(AjaxRequest.numActiveAjaxGroupRequests[req.groupName])=="undefined") {
					AjaxRequest.numActiveAjaxGroupRequests[req.groupName] = 0;
				}
				AjaxRequest.numActiveAjaxGroupRequests[req.groupName]++;
				if (AjaxRequest.numActiveAjaxGroupRequests[req.groupName]==1 && typeof(req.onGroupBegin)=="function") {
					req.onGroupBegin(req.groupName);
				}
			}
			if (typeof(req.onLoading)=="function") {
				req.onLoading(req);
			}
			req.onLoadingInternalHandled = true;
		};
	req.onLoadedInternal =
		function() {
			if (req.onLoadedInternalHandled) { return; }
			if (typeof(req.onLoaded)=="function") {
				req.onLoaded(req);
			}
			req.onLoadedInternalHandled = true;
		};
	req.onInteractiveInternal =
		function() {
			if (req.onInteractiveInternalHandled) { return; }
			if (typeof(req.onInteractive)=="function") {
				req.onInteractive(req);
			}
			req.onInteractiveInternalHandled = true;
		};
	req.onCompleteInternal =
		function() {
			if (req.onCompleteInternalHandled || req.aborted) { return; }
			req.onCompleteInternalHandled = true;
			AjaxRequest.numActiveAjaxRequests--;
			if (AjaxRequest.numActiveAjaxRequests==0 && typeof(window['AjaxRequestEnd'])=="function") {
				AjaxRequestEnd(req.groupName);
			}
			if (req.groupName!=null) {
				AjaxRequest.numActiveAjaxGroupRequests[req.groupName]--;
				if (AjaxRequest.numActiveAjaxGroupRequests[req.groupName]==0 && typeof(req.onGroupEnd)=="function") {
					req.onGroupEnd(req.groupName);
				}
			}
			req.responseReceived = true;
			req.status = req.xmlHttpRequest.status;
			req.statusText = req.xmlHttpRequest.statusText;
			req.responseText = req.xmlHttpRequest.responseText;
			req.responseXML = req.xmlHttpRequest.responseXML;
			if (typeof(req.onComplete)=="function") {
				req.onComplete(req);
			}
			if (req.xmlHttpRequest.status==200 && typeof(req.onSuccess)=="function") {
				req.onSuccess(req);
			}
			else if (typeof(req.onError)=="function") {
				req.onError(req);
			}

			// Clean up so IE doesn't leak memory
			delete req.xmlHttpRequest['onreadystatechange'];
			req.xmlHttpRequest = null;
		};
	req.onTimeoutInternal =
		function() {
			if (req!=null && req.xmlHttpRequest!=null && !req.onCompleteInternalHandled) {
				req.aborted = true;
				req.xmlHttpRequest.abort();
				AjaxRequest.numActiveAjaxRequests--;
				if (AjaxRequest.numActiveAjaxRequests==0 && typeof(window['AjaxRequestEnd'])=="function") {
					AjaxRequestEnd(req.groupName);
				}
				if (req.groupName!=null) {
					AjaxRequest.numActiveAjaxGroupRequests[req.groupName]--;
					if (AjaxRequest.numActiveAjaxGroupRequests[req.groupName]==0 && typeof(req.onGroupEnd)=="function") {
						req.onGroupEnd(req.groupName);
					}
				}
				if (typeof(req.onTimeout)=="function") {
					req.onTimeout(req);
				}
			// Opera won't fire onreadystatechange after abort, but other browsers do.
			// So we can't rely on the onreadystate function getting called. Clean up here!
			delete req.xmlHttpRequest['onreadystatechange'];
			req.xmlHttpRequest = null;
			}
		};

	// ----------------
	// Instance methods
	// ----------------
	/**
	 * The process method is called to actually make the request. It builds the
	 * querystring for GET requests (the content for POST requests), sets the
	 * appropriate headers if necessary, and calls the
	 * XMLHttpRequest.send() method
	*/
	req.process =
		function() {
			if (req.xmlHttpRequest!=null) {
				// Some logic to get the real request URL
				if (req.generateUniqueUrl && req.method=="GET") {
					req.parameters["AjaxRequestUniqueId"] = new Date().getTime() + "" + req.requestIndex;
				}
				var content = null; // For POST requests, to hold query string
				for (var i in req.parameters) {
					if (req.queryString.length>0) { req.queryString += "&"; }
					req.queryString += encodeURIComponent(i) + "=" + encodeURIComponent(req.parameters[i]);
				}
				if (req.method=="GET") {
					if (req.queryString.length>0) {
						req.url += ((req.url.indexOf("?")>-1)?"&":"?") + req.queryString;
					}
				}
				req.xmlHttpRequest.open(req.method,req.url,req.async,req.username,req.password);
				if (req.method=="POST") {
					if (typeof(req.xmlHttpRequest.setRequestHeader)!="undefined") {
						req.xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					}
					content = req.queryString;
				}
				if (req.timeout>0) {
					setTimeout(req.onTimeoutInternal,req.timeout);
				}
				req.xmlHttpRequest.send(content);
			}
		};

	/**
	 * An internal function to handle an Object argument, which may contain
	 * either AjaxRequest field values or parameter name/values
	 */
	req.handleArguments =
		function(args) {
			for (var i in args) {
				// If the AjaxRequest object doesn't have a property which was passed, treat it as a url parameter
				if (typeof(req[i])=="undefined") {
					req.parameters[i] = args[i];
				}
				else {
					req[i] = args[i];
				}
			}
		};

	/**
	 * Returns the results of XMLHttpRequest.getAllResponseHeaders().
	 * Only available after a response has been returned
	 */
	req.getAllResponseHeaders =
		function() {
			if (req.xmlHttpRequest!=null) {
				if (req.responseReceived) {
					return req.xmlHttpRequest.getAllResponseHeaders();
				}
				alert("Cannot getAllResponseHeaders because a response has not yet been received");
			}
		};

	/**
	 * Returns the the value of a response header as returned by
	 * XMLHttpRequest,getResponseHeader().
	 * Only available after a response has been returned
	 */
	req.getResponseHeader =
		function(headerName) {
			if (req.xmlHttpRequest!=null) {
				if (req.responseReceived) {
					return req.xmlHttpRequest.getResponseHeader(headerName);
				}
				alert("Cannot getResponseHeader because a response has not yet been received");
			}
		};

	return req;
}

// ---------------------------------------
// Static methods of the AjaxRequest class
// ---------------------------------------

/**
 * Returns an XMLHttpRequest object, either as a core object or an ActiveX
 * implementation. If an object cannot be instantiated, it will return null;
 */
AjaxRequest.getXmlHttpRequest = function() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		// Based on http://jibbering.com/2002/4/httprequest.html
		/*@cc_on @*/
		/*@if (@_jscript_version >= 5)
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				return null;
			}
		}
		@end @*/
	}
	else {
		return null;
	}
};

/**
 * See if any request is active in the background
 */
AjaxRequest.isActive = function() {
	return (AjaxRequest.numActiveAjaxRequests>0);
};

/**
 * Make a GET request. Pass an object containing parameters and arguments as
 * the second argument.
 * These areguments may be either AjaxRequest properties to set on the request
 * object or name/values to set in the request querystring.
 */
AjaxRequest.get = function(args) {
	AjaxRequest.doRequest("GET",args);
};

/**
 * Make a POST request. Pass an object containing parameters and arguments as
 * the second argument.
 * These areguments may be either AjaxRequest properties to set on the request
 * object or name/values to set in the request querystring.
 */
AjaxRequest.post = function(args) {
	AjaxRequest.doRequest("POST",args);
};

/**
 * The internal method used by the .get() and .post() methods
 */
AjaxRequest.doRequest = function(method,args) {
	if (typeof(args)!="undefined" && args!=null) {
		var myRequest = new AjaxRequest();
		myRequest.method = method;
		myRequest.handleArguments(args);
		myRequest.process();
	}
}	;

/**
 * Submit a form. The requested URL will be the form's ACTION, and the request
 * method will be the form's METHOD.
 * Returns true if the submittal was handled successfully, else false so it
 * can easily be used with an onSubmit event for a form, and fallback to
 * submitting the form normally.
 */
AjaxRequest.submit = function(theform, args) {
	var myRequest = new AjaxRequest();
	if (myRequest==null) { return false; }
	var serializedForm = AjaxRequest.serializeForm(theform);
	myRequest.method = theform.method.toUpperCase();
	myRequest.url = theform.action;
	myRequest.handleArguments(args);
	myRequest.queryString = serializedForm;
	myRequest.process();
	return true;
};

/**
 * Serialize a form into a format which can be sent as a GET string or a POST
 * content.It correctly ignores disabled fields, maintains order of the fields
 * as in the elements[] array. The 'file' input type is not supported, as
 * its content is not available to javascript. This method is used internally
 * by the submit class method.
 */
AjaxRequest.serializeForm = function(theform) {
	var els = theform.elements;
	var len = els.length;
	var queryString = "";
	this.addField =
		function(name,value) {
			if (queryString.length>0) {
				queryString += "&";
			}
			queryString += encodeURIComponent(name) + "=" + encodeURIComponent(value);
		};
	for (var i=0; i<len; i++) {
		var el = els[i];
		if (!el.disabled) {
			switch(el.type) {
				case 'text': case 'password': case 'hidden': case 'textarea':
					this.addField(el.name,el.value);
					break;
				case 'select-one':
					if (el.selectedIndex>=0) {
						this.addField(el.name,el.options[el.selectedIndex].value);
					}
					break;
				case 'select-multiple':
					for (var j=0; j<el.options.length; j++) {
						if (el.options[j].selected) {
							this.addField(el.name,el.options[j].value);
						}
					}
					break;
				case 'checkbox': case 'radio':
					if (el.checked) {
						this.addField(el.name,el.value);
					}
					break;
			}
		}
	}
	return queryString;
};

// -----------------------
// Static Class variables
// -----------------------

/**
 * The number of total AjaxRequest objects currently active and running
 */
AjaxRequest.numActiveAjaxRequests = 0;

/**
 * An object holding the number of active requests for each group
 */
AjaxRequest.numActiveAjaxGroupRequests = new Object();

/**
 * The total number of AjaxRequest objects instantiated
 */
AjaxRequest.numAjaxRequests = 0;

/* Merged js */

jQuery(document).ready(function(){
	jQuery('#_site_list_dropdown').change(function(){
		_site_list_value = jQuery(this).val();
		window.document.location = uri + 'showpage.php?id=' + _site_list_value;
	});

	jQuery('#_calendar_site_list_dropdown').change(function(){
		jQuery(this).parent('form').submit();
	});
	jQuery(document).ready(function() {
			jQuery('a[rel=lightbox]').lightBox(); // Select all links that contains lightbox in the attribute rel
			jQuery('a.lightbox').lightBox();
		});
});

// global variables //
var TIMER = 5;
var SPEED = 10;
var WRAPPER = 'wrapper';

// calculate the current window width //
function pageWidth() {
  return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
}

// calculate the current window height //
function pageHeight() {
  return window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
}

// calculate the current window vertical offset //
function topPosition() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

// calculate the position starting at the left of the window //
function leftPosition() {
  return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
}

// build/show the dialog box, populate the data and call the fadeDialog function //
function showDialog(title,message,type,url,domain,privatefor) {
  if(!type) {
	type = 'error';
  }
  var dialog;
  var dialogheader;
  var dialogclose;
  var dialogtitle;
  var dialogcontent;
  var dialogmask;

	dialog = document.createElement('div');
	dialog.id = 'dialog';
	dialogheader = document.createElement('div');
	dialogheader.id = 'dialog-header';
	dialogtitle = document.createElement('div');
	dialogtitle.id = 'dialog-title';
	dialogclose = document.createElement('div');
	dialogclose.id = 'dialog-close'
	dialogcontent = document.createElement('div');
	dialogcontent.id = 'dialog-content';
	dialogmask = document.createElement('div');
	dialogmask.id = 'dialog-mask';
	document.body.appendChild(dialogmask);
	document.body.appendChild(dialog);
	dialog.appendChild(dialogheader);
	dialogheader.appendChild(dialogtitle);
	dialogheader.appendChild(dialogclose);
	dialog.appendChild(dialogcontent);;
	dialogclose.setAttribute('onclick','hideDialogWithoutFade2()');
	dialogclose.onclick = hideDialogWithoutFade2;

   dialog.style.opacity = .00;
   dialog.style.filter = 'alpha(opacity=0)';
   dialog.alpha = 0;
  var width = pageWidth();
  var height = pageHeight();
  var left = leftPosition();
  var top = topPosition();
  var dialogwidth = dialog.offsetWidth;
  var dialogheight = dialog.offsetHeight;
  var topposition = top + (height / 3) - (dialogheight / 2);
  var leftposition = left + (width / 2) - (dialogwidth / 2);
  dialog.style.top = topposition + "px";
  dialog.style.left = leftposition + "px";
  dialogheader.className = type + "header";
  dialogtitle.innerHTML = title;
  dialogcontent.className = type;

  //code for dialog contents
  var  dialogcontent_select2 = document.createElement('select');
  var  dialogcontent_select = document.createElement('select');
  dialogcontent_select.name='role';
  dialogcontent_select.id='role';

  var  dialogcontent_option = document.createElement('option');
  dialogcontent_option.value='1';
  dialogcontent_option.innerHTML='Administrator';
  dialogcontent_select.appendChild(dialogcontent_option);;

  var  dialogcontent_option = document.createElement('option');
  dialogcontent_option.value='2';
  dialogcontent_option.innerHTML='Publisher';
  dialogcontent_select.appendChild(dialogcontent_option);;

  var  dialogcontent_option = document.createElement('option');
  dialogcontent_option.value='3';
  dialogcontent_option.innerHTML='Teacher';
  dialogcontent_select.appendChild(dialogcontent_option);;

  var  dialogcontent_option = document.createElement('option');
  dialogcontent_option.value='4';
  dialogcontent_option.innerHTML='Governor';
  dialogcontent_select.appendChild(dialogcontent_option);;

  var  dialogcontent_option = document.createElement('option');
  dialogcontent_option.value='5';
  dialogcontent_option.innerHTML='Parent';
  dialogcontent_select.appendChild(dialogcontent_option);;

  var  dialogcontent_option = document.createElement('option');
  dialogcontent_option.value='6';
  dialogcontent_option.innerHTML='people';
  dialogcontent_select.appendChild(dialogcontent_option);;

  dialogcontent_select2.appendChild(dialogcontent_select);;

  var p = document.createElement("p");

  var form = document.createElement("form");
  form.name='form';
  form.id='form';

  var table = document.createElement("TABLE");
  table.cellSpacing = 5;
  table.border = 0;
  table.cellPadding = 10;
  table.width = 300;


  //first tr
  //var trhead = document.createElement("TR");
  //var td = document.createElement("TD");
  //td.innerHTML = 'Role:';
  //trhead.appendChild(td);

  //var td = document.createElement("TD");
  //td.innerHTML = dialogcontent_select2.innerHTML;
 // trhead.appendChild(td);

  //table.appendChild(trhead);

  //second tr
  var trhead = document.createElement("TR");
  var td = document.createElement("TD");
  td.innerHTML = 'Username:';
  trhead.appendChild(td);

  var td = document.createElement("TD");
  td.innerHTML = "<input type='text' style='background:#FFFFCE;' name='us_re' id='us_re' size='25' onKeyDown='checkEnter(event);'/>";
  trhead.appendChild(td);

  table.appendChild(trhead);

  //third tr
  var trhead = document.createElement("TR");
  var td = document.createElement("TD");
  td.innerHTML = 'Password:';
  trhead.appendChild(td);

  var td = document.createElement("TD");
  td.innerHTML = "<input type='password' style='background:#FFFFCE;' name='ps_re' id='ps_re' size='25' onKeyDown='checkEnter(event);'/>";
  trhead.appendChild(td);

  table.appendChild(trhead);

  //fourth tr
  var trhead = document.createElement("TR");
  var td = document.createElement("TD");
  td.innerHTML = "&nbsp;";
  trhead.appendChild(td);

  var td = document.createElement("TD");
  td.innerHTML = "<input type='button' value='&nbsp;Login&nbsp;' style='padding:2px;background:#DFDFDF;color:#535353;font-weight:bold;' onclick=\"validate('"+url+"','"+domain+"',form.us_re.value,form.ps_re.value,'','"+privatefor+"');\"/>&nbsp;&nbsp;&nbsp;<input type='button' value='&nbsp;Cancel&nbsp;' style='padding:2px;background:#DFDFDF;color:#535353;font-weight:bold;' onclick=\"hideDialogWithoutFade2();\"/>";
  trhead.appendChild(td);

  table.appendChild(trhead);

  form.appendChild(table);
  p.appendChild(form);

  dialogcontent.innerHTML = p.innerHTML;
  document.getElementById("form").us_re.focus();
  var content = document.getElementById(WRAPPER);
  dialogmask.style.height = content.offsetHeight + 'px';
  dialog.timer = setInterval("fadeDialog(1)", TIMER);
  if(0) {
	dialogclose.style.visibility = "hidden";
	window.setTimeout("hideDialog()", (2 * 10000));
  } else {
	dialogclose.style.visibility = "visible";
  }
}
// hide the dialog box //
function hideDialog() {
  var dialog = document.getElementById('dialog');
  clearInterval(dialog.timer);
  dialog.timer = setInterval("fadeDialog(0)", TIMER);
}

function hideDialogWithoutFade(title,message) {

  var dialog = document.getElementById('dialog');
  dialog.style.background='#FF8080';
  var dialogcon = document.getElementById('dialog-content');
  dialogcon.innerHTML="<div style='vertical-align:middle;'><p style='font-family:Verdana, Arial, Helvetica; font-size:14px; font-weight:bold'>"+message+"</p></div>";
  dialogcon.className = "error";
  var dialogclose = document.getElementById('dialog-close');
  var dialogtitle = document.getElementById('dialog-title');
  var dialogheader = document.getElementById('dialog-header');
  dialogheader.className ="errorheader";
  dialogtitle.innerHTML = title;
  dialogclose.style.visibility = "hidden";
  window.setTimeout("hideDialog()", (3 * 1000));
}

function hideDialogWithoutFade2() {

  var dialog = document.getElementById('dialog');
  //dialog.style.background='#FF8080';
  var dialogcon = document.getElementById('dialog-content');
  dialogcon.innerHTML='';
  //dialogcon.className = "error";
  var dialogclose = document.getElementById('dialog-close');
  var dialogtitle = document.getElementById('dialog-title');
  var dialogheader = document.getElementById('dialog-header');
  //dialogheader.className ="errorheader";
  dialogtitle.innerHTML = '';
  dialogclose.style.visibility = "hidden";
  window.setTimeout("hideDialog()", (1 * 100));
}

function checkEnter(event)
{

   if (event.keyCode == 13)
	if(document.getElementById("form").ps_re.value != "" && document.getElementById("form").us_re.value != "")
		;//document.getElementById("form").submit();;

}
// fade-in the dialog box //
function fadeDialog(flag) {
  if(flag == null) {
	flag = 1;
  }
  var dialog = document.getElementById('dialog');
  var value;
  if(flag == 1) {
	value = dialog.alpha + SPEED;
  } else {
	value = dialog.alpha - SPEED;
  }
  dialog.alpha = value;
  dialog.style.opacity = (value / 100);
  dialog.style.filter = 'alpha(opacity=' + value + ')';
  if(value >= 99) {
	clearInterval(dialog.timer);
	dialog.timer = null;
  } else if(value <= 1) {
	dialog.style.visibility = "hidden";
	document.getElementById('dialog-mask').style.visibility = "hidden";
	clearInterval(dialog.timer);
	document.body.removeChild(dialog);
	document.body.removeChild(document.getElementById('dialog-mask'));

  }
}

(function(){function log(args){}function clone(obj){if(!obj||typeof obj!='object'){return obj;}var temp=new obj.constructor();for(var key in obj){if(obj.hasOwnProperty(key)){temp[key]=clone(obj[key]);}}return temp;}function each(obj,fn){if(!obj){return;}var name,i=0,length=obj.length;if(length===undefined){for(name in obj){if(fn.call(obj[name],name,obj[name])===false){break;}}}else{for(var value=obj[0];i<length&&fn.call(value,i,value)!==false;value=obj[++i]){}}return obj;}function el(id){return document.getElementById(id);}function extend(to,from,skipFuncs){if(to&&from){each(from,function(name,value){if(!skipFuncs||typeof value!='function'){to[name]=value;}});}}function select(query){var index=query.indexOf(".");if(index!=-1){var tag=query.substring(0,index)||"*";var klass=query.substring(index+1,query.length);var els=[];each(document.getElementsByTagName(tag),function(){if(this.className&&this.className.indexOf(klass)!=-1){els.push(this);}});return els;}}function stopEvent(e){e=e||window.event;if(e.preventDefault){e.stopPropagation();e.preventDefault();}else{e.returnValue=false;e.cancelBubble=true;}return false;}function bind(to,evt,fn){to[evt]=to[evt]||[];to[evt].push(fn);}function makeId(){return"_"+(""+Math.random()).substring(2,10);}var Clip=function(json,index,player){var self=this;var cuepoints={};var listeners={};self.index=index;if(typeof json=='string'){json={url:json};}extend(this,json,true);each(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var evt="on"+this;if(evt.indexOf("*")!=-1){evt=evt.substring(0,evt.length-1);var before="onBefore"+evt.substring(2);self[before]=function(fn){bind(listeners,before,fn);return self;};}self[evt]=function(fn){bind(listeners,evt,fn);return self;};if(index==-1){if(self[before]){player[before]=self[before];}if(self[evt]){player[evt]=self[evt];}}});extend(this,{onCuepoint:function(points,fn){if(arguments.length==1){cuepoints.embedded=[null,points];return self;}if(typeof points=='number'){points=[points];}var fnId=makeId();cuepoints[fnId]=[points,fn];if(player.isLoaded()){player._api().fp_addCuepoints(points,index,fnId);}return self;},update:function(json){extend(self,json);if(player.isLoaded()){player._api().fp_updateClip(json,index);}var conf=player.getConfig();var clip=(index==-1)?conf.clip:conf.playlist[index];extend(clip,json,true);},_fireEvent:function(evt,arg1,arg2,target){if(evt=='onLoad'){each(cuepoints,function(key,val){if(val[0]){player._api().fp_addCuepoints(val[0],index,key);}});return false;}if(index!=-1){target=self;}if(evt=='onCuepoint'){var fn=cuepoints[arg1];if(fn){return fn[1].call(player,target,arg2);}}if(evt=='onStart'||evt=='onUpdate'){extend(target,arg1);if(!target.duration){target.duration=arg1.metaData.duration;}else{target.fullDuration=arg1.metaData.duration;}}var ret=true;each(listeners[evt],function(){ret=this.call(player,target,arg1,arg2);});return ret;}});if(json.onCuepoint){var arg=json.onCuepoint;self.onCuepoint.apply(self,typeof arg=='function'?[arg]:arg);delete json.onCuepoint;}each(json,function(key,val){if(typeof val=='function'){bind(listeners,key,val);delete json[key];}});if(index==-1){player.onCuepoint=this.onCuepoint;}};var Plugin=function(name,json,player,fn){var listeners={};var self=this;var hasMethods=false;if(fn){extend(listeners,fn);}each(json,function(key,val){if(typeof val=='function'){listeners[key]=val;delete json[key];}});extend(this,{animate:function(props,speed,fn){if(!props){return self;}if(typeof speed=='function'){fn=speed;speed=500;}if(typeof props=='string'){var key=props;props={};props[key]=speed;speed=500;}if(fn){var fnId=makeId();listeners[fnId]=fn;}if(speed===undefined){speed=500;}json=player._api().fp_animate(name,props,speed,fnId);return self;},css:function(props,val){if(val!==undefined){var css={};css[props]=val;props=css;}json=player._api().fp_css(name,props);extend(self,json);return self;},show:function(){this.display='block';player._api().fp_showPlugin(name);return self;},hide:function(){this.display='none';player._api().fp_hidePlugin(name);return self;},toggle:function(){this.display=player._api().fp_togglePlugin(name);return self;},fadeTo:function(o,speed,fn){if(typeof speed=='function'){fn=speed;speed=500;}if(fn){var fnId=makeId();listeners[fnId]=fn;}this.display=player._api().fp_fadeTo(name,o,speed,fnId);this.opacity=o;return self;},fadeIn:function(speed,fn){return self.fadeTo(1,speed,fn);},fadeOut:function(speed,fn){return self.fadeTo(0,speed,fn);},getName:function(){return name;},_fireEvent:function(evt,arg){if(evt=='onUpdate'){var json=player._api().fp_getPlugin(name);if(!json){return;}extend(self,json);delete self.methods;if(!hasMethods){each(json.methods,function(){var method=""+this;self[method]=function(){var a=[].slice.call(arguments);var ret=player._api().fp_invoke(name,method,a);return ret=='undefined'?self:ret;};});hasMethods=true;}}var fn=listeners[evt];if(fn){fn.call(self,arg);if(evt.substring(0,1)=="_"){delete listeners[evt];}}}});};function Player(wrapper,params,conf){var self=this,api=null,html,commonClip,playlist=[],plugins={},listeners={},playerId,apiId,playerIndex,activeIndex,swfHeight,wrapperHeight;extend(self,{id:function(){return playerId;},isLoaded:function(){return(api!==null);},getParent:function(){return wrapper;},hide:function(all){if(all){wrapper.style.height="0px";}if(api){api.style.height="0px";}return self;},show:function(){wrapper.style.height=wrapperHeight+"px";if(api){api.style.height=swfHeight+"px";}return self;},isHidden:function(){return api&&parseInt(api.style.height,10)===0;},load:function(fn){if(!api&&self._fireEvent("onBeforeLoad")!==false){each(players,function(){this.unload();});html=wrapper.innerHTML;


flashembed(wrapper,params,{'config':conf});


if(fn){fn.cached=true;bind(listeners,"onLoad",fn);}}return self;},unload:function(){try{if(api&&api.fp_isFullscreen()){}}catch(error){return;}if(api&&html.replace(/\s/g,'')!==''&&!api.fp_isFullscreen()&&self._fireEvent("onBeforeUnload")!==false){api.fp_close();wrapper.innerHTML=html;self._fireEvent("onUnload");api=null;}return self;},getClip:function(index){if(index===undefined){index=activeIndex;}return playlist[index];},getCommonClip:function(){return commonClip;},getPlaylist:function(){return playlist;},getPlugin:function(name){var plugin=plugins[name];if(!plugin&&self.isLoaded()){var json=self._api().fp_getPlugin(name);if(json){plugin=new Plugin(name,json,self);plugins[name]=plugin;}}return plugin;},getScreen:function(){return self.getPlugin("screen");},getControls:function(){return self.getPlugin("controls");},getConfig:function(copy){return copy?clone(conf):conf;},getFlashParams:function(){return params;},loadPlugin:function(name,url,props,fn){if(typeof props=='function'){fn=props;props={};}var fnId=fn?makeId():"_";self._api().fp_loadPlugin(name,url,props,fnId);var arg={};arg[fnId]=fn;var p=new Plugin(name,null,self,arg);plugins[name]=p;return p;},getState:function(){return api?api.fp_getState():-1;},play:function(clip){function play(){if(clip!==undefined){self._api().fp_play(clip);}else{self._api().fp_play();}}if(api){play();}else{self.load(function(){play();});}return self;},getVersion:function(){var js="flowplayer.js 3.0.3";if(api){var ver=api.fp_getVersion();ver.push(js);return ver;}return js;},_api:function(){if(!api){throw"Flowplayer "+self.id()+" not loaded. Try moving your call to player's onLoad event";}return api;},_dump:function(){console.log(listeners);},setClip:function(clip){self.setPlaylist([clip]);},getIndex:function(){return playerIndex;}});each(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,Fullscreen*,FullscreenExit,Error").split(","),function(){var name="on"+this;if(name.indexOf("*")!=-1){name=name.substring(0,name.length-1);var name2="onBefore"+name.substring(2);self[name2]=function(fn){bind(listeners,name2,fn);return self;};}self[name]=function(fn){bind(listeners,name,fn);return self;};});each(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,reset,close,setPlaylist").split(","),function(){var name=this;self[name]=function(arg){if(!api){return self;}var ret=(arg===undefined)?api["fp_"+name]():api["fp_"+name](arg);return ret=='undefined'?self:ret;};});self._fireEvent=function(evt,arg0,arg1,arg2){if(conf.debug){log(arguments);}if(!api&&evt=='onLoad'&&arg0=='player'){api=api||el(apiId);swfHeight=api.clientHeight;each(playlist,function(){this._fireEvent("onLoad");});each(plugins,function(name,p){p._fireEvent("onUpdate");});commonClip._fireEvent("onLoad");}if(evt=='onLoad'&&arg0!='player'){return;}if(evt=='onError'){if(typeof arg0=='string'||(typeof arg0=='number'&&typeof arg1=='number')){arg0=arg1;arg1=arg2;}}if(evt=='onContextMenu'){each(conf.contextMenu[arg0],function(key,fn){fn.call(self);});return;}if(evt=='onPluginEvent'){var name=arg0.name||arg0;var p=plugins[name];if(p){p._fireEvent("onUpdate",arg0);p._fireEvent(arg1);}return;}if(evt=='onPlaylistReplace'){playlist=[];var index=0;each(arg0,function(){playlist.push(new Clip(this,index++,self));});}var ret=true;if(arg0===0||(arg0&&arg0>=0&&arg0<playlist.length)){activeIndex=arg0;var clip=playlist[arg0];if(clip){ret=clip._fireEvent(evt,arg1,arg2);}if(!clip||ret!==false){ret=commonClip._fireEvent(evt,arg1,arg2,clip);}}var i=0;each(listeners[evt],function(){ret=this.call(self,arg0,arg1);if(this.cached){listeners[evt].splice(i,1);}if(ret===false){return false;}i++;});return ret;};function init(){if($f(wrapper)){$f(wrapper).getParent().innerHTML="";playerIndex=$f(wrapper).getIndex();players[playerIndex]=self;}else{players.push(self);playerIndex=players.length-1;}wrapperHeight=parseInt(wrapper.style.height,10)||wrapper.clientHeight;if(typeof params=='string'){params={src:params};}playerId=wrapper.id||"fp"+makeId();apiId=params.id||playerId+"_api";params.id=apiId;conf.playerId=playerId;if(typeof conf=='string'){conf={clip:{url:conf}};}conf.clip=conf.clip||{};if(wrapper.getAttribute("href",2)&&!conf.clip.url){conf.clip.url=wrapper.getAttribute("href",2);}commonClip=new Clip(conf.clip,-1,self);conf.playlist=conf.playlist||[conf.clip];var index=0;each(conf.playlist,function(){var clip=this;if(typeof clip=='object'&&clip.length){clip=""+clip;}if(!clip.url&&typeof clip=='string'){clip={url:clip};}each(conf.clip,function(key,val){if(clip[key]===undefined&&typeof val!='function'){clip[key]=val;}});conf.playlist[index]=clip;clip=new Clip(clip,index,self);playlist.push(clip);index++;});each(conf,function(key,val){if(typeof val=='function'){bind(listeners,key,val);delete conf[key];}});each(conf.plugins,function(name,val){if(val){plugins[name]=new Plugin(name,val,self);}});if(!conf.plugins||conf.plugins.controls===undefined){plugins.controls=new Plugin("controls",null,self);}params.bgcolor=params.bgcolor||"#000000";params.version=params.version||[9,0];params.expressInstall='http://www.flowplayer.org/swf/expressinstall.swf';function doClick(e){if(!self.isLoaded()&&self._fireEvent("onBeforeClick")!==false){self.load();}return stopEvent(e);}html=wrapper.innerHTML;if(html.replace(/\s/g,'')!==''){if(wrapper.addEventListener){wrapper.addEventListener("click",doClick,false);}else if(wrapper.attachEvent){wrapper.attachEvent("onclick",doClick);}}else{if(wrapper.addEventListener){wrapper.addEventListener("click",stopEvent,false);}self.load();}}if(typeof wrapper=='string'){flashembed.domReady(function(){var node=el(wrapper);if(!node){throw"Flowplayer cannot access element: "+wrapper;}else{wrapper=node;init();}});}else{init();}}var players=[];function Iterator(arr){this.length=arr.length;this.each=function(fn){each(arr,fn);};this.size=function(){return arr.length;};}window.flowplayer=window.$f=function(){var instance=null;var arg=arguments[0];if(!arguments.length){each(players,function(){if(this.isLoaded()){instance=this;return false;}});return instance||players[0];}if(arguments.length==1){if(typeof arg=='number'){return players[arg];}else{if(arg=='*'){return new Iterator(players);}each(players,function(){if(this.id()==arg.id||this.id()==arg||this.getParent()==arg){instance=this;return false;}});return instance;}}if(arguments.length>1){var swf=arguments[1];var conf=(arguments.length==3)?arguments[2]:{};if(typeof arg=='string'){if(arg.indexOf(".")!=-1){var instances=[];each(select(arg),function(){instances.push(new Player(this,clone(swf),clone(conf)));});return new Iterator(instances);}else{var node=el(arg);return new Player(node!==null?node:arg,swf,conf);}}else if(arg){return new Player(arg,swf,conf);}}return null;};extend(window.$f,{fireEvent:function(id,evt,a0,a1,a2){var p=$f(id);return p?p._fireEvent(evt,a0,a1,a2):null;},addPlugin:function(name,fn){Player.prototype[name]=fn;return $f;},each:each,extend:extend});if(document.all){window.onbeforeunload=function(){$f("*").each(function(){if(this.isLoaded()){this.close();}});};}if(typeof jQuery=='function'){jQuery.prototype.flowplayer=function(params,conf){if(!arguments.length||typeof arguments[0]=='number'){var arr=[];this.each(function(){var p=$f(this);if(p){arr.push(p);}});return arguments.length?arr[arguments[0]]:new Iterator(arr);}return this.each(function(){$f(this,clone(params),conf?clone(conf):{});});};}})();(function(){var jQ=typeof jQuery=='function';function isDomReady(){if(domReady.done){return false;}var d=document;if(d&&d.getElementsByTagName&&d.getElementById&&d.body){clearInterval(domReady.timer);domReady.timer=null;for(var i=0;i<domReady.ready.length;i++){domReady.ready[i].call();}domReady.ready=null;domReady.done=true;}}var domReady=jQ?jQuery:function(f){if(domReady.done){return f();}if(domReady.timer){domReady.ready.push(f);}else{domReady.ready=[f];domReady.timer=setInterval(isDomReady,13);}};function extend(to,from){if(from){for(key in from){if(from.hasOwnProperty(key)){to[key]=from[key];}}}return to;}function concatVars(vars){var out="";for(var key in vars){if(vars[key]){out+=[key]+'='+asString(vars[key])+'&';}}return out.substring(0,out.length-1);}function asString(obj){switch(typeOf(obj)){case'string':obj=obj.replace(new RegExp('(["\\\\])','g'),'\\$1');obj=obj.replace(/^\s?(\d+)%/,"$1pct");return'"'+obj+'"';case'array':return'['+map(obj,function(el){return asString(el);}).join(',')+']';case'function':return'"function()"';case'object':var str=[];for(var prop in obj){if(obj.hasOwnProperty(prop)){str.push('"'+prop+'":'+asString(obj[prop]));}}return'{'+str.join(',')+'}';}return String(obj).replace(/\s/g," ").replace(/\'/g,"\"");}function typeOf(obj){if(obj===null||obj===undefined){return false;}var type=typeof obj;return(type=='object'&&obj.push)?'array':type;}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};});}function map(arr,func){var newArr=[];for(var i in arr){if(arr.hasOwnProperty(i)){newArr[i]=func(arr[i]);}}return newArr;}function getEmbedCode(p,c){var html='<embed type="application/x-shockwave-flash" ';if(p.id){extend(p,{name:p.id});}for(var key in p){if(p[key]!==null){html+=key+'="'+p[key]+'"\n\t';}}if(c){html+='flashvars=\''+concatVars(c)+'\'';}html+='/>';return html;}function getObjectCode(p,c,embeddable){var html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';html+='width="'+p.width+'" height="'+p.height+'"';if(!p.id&&document.all){p.id="_"+(""+Math.random()).substring(5);}if(p.id){html+=' id="'+p.id+'"';}html+='>';if(document.all){p.src+=((p.src.indexOf("?")!=-1?"&":"?")+Math.random());}html+='\n\t<param name="movie" value="'+p.src+'" />';var e=extend({},p);e.id=e.width=e.height=e.src=null;for(var k in e){if(e[k]!==null){html+='\n\t<param name="'+k+'" value="'+e[k]+'" />';}}if(c){html+='\n\t<param name="flashvars" value=\''+concatVars(c)+'\' />';}if(embeddable){html+=getEmbedCode(p,c);}html+="</object>";return html;}function getFullHTML(p,c){return getObjectCode(p,c,true);}function getHTML(p,c){var isNav=navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length;return(isNav)?getEmbedCode(p,c):getObjectCode(p,c);}

window.flashembed=function(root,userParams,flashvars){
	var params={src:'#',width:'100%',height:'100%',version:null,onFail:null,expressInstall:null,debug:false,allowfullscreen:true,allowscriptaccess:'always',quality:'high',type:'application/x-shockwave-flash',pluginspage:'http://www.adobe.com/go/getflashplayer'};
	if(typeof userParams=='string'){
		userParams={src:userParams};
	}
	extend(params,userParams);
	var version=flashembed.getVersion();
	var required=params.version;
	var express=params.expressInstall;
	var debug=params.debug;
	if(typeof root=='string'){
		var el=document.getElementById(root);
		if(el){
			root=el;
		}else{
			domReady(function(){flashembed(root,userParams,flashvars);});
			return;
		}
	}
	if(!root){
		return;
	}


	if(!required||flashembed.isSupported(required)){
		params.onFail=params.version=params.expressInstall=params.debug=null;
		root.innerHTML=getHTML(params,flashvars);
		return root.firstChild;
	}else if(params.onFail){
		var ret=params.onFail.call(params,flashembed.getVersion(),flashvars);
		if(ret===true){
			root.innerHTML=ret;
		}
	}else if(required&&express&&flashembed.isSupported([6,65])){
		extend(params,{src:express});
		flashvars={MMredirectURL:location.href,MMplayerType:'PlugIn',MMdoctitle:document.title};
		root.innerHTML=getHTML(params,flashvars);
	}else{

		if(root.innerHTML.replace(/\s/g,'')!==''){


		}else{
			var versiontext = (version[0]>0)?("Your version is "+version):"You have no flash plugin installed";
			root.innerHTML="<p>Your Flash Plugin is out of date. Please visit http://get.adobe.com/flashplayer to update</p>";
		}
	}


	return root;
};

extend(window.flashembed,{getVersion:function(){var version=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var _d=navigator.plugins["Shockwave Flash"].description;if(typeof _d!="undefined"){_d=_d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var _m=parseInt(_d.replace(/^(.*)\..*$/,"$1"),10);var _r=/r/.test(_d)?parseInt(_d.replace(/^.*r(.*)$/,"$1"),10):0;version=[_m,_r];}}else if(window.ActiveXObject){try{var _a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{_a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");version=[6,0];_a.AllowScriptAccess="always";}catch(ee){if(version[0]==6){return;}}try{_a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(eee){}}if(typeof _a=="object"){_d=_a.GetVariable("$version");if(typeof _d!="undefined"){_d=_d.replace(/^\S+\s+(.*)$/,"$1").split(",");version=[parseInt(_d[0],10),parseInt(_d[2],10)];}}}return version;},isSupported:function(version){var now=flashembed.getVersion();var ret=(now[0]>version[0])||(now[0]==version[0]&&now[1]>=version[1]);return ret;},domReady:domReady,asString:asString,getHTML:getHTML,getFullHTML:getFullHTML});if(jQ){jQuery.prototype.flashembed=function(params,flashvars){return this.each(function(){flashembed(this,params,flashvars);});};}})();



//////////////////////////////////////////////////////////



var weekend = [0,6];
var weekendColor = "#e0e0e0";
var fontface = "Verdana";
var fontsize = 2;

var gNow = new Date();
var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

Calendar.Months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_WinCal, p_month, p_year, p_format) {
	if ((p_month == null) && (p_year == null))	return;

	if (p_WinCal == null)
		this.gWinCal = ggWinCal;
	else
		this.gWinCal = p_WinCal;

	if (p_month == null) {
		this.gMonthName = null;
		this.gMonth = null;
		this.gYearly = true;
	} else {
		this.gMonthName = Calendar.get_month(p_month);
		this.gMonth = new Number(p_month);
		this.gYearly = false;
	}

	this.gYear = p_year;
	this.gFormat = p_format;
	this.gBGColor = "white";
	this.gFGColor = "black";
	this.gTextColor = "black";
	this.gHeaderColor = "black";
	this.gReturnItem = p_item;
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;
Calendar.print = Calendar_print;

function Calendar_get_month(monthNo) {
	return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
	/*
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for...
	2.Years also evenly divisible by 100 are not leap years, except for...
	3.Years also evenly divisible by 400 are leap years.
	*/
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return Calendar.DOMonth[monthNo];

		return Calendar.lDOMonth[monthNo];
	} else
		return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/*
	Will return an 1-D array with 1st element being the calculated month
	and second being the calculated year
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();

	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}

	return ret_arr;
}

function Calendar_print() {
	ggWinCal.print();
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/*
	Will return an 1-D array with 1st element being the calculated month
	and second being the calculated year
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();

	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}

	return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {
	var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";

	// Begin Table Drawing code here..
	vCode = vCode + "<TABLE BORDER=1 BGCOLOR=\"" + this.gBGColor + "\">";

	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode = vCode + vHeader_Code + vData_Code;

	vCode = vCode + "</TABLE>";

	return vCode;
}

Calendar.prototype.show = function() {
	var vCode = "";

	this.gWinCal.document.open();

	// Setup the page...
	this.wwrite("<html>");
	this.wwrite("<head><title>Calendar</title>");
	this.wwrite("</head>");

	this.wwrite("<body " +
		"link=\"" + this.gLinkColor + "\" " +
		"vlink=\"" + this.gLinkColor + "\" " +
		"alink=\"" + this.gLinkColor + "\" " +
		"text=\"" + this.gTextColor + "\">");
	this.wwriteA("<FONT FACE='" + fontface + "' SIZE=2><B>");
	this.wwriteA(this.gMonthName + " " + this.gYear);
	this.wwriteA("</B><BR>");

	// Show navigation buttons
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];

	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];

	this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" +
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" +
		");" +
		"\">  <<   <\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" +
		"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\"> < <\/A>]</TD><TD ALIGN=center>");

	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" +
		"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">> <\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" +
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" +
		");" +
		"\">>><\/A>]</TD></TR></TABLE><BR>");

	// Get the complete calendar code for the month..
	vCode = this.getMonthlyCalendarCode();
	this.wwrite(vCode);

	this.wwrite("</font></body></html>");
	this.gWinCal.document.close();
}

Calendar.prototype.showY = function() {
	var vCode = "";
	var i;
	var vr, vc, vx, vy;		// Row, Column, X-coord, Y-coord
	var vxf = 285;			// X-Factor
	var vyf = 200;			// Y-Factor
	var vxm = 10;			// X-margin
	var vym;				// Y-margin
	if (isIE)	vym = 75;
	else if (isNav)	vym = 25;

	this.gWinCal.document.open();

	this.wwrite("<html>");
	this.wwrite("<head><title>Calendar</title>");
	this.wwrite("<style type='text/css'>\n<!--");
	for (i=0; i<12; i++) {
		vc = i % 3;
		if (i>=0 && i<= 2)	vr = 0;
		if (i>=3 && i<= 5)	vr = 1;
		if (i>=6 && i<= 8)	vr = 2;
		if (i>=9 && i<= 11)	vr = 3;

		vx = parseInt(vxf * vc) + vxm;
		vy = parseInt(vyf * vr) + vym;

		this.wwrite(".lclass" + i + " {position:absolute;top:" + vy + ";left:" + vx + ";}");
	}
	this.wwrite("-->\n</style>");
	this.wwrite("</head>");

	this.wwrite("<body " +
		"link=\"" + this.gLinkColor + "\" " +
		"vlink=\"" + this.gLinkColor + "\" " +
		"alink=\"" + this.gLinkColor + "\" " +
		"text=\"" + this.gTextColor + "\">");
	this.wwrite("<FONT FACE='" + fontface + "' SIZE=2><B>");
	this.wwrite("Year : " + this.gYear);
	this.wwrite("</B><BR>");

	// Show navigation buttons
	var prevYYYY = parseInt(this.gYear) - 1;
	var nextYYYY = parseInt(this.gYear) + 1;

	this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" +
		"'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\" alt='Prev Year'><<<\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"javascript:window.print();\">Print</A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" +
		"'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">>><\/A>]</TD></TR></TABLE><BR>");

	// Get the complete calendar code for each month..
	var j;
	for (i=11; i>=0; i--) {
		if (isIE)
			this.wwrite("<DIV ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");
		else if (isNav)
			this.wwrite("<LAYER ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");

		this.gMonth = i;
		this.gMonthName = Calendar.get_month(this.gMonth);
		vCode = this.getMonthlyCalendarCode();
		this.wwrite(this.gMonthName + "/" + this.gYear + "<BR>");
		this.wwrite(vCode);

		if (isIE)
			this.wwrite("</DIV>");
		else if (isNav)
			this.wwrite("</LAYER>");
	}

	this.wwrite("</font><BR></body></html>");
	this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext) {
	this.gWinCal.document.writeln(wtext);
}

Calendar.prototype.wwriteA = function(wtext) {
	this.gWinCal.document.write(wtext);
}

Calendar.prototype.cal_header = function() {
	var vCode = "";

	vCode = vCode + "<TR>";
	vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Sun</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Mon</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Tue</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Wed</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Thu</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Fri</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='16%'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Sat</B></FONT></TD>";
	vCode = vCode + "</TR>";

	return vCode;
}

Calendar.prototype.cal_data = function() {
	var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);

	var vFirstDay=vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";

	/*
	Get day for the 1st of the requested month/year..
	Place as many blank cells before the 1st day of the month as necessary.
	*/

	vCode = vCode + "<TR>";
	for (i=0; i<vFirstDay; i++) {
		vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(i) + "><FONT SIZE='2' FACE='" + fontface + "'> </FONT></TD>";
	}

	// Write rest of the 1st week
	for (j=vFirstDay; j<7; j++) {
		vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT SIZE='2' FACE='" + fontface + "'>" +
			"<A HREF='#' " +
				"onClick=\"self.opener.document." + this.gReturnItem + ".value='" +
				this.format_data(vDay) +
				"';window.close();\">" +
				this.format_day(vDay) +
			"</A>" +
			"</FONT></TD>";
		vDay=vDay + 1;
	}
	vCode = vCode + "</TR>";

	// Write the rest of the weeks
	for (k=2; k<7; k++) {
		vCode = vCode + "<TR>";

		for (j=0; j<7; j++) {
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT SIZE='2' FACE='" + fontface + "'>" +
				"<A HREF='#' " +
					"onClick=\"self.opener.document." + this.gReturnItem + ".value='" +
					this.format_data(vDay) +
					"';window.close();\">" +
				this.format_day(vDay) +
				"</A>" +
				"</FONT></TD>";
			vDay=vDay + 1;

			if (vDay > vLastDay) {
				vOnLastDay = 1;
				break;
			}
		}

		if (j == 6)
			vCode = vCode + "</TR>";
		if (vOnLastDay == 1)
			break;
	}

	// Fill up the rest of last week with proper blanks, so that we get proper square blocks
	for (m=1; m<(7-j); m++) {
		if (this.gYearly)
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) +
			"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'> </FONT></TD>";
		else
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) +
			"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
	}

	return vCode;
}

Calendar.prototype.format_day = function(vday) {
	var vNowDay = gNow.getDate();
	var vNowMonth = gNow.getMonth();
	var vNowYear = gNow.getFullYear();

	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
		return ("<FONT COLOR=\"RED\"><B>" + vday + "</B></FONT>");
	else
		return (vday);
}

Calendar.prototype.write_weekend_string = function(vday) {
	var i;

	// Return special formatting for the weekend day.
	for (i=0; i<weekend.length; i++) {
		if (vday == weekend[i])
			return (" BGCOLOR=\"" + weekendColor + "\"");
	}

	return "";
}

Calendar.prototype.format_data = function(p_day) {
	var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vY2 = new String(this.gYear.substr(2,2));
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

	switch (this.gFormat) {
		case "MM\/DD\/YYYY" :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
			break;
		case "YYYY\/MM\/DD" :
		vData =vY4 + "\-" + vMonth + "\-" + vDD;
		break;//edited by Shihab
		case "MM\/DD\/YY" :
			vData = vMonth + "\/" + vDD + "\/" + vY2;
			break;
		case "MM-DD-YYYY" :
			vData = vMonth + "-" + vDD + "-" + vY4;
			break;
		case "MM-DD-YY" :
			vData = vMonth + "-" + vDD + "-" + vY2;
			break;

		case "DD\/MON\/YYYY" :
			vData = vDD + "\/" + vMon + "\/" + vY4;
			break;
		case "DD\/MON\/YY" :
			vData = vDD + "\/" + vMon + "\/" + vY2;
			break;
		case "DD-MON-YYYY" :
			vData = vDD + "-" + vMon + "-" + vY4;
			break;
		case "DD-MON-YY" :
			vData = vDD + "-" + vMon + "-" + vY2;
			break;

		case "DD\/MONTH\/YYYY" :
			vData = vDD + "\/" + vFMon + "\/" + vY4;
			break;
		case "DD\/MONTH\/YY" :
			vData = vDD + "\/" + vFMon + "\/" + vY2;
			break;
		case "DD-MONTH-YYYY" :
			vData = vDD + "-" + vFMon + "-" + vY4;
			break;
		case "DD-MONTH-YY" :
			vData = vDD + "-" + vFMon + "-" + vY2;
			break;

		case "DD\/MM\/YYYY" :
			vData = vDD + "\/" + vMonth + "\/" + vY4;
			break;
		case "DD\/MM\/YY" :
			vData = vDD + "\/" + vMonth + "\/" + vY2;
			break;
		case "DD-MM-YYYY" :
			vData = vDD + "-" + vMonth + "-" + vY4;
			break;
		case "DD-MM-YY" :
			vData = vDD + "-" + vMonth + "-" + vY2;
			break;
		//////////////////////////////mishu///////////////////////

		/////using separatoer"-"
		case "RRRR-MM-DD" :
				vData = vY4 + "-" + vMonth + "-" +vDD ;
			break;
		case "DD-MM-RRRR" :
			vData = vDD + "-" + vMonth + "-" + vY4;
			break;
		case "MM-DD-RRRR" :
			vData = vMonth +"-"+ vDD + "-" + vY4;
			break;
		case "DD-MON-YY" :
			vData = vDD + "-" + vMon + "-" + vY2;
			break;

		/////using separatoer"/"
		case "RRRR\/MM\/DD" :
				vData = vY4 + "\/" + vMonth + "\/" +vDD ;
			break;
		case "DD\/MM\/RRRR" :
			vData = vDD + "\/" + vMonth + "\/" + vY4;
			break;
		case "MM\/DD\/RRRR" :
			vData = vMonth +"\/"+ vDD + "\/" + vY4;
			break;
		case "DD\/MON\/YY" :
			vData = vDD + "\/" + vMon + "\/" + vY2;
			break;

	///////////////////////////////////////////////////////////////////////////////////////

		default :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
	}

	return vData;
}

function Build(p_item, p_month, p_year, p_format) {
	var p_WinCal = ggWinCal;
	gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format);

	// Customize your Calendar here..
	gCal.gBGColor="white";
	gCal.gLinkColor="black";
	gCal.gTextColor="black";
	gCal.gHeaderColor="darkgreen";

	// Choose appropriate show function
	if (gCal.gYearly)	gCal.showY();
	else	gCal.show();
}

function show_calendar() {
	/*
		p_month : 0-11 for Jan-Dec; 12 for All Months.
		p_year	: 4-digit year
		p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
		p_item	: Return Item.
		p_top	: Window Top Position
		p_left	: Window Left Position
	*/

	p_item = arguments[0];
	if (arguments[1] == null)
		p_top = 303;
	else
		p_top = arguments[1];
	if (arguments[2] == null)
		p_left = 740;
	else
		p_left = arguments[2];
	if (arguments[3] == null || arguments[3] == "")
		p_month = new String(gNow.getMonth());
	else
		p_month = arguments[3];
	if (arguments[4] == "" || arguments[4] == null)
		p_year = new String(gNow.getFullYear().toString());
	else
		p_year = arguments[4];
	if (arguments[5] == null)
		p_format = "YYYY/MM/DD";
	else
		{p_format = arguments[5];
		p_format = p_format.toUpperCase();
		}

	vWinCal = window.open("", "Calendar",
		"width=250,height=250,resizable=no,top="+p_top+",left="+p_left );

	vWinCal.opener = self;
	ggWinCal = vWinCal;

	Build(p_item, p_month, p_year, p_format);
}
/*
Yearly Calendar Code Starts here
*/
function show_yearly_calendar(p_item, p_year, p_format) {
	// Load the defaults..
	if (p_year == null || p_year == "")
		p_year = new String(gNow.getFullYear().toString());
	if (p_format == null || p_format == "")
		p_format = "MM/DD/YYYY";

	var vWinCal = window.open("", "Calendar", "scrollbars=yes");
	vWinCal.opener = self;
	ggWinCal = vWinCal;

	Build(p_item, null, p_year, p_format);
}

//new dialog
// build/show the dialog box, populate the data and call the fadeDialog function //
function newShowDialog(title,message,type,autohide) {
  if(!type) {
	type = 'error';
  }
  var dialog;
  var dialogcontent;
  var dialogclose;
  var dialogmask;
  if(!document.getElementById('dialog')) {
	dialog = document.createElement('div');
	dialog.id = 'dialog';
	dialogcontent = document.createElement('div');
	dialogcontent.id = 'dialog-content';
	dialogmask = document.createElement('div');
	dialogmask.id = 'dialog-mask';
	document.body.appendChild(dialogmask);
	document.body.appendChild(dialog);
	if(autohide){
		dialogclose = document.createElement('div');
		dialogclose.id = 'dialog-close';
		dialogclose.innerHTML = "<img src='./images/close_dialog.gif'/>";
		dialogclose.setAttribute('onclick','newHideDialog()');
		dialogclose.onclick = newHideDialog;
		dialog.appendChild(dialogclose);
	}
	dialog.appendChild(dialogcontent);

  } else {
	dialog = document.getElementById('dialog');
	dialogclose = document.getElementById('dialog-close');
	dialogcontent = document.getElementById('dialog-content');
	dialogmask = document.getElementById('dialog-mask');
	dialogmask.style.visibility = "visible";
	dialog.style.visibility = "visible";
  }
  dialog.style.opacity = 1;
  dialog.style.filter = 'alpha(opacity=100)';
  dialog.alpha = 1;

  var width = pageWidth();
  var height = pageHeight();
  var left = leftPosition();
  var top = topPosition();
  var dialogwidth = dialog.offsetWidth;
  var dialogheight = dialog.offsetHeight;
  var topposition = top + (height / 3) - (dialogheight / 2);
  var leftposition = left + (width / 2) - (dialogwidth / 2);
  dialog.style.top = topposition + "px";
  dialog.style.left = leftposition + "px";
  dialogcontent.className = type;
  dialogcontent.innerHTML = message;
  var content = document.getElementById(WRAPPER);
  dialogmask.style.height = content.offsetHeight + 'px';
  dialogmask.style.background = 'black';
  if(autohide){
	document.getElementById('dialog-content').style.border = "0px;";
	dialog.timer = setInterval("newFadeDialog(0)", autohide);
  }

}

// hide the dialog box //
function newHideDialog() {
  var dialog = document.getElementById('dialog');
  clearInterval(dialog.timer);
  dialog.timer = setInterval("newFadeDialog(0)", TIMER);
}

// fade-in the dialog box //
function newFadeDialog(flag) {
  if(flag == null) {
	flag = 1;
  }
  var dialog = document.getElementById('dialog');
  var value;
  if(flag == 1) {
	value = dialog.alpha + SPEED;
  } else {
	value = dialog.alpha - SPEED;
  }
  dialog.alpha = value;
  dialog.style.opacity = (value / 100);
  dialog.style.filter = 'alpha(opacity=' + value + ')';
  if(value >= 99) {
	clearInterval(dialog.timer);
	dialog.timer = null;
  } else if(value <= 1) {
	dialog.style.visibility = "hidden";
	document.getElementById('dialog-mask').style.visibility = "hidden";
	clearInterval(dialog.timer);
  }
}

function confirmredirectpage(url,domain,privatefor)
{
    var spliturl = url.split("/");
    var siteid = spliturl[3];

    AjaxRequest.get(
		{
			'url':domain+'pagelogin.php?action=checksession&privatefor='+privatefor+'&siteid='+siteid
			,'onSuccess':function(req){
			 	if(req.responseText=='1')
				{
					location.href = url;
				}
				else
				{
					showDialog('Please Login to Access this Page.','Login Failed.','warning',url,domain,privatefor);
				}
			  }
		  }
	);
}

function redirectpage(url,domain,privatefor)
{
	confirmredirectpage(url,domain,privatefor);
}

function validate(url,domain,us,ps,role,privatefor)
{
	if(us=='' && ps=='')
	{
		var dialogtitle = document.getElementById('dialog-title');
  		dialogtitle.innerHTML = '<font color=red>Enter Username and Password!</font>';
		return;
	}
	else if(us=='')
	{
		var dialogtitle = document.getElementById('dialog-title');
  		dialogtitle.innerHTML = '<font color=red>Enter Username!</font></font>';
		return;
	}
	else if(ps=='')
	{
		var dialogtitle = document.getElementById('dialog-title');
  		dialogtitle.innerHTML = '<font color=red>Enter Password!</font>';
		return;
	}
	var spliturl = url.split("/");
	var siteid = spliturl[3];
	AjaxRequest.get(
		{
			'url':domain+'pagelogin.php?u='+us+'&p='+ps+'&role='+role+'&pfor='+privatefor+'&siteid='+siteid
			,'onSuccess':function(req){

			 	if(req.responseText=='1'){
			 		hideDialog();
					document.getElementById('bar').style.display = "block";
					document.getElementById('logout').style.display = "block";
					location.href = url;
				}else{
					hideDialogWithoutFade('Error!', req.responseText);
					}

			  }
		  }
	);
}

function validateresponse(pid,tag, type)
{
    var surveyform = document.getElementById('surveyform'+pid);
    switch (type)
    {
        case 1:
            // radio button
            for (i = 0;i < surveyform.elements[tag].length; i++)
            {
                if (eval(surveyform.elements[tag][i].checked))
                    return true;
            }
            break;

        case 2:
            // single line text
            if (surveyform.elements[tag].value != '')
                return true;
            break;

        case 3:
            // multi-line text
            if (surveyform.elements[tag].value != '')
                return true;
            break;

        case 4:
            // drop-down
            if (surveyform.elements[tag].selectedIndex > 0)
                return true;
            break;

        case 5:
            // checkboxes (at least 1)
            var inputelements = document.getElementsByTagName('input');
           for(var i = 0; i< inputelements.length; i++)
           {
                var oneelement = inputelements[i];
                var split = oneelement.name.split(tag);
                if(split.length>1)
                {
                    if (eval(oneelement.checked))
                    return true;
                }

           }
           break;

    }
    return false;
}

function checksubmit(pid)
{
    if(document.getElementById('cansubmit').value==0)
    {
        window.alert ("Sorry, you have submitted your feedback once!");
        return;
    }

    errorstring = "";errorcount = 0;

    var inputelements = document.getElementsByTagName('input');
    for(var i = 0; i< inputelements.length; i++)
    {
        var oneelement = inputelements[i];
        var split = oneelement.name.split('_');
        if(split[0]==("required"+pid))
        {
            var type = split[1];
            var requiredquestion = split[1]+"_"+split[2];
            var tcase = 0;
            if(type=="choice") tcase = 1;
            else if(type=="text") tcase = 2;
            else if(type=="ptext") tcase = 3;
            else if(type=="list") tcase = 4;
            else if(type=="checkbox") tcase = 5;
            else if(type=="scale") tcase = 1;

            if (validateresponse (pid,requiredquestion,tcase) == false)
            {
                if (errorcount) errorstring += ", ";
                errorstring += "question "+split[3];
                errorcount++;
            }

        }

    }
    if (errorcount)
    {
        window.alert ("Please complete the following questions: " + errorstring);
    }
    else
    {

        var f = document.getElementById('surveyform'+pid);
        var s = AjaxRequest.submit(
                f ,{
                    'onSuccess':function(req){
                        if(req.responseText){

                            document.getElementById('msg'+pid).style.display="block";
                            f.reset();
                            document.getElementById('cansubmit').value="0";
                            var func = "hidemsg("+pid+")";
                            setTimeout(func,60000);
                        }
                    }
                }
            );
    }
}

function hidemsg(pid)
{
    document.getElementById('msg'+pid).style.display="none";
}

function checkpermission()
{
    document.getElementById('loginwait').style.display="block";
    var f = document.getElementById('loginform');
    f.style.display="none";
        var s = AjaxRequest.submit(
            f ,{
                'onSuccess':function(req){
                    if(req.responseText){

                        location.href=window.location;
                    }
                }
            }
        );
}

function dnldabsnsform(track)
{
    var dlform = document.getElementById('dlabsnsform'+track);
    dlform.submit();
}