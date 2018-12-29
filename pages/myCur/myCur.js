// pages/myCur/myCur.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  // data: {
  //   brandShow: '',
  //   modelShow: '',
  //   seriesShow: '',
  //   pic: '',
  //   prePics: [],
  //   lastPics: [],
  //   mainTainTimeShow: '',
  //   programName: '',
  //   indexShow:0,
  //   array:[1,2,3,4,5,6,1,2,3,4,5,6],
  //   arrayShow:{}
  // },
  data: {
    indexShow:0,
    array:[],
    arrayShow:{}
  },

  chooseIndex(e){
    let index = e.currentTarget.dataset['index'];
    this.setData({
      indexShow: index,
      arrayShow: this.data.array[index]
    });
  },
  showImg(e){
    let img = e.currentTarget.dataset['src']
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.myMaintain({
      orderNo: options.orderNo
    }).then(res => {
      // this.setData({
      //   brandShow: res.data.items.brandShow || '暂无信息',
      //   modelShow: res.data.items.modelShow || '暂无信息',
      //   seriesShow: res.data.items.seriesShow || '暂无信息',
      //   pic: res.data.items.pic,
      //   prePics: res.data.items.prePics,
      //   lastPics: res.data.items.lastPics,
      //   mainTainTimeShow: res.data.items.mainTainTimeShow,
      //   programName: res.data.items.programName
      // });
      this.setData({
        array: res.data.items,
        arrayShow: res.data.items[0]
      });
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