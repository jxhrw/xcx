// pages/curing/curing.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderListAll: [],
    orderListCuring: [],
    orderListFinish: [],
    totalPageAll:'1',
    totalPageCuring:'1',
    totalPageFinish:'1',
    scrollTopNow:0,
    scrollTopAll:0,
    scrollTopCuring:0,
    scrollTopFinish:0,
    dataAll: {
      page: 1,
      rows: 10
    },
    dataCuring: {
      page: 1,
      rows: 10,
      status: 'SEND'
    },
    dataFinish: {
      page: 1,
      rows: 10,
      status: 'SUCCESS'
    },
    type: 'all', //类型，all-curing-finish
    allTypes:[
      {type:'all',orderList:[],totalPage:'1'},
      {type:'curing',orderList:[],totalPage:'1'},
      {type:'finish',orderList:[],totalPage:'1'}
    ],
    dialog: false,
    mailInfo:{},
    // show:false
  },
  //选择列表展示
  chooseType: function (e) {
    let type = e.currentTarget.dataset['type'];
    let orderList = 'orderList'+this.titleCase5(type);
    let data = 'data'+this.titleCase5(type);
    let typePer = this.data.type;
    let scrollPer = 'scrollTop'+this.titleCase5(typePer);
    let scrollAft = 'scrollTop'+this.titleCase5(type);
    this.setData({
      type: type,
      [scrollPer]: this.data.scrollTopNow
    });
    // console.log(this.data[scrollAft]);
    setTimeout(()=>{
      wx.pageScrollTo({
        scrollTop: this.data[scrollAft],
        duration:0
      });
    },30);
    if(this.data[orderList].length<1){
      this.queryList(this.data[data]);
    }
  },
  //首字母转大写
  titleCase5(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  },
  //list请求
  queryList(data) {
    let type = this.data.type;
    let orderList = 'orderList'+this.titleCase5(type);
    let pag = 'totalPage'+this.titleCase5(type);
    wx.showLoading({
      title: '加载中',
    })
    api.queryPage(data).then(res => {
      this.setData({
        [orderList]:this.data[orderList].concat(res.data.items.items),
        [pag]:res.data.items.totalPage
      });
      this.assignment();
      wx.hideLoading();
    })
  },
  //加载更多
  loadMore(e){
    let type = e.currentTarget.dataset['type'];
    let stu = 'data'+this.titleCase5(type);
    let pag = 'totalPage'+this.titleCase5(type);
    console.log(stu)
    this.data[stu].page++;
    if(parseInt(this.data[stu].page)<=parseInt(this.data[pag])){
      this.queryList(this.data[stu]);
    }
  },
  //继续支付
  goOnPay(e){
    let type = e.currentTarget.dataset['type'];
    let orderList = 'orderList'+this.titleCase5(type);
    let order = e.currentTarget.dataset['order'];
    let index = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url:'../order_detail/order_detail?orderNo='+order+'&index='+index+'&type='+orderList
    })
  },
  //取消订单
  cancelOrder(e){
    let $this = this;
    let type = e.currentTarget.dataset['type'];
    let orderList = 'orderList'+this.titleCase5(type);
    let order = e.currentTarget.dataset['order'];
    let index = e.currentTarget.dataset['index'];
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '您是否确认取消该订单',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          api.cancelOrder({orderNo:order}).then(res=>{
            api.loadOrderDetail({orderNo:order}).then(res => {
              let obj = $this.data[orderList];
              obj[index] = res.data.items
              $this.setData({
                [orderList]:obj
              });
              $this.assignment();
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //我的养护
  myYhu(e){
    let order = e.currentTarget.dataset['order'];
    wx.navigateTo({
      url:'../myCur/myCur?orderNo='+order
    });
  },
  //确认收货
  makeSureGoods(e){
    let $this = this;
    let type = e.currentTarget.dataset['type'];
    let orderList = 'orderList'+this.titleCase5(type);
    let order = e.currentTarget.dataset['order'];
    let index = e.currentTarget.dataset['index'];
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '您是否确认收货',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          api.confirmReceive({orderNo:order}).then(res=>{
            api.loadOrderDetail({orderNo:order}).then(res => {
              let obj = $this.data[orderList];
              obj[index] = res.data.items
              $this.setData({
                [orderList]:obj
              });
              $this.assignment();
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //查看物流
  watchLogistics(e){
    this.openDlg();
    let order = e.currentTarget.dataset['order'];
    api.loadOrderExpressDetail({orderNo:order}).then(res => {
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
  //alltype的数据赋值
  assignment(){
    this.setData({
      allTypes:[
        {type:'all',orderList:this.data.orderListAll,totalPage:this.data.totalPageAll},
        {type:'curing',orderList:this.data.orderListCuring,totalPage:this.data.totalPageCuring},
        {type:'finish',orderList:this.data.orderListFinish,totalPage:this.data.totalPageFinish}
      ]
    });
  },
  /**
   * 监听页面滚动
   */
  onPageScroll: function(e){
    this.data.scrollTopNow = e.scrollTop;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryList(this.data.dataAll);
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
    this.assignment();
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
    wx.stopPullDownRefresh();
    let type = this.data.type;
    let stu = 'data'+this.titleCase5(type);
    let pag = 'totalPage'+this.titleCase5(type);
    let orderList = 'orderList'+this.titleCase5(type);
    this.data[stu].page=1;
    this.data[orderList] = [];
    this.queryList(this.data[stu]);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let type = e.currentTarget.dataset['type'];
    let type = this.data.type;
    let stu = 'data'+this.titleCase5(type);
    let pag = 'totalPage'+this.titleCase5(type);
    // console.log(stu)
    this.data[stu].page++;
    if(parseInt(this.data[stu].page)<=parseInt(this.data[pag])){
      this.queryList(this.data[stu]);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})