import Fingerprint from "fingerprintjs";
import reqwest from "reqwest";
import md5 from "js-md5";
import doT from "dot";
import Swiper from "swiper";
// import 'swiper/dist/css/swiper.css';
import "swiper/css/swiper.css";
import tmplTrigger from "./src/template/trigger.html";
import banner from "./src/template/banner.html";
import "./src/css/index.scss";
import "./src/css/banner.scss";
var storage = window.localStorage,
  fingeDevice = new Fingerprint().get(),
  // 字符串html转标签格式
  convertHtml = function (coverString) {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = coverString;
    var cover = wrapper.children[0];
    return cover;
  },
  convertStyle = function (coverStyle) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.rel = "stylesheet";
    //for Chrome Firefox Opera Safari
    style.appendChild(document.createTextNode(coverStyle[0][1]));
    //for IE
    //style.styleSheet.cssText = code;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  },
  requiredParam = function (options, arr) {
    var regId = /^[0-9a-zA-Z_]{1,}$/;
    try {
      for (var i = 0; i < arr.length; i++) {
        if (!options[arr[i]]) {
          throw new Error("缺少" + arr[i] + "的值");
        }
        if (arr[i] === "userid" && options[arr[i]] !== " ") {
          if (!regId.test(options[arr[i]]))
            throw new Error(
              arr[i] + "只能是数字、字母和下划线(_)的组合，不允许其他字符"
            );
        }
      }
    } catch (err) {
      if (masdk.config.debug) {
        console.error(err.name + "：" + err.message);
      }
      return false;
    }
  },
  extend = function (params) {
    function Super() {
      for (var key in params) {
        this[key] = params[key];
      }
    }
    Super.prototype = Client.prototype;
    return new Super();
  };
console.log("rrrr");
var Client = function () {
  this.version = "1.0.0";
  // 触发
  this.trigger = (options) => {
    if (requiredParam(options, ["userid", "eventKey"]) === false) return;
    return this.http({
      userid: options.userid,
      url: "/sdk/trigger",
      method: "post",
      data: {
        eventKey: options.eventKey,
        conditions: options.conditions || {},
      },
      success: function (res) {
        // res.success = true
        if (!res.success || !res.data.url) return;
        // 是否显示返回键
        let isInclude = res.data.url.indexOf("?") !== -1;
        if (options.goBack) {
          if (isInclude) {
            res.data.url = res.data.url += "&goBack=true";
          } else {
            res.data.url = res.data.url += "?goBack=true";
          }
        } else {
          if (isInclude) {
            res.data.url = res.data.url += "&goBack=false";
          } else {
            res.data.url = res.data.url += "?goBack=false";
          }
        }
        if (options.success) {
          options.success(res);
        }
        // else {
        var data = res.data;
        data.image && (data.image.stay = data.image.stay || 0);
        if (data.image) {
          if (!data.image.src) {
            window.location.href = data.url;
            return;
          } else {
            let html = doT.template(tmplTrigger)(data);
            let tagHtml = convertHtml(html);
            document.body.appendChild(tagHtml);
            if (data.image.stay > 0) {
              oHide(tagHtml, data.image.stay);
            }
            if (data.image.size === "s") {
              this.event.handleDrag(tagHtml);
            }
            this.event.handleClickShow(tagHtml.children[1]);
          }
        } else {
          options.noImageCallback && options.noImageCallback();
        }

        // }
      },
      error: function (err) {
        options.error && options.error(err);
      },
    });
  };
  // 遍历投放的位置
  // this.banners=()=>{
  //     var bannerDiv=document.querySelectorAll("[masdk]");

  //     if(bannerDiv.length==0) return false

  //     for(var i=0;i<bannerDiv.length;i++){
  //         var swiperOptions=bannerDiv[i].getAttribute("swiper-options");
  //         swiperOptions=swiperOptions?JSON.parse(swiperOptions):''

  //         // 获取positionKey 和 conditions
  //         var params={
  //             "positionKey":bannerDiv[i].getAttribute("position-key"),
  //             "conditions":bannerDiv[i].getAttribute("conditions")?bannerDiv[i].getAttribute("conditions"):'',
  //             "element":bannerDiv[i],
  //             "swiperOptions":swiperOptions
  //         };

  //         // this.banner(params);
  //     }

  // }
  // 投放
  this.banner = (options) => {
    if (requiredParam(options, ["userid", "positionKey"]) === false) return;
    return this.http({
      userid: options.userid,
      url: "/sdk/banner",
      method: "post",
      data: {
        positionKey: options.positionKey,
        conditions: options.conditions || {},
      },
      success: function (res) {
        if (!res.success) return;
        for (let item of res.data) {
          let isInclude = item.url.indexOf("?") !== -1;
          if (options.goBack) {
            if (isInclude) {
              item.url = item.url += "&goBack=true";
            } else {
              item.url = item.url += "?goBack=true";
            }
          } else {
            if (isInclude) {
              item.url = item.url += "&goBack=false";
            } else {
              item.url = item.url += "?goBack=false";
            }
          }
        }
        // let  isInclude = res.data.url.indexOf("?")!==-1
        // if (options.goBack) {
        //     if(isInclude){
        //         res.data.url = res.data.url+='&goBack=true'
        //     } else {
        //         res.data.url = res.data.url+='?goBack=true'
        //     }
        // } else {
        //     if(isInclude){
        //         res.data.url = res.data.url+='&goBack=false'
        //     } else {
        //         res.data.url = res.data.url+='?goBack=false'
        //     }
        // }
        if (options.success) {
          options.success(res);
        }
        // else {
        var data = res.data;
        let html = doT.template(banner)(data);
        let tagHtml = convertHtml(html);
        let element = document.querySelector(
          "[position-key='" + options.positionKey + "']"
        );
        element.appendChild(tagHtml);
        // 轮播
        // 默认参数
        var swiperOptions = {
          direction: "horizontal", // 垂直切换选项
          loop: true, // 循环模式选项
          autoHeight: false,
          autoplay:
            res.data.length <= 1
              ? false
              : {
                  delay: 5000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
          // autoplay: res.data.length <= 1 ? false : 5000,
          clickable: true,
          // 如果需要分页器
          pagination: {
            el: res.data.length <= 1 ? null : ".swiper-pagination",
          },
        };

        if (options.swiperOptions) {
          for (var i in options.swiperOptions) {
            swiperOptions[i] = options.swiperOptions[i];
          }
        }

        new Swiper(".swiper-container-ma", swiperOptions);

        // }
      },
      error: function (err) {
        options.error && options.error(err);
      },
    });
  };
  // 用户信息采集
  this.infosUser = (options) => {
    var regDate = /^(\d{4})-(\d{2})-(\d{2})$/;
    var regTime =
      /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    let regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    let regMob = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    let regNum = /^[1-9]\d*$/;
    let regSex = /^['男'|'女']$/;
    if (requiredParam(options, ["userid"]) === false) return;

    try {
      if (options["firstRegister"] && !regTime.test(options["firstRegister"]))
        throw new Error("firstRegister日期格式不正确,如2008-18-8 08:08:08");
      if (options["firstVisit"] && !regTime.test(options["firstVisit"]))
        throw new Error("firstVisit日期格式不正确,如2008-18-8 08:08:08");
      if (
        options["firstTransaction"] &&
        !regTime.test(options["firstTransaction"])
      )
        throw new Error("firstTransaction日期格式不正确,如2008-18-8 08:08:08");
      if (options["birthday"] && !regDate.test(options["birthday"]))
        throw new Error("birthday日期格式不正确,如2008-18-8");
      if (options["sex"] && !regSex.test(options["sex"]))
        throw new Error("sex性别只能是男或女");
      if (options["age"] && !regNum.test(options["age"]))
        throw new Error("age年龄只能是正整数");
      if (options["mobile"] && !regMob.test(options["mobile"]))
        throw new Error("mobile手机号码不正确");
      if (options["email"] && !regEmail.test(options["email"]))
        throw new Error("email邮箱不正确");
    } catch (err) {
      if (this.config.debug) {
        console.error(err.name + "：" + err.message);
      }
      return false;
    }
    var strJson = JSON.stringify(options);
    var mdStr = md5(strJson);
    if (storage.getItem("infosUser")) {
      var storageStr = storage.getItem("infosUser");
      if (mdStr === md5(storageStr)) {
        //判断是否与上次提交的数据一样
        options.success && options.success();
        return false;
      }
    } else {
      storage.setItem("infosUser", strJson);
    }
    return this.http({
      userid: options.userid,
      url: "/sdk/infos/user",
      method: "post",
      data: options,
      success: function (res) {
        options.success && options.success(res);
      },
      error: function (err) {
        options.error && options.error(err);
      },
    });
  };
  this.init = function (options) {
    try {
      if (!options["appKey"]) throw new Error("缺少appKey的值");
      if (!options["appSecret"]) throw new Error("缺少appSecret的值");
    } catch (err) {
      console.error(err.name + "：" + err.message);
    }
    this.config = options;
    Event.prototype = this.constructor.prototype;
    this.constructor.prototype.event = new Event();
    this.device();
  };
};

var Event = function () {
  // 拖拽
  this.handleDrag = function (element) {
    var elemx = 0;
    var elemy = 0;
    var eleml = 0;
    var elemt = 0;
    var isDown = false;
    element.addEventListener(
      "touchstart",
      (e) => {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        // e.stopPropagation();
        // e.preventDefault();
        elemx = touch.clientX;
        elemy = touch.clientY;
        //获取左部和顶部的偏移量
        eleml = element.offsetLeft;
        elemt = element.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
        element.style.cursor = "move";
      },
      false
    );
    //鼠标移动
    window.addEventListener(
      "touchmove",
      (e) => {
        var selfW = element.offsetWidth; //元素宽
        var selfH = element.offsetHeight; //元素高
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        var rangeH = window.screen.availHeight; //window宽
        var rangeW = window.screen.availWidth; //window高
        var diffX = rangeW - selfW; //差值宽
        var diffY = rangeH - selfH; //差值高

        // e.stopPropagation();
        // e.preventDefault();
        if (isDown == false) {
          return;
        }
        //获取x和y
        var nx = touch.clientX;
        var ny = touch.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (elemx - eleml);
        var nt = ny - (elemy - elemt);
        if (nl < 0) {
          element.style.right = (diffX / rangeW) * 100 + "%";
        } else if (nl > diffX) {
          element.style.right = 0 + "%";
        } else {
          var diffRight = rangeW - nl - selfW; //计算right的值
          element.style.right = (diffRight / rangeW) * 100 + "%";
        }
        if (nt < 0) {
          element.style.top = 0 + "%";
        } else if (nt > diffY) {
          element.style.top = (diffY / rangeH) * 100 + "%";
        } else {
          element.style.top = (nt / rangeH) * 100 + "%";
        }
      },
      false
    );
    //鼠标抬起事件
    element.addEventListener(
      "touchend",
      (e) => {
        // e.stopPropagation();
        // e.preventDefault();
        //开关关闭
        isDown = false;
        element.style.cursor = "default";
      },
      false
    );
  };
  // 点击隐藏
  this.handleClickShow = function (element) {
    var _this = this;
    element.addEventListener(
      "click",
      () => {
        _this.animation.oHide(element.parentNode);
      },
      false
    );
  };
};

// 设备信息采集
Client.prototype.device = function () {
  var params = {
    deviceid: storage.getItem("Deviceid") || fingeDevice,
    model: "",
    width: window.screen.width,
    height: window.screen.height,
    operator: "",
    appName: "",
    appVersion: "",
    sdkType: "js",
    sdkVersion: this.version,
    os: "",
    osVersion: "",
    manifest: "{}", //{}
    installedApps: "{}", //{}
    imei: "",
    serialId: "",
    accounts: "",
    language: window.navigator.language,
    domain: window.location.host || process.env.DOMAIN_API,
  };
  var mdStr = md5(JSON.stringify(params));
  if (storage.getItem("device") === mdStr) return;
  return this.http({
    userid: "",
    url: "/sdk/infos/device",
    method: "post",
    data: params,
    success: function (res) {
      storage.setItem("device", mdStr);
    },
  });
};
//动画
Client.prototype.animation = {
  oHide: function (tagHtml, time = 0) {
    setTimeout(() => {
      tagHtml.style["opacity"] = "0";
      tagHtml.style["transition"] = "opacity .5s ease-in";
      tagHtml.style["webkit-transition"] = "opacity .5s ease-in";
      tagHtml.style["-moz-transition"] = "opacity .5s ease-in";
    }, time * 1000);
    function style() {
      tagHtml.style["display"] = "none";
      tagHtml.removeEventListener("WebkitTransitionEnd", style);
      tagHtml.removeEventListener("transitionend", style);
    }
    tagHtml.addEventListener("WebkitTransitionEnd", style, false);
    tagHtml.addEventListener("transitionend", style, false);
  },
};

Client.prototype.http = function (params) {
  let options = extend(params);
  let publicHead = this.headers(this.config);
  publicHead["Userid"] = options.userid;
  let sign =
    publicHead["App-Key"] +
    publicHead["Userid"] +
    publicHead["Random-String"] +
    this.config["appSecret"];
  publicHead["Sign"] = md5(sign);
  options.data["debug"] = this.config.debug || false;
  try {
    if (this.config.channel === "commu") {
      publicHead["Merchant"] = publicHead["App-Key"];
      delete publicHead["App-Key"];
    }
  } catch (error) {
    console.log(333, error);
  }

  let _this = this;
  return reqwest({
    url: (this.config.domain || process.env.DOMAIN_API) + options.url,
    type: "json",
    method: options.method || "get",
    contentType: "application/json;charset=utf-8",
    headers: publicHead,
    data: JSON.stringify(options.data),
    success: (res) => {
      if (_this.config.debug) console.log(res);
      options.success && options.success(res);
    },
    error: function (err) {
      if (err.status === 404) return;
      let errState =
        typeof err.response === "string"
          ? JSON.parse(err.response)
          : err.response;
      if (_this.config.debug) console.log(errState);
      options.error && options.error(errState);
    },
  });
};
// 公共头部参数
Client.prototype.headers = function (options) {
  if (!storage.getItem("Deviceid")) {
    storage.setItem("Deviceid", fingeDevice);
  }
  return {
    "Sdk-Version": this.version,
    Deviceid: storage.getItem("Deviceid"),
    "Random-String": new Date().getTime(),
    "Sdk-Type": "js",
    Source: "js",
    "App-Key": options["appKey"],
  };
};
var Masdk = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new Client();
    }
    return instance;
  };
})();

// var masdk = new Masdk();
export const masdk = new Masdk();
// window.masdk = masdk;
