System.register(["./index-legacy.61f8d398.js","./PersonApiService-legacy.a6da53e9.js","./VSimpleTable-legacy.f52beab4.js","./VTooltip-legacy.32b0b8e8.js","./EntityApiService-legacy.b2f891be.js"],(function(e,t){"use strict";var n,r,s,a,o,l,i,_,u,c,d,p,f,v,m,b,E,y;return{setters:[e=>{n=e.ab,r=e.d,s=e.U,a=e.x,o=e.u,l=e.r,i=e.o,_=e.L,u=e.n,c=e._,d=e.i,p=e.h,f=e.j,v=e.k,m=e.l},e=>{b=e.P},e=>{E=e._},e=>{y=e._},()=>{}],execute:function(){n("v-table__overflow"),e("default",u(r({__name:"PersonDetail",setup(e){const t=s(),n=a(),r=o(),u=l(null);function c(){b.get(t.params.id,["team"]).then((e=>{u.value=e})).catch((e=>{r.showMessage({level:_.ERROR,message:e}),n.back()}))}return i((()=>{c()})),{__sfc:!0,route:t,router:n,snackbarStore:r,person:u,load:c}}}),(function(){var e=this,t=e._self._c,n=e._self._setupProxy;return t(c,[t(d,{attrs:{flat:""}},[null===n.person?t(p,{attrs:{indeterminate:""}}):e._e(),null!==n.person?[t(f,[e._v(" Personendaten: "+e._s(n.person.fullname)+" ")]),t(E,{scopedSlots:e._u([{key:"default",fn:function(){return[t("tbody",[t("tr",[t("td",[e._v("Vorname")]),t("td",[e._v(e._s(n.person.firstname))])]),t("tr",[t("td",[e._v("Nachname")]),t("td",[e._v(e._s(n.person.lastname))])]),t("tr",[t("td",[e._v("E-Mail-Adresse")]),t("td",[e._v(e._s(n.person.email))])]),t("tr",[t("td",[e._v("Team")]),t("td",[e._v(" "+e._s(n.person.team?n.person.team.name:"Kein Team vorhanden")+" ")])])])]},proxy:!0}],null,!1,1741803188)}),t(y,{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function({on:r}){return[t(v,e._g({directives:[{name:"security",rawName:"v-security",value:"BEISPIELPROJEKT_BACKEND_WRITE_PERSON",expression:"`BEISPIELPROJEKT_BACKEND_WRITE_PERSON`"}],attrs:{id:"edit-person",bottom:"",right:"",fixed:"",fab:"",dark:"",color:"accent",to:{path:`/people/${n.person.id}/edit`}}},r),[t(m,[e._v("mdi-pencil")])],1)]}}],null,!1,1146596730)},[t("span",[e._v(e._s(n.person.fullname)+" bearbeiten")])])]:e._e()],2)],1)}),[],!1,null,"4fe8e686",null,null).exports)}}}));
