//index.js
//获取应用实例
var util=require('../../utils/util')

const app = getApp()

Page({
  data: {
    NumVis: 0,//记得改回0
    id:0,
    amount: "",
    type: 0, //0为收入 1为支出
    incomeOrNot: 0,
    outcomeOrNot: 1,
    //icon中为选中前图标和选中后
    
    accountIndex: 0,//选择的账本index
    outcome: [
      {
        icon: '/images/icon/eating1.png',
        type: '餐饮',
        id: 0
      },
      {
        icon: '/images/icon/shopping.png',
        type: '购物',
        id: 1
      },
      {
        icon: '/images/icon/goout.png',
        type: '交通',
        id: 2
      },
      {
        icon: '/images/icon/daily.png',
        type: '日用',
        id: 3
      },
      {
        icon: '/images/icon/fruit.png',
        type: '水果',
        id: 4
      },
      {
        icon: '/images/icon/eating.png',
        type: '零食',
        id: 5
      },
      {
        icon: '/images/icon/sports.png',
        type: '运动',
        id: 6
      },
      {
        icon: '/images/icon/fun.png',
        type: '娱乐',
        id: 7
      },
      {
        icon: '/images/icon/communication.png',
        type: '通讯',
        id: 8
      },
      {
        icon: '/images/icon/clothes.png',
        type: '服饰',
        id: 9
      },
      {
        icon: '/images/icon/beauty.png',
        type: '美容',
        id: 10
      },
      {
        icon: '/images/icon/house.png',
        type: '住房',
        id: 11
      },
      {
        icon: '/images/icon/children.png',
        type: '孩子',
        id: 12
      },
      {
        icon: '/images/icon/elder.png',
        type: '长辈',
        id: 13
      },
      {
        icon: '/images/icon/social.png',
        type: '社交',
        id: 14
      },
      {
        icon: '/images/icon/travel.png',
        type: '旅行',
        id: 15
      },
      {
        icon: '/images/icon/wine.png',
        type: '烟酒',
        id: 16
      },
      {
        icon: '/images/icon/digitalDevice.png',
        type: '数码',
        id: 17
      },
      {
        icon: '/images/icon/medicalCare.png',
        type: '医疗',
        id: 18
      },
      {
        icon: '/images/icon/book1.png',
        type: '书籍',
        id: 19
      },
      {
        icon: '/images/icon/study.png',
        type: '学习',
        id: 20
      },
      {
        icon: '/images/icon/pet.png',
        type: '宠物',
        id: 21
      },
      {
        icon: '/images/icon/cashGift.png',
        type: '礼金',
        id: 22
      },
      {
        icon: '/images/icon/gift.png',
        type: '礼物',
        id: 23
      },
      {
        icon: '/images/icon/work.png',
        type: '办公',
        id: 24
      },
      {
        icon: '/images/icon/fix.png',
        type: '维修',
        id: 25
      },
      {
        icon: '/images/icon/heart.png',
        type: '捐赠',
        id: 26
      },
      {
        icon: '/images/icon/goodLuck.png',
        type: '彩票',
        id: 27
      },
    ],
    income: [
      {
        icon: '/images/icon/salary.png',
        type: '工资',
        id: 0
      },
      {
        icon: '/images/icon/parttimeJob.png',
        type: '兼职',
        id: 1
      },
      {
        icon: '/images/icon/financial.png',
        type: '理财',
        id: 2
      },
      {
        icon: '/images/icon/cashGift.png',
        type: '礼金',
        id: 3
      },
      {
        icon: '/images/icon/reward.png',
        type: '奖金',
        id: 4
      },
      {
        icon: '/images/icon/help.png',
        type: '补助',
        id: 5
      },
      {
        icon: '/images/icon/profit.png',
        type: '分红',
        id: 7
      },
      {
        icon: '/images/icon/other.png',
        type: '其它',
        id: 8
      },
    ],
    selectIndex: 0,//选择的id
    remark: '请输入备注',
    date: '2020-05-28',
    currentType: '工资',//选择的Type
    currentTypeIndex:0,
    currentIcon: '/images/icon/salary.png',
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
    time:util.formatTime(new Date),
    numberOfNumAfterDot:0,//控制小数点后最多2位数字
    defaultInfo:[],
    editing:false
  },
  onLoad: function (options) {
    if(options.bdetail==undefined){
      this.setData({
      date: this.getCurrentDay(),
      time: util.formatTime(new Date),
      currentIcon:this.data.outcome[0].icon,
      currentType:this.data.outcome[0].type,
      type: 1,
      outcomeOrNot: 1,
      incomeOrNot: 0,
      })
      console.log("开始新的记账")
    }else{
      var defaultInfo=JSON.parse(options.bdetail)
      var date=(defaultInfo.datetime).substr(0,10)
      var time=(defaultInfo.datetime).substr(11,8)
      if(defaultInfo.inORout==0){this.changeToIncome()}
      else{this.changeToOutcome()}
      this.setData({
        editing:true,
         defaultInfo:defaultInfo,
         id:parseInt(defaultInfo.id),
         date:date,
         time:time,
         type:defaultInfo.inORout,
         account:defaultInfo.account,
         amount:defaultInfo.amount,
         remark:defaultInfo.remark,
         incomeOrNot:defaultInfo.inORout==0?1:0,
         outcomeOrNot:defaultInfo.inORout==1?1:0,
         currentType:defaultInfo.inORout==0?this.data.income[defaultInfo.selectIndex].type:this.data.outcome[defaultInfo.selectIndex].type,
         currentIcon:defaultInfo.inORout==0?this.data.income[defaultInfo.selectIndex].icon:this.data.outcome[defaultInfo.selectIndex].icon,
         numberOfDot:1,
         numberOfNumAfterDot:2
      })
      console.log("id:"+this.data.id)
      this.changeNumToVis()
      var dataset={index:defaultInfo.selectIndex}
      var currentTarget={dataset:dataset,mut:true}
      var e={
        currentTarget:currentTarget
      }
      console.log(e)
      this.selectType(e)
      console.log("编辑已有账目")
      console.log(defaultInfo)
      console.log("id:"+this.data.id)
    }
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
      currentIcon: this.data.income[0].icon,
      currentType: this.data.income[0].type,
      type: 0,
      incomeOrNot: 1,
      outcomeOrNot: 0,
    })
  },
  changeToOutcome: function () {
    this.setData({
      currentIcon:this.data.outcome[0].icon,
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
    if(this.data.editing){
      console.log("*******")
      this.deleteprev()
    }
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
      time:this.data.time,//+
      type:this.data.currentType,//+
      icon:this.data.currentIcon,//+
      account: this.data.account,
      inORout: this.data.type,//0 in,1 out
      remark: this.data.remark=='请输入备注'?'':this.data.remark,
      selectIndex:this.data.selectIndex
    };

    function compareDate(property){
      return function(a,b){
        var date1=a[property];
        var date2=b[property];
        return date2.localeCompare(date1); 
      }
    };
    function compareId(property){
      return function(a,b){
        var va=parseInt(a[property]);
        var vb=parseInt(b[property]);
        if(va>=vb){return-1;}
        else{return 1;}
      }
    }
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
         if(!this.data.editing){bill.id=ttn;}
         bill.amount=parseFloat(bill.amount).toFixed(2);
         bills[i].dailyb.unshift(bill);  
         (bills[i].dailyb).sort(compareId("id"));     
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
      if(!this.data.editing){bill.id=ttn+1;}
      bill.amount=parseFloat(bill.amount).toFixed(2);
      dailybills.dailyb.unshift(bill);
      (dailybills.dailyb).sort(compareId("id"));
      if(bill.inORout==0){dailybills.dayIn=parseFloat(bill.amount).toFixed(2);}
      else{dailybills.dayOut=parseFloat(bill.amount).toFixed(2);}
      bills.push(dailybills);
      bills.sort(compareDate("date"));
      }
    var totalItem = wx.getStorageSync('totalItem')
    wx.setStorageSync('totalItem', Number(totalItem) + 1)
    wx.setStorageSync('bills', bills);
    wx.switchTab({
      url: '../logs/logs',
    })
  },
  deleteprev:function(){
    var bills = wx.getStorageSync('bills') || [];
    var date=(this.data.defaultInfo.datetime).substr(0,10)
    for (var i = 0; i < bills.length; i++) {
      if (bills[i].date == date) {
        var bill = bills[i]
        var dailyb = bill.dailyb
        if (bill.dailybnum == 1) {
          bills.splice(i, 1)
          break
        } else {
          for (var j = 0; j < bill.dailybnum; ++j) {
            console.log(dailyb[j])
            if (dailyb[j].id == this.data.defaultInfo.id) {
              console.log(j)
              if (dailyb[j].inORout == 0) { //收入
                bills[i].dayIn -= dailyb[j].amount
                bills[i].dayIn=parseFloat(bills[i].dayIn).toFixed(2)
              } else {
                bills[i].dayOut -= dailyb[j].amount
                bills[i].dayOut=parseFloat(bills[i].dayOut).toFixed(2)
              }
              bills[i].dailyb.splice(j, 1)
              break;
            }
          }
          bills[i].dailybnum -= 1
        }
        break
      }
    }
    wx.setStorageSync('bills', bills)
    var totalItem = wx.getStorageSync('totalItem')
    wx.setStorageSync('totalItem', Number(totalItem) - 1)
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
        var icon = data[i].icon;
        break;
      }
    }
    this.setData({selectIndex: index})
    if(!e.currentTarget.mut){
      this.setData({
      selectIndex: index,
      currentType: current,
      currentIcon: icon,
   })
   }
    
    console.log("test")
    console.log(this.data.currentType)
  },
  changeNumToVis:function(e){
    if(this.data.NumVis==0){
      this.setData({
        NumVis:1
      })
    }
    else{
      this.setData({
        NumVis:0
      })
    }
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
        if(this.data.numberOfDot==1)
        this.setData({
          numberOfNumAfterDot:this.data.numberOfNumAfterDot-1
        })
      }
      var lastChar = data.charAt(data.length - 1);
      console.log(lastChar)
      if ((lastChar == '.')) {
        console.log("点被删除")
        this.setData({
          numberOfDot: 0,
          numberOfNumAfterDot:0
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
        numberOfDot: 0,
        numberOfNumAfterDot:0
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
    if(this.data.numberOfDot==1)
    if(this.data.numberOfNumAfterDot>=2){
      return;
    }
    else{
      this.setData({
        numberOfNumAfterDot:this.data.numberOfNumAfterDot+1
      })
    }
    this.setData({
      amount: parseFloat(data + id).toString()
    })
  },
})