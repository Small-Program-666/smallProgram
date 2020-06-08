//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    jieyu:"0.00",
    sumin:"0.00",
    sumout:"0.00",
    yearmonth: util.formatYearMonth(new Date),
    yearmonthstr: util.formatDate(new Date),
    flowable: "none",
    homecolor: 'black',
    scrollHeight:"30",
    list:{}
  },

// 选择日期
sltyearmonth: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail);
  this.setData({
    yearmonth: util.formatYearMonth(new Date(e.detail.value))
  });
  //this.getPageRequset();
},
//跳转流水详情界面
waterdetail: function(e){
  console.log(e);
  wx.navigateTo({
    url: '/pages/logs/details'
  })
},

  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  jumpToIndex: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  }
})
