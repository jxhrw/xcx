// pages/address_edit/address_edit.js
const api = require('../../utils/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    person: '',
    phone: '',
    region: [],
    person: '',
    codes: [],
    address: '',
    deft: '0',
    customItem: '全部'
  },
  //input修改值
  bindValueChange(e) {
    let tp = e.currentTarget.dataset['type'];
    this.setData({
      [tp]: e.detail.value
    })
  },
  //改变选择地址
  bindRegionChange: function (e) {
    this.setData({
      codes: e.detail.code,
      region: e.detail.value,
    })
  },
  //改变默认状态
  switch2Change: function (e) {
    this.setData({
      deft: e.detail.value ? '1' : '0',
    })
  },
  //保存地址
  finishEditFuc: function () {
    if (!this.data.person || !this.data.phone || this.data.codes.length < 3 || !this.data.address) {
      wx.showToast({
        title: '信息不完整',
        icon: 'none'
      })
      return;
    }
    let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '联系电话格式有误',
        icon: 'none'
      })
      return false;
    }
    let data = {
      id: this.data.id,
      person: this.data.person,
      phone: this.data.phone,
      province: this.data.codes[0],
      city: this.data.codes[1],
      country: this.data.codes[2],
      address: this.data.address,
      deft: this.data.deft
    }
    // let q1 = api.queryAddress();
    // let q2 = api.saveReceiveAddress(data);
    // Promise.all([q1, q2]).then(res => {
    //   let pages = getCurrentPages();
    //   pages[pages.length - 2].setData({
    //     addList: res[0].data.items
    //   })
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // })
    api.saveReceiveAddress(data).then(res => {
      api.queryAddress().then(rt => {
        let pages = getCurrentPages();
        pages[pages.length - 2].setData({
          addList: rt.data.items
        })
        wx.navigateBack({
          delta: 1
        })
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    if (options.id) {
      api.loadReceiveAddressById({
        id: options.id
      }).then(res => {
        console.log(res)
        this.setData({
          person: res.data.items.person,
          phone: res.data.items.phone,
          codes: [res.data.items.province, res.data.items.city, res.data.items.country],
          region: [res.data.items.provinceShow, res.data.items.cityShow, res.data.items.countryShow],
          address: res.data.items.address,
          deft: res.data.items.deft,
        })
      })
    }
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