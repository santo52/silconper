!function(e,a){if("object"==typeof exports&&"object"==typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var t=a();for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(self,(()=>(()=>{"use strict";var e={d:(a,t)=>{for(var o in t)e.o(t,o)&&!e.o(a,o)&&Object.defineProperty(a,o,{enumerable:!0,get:t[o]})},o:(e,a)=>Object.prototype.hasOwnProperty.call(e,a),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},a={};return(()=>{e.r(a),e.d(a,{Dashboard:()=>t});class t{async load(){this.loadGeneralPDV(),this.loadSalesAggreators(),this.loadMonthSalesAggreators(),this.loadCard("/dashboard/sales",{time:"day"},"salesOfDay").then((e=>{$("#salesOfDay .card-value").text(e.total||0)})),this.loadCard("/dashboard/sales",{time:"month"},"salesOfMonth").then((e=>{$("#salesOfMonth .card-value").text(e.total||0)})),this.loadCard("/dashboard/sales",{time:"year"},"salesOfYear").then((e=>{$("#salesOfYear .card-value").text(e.total||0)})),this.loadCard("/dashboard/orders",{time:"day"},"ordersOfDay").then((e=>{$("#ordersOfDay .card-value").text(e.total||0)}))}loadCard(e,a,t){const o=a;return new Promise(((a,r)=>{$.ajax({url:e,type:"POST",data:o,dataType:"json",beforeSend:()=>$(`#${t}`).addClass("loading"),success:e=>{$(`#${t}`).removeClass("loading"),a(e)},error:e=>{$(`#${t}`).removeClass("loading"),r()}})}))}async loadMonthSalesAggreators(){const e={chart:{type:"spline"},title:{text:"Venta General Agregadores Mes"},xAxis:{categories:getMonths()},yAxis:{title:{text:""},labels:{formatter:function(){return this.value+"$"}}},tooltip:{crosshairs:!0,shared:!0},plotOptions:{spline:{responsive:!0,maintainAspectRatio:!0,marker:{radius:4,lineColor:"#666666",lineWidth:1}}},series:[]};Highcharts.chart("salesMonthAggregators",e),this.loadCard("/dashboard/sales-aggregators",{time:"month"},"salesMonthAggregators").then((a=>{const t=a.result.map((e=>{const a=Object.values(e).slice(2);return{name:e.nombreAgregador,data:a}}));Highcharts.chart("salesMonthAggregators",{...e,series:t})}))}async loadSalesAggreators(){const e={colors:Highcharts.map(Highcharts.getOptions().colors,(function(e){return{radialGradient:{cx:.5,cy:.3,r:.7},stops:[[0,e],[1,Highcharts.Color(e).brighten(-.3).get("rgb")]]}})),chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:"Venta Por Agregadores Día"},tooltip:{pointFormat:"{series.name}: <b>{point.y:.f}</b>"},plotOptions:{pie:{responsive:!0,maintainAspectRatio:!0,allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.0f} %",connectorColor:"silver"}}}};Highcharts.chart("salesAggregators",{...e,series:[{name:"TotalVenta",data:[]}]}),this.loadCard("/dashboard/sales-aggregators",{time:"day"},"salesAggregators").then((a=>{const t=a.result.map((e=>{const a=String(e.Total).replace(".00","");return{name:e.Agregador,y:a}}));Highcharts.chart("salesAggregators",{...e,series:[{name:"TotalVenta",data:t}]})}))}async loadGeneralPDV(){const e={chart:{type:"column"},title:{text:"Venta General PDV Mes"},xAxis:{categories:getMonths(),crosshair:!0},yAxis:{min:0,title:{text:"Total ($)"}},tooltip:{headerFormat:'<span style="font-size:10px">{point.key}</span><table>',pointFormat:'<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.0f} </b></td></tr>',footerFormat:"</table>",shared:!0,useHTML:!0},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]},plotOptions:{column:{responsive:!0,maintainAspectRatio:!0,pointPadding:0,borderWidth:0,borderRadius:4}}};Highcharts.chart("generalSalesPDV",{...e,series:[{name:"VentaEfectiva",data:[]},{name:"VentaCancelada",data:[]},{name:"VentaTotal",data:[]}]}),this.loadCard("/dashboard/general-sales-pdv",{},"generalSalesPDV").then((a=>{const t=a.reduce(((e,a)=>({ventaEfectiva:[...e.ventaEfectiva,a.ventaEfectiva],ventaCancelada:[...e.ventaCancelada,a.ventaCancelada],totalVenta:[...e.totalVenta,a.totalVenta]})),{ventaEfectiva:[],ventaCancelada:[],totalVenta:[]});Highcharts.chart("generalSalesPDV",{...e,series:[{name:"VentaEfectiva",data:t.ventaEfectiva},{name:"VentaCancelada",data:t.ventaCancelada},{name:"VentaTotal",data:t.totalVenta}]})}))}}})(),a})()));