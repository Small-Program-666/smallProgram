//index.js
//获取应用实例
const app = getApp()

import * as echarts from '../../ec-canvas/echarts';
function initChart1(canvas, width, height) {//收入的扇形图
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);
  var option1 = {
    series: [
      {
        label:{
          normal:{
            fontSize:25,
          }
        },
        name: '收入',
        type: 'pie',
        radius: ['50%', '70%'],
        animationType: 'scale',
        silent: true,
        labelLine: {
          normal: {
            show: true,
          }
        },
        data: [
          {name:'a',value:10},
          {name:'b',value:3},
          {name:'c',value:15},
          {name:'d',value:20},
          {name:'e',value:25},
          {name:'f',value:10},
        ],
        color: ["#3878A4", "#81AAAE","#EBCFC4","#FDB8A8","#E3929B","#7D7294"]
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
  var option1 = {
    series: [
      {
        label:{
          normal:{
            fontSize:25,
          }
        },
        name: '收入',
        type: 'pie',
        radius: ['50%', '70%'],
        animationType: 'scale',
        silent: true,
        labelLine: {
          normal: {
            show: true
          }
        },
        data: [
          {name:'a',value:10},
          {name:'b',value:3},
          {name:'c',value:15},
          {name:'d',value:20},
          {name:'e',value:25},
          {name:'f',value:10},
          {name:'g',value:3},
          {name:'h',value:15},
          {name:'i',value:20},
          {name:'j',value:25},
          {name:'k',value:10},
        ],
        color: ["#8B8378", "#7B6A5A","#42382F","#5F5F5F","#939DA7","#9C9C9C","#C5C7B1","#9FAD96","#7A7D6A","#C1B19A","#93734C"]
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
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
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
        data: ['总收入', 'a', 'b', 'c', 'd', 'e']
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
            data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            data: [2900, 1200, 300, 200, 900, 300],
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
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
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
        data: ['总支出', 'a', 'b', 'c', 'd', 'e']
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
            data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            data: [2900, 1200, 300, 200, 900, 300],
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
