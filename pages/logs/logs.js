//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    logs: [],
    jieyu:"0.00",
    sumin:"0.00",
    sumout:"0.00",
    bugdet:1500,
    yearmonth: util.formatYearMonth(new Date),
    yearmonthstr: util.formatDate(new Date),
    flowable: "none",
    homecolor: 'black',
    scrollHeight:"30",
    list:{},
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
   // var eid=e.currentTarget.dataset.id;
  //  var bdetail=[];
   // var bills=wx.getStorageSync('bills');
   // for(var i=0;bills[i]!=null;i++){
   //   for(var j=0;(bills[i].dailyb)[j]!=null;j++){
    //    if((bills[i].dailyb)[j].id==eid){bdetail=bills[i].dailyb};
   //   }
  //  }
    wx.navigateTo({
      url: '/pages/logs/details?type=' +e.currentTarget.dataset.cell.type+'&amount='+e.currentTarget.dataset.cell.amount+'&inORout='+e.currentTarget.dataset.cell.inORout+'&date='+e.currentTarget.dataset.cell.date+'&time='+e.currentTarget.dataset.cell.time+'&remark='+e.currentTarget.dataset.cell.remark+'&account='+e.currentTarget.dataset.cell.account+'&icon='+e.currentTarget.dataset.cell.icon,
    })
  },

  onLoad: function () {
    console.log("页面初始化");
    var obj = this;
    if (app.globalData.openid != "") {
      obj.getPageRequset();
    } else {
      app.openidCallback = openid => {
        obj.getPageRequset();
      }
    }
    //this.setData({
    //  logs: (wx.getStorageSync('logs') || []).map(log => {
    //    return util.formatTime(new Date(log))
    //  })
    //})
  },
  
  getPageRequset: function(){
    var obj = this;
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    console.log("加载默认数据");

    var si=0;
    var so=0;
    var bills=wx.getStorageSync('bills')
    for(var i=0;bills[i]!=null;i++){
      si+=parseInt(bills[i].dayIn);
      so+=parseInt(bills[i].dayOut);
    }
    this.setData({
      sumin:si.toFixed(2),
      sumout:so.toFixed(2),
      jieyu:(1500+si-so).toFixed(2),
      list:wx.getStorageSync('bills')
    })
    obj.setData({
      list:this.data.list,
      jieyu:this.data.jieyu,
      sumin:this.data.sumin,
      sumout:this.data.sumout
    })
  },

  //滚动到顶部/左边，会触发 scrolltoupper 事件
  bindscrolltoupper: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'success_no_circle'
    // })
    console.log("滚动到顶部");
    var obj = this;
    obj.getPageRequset();
  },

  onPullDownRefresh: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'success_no_circle'
    // })
    console.log("下拉");
    var obj = this;
    obj.getPageRequset();
  },

  jumpToIndex: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  }
})
