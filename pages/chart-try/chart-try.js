//index.js
//获取应用实例
const app = getApp()

import * as echarts from '../../ec-canvas/echarts';
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart);
  var option = {
    title:[{
      text:"收入统计",
      left:'50%',
      top:'20rpx',
      textAlign:'center'
    }],
    series: [
      {
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
          {name:'c',value:15}
        ],
        color: ["#666", "#179B16","#123"]
      }
    ]
  }
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    motto: '欢迎',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jumpToIndex: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  }
})
