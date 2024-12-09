import{d as D,u as L,x as b,y as I,r as c,c as a,n as h,f as S,g as V,z as x,B as y}from"./index.5c2e6855.js";import{L as C,D as $}from"./DeleteDialog.bb2477fd.js";import{P as k}from"./PersonApiService.e3829719.js";const A=D({__name:"PersonListItem",props:{person:null},emits:["deleted"],setup(d,{emit:n}){const t=d,e=L(),o=b(),p=I(),r=c(!1),l=c(!1),u=a(()=>`${t.person.firstname} ${t.person.lastname}`),m=a(()=>{var s;return(s=t.person.team)==null?void 0:s.identifierString});function _(){var s,i;o.push({name:"person.detail",params:{id:(i=(s=t.person.id)==null?void 0:s.toString())!=null?i:""}})}function f(){var s,i;o.push({name:"person.edit",params:{id:(i=(s=t.person.id)==null?void 0:s.toString())!=null?i:""}})}function g(){r.value=!0}function v(){l.value=!0,k.delete(t.person.id||"").then(()=>{n("deleted",t.person)}).catch(s=>{e.showMessage(s)}).finally(()=>{l.value=!1,r.value=!1})}const P=a(()=>p.deleted!=null);return{__sfc:!0,props:t,emits:n,snackbarStore:e,router:o,listeners:p,deleteDialogVisible:r,deleteDialogIsLoading:l,title:u,subtitle:m,openPerson:_,editPerson:f,deleteRequested:g,deleteConfirmed:v,showDelete:P,ListItemActions:C,DeleteDialog:$}}});var R=function(){var n=this,t=n._self._c,e=n._self._setupProxy;return t(S,{on:{click:e.openPerson}},[t(V,[t(x,[n._v(n._s(e.title))]),t(y,[n._v(n._s(e.subtitle))])],1),e.showDelete?t(e.ListItemActions,{on:{open:e.openPerson,edit:e.editPerson,delete:e.deleteRequested}}):t(e.ListItemActions,{on:{open:e.openPerson,edit:e.editPerson}}),t(e.DeleteDialog,{attrs:{"is-loading-animation":e.deleteDialogIsLoading,"descriptor-string":`${e.props.person.firstname} ${e.props.person.lastname}`},on:{delete:e.deleteConfirmed},model:{value:e.deleteDialogVisible,callback:function(o){e.deleteDialogVisible=o},expression:"deleteDialogVisible"}})],1)},w=[],q=h(A,R,w,!1,null,"7c54b245",null,null);const M=q.exports;export{M as P};
