webpackJsonp([75],{"06b7":function(e,t,n){"use strict";var o=n("Xxa5"),a=n.n(o),r=n("exGp"),i=n.n(r);t.a={name:"Demo",data:function(){return{currentCase:"双向树",isShowCodePanel:!1,graphOptions:{backgrounImageNoRepeat:!0,layouts:[{label:"中心",layoutName:"tree",layoutClassName:"seeks-layout-center",defaultJunctionPoint:"border",defaultNodeShape:0,defaultLineShape:1,allowSwitchLineShape:!0,allowSwitchJunctionPoint:!0,useLayoutStyleOptions:!0,from:"left",max_per_width:"500",min_per_height:"100"}],defaultLineMarker:{markerWidth:12,markerHeight:12,refX:6,refY:6,data:"M2,2 L10,6 L2,10 L6,6 L2,2"},defaultNodeShape:1,defaultNodeWidth:"100",defaultLineShape:2,defaultJunctionPoint:"lr",defaultNodeBorderWidth:0,defaultLineColor:"rgba(0, 186, 189, 1)",defaultNodeColor:"rgba(0, 206, 209, 1)"}}},mounted:function(){this.showSeeksGraph()},methods:{showSeeksGraph:function(e){var t=this;return i()(a.a.mark(function e(){var n,o,r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={rootId:"18",nodes:[],links:[]},e.next=3,Betools.query.queryTableDataByWhereSQL("bs_company_flow_base","_where=(level,lt,100)~and(level,gt,0)&_fields=id,name&_sort=-id");case 3:return o=e.sent,e.next=6,Betools.query.queryTableDataByWhereSQL("bs_company_flow_link","_where=(status,in,0)&_fields=id,from,to&_sort=-id");case 6:r=e.sent,n.nodes=o,n.links=r,n.nodes.forEach(function(e){}),t.$refs.seeksRelationGraph.setJsonData(n,function(e){});case 11:case"end":return e.stop()}},e,t)}))()},onNodeClick:function(e,t){console.log("onNodeClick:",e)},onLineClick:function(e,t){console.log("onLineClick:",e)}}}},LNqh:function(e,t,n){"use strict";function o(e){n("eDhi")}Object.defineProperty(t,"__esModule",{value:!0});var a=n("06b7"),r=n("apK+"),i=n("VU/8"),s=o,l=i(a.a,r.a,!1,s,"data-v-d9995f94",null);t.default=l.exports},"apK+":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticStyle:{height:"calc(100vh - 0px)"}},[n("SeeksRelationGraph",{ref:"seeksRelationGraph",attrs:{options:e.graphOptions,"on-node-click":e.onNodeClick,"on-line-click":e.onLineClick}})],1)])},a=[],r={render:o,staticRenderFns:a};t.a=r},eDhi:function(e,t,n){var o=n("uMRT");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("2ff87449",o,!0,{})},uMRT:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"stockbtree.vue",sourceRoot:""}])}});