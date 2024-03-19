# 初始化
#### 通过init接口注入权限验证配置
所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次)
* #### 参数
| 参数名    | 必选 | 类型    | 说明               |
| --------- | ---- | ------- | ------------------ |
| debug     | 否   | boolean | 是否开启debug模式  |
| appKey    | 是   | string  | 应用key            |
| appSecret | 是   | string  | 应用secret         |
| domain    | 否   | string  | js 版本传 当前域名 |
* #### 案例
```html
    ma.init({
        debug: true,
        appKey:'c4878204908a8251ea7ddc35f9880a39', 
        appSecret:'2c22201cc50c4a977ad677ebf7c7f423',
        domain:'https://www.baidu.com/'
    });
```
# 触发接口
* #### 参数
| 参数名     | 必选 | 类型   | 说明                                                                                   |
| ---------- | ---- | ------ | -------------------------------------------------------------------------------------- |
| userid     | 是   | string | 用户唯一标识,非登录情况下传空字符串(只能是数字、字母和下划线(_)的组合，不允许其他字符) |
| eventKey   | 是   | string | 事件key 唯一                                                                           |
| conditions | 否   | object | 条件内容,键值对象                                                                      |

* #### 案例
**请求示例**
```html
    ma.trigger({
        userid:'12',
        eventKey:'1111'
        conditions:{
            "key1":"value1",
            "key2":"value2",
            ...
        }
    });
```
**返回示例**
```
  {
    "success": true,
    "code":200,
    "msg":"成功",
    "data":{
        "url":"http://abc.com/1.html",//页面链接
        "image":{ //仅当有图模式才有本字段，无图形式没有本字段
            "src":"xxxx.png",//图片路径
            "size":"s|l",//图片的大小类型
            "right":100,//图片位置，百分比值
            "top":100,//图片位置，百分比值
            "stay":3,//图片停留时间，单位秒。0表示一直显示
        }
    },
    "debug":[//仅当开启debug模式才返回。程序执行流程的主要信息（要让开发者能明确知道哪一步通过，哪一步不通过）
        "info 11111111111111111",
        "info 22222222222222222",
        ...
    ],
  }
```
# 投放接口
* #### 参数
| 参数名      | 必选 | 类型   | 说明                                                                                   |
| ----------- | ---- | ------ | -------------------------------------------------------------------------------------- |
| userid      | 是   | string | 用户唯一标识,非登录情况下传空字符串(只能是数字、字母和下划线(_)的组合，不允许其他字符) |
| positionKey | 是   | string | 投放位置标识 唯一                                                                      |
| conditions  | 否   | object | 条件内容,键值对象                                                                      |

* #### 案例
**请求示例**
```html
    ma.banner({
        userid:'12',
        positionKey:'login'
        conditions:{
            "key1":"value1",
            "key2":"value2",
            ...
        }
    });
```
**返回示例**
```
  {
    "success": true,
    "code":200,
    "msg":"成功",
    "data":[
        {
            "url":"http://abc.com/1.html",//页面链接
            "image":{
                "width":1000,//图片大小
                "height":600,//图片大小
                "src":"xxxx.png"//图片路径
            }
        },
        ...
    ],
    "debug":[//仅当开启debug模式才返回。程序执行流程的主要信息（要让开发者能明确知道哪一步通过，哪一步不通过）
        "info 11111111111111111",
        "info 22222222222222222",
        ...
    ]
  }
```
# 用户信息采集
* #### 参数
| 参数名           | 必选 | 类型     | 说明                                                                                    |
| ---------------- | ---- | -------- | --------------------------------------------------------------------------------------- |
| userid           | 是   | string   | 用户唯一标识,非登录情况下传空字符串 (只能是数字、字母和下划线(_)的组合，不允许其他字符) |
| country          | 否   | string   | 国家                                                                                    |
| province         | 否   | string   | 省份                                                                                    |
| city             | 否   | string   | 城市                                                                                    |
| industry         | 否   | string   | 行业                                                                                    |
| firstRegister    | 否   | datetime | 注册时间(如果传值，必须传日期格式)                                                      |
| firstVisit       | 否   | datetime | 首次访问(如果传值，必须传日期格式)                                                      |
| firstTransaction | 否   | datetime | 首次交易(如果传值，必须传日期格式)                                                      |
| source           | 否   | string   | 客户来源                                                                                |
| grade            | 否   | string   | 会员等级                                                                                |
| name             | 否   | string   | 姓名                                                                                    |
| sex              | 否   | string   | 性别(如果传值，必须传 男 或 女)                                                         |
| age              | 否   | int      | 年龄(如果传值，必须传 数字)                                                             |
| birthday         | 否   | datetime | 生日(如果传值，必须传日期格式)                                                          |
| address          | 否   | string   | 地址                                                                                    |
| mobile           | 否   | string   | 手机号(如果传值，必须传手机号)                                                          |
| email            | 否   | string   | 邮箱(如果传值，必须传手机号)                                                            |
| qq               | 否   | string   | QQ                                                                                      |
| wechat           | 否   | string   | 微信                                                                                    |
| weibo            | 否   | string   | 微博                                                                                    |
| education        | 否   | string   | 学历                                                                                    |
| income           | 否   | string   | 收入                                                                                    |
| interest         | 否   | string   | 兴趣                                                                                    |
| car              | 否   | string   | 车辆品牌                                                                                |
| house            | 否   | string   | 住房情况                                                                                |
| marriage         | 否   | string   | 婚姻状况                                                                                |
| son              | 否   | string   | 子女状况                                                                                |
| risk             | 否   | string   | 风险敏感度                                                                              |
| price            | 否   | string   | 价格敏感度                                                                              |
| category         | 否   | string   | 品类偏好                                                                                |
| shopping         | 否   | string   | 每月购物频次                                                                            |
| highPrice        | 否   | string   | 单次购物最高金额                                                                        |
| school           | 否   | string   | 毕业学校                                                                                |
| company          | 否   | string   | 公司                                                                                    |
| position         | 否   | string   | 职位                                                                                    |
| life             | 否   | string   | 生命周期                                                                                |
**请求示例**
```
{
    "userid":"xxxxx",
    "mobile":"1382xxxxxx"
}
```
**返回示例**
```
{
    "success":true,
    "code": 200,
    "msg": "成功"
}
```
# 错误码
| 错误码 | 错误信息                       | 说明                                 |
| ------ | ------------------------------ | ------------------------------------ |
| 1001   | missing header: Deviceid       | 缺少头部字段: Deviceid               |
| 1002   | missing header: Userid         | 缺少头部字段: Userid                 |
| 1003   | missing header: Sdk-Type       | 缺少头部字段: Sdk-Type               |
| 1004   | missing header: Sdk-Version    | 缺少头部字段: Sdk-Version            |
| 1005   | missing header: App-Key        | 缺少头部字段: App-Key                |
| 1006   | missing header: Random-String  | 缺少头部字段: Random-String          |
| 1007   | missing header: Sign           | 缺少头部字段: Sign                   |
| 1008   | app key not found              | 不存在该应用key                      |
| 1009   | sign error                     | 签名错误                             |
| 2001   | missing parameter: eventKey    | 缺少参数: eventKey                   |
| 2002   | event not found                | 不存在该事件，请先到商家后台创建     |
| 3001   | missing parameter: positionKey | 缺少参数: positionKey                |
| 3002   | position not found             | 不存在该投放位置，请先到商家后台创建 |
| 4001   | missing parameter: userid      | 缺少参数: userid                     |


# 投放功能使用方法
1：在需要投放的位置添加一个容器，比如div元素(注：容器中的position-key为投放位置标识，为必填项)
    <div position-key="banner"></div> 
2：调用banner方法，在对应的容器位置进行投放，其中banner要传入一个object类型的参数，且为必填(注：每一个投放容器都要调用一次banner方法，且position-key唯一)。

* #### 参数
| 参数名         | 必选 | 类型   | 说明                                                                                    |
| -----------   | ---- | ------ | -------------------------------------------------------------------------------------- |
| positionKey   | 是   | string | 投放位置标识 唯一                                                                 |
| conditions    | 否   | object | 条件内容,键值对象     
| swiperOptions | 否   | object | swiper轮播组件的参数 |                                                                 |