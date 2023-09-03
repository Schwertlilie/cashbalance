var H=Object.defineProperty;var U=(l,t,e)=>t in l?H(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var o=(l,t,e)=>(U(l,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class R{constructor(t,e){o(this,"currentPage","");var n;this.defaultPage=t,this.pages=e;for(const s in e)(n=document.getElementById("app"))==null||n.appendChild(e[s].htmlElement),e[s].hide();window.onhashchange=s=>{this.onOpen()},location.hash.slice(1)==""?location.hash="#"+t:this.onOpen()}onOpen(){var i,h,T;let t={},e=this.defaultPage,s=location.hash.slice(1).split("&");s.length>0&&(e=s[0],s=s.splice(1));for(const p of s){let E=p.split("="),O=decodeURIComponent(E[0]),g=decodeURIComponent(E[1]);t[O]=g}let a=this.currentPage!=e;a&&(console.log("Hide page: "+this.currentPage),(i=this.pages[this.currentPage])==null||i.hide(),this.currentPage=e,console.log("Show page: "+e),(h=this.pages[this.currentPage])==null||h.show()),console.log("Calling page.update with: "+JSON.stringify(t)),(T=this.pages[this.currentPage])==null||T.update(t,a)}static open(t,e){window.setTimeout(()=>{let n="";for(let s in e)n+="&"+encodeURIComponent(s)+"="+encodeURIComponent(e[s]);location.hash="#"+encodeURIComponent(t)+n},200)}static back(){history.back()}}class r{constructor(){}static APPLY_COUNTED(t,e){return e.replace("{count}",t.toString())}}o(r,"TIME_LOCALE","en"),o(r,"TIME_YESTERDAY","yesterday"),o(r,"TIME_HOURS_AGO","{count} hour(s) ago"),o(r,"TIME_MINUTES_AGO","{count} minute(s) ago"),o(r,"TIME_SECONDS_AGO","{count} second(s) ago"),o(r,"TIME_TODAY_AT","today at"),o(r,"TIME_JUST_NOW","just now"),o(r,"APPNAME","Cashbalance"),o(r,"LOGIN_KNOWN_CONNECTIONS","Reuse Connection"),o(r,"LOGIN_SESSION_NAME","Session Name"),o(r,"LOGIN_API_ENDPOINT_LABEL","API Endpoint URL"),o(r,"LOGIN_API_TOKEN_LABEL","API Token"),o(r,"LOGIN_SUBMIT","Add Connection"),o(r,"LOGIN_ERROR_MISSING_INPUTS","You must provide all fields (session name, api endpoint and api token)."),o(r,"LOGIN_ERROR_LOGIN_FAILED","The provided login information is wrong. Is the URL and API token correct?"),o(r,"ENTRY_CAPTION_CATEGORY","Category"),o(r,"ENTRY_CAPTION_SHOP","Shop"),o(r,"ENTRY_CAPTION_AMOUNT","Amount"),o(r,"ENTRY_CAPTION_RECEIPT","Receipt"),o(r,"ENTRY_CAPTION_COST_CENTER","Cost center"),o(r,"ENTRY_CAPTION_NOTE","Note"),o(r,"ENTRY_RADIO_IN","In"),o(r,"ENTRY_RADIO_OUT","Out"),o(r,"ENTRY_CHECKBOX_CASH","Cash"),o(r,"ENTRY_CHECKBOX_TAX","Tax"),o(r,"ENTRY_CHECKBOX_DRAFT","Draft"),o(r,"ENTRY_BUTTON_SAVE","Save"),o(r,"ENTRY_PLACEHOLDER_CATEGORY","Alimentary"),o(r,"ENTRY_PLACEHOLDER_SHOP","Rewe"),o(r,"ENTRY_PLACEHOLDER_AMOUNT","0.00"),o(r,"ENTRY_PLACEHOLDER_RECEIPT","/path/to/receipt.png"),o(r,"ENTRY_PLACEHOLDER_NOTE",""),o(r,"ENTRY_LIST_COST_CENTER",["XF","MF","IF","Other"]);class u extends r{}o(u,"TIME_LOCALE","de"),o(u,"ENTRY_CAPTION_CATEGORY","Kategorie"),o(u,"ENTRY_CAPTION_SHOP","Handelspartner"),o(u,"ENTRY_CAPTION_AMOUNT","Betrag"),o(u,"ENTRY_CAPTION_RECEIPT","Beleg"),o(u,"ENTRY_CAPTION_COST_CENTER","Kostenstelle"),o(u,"ENTRY_CAPTION_NOTE","Notiz"),o(u,"ENTRY_RADIO_IN","Ein"),o(u,"ENTRY_RADIO_OUT","Aus"),o(u,"ENTRY_CHECKBOX_CASH","Bar"),o(u,"ENTRY_CHECKBOX_TAX","Steuerrelevant"),o(u,"ENTRY_CHECKBOX_DRAFT","Entwurf"),o(u,"ENTRY_BUTTON_SAVE","Speichern"),o(u,"ENTRY_PLACEHOLDER_CATEGORY","Lebensmittel & Haushalt"),o(u,"ENTRY_PLACEHOLDER_SHOP","Rewe"),o(u,"ENTRY_PLACEHOLDER_AMOUNT","0.00"),o(u,"ENTRY_PLACEHOLDER_RECEIPT","/path/to/receipt.png"),o(u,"ENTRY_LIST_COST_CENTER",["XF","MF","IF","Andere"]);let c=u;function G(){switch(localStorage.language){case"de":c=u;break;case"en":case"us":default:c=r;break}}class A{constructor(t){o(this,"apiEndpoint","");o(this,"sessionToken","");this.session_name=t,this.loadSessionConfig()}getSessionName(){return this.session_name}loadSessionConfig(){if(localStorage.webfs_sessions){let t=JSON.parse(localStorage.webfs_sessions);if(this.session_name in t){let e=t[this.session_name];this.apiEndpoint=e.apiEndpoint,this.sessionToken=e.sessionToken}}}writeSessionConfig(t,e){this.apiEndpoint=t,this.sessionToken=e;let n={};localStorage.webfs_sessions&&(n=JSON.parse(localStorage.webfs_sessions)),n[this.session_name]={apiEndpoint:this.apiEndpoint,sessionToken:e},localStorage.webfs_sessions=JSON.stringify(n)}removeSession(){if(localStorage.webfs_sessions){let t=JSON.parse(localStorage.webfs_sessions);t.indexOf(this.session_name)>=0&&t.remove(this.session_name)}}async request(t){t.append("token",this.sessionToken);const e={method:"POST",body:t};try{return await fetch(this.apiEndpoint,e)}catch{return console.log("Cannot reach server. It appears you are offline."),null}}async ping(){let t=new FormData;t.append("cmd","ping"),t.append("uri",".");let e=await this.request(t);return e==null?!1:e.status!=200?(console.error(e.text()),!1):await e.text()=="pong"}async login(t,e){let n=new FormData;n.append("cmd","login"),n.append("uri","."),n.append("token",e);const s={method:"POST",body:n};let a;try{a=await fetch(t,s)}catch{return alert("Cannot connect to server. Do you have a working internet connection?"),!1}if(a.status!=200)return console.error(a.text()),!1;let i=await a.text();return this.writeSessionConfig(t,i),!0}buildFileTree(t){return t}async list(t){let e=new FormData;e.append("cmd","list"),e.append("uri",t);let n=await this.request(e);return n==null?null:n.status!=200?(console.error(n.text()),null):await n.json()}async walk(t){let e=new FormData;e.append("cmd","walk"),e.append("uri",t);let n=await this.request(e);if(n==null)return null;if(n.status!=200)return console.error(n.text()),null;let s=await n.json();return this.buildFileTree(s)}async md5(t){let e=new FormData;e.append("cmd","md5"),e.append("uri",t);let n=await this.request(e);return n==null?null:n.status!=200?(console.error(n.text()),null):n.text()}async open(t){let e=new FormData;e.append("cmd","open"),e.append("uri",t);let n=await this.request(e);return n==null?!1:n.status!=200?(console.error(n.text()),!1):(await n.text(),!0)}async readTxt(t){let e=new FormData;e.append("cmd","read"),e.append("uri",t);let n=await this.request(e);return n==null?null:n.status!=200?(console.error(n.text()),null):n.text()}readURL(t,e=!1){let n="";return e&&(n="&subsample=1&width=256&height=256"),this.apiEndpoint+"?token="+encodeURIComponent(this.sessionToken)+"&cmd=read&uri="+encodeURIComponent(t)+n}read(t,e="_self"){function n(i,h,T){let p=document.createElement("input");p.type="hidden",p.name=h,p.value=T,i.appendChild(p)}let s=document.getElementsByTagName("body")[0],a=document.createElement("form");a.action=this.apiEndpoint,a.method="post",a.target=e,n(a,"cmd","read"),n(a,"token",this.sessionToken),n(a,"uri",t),s.appendChild(a),a.submit(),s.removeChild(a)}async putTxt(t,e,n){return this.putFile(t,e,n)}async putFile(t,e,n){let s="",a=new FormData;a.append("cmd","write"),a.append("operation","write"),a.append("uri",t),a.append("file",e),a.append("md5",n+","+s);let i=await this.request(a);return i==null?!1:i.status!=200?(console.error(i.text()),!1):(await i.text(),!0)}async mkdir(t){let e=new FormData;e.append("cmd","write"),e.append("operation","mkdir"),e.append("uri",t);let n=await this.request(e);return n==null?!1:n.status!=200?(console.error(n.text()),!1):(await n.text(),!0)}async rmdir(t){let e=new FormData;e.append("cmd","write"),e.append("operation","rmdir"),e.append("uri",t);let n=await this.request(e);return n==null?!1:n.status!=200?(console.error(n.text()),!1):(await n.text(),!0)}async mv(t,e){let n=new FormData;n.append("cmd","write"),n.append("operation","mv"),n.append("uri",t),n.append("target",e);let s=await this.request(n);return s==null?!1:s.status!=200?(console.error(s.text()),!1):(await s.text(),!0)}async rm(t,e){let n=new FormData;n.append("cmd","write"),n.append("operation","rm"),n.append("uri",t),n.append("md5",e);let s=await this.request(n);return s==null?!1:s.status!=200?(console.error(s.text()),!1):(await s.text(),!0)}}o(A,"instance",null);class d{constructor(t,e="",n=""){o(this,"parent",null);o(this,"htmlElement");o(this,"displayStyle","none");this.htmlElement=document.createElement(t),this.htmlElement.innerHTML=e,n!=""&&this.setClass(n)}add(t){this.htmlElement.appendChild(t.htmlElement),t.parent=this}remove(t){this.htmlElement.removeChild(t.htmlElement),t.parent=null}isVisible(){return this.htmlElement.style.display.toLowerCase()!="none"}hide(){this.isVisible()&&(this.displayStyle=this.htmlElement.style.display,this.htmlElement.style.display="None")}show(){this.displayStyle.toLowerCase()!="none"&&(this.htmlElement.style.display=this.displayStyle)}update(t,e){}select(){this.setClass("selected")}unselect(){this.unsetClass("selected")}setClass(t){this.htmlElement.classList.contains(t)||this.htmlElement.classList.add(t)}unsetClass(t){this.htmlElement.classList.contains(t)||this.htmlElement.classList.remove(t)}}class b extends d{constructor(t,e=""){super("a",t,e),this.htmlElement.onclick=n=>{n.stopPropagation(),this.onClick()}}onClick(){console.log("Buttom::onClick: Not implemented! Must be implemented by subclass.")}}class K extends d{constructor(...t){super("div");for(const e of t)this.add(e)}submit(){let t=new FormData;for(const e in this.htmlElement.children){let n=this.htmlElement.children[e];n instanceof HTMLInputElement&&t.append(n.name,n.value)}this.onSubmit(t)}onSubmit(t){console.log("Form::onSubmit: Not implemented! Must be implemented by subclass."),console.log(t)}}class _ extends d{constructor(t,e,n,s=""){super("input"),this.htmlElement.name=t,this.htmlElement.placeholder=e,this.htmlElement.type=n,s!=""&&this.setClass(s),this.htmlElement.oninput=()=>{this.onChange(this.htmlElement.value)},this.htmlElement.onchange=()=>{this.onChangeDone(this.htmlElement.value)}}value(t=void 0){return t!==void 0&&(this.htmlElement.value=t),this.htmlElement.value}onChange(t){}onChangeDone(t){}}class V extends d{constructor(e,n,s=""){super("div");o(this,"radioButton");this.radioButton=new d("input"),this.radioButton.htmlElement.name=e,this.radioButton.htmlElement.type="radio",s!=""&&this.setClass(s),this.radioButton.htmlElement.onchange=()=>{this.onChange(this.radioButton.htmlElement.checked)},this.add(this.radioButton);let a=new d("label");a.htmlElement.innerHTML=n,this.add(a)}onChange(e){console.log("RadioButton::onChange: Not implemented! Must be impleemnted by subclass.")}value(e=void 0){return e!==void 0&&(this.radioButton.htmlElement.checked=e),this.radioButton.htmlElement.checked}}class k extends d{constructor(e,n,s=""){super("div","",s);o(this,"selectedIndex",0);o(this,"radioButtons",[]);for(let a=0;a<n.length;a++){let i=new V(e,n[a],"");i.onChange=h=>{h&&(this.selectedIndex=a,this.onChange(a))},this.add(i),this.radioButtons.push(i)}}onChange(e){console.log("RadioButtonGroup::onChange: Not implemented! Must be impleemnted by subclass.")}value(e=void 0){return e!==void 0&&(this.radioButtons[e].value(!0),this.selectedIndex=e),this.selectedIndex}}class C extends d{constructor(t,e=""){super("label",t,e)}}class P extends d{constructor(e,n,s="",a=!1){super("div");o(this,"checkbox");this.checkbox=new d("input"),this.checkbox.htmlElement.name=e,this.checkbox.htmlElement.type="checkbox",this.checkbox.htmlElement.checked=a,s!=""&&this.setClass(s),this.checkbox.htmlElement.onchange=()=>{this.onChange(this.checkbox.htmlElement.checked)},this.add(this.checkbox);let i=new d("label");i.htmlElement.innerHTML=n,this.add(i)}onChange(e){console.log("Checkbox::onChange: Not implemented! Must be implemented by subclass.")}value(e=void 0){return e!==void 0&&(this.checkbox.htmlElement.checked=e),this.checkbox.htmlElement.checked}}class X extends b{onClick(){this.parent.submit()}}class q extends d{constructor(){super("div");o(this,"connections");this.setClass("loginView"),this.connections=new d("div"),this.add(this.connections);let e=new K(new C(c.LOGIN_SESSION_NAME,"loginLabel"),new _("sessionName","myserver","text","loginInput"),new C(c.LOGIN_API_ENDPOINT_LABEL,"loginLabel"),new _("apiEndpoint","https://myserver/webfs/api.php","url","loginInput"),new C(c.LOGIN_API_TOKEN_LABEL,"loginLabel"),new _("apiToken","a4ef9...","password","loginInput"),new X(c.LOGIN_SUBMIT,"buttonWide"));e.setClass("loginForm"),e.onSubmit=this.onCreateSession.bind(this),this.add(e)}update(e,n){if(this.connections.htmlElement.innerHTML="",localStorage.cb_sessions){let s=JSON.parse(localStorage.cb_sessions);s.length>0&&this.connections.add(new C(c.LOGIN_KNOWN_CONNECTIONS,"loginLabel"));for(const a of s){let i=new b(a,"buttonWide");i.onClick=()=>{Y(a)},this.connections.add(i)}if(s.length>0){let a=new d("hr");a.setClass("loginDivider"),this.connections.add(a)}}}async onCreateSession(e){let n=e.get("sessionName"),s=e.get("apiEndpoint"),a=e.get("apiToken");if(n==""||s==""||a==""||n==null||s==null||a==null){alert(c.LOGIN_ERROR_MISSING_INPUTS);return}let i=new A(n);if(await i.login(s,a)){let h=[];localStorage.cb_sessions&&(h=JSON.parse(localStorage.cb_sessions)),h.push(n),localStorage.cb_sessions=JSON.stringify(h),A.instance=i,R.back()}else alert(c.LOGIN_ERROR_LOGIN_FAILED)}}async function Y(l,t=!1){console.log("Connecting to: "+l);let e=new A(l);await e.ping()?(A.instance=e,localStorage.cb_last_session=l,t||R.back()):t||alert("Connection refused. Either the server is not available or the connection was not used for too long.")}async function z(){if(localStorage.cb_sessions){let l=JSON.parse(localStorage.cb_sessions);if(l.length>0){let t=l[0];localStorage.cb_last_session&&(t=localStorage.cb_last_session),await Y(t,!0)}}}class J extends d{constructor(){super("div");o(this,"summary");this.summary=new d("div",""),this.add(this.summary);let e=new b("+","buttonWide");e.onClick=()=>{R.open("transactionList",{})},this.add(e);let n=new _("category","hint","text");n.onChange=this.selectCategory.bind(this),this.add(n)}selectCategory(e){this.summary.htmlElement.innerText=e}}let F='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg>',B='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>';class W extends d{constructor(){super("div");let t=new S("shop","category",-12.34,!0,!0,!0,"01.01.1900","cost_center");this.add(t);let e=new S("shop","category",12.34,!0,!0,!0,"01.01.1900","cost_center");this.add(e);let n=new S("shop","category",-12.34,!0,!0,!1,"01.01.1900","cost_center");this.add(n);let s=new S("shop","category",-12.34,!0,!1,!1,"01.01.1900","cost_center");this.add(s);let a=new S("shop","category",12.34,!1,!0,!1,"01.01.1900","cost_center");this.add(a);let i=new b("+","buttonWide");i.onClick=()=>{R.open("entry",{})},this.add(i)}}class S extends d{constructor(t,e,n,s,a,i,h,T){super("div","","transactionEntry");let p=new d("div","","transactionRow");this.add(p);let E=new d("div","","transactionRow");this.add(E);let O=new d("div",t);i&&O.setClass("transactionDraft"),p.add(O);let g=new d("div",h,"transactionDate");i&&g.setClass("transactionDraft"),p.add(g);let I=new d("div",F,"transactionIcon");i?I.setClass("transactionDraft"):s&&I.setClass("transactionIconActive"),p.add(I);let N=new d("div",B,"transactionIcon");i?N.setClass("transactionDraft"):a&&N.setClass("transactionIconActive"),p.add(N);let L=new d("div",e);i&&L.setClass("transactionDraft"),E.add(L);let v=n.toFixed(2).toString()+" €",f=new d("div",v,"transactionAmount");i?f.setClass("transactionDraft"):n<0&&f.setClass("transactionAmountNegative"),E.add(f);let w=new d("div",T,"transactionCostCenter");E.add(w)}}class j extends d{constructor(){super("div","","entry");let t=new C(c.ENTRY_CAPTION_CATEGORY,"entryCaption"),e=new _("inputCategory",c.ENTRY_PLACEHOLDER_CATEGORY,"text");e.onChange=m=>{e.value(m.replaceAll(";",","))},this.add(t),this.add(e);let n=new C(c.ENTRY_CAPTION_SHOP,"entryCaption"),s=new _("inputShop",c.ENTRY_PLACEHOLDER_SHOP,"text");s.onChange=m=>{s.value(m.replaceAll(";",","))},this.add(n),this.add(s);let a=new C(c.ENTRY_CAPTION_AMOUNT,"entryCaption"),i=new k("radioAmount",[c.ENTRY_RADIO_IN,c.ENTRY_RADIO_OUT],"entryRadioGroup"),h=new _("inputAmount",c.ENTRY_PLACEHOLDER_AMOUNT,"number"),T=new C(" €");h.onChange=m=>{Number(m)<0?i.value(1):i.value(0)},h.onChangeDone=m=>{let y=Number(m).toFixed(2);m!=y&&h.value(y)},i.onChange=m=>{let y=Number(h.htmlElement.value);h.value((y*-1).toFixed(2))},this.add(a),this.add(i),this.add(h),this.add(T);let p=new d("div","","entryTag"),E=new P("checkboxCash",F+" "+c.ENTRY_CHECKBOX_CASH,"entryIcon",!1),O=new P("checkboxTax",B+" "+c.ENTRY_CHECKBOX_TAX,"entryIcon",!1),g=new P("checkboxDraft",c.ENTRY_CHECKBOX_DRAFT,"",!0);this.add(p),p.add(E),p.add(O),p.add(g);let I=new C(c.ENTRY_CAPTION_RECEIPT,"entryCaption"),N=new _("inputReceipt",c.ENTRY_PLACEHOLDER_RECEIPT,"text");N.onChange=m=>{N.value(m.replaceAll(";",","))},this.add(I),this.add(N);let L=new C(c.ENTRY_CAPTION_COST_CENTER,"entryCaption"),v=new k("radioCostCenter",c.ENTRY_LIST_COST_CENTER,"entryRadioGroup"),f=new C(c.ENTRY_LIST_COST_CENTER[3]+": "),w=new _("inputCostCenterOther",c.ENTRY_LIST_COST_CENTER[3],"text");f.hide(),w.hide(),w.onChange=m=>{w.value(m.replaceAll(";",","))},v.onChange=m=>{m==3?(f.show(),w.show()):(f.hide(),w.hide())},this.add(L),this.add(v),this.add(f),this.add(w);let M=new C(c.ENTRY_CAPTION_NOTE,"entryCaption"),x=new _("inputNote",c.ENTRY_PLACEHOLDER_NOTE,"text");x.onChange=m=>{x.value(m.replaceAll(";",","))},this.add(M),this.add(x);let D=new b(c.ENTRY_BUTTON_SAVE,"buttonWide");D.onClick=()=>{R.open("transactionList",{})},this.add(D)}}async function $(){G(),document.getElementsByTagName("title")[0].innerHTML=c.APPNAME,await z(),new R("transactionList",{login:new q,overview:new J,transactionList:new W,entry:new j})}$();