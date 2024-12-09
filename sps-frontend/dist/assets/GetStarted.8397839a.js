import{d as c,c as v,n as _,k as i,l as d,i as f,j as k,H as g,I as m,J as h,r as s,ac as x,_ as y}from"./index.5c2e6855.js";import{_ as b}from"./VDialog.54b8c02e.js";import{_ as w,a as C}from"./VRow.6a903a37.js";const D=c({__name:"YesNoDialog",props:{buttontext:null,icontext:null,dialogtitle:null,dialogtext:null,value:{type:Boolean}},emits:["no","yes","input"],setup(r,{emit:e}){const n=r,t=v({get:()=>n.value,set:l=>e("input",l)});function a(){e("no")}function o(){e("yes")}return{__sfc:!0,props:n,emits:e,visible:t,no:a,yes:o}}});var L=function(){var e=this,n=e._self._c,t=e._self._setupProxy;return n(b,{key:t.props.value,attrs:{persistent:"",width:"800"},scopedSlots:e._u([{key:"activator",fn:function({on:a}){return[t.props.buttontext?[n(i,e._g({attrs:{color:"primary"}},a),[e._v(" "+e._s(e.buttontext)+" ")])]:t.props.icontext?[n(i,e._g({attrs:{text:"",color:"primary"}},a),[n(d,{attrs:{large:""}},[e._v(" "+e._s(t.props.icontext)+" ")])],1)]:e._e()]}}]),model:{value:t.visible,callback:function(a){t.visible=a},expression:"visible"}},[n(f,[n(k,[e._v(" "+e._s(t.props.dialogtitle)+" ")]),n(g,[e._v(" "+e._s(t.props.dialogtext)+" ")]),n(m,[n(h),n(i,{attrs:{id:"yesnodialog-btn-no",text:""},on:{click:t.no}},[e._v(" Nein ")]),n(i,{attrs:{id:"yesnodialog-btn-yes",color:"primary"},on:{click:t.yes}},[e._v(" Ja ")])],1)],1)],1)},$=[],S=_(D,L,$,!1,null,null,null,null);const A=S.exports;function B(r){const e=s("Ungespeicherte \xC4nderungen"),n=s("Es sind ungespeicherte \xC4nderungen vorhanden. Wollen Sie die Seite verlassen?"),t=s(!1),a=s(!1),o=s(null);x((J,N,u)=>{r()&&!a.value?(t.value=!0,o.value=u):(t.value=!1,u())});function l(){t.value=!1,o.value!=null&&o.value(!1)}function p(){o.value!=null&&o.value()}return{saveLeaveDialogTitle:e,saveLeaveDialogText:n,saveLeaveDialog:t,isSave:a,nextRoute:o,cancel:l,leave:p}}const G=c({__name:"GetStarted",setup(r){const e=s(!1),n=s(B(t));function t(){return!e.value}return{__sfc:!0,dokumentationClicked:e,saveLeave:n,isDirty:t,YesNoDialog:A}}});var R=function(){var e=this,n=e._self._c,t=e._self._setupProxy;return n(y,[n(w,{staticClass:"text-center"},[n(C,[n("h1",{staticClass:"text-h3 font-weight-bold mb-10"},[e._v("Dokumentation")]),n("h3",[e._v("Weiterf\xFChrende Links sind hier zu finden:")]),n("div",[n("a",{attrs:{href:"https://wiki.muenchen.de/anwendungsentwicklung/index.php/Barrakuda",target:"_blank",rel:"noopener noreferrer"},on:{click:function(a){t.dokumentationClicked=!0}}},[e._v("Barrakuda-Doku")])]),n("div",[n("a",{attrs:{href:"https://wiki.muenchen.de/anwendungsentwicklung/index.php/Archetype_API-Gateway",target:"_blank",rel:"noopener noreferrer"},on:{click:function(a){t.dokumentationClicked=!0}}},[e._v("Doku Archetype API-Gateway")])]),n("div",[n("a",{attrs:{href:"https://wiki.muenchen.de/anwendungsentwicklung/index.php/Archetype_Backend",target:"_blank",rel:"noopener noreferrer"},on:{click:function(a){t.dokumentationClicked=!0}}},[e._v("Doku Archetype Backend")])]),n("div",[n("a",{attrs:{href:"https://git.muenchen.de/ccse/refarch-archetype",target:"_blank",rel:"noopener noreferrer"},on:{click:function(a){t.dokumentationClicked=!0}}},[e._v("Git-Repo Archetypes")])]),n("div",[n("a",{attrs:{href:"https://wiki.muenchen.de/anwendungsentwicklung/index.php/JavaScript-Themen",target:"_blank",rel:"noopener noreferrer"},on:{click:function(a){t.dokumentationClicked=!0}}},[e._v("Javascript-Wiki")])])])],1),n(t.YesNoDialog,{attrs:{dialogtitle:"Wirklich verlassen?",dialogtext:"Wollen Sie wirklich nicht die Dokumentation anschauen?"},on:{no:t.saveLeave.cancel,yes:t.saveLeave.leave},model:{value:t.saveLeave.saveLeaveDialog,callback:function(a){e.$set(t.saveLeave,"saveLeaveDialog",a)},expression:"saveLeave.saveLeaveDialog"}})],1)},T=[],W=_(G,R,T,!1,null,null,null,null);const V=W.exports;export{V as default};
