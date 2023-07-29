//导航栏js
// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标

  result <= 99 || (result = 99), (btn.innerHTML = result);
}

document.getElementById("page-name").innerText = document.title.split(" | 安知鱼")[0];

//22.12.8 update：add mask
//22.12.9 update: add search in this page
function setMask(){//设置遮罩层
    if(document.getElementsByClassName("rmMask")[0]!=undefined){
        return document.getElementsByClassName("rmMask")[0];
    }
    mask = document.createElement('div');
    mask.className = "rmMask";
    mask.style.width = window.innerWidth + 'px';
    mask.style.height = window.innerHeight + 'px';
    mask.style.background = '#fff';
    mask.style.opacity = '.0';
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.zIndex = 998;
    document.body.appendChild(mask);
    document.getElementById("rightMenu").style.zIndex=19198;
    return mask;
}

function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
rmf.yinyong=function(){
    var e = document.getElementsByClassName("el-textarea__inner")[0],
        t = document.createEvent("HTMLEvents");
    t.initEvent("input", !0, !0), e.value = d.value = "> "+getSelection().toString()+"\n\n", e.dispatchEvent(t);
    console.log(getSelection().toString());
    document.getElementsByClassName("el-textarea__inner")[0].value="> "+getSelection().toString()+"\n\n";
    Snackbar.show({
        text: '为保证最佳评论阅读体验，建议不要删除空行',
        pos: 'top-center',
        showAction: false,
    })
}
rmf.copyWordsLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    Snackbar.show({
        text: '链接复制成功！快去分享吧！',
        pos: 'top-right',
        showAction: false
    });
}
rmf.switchReadMode = function () {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
rmf.scrollToTop = function () {
    document.getElementsByClassName("menus_items")[1].setAttribute("style","");
    document.getElementById("name-container").setAttribute("style","display:none");
    btf.scrollToDest(0, 500);
}
rmf.translate = function () {
    document.getElementById("translateLink").click();
}
rmf.searchinThisPage=()=>{
    document.body.removeChild(mask);
    document.getElementsByClassName("local-search-box--input")[0].value=window.getSelection().toString()
    document.getElementsByClassName("search")[0].click()
    var evt = document.createEvent("HTMLEvents");evt.initEvent("input", false, false);document.getElementsByClassName("local-search-box--input")[0].dispatchEvent(evt);
}
document.body.addEventListener('touchmove', function(e){

}, { passive: false });
function popupMenu() {
    //window.oncontextmenu=function(){return false;}
    window.oncontextmenu = function (event) {
        if(event.ctrlKey||document.body.clientWidth<900) return true;
        $('.rightMenu-group.hide').hide();
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post')) {
            $('#menu-post').show();
        } else {
            if (document.getElementById('page')) {
                $('#menu-post').show();
            }
        }
        var el = window.document.body;
        el = event.target;
        var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        if (a.test(window.getSelection().toString())&&el.tagName!="A"){
            $('#menu-too').show()
        }
        if (el.tagName == 'A') {
            $('#menu-to').show()
            rmf.open = function () {
                if(el.href.indexOf("http://")==-1&&el.href.indexOf("https://")==-1||el.href.indexOf("yisous.xyz")!=-1){
                    pjax.loadUrl(el.href)
                }
                else{
                    location.href = el.href
                }
            }
            rmf.openWithNewTab = function () {
                window.open(el.href);
                // window.location.reload();
            }
            rmf.copyLink = function () {
                let url = el.href
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        }
        if (el.tagName == 'IMG') {
            $('#menu-img').show()
            rmf.openWithNewTab = function () {
                window.open(el.src);
                // window.location.reload();
            }
            rmf.click = function () {
                el.click()
            }
            rmf.copyLink = function () {
                let url = el.src
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
            rmf.saveAs=function(){
                var a = document.createElement('a');
                var url = el.src;
                var filename = url.split("/")[-1];
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            // rmf.paste=function(){
            //     input.addEventListener('paste', async event => {
            //         event.preventDefault();
            //         const text = await navigator.clipboard.readText();
            //         el.value+=text;
            //       });
            // }
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            //读取剪贴板
                            navigator.clipboard.readText().then(text => {
                                console.log(text)
                                insertAtCursor(el, text)
                            })
                        } else {
                            Snackbar.show({
                                text: '请允许读取剪贴板！',
                                pos: 'top-center',
                                showAction: false,
                            })
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }
        mask=setMask();
        window.onscroll=()=>{
            rmf.showRightMenu(false);
            window.onscroll=()=>{}
            document.body.removeChild(mask);
        }
        $(".rightMenu-item").click(()=>{
            document.body.removeChild(mask);
        })
        $(window).resize(()=>{
            rmf.showRightMenu(false);
            document.body.removeChild(mask);
        })
        mask.onclick=()=>{
            document.body.removeChild(mask);
        }
        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
    let timer = 0 // 初始化timer

    target.ontouchstart = () => {
        timer = 0 // 重置timer
        timer = setTimeout(() => {
            callback();
            timer = 0
        }, 380) // 超时器能成功执行，说明是长按
    }

    target.ontouchmove = () => {
        clearTimeout(timer) // 如果来到这里，说明是滑动
        timer = 0
    }

    target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
        if (timer) {
            clearTimeout(timer)
        }
    }
}

addLongtabListener(box, popupMenu)



//导航栏js
// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标

  result <= 99 || (result = 99), (btn.innerHTML = result);
}

document.getElementById("page-name").innerText = document.title.split(" | 安知鱼")[0];

categoriesBarActive()
topCategoriesBarScroll()

//分类条
function categoriesBarActive(){
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/'){
    if (document.querySelector('#category-bar')){
      document.getElementById('首页').classList.add("select")
    }
  }else {
    // 验证是否是分类链接
    var pattern = /\/categories\/.*?\//;
    var patbool = pattern.test(urlinfo);
    console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#category-bar')){
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  }
  
}

//鼠标控制横向滚动
function topCategoriesBarScroll(){
  if (document.getElementById("category-bar-items")){
    let xscroll = document.getElementById("category-bar-items");
  xscroll.addEventListener("mousewheel", function (e) {
    //计算鼠标滚轮滚动的距离
    let v = -e.wheelDelta / 2;
    xscroll.scrollLeft += v;
    //阻止浏览器默认方法
    e.preventDefault();
}, false);
  }
}

//1
//2
//3
//日历插件js
//语言部分
var calLanguages = {
    ar: { // Arabic
      months: [
        'كانون الثاني', 'شباط', 'آذار', 'نيسان', 'مايو', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'
      ],
      dayOfWeekShort: [
        'ن', 'ث', 'ع', 'خ', 'ج', 'س', 'ح'
      ],
      dayOfWeek: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
    },
    ro: { // Romanian
      months: [
        'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
      ],
      dayOfWeekShort: [
        'Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'
      ],
      dayOfWeek: ['Duminică', 'Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']
    },
    id: { // Indonesian
      months: [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ],
      dayOfWeekShort: [
        'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'
      ],
      dayOfWeek: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    },
    is: { // Icelandic
      months: [
        'Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'
      ],
      dayOfWeekShort: [
        'Sun', 'Mán', 'Þrið', 'Mið', 'Fim', 'Fös', 'Lau'
      ],
      dayOfWeek: ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur']
    },
    bg: { // Bulgarian
      months: [
        'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
      ],
      dayOfWeekShort: [
        'Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
      ],
      dayOfWeek: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота']
    },
    fa: { // Persian/Farsi
      months: [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ],
      dayOfWeekShort: [
        'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
      ],
      dayOfWeek: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یک‌شنبه']
    },
    ru: { // Russian
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      dayOfWeekShort: [
        'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
      ],
      dayOfWeek: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    },
    uk: { // Ukrainian
      months: [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
      ],
      dayOfWeekShort: [
        'Ндл', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'
      ],
      dayOfWeek: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
    },
    en: { // English
      months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ],
      dayOfWeekShort: [
        'S', 'M', 'T', 'W', 'T', 'F', 'S'
      ],
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      postsMonthTip: 'Posts published in LMM yyyy',
      titleFormat: 'LMM yyyy'
    },
    el: { // Ελληνικά
      months: [
        'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
      ],
      dayOfWeekShort: [
        'Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'
      ],
      dayOfWeek: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
    },
    de: { // German
      months: [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
      ],
      dayOfWeekShort: [
        'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'
      ],
      dayOfWeek: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    },
    nl: { // Dutch
      months: [
        'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'
      ],
      dayOfWeekShort: [
        'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'
      ],
      dayOfWeek: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
    },
    tr: { // Turkish
      months: [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ],
      dayOfWeekShort: [
        'Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'
      ],
      dayOfWeek: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
    },
    fr: { //French
      months: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ],
      dayOfWeekShort: [
        'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'
      ],
      dayOfWeek: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
    },
    es: { // Spanish
      months: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      dayOfWeekShort: [
        'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
      ],
      dayOfWeek: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    },
    th: { // Thai
      months: [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ],
      dayOfWeekShort: [
        'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
      ],
      dayOfWeek: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์']
    },
    pl: { // Polish
      months: [
        'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
      ],
      dayOfWeekShort: [
        'nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'
      ],
      dayOfWeek: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
    },
    pt: { // Portuguese
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      dayOfWeekShort: [
        'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
      ],
      dayOfWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    },
    ch: { // Simplified Chinese
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
      ],
      dayOfWeekShort: [
        '日', '一', '二', '三', '四', '五', '六'
      ]
    },
    se: { // Swedish
      months: [
        'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'
      ]
    },
    kr: { // Korean
      months: [
        '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
      ],
      dayOfWeekShort: [
        '일', '월', '화', '수', '목', '금', '토'
      ],
      dayOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    },
    it: { // Italian
      months: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ],
      dayOfWeekShort: [
        'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'
      ],
      dayOfWeek: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    },
    da: { // Dansk
      months: [
        'January', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'July', 'August', 'September', 'Oktober', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'
      ],
      dayOfWeek: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
    },
    no: { // Norwegian
      months: [
        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
      ],
      dayOfWeekShort: [
        'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'
      ],
      dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
    },
    ja: { // Japanese
      months: [
        '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
      ],
      dayOfWeekShort: [
        '日', '月', '火', '水', '木', '金', '土'
      ],
      dayOfWeek: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜']
    },
    vi: { // Vietnamese
      months: [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
      ],
      dayOfWeekShort: [
        'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'
      ],
      dayOfWeek: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
    },
    sl: { // Slovenščina
      months: [
        'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'
      ],
      dayOfWeek: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota']
    },
    cs: { // Čeština
      months: [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
      ],
      dayOfWeekShort: [
        'Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'
      ]
    },
    hu: { // Hungarian
      months: [
        'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Va', 'Hé', 'Ke', 'Sze', 'Cs', 'Pé', 'Szo'
      ],
      dayOfWeek: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat']
    },
    az: { //Azerbaijanian (Azeri)
      months: [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
      ],
      dayOfWeekShort: [
        'B', 'Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş'
      ],
      dayOfWeek: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə']
    },
    bs: { //Bosanski
      months: [
        'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
      ],
      dayOfWeekShort: [
        'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'
      ],
      dayOfWeek: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
    },
    ca: { //Català
      months: [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
      ],
      dayOfWeekShort: [
        'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'
      ],
      dayOfWeek: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
    },
    'en-GB': { //English (British)
      months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
      ],
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    et: { //'Eesti'
      months: [
        'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'
      ],
      dayOfWeekShort: [
        'P', 'E', 'T', 'K', 'N', 'R', 'L'
      ],
      dayOfWeek: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev']
    },
    eu: { //Euskara
      months: [
        'Urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina', 'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua'
      ],
      dayOfWeekShort: [
        'Ig.', 'Al.', 'Ar.', 'Az.', 'Og.', 'Or.', 'La.'
      ],
      dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
    },
    fi: { //Finnish (Suomi)
      months: [
        'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
      ],
      dayOfWeekShort: [
        'Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'
      ],
      dayOfWeek: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai']
    },
    gl: { //Galego
      months: [
        'Xan', 'Feb', 'Maz', 'Abr', 'Mai', 'Xun', 'Xul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'
      ],
      dayOfWeekShort: [
        'Dom', 'Lun', 'Mar', 'Mer', 'Xov', 'Ven', 'Sab'
      ],
      dayOfWeek: ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado']
    },
    hr: { //Hrvatski
      months: [
        'Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'
      ],
      dayOfWeekShort: [
        'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'
      ],
      dayOfWeek: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subotagg']
    },
    ko: { //Korean (한국어)
      months: [
        '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
      ],
      dayOfWeekShort: [
        '일', '월', '화', '수', '목', '금', '토'
      ],
      dayOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    },
    lt: { //Lithuanian (lietuvių)
      months: [
        'Sausio', 'Vasario', 'Kovo', 'Balandžio', 'Gegužės', 'Birželio', 'Liepos', 'Rugpjūčio', 'Rugsėjo', 'Spalio', 'Lapkričio', 'Gruodžio'
      ],
      dayOfWeekShort: [
        'Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš'
      ],
      dayOfWeek: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis']
    },
    lv: { //Latvian (Latviešu)
      months: [
        'Janvāris', 'Februāris', 'Marts', 'Aprīlis ', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'
      ],
      dayOfWeekShort: [
        'Sv', 'Pr', 'Ot', 'Tr', 'Ct', 'Pk', 'St'
      ],
      dayOfWeek: ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena']
    },
    mk: { //Macedonian (Македонски)
      months: [
        'јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември'
      ],
      dayOfWeekShort: [
        'нед', 'пон', 'вто', 'сре', 'чет', 'пет', 'саб'
      ],
      dayOfWeek: ['Недела', 'Понеделник', 'Вторник', 'Среда', 'Четврток', 'Петок', 'Сабота']
    },
    mn: { //Mongolian (Монгол)
      months: [
        '1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'
      ],
      dayOfWeekShort: [
        'Дав', 'Мяг', 'Лха', 'Пүр', 'Бсн', 'Бям', 'Ням'
      ],
      dayOfWeek: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням']
    },
    'pt-BR': { //Português(Brasil)
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      dayOfWeekShort: [
        'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
      ],
      dayOfWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    },
    sk: { //Slovenčina
      months: [
        'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'
      ],
      dayOfWeek: ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota']
    },
    sq: { //Albanian (Shqip)
      months: [
        'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
      ],
      dayOfWeekShort: [
        'Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Shtu'
      ],
      dayOfWeek: ['E Diel', 'E Hënë', 'E Martē', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë']
    },
    'sr-YU': { //Serbian (Srpski)
      months: [
        'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
      ],
      dayOfWeekShort: [
        'Ned', 'Pon', 'Uto', 'Sre', 'čet', 'Pet', 'Sub'
      ],
      dayOfWeek: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota']
    },
    sr: { //Serbian Cyrillic (Српски)
      months: [
        'јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'
      ],
      dayOfWeekShort: [
        'нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'
      ],
      dayOfWeek: ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота']
    },
    sv: { //Svenska
      months: [
        'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'
      ],
      dayOfWeek: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
    },
    'zh-TW': { //Traditional Chinese (繁體中文)
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
      ],
      dayOfWeekShort: [
        '日', '一', '二', '三', '四', '五', '六'
      ],
      dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    },
    'zh-CN': { //Simplified Chinese (简体中文)
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
      ],
      dayOfWeekShort: [
        '日', '一', '二', '三', '四', '五', '六'
      ],
      dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      postsMonthTip: '查看yyyy年MM月的文章',
      titleFormat: 'yyyy年MM月'
    },
    he: { //Hebrew (עברית)
      months: [
        'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
      ],
      dayOfWeekShort: [
        'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
      ],
      dayOfWeek: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון']
    },
    hy: { // Armenian
      months: [
        'Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'
      ],
      dayOfWeekShort: [
        'Կի', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շբթ'
      ],
      dayOfWeek: ['Կիրակի', 'Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ']
    },
    kg: { // Kyrgyz
      months: [
        'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
      ],
      dayOfWeekShort: [
        'Жек', 'Дүй', 'Шей', 'Шар', 'Бей', 'Жум', 'Ише'
      ],
      dayOfWeek: [
        'Жекшемб', 'Дүйшөмб', 'Шейшемб', 'Шаршемб', 'Бейшемби', 'Жума', 'Ишенб'
      ]
    },
    rm: { // Romansh
      months: [
        'Schaner', 'Favrer', 'Mars', 'Avrigl', 'Matg', 'Zercladur', 'Fanadur', 'Avust', 'Settember', 'October', 'November', 'December'
      ],
      dayOfWeekShort: [
        'Du', 'Gli', 'Ma', 'Me', 'Gie', 'Ve', 'So'
      ],
      dayOfWeek: [
        'Dumengia', 'Glindesdi', 'Mardi', 'Mesemna', 'Gievgia', 'Venderdi', 'Sonda'
      ]
    },
    ka: { // Georgian
      months: [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
      ],
      dayOfWeekShort: [
        'კვ', 'ორშ', 'სამშ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'
      ],
      dayOfWeek: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
    },
  };
//日历部分
/**
 * Calendar - displays a calendar of the current month. Dates appear links if there are posts for that day.
 */
(function($) {
    var aCalendar = function(language, options, object) {
      var now = new Date();
      var nDay = now.getDate();
      var nMonth = now.getMonth();
      var nYear = now.getFullYear();
      var dDay = nDay;
      var dMonth = nMonth;
      var dYear = nYear;
      var instance = object;
      var allPosts = null;
      var months = null;
      /* Current month's posts */
      var current = {
        posts: [],
        prev: null,
        next: null
      };
      var currentLanguage = 'en';
  
      initLanguage(language);
  
      var settings = $.extend({}, $.fn.aCalendar.defaults, typeof calLanguages === 'undefined' ? {} : calLanguages[currentLanguage], options);
  
      if (settings.root[0] !== '/') {
        settings.root = '/' + settings.root;
      }
  
      if (settings.root[settings.root.length - 1] !== '/') {
        settings.root += '/';
      }
  
      /**
       * Initial language.
       */
      function initLanguage(key) {
        if (key && typeof calLanguages !== 'undefined' && calLanguages[key]) {
          currentLanguage = key;
        }
      }
  
      /**
       * Click handler for next month arrow button.
       */
      function nextMonth() {
        if (dMonth < 11) {
          dMonth++;
        } else {
          dMonth = 0;
          dYear++;
        }
  
        draw();
      };
  
      /**
       * Click handler for previous month arrow button.
       */
      function previousMonth() {
        if (dMonth > 0) {
          dMonth--;
        } else {
          dMonth = 11;
          dYear--;
        }
  
        draw();
      };
  
      /**
       * Click handler for navigating to a month if there are posts.
       */
      function toPostsMonth(date) {
        if (date) {
          dYear = date.getFullYear();
          dMonth = date.getMonth();
          draw();
        }
      }
  
      /**
       * Load current month's posts.
       */
      function loadPosts() {
        if (settings.single) {
          loadAllPosts();
        } else {
          loadPostsByMonth();
        }
      }
  
      /**
       * Load all month's posts.
       */
      function loadAllPosts() {
        if (settings.url != null && settings.url != '') {
          if (allPosts === null) {
            $.ajax({
              url: settings.url,
              async: false,
              success: function(data) {
                allPosts = data;
                initMonths(Object.keys(allPosts));
              }
            });
          }
  
          if (allPosts !== null) {
            if (parse()) {
              current.posts = allPosts[dYear + '-' + (dMonth + 1)];
            }
          }
        }
      }
  
      /**
       * Load posts by the month.
       */
      function loadPostsByMonth() {
        if (months === null) {
          $.ajax({
            url: settings.root + 'list.json',
            async: false,
            success: function(data) {
              initMonths(data);
            }
          });
        }
  
        if (parse()) {
          $.ajax({
            url: settings.root + dYear + '-' + (dMonth + 1) + '.json',
            async: false,
            success: function(data) {
              current.posts = data;
            }
          });
        }
      }
  
      /**
       * Initial months array.
       */
      function initMonths(array) {
        months = array.map(function(item) {
          var ym = item.split('-');
          return new Date(Date.UTC(+ym[0], +ym[1] - 1));
        });
      }
  
      /**
       * Parse posts month array, and set current.next and current.prev.
       *
       * @return if there are posts in this month, return true. ortherwise return false.
       */
      function parse() {
        var time = Date.UTC(dYear, dMonth);
  
        if (months === null || months.length === 0) {
          return false;
        }
  
        //If no posts in the current month, and before (or after) the current month yet not published articles, then the response to click previous month's (or next month's) event don't need to parse months array
        if (current.posts.length === 0 && (current.prev === null && current.next !== null && current.next.getTime() > time || current.next === null && current.prev !== null && current.prev.getTime() < time)) {
          return false;
        }
  
        current.posts = [];
  
        for (var i = 0; i < months.length; i++) {
          var cTime = months[i].getTime();
          if (time === cTime) {
            current.prev = i === 0 ? null : months[i - 1];
            current.next = i === months.length - 1 ? null : months[i + 1];
            return true;
          } else if (time < cTime) {
            current.prev = i === 0 ? null : months[i - 1];
            current.next = months[i];
            break;
          } else {
            current.prev = months[i];
            current.next = null;
          }
        }
  
        return false;
      }
  
      /**
       * Format date object.
       */
      function simpleDateFormat(date, fmt) {
        var o = {
          'LMM+': settings.months[date.getMonth()],
          'MM+': date.getMonth() + 1
        };
  
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
  
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (k === 'LMM+') ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
          }
        }
  
        return fmt;
      }
  
      /**
       * Draw calendar.
       *
       */
      function draw() {
        loadPosts();
        var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.weekOffset;
        if (dWeekDayOfMonthStart <= 0) {
          dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
        }
  
        var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
        var dLastDayOfPreviousMonth = new Date(dYear, dMonth, 0).getDate() - dWeekDayOfMonthStart + 1;
  
        var cHead = $('<div/>').addClass('cal-head');
        var cNext = $('<div/>');
        var cPrevious = $('<div/>');
        var cTitle = $('<div/>').addClass('cal-title');
        cPrevious.html(settings.headArrows.previous);
        cNext.html(settings.headArrows.next);
        curDate = new Date(Date.UTC(dYear, dMonth));
        if (current.posts.length === 0) {
          cTitle.html(simpleDateFormat(curDate, settings.titleFormat));
        } else {
          cTitleLink = $('<a/>').attr('href', simpleDateFormat(curDate, settings.titleLinkFormat))
            .attr('title', simpleDateFormat(curDate, settings.postsMonthTip))
            .html(simpleDateFormat(curDate, settings.titleFormat));
          cTitle.html(cTitleLink);
        }
  
        cPrevious.on('click', previousMonth);
        cNext.on('click', nextMonth);
  
        cHead.append(cPrevious);
        cHead.append(cTitle);
        cHead.append(cNext);
  
        var cBody = $('<table/>').addClass('cal');
  
        var dayOfWeek = settings.weekOffset;
        var cWeekHead = $('<thead/>');
        var cWeekHeadRow = $('<tr/>');
        for (var i = 0; i < 7; i++) {
          if (dayOfWeek > 6) {
            dayOfWeek = 0;
          }
  
          var cWeekDay = $('<th/>').attr('scope', 'col').attr('title', settings.dayOfWeek[dayOfWeek]);
          cWeekDay.html(settings.dayOfWeekShort[dayOfWeek]);
          cWeekHeadRow.append(cWeekDay);
          dayOfWeek++;
        }
  
        cWeekHead.append(cWeekHeadRow);
        cBody.append(cWeekHead);
  
        var cFoot = $('<tfoot/>');
        var cFootRow = $('<tr/>');
        var cPrevPosts = $('<td/>').attr('colspan', 3);
        var cPad = $('<td/>').html(' ');
        var cNextPosts = $('<td/>').attr('colspan', 3);
        if (current.prev) {
          cPrevPosts.html(settings.footArrows.previous + settings.months[current.prev.getMonth()])
            .addClass('cal-foot')
            .attr('title', simpleDateFormat(current.prev, settings.postsMonthTip));
        }
  
        if (current.next) {
          cNextPosts.html(settings.months[current.next.getMonth()] + settings.footArrows.next)
            .addClass('cal-foot')
            .attr('title', simpleDateFormat(current.next, settings.postsMonthTip));
        }
  
        cPrevPosts.on('click', function() {
          toPostsMonth(current.prev);
        });
  
        cNextPosts.on('click', function() {
          toPostsMonth(current.next);
        });
  
        cFootRow.append(cPrevPosts);
        cFootRow.append(cPad);
        cFootRow.append(cNextPosts);
        cFoot.append(cFootRow);
  
        var cMainPad = $('<tbody/>');
        var day = 1;
        var dayOfNextMonth = 1;
        for (var i = 0; i < 6; i++) {
          var cWeek = $('<tr/>');
          for (var j = 0; j < 7; j++) {
            var cDay = $('<td/>');
            if (i * 7 + j < dWeekDayOfMonthStart) {
              cDay.addClass('cal-gray');
              cDay.html(dLastDayOfPreviousMonth++);
            } else if (day <= dLastDayOfMonth) {
              if (day == dDay && nMonth == dMonth && nYear == dYear) {
                cDay.addClass('cal-today');
              }
  
              var count = {
                num: 0,
                keys: []
              };
              for (var k = 0; k < current.posts.length; k++) {
                var d = new Date(Date.parse(current.posts[k].date));
                if (d.getDate() == day) {
                  count.keys[count.num++] = k;
                }
              }
  
              if (count.num !== 0) {
                var index = count.keys[0];
                var cLink = $('<a>').attr('href', current.posts[index].link).attr('title', current.posts[index].title).html(day++);
                cDay.append(cLink);
              } else {
                cDay.html(day++);
              }
            } else {
              cDay.addClass('cal-gray');
              cDay.html(dayOfNextMonth++);
            }
  
            cWeek.append(cDay);
          }
  
          cMainPad.append(cWeek);
        }
  
        cBody.append(cWeekHead);
        cBody.append(cFoot);
        cBody.append(cMainPad);
  
        $(instance).html(cHead);
        $(instance).append(cBody);
      }
  
      return draw();
    };
  
    $.fn.aCalendar = function(Lang, oInit) {
      return this.each(function() {
        return aCalendar(Lang, oInit, $(this));
      });
    };
  
    // plugin defaults
    $.fn.aCalendar.defaults = {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dayOfWeekShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      postsMonthTip: 'Posts published in LMM yyyy',
      titleFormat: 'yyyy LMM',
      titleLinkFormat: '/archives/yyyy/MM/',
      headArrows: {previous: '<span class="cal-prev"></span>', next: '<span class="cal-next"></span>'},
      footArrows: {previous: '« ', next: ' »'},
      weekOffset: 0,
      single: true,
      root: '/calendar/',
      url: '/calendar.json'
    };
  
  }(jQuery));
  $(document).ready(function () {
    $("#calendar").aCalendar("zh-CN");
  });





