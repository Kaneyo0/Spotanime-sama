import{C as r}from"./CardList-5c5e1eae.js";import{_ as i,s as c,P as l,r as _,o as e,c as s,a as d,F as m,b as p,w as u,v as h,d as f}from"./index-780b8365.js";const L={name:"App",data(){return{store:c}},components:{CardList:r,PlaylistForm:l},async created(){await this.store.initialize()}},g={class:"container"},C={class:"container__lists"},v={class:"container__lists__item"};function w(x,B,F,R,o,S){const n=_("CardList");return e(),s("main",g,[d("ul",C,[(e(!0),s(m,null,p(o.store.list,(t,a)=>(e(),s("li",v,[u(f(n,{detailRoute:t.detailRoute,name:a,isSongList:a==="songs",title:t.title,cards:t.items},null,8,["detailRoute","name","isSongList","title","cards"]),[[h,t.items.length>0]])]))),256))])])}const y=i(L,[["render",w]]);export{y as default};