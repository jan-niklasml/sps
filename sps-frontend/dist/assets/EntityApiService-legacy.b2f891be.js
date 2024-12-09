System.register(["./index-legacy.61f8d398.js"],(function(e,t){"use strict";var n,r,s;return{setters:[e=>{n=e.F,r=e.E,s=e.L}],execute:function(){const t="/api/beispielprojekt-backend-service",o=[{methods:["GET","POST","PUT","PATCH","DELETE"],statusCode:404,message:"Dieser Datensatz wurde nicht gefunden."},{methods:["DELETE"],statusCode:409,message:"Dieser Datensatz kann nicht gelöscht werden, da er von anderen Teilen des Programms noch benötigt wird."}],a="Ein unbekannter Fehler ist aufgetreten, bitte den Administrator informieren.";class i{constructor(e,n){this.entitySingular=e,this.entityPlural=n,this.entityBaseUrl=`${t}/${n}`}get(e,t=[]){return new Promise(((r,s)=>{fetch(`${this.entityBaseUrl}/${e}`,n.getGETConfig()).then((e=>{200!=e.status&&(i.handleWrongResponse("GET",e),s()),e.json().then((e=>{const o=t.map((t=>new Promise(((r,s)=>{fetch(i.removeProjectionsFromUrl(e._links[t].href),n.getGETConfig()).then((n=>{n.ok?n.json().then((n=>{if("_embedded"in n){const e=Object.keys(n._embedded)[0];n=n._embedded[e]}e[t]=n,r()})).catch((e=>s(i.handleError(e)))):404==n.status?(e[t]=null,r()):(i.handleWrongResponse("GET",n),s())}))}))));Promise.all(o).then((()=>{r(e)})).catch((e=>s(i.handleError(e))))})).catch((e=>s(i.handleError(e))))})).catch((e=>s(i.handleError(e))))}))}getAllPaged(e,t=20,r=null){return new Promise(((s,o)=>{let a=`${this.entityBaseUrl}?page=${e}&size=${t}`;null!==r&&(a=`${a}&projection=${r}`),fetch(a,n.getGETConfig()).then((e=>{if(200!=e.status)return i.handleWrongResponse("GET",e),o();e.json().then((e=>{const t=e._embedded[this.entityPlural];s({data:t,page:e.page.number,pageSize:e.page.size,totalElements:e.page.totalElements,totalPages:e.page.totalPages})})).catch((e=>o(e)))})).catch((e=>o(i.handleError(e))))}))}delete(e){return new Promise(((t,r)=>{fetch(`${this.entityBaseUrl}/${e}`,n.getDELETEConfig()).then((e=>{if(e.ok)return t();i.handleWrongResponse("DELETE",e)})).catch((e=>r(i.handleError(e))))}))}create(e){return new Promise(((t,r)=>{fetch(`${this.entityBaseUrl}`,n.getPOSTConfig(e)).then((e=>{e.json().then((n=>{if(e.ok)return t(n);i.handleWrongResponse("POST",e),r()})).catch((e=>r(i.handleError(e))))})).catch((e=>r(i.handleError(e))))}))}createRelation(e,r,s,o){const a=n.getPUTConfig("");return a.headers.set("Content-Type","text/uri-list"),a.body=`${t}/${s}/${o}`,new Promise(((t,n)=>{fetch(`${this.entityBaseUrl}/${e.id}/${r}`,a).then((e=>{if(e.ok)return t();i.handleWrongResponse("PUT",e),n()}))}))}update(e){return new Promise(((t,r)=>{var s;fetch(`${this.entityBaseUrl}/${null===(s=e.id)||void 0===s?void 0:s.toString()}`,n.getPUTConfig(e)).then((e=>{e.json().then((n=>{if(e.ok)return t(n);i.handleWrongResponse("PUT",e),r()})).catch((e=>r(i.handleError(e))))})).catch((e=>r(i.handleError(e))))}))}static handleWrongResponse(e,t){for(const n of o)if(n.methods.includes(e)&&t.status==n.statusCode)throw new r({level:s.ERROR,message:n.message});throw new r({level:s.ERROR,message:`${a} - HTTP Status Code: ${t.status}`})}static handleError(e){return void 0!==e.level?e:new r({message:a})}static removeProjectionsFromUrl(e){const t=/{?[^{}]+}/gm;for(;e.indexOf("{?")>=0;)e=e.replace(t,"");return e}}e("E",i)}}}));
