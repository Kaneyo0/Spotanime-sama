import{_ as S,r as h,o as a,c as e,w as g,v as m,a as c,d as r,f as C,t as _,s as R,F as u,b as y}from"./index-b61c4c5c.js";const k={data(){return{playlistSvg:"/assets/playlist-add.svg"}},props:{id:{type:Number},title:{type:String},image:{type:String,default:"/assets/playlist.svg"},isSongCard:{type:Boolean,default:!1},detailRoute:{type:String}}},L={class:"card__bloc"},v=["src"],N=["src"],x={key:1,class:"material-symbols-outlined card__icon"},b={class:"card__title"};function w(d,s,t,n,f,o){const l=h("RouterLink");return a(),e("div",L,[g(c("img",{class:"card__playlist-add",src:this.playlistSvg},null,8,v),[[m,t.isSongCard]]),r(l,{to:`${t.detailRoute}/${t.id}`,"data-id":t.id,"data-title":t.title,"data-image":t.image,class:"card"},{default:C(()=>[t.image.includes("/")?g((a(),e("img",{key:0,src:t.image,alt:"card image",class:"card__image"},null,8,N)),[[m,t.image!=""]]):(a(),e("span",x,_(t.image),1)),c("h1",b,_(t.title),1)]),_:1},8,["to","data-id","data-title","data-image"])])}const B=S(k,[["render",w]]),F={props:{cards:{type:Array},title:{type:String},isSongList:{type:Boolean,default:!1},name:{type:String},detailRoute:{type:String}},data(){return{store:R}},methods:{addSongToPlaylist(d){if(d.target.classList.contains("card__playlist-add")){const s=d.target.nextSibling,t=this.cards.find(n=>n.id===parseInt(s.dataset.id));this.store.clickedSong=`${this.store.playlistIRI}/${t.id}`,this.store.showForm()}}},components:{Card:B}},I={class:"card__list__container"},P={class:"card__list__title"},T=["data-listName"],D={class:"card__list__item"},V=["data-listName"],A={class:"card__list__item"};function E(d,s,t,n,f,o){const l=h("Card");return a(),e("article",I,[c("h3",P,_(t.title),1),t.isSongList?(a(),e("ul",{key:0,onClick:s[0]||(s[0]=(...i)=>o.addSongToPlaylist&&o.addSongToPlaylist(...i)),class:"card__list","data-listName":t.name},[(a(!0),e(u,null,y(t.cards,i=>(a(),e("li",D,[r(l,{detailRoute:t.detailRoute,isSongCard:t.isSongList,id:i.id,title:i.title,image:i.image},null,8,["detailRoute","isSongCard","id","title","image"])]))),256))],8,T)):(a(),e("ul",{key:1,class:"card__list","data-listName":t.name},[(a(!0),e(u,null,y(t.cards,i=>(a(),e("li",A,[r(l,{detailRoute:t.detailRoute,isSongCard:t.isSongList,id:i.id,title:i.title,image:i.image},null,8,["detailRoute","isSongCard","id","title","image"])]))),256))],8,V))])}const q=S(F,[["render",E]]);export{q as C};
