// pages/logs/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bdetail:{},
    type:'',
    inORout:'支出',
    amount:0,
    account:'',
    datetime:'',
    remark:'',
    icon:'',
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bdetail={
      id:options.id,
      type:options.type,
      amount:options.amount,
      account:options.account,
      datetime:options.date+' '+options.time,
      remark:options.remark,
      icon:options.icon,
      inORout:options.inORout,
      selectIndex:options.selectIndex
    }
    this.setData({
      id:options.id,
      type:options.type,
      amount:options.amount,
      account:options.account,
      datetime:options.date+' '+options.time,
      remark:options.remark,
      icon:options.icon,
      bdetail:bdetail
    })
    
    if(options.inORout==0){
      this.setData({inORout:'收入'})
    }
    else{ this.setData({inORout:'支出'})}

  },
  updatewater:function(e){
    console.log("编辑")
    console.log(e.target.dataset.bdetail)
    wx.navigateTo({
      url: '/pages/index/index?bdetail=' + JSON.stringify(e.target.dataset.bdetail)
    });
    this.deletewater(e)//等delete完成
    

  },
  deletewater:function(e){
    console.log("delete~")
    var id=e.target.dataset.bdetail.id//删除id为此id的记录
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})