let isDev = process.env.ENV_CONFIG === "dev";
// jingdong账号  appKey:c4878204908a8251ea7ddc35f9880a39 appSecret:2c22201cc50c4a977ad677ebf7c7f423
masdk.init({
  appKey: isDev
    ? "4ba6436461b2fde84e93eea448547a74"
    : "7ff10abb653dead4186089acbd2b7891",
  appSecret: isDev
    ? "0bfc0438778e357c001e77346005f209"
    : "b36c525848fee03529b338fa096a10e1",
  userid: isDev ? "1" : "1",
  channel: "commu",
  debug: true,
});
// masdk.trigger({
//     userid:isDev?'1':'1',
//     eventKey:isDev?'lai5':'test'
// })

// 投放的参数
var bannerParams = {
  userid: isDev ? "1" : "1",
  positionKey: "banner",
  conditions: {
    key1: "value1",
    key2: "value2",
  },
  goBack: true,
  swiperOptions: {
    // autoplay:false,
    // loop:true,
  },
};

masdk.banner(bannerParams);
document.querySelector('[type="trigger"]').onclick = function () {
  masdk.trigger({
    userid: isDev ? "1" : "1",
    eventKey: isDev ? "a" : "test",
  });
};
