import{d as v,u as I,x as T,r as i,c as f,n as g,f as x,g as y,z as h,B as E,o as $,e as D,h as P,_ as S,i as k,k as A,l as C}from"./index.5c2e6855.js";import{L as M,D as R}from"./DeleteDialog.bb2477fd.js";import{T as b}from"./TeamApiService.45f87cc8.js";import{_ as V}from"./VListItemAction.f187d94c.js";import{_ as N}from"./VSubheader.3dd6c797.js";import{_ as w}from"./VTooltip.3363e3a0.js";import"./VDialog.54b8c02e.js";import"./EntityApiService.bdec22c4.js";const B=v({__name:"TeamListItem",props:{team:null},emits:["deleted"],setup(_,{emit:n}){const e=_,t=I(),s=T(),o=i(!1),r=i(!1),u=f(()=>`${e.team.name}`),m=f(()=>"");function d(){var l,c;s.push({name:"team.detail",params:{id:(c=(l=e.team.id)==null?void 0:l.toString())!=null?c:""}})}function a(){var l,c;s.push({name:"team.edit",params:{id:(c=(l=e.team.id)==null?void 0:l.toString())!=null?c:""}})}function p(){o.value=!0}function L(){r.value=!0,b.delete(e.team.id).then(()=>{n("deleted",e.team)}).catch(l=>{t.showMessage(l)}).finally(()=>{r.value=!1,o.value=!1})}return{__sfc:!0,props:e,emits:n,snackbarStore:t,router:s,deleteDialogVisible:o,deleteDialogIsLoading:r,title:u,subtitle:m,openItem:d,editItem:a,deleteItem:p,deleteConfirmed:L,ListItemActions:M,DeleteDialog:R}}});var K=function(){var n=this,e=n._self._c,t=n._self._setupProxy;return e(x,{on:{click:t.openItem}},[e(y,[e(h,[n._v(n._s(t.title))]),e(E,[n._v(n._s(t.subtitle))])],1),e(t.ListItemActions,{on:{open:t.openItem,edit:t.editItem,delete:t.deleteItem}}),e(t.DeleteDialog,{attrs:{"is-loading-animation":t.deleteDialogIsLoading,"descriptor-string":n.team.identifierString},on:{delete:t.deleteConfirmed},model:{value:t.deleteDialogVisible,callback:function(s){t.deleteDialogVisible=s},expression:"deleteDialogVisible"}})],1)},F=[],z=g(B,K,F,!1,null,"c9dbdf3e",null,null);const J=z.exports,O=v({__name:"TeamList",setup(_){const n=I(),e=i([]),t=i(!1),s=i(-1),o=i(Number.MAX_VALUE),r=i(null);$(()=>{u()});function u(){t.value=!0,b.getAllPaged(s.value+1).then(a=>{e.value.push(...a.data),s.value=a.page,o.value=a.totalPages,r.value=a.totalElements}).catch(a=>{n.showMessage(a)}).finally(()=>{t.value=!1})}function m(a){e.value=e.value.filter(p=>p.id!=a.id)}const d=f(()=>s.value>=o.value-1);return{__sfc:!0,snackbarStore:n,teams:e,busy:t,currentPage:s,totalPages:o,totalElements:r,loadMore:u,teamDeleted:m,allPagesLoaded:d,TeamListItem:J}}});var W=function(){var n=this,e=n._self._c,t=n._self._setupProxy;return e(D,{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{id:"infinite-scroll","two-line":"","infinite-scroll-disabled":"busy"}},[n._l(t.teams,function(s,o){return[e(t.TeamListItem,{key:`team-${s.id}`,attrs:{team:s},on:{deleted:t.teamDeleted}}),e(V,{key:`divider-${o}`,staticClass:"divider"})]}),t.allPagesLoaded?e(x,[e(y,{staticClass:"text--secondary d-flex justify-center"},[n._v(" "+n._s(t.totalElements)+" Eintr\xE4ge insgesamt ")])],1):n._e(),!t.busy&&(t.teams===void 0||t.teams.length<1)?[e(N,[n._v("Keine Teams vorhanden")])]:n._e(),t.busy?[e(P,{attrs:{indeterminate:"",color:"accent"}})]:n._e()],2)},j=[],U=g(O,W,j,!1,null,"c977ff97",null,null);const X=U.exports,q=v({__name:"TeamIndex",setup(_){return{__sfc:!0,TeamList:X}}});var G=function(){var n=this,e=n._self._c,t=n._self._setupProxy;return e(S,[e(k,{attrs:{flat:""}},[e("h1",{staticClass:"text-h5"},[n._v("Teams")]),e(t.TeamList)],1),e(w,{attrs:{top:""},scopedSlots:n._u([{key:"activator",fn:function({on:s}){return[e(A,n._g({directives:[{name:"security",rawName:"v-security",value:"BEISPIELPROJEKT_BACKEND_WRITE_TEAM",expression:"'BEISPIELPROJEKT_BACKEND_WRITE_TEAM'"}],attrs:{id:"create-team",bottom:"",right:"",fixed:"",fab:"",dark:"",color:"accent",to:{name:"team.create"}}},s),[e(C,[n._v("mdi-plus")])],1)]}}])},[e("span",[n._v("Neues Team anlegen")])])],1)},H=[],Q=g(q,G,H,!1,null,"af2a1036",null,null);const le=Q.exports;export{le as default};
