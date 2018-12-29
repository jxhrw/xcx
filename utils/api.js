// const host="https://service-test.youwatch.cn/xcx";
const app = getApp();

const requestApi = (method, api, data) => {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: app.data.host + api,
            method: method,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync('token'),
                'username': app.data.openId
            },
            data: data,
            success(res) {
                //'application/x-www-form-urlencoded',
                //   console.log(res);
                resolve(res);
            },
            fail(e) {
                console.log(e);
                wx.showToast({
                    title: e.data.errorMsg,
                    icon: 'none'
                })
                reject(e);
            }
        })
    })
}

//查询收货地址列表
const queryAddress = (data) => {
    return requestApi('GET', '/orderReceiveAddressAction/query.json', data);
}
//根据地址标识id查询地址详情
const loadReceiveAddressById = (data) => {
    return requestApi('GET', '/orderReceiveAddressAction/loadReceiveAddressById.json', data);
}
//新增、更新收货地址
const saveReceiveAddress = (data) => {
    return requestApi('POST', '/orderReceiveAddressAction/saveReceiveAddress.json', data);
}
//分页查询订单列表
const queryPage = (data) => {
    return requestApi('GET', '/myOrderAction/queryPage.json', data);
}
//商品详情
const loadProductInfo = (data) => {
    return requestApi('GET', '/productFrontAction/loadProductInfo.json', data);
}
//查询购物车详情
const cartProductDetail = (data) => {
    return requestApi('GET', '/productAction/cartProductDetail.json', data);
}
//查询购物车详情
const loadDefault = (data) => {
    return requestApi('GET', '/orderReceiveAddressAction/loadDefault.json', data);
}
//创建订单
const createOrder = (data) => {
    return requestApi('POST', '/myOrderAction/createOrder.json', data);
}
//查询购物车详情
const loadOrderDetail = (data) => {
    return requestApi('GET', '/myOrderAction/loadOrderDetail.json', data);
}
//预支付下单
const comfirePay = (data) => {
    return requestApi('GET', '/payAction/comfirePay.json', data);
}
//取消订单
const cancelOrder = (data) => {
    return requestApi('POST', '/myOrderAction/cancelOrder.json', data);
}
//查看物流详情
const loadOrderExpressDetail = (data) => {
    return requestApi('GET', '/orderExpressAction/loadOrderExpressDetail.json', data);
}
//查询微信订单支付结果更新订单、支付单
const queryOrderFromWCAndUpdateStatus = (data) => {
    return requestApi('POST', '/payAction/queryOrderFromWCAndUpdateStatus.json', data);
}
//我的养护
const myMaintain = (data) => {
    return requestApi('GET', '/myOrderAction/myMaintains.json', data);
}
//确认收货
const confirmReceive = (data) => {
    return requestApi('POST', '/myOrderAction/confirmReceive.json', data);
}


module.exports.queryAddress = queryAddress;
module.exports.loadReceiveAddressById = loadReceiveAddressById;
module.exports.saveReceiveAddress = saveReceiveAddress;
module.exports.queryPage = queryPage;
module.exports.loadProductInfo = loadProductInfo;
module.exports.cartProductDetail = cartProductDetail;
module.exports.loadDefault = loadDefault;
module.exports.createOrder = createOrder;
module.exports.loadOrderDetail = loadOrderDetail;
module.exports.comfirePay = comfirePay;
module.exports.cancelOrder = cancelOrder;
module.exports.loadOrderExpressDetail = loadOrderExpressDetail;
module.exports.queryOrderFromWCAndUpdateStatus = queryOrderFromWCAndUpdateStatus;
module.exports.myMaintain = myMaintain;
module.exports.confirmReceive = confirmReceive;