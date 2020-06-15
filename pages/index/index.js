//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({

  data: {
    amount: '',
    type: 0,
    incomeOrNot:0,
    outcomeOrNot:0,
    arrays: [
      ['请选择','工资', '奖金', '兼职', '其它'],
      ['请选择','购物', '吃喝', '日用品', '出行', '运动娱乐', '其它']
    ],
    array: [],
    index: 0,
    remark:'',
    date:util.formatDate(new Date),
    time:util.formatTime(new Date),
    dayIn:0,
    dayOut:0,
    dailyb:[],
    id:0,
  },
  onLoad: function() {
    this.setData({
      array: this.data.arrays[this.data.type]
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  changeToIncome: function() {
    console.log(1)
    this.setData({
      type: 0,
      incomeOrNot:1,
      outcomeOrNot:0,
      array: this.data.arrays[0]
    })
  },
  changeToOutcome: function() {
    this.setData({
      type: 1,
      outcomeOrNot:1,
      incomeOrNot:0,
      array: this.data.arrays[1]
    })
  },

  inputAmount: function(e) {
    this.setData({
      amount: e.detail.value
    });
  },

  handleSubmit: function(e) {
    console.log(e)
    if (!this.data.amount){
      wx.showToast({ title: '请填写金额~', icon: 'none' });
      return;
    }
    var bills=wx.getStorageSync('bills')||[];
    var dailybills={
      date:this.data.date,
      dayIn:this.data.dayIn,
      dayOut:this.data.dayOut,
      dailyb:this.data.dailyb
    }
    
    var bill={       //加了date,time,index（表示具体类别），type，把收入支出改成inORout了
      id:this.data.id,
      date:this.data.date,
      time:util.formatTime(new Date),
      amount:this.data.amount,
      inORout:this.data.type,//0是income，1是outcome
      remark:this.data.remark,
      index:this.data.index,
      type:this.data.arrays[this.data.type][this.data.index]
    };
    this.setData({
      id:parseInt(this.data.id)+1,
    })
    var flag=true;
    for(var i=0;bills[i]!=null;i++){
       if(bills[i].date==bill.date){
         bills[i].dailyb.push(bill);
         if(bill.inORout==0){bills[i].dayIn=parseInt(bill.amount)+parseInt(bills[i].dayIn);}
         else{bills[i].dayOut=parseInt(bill.amount)+parseInt(bills[i].dayOut);}
         flag=false;
       }
    }
    if(flag){
      var dailybills={
        date:this.data.date,
        dayIn:0,
        dayOut:0,
        dailyb:[]
      }
      dailybills.dailyb.push(bill);
      if(bill.inORout==0){dailybills.dayIn=bill.amount;}
      else{dailybills.dayOut=bill.amount;}
      bills.push(dailybills);
    }
    wx.setStorageSync('bills',bills);
  },

  inputRemark: function(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})