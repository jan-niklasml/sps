System.register(["./index-legacy.61f8d398.js","./DeleteDialog-legacy.480721f3.js","./PersonApiService-legacy.a6da53e9.js"],(function(e,t){"use strict";var n,i,s,o,l,r,d,a,u,p,c,g,m,v;return{setters:[e=>{n=e.d,i=e.u,s=e.x,o=e.y,l=e.r,r=e.c,d=e.n,a=e.f,u=e.g,p=e.z,c=e.B},e=>{g=e.L,m=e.D},e=>{v=e.P}],execute:function(){e("P",d(n({__name:"PersonListItem",props:{person:null},emits:["deleted"],setup(e,{emit:t}){const n=e,d=i(),a=s(),u=o(),p=l(!1),c=l(!1),f=r((()=>`${n.person.firstname} ${n.person.lastname}`)),D=r((()=>{var e;return null===(e=n.person.team)||void 0===e?void 0:e.identifierString})),P=r((()=>null!=u.deleted));return{__sfc:!0,props:n,emits:t,snackbarStore:d,router:a,listeners:u,deleteDialogVisible:p,deleteDialogIsLoading:c,title:f,subtitle:D,openPerson:function(){var e,t;a.push({name:"person.detail",params:{id:null!==(e=null===(t=n.person.id)||void 0===t?void 0:t.toString())&&void 0!==e?e:""}})},editPerson:function(){var e,t;a.push({name:"person.edit",params:{id:null!==(e=null===(t=n.person.id)||void 0===t?void 0:t.toString())&&void 0!==e?e:""}})},deleteRequested:function(){p.value=!0},deleteConfirmed:function(){c.value=!0,v.delete(n.person.id||"").then((()=>{t("deleted",n.person)})).catch((e=>{d.showMessage(e)})).finally((()=>{c.value=!1,p.value=!1}))},showDelete:P,ListItemActions:g,DeleteDialog:m}}}),(function(){var e=this,t=e._self._c,n=e._self._setupProxy;return t(a,{on:{click:n.openPerson}},[t(u,[t(p,[e._v(e._s(n.title))]),t(c,[e._v(e._s(n.subtitle))])],1),n.showDelete?t(n.ListItemActions,{on:{open:n.openPerson,edit:n.editPerson,delete:n.deleteRequested}}):t(n.ListItemActions,{on:{open:n.openPerson,edit:n.editPerson}}),t(n.DeleteDialog,{attrs:{"is-loading-animation":n.deleteDialogIsLoading,"descriptor-string":`${n.props.person.firstname} ${n.props.person.lastname}`},on:{delete:n.deleteConfirmed},model:{value:n.deleteDialogVisible,callback:function(e){n.deleteDialogVisible=e},expression:"deleteDialogVisible"}})],1)}),[],!1,null,"7c54b245",null,null).exports)}}}));
