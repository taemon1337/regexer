webpackJsonp([1],[,,,function(t,e,s){"use strict";s.d(e,"b",function(){return n}),s.d(e,"a",function(){return a});var n={all:"Message.all",add:"Message.add",remove:"Message.remove",clear:"Message.clearAll"},a={current:"Pattern.current",edit:"Pattern.edit",unedit:"Pattern.unedit",fetch:"Pattern.fetch",save:"Pattern.save",remove:"Pattern.delete",selected:"Pattern.selected",select:"Pattern.select"}},,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";var n=s(18),a=s(9),i=s(75),r=(s.n(i),s(76)),c=(s.n(r),s(77)),l=s(78);n.a.use(a.b);e.a=new a.b.Store({actions:i,getters:r,modules:{messages:c.a,patterns:l.a},strict:!1})},,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";var n=s(18),a=s(146),i=s(138),r=s.n(i);n.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"home",component:r.a}]})},function(t,e,s){var n=s(5)(s(79),s(145),null,null,null);t.exports=n.exports},,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";var n=s(89),a=s.n(n),i=s(50),r=s.n(i),c={fetch_static:function(t,e){r.a.get("./static/patterns.json").then(function(e){t(e)}).catch(function(t){e(t)})},fetch:function(){return new a.a(function(t,e){r.a.get("/api/patterns").then(function(s){s.data&&s.data.length>0?t(s):c.fetch_static(t,e)}).catch(function(){c.fetch_static(t,e)})})},save:function(t){return t.id?r.a.put("/api/patterns/"+t.id,t):r.a.post("/api/patterns",t)},remove:function(t){return r.a.delete("/api/patterns/"+t.id)}};e.a={patterns:c}},function(t,e,s){"use strict";var n=function t(e){if(!(this instanceof t))return new t(e);var s=this._internals={},n=this;s.reader=new FileReader,s.chunkSize=e&&e.chunkSize?e.chunkSize:1024,s.events={},s.canRead=!0,s.reader.onload=function(){if(s.chunk+=this.result,s.count+=1,/\r|\n/.test(s.chunk))s.lines=s.chunk.match(/[^\r\n]+/g),n._hasMoreData()&&(s.chunk="\n"===s.chunk[s.chunk.length-1]?"":s.lines.pop()),n._step();else{if(n._hasMoreData())return n.read();if(s.chunk.length)return n._emit("line",[s.chunk,n._emit.bind(n,"end"),100]);n._emit("end")}},s.reader.onerror=function(){n._emit("error",[this.error])}};n.prototype.on=function(t,e){this._internals.events[t]=e},n.prototype.read=function(t){var e=this._internals;void 0!==t&&(e.file=t,e.fileLength=t.size,e.readPos=0,e.chunk="",e.lines=[]);var s=e.file.slice(e.readPos,e.readPos+e.chunkSize);e.readPos+=e.chunkSize,e.reader.readAsText(s)},n.prototype.abort=function(){this._internals.canRead=!1},n.prototype._step=function(){var t=this._internals;if(0===t.lines.length)return this._hasMoreData()?this.read():this._emit("end");t.canRead?this._emit("line",[t.lines.shift(),this._step.bind(this),Math.floor(t.readPos/t.fileLength*100)]):this._emit("end")},n.prototype._hasMoreData=function(){var t=this._internals;return t.readPos<=t.fileLength},n.prototype._emit=function(t,e){var s=this._internals.events;"function"==typeof s[t]&&s[t].apply(this,e)},e.a=n},function(t,e,s){"use strict";function n(t){if(0===t)return"0 Byte";var e=parseInt(Math.floor(Math.log(t)/Math.log(1024)));return Math.round(t/Math.pow(1024,e),2)+" "+a[e]}e.a=n;var a=["Bytes","KB","MB","GB","TB"]},function(t,e,s){"use strict";function n(t,e){for(var s in e)e.hasOwnProperty(s)&&t.elements[s]&&(t.elements[s].value=e[s])}e.a=n},function(t,e,s){"use strict";function n(t,e){try{if(!t)return[];var s=new RegExp(t,"g"),n=[];return e.split("\n").forEach(function(t,e){for(var a=s.exec(t);a;)n.push({parsed:a[1],line:a[0],line_number:e}),a=s.exec(t)}),n}catch(t){return console.warn(t),[]}}e.a=n},function(t,e,s){"use strict";function n(t){if(!t||"FORM"!==t.nodeName)return null;var e=null,s=null,n={};for(e=t.elements.length-1;e>=0;e-=1){var r=t.elements[e];if(""!==r.name)if(a.indexOf(r.nodeName)>=0)i.indexOf(r.type)>=0?r.checked&&(n[r.name]=r.value):n[r.name]=r.value;else if("SELECT"===r.nodeName)if("select-multiple"===r.type){var c=[];for(s=r.options.length-1;s<=0;s-=1)r.options[s].selected&&c.push(r.options[s].value);n[r.name]=c}else n[r.name]=r.value}return n}e.a=n;var a=["INPUT","TEXTAREA"],i=["checkbox","radio"]},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(18),a=s(49),i=s.n(a),r=s(48),c=s(28);n.a.config.productionTip=!1,new n.a({el:"#app",router:r.a,store:c.a,template:"<App/>",components:{App:i.a}})},function(t,e){},function(t,e){},function(t,e,s){"use strict";var n,a,i=s(34),r=s.n(i),c=s(3),l={all:[]},o=r()({},c.b.all,function(t){return t.all}),u=(n={},r()(n,c.b.add,function(t,e){(0,t.commit)(c.b.add,e)}),r()(n,c.b.remove,function(t,e){(0,t.commit)(c.b.remove,e)}),r()(n,c.b.clear,function(t){(0,t.commit)(c.b.clear)}),n),d=(a={},r()(a,c.b.add,function(t,e){e.title?t.all.push(e):console.error("Invalid Message, title is required",e)}),r()(a,c.b.remove,function(t,e){t.all.splice(e,1)}),r()(a,c.b.clear,function(t,e){t.all=[]}),a);e.a={state:l,getters:o,actions:u,mutations:d}},function(t,e,s){"use strict";var n,a,i,r=s(34),c=s.n(r),l=s(3),o=s(68),u=s(28),d={editing:null,current:null,all:[],selected:[]},f=(n={},c()(n,l.a.fetch,function(t){return t.all}),c()(n,l.a.selected,function(t){return t.selected}),c()(n,l.a.edit,function(t){return t.editing}),c()(n,l.a.current,function(t){return t.current}),n),v=(a={},c()(a,l.a.fetch,function(t,e){var s=t.commit;o.a.patterns.fetch().then(function(t){s(l.a.fetch,t.data)}).catch(function(t){u.a.dispatch(l.b.add,{title:"Error fetching patterns!",klass:"notification is-danger",content:t.toString()})})}),c()(a,l.a.edit,function(t,e){(0,t.commit)(l.a.edit,e)}),c()(a,l.a.unedit,function(t,e){(0,t.commit)(l.a.unedit,e)}),c()(a,l.a.save,function(t,e){var s=t.commit;o.a.patterns.save(e).then(function(t){s(l.a.save,t.data),u.a.dispatch(l.a.unedit)}).catch(function(t){var e=t.toString();t.response&&t.response&&t.response.data&&t.response.data.error&&t.response.data.error.message&&(e=t.response.data.error.message),u.a.dispatch(l.b.add,{title:"Error saving pattern!",klass:"notification is-danger",content:e})})}),c()(a,l.a.remove,function(t,e){var s=t.commit;o.a.patterns.remove(e).then(function(t){s(l.a.remove,e)}).catch(function(t){u.a.dispatch(l.b.add,{title:"Error removing pattern!",klass:"notification is-danger",content:t.toString()})})}),c()(a,l.a.select,function(t,e){(0,t.commit)(l.a.select,e)}),a),p=(i={},c()(i,l.a.fetch,function(t,e){t.all=e}),c()(i,l.a.edit,function(t,e){t.editing=!0,t.current=e}),c()(i,l.a.unedit,function(t){t.editing=null,t.current=null}),c()(i,l.a.save,function(t,e){var s=-1;t.all.forEach(function(t,n){t.id===e.id&&(s=n)}),s>=0?t.all.splice(s,1,e):t.all.push(e),s=-1,t.selected.forEach(function(t,n){t.id===e.id&&(s=n)}),s>=0&&t.selected.splice(s,1,e)}),c()(i,l.a.remove,function(t,e){t.all=t.all.filter(function(t){return t.id!==e.id}),t.selected=t.selected.filter(function(t){return t.id!==e.id})}),c()(i,l.a.select,function(t,e){var s=-1;t.selected.forEach(function(t,n){t.id===e.id&&(s=n)}),-1!==s?t.selected.splice(s,1):t.selected.push(e)}),i);e.a={state:d,getters:f,actions:v,mutations:p}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(10),a=s.n(n),i=s(129),r=(s.n(i),s(128)),c=(s.n(r),s(133)),l=s.n(c),o=s(137),u=s.n(o),d=s(3),f=s(9);e.default={name:"app",computed:a()({},s.i(f.a)({editing:d.a.edit})),components:{ErrorMessages:l.a,PatternFormModal:u.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(10),a=s.n(n),i=s(3),r=s(9);e.default={name:"ErrorMessage",data:function(){return{}},computed:a()({},s.i(r.a)({messages:i.b.all})),methods:{remove:function(t){this.$store.dispatch(i.b.remove,t)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(86),a=s.n(n),i=s(10),r=s.n(i),c=s(3),l=s(9),o=s(69),u=s(70),d=s(130),f=s.n(d);e.default={name:"FileScan",props:{file:{type:File,required:!0}},data:function(){return{running:!1,count:null,showing:!1,results:{},error:null}},computed:r()({},s.i(l.a)({patterns:c.a.selected})),methods:{saveToDisk:function(){var t=this.file.name+".out.json",e={patterns:this.patterns,results:this.results},s=new Blob([a()(e,null,2)],{type:"application/json"});f.a.saveAs(s,t)},formatBytes:function(t){return s.i(u.a)(t)},setPercent:function(t,e){t&&(this.$refs.progress.value=t,this.$refs.progress.text=t+"%"),e&&(this.$refs.progress.className="progress "+e)},start:function(){var t=this;t.running=!0;var e=this.file,n=s.i(o.a)({chunkSize:10240}),a={};t.patterns.forEach(function(e){t.results[e.name]=[],a[e.name]=new RegExp(e.regex_string,"gmi")}),n.on("line",function(e,s,n){t.setPercent(n,"is-warning");for(var i in a)if(a.hasOwnProperty(i)){var r=e.match(a[i]);if(r){var c=r.length>1?r[1]:r[0];-1===t.results[i].indexOf(c)&&(t.count+=1,t.results[i].push(c))}}t.running&&s()}),n.on("error",function(e){t.setPercent(null,"is-danger"),t.error=e.toString(),t.running=!1}),n.on("end",function(){t.setPercent(100,"is-success"),t.running=!1}),n.read(e)},stop:function(){this.running=!1}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(10),a=s.n(n),i=s(9),r=s(3);e.default={name:"ListPatterns",data:function(){return{current_id:null}},computed:a()({},s.i(i.a)({patterns:r.a.fetch,selected:r.a.selected})),methods:{toggle:function(t){this.$store.dispatch(r.a.select,t)},toggleId:function(t){this.current_id=this.current_id===t?null:t},isSelected:function(t){return-1!==this.selected.indexOf(t)},edit:function(t){this.$store.dispatch(r.a.edit,t)}},created:function(){this.$store.dispatch(r.a.fetch)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(134),a=s.n(n);e.default={name:"NewScanForm",data:function(){return{selected:[]}},methods:{openDialog:function(){this.$refs.fileInput.click()},fileSelected:function(t){this.selected=t.target.files}},components:{FileScan:a.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(10),a=s.n(n),i=s(73),r=s(71),c=s(72),l=s(3),o=s(9);e.default={name:"PatternFormModal",data:function(){return{cantest:!1,passedtest:!1,result:null,reason:null}},computed:a()({},s.i(o.a)({editing:l.a.edit,current:l.a.current})),methods:{test:function(){var t=s.i(i.a)(this.$refs.form);this.dotest(t)},resettest:function(){this.result=null,this.reason=null},docantest:function(){var t=s.i(i.a)(this.$refs.form);t.name&&t.regex_string&&(this.cantest=!0)},dotest:function(t){var e=s.i(c.a)(t.regex_string,t.testdata),n=e.map(function(t){return t.parsed}).join("\n"),a=t.regex_string&&n===t.testresult,i=a?" equals ":" does not equal ";this.result=e,this.reason="Parsed example data "+i+" the expected parsed result.",this.passedtest=a},save:function(t){var e=s.i(i.a)(this.$refs.form);this.dotest(e),this.passedtest&&this.$store.dispatch(l.a.save,e)},remove:function(){if(this.current&&this.current.id){confirm("Are you sure you want to delete this pattern? "+this.current.name)&&(this.$store.dispatch(l.a.remove,this.current),this.close())}},close:function(){this.$store.dispatch(l.a.unedit)}},mounted:function(){this.current&&this.$refs.form&&(this.cantest=!0,s.i(r.a)(this.$refs.form,this.current))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(136),a=s.n(n),i=s(135),r=s.n(i),c=s(3);e.default={name:"HomePage",data:function(){return{}},methods:{createPattern:function(){this.$store.dispatch(c.a.edit)}},components:{NewScanForm:a.a,ListPatterns:r.a}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},,,,function(t,e,s){var n=s(5)(s(80),s(141),null,null,null);t.exports=n.exports},function(t,e,s){var n=s(5)(s(81),s(143),null,null,null);t.exports=n.exports},function(t,e,s){var n=s(5)(s(82),s(140),null,null,null);t.exports=n.exports},function(t,e,s){var n=s(5)(s(83),s(144),null,null,null);t.exports=n.exports},function(t,e,s){var n=s(5)(s(84),s(142),null,null,null);t.exports=n.exports},function(t,e,s){var n=s(5)(s(85),s(139),null,null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("section",{staticClass:"hero is-info"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container has-text-centered"},[s("div",{staticClass:"columns"},[t._m(0),t._v(" "),s("div",{staticClass:"column"},[s("button",{staticClass:"button is-large is-primary",on:{click:t.createPattern}},[t._v("\n              Create your own Pattern\n            ")])])])])])]),t._v(" "),s("section",{staticClass:"columns"},[s("div",{staticClass:"column is-half"},[s("h1",{staticClass:"title"},[t._v("Scan files to selected patterns")]),t._v(" "),s("new-scan-form")],1),t._v(" "),s("div",{staticClass:"column is-half"},[s("h1",{staticClass:"title"},[t._v("Available Patterns")]),t._v(" "),s("list-patterns")],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"column"},[s("h1",{staticClass:"title"},[t._v("\n              Pattern Matcher\n            ")]),t._v(" "),s("h2",{staticClass:"subtitle"},[t._v("\n              Scan files for matching text patterns!\n            ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("div",{staticStyle:{"margin-bottom":"15px"}},[s("strong",[t._v("\n      Patterns\n      "),t.selected.length?s("span",[t._v("("+t._s(t.selected.length)+" selected)")]):t._e()])]),t._v(" "),t._l(t.patterns,function(e,n){return s("article",{key:"index"},[s("div",{staticClass:"media"},[s("figure",{staticClass:"media-left"},[s("span",{staticClass:"icon is-medium has-text-success",on:{click:function(s){t.toggle(e)}}},[s("i",{class:t.isSelected(e)?"fa fa-check-square-o":"fa fa-square-o"})])]),t._v(" "),s("div",{staticClass:"media-content"},[s("div",{staticClass:"content"},[s("p",[s("strong",{on:{click:function(s){t.toggleId(e.id)}}},[t._v(t._s(e.name))])]),t._v(" "),t.current_id===e.id?s("p",[t._v("\n            "+t._s(e.description)+"\n          ")]):t._e()])]),t._v(" "),s("div",{staticClass:"media-right"},[s("span",{staticClass:"icon",on:{click:function(s){t.toggleId(e.id)}}},[s("i",{class:t.current_id===e.id?"fa fa-angle-up":"fa fa-angle-down"})])])]),t._v(" "),t.current_id===e.id?s("div",[s("div",{staticClass:"media"},[s("div",{staticClass:"media-content",staticStyle:{overflow:"auto"}},[s("dl",[t._m(0,!0),t._v(" "),s("dt",[s("pre",[t._v(t._s(e.regex_string))])]),t._v(" "),t._m(1,!0),t._v(" "),s("dt",[s("pre",[t._v(t._s(e.testresult))])])])]),t._v(" "),s("div",{staticClass:"media-right"},[s("span",{staticClass:"icon",attrs:{title:"Edit Pattern"},on:{click:function(s){t.edit(e)}}},[s("i",{staticClass:"fa fa-pencil"})])])]),t._v(" "),s("hr")]):t._e()])})],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("dd",[s("strong",[t._v("Pattern:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("dd",[s("strong",[t._v("Examples:")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container has-text-centered",staticStyle:{position:"absolute",top:"50px","z-index":"999"}},t._l(t.messages,function(e,n){return s("div",{key:n,class:e.klass||"notification"},[s("button",{staticClass:"delete",on:{click:function(e){t.remove(n)}}}),t._v("\n    "+t._s(e.title)+"\n    "),e.content?s("small",[t._v(t._s(e.content))]):t._e()])}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"modal",staticClass:"modal is-active"},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v("Create your own pattern")]),t._v(" "),s("button",{staticClass:"delete",on:{click:t.close}})]),t._v(" "),s("section",{staticClass:"modal-card-body"},[s("form",{ref:"form",attrs:{action:"/api/patterns",method:"post"},on:{submit:function(e){e.preventDefault(),e.stopPropagation(),t.save(e)}}},[t.current&&t.current.id?s("input",{attrs:{type:"hidden",name:"id"}}):t._e(),t._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Name")]),t._v(" "),s("div",{staticClass:"control"},[s("input",{staticClass:"input",attrs:{name:"name",type:"text",placeholder:"unique name...",required:""},on:{change:t.docantest}})])]),t._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Regular Expression")]),t._v(" "),s("div",{staticClass:"control"},[s("input",{staticClass:"input",attrs:{name:"regex_string",type:"text",placeholder:"extracting regex for a single line...([a-z]+)",required:""},on:{change:t.docantest}})])]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t.result?s("div",{staticClass:"columns is-multiline"},[s("div",{staticClass:"column is-12"},[t.passedtest?s("div",{staticClass:"notification is-success"},[s("button",{staticClass:"delete",on:{click:t.resettest}}),t._v(" "),t._m(2),t._v(" "),s("p",{staticClass:"title"},[t._v("Passed!")]),t._v(" "),s("small",[t._v(t._s(t.reason))])]):s("div",{staticClass:"notification is-danger"},[s("button",{staticClass:"delete",on:{click:t.resettest}}),t._v(" "),t._m(3),t._v(" "),s("p",{staticClass:"title"},[t._v("Failed!")]),t._v(" "),s("small",[t._v(t._s(t.reason))])])]),t._v(" "),s("div",{staticClass:"column is-half"},[s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Parsed Test Result")]),t._v(" "),s("div",{staticClass:"control"},[s("pre",[t._v(t._s(t.result))])])])]),t._v(" "),s("div",{staticClass:"column is-half"},[s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Extracted Test Result")]),t._v(" "),s("div",{staticClass:"control"},[s("pre",[t._v(t._s(t.result.map(function(t){return t.parsed}).join("\n")))])])])])]):t._e()])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-primary",attrs:{disabled:!t.passedtest,type:"button"},on:{click:function(e){e.preventDefault(),t.save(e)}}},[t._v("Save")]),t._v(" "),s("button",{staticClass:"button is-primary",attrs:{disabled:!t.cantest,type:"button"},on:{click:t.test}},[t._v("Test")]),t._v(" "),s("button",{staticClass:"button",on:{click:t.close}},[t._v("Cancel")]),t._v(" "),s("div",{staticClass:"is-pulled-right",staticStyle:{float:"right"}},[t.current&&t.current.id?s("button",{staticClass:"button",attrs:{title:"Delete"},on:{click:t.remove}},[t._m(4)]):t._e()])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Description")]),t._v(" "),s("div",{staticClass:"control"},[s("textarea",{staticClass:"textarea",attrs:{rows:"3",name:"description",placeholder:"description..."}})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Example Input Text")]),t._v(" "),s("div",{staticClass:"control"},[s("textarea",{staticClass:"textarea",attrs:{rows:"4",name:"testdata",placeholder:"lines of example data..."}})])])]),t._v(" "),s("div",{staticClass:"column"},[s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Expected Parsed Result")]),t._v(" "),s("div",{staticClass:"control"},[s("textarea",{staticClass:"textarea",attrs:{rows:"4",name:"testresult",placeholder:"what the regex should produce from evaluating each line..."}})])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon is-medium"},[s("i",{staticClass:"fa fa-check"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon is-medium has-text-danger"},[s("i",{staticClass:"fa fa-remove"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon has-text-danger"},[s("i",{staticClass:"fa fa-trash"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"media"},[s("div",{staticClass:"media-left",staticStyle:{width:"50px"}},[t.count?s("span",{staticClass:"tag is-success"},[t._v(t._s(t.count))]):t._e(),t._v(" "),t.running?s("span",{staticClass:"icon"},[s("i",{staticClass:"fa fa-spin fa-spinner"})]):t._e()]),t._v(" "),s("div",{staticClass:"media-content"},[t.error?s("div",{staticClass:"notification is-danger"},[t._v(t._s(t.error))]):t._e(),t._v(" "),s("strong",[t._v(t._s(t.file.name))]),t._v(" "),s("small",[t._v("("+t._s(t.formatBytes(t.file.size))+")")]),t._v(" "),s("small",[t._v("("+t._s(t.file.type)+")")])]),t._v(" "),s("div",{staticClass:"media-right"},[t.running?t._e():s("button",{staticClass:"button is-primary",attrs:{type:"button"},on:{click:t.start}},[t._v("Scan")]),t._v(" "),t.running?s("button",{staticClass:"button is-primary",attrs:{type:"button"},on:{click:t.stop}},[t._v("Stop")]):t._e(),t._v(" "),t.count>0?s("button",{staticClass:"button is-primary",attrs:{title:"Download Output"},on:{click:t.saveToDisk}},[t._v("\n        Download\n      ")]):t._e(),t._v(" "),s("span",{staticClass:"icon",on:{click:function(e){t.showing=!t.showing}}},[s("i",{class:t.showing?"fa fa-angle-up":"fa fa-angle-down"})])])]),t._v(" "),s("div",{staticStyle:{"margin-top":"5px"}},[s("progress",{ref:"progress",staticClass:"progress",attrs:{value:"0",max:"100"}},[t._v("0%")])]),t._v(" "),t.showing?s("div",{staticStyle:{"margin-top":"5px"}},t._l(t.results,function(e,n){return s("section",{key:"index"},[s("label",{staticClass:"label"},[t._v("\n        "+t._s(n)+"\n        "),s("span",{staticClass:"tag is-success"},[t._v(t._s(e.length))])]),t._v(" "),s("textarea",{staticClass:"textarea"},[t._v(t._s(e.join("\n")))])])})):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",{on:{submit:function(e){e.preventDefault(),e.stopPropagation(),t.submit(e)}}},[s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[t._v("Select File(s)")]),t._v(" "),s("input",{ref:"fileInput",staticClass:"is-hidden",attrs:{type:"file",multiple:""},on:{change:t.fileSelected}}),t._v(" "),s("div",{staticClass:"control"},[s("input",{staticClass:"input",attrs:{type:"text",placeholder:"Select files..."},on:{click:t.openDialog}})])])]),t._v(" "),s("br"),t._v(" "),t._l(t.selected,function(t,e){return s("div",{key:"index",staticClass:"box"},[s("file-scan",{attrs:{file:t}})],1)})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"container"},[t.editing?s("pattern-form-modal"):t._e(),t._v(" "),s("error-messages"),t._v(" "),s("router-view")],1)])},staticRenderFns:[]}}],[74]);
//# sourceMappingURL=app.aa1e10d8c123a7178c7b.js.map