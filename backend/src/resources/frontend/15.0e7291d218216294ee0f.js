(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[15],{9015:(e,t,r)=>{"use strict";r.r(t),r.d(t,{ArtistsModule:()=>w});var n=r(4466),s=r(6901),o=r(275),i=r(639),a=r(6056),l=r(5757),c=r(665),g=r(8583),u=r(5748);const p=function(e){return{"text-small":e}};let h=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=i.Xpm({type:e,selectors:[["app-artist"]],inputs:{artist:"artist"},decls:6,vars:6,consts:[[1,"container-fluid","song-container","d-flex"],[1,"row","position-relative","flex-grow-1"],[1,"col-12","align-self-center"],[1,"txt-primary","text-center",3,"ngClass"]],template:function(e,t){1&e&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"div",2),i.TgZ(3,"h1",3),i._uU(4),i.ALo(5,"titlecase"),i.qZA(),i.qZA(),i.qZA(),i.qZA()),2&e&&(i.xp6(3),i.Q6J("ngClass",i.VKq(4,p,t.artist.name.length>20)),i.xp6(1),i.Oqu(i.lcZ(5,2,t.artist.name)))},directives:[g.mk],pipes:[g.rS],styles:[".song-container[_ngcontent-%COMP%]{background:#ffffff1a;height:225px;border-radius:8px;padding:1.25rem;transition:background-color .3s ease}.song-container[_ngcontent-%COMP%]:hover{background:#fff3}.field-text[_ngcontent-%COMP%]{font-size:20px}"]}),e})();function d(e,t){if(1&e){const e=i.EpF();i.TgZ(0,"li",16),i.NdJ("click",function(){const t=i.CHM(e).$implicit;return i.oxw().onChangeCountry(t.name)}),i.TgZ(1,"a",17),i._uU(2),i.qZA(),i.qZA()}if(2&e){const e=t.$implicit;i.xp6(2),i.Oqu(e.name)}}function f(e,t){1&e&&(i.ynx(0),i.TgZ(1,"div",25),i.TgZ(2,"div",5),i.TgZ(3,"div",26),i._UZ(4,"ngx-spinner",27),i.qZA(),i.qZA(),i.qZA(),i.BQk()),2&e&&(i.xp6(4),i.Q6J("fullScreen",!1))}function Z(e,t){if(1&e&&(i.TgZ(0,"div",33),i._UZ(1,"app-artist",34),i.qZA()),2&e){const e=t.$implicit;i.xp6(1),i.Q6J("artist",e)}}function m(e,t){if(1&e){const e=i.EpF();i.TgZ(0,"div",30),i.TgZ(1,"div",5),i.TgZ(2,"div",3),i.TgZ(3,"div",4),i.YNc(4,Z,2,1,"div",31),i.qZA(),i.qZA(),i.qZA(),i.TgZ(5,"app-pagination",32),i.NdJ("changePage",function(t){return i.CHM(e),i.oxw(2).onChangePage(t)}),i.qZA(),i.qZA()}if(2&e){const e=i.oxw(2);i.xp6(4),i.Q6J("ngForOf",e.response.results),i.xp6(1),i.Q6J("loading",e.loading)("totalPages",e.response.totalPages)("currentPage",e.query.page)}}function b(e,t){1&e&&(i.TgZ(0,"div",25),i.TgZ(1,"div",5),i.TgZ(2,"p",35),i._uU(3,"No results were found..."),i.qZA(),i.qZA(),i.qZA())}function y(e,t){if(1&e&&(i.YNc(0,m,6,4,"div",28),i.YNc(1,b,4,0,"ng-template",null,29,i.W1O)),2&e){const e=i.MAs(2),t=i.oxw();i.Q6J("ngIf",t.response.results.length>0)("ngIfElse",e)}}let q=(()=>{class e{constructor(e,t,r,n){this.searchService=e,this.route=t,this.router=r,this.spinner=n,this.response={results:[],totalPages:0},this.query={page:o.l.DEFAULT_ITEMS_PER_PAGE,itemsPerPage:o.l.DEFAULT_ITEMS_PER_PAGE},this.countries=[],this.selectedCountry="Any",this.selectedGenre="Any",this.loading=!0}ngOnInit(){this.spinner.show(),this.route.queryParams.subscribe(e=>{this.parseQueryParams(),this.loading=!0,this.spinner.show(),this.searchService.getArtists(this.query)}),this.searchService.getCountries(),this.countriesSub=this.searchService.countries.subscribe(e=>{e&&(this.countries=e)}),this.artistsSub=this.searchService.artists.subscribe(e=>{this.response=Object.assign(Object.assign({},this.response),e),this.loading&&this.spinner.hide().then(()=>this.loading=!1)})}onChangeCountry(e){this.selectedCountry=e,this.query.country=e,e||(this.selectedCountry="Any",delete this.query.country)}onChangeGenre(e){"Enter"===e.key&&this.onSearch()}onChangeArtist(e){"Enter"===e.key&&this.onSearch()}onSearch(){this.query.page=0,this.query.genre=this.selectedGenre,"Any"==this.selectedGenre&&delete this.query.genre,this.updateRoute()}onChangePage(e){this.query.page=e,this.updateRoute()}updateRoute(){this.router.navigate([],{relativeTo:this.route,queryParams:Object.assign({},this.query),replaceUrl:!1})}parseQueryParams(){const e=this.route.snapshot.queryParams;this.query=Object.assign(Object.assign({},this.query),e),e.page?(this.query.page=Number.parseInt(e.page),this.query.page=isNaN(this.query.page)?o.l.DEFAULT_PAGE:this.query.page):this.query.page=o.l.DEFAULT_PAGE,e.itemsPerPage?(this.query.itemsPerPage=Number.parseInt(e.itemsPerPage),this.query.itemsPerPage=isNaN(this.query.itemsPerPage)?o.l.DEFAULT_ITEMS_PER_PAGE:this.query.itemsPerPage):this.query.itemsPerPage=o.l.DEFAULT_ITEMS_PER_PAGE,e.country||delete this.query.country,e.genre||delete this.query.genre}ngOnDestroy(){this.artistsSub&&this.artistsSub.unsubscribe(),this.countriesSub&&this.countriesSub.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(i.Y36(a.o),i.Y36(s.gz),i.Y36(s.F0),i.Y36(l.t2))},e.\u0275cmp=i.Xpm({type:e,selectors:[["app-popularity"]],decls:40,vars:5,consts:[[1,"container-fluid","px-0","d-flex"],[1,"row","d-flex","flex-grow-1","flex-column"],[1,"col-12","flex-grow-0"],[1,"container-fluid","px-0"],[1,"row"],[1,"col-12"],[1,"row","align-items-end","justify-content-between"],[1,"col-md-4","col-6","d-flex","align-items-center"],[1,"row","d-flex","flex-grow-1"],["for","Genre",1,"form-label","search-element-label","txt-primary"],["type","text","id","Genre","placeholder","genre",1,"search-element","form-control","w-100",3,"ngModel","keypress","ngModelChange"],[1,"row","flex-grow-1"],[1,"form-label","search-element-label","txt-primary"],[1,"dropdown","w-100"],["type","button","id","countriesDropdown","data-bs-toggle","dropdown","aria-expanded","false",1,"btn","search-element","w-100","btn-secondary","dropdown-toggle","d-flex","align-items-center","justify-content-between"],["aria-labelledby","countriesDropdown",1,"dropdown-menu","search-element","dropdown-menu-end","dropdown-limits"],[3,"click"],[1,"dropdown-item","txt-primary"],[3,"click",4,"ngFor","ngForOf"],[1,"col-md-4","mt-2","mt-md-0","col-12","d-flex","align-items-center"],[1,"btn","search-btn","w-100",3,"click"],[1,"col-12","my-4","flex-grow-1","d-flex"],[1,"container-fluid","px-0","flex-grow-1","d-flex"],[4,"ngIf","ngIfElse"],["NOT_LOADING",""],[1,"row","align-items-center","justify-content-center","flex-grow-1"],[1,"h-100","w-100","position-relative"],["bdColor","rgba(0,0,0,0)","size","medium","color","#fff","type","ball-rotate",3,"fullScreen"],["class","row align-content-between justify-content-center",4,"ngIf","ngIfElse"],["NO_RESULTS",""],[1,"row","align-content-between","justify-content-center"],["class","col-12 col-md-4 mt-4",4,"ngFor","ngForOf"],[3,"loading","totalPages","currentPage","changePage"],[1,"col-12","col-md-4","mt-4"],[3,"artist"],[1,"text-center","no-results"]],template:function(e,t){if(1&e&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"div",2),i.TgZ(3,"div",3),i.TgZ(4,"div",4),i.TgZ(5,"div",5),i.TgZ(6,"div",3),i.TgZ(7,"div",6),i.TgZ(8,"div",7),i.TgZ(9,"div",3),i.TgZ(10,"div",8),i.TgZ(11,"div",5),i.TgZ(12,"label",9),i._uU(13,"Genre"),i.qZA(),i.qZA(),i.TgZ(14,"div",5),i.TgZ(15,"input",10),i.NdJ("keypress",function(e){return t.onChangeGenre(e)})("ngModelChange",function(e){return t.selectedGenre=e}),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(16,"div",7),i.TgZ(17,"div",3),i.TgZ(18,"div",11),i.TgZ(19,"div",5),i.TgZ(20,"label",12),i._uU(21,"Country"),i.qZA(),i.qZA(),i.TgZ(22,"div",5),i.TgZ(23,"div",13),i.TgZ(24,"button",14),i.TgZ(25,"span"),i._uU(26),i.qZA(),i.qZA(),i.TgZ(27,"ul",15),i.TgZ(28,"li",16),i.NdJ("click",function(){return t.onChangeCountry(null)}),i.TgZ(29,"a",17),i._uU(30,"Any"),i.qZA(),i.qZA(),i.YNc(31,d,3,1,"li",18),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(32,"div",19),i.TgZ(33,"button",20),i.NdJ("click",function(){return t.onSearch()}),i._uU(34,"Search"),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(35,"div",21),i.TgZ(36,"div",22),i.YNc(37,f,5,1,"ng-container",23),i.YNc(38,y,3,2,"ng-template",null,24,i.W1O),i.qZA(),i.qZA(),i.qZA(),i.qZA()),2&e){const e=i.MAs(39);i.xp6(15),i.Q6J("ngModel",t.selectedGenre),i.xp6(11),i.Oqu(t.selectedCountry),i.xp6(5),i.Q6J("ngForOf",t.countries),i.xp6(6),i.Q6J("ngIf",t.loading)("ngIfElse",e)}},directives:[c.Fj,c.JJ,c.On,g.sg,g.O5,l.Ro,u.Q,h],styles:["[_nghost-%COMP%]{display:flex;flex:1}.no-results[_ngcontent-%COMP%]{color:var(--primary);font-size:24px}.dropdown-item[_ngcontent-%COMP%]{cursor:pointer;transition:background-color .3s ease}.dropdown-item[_ngcontent-%COMP%]:hover{background-color:#f7743c80}.dropdown-limits[_ngcontent-%COMP%]{max-height:200px!important;overflow-y:auto!important}.search-element[_ngcontent-%COMP%]{background-color:#ffffff4d;color:#fff;border:8px}.search-element-label[_ngcontent-%COMP%]{font-size:16px}.search-element[_ngcontent-%COMP%]::placeholder{color:#ffffffb3}.search-btn[_ngcontent-%COMP%]{background-color:#ffffff4d;color:#fff;border:8px;transition:background-color .3s ease}.search-btn[_ngcontent-%COMP%]:hover{background-color:#f7743c80}"]}),e})();const A=function(e){return{active:e}},v=function(e){return{"d-none":e}},x=[{path:"",component:(()=>{class e{constructor(e,t){this.searchService=e,this.router=t}ngOnInit(){}navigateTo(e){this.router.navigate([e])}currentTab(e){return this.router.url.split("?")[0]===e}}return e.\u0275fac=function(t){return new(t||e)(i.Y36(a.o),i.Y36(s.F0))},e.\u0275cmp=i.Xpm({type:e,selectors:[["app-artists"]],decls:12,vars:6,consts:[[1,"container-lg","mt-4","d-flex"],[1,"row","d-flex","flex-grow-1","flex-column"],[1,"col-12","flex-grow-0"],[1,"nav","nav-tabs"],[1,"nav-item","tab-item",3,"click"],[1,"nav-link","txt-primary",3,"ngClass"],[1,"col-12","flex-grow-1","d-flex"]],template:function(e,t){1&e&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"div",2),i.TgZ(3,"ul",3),i.TgZ(4,"li",4),i.NdJ("click",function(){return t.navigateTo("/artists/popularity")}),i.TgZ(5,"a",5),i._uU(6,"Popularity"),i.qZA(),i.qZA(),i.TgZ(7,"li",4),i.NdJ("click",function(){return t.navigateTo("/artists/relations")}),i.TgZ(8,"a",5),i._uU(9,"Relations"),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(10,"div",6),i._UZ(11,"router-outlet"),i.qZA(),i.qZA(),i.qZA()),2&e&&(i.xp6(5),i.Q6J("ngClass",i.VKq(2,A,t.currentTab("/artists/popularity"))),i.xp6(3),i.Q6J("ngClass",i.VKq(4,A,t.currentTab("/artists/relations"))))},directives:[g.mk,s.lC],styles:["[_nghost-%COMP%]{display:flex;flex:1}.no-results[_ngcontent-%COMP%]{color:var(--primary);font-size:24px}.dropdown-item[_ngcontent-%COMP%]{cursor:pointer;transition:background-color .3s ease}.dropdown-item[_ngcontent-%COMP%]:hover{background-color:#f7743c80}.dropdown-limits[_ngcontent-%COMP%]{max-height:200px!important;overflow-y:auto!important}.search-element[_ngcontent-%COMP%]{background-color:#ffffff4d;color:#fff;border:8px}.search-element-label[_ngcontent-%COMP%]{font-size:16px}.search-element[_ngcontent-%COMP%]::placeholder{color:#ffffffb3}.search-btn[_ngcontent-%COMP%]{background-color:#ffffff4d;color:#fff;border:8px;transition:background-color .3s ease}.search-btn[_ngcontent-%COMP%]:hover{background-color:#f7743c80}.tab-item[_ngcontent-%COMP%]{cursor:pointer;background-color:#ffffff1a;border-radius:8px 8px 0 0}.tab-item[_ngcontent-%COMP%], .tab-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{border:none}.nav-link.active[_ngcontent-%COMP%]{color:var(--primary);background-color:var(--secondary);transition:background-color .3s ease}.tab-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover{background-color:#fff3;color:var(--primary);border:none}.tab-item[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%]{background-color:var(--secondary);color:var(--tertiary);border:none}.nav-tabs[_ngcontent-%COMP%]{border-bottom:1px solid #fff9;margin-bottom:24px}"]}),e})(),children:[{path:"",redirectTo:"popularity"},{path:"popularity",component:q},{path:"relations",component:(()=>{class e{constructor(e,t,r,n){this.searchService=e,this.route=t,this.router=r,this.spinner=n,this.response={nodes:[],rels:[]},this.query={artist:"",size:20},this.selectedArtist="",this.isLoading=!1,this.currentGraph=null}ngOnInit(){this.route.queryParams.subscribe(e=>{this.parseQueryParams(),this.query.artist&&(this.isLoading=!0,this.spinner.show(),this.searchService.getArtistRelations(this.query))}),this.relationsSub=this.searchService.relations.subscribe(e=>{this.response=e,this.clearGraph(),this.generateRelationGraph(),this.isLoading&&this.spinner.hide().then(()=>this.isLoading=!1)})}clearGraph(){if(this.currentGraph){const e=document.getElementById("graphContainer");e.removeChild(e.childNodes[0]),this.currentGraph=null}}generateRelationGraph(){this.clearGraph();const e=this.parseGraphData();this.currentGraph=anychart.graph(e),e.nodes.length>0&&(this.currentGraph.nodes().labels().enabled(!0),this.currentGraph.nodes().labels().format(function(){return"SONG"===this.getData("group")?this.getData("title").replace(/\w\S*/g,e=>e.replace(/^\w/,e=>e.toUpperCase())):this.getData("name").replace(/\w\S*/g,e=>e.replace(/^\w/,e=>e.toUpperCase()))}),this.currentGraph.nodes().labels().fontSize(12),this.currentGraph.nodes().labels().fontWeight(600),this.currentGraph.nodes().labels().fontFamily("ReadexPro"),e.nodes.length>1&&(this.currentGraph.group("SONG").labels().fontColor("#ffa000"),this.currentGraph.group("SONG").fill("rgba(193,55,42,0.7)"),this.currentGraph.group("SONG").shape("star10")),this.currentGraph.group("ARTIST").labels().fontColor("#ffffff"),this.currentGraph.group("ARTIST").fill("rgba(0,0,0,0.7)"),this.currentGraph.nodes().height(30),this.currentGraph.nodes().selected().height(40),this.currentGraph.nodes().selected().stroke("rgb(247, 116, 60)",2),this.currentGraph.nodes().stroke("white",2),this.currentGraph.nodes().hovered().stroke("rgb(247, 116, 60)",2),this.currentGraph.tooltip().useHtml(!0),this.currentGraph.tooltip().fontFamily("ReadexPro"),this.currentGraph.tooltip().format(function(){return"node"==this.type?"SONG"===this.getData("group")?`\n                    <p>\n                        <span style='font-weight:bold'>Title: </span>${this.getData("title").replace(/\w\S*/g,e=>e.replace(/^\w/,e=>e.toUpperCase()))}\n                    </p>\n                    <p>\n                        <span style='font-weight:bold'>Album: </span>${this.getData("album").replace(/\w\S*/g,e=>e.replace(/^\w/,e=>e.toUpperCase()))}\n                    </p>\n                    <p>\n                        <span style='font-weight:bold'>Genre: </span>${this.getData("genre").replace(/\w\S*/g,e=>e.replace(/^\w/,e=>e.toUpperCase()))}\n                    </p>`:`\n                    <p>\n                        <span style='font-weight:bold'>Name: </span>${this.getData("name").replace(/\w\S*/g,e=>e.replace(/^\w/,e=>e.toUpperCase()))}\n                    </p>\n                    <p>\n                        <span style='font-weight:bold'>Followers: </span>${this.getData("followers")}\n                    </p>\n                    `:`${this.getData("label")}`})),this.currentGraph.container("graphContainer"),this.currentGraph.background().fill("rgba(255, 255, 255, .1)"),this.currentGraph.background().corners(8,8,8,8),this.currentGraph.draw()}onChangeArtist(e){"Enter"===e.key&&this.onSearch()}onSearch(){this.query.artist=this.selectedArtist,this.updateRoute()}parseGraphData(){return{nodes:this.response.nodes.map(e=>e.labels.includes("Song")?Object.assign({id:e.id,group:"SONG"},e.properties):e.labels.includes("Artist")?Object.assign({id:e.id,group:"ARTIST"},e.properties):void 0),edges:this.response.rels.map(e=>({from:e.start.id,to:e.end.id,label:"CO_ARTIST"===e.label?"Co-Artist":"Main Artist"}))}}updateRoute(){this.router.navigate([],{relativeTo:this.route,queryParams:Object.assign({},this.query),replaceUrl:!1})}parseQueryParams(){const e=this.route.snapshot.queryParams;this.query=Object.assign(Object.assign({},this.query),e),e.size?(this.query.size=Number.parseInt(e.size),this.query.size=isNaN(this.query.size)?6:this.query.size):this.query.size=6,e.artist?this.selectedArtist=this.query.artist:delete this.query.artist}ngOnDestroy(){this.relationsSub&&this.relationsSub.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(i.Y36(a.o),i.Y36(s.gz),i.Y36(s.F0),i.Y36(l.t2))},e.\u0275cmp=i.Xpm({type:e,selectors:[["app-relations"]],decls:29,vars:14,consts:[[1,"container-fluid","px-0","d-flex"],[1,"row","align-items-start","flex-grow-1","d-flex","flex-column"],[1,"col-12","mt-4","flex-grow-0"],[1,"container-fluid","px-0"],[1,"row","flex-grow-1","justify-content-center"],[1,"col-6"],[1,"row","d-flex","justify-content-center"],[1,"col-8","d-flex","justify-content-center"],["for","Artist",1,"form-label","relation-artist","txt-primary"],[1,"col-8"],["type","text","id","Artist","placeholder","artist",1,"search-element","form-control","w-100","relation-artist-search",3,"ngModel","keypress","ngModelChange"],[1,"col-12","my-4","flex-grow-1","d-flex"],[1,"container-fluid","px-0","flex-grow-1","d-flex"],[1,"h-100","w-100","position-relative",3,"ngClass"],["bdColor","rgba(0,0,0,0)","size","medium","color","#fff","type","ball-rotate",3,"fullScreen"],[1,"row","align-content-between","justify-content-center","flex-grow-1",3,"ngClass"],[1,"col-12","mt-4","flex-grow-1"],[1,"search-result"],[1,"current-artist","fw-bold"],[1,"col-12","my-4","flex-grow-1"],["id","graphContainer",1,"container-fluid","px-0","h-100"],[1,"row","align-items-center","justify-content-center","flex-grow-1",3,"ngClass"],[1,"col-12"],[1,"text-center","no-results"]],template:function(e,t){1&e&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"div",2),i.TgZ(3,"div",3),i.TgZ(4,"div",4),i.TgZ(5,"div",5),i.TgZ(6,"div",6),i.TgZ(7,"div",7),i.TgZ(8,"label",8),i._uU(9,"Artist"),i.qZA(),i.qZA(),i.TgZ(10,"div",9),i.TgZ(11,"input",10),i.NdJ("keypress",function(e){return t.onChangeArtist(e)})("ngModelChange",function(e){return t.selectedArtist=e}),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(12,"div",11),i.TgZ(13,"div",12),i.TgZ(14,"div",13),i._UZ(15,"ngx-spinner",14),i.qZA(),i.TgZ(16,"div",15),i.TgZ(17,"div",16),i.TgZ(18,"p",17),i._uU(19,"Related songs and artists for "),i.TgZ(20,"span",18),i._uU(21),i.ALo(22,"titlecase"),i.qZA(),i.qZA(),i.qZA(),i.TgZ(23,"div",19),i._UZ(24,"div",20),i.qZA(),i.qZA(),i.TgZ(25,"div",21),i.TgZ(26,"div",22),i.TgZ(27,"p",23),i._uU(28,"No results were found..."),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA()),2&e&&(i.xp6(11),i.Q6J("ngModel",t.selectedArtist),i.xp6(3),i.Q6J("ngClass",i.VKq(8,v,!t.isLoading)),i.xp6(1),i.Q6J("fullScreen",!1),i.xp6(1),i.Q6J("ngClass",i.VKq(10,v,t.isLoading||!t.query.artist||0===t.response.nodes.length)),i.xp6(5),i.hij("'",i.lcZ(22,6,t.query.artist),"'"),i.xp6(4),i.Q6J("ngClass",i.VKq(12,v,t.isLoading||t.response.nodes.length>0||!t.query.artist)))},directives:[c.Fj,c.JJ,c.On,g.mk,l.Ro],pipes:[g.rS],styles:["[_nghost-%COMP%]{display:flex;flex:1}.relation-artist[_ngcontent-%COMP%]{font-size:2.3rem}.no-results[_ngcontent-%COMP%]{color:var(--primary);font-size:24px}.relation-artist-search[_ngcontent-%COMP%]{height:40px;font-size:1.5rem}.search-result[_ngcontent-%COMP%]{font-size:24px;color:#fff}#graphContainer[_ngcontent-%COMP%]{min-height:50vh}.current-artist[_ngcontent-%COMP%]{color:#f7743c}"]}),e})()}]}];let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[[s.Bz.forChild(x)],s.Bz]}),e})(),w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[[n.m,T]]}),e})()}}]);