// pages/order_pay/order_pay.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addInfo: {},
    freightClass: 'on',
    remark: '',
    sku: {},
    num: 1,
    btnClick: false,
    btnShow: false,
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
    let num = parseInt(e.detail.value);
    num = num<1?1:num;
    this.setData({
      num: num
    })
  },
  remarkChange(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  orderCreate() {
    let data = {
      receiveAddressId: this.data.addInfo.id,
      skuId: this.data.sku.id,
      num: this.data.num,
      remark: this.data.remark,
      transportFee: 0
    };
    this.setData({
      btnClick: false
    });
    api.createOrder(data).then(res=>{
      // this.setData({
      //   btnClick: true
      // })
      let orderNo = res.data.items.orderNo;
      wx.requestPayment({
        timeStamp: String(res.data.items.wcPayResultVO.timeStamp),
        nonceStr: res.data.items.wcPayResultVO.nonceStr,
        package: "prepay_id="+res.data.items.wcPayResultVO.prepayId,
        signType: 'MD5',
        paySign: res.data.items.wcPayResultVO.sign,
        success(res) {
          wx.showToast({
            title: '支付成功',
            icon: 'success'
          });
          api.queryOrderFromWCAndUpdateStatus({orderNo:orderNo}).then(ab=>{
            wx.redirectTo({
              url: '../order_success/order_success?orderNo='+orderNo
            });
          });
        },
        fail(res) { 
          wx.showToast({
            title: '支付失败',
            icon: 'none'
          });
          wx.redirectTo({
            url: '../order_detail/order_detail?orderNo='+orderNo
          });
        }
      })
    }).catch(e=>{
      this.setData({
        btnClick: true
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let op = {
      skuId: options.skuId,
      num: options.num
    };
    this.setData({
      num: parseInt(op.num)
    });
    let data1 = {skuId: op.skuId};
    let p1 = api.cartProductDetail(data1);
    let p2 = api.loadDefault();
    Promise.all([p1,p2]).then(res=>{
      this.setData({
        sku: res[0].data.items.skus[0],
        addInfo: res[1].data.items || [],
        btnClick: res[1].data.items && res[1].data.items.id!=""
      });

      this.setData({
        btnShow: Object.keys(this.data.addInfo).length === 0
      });
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