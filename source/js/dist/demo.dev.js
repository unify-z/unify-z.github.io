"use strict";

//引入css
function loadcss(url) {
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
} // 使用方法引入css
//loadcss('test.css')
//判断访客设备


console.log(navigator.userAgent);

var os = function () {
  var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
    isFireFox: isFireFox,
    isChrome: isChrome
  };
}();

if (os.isAndroid || os.isPhone) {
  loadcss('/css/bbtimelist_wap.css');
} else if (os.isPc || os.Tablet) {
  loadcss('/css/bbtimelist.css');
}

function whenDOMReady() {
  percent();
  setPageTitle();
}

window.onload = function () {
  document.querySelector('#nav #menus').style.width = document.querySelector('#nav .menus_items').offsetWidth + 'px';
};

whenDOMReady();
document.addEventListener("pjax:complete", whenDOMReady);
document.addEventListener("pjax:complete", function () {
  document.querySelector('#nav #menus').style.width = document.querySelector('#nav .menus_items').offsetWidth + 'px';
});
window.onscroll = percent;

function percent() {
  var a = document.documentElement.scrollTop || window.pageYOffset,
      // 卷去高度
  b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
      // 整个网页高度
  result = Math.round(a / b * 100),
      // 计算百分比
  btn = document.querySelector("#percent"); // 获取按钮

  if (result <= 5) {
    btn.children[1].innerHTML = "Top";
  } else if (result <= 95) {
    btn.children[1].innerHTML = result;
  } else {
    btn.children[1].innerHTML = "End";
  }
}

function settingPanelClick() {
  document.getElementById('setting-panel').classList.toggle('panel-show');
}

function setPageTitle() {
  document.querySelector('.roll-name-content a').innerHTML = document.title.replace(/\|(.*)/g, '');
  if (document.getElementById('post-comment')) document.querySelector('#nav #to-comment').style.display = 'flex';
}

function changeMusicList(num) {
  document.querySelector('.music-box').style.transform = "translate(-".concat((document.querySelector('.panel-content-2').offsetWidth + 10) * num, "px)");
} // 欢迎光临


if (GLOBAL_CONFIG.Snackbar) {
  btf.snackbarShow('欢迎光临');
}
/** 监听copy事件 */


document.addEventListener("copy", function (e) {
  //复制的内容
  btf.snackbarShow('复制成功，请遵循GPL协议', false, 3000);
}); // 检测按键

window.onkeydown = function (e) {
  if (e.keyCode === 123) {
    btf.snackbarShow('开发者模式已打开，请遵循GPL协议', false, 3000);
  }
};
/* 文章内顶部块 */


var body = document.body;

if (document.querySelector('#bber-talk')) {
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    // 垂直切换选项
    loop: true,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true
    }
  });
} // //全屏
// enterFullscreen: function(el) {
//   console.log("进入全屏的元素", el)
//   if (el.requestFullscreen) {
//       el.requestFullscreen();
//   } else if (el.msRequestFullscreen) {
//       el.msRequestFullscreen();
//   } else if (el.mozRequestFullScreen) {
//       el.mozRequestFullScreen();
//   } else if (el.webkitRequestFullscreen) {
//       el.webkitRequestFullscreen();
//   } else {
//       shine.noFullscreenSupport();
//   }
//   if (shine.is_mobile()) {
//       window.screen.orientation.lock("landscape-primary");
//   }
// },
// //退出全屏
// exitFullscreen: function(fullscreenElement) {
//   console.log("全屏元素", fullscreenElement)
//   // var doc = getIframe();
//   let doc = window.top.document;
//   if (doc.exitFullscreen) {
//       doc.exitFullscreen();
//   } else if (doc.msExitFullscreen) {
//       doc.msExitFullscreen();
//   } else if (doc.mozCancelFullScreen) {
//       doc.mozCancelFullScreen();
//   } else if (doc.webkitExitFullscreen) {
//       doc.webkitExitFullscreen();
//   } else {
//       shine.noFullscreenSupport();
//   }
// },
// noFullscreenSupport: function() {
//   fullscreenState = !fullscreenState;
//   alert('您的浏览器不支持全屏.');
// },
// is_mobile: function() {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// },


var now1 = new Date();

function createtime1() {
  var grt = new Date("25/11/2022 00:00:00"); //此处修改你的建站时间或者网站上线时间

  now1.setTime(now1.getTime() + 250);
  var days = (now1 - grt) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);
} // 重写console方法


console.log = function () {};

console.error = function () {};

console.warn = function () {}; // var shine = {
//   //跳转按钮
//   toPage: function() {
//       console.log("执行跳转");
//       var e = document.querySelectorAll(".page-number")
//         , t = parseInt(e[e.length - 1].innerHTML)
//         , o = document.getElementById("toPageText")
//         , n = parseInt(o.value);
//       if (!isNaN(n) && n > 0 && "0" !== ("" + n)[0] && n <= t) {
//           var a = (n == 1) ? "/" : "/page/" + n + "/";
//           document.getElementById("toPageButton").href = a
//       }
//   },
//   //监听输入
//   listenToPageInputPress() {
//       var e = document.getElementById("toPageText")
//         , t = document.getElementById("toPageButton");
//       e && (e.addEventListener("keydown", (e=>{
//           13 === e.keyCode && (shine.toPage(),
//           pjax.loadUrl(t.href))
//       }
//       )),
//       e.addEventListener("input", (function() {
//           "" === e.value || "0" === e.value ? t.classList.remove("haveValue") : t.classList.add("haveValue");
//           var o = document.querySelectorAll(".page-number")
//             , n = +o[o.length - 1].innerHTML;
//           +document.getElementById("toPageText").value > n && (e.value = n)
//       }
//       )))
//   }
// }
// shine.listenToPageInputPress();
//公告栏魔改


window.οnlοad = function () {// code
};

document.addEventListener('pjax:complete', todis);
document.addEventListener('DOMContentLoaded', todis);

function todis() {
  $.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
      key: 'OIZBZ-CEYLM-Z7U6E-65KF4-2ZSOZ-KGBTV',
      output: 'jsonp'
    },
    dataType: 'jsonp',
    success: function success(res) {
      ipLoacation = res;

      function getDistance(e1, n1, e2, n2) {
        var R = 6371;
        var sin = Math.sin,
            cos = Math.cos,
            asin = Math.asin,
            PI = Math.PI,
            hypot = Math.hypot;

        var getPoint = function getPoint(e, n) {
          e *= PI / 180;
          n *= PI / 180;
          return {
            x: cos(n) * cos(e),
            y: cos(n) * sin(e),
            z: sin(n)
          };
        };

        var a = getPoint(e1, n1);
        var b = getPoint(e2, n2);
        var c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        var r = asin(c / 2) * 2 * R;
        return Math.round(r);
      }

      function showWelcome() {
        var dist = getDistance(117.64579, 26.27168, ipLoacation.result.location.lng, ipLoacation.result.location.lat);
        var pos = ipLoacation.result.ad_info.nation;
        var posdesc;

        switch (ipLoacation.result.ad_info.nation) {
          case "日本":
            posdesc = "よろしく，一起去看樱花吗";
            break;

          case "美国":
            posdesc = "Make America Great Again!";
            break;

          case "英国":
            posdesc = "想同你一起夜乘伦敦眼";
            break;

          case "俄罗斯":
            posdesc = "干了这瓶伏特加！";
            break;

          case "法国":
            posdesc = "C'est La Vie";
            break;

          case "德国":
            posdesc = "Die Zeit verging im Fluge.";
            break;

          case "澳大利亚":
            posdesc = "一起去大堡礁吧！";
            break;

          case "加拿大":
            posdesc = "拾起一片枫叶赠予你";
            break;

          case "中国":
            pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city;

            switch (ipLoacation.result.ad_info.province) {
              case "北京市":
                posdesc = "北——京——欢迎你~~~";
                break;

              case "天津市":
                posdesc = "讲段相声吧。";
                break;

              case "重庆市":
                posdesc = "老乡！！！";
                break;

              case "河北省":
                posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
                break;

              case "山西省":
                posdesc = "展开坐具长三尺，已占山河五百余。";
                break;

              case "内蒙古自治区":
                posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
                break;

              case "辽宁省":
                posdesc = "我想吃烤鸡架！";
                break;

              case "吉林省":
                posdesc = "状元阁就是东北烧烤之王。";
                break;

              case "黑龙江省":
                posdesc = "很喜欢哈尔滨大剧院。";
                break;

              case "上海市":
                posdesc = "众所周知，中国只有两个城市。";
                break;

              case "江苏省":
                switch (ipLoacation.result.ad_info.city) {
                  case "南京市":
                    posdesc = "欢迎来自安徽省南京市的小伙伴。";
                    break;

                  case "苏州市":
                    posdesc = "上有天堂，下有苏杭。";
                    break;

                  default:
                    posdesc = "散装是必须要散装的。";
                    break;
                }

                break;

              case "浙江省":
                posdesc = "东风渐绿西湖柳，雁已还人未南归。";
                break;

              case "安徽省":
                posdesc = "蚌埠住了，芜湖起飞。";
                break;

              case "福建省":
                posdesc = "井邑白云间，岩城远带山。";
                break;

              case "江西省":
                posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
                break;

              case "山东省":
                posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
                break;

              case "湖北省":
                posdesc = "来碗热干面！";
                break;

              case "湖南省":
                posdesc = "74751，长沙斯塔克。";
                break;

              case "广东省":
                posdesc = "老板来两斤福建人。";
                break;

              case "广西壮族自治区":
                posdesc = "桂林山水甲天下。";
                break;

              case "海南省":
                posdesc = "朝观日出逐白浪，夕看云起收霞光。";
                break;

              case "四川省":
                posdesc = "康康川妹子。";
                break;

              case "贵州省":
                posdesc = "茅台，学生，再塞200。";
                break;

              case "云南省":
                posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
                break;

              case "西藏自治区":
                posdesc = "躺在茫茫草原上，仰望蓝天。";
                break;

              case "陕西省":
                posdesc = "来份臊子面加馍。";
                break;

              case "甘肃省":
                posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
                break;

              case "青海省":
                posdesc = "牛肉干和老酸奶都好好吃。";
                break;

              case "宁夏回族自治区":
                posdesc = "大漠孤烟直，长河落日圆。";
                break;

              case "新疆维吾尔自治区":
                posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
                break;

              case "台湾省":
                posdesc = "我在这头，大陆在那头。";
                break;

              case "香港特别行政区":
                posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
                break;

              case "澳门特别行政区":
                posdesc = "性感荷官，在线发牌。";
                break;

              default:
                posdesc = "社会主义大法好。";
                break;
            }

            break;

          default:
            posdesc = "带我去你的国家逛逛吧。";
            break;
        } //判断时间


        var timeChange;
        var date = new Date();
        if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨";else if (date.getHours() >= 1 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了";else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，饮茶先啦！";else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";else timeChange = "夜深了，早点休息，少熬夜";
        document.getElementsByClassName("announcement_content")[0].innerHTML = "\u6B22\u8FCE\u6765\u81EA<span>".concat(pos, "</span>\u7684\u5C0F\u4F19\u4F34\uFF0C").concat(timeChange, "<br>\n        \u4F60\u8DDD\u79BB\u535A\u4E3B\u7EA6\u6709<span>").concat(dist, "</span>\u516C\u91CC\uFF0C").concat(posdesc, "\n        <br>\n        <br>\n        \u672C\u7F51\u7AD9\u7684Twikoo\u8BC4\u8BBA\u7CFB\u7EDF\u4F7F\u7528<a href=\"https://cravatar.cn\">Cravatar</a>\u5934\u50CF\u7CFB\u7EDF\uFF0C\u8BF7\u81EA\u884C\u7ED1\u5B9A\u90AE\u7BB1\u914D\u7F6E\n        ");
      }

      showWelcome();
    }
  });

  function switchPostChart() {
    var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)';

    if (document.getElementById('posts-chart') && postsOption) {
      try {
        var postsOptionNew = postsOption;
        postsOptionNew.title.textStyle.color = color;
        postsOptionNew.xAxis.nameTextStyle.color = color;
        postsOptionNew.yAxis.nameTextStyle.color = color;
        postsOptionNew.xAxis.axisLabel.color = color;
        postsOptionNew.yAxis.axisLabel.color = color;
        postsOptionNew.xAxis.axisLine.lineStyle.color = color;
        postsOptionNew.yAxis.axisLine.lineStyle.color = color;
        postsOptionNew.series[0].markLine.data[0].label.color = color;
        postsChart.setOption(postsOptionNew);
      } catch (error) {
        console.log(error);
      }
    }

    if (document.getElementById('tags-chart') && tagsOption) {
      try {
        var tagsOptionNew = tagsOption;
        tagsOptionNew.title.textStyle.color = color;
        tagsOptionNew.xAxis.nameTextStyle.color = color;
        tagsOptionNew.yAxis.nameTextStyle.color = color;
        tagsOptionNew.xAxis.axisLabel.color = color;
        tagsOptionNew.yAxis.axisLabel.color = color;
        tagsOptionNew.xAxis.axisLine.lineStyle.color = color;
        tagsOptionNew.yAxis.axisLine.lineStyle.color = color;
        tagsOptionNew.series[0].markLine.data[0].label.color = color;
        tagsChart.setOption(tagsOptionNew);
      } catch (error) {
        console.log(error);
      }
    }

    if (document.getElementById('categories-chart') && categoriesOption) {
      try {
        var categoriesOptionNew = categoriesOption;
        categoriesOptionNew.title.textStyle.color = color;
        categoriesOptionNew.legend.textStyle.color = color;

        if (!categoryParentFlag) {
          categoriesOptionNew.series[0].label.color = color;
        }

        categoriesChart.setOption(categoriesOptionNew);
      } catch (error) {
        console.log(error);
      }
    }
  }

  document.querySelector(".rightMenu-item:has(.fa-moon)").addEventListener("click", function () {
    setTimeout(switchPostChart, 100);
  });
  document.getElementById("con-mode").addEventListener("click", function () {
    setTimeout(switchPostChart, 100);
  });
} //


function switchPostChart() {
  var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)';

  if (document.getElementById('posts-chart') && postsOption) {
    try {
      var postsOptionNew = postsOption;
      postsOptionNew.title.textStyle.color = color;
      postsOptionNew.xAxis.nameTextStyle.color = color;
      postsOptionNew.yAxis.nameTextStyle.color = color;
      postsOptionNew.xAxis.axisLabel.color = color;
      postsOptionNew.yAxis.axisLabel.color = color;
      postsOptionNew.xAxis.axisLine.lineStyle.color = color;
      postsOptionNew.yAxis.axisLine.lineStyle.color = color;
      postsOptionNew.series[0].markLine.data[0].label.color = color;
      postsChart.setOption(postsOptionNew);
    } catch (error) {
      console.log(error);
    }
  }

  if (document.getElementById('tags-chart') && tagsOption) {
    try {
      var tagsOptionNew = tagsOption;
      tagsOptionNew.title.textStyle.color = color;
      tagsOptionNew.xAxis.nameTextStyle.color = color;
      tagsOptionNew.yAxis.nameTextStyle.color = color;
      tagsOptionNew.xAxis.axisLabel.color = color;
      tagsOptionNew.yAxis.axisLabel.color = color;
      tagsOptionNew.xAxis.axisLine.lineStyle.color = color;
      tagsOptionNew.yAxis.axisLine.lineStyle.color = color;
      tagsOptionNew.series[0].markLine.data[0].label.color = color;
      tagsChart.setOption(tagsOptionNew);
    } catch (error) {
      console.log(error);
    }
  }

  if (document.getElementById('categories-chart') && categoriesOption) {
    try {
      var categoriesOptionNew = categoriesOption;
      categoriesOptionNew.title.textStyle.color = color;
      categoriesOptionNew.legend.textStyle.color = color;

      if (!categoryParentFlag) {
        categoriesOptionNew.series[0].label.color = color;
      }

      categoriesChart.setOption(categoriesOptionNew);
    } catch (error) {
      console.log(error);
    }
  }
}

document.querySelector(".rightMenu-item:has(.fa-moon)").addEventListener("click", function () {
  setTimeout(switchPostChart, 100);
});
document.getElementById("con-mode").addEventListener("click", function () {
  setTimeout(switchPostChart, 100);
}); //
//首页随机逛逛

var bywind = {
  hideTodayCard: function hideTodayCard() {
    document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide");
  }
};
$(".topGroup").hover(function () {}, function () {
  document.getElementById("todayCard").classList.remove("hide"), document.getElementById("todayCard").style.zIndex = 1;
});