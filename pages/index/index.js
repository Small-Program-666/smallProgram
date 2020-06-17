//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    id:0,
    amount: "",
    type: 0, //0为收入 1为支出
    incomeOrNot: 1,
    outcomeOrNot: 0,
    //icon中为选中前图标和选中后
    outcome: [
      {
        icon: ['../../images/icon/餐饮.png', '../../images/icon/餐饮1.png'],
        type: '餐饮',
        id: 0
      },
      {
        icon: ['../../images/icon/交通.png', '../../images/icon/交通1.png'],
        type: '出行',
        id: 1
      },
    ],
    accountIndex: 0,//选择的账本index
    income: [
      {
        icon:['../../images/icon/工资.png','../../images/icon/工资.png'],
        type:'工资',
        id:0
      }
    ],
    selectIndex: 0,//选择的id
    remark: '',
    date: '2020-05-28',
    time:util.formatTime(new Date),
    currentType: '工资',//选择的Type
    currentIcon: '../../images/icon/工资.png',
    account: "支付宝",
    idb: "back",
    idc: "clear",
    id9: "9",
    id8: "8",
    id7: "7",
    id6: "6",
    id5: "5",
    id4: "4",
    id3: "3",
    id2: "2",
    id1: "1",
    id0: "0",
    idd: ".",
    ids: "保存",
    numberOfDot: 0,
    accounts: ["支付宝", "微信", "现金"],
    dayIn:0,
    dayOut:0,
    dailyb:[],
    dailybnum:0,
    totalbnum:0,
  },
  onLoad: function () {
    this.setData({
      date: this.getCurrentDay(),
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      accountIndex: e.detail.value,
      account: this.data.accounts[e.detail.value]
    })
  },
  getCurrentDay: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + "-" + M + "-" + D;
  },
  getCurrentTime: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var H = date.getHours();
    var Min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var Seconds = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return H + ":" + Min + ":" + Seconds;
  },
  changeToIncome: function () {
    this.setData({
      currentIcon: this.data.income[0].icon[1],
      currentType: this.data.income[0].type,
      type: 0,
      incomeOrNot: 1,
      outcomeOrNot: 0,
    })
  },
  changeToOutcome: function () {
    this.setData({
      currentIcon:this.data.outcome[0].icon[1],
      currentType:this.data.outcome[0].type,
      type: 1,
      outcomeOrNot: 1,
      incomeOrNot: 0,
    })
  },

  inputAmount: function (e) {
    this.setData({
      amount: e.detail.value
    });
  },

  handleSubmit: function (e) {
    console.log(e)
    if (!this.data.amount) {
      wx.showToast({
        title: '请填写金额~',
        icon: 'none'
      });
      return;
    }
    var bills = wx.getStorageSync('bills') || [];

    var dailybills={   //存放当日所有记录
      date:this.data.date,
      dayIn:this.data.dayIn,
      dayOut:this.data.dayOut,
      dailyb:this.data.dailyb,
      dailybnum:this.data.dailybnum,
    }

    var bill = {   //单条记录
      id:this.data.id,//+
      amount: this.data.amount,
      date:this.data.date,//-
      time:util.formatTime(new Date),//+
      type:this.data.currentType,//+
      icon:this.data.currentIcon,//+
      account: this.data.account,
      inORout: this.data.type,//0 in,1 out
      remark: this.data.remark,
    };

    function compareDate(property){
      return function(a,b){
        var date1=a[property];
        var date2=b[property];
        return date2.localeCompare(date1); 
      }
    };
    function countTotal(b){
      var cnt=0;
      for(var i=0;b[i]!=null;i++){
        cnt+=b[i].dailybnum;
      }
      return cnt;
    }

    var flag=true;
    for(var i=0;bills[i]!=null;i++){
       if(bills[i].date==bill.date){
         bills[i].dailybnum++;
         var ttn=countTotal(bills);
         bill.id=ttn;
         bill.amount=parseFloat(bill.amount).toFixed(2);
         bills[i].dailyb.unshift(bill);       
         if(bill.inORout==0){bills[i].dayIn=(parseFloat(bill.amount)+parseFloat(bills[i].dayIn)).toFixed(2);}
         else{bills[i].dayOut=(parseFloat(bill.amount)+parseFloat(bills[i].dayOut)).toFixed(2);}
         flag=false;
       }
    }
    if(flag){
      var dailybills={
        date:this.data.date,
        dayIn:0,
        dayOut:0,
        dailyb:[],
        dailybnum:1,
      }
      var ttn=countTotal(bills);
      bill.id=ttn+1;
      bill.amount=parseFloat(bill.amount).toFixed(2);
      dailybills.dailyb.unshift(bill);
      if(bill.inORout==0){dailybills.dayIn=parseFloat(bill.amount).toFixed(2);}
      else{dailybills.dayOut=parseFloat(bill.amount).toFixed(2);}
      bills.push(dailybills);
      bills.sort(compareDate("date"));
      }
    wx.setStorageSync('bills', bills);
    wx.switchTab({
      url: '../logs/logs',
    })
  },

  inputRemark: function (e) {
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
  selectType: function (e) {
    console.log(e)
    if (this.data.type == 0)
      var data = this.data.income
    else if (this.data.type == 1)
      var data = this.data.outcome
    var index = e.currentTarget.dataset.index;
    for (let i = 0; i < data.length; i++) {
      if (index === data[i].id) {
        var current = data[i].type;
        var icon = data[i].icon[1];
      }
    }
    this.setData({
      selectIndex: index,
      currentType: current,
      currentIcon: icon,
    })
  },
  clickBtn: function (event) {
    var data = (this.data.amount)
    console.log(event)
    var id = event.target.id;
    if (id == this.data.idb) {  //退格←
      console.log("删除")
      if (data == "0") {
        return;
      }
      else {

      }
      var lastChar = data.charAt(data.length - 1);
      console.log(lastChar)
      if ((lastChar == '.')) {
        console.log("点被删除")
        this.setData({
          numberOfDot: 0
        })
      }
      data = data.substring(0, data.length - 1);
      console.log(data)
      if (data == "" || data == "－") {
        data = 0;
      }
      this.setData({ amount: data });
      return
    } else if (id == this.data.idc) {  //清屏C
      console.log("清除")
      this.setData({
        amount: "",
        numberOfDot: 0
      });
      return
    }
    else if (id == this.data.idd) {
      if (this.data.numberOfDot == 1) {
        return
      }
      else {
        if (data == "")
          this.setData({
            amount: "0.",
            numberOfDot: 1
          })
        else {
          this.setData({
            amount: data + ".",
            numberOfDot: 1
          })
        }
        return
      }
    }
    else if (id == this.data.ids) {
      this.handleSubmit();
    }
    if (data == "NaN")
      data = ""
    this.setData({
      amount: parseFloat(data + id).toString()
    })
  },
})