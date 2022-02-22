(function(){"use strict";var A={2208:function(A,e,t){var I=t(9242),n=t(3396);function r(A,e,t,I,r,Q){const a=(0,n.up)("router-view");return(0,n.wg)(),(0,n.j4)(a)}var Q={name:"App"},a=t(89);const i=(0,a.Z)(Q,[["render",r]]);var s=i,g=t(678),o=t(7139);const c={id:"homePage"},C={id:"topToolbar"},l={class:"main-wrapper"},h={id:"sideToolbar"},d=["src","id","ele-type","onDragstart"];function E(A,e,t,r,Q,a){return(0,n.wg)(),(0,n.iD)("div",c,[(0,n._)("div",C,[(0,n._)("button",{class:"btn",onClick:e[0]||(e[0]=(...A)=>a.downloadCanvasImage&&a.downloadCanvasImage(...A))},"Download as image")]),(0,n._)("div",l,[(0,n._)("div",h,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(Q.toolbarEle,(A=>((0,n.wg)(),(0,n.iD)("div",{class:"icon",key:A.name},[(0,n._)("img",{src:A.imgSrc,alt:"",srcset:"",id:A.eleId,"ele-type":A.name,onDragstart:e=>a.dragStart(A)},null,40,d),(0,n._)("h1",null,(0,o.zw)(A.name),1)])))),128))]),(0,n._)("div",{ref:"canvas",class:"canvas-wrapper",id:"container",onDragover:e[1]||(e[1]=(0,I.iM)(((...A)=>a.dragOver&&a.dragOver(...A)),["prevent"])),onDrop:e[2]||(e[2]=(0,I.iM)(((...A)=>a.dropOver&&a.dropOver(...A)),["prevent"]))},null,544)])])}var B=t(6229),u={name:"HomePage",data(){return{stage:null,layer:null,transformer:null,eleSelected:null,eleInjected:!1,previousPosOfShape:null,shape:null,toolbarEle:[{eleId:1,name:"floor",imgSrc:t(9759)},{eleId:2,name:"cabin",imgSrc:t(4899)},{eleId:3,name:"seat",imgSrc:t(605)}]}},created(){let A=this;this.$nextTick((()=>{if(A.$refs["canvas"]){let e=.9*window.innerHeight,t=window.innerWidth-50;this.stage=new B.Z.Stage({container:"container",width:t,height:e}),this.layer=new B.Z.Layer,this.transformer=new B.Z.Transformer,this.layer.add(this.transformer),this.stage.on("click",(A=>{let e=A.target.getAttr("container");e?this.transformer.detach():(this.shape=A.target,this.eleSelected=parseInt(A.target.getAttr("id").slice(-1)),this.transformer.nodes([A.target])),this.updateStage()})),document.addEventListener("click",(()=>{this.transformer&&(this.transformer.detach(),this.updateStage())})),document.addEventListener("keydown",(e=>{A.transformer&&"Delete"==e.key&&this.shape&&A.eliminateCurrentEle()}))}}))},mounted(){},methods:{dragOver(A){this.eleInjected?this.moveInjecteEle(A):this.injectEleToCanvas()},dragStart(A){this.eleSelected=A.eleId,this.eleInjected=!1},dropOver(){this.checkElementConstraints()},injectEleToCanvas(){this.eleInjected=!0;let A=this.getKonvaEle();if(A){let e=this;A.on("dragstart",(function(A){e.shape=A.target,e.shape&&(e.transformer.nodes([A.target]),e.updateStage()),e.eleSelected=parseInt(e.shape.getAttr("id").slice(-1)),e.previousPosOfShape=e.shape.getClientRect()})),A.on("dragend",(()=>{e.checkElementConstraints()})),A.on("dragmove",(function(){document.body.style.cursor="pointer",e.eleSelected=parseInt(e.shape.getAttr("id").slice(-1))})),A.on("mouseover",(function(){document.body.style.cursor="pointer"})),A.on("mouseout",(function(){document.body.style.cursor="default"})),A.zIndex(this.eleSelected);let t=new B.Z.Layer;t.add(A),this.stage.add(t),this.transformer.nodes([A]),t.add(this.transformer),this.stage.add(t),this.shape=A}},getKonvaEle(){if(this.eleSelected)switch(this.eleSelected){case 1:return new B.Z.Rect({x:35,y:35,fill:"grey",stroke:"black",strokeWidth:2,strokeScaleEnabled:!1,draggable:!0,width:50,height:50,id:"myEle1"});case 2:return new B.Z.Rect({x:35,y:35,fill:"#fafafa",stroke:"black",strokeWidth:2,strokeScaleEnabled:!1,draggable:!0,width:25,height:25,id:"myEle2"});case 3:var A=new Image;return A.src=t(605),new B.Z.Image({x:50,y:50,image:A,width:20,height:20,draggable:!0,id:"myEle3"})}},moveInjecteEle(A){if(this.shape){let e=this.shape;e.setAttrs({x:A.offsetX-e.getAttrs().width/2,y:A.offsetY-e.getAttrs().height/2})}},updateStage(){this.layer.add(this.transformer),this.stage.add(this.layer)},checkElementConstraints(){switch(this.eleSelected){case 1:this.checkFloorPos();break;case 2:this.checkCabinPos();break;case 3:this.checkChairPos();break}},checkFloorPos(){},checkCabinPos(){let A=this.stage.find("#myEle1"),e=!1;A.length&&A.some((A=>{if(this.haveIntersection(A.getClientRect(),this.shape.getClientRect()))return e=!0,!0})),e||this.eliminateCurrentEle()},checkChairPos(){let A=this.stage.find("#myEle2"),e=!1;A.length&&A.some((A=>{if(this.haveIntersection(A.getClientRect(),this.shape.getClientRect())&&!this.hasAChair(A))return e=!0,!0})),e||this.eliminateCurrentEle()},haveIntersection(A,e){return!(e.x>A.x+A.width||e.x+e.width<A.x||e.y>A.y+A.height||e.y+e.height<A.y)},eliminateCurrentEle(){this.transformer.destroy(),this.shape.destroy(),this.eleInjected=!1,this.transformer=new B.Z.Transformer,this.updateStage()},downloadCanvasImage(){this.transformer.destroy(),this.transformer=new B.Z.Transformer,this.updateStage();var A=this.stage.toDataURL({pixelRatio:3}),e=document.createElement("a");e.download="CanvasImage.png",e.href=A,document.body.appendChild(e),e.click(),document.body.removeChild(e)},hasAChair(A){let e=this.stage.find("#myEle3"),t=!1;return e.length&&e.some((e=>{if(e!=this.shape&&this.haveIntersection(e.getClientRect(),A.getClientRect()))return t=!0,!0})),t}}};const f=(0,a.Z)(u,[["render",E],["__scopeId","data-v-5f1cda4b"]]);var m=f;const k=[{path:"/",redirect:"/home"},{path:"/home",name:"Home",component:m},{path:"/:pathMatch(.*)*",redirect:"/"}],v=(0,g.p7)({history:(0,g.PO)("/Task1/"),routes:k});var S=v;const p=(0,I.ri)(s);p.use(S),p.mount("#app")},4899:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAArkSURBVHic7d09r2V1HYbh5xwm0cpoQ/wG8tZgLIhCoERrjfENY2doiF/BUEunhYWFFmJhjI1WGoIkFoCRDBJbCzU2YoyNYRiLPSNkwvCmZ29m7utKTnHW3mfnd6p1r//aa62zvTf3bvvsts9su3vbnds+9h4/AwD43/1929+2/WHbc9t+ue3ld/vHZ+/iPZe2fWnbt7bd/z4GBACO48VtT2378bbX3u6N7xQAD2/73g5H+wDAreHytse3PXuzN9zxNtuf3Pb9HZb5AYBbx53bvr7DKv4z267e+Ia3WgH40LYfbfv8hY4GABzDT7Z9bdu/37zxxgA43+G8wReONBQAcPF+tsOB/ZXrG248BfDktm8ecyIA4MLdtcNB/6+vb3jzCsDD2361wyoAAHB7eX3bI7v2xcDrAXBp2++33XOamQCAI7i8wyX9r10/2v/y7PwB4HZ337Yvbm+sALw4N/kBgIIXtn3qbIfb+14+8TAAwPHce77tc6eeAgA4qkfPt3361FMAAEf14Pnc5x8Aau462/aPbR859SQAwNG8erbD4wJv9lAgAOD2c+Vsb/GEIADg9ua2vwAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABF069QDX/GDbb089BAAcwQPbvnHqIbbt6gfg57EL/y8B4IPhsZ1+v3vVKQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAg6NKpB7jmkW0fPvUQAHAED5x6gG0723b11EMAAMflFAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEHn266ceggA4KiunG/716mnAACO6p/n2/5y6ikAgKP68/m2V049BQBwVH883/bcqacAAI7qN2fb7t12+dSTAABHc8/5tpe3vXjqSQCAo3h+2yvX7wPw1CknAQCO5jvbdnbtl0vbfrftvpONAwBctJe2fXLX7gOwba9te3zb6ycbCQC4SFd22Ndf2bY73vTCn3ZYCXj4BEMBABfr29t+eP2XO2548Zltd+9wZQAAcHt4etsT265e33BjAFzd9vNtn5gIAIDbwdPbHtvhdP9/3RgA2+HcwE93eFDQQ3vji4IAwK3jyg7L/k/shp3/9s4794e2fXeuDgCAW8lLO3zh76Z3+z2/2QvXPLvt/m1f3fbC/28uAOACPL/tKztc6ve2t/p/r8v792x7dNuD2+7a9vFtH30fnwMAvH9Xt7267a87PNTvuW2/2Ht4wN9/AKfzpXLcm230AAAAAElFTkSuQmCC"},9759:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAANtJREFUWEftmDEKhDAURCeYnEIb22DlQcSjil0uYaUWqfUUKlmUhS12Cz8sJsWkHsjjZdKMKssyLMuCbdsQ+xhjUBQFnHNQxpiw7ztCCLG5oJSC1hrTNEEBuIjqukae58iy7HHA4ziwriuGYbju9t5/wJqmgbX2In76nC82zzP6vv8Ga9sWVVVFAxvHEV3XEexWK86npLFbqt4hGpPYOrM0RmNSA9I8O0ZjUgPSPDtGY1ID0jw7RmNSA9I8O0ZjUgPSPDv2V2PJrj3J7WPJLorJbrDe+/jj64/f8gLxgcgk4SQgzgAAAABJRU5ErkJggg=="},605:function(A,e,t){A.exports=t.p+"img/seat.dc2a7604.png"}},e={};function t(I){var n=e[I];if(void 0!==n)return n.exports;var r=e[I]={exports:{}};return A[I](r,r.exports,t),r.exports}t.m=A,function(){var A=[];t.O=function(e,I,n,r){if(!I){var Q=1/0;for(g=0;g<A.length;g++){I=A[g][0],n=A[g][1],r=A[g][2];for(var a=!0,i=0;i<I.length;i++)(!1&r||Q>=r)&&Object.keys(t.O).every((function(A){return t.O[A](I[i])}))?I.splice(i--,1):(a=!1,r<Q&&(Q=r));if(a){A.splice(g--,1);var s=n();void 0!==s&&(e=s)}}return e}r=r||0;for(var g=A.length;g>0&&A[g-1][2]>r;g--)A[g]=A[g-1];A[g]=[I,n,r]}}(),function(){t.n=function(A){var e=A&&A.__esModule?function(){return A["default"]}:function(){return A};return t.d(e,{a:e}),e}}(),function(){t.d=function(A,e){for(var I in e)t.o(e,I)&&!t.o(A,I)&&Object.defineProperty(A,I,{enumerable:!0,get:e[I]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(A){if("object"===typeof window)return window}}()}(),function(){t.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)}}(),function(){t.p="/Task1/"}(),function(){var A={143:0};t.O.j=function(e){return 0===A[e]};var e=function(e,I){var n,r,Q=I[0],a=I[1],i=I[2],s=0;if(Q.some((function(e){return 0!==A[e]}))){for(n in a)t.o(a,n)&&(t.m[n]=a[n]);if(i)var g=i(t)}for(e&&e(I);s<Q.length;s++)r=Q[s],t.o(A,r)&&A[r]&&A[r][0](),A[r]=0;return t.O(g)},I=self["webpackChunkfloor_planner"]=self["webpackChunkfloor_planner"]||[];I.forEach(e.bind(null,0)),I.push=e.bind(null,I.push.bind(I))}();var I=t.O(void 0,[998],(function(){return t(2208)}));I=t.O(I)})();
//# sourceMappingURL=app.695de79f.js.map