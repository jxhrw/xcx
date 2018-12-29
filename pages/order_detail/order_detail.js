// pages/order_detail/order_detail.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateCreateShow: '',
    orderNo: '',
    orderPrice: '',
    num: '',
    pic: '',
    receiveAddress: '',
    receiveName: '',
    receivePhone: '',
    skuName: '',
    mailNo: '',
    mailInfo:{},
    status: '',
    statusShow: '',
    isMainTain: false,
    transportFee: '',
    unitPrice: '',
    dialog: false,
    index: -1,
    type: '',
    payExpireTime: 0,
    payExpireTimeShow:'',
    continue: false,
    remark:'',
    realPay: '',
    changePrice: ''
  },
  //继续支付
  goOnPay(e) {
    let $this = this;
    let orderNo = this.data.orderNo;
    wx.showToast({
      title:'加载中',
      icon:'loading',
      duration:5000,
      mask:true
    });
    api.comfirePay({
      orderNo: orderNo
    }).then(res => {
      wx.hideToast();
      wx.requestPayment({
        timeStamp: String(res.data.items.timeStamp),
        nonceStr: res.data.items.nonceStr,
        package: "prepay_id=" + res.data.items.prepayId,
        signType: 'MD5',
        paySign: res.data.items.sign,
        success(res) {
          wx.showToast({
            title: '支付成功',
            icon: 'success'
          });
          api.queryOrderFromWCAndUpdateStatus({
            orderNo: orderNo
          }).then(ab => {
            $this.updateOrder('goto');
          });
        },
        fail(res) {
          wx.showToast({
            title: '支付失败',
            icon: 'none'
          });
        }
      })
    }).catch(e => {
      api.queryOrderFromWCAndUpdateStatus({
        orderNo: orderNo
      }).then(ab => {
        $this.updateOrder();
      });
    });
  },
  //取消订单
  cancelOrder() {
    let $this = this;
    wx.showModal({
      title: '提示',
      content: '您是否确认取消该订单',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          api.cancelOrder({
            orderNo: $this.data.orderNo
          }).then(res => {
            $this.updateOrder();
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //我的养护
  myYhu(e){
    wx.navigateTo({
      url:'../myCur/myCur?orderNo='+this.data.orderNo
    });
  },
  //确认收货
  makeSureGoods(e){
    let $this = this;
    wx.showModal({
      title: '提示',
      content: '您是否确认收货',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          api.confirmReceive({
            orderNo: $this.data.orderNo
          }).then(res => {
            $this.updateOrder();
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
   //查看物流
   watchLogistics() {
    api.loadOrderExpressDetail({
      orderNo: this.data.orderNo
    }).then(res => {
      console.log(res)
      if (res.data.errorMsg){
        wx.showToast({
          title: res.data.errorMsg,
          icon: 'none'
        });
      }else{
        this.openDlg();
        this.setData({
          mailInfo: res.data.items
        });
      }
    });
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
  //更新订单状态
  updateOrder(done) {
    if(this.data.payExpireTime<0){
      return;
    }
    api.loadOrderDetail({
      orderNo: this.data.orderNo
    }).then(res => {
      this.setData({
        status: res.data.items.status,
        statusShow: res.data.items.statusShow,
        isMainTain: res.data.items.isMainTain,
        mailNo: res.data.items.mailNo,
        payExpireTime: res.data.items.payExpireTime?parseInt(res.data.items.payExpireTime):0,
        payExpireTimeShow: res.data.items.payExpireTime>0?this.data.payExpireTimeShow:'',
        continue: res.data.items.payExpireTime>0,
      });

      if (this.data.index > -1 && this.data.type) {
        let pages = getCurrentPages();
        let obj = pages[pages.length - 2].data[this.data.type];
        obj[this.data.index] = res.data.items;
        pages[pages.length - 2].setData({
          [this.data.type]: obj
        })
      }

      if('goto'==done){
        wx.navigateTo({
          url: '../order_success/order_success?isBack=yes&orderNo='+this.data.orderNo
        });
      }
    });
  },
  //倒计时
  countDownTime(){
    let coutDw = setInterval(()=>{
      let time = this.data.payExpireTime;
      if(time>0 && this.data.continue){
        time--;
        this.setData({
          payExpireTime: time,
          payExpireTimeShow: '剩'+parseInt(time/60)+'分'+parseInt(time%60)+'秒自动取消'
        });
      }else{
        this.updateOrder();
        this.setData({
          payExpireTime: 0,
          payExpireTimeShow: ''
        });
        clearInterval(coutDw);
      }
    },1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: options.index ? parseInt(options.index) : -1,
      type: options.type || ''
    });
    api.loadOrderDetail({
      orderNo: options.orderNo
    }).then(res => {
      this.setData({
        dateCreateShow: res.data.items.dateCreateShow,
        orderNo: res.data.items.orderNo,
        orderPrice: res.data.items.orderPrice,
        num: res.data.items.num,
        pic: res.data.items.pic,
        receiveAddress: res.data.items.receiveAddress,
        receiveName: res.data.items.receiveName,
        receivePhone: res.data.items.receivePhone,
        skuName: res.data.items.skuName,
        mailNo: res.data.items.mailNo,
        status: res.data.items.status,
        statusShow: res.data.items.statusShow,
        isMainTain: res.data.items.isMainTain,
        transportFee: res.data.items.transportFee,
        unitPrice: res.data.items.unitPrice,
        payExpireTime: res.data.items.payExpireTime?parseInt(res.data.items.payExpireTime):0,
        continue: res.data.items.payExpireTime>0,
        remark: res.data.items.remark,
        realPay: res.data.items.realPay,
        changePrice: res.data.items.changePrice || '0'
      });
      if(this.data.payExpireTime>0){
        this.countDownTime();
      }
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