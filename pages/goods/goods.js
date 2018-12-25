// pages/goods/goods.js
const api = require('../../utils/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialog: false,
    pictureUrl: '',
    priceRange: '',
    name: '',
    num: 1,
    skus: [],
    chosenId: '',
    chosenName: '',
    chosenpicPath: '',
    chosenPrice: '',
  },

  //开弹窗
  openDlg() {
    this.setData({
      dialog: true
    });
  },
  //关弹窗
  closeDlg() {
    this.setData({
      dialog: false
    });
  },
  //
  changeNum(e) {
    let ty = e.currentTarget.dataset['type'];
    let nowNum = this.data.num;
    if (ty == "add") {
      this.setData({
        num: nowNum + 1
      })
    } else if (nowNum > 1) {
      this.setData({
        num: nowNum - 1
      })
    }
  },
  inputNum(e) {
    this.setData({
      num: e.detail.value
    })
  },
  //打电话
  callTell() {
    wx.makePhoneCall({
      phoneNumber: '4000116008'
    })
  },
  //选择商品
  chosenSku(e) {
    let data = e.currentTarget.dataset['data'];
    this.setData({
      chosenId: data.id,
      chosenName: data.skuType,
      chosenpicPath: data.picPath,
      chosenPrice: data.price,
    });
  },
  //
  orderPayUrl() {
    this.closeDlg();
    wx.navigateTo({
      url: `../order_pay/order_pay?skuId=${this.data.chosenId}&num=${this.data.num}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.loadProductInfo({
      id: options.id
    }).then(res => {
      this.setData({
        pictureUrl: res.data.items.pictureUrl,
        priceRange: res.data.items.priceRange,
        name: res.data.items.name,
        skus: res.data.items.skus,
        chosenId: res.data.items.skus[0].id,
        chosenName: res.data.items.skus[0].skuType,
        chosenpicPath: res.data.items.skus[0].picPath,
        chosenPrice: res.data.items.skus[0].price,
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