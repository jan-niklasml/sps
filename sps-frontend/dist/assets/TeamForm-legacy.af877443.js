System.register(["./index-legacy.61f8d398.js","./PersonApiService-legacy.a6da53e9.js","./rules-legacy.5f414f13.js","./VRow-legacy.f60ab543.js"],(function(e,a){"use strict";var t,l,s,i,n,r,o,u,m,c,d,f,v,p,g;return{setters:[e=>{t=e.d,l=e.u,s=e.r,i=e.o,n=e.c,r=e.L,o=e.n,u=e.W,m=e.k},e=>{c=e.P},e=>{d=e.u,f=e._,v=e.a},e=>{p=e._,g=e.a}],execute:function(){const a=t({__name:"TeamForm",props:{value:null,isSavingAnimation:{type:Boolean}},emits:["input","submit"],setup(e,{emit:a}){const t=e,o=l(),u=d(),m=s([]),f=s(!0),v=s(!1),p=s(null);function g(){c.getAllPaged(0,1e3).then((e=>{m.value=e.data})).catch((e=>o.showMessage(e))).finally((()=>{f.value=!1}))}i((()=>{g()}));const b=n({get:()=>t.value,set:e=>a("input",e)});return{__sfc:!0,props:t,emits:a,snackbarStore:o,rules:u,people:m,isLoadingPeople:f,formValid:v,form:p,loadPeople:g,save:function(){var e;null===(e=p.value)||void 0===e||e.validate(),v.value?a("submit"):o.showMessage({level:r.WARNING,message:"Formular nicht korrekt ausgefüllt.",show:!0})},team:b}}});e("T",o(a,(function(){var e=this,a=e._self._c,t=e._self._setupProxy;return a("div",[a(f,{ref:"form",on:{submit:t.save},model:{value:t.formValid,callback:function(e){t.formValid=e},expression:"formValid"}},[a(p,[a(g,{staticClass:"col"},[a(u,{attrs:{label:"Teambezeichnung*",rules:[t.rules.RULE_REQUIRED],dense:"",outlined:""},model:{value:t.team.name,callback:function(a){e.$set(t.team,"name",a)},expression:"team.name"}})],1)],1),a(p,[a(g,{staticClass:"col"},[a(u,{attrs:{label:"Teamkürzel*",rules:[t.rules.RULE_REQUIRED],dense:"",outlined:""},model:{value:t.team.identifierString,callback:function(a){e.$set(t.team,"identifierString",a)},expression:"team.identifierString"}})],1),a(g,{attrs:{cols:"6"}},[a(v,{attrs:{label:"Teamleiter*",dense:"",outlined:"",disabled:t.isLoadingPeople,items:t.people,"item-text":"fullname","item-value":"id",loading:t.isLoadingPeople,rules:[t.rules.RULE_REQUIRED]},model:{value:t.team.teamleaderId,callback:function(a){e.$set(t.team,"teamleaderId",a)},expression:"team.teamleaderId"}})],1)],1),a(p,[a(g,[a("p",[e._v(" Alle mit Sternchen* gekennzeichneten Felder sind Pflichtfelder. ")])]),a(g,{staticClass:"text-right"},[a(m,{staticClass:"ml-auto",attrs:{text:"",exact:"",to:{name:"team.index"}}},[e._v(" Abbrechen ")]),a(m,{attrs:{color:"primary",loading:e.isSavingAnimation},on:{click:t.save}},[e._v(" Speichern ")])],1)],1)],1)],1)}),[],!1,null,"90591a94",null,null).exports)}}}));
