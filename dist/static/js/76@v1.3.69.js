webpackJsonp([76],{"/JEK":function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"stockgroup.vue",sourceRoot:""}])},"1dIu":function(e,t,a){var o=a("/JEK");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a("rjj0")("21298244",o,!0,{})},ADVX:function(e,t,a){"use strict";function o(e){a("1dIu")}Object.defineProperty(t,"__esModule",{value:!0});var n=a("JieS"),s=a("HzJ7"),r=a("VU/8"),i=o,l=r(n.a,s.a,!1,i,"data-v-4782be08",null);t.default=l.exports},HzJ7:function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.g_loading,expression:"g_loading"}],staticStyle:{width:"calc(100% - 2px)",height:"calc(100vh - 50px)"}},[a("SeeksRelationGraph",{ref:"seeksRelationGraph",attrs:{options:e.graphOptions}})],1),e._v(" "),a("el-button",{staticClass:"c-show-code-button",attrs:{type:"success"}},[a("el-link",{staticStyle:{color:"#ffffff"},attrs:{href:"https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4SceneGroup.vue",target:"_blank"}},[e._v("查看代码")])],1)],1)},n=[],s={render:o,staticRenderFns:n};t.a=s},JieS:function(e,t,a){"use strict";var o=a("Xxa5"),n=a.n(o),s=a("exGp"),r=a.n(s);t.a={name:"SeeksRelationGraphDemo",data:function(){return{g_loading:!0,graphOptions:{layouts:[{label:"中心",layoutName:"center",layoutClassName:"seeks-layout-center",allowSwitchLineShape:!0,allowSwitchJunctionPoint:!0,useLayoutStyleOptions:!0}],defaultExpandHolderPosition:"bottom",defaultLineShape:2,defaultNodeShape:0,defaultNodeWidth:"120",defaultNodeHeight:"120",defaultNodeBorderWidth:1}}},created:function(){},mounted:function(){this.setGraphData()},methods:{setGraphData:function(){var e=this;return r()(n.a.mark(function t(){var a,o,s;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={rootId:"18",nodes:[],links:[]},t.next=3,Betools.query.queryTableDataByWhereSQL("bs_company_flow_base","_where=(level,lt,100)~and(level,gt,0)&_fields=id,name&_sort=-id");case 3:return o=t.sent,t.next=6,Betools.query.queryTableDataByWhereSQL("bs_company_flow_link","_where=(status,in,0)&_fields=id,from,to&_sort=-id");case 6:s=t.sent,a.nodes=o,a.links=s,a.nodes.forEach(function(e){}),e.$refs.seeksRelationGraph.setJsonData(a,function(e){});case 11:case"end":return t.stop()}},t,e)}))()}}}}});