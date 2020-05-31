//index.js
//获取应用实例
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
    date:'2020-05-28',//待完成初始化成今天
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
    var bill={
      amount:this.data.amount,
      type:this.data.type,
      remark:this.data.remark
    };
    bills.push(bill);
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