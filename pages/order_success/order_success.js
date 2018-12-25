// pages/order_success/order_success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:'',
    isBack: false
  },

  goOrder(){
    if(this.data.isBack){
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.redirectTo({
        url: '../order_detail/order_detail?orderNo='+this.data.orderNo
      });
    }
  },
  goIndex(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo,
      isBack: options.isBack && options.isBack == 'yes'
    });
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