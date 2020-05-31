//index.js
//获取应用实例
const app = getApp()

 Page({
   
  data:{
     array: [ '请选择','饮食','娱乐','交通','书籍','待添加' ],
     index:0
   },

   bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})