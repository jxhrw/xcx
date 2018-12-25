// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo(e) {
    let avatarUrl = 'userInfo.avatarUrl';
    let nickName = 'userInfo.nickName';
    console.log(e)
    this.setData({
      [avatarUrl]: e.detail.userInfo.avatarUrl,
      [nickName]: e.detail.userInfo.nickName,
    })
  },
  bindGetPhoneNumber(e){
    wx.request({
      url: 'https://service-test.youwatch.cn/xcx/app/user/loginAndRegister.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        openId: app.data.openId,
        sessionKey: app.data.sessionKey,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success(res1) {
        console.log(res1);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success:(res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              let avatarUrl = 'userInfo.avatarUrl';
              let nickName = 'userInfo.nickName';
              this.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        }
      }
    })
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