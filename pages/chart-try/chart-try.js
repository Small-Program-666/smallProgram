//index.js
//获取应用实例
const app = getApp()
var util=require('../../utils/util')

import * as echarts from '../../ec-canvas/echarts';
function initChart1(canvas, width, height) {//收入的扇形图
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);
  var bills = wx.getStorageSync('bills') || [];
  var gongzi=0; var jianzhi=0; var licai=0; var lijin=0; var jiangjin=0; var buzhu=0; var fenhong=0; var qita=0;
  for (var i = 0; i < bills.length; i++) {
    var bill = bills[i]
    var dailyb = bill.dailyb
    var day=util.formatDate(new Date());
    if(bill.date.substring(0,4)===day.substring(0,4) && bill.date.substring(5,7)===day.substring(5,7)){
      for (var j = 0; j < bill.dailybnum; ++j){
        if(bill.dailyb[j].type==='工资'){
          gongzi=gongzi+bill.dailyb[j].amount*1
          console.log(gongzi)
        }
        if(bill.dailyb[j].type==='理财'){
          licai=licai+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='兼职'){
          jianzhi=jianzhi+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='礼金'){
          lijin=lijin+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='奖金'){
          jiangjin=jiangjin+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='补助'){
          buzhu=buzhu+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='分红'){
          fenhong=fenhong+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='其它'){
          qita=qita+bill.dailyb[j].amount*1
        }
      }
    }else{break;}
  }
  var option1 = {
    series: [
      {
        label:{
          normal:{
            fontSize:15,
          }
        },
        name: '收入',
        type: 'pie',
        radius: ['40%', '55%'],
        animationType: 'scale',
        silent: true,
        labelLine: {
          normal: {
            show: true,
          }
        },
        data: [
          {name:'工资',value:gongzi},
          {name:'兼职',value:jianzhi},
          {name:'理财',value:licai},
          {name:'礼金',value:lijin},
          {name:'奖金',value:jiangjin},
          {name:'补助',value:buzhu},
          {name:'分红',value:fenhong},
          {name:'其他',value:qita},
        ],
        color: ["#3878A4", "#81AAAE","#EBCFC4","#FDB8A8","#E3929B","#7D7294","#3878A4", "#81AAAE"]
      }
    ]
  }
  chart.setOption(option1);
  return chart;
}

function initChart2(canvas, width, height) {//支出的扇形图
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);
  var bills = wx.getStorageSync('bills') || [];
  var shiwu=0; var gouwu=0; var chuxing=0; var xuexi=0; var yule=0; var jiating=0; var shenghuo=0; var qita=0;
  for (var i = 0; i < bills.length; i++) {
    var bill = bills[i]
    var dailyb = bill.dailyb
    var day=util.formatDate(new Date());
    if(bill.date.substring(0,4)===day.substring(0,4) && bill.date.substring(5,7)===day.substring(5,7)){
      for (var j = 0; j < bill.dailybnum; ++j){
        if(bill.dailyb[j].type==='餐饮' || bill.dailyb[j].type==='水果' || bill.dailyb[j].type==='零食' || bill.dailyb[j].type==='烟酒'){
          shiwu=shiwu+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='购物' || bill.dailyb[j].type==='服饰' || bill.dailyb[j].type==='美容' || bill.dailyb[j].type==='服饰'  || bill.dailyb[j].type==='数码'){
          gouwu=gouwu+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='交通' ||bill.dailyb[j].type==='旅行' ||bill.dailyb[j].type==='住房' ){
          chuxing=chuxing+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='运动' ||bill.dailyb[j].type==='学习' ||bill.dailyb[j].type==='书籍'){
          xuexi=xuexi+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='娱乐' || bill.dailyb[j].type==='通讯' ||bill.dailyb[j].type==='社交' ||bill.dailyb[j].type==='礼金' ||bill.dailyb[j].type==='礼物' ||bill.dailyb[j].type==='彩票'){
          yule=yule+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='孩子' ||bill.dailyb[j].type==='长辈' ||bill.dailyb[j].type==='宠物'){
          jiating=jiating+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='办公'|| bill.dailyb[j].type==='日用' || bill.dailyb[j].type==='医疗'){
          shenghuo =shenghuo+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='维修'|| bill.dailyb[j].type==='捐赠'){
          qita=qita+bill.dailyb[j].amount*1
        }
      }
    }else{break;}
  }
  var option1 = {
    series: [
      {
        label:{
          normal:{
            fontSize:15,
          }
        },
        name: '支出',
        type: 'pie',
        radius: ['40%', '55%'],
        animationType: 'scale',
        silent: true,
        labelLine: {
          normal: {
            show: true
          }
        },
        data: [
          {name:'食物',value:shiwu},
          {name:'购物',value:gouwu},
          {name:'学习',value:xuexi},
          {name:'娱乐',value:yule},
          {name:'家庭',value:jiating},
          {name:'生活',value:shenghuo},
          {name:'出行',value:chuxing},
          {name:'其它',value:qita},

        ],
        color: ["#8B8378", "#7B6A5A","#42382F","#5F5F5F","#939DA7","#9C9C9C","#C5C7B1","#9FAD96"]
      }
    ]
  }
  chart.setOption(option1);
  return chart;
}

function initChart3(canvas, width, height) {//收入的柱状图
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);
  var bills = wx.getStorageSync('bills') || [];
  var gongzi=0; var jianzhi=0; var licai=0; var lijin=0; var jiangjin=0; var buzhu=0; var fenhong=0; var qita=0;
  for (var i = 0; i < bills.length; i++) {
    var bill = bills[i]
    var dailyb = bill.dailyb
    var day=util.formatDate(new Date());
    if(bill.date.substring(0,4)===day.substring(0,4) && bill.date.substring(5,7)===day.substring(5,7)){
      for (var j = 0; j < bill.dailybnum; ++j){
        if(bill.dailyb[j].type==='工资'){
          gongzi=gongzi+bill.dailyb[j].amount*1
          console.log(gongzi)
        }
        if(bill.dailyb[j].type==='理财'){
          licai=licai+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='兼职'){
          jianzhi=jianzhi+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='礼金'){
          lijin=lijin+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='奖金'){
          jiangjin=jiangjin+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='补助'){
          buzhu=buzhu+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='分红'){
          fenhong=fenhong+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='其它'){
          qita=qita+bill.dailyb[j].amount*1
        }
      }
    }else{break;}
  }
  var option = {
    title: {
        text: '月收入具体组成',
        left:'center',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name +  ' : ' + tar.value;
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: ['工资', '兼职', '理财', '礼金', '奖金', '补助','分红','其它']
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        name: '辅助',
        type: 'bar',
        stack: '总量',
        itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        },
        emphasis: {
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            }
        },
        data: [0, 0, 0, 0, 0, 0,0,0]
    },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            data: [gongzi, jianzhi, licai, lijin, jiangjin, buzhu,fenhong,qita],
            itemStyle:{ normal:{ color:'#DFB9C8' } },
        }
    ]
};
  chart.setOption(option);
  return chart;
}

function initChart4(canvas, width, height) {//收入的柱状图
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);
  var bills = wx.getStorageSync('bills') || [];
  var shiwu=0; var gouwu=0; var chuxing=0; var xuexi=0; var yule=0; var jiating=0; var shenghuo=0; var qita=0;
  for (var i = 0; i < bills.length; i++) {
    var bill = bills[i]
    var dailyb = bill.dailyb
    var day=util.formatDate(new Date());
    if(bill.date.substring(0,4)===day.substring(0,4) && bill.date.substring(5,7)===day.substring(5,7)){
      for (var j = 0; j < bill.dailybnum; ++j){
        if(bill.dailyb[j].type==='餐饮' || bill.dailyb[j].type==='水果' || bill.dailyb[j].type==='零食' || bill.dailyb[j].type==='烟酒'){
          shiwu=shiwu+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='购物' || bill.dailyb[j].type==='服饰' || bill.dailyb[j].type==='美容' || bill.dailyb[j].type==='服饰'  || bill.dailyb[j].type==='数码'){
          gouwu=gouwu+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='交通' ||bill.dailyb[j].type==='旅行' ||bill.dailyb[j].type==='住房' ){
          chuxing=chuxing+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='运动' ||bill.dailyb[j].type==='学习' ||bill.dailyb[j].type==='书籍'){
          xuexi=xuexi+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='娱乐' || bill.dailyb[j].type==='通讯' ||bill.dailyb[j].type==='社交' ||bill.dailyb[j].type==='礼金' ||bill.dailyb[j].type==='礼物' ||bill.dailyb[j].type==='彩票'){
          yule=yule+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='孩子' ||bill.dailyb[j].type==='长辈' ||bill.dailyb[j].type==='宠物'){
          jiating=jiating+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='办公'|| bill.dailyb[j].type==='日用' || bill.dailyb[j].type==='医疗'){
          shenghuo =shenghuo+bill.dailyb[j].amount*1
        }
        if(bill.dailyb[j].type==='维修'|| bill.dailyb[j].type==='捐赠'){
          qita=qita+bill.dailyb[j].amount*1
        }
      }
    }else{break;}
  }
  var option = {
    title: {
        text: '月支出具体组成',
        left:'center',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name +  ' : ' + tar.value;
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: ['食物', '购物', '出行', '学习', '娱乐', '家庭','生活','其它']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 0, 0, 0, 0, 0,0,0]
        },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            data: [shiwu, gouwu, chuxing, xuexi, yule, jiating,shenghuo,qita],
            itemStyle:{ normal:{ color:'#94DCD9'} },
        }
    ]
};
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec1: {
      onInit: initChart1
    },
    ec2:{
      onInit:initChart2
    },
    ec3:{
      onInit:initChart3
    },
    ec4:{
      onInit:initChart4
    },
    incomeOrNot:0,
    outcomeOrNot:1,
    presentation:0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  jumpToIndex: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  changeToIncome: function () {
    this.setData({
      incomeOrNot: 1,
      outcomeOrNot: 0,
    })
  },
  changeToOutcome: function () {
    this.setData({
      outcomeOrNot: 1,
      incomeOrNot: 0,
    })
  },
  changePre:function(){
    if(this.data.presentation==0){
      this.setData({
        presentation:1,
      })
    }
    else{
      this.setData({
        presentation:0,
      })
    }
  }
})
