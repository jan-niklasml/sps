import{T as r,V as n}from"./index.5c2e6855.js";const o=r.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(e){let t;return(!this.$attrs.role||this.$attrs.role==="separator")&&(t=this.vertical?"vertical":"horizontal"),e("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":t,...this.$attrs},on:this.$listeners})}}),c=n.extend({name:"v-list-item-action",functional:!0,render(e,{data:t,children:i=[]}){return t.staticClass=t.staticClass?`v-list-item__action ${t.staticClass}`:"v-list-item__action",i.filter(s=>s.isComment===!1&&s.text!==" ").length>1&&(t.staticClass+=" v-list-item__action--stack"),e("div",t,i)}});export{o as _,c as a};
