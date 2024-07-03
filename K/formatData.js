﻿/*
* 格式化字符串
*/
function formatStr(value, emptyValue) {
    if (!emptyValue && emptyValue != '') {
        emptyValue = emptyValue || "--";
    }

    if (!value && value!=0) {
        return emptyValue;
    }

    return value;
}

/*
* 格式化股票名称
*/
function formatStockName(value, suffix, emptyValue) {
    if (!suffix && suffix != '') {
        suffix = suffix || "...";
    }

    value = formatStr(value, emptyValue);
    if (value.length > 8) {
        return "<span title=\""+value+"\">"+value.substr(0, 8) + suffix+"</span>";
    } else {
        return value;
    }
}

/*
* 股票名称是否超长
*/
function isStockNameOver(list, field) {
    if (list && field && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][field] && list[i][field].length > 8) {
                return true;
            }
        }
    }
    return false;
}

/*
* 保留小数
*/
function toFixed(value, point, emptyValue) {
    if (!point && point != 0) {
        point = getFormatPoint(value);
    }

    if (!emptyValue && emptyValue != '') {
        emptyValue = emptyValue || "--";
    }
    if (!value && value!=0) {
        return emptyValue;
    }
    value = parseFloat(value);
    if (isNaN(value)) {
        return emptyValue;
    }

    if (point == 1) {
        value = Number((value * 1e1).toFixed(0)) / 1e1;
    } else if (point == 2) {
        value = Number((value * 1e2).toFixed(0)) / 1e2;
    } else if (point == 3) {
        value = Number((value * 1e3).toFixed(0)) / 1e3;
    } else if (point == 4) {
        value = Number((value * 1e4).toFixed(0)) / 1e4;
    }
    return value.toFixed(point);
}

/*
* 转换为日期
*/
function toDateTime(value) {
    var date;
    if (!isNaN(Number(value))) { //时间戳
        date = new Date(parseInt(value));
    }
    else {
        value = value.replace(/-/g, '/').replace(/\.\d+/, '').replace(/T/g, ' ');
        date = new Date(value);
    }
    return date;
}

/*
* 格式化日期
*/
function formatDate(value, fmt, emptyValue) {
    fmt = fmt || 'yyyy-MM-dd';
    if (!emptyValue && emptyValue != '') {
        emptyValue = emptyValue || "--";
    }
    try {
        var thisDate = toDateTime(value);
        if (thisDate == 'Invalid Date' || thisDate.getFullYear() == '9999') {
            return emptyValue;
        }
        var weekDay = ["日", "一", "二", "三", "四", "五", "六"];
        var o = {
            "M+": thisDate.getMonth() + 1, //月份
            "d+": thisDate.getDate(), //日
            "h+": thisDate.getHours(), //小时
            "m+": thisDate.getMinutes(), //分
            "s+": thisDate.getSeconds(), //秒
            "q+": Math.floor((thisDate.getMonth() + 3) / 3), //季度
            "S": thisDate.getMilliseconds(), //毫秒
            "W": '周' + weekDay[thisDate.getDay()] //周
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    } catch (e) {
        return emptyValue;
    }
}

/*
* 格式化金额
*/
function formatMoney(value, point, emptyValue) {
    if (!emptyValue && emptyValue != '') {
        emptyValue = emptyValue || "--";
    }
    if (!value && value!=0) {
        return emptyValue;
    }
    value = parseFloat(value);
    if (isNaN(value)) {
        return emptyValue;
    }

    var unit = '';
    if (Math.abs(value) >= 1e12) {
        value = value / 1e12;
        unit = "万亿";
    } else if (Math.abs(value) >= 1e8) {
        value = value / 1e8;
        unit = "亿";
    } else if (Math.abs(value) > 1e4) {
        value = value / 1e4;
        unit = "万";
    }
    if (!point && point != 0) {
        point = getFormatPoint(value);
    }
    return toFixed(value, point, emptyValue) + unit;
}

/*
* 获取小数位
*/
function getFormatPoint(value) {
    value = Math.abs(value);
    var point = 2;
    if (value >= 1000)
        point = 0;
    else if (value >= 100)
        point = 1;
    else if (value >= 10)
        point = 2;
    else
        point = 3;

    return point;
}

/*
* 格式化百分比
*/
function formatPercent(value, unit, emptyValue) {
    if (!unit && unit != '') {
        unit = '%';
    }
    if (!emptyValue && emptyValue != '') {
        emptyValue = emptyValue || "--";
    }
    if (!value && value!=0) {
        return emptyValue;
    }
    value = parseFloat(value);
    if (isNaN(value)) {
        return emptyValue;
    }

    if (Math.abs(value) >= 10000 * 100) {
        return toFixed(value / 1e6, 2) + "万倍";
    } else if (Math.abs(value) >= 100 * 100) {
        return toFixed(value / 100, 2) + "倍";
    } else
        return toFixed(value, 2) + unit;
}

function formatNumber(value, point, emptyValue) {
    if (!emptyValue && emptyValue != '') {
        emptyValue = emptyValue || "--";
    }

    value = Number(value);
    if (!value)
        return "--";

    var unit = '';
    if (Math.abs(value) >= 1e12) {
        value = value / 1e12;
        unit = "万亿";
    } else if (Math.abs(value) >= 1e8) {
        value = value / 1e8;
        unit = "亿";
    } else if (Math.abs(value) > 1e4) {
        value = value / 1e4;
        unit = "万";
    }
    if (!point && point != 0) {
        point = getFormatPoint(value);
    }
    return toFixed(value, point, emptyValue) + unit;
}

function formatNumToLocaleStr(value, point) {
    var temp = Number(value);
    if (!temp)
        return "--";

    if (!point && point != 0) {
        point = 2;
    }

    temp = toFixed(temp, point);  //数字转换为字符 
    var str = Number(temp).toLocaleString();
    if (temp.indexOf('.') > 0) {
        str = str.split('.')[0];
        str += temp.substr(temp.indexOf('.'));
    }
    return str;
}

function formatRate(value) {
    var temp = Number(value);
    if (!temp)
        return "--";

    return "<span>" + toFixed(temp, 2) + "%</span>";
}

var autocount = 0;
function hideEmptyRow(tableid) {
    var table = document.getElementById(tableid);
    if (!table || table.rows.length == 0)
        return;

    for (var i = 0; i < table.rows.length; i++) {
        if (i <= 0)
            continue;

        var row = table.rows[i];

        if (row.children.length <= 1)
            continue;

        //删除空行
        var length = row.children.length;
        length = length > 9 ? 9 : length;
        var show = false;

        for (var j = 1; j < length; j++) {
            var text = row.children[j].innerText.replace(/\s/g, '');
            if (text != "--" && text!='0.000') {
                show = true;
                break;
            }
        }

        if (!show) {
            row.hidden = !show;
            row.style.display = "none";
        }

        if (!row.children[0].children || row.children[0].children.length != 2)
            continue;

        //根据父级是否展示，设置展示方式
        var index = 1;
        var isHaveBro = false;
        while (i - index >= 0
            && table.rows[i - index].children.length > 0
            && table.rows[i - index].children[0].children.length > 0) {
            if (table.rows[i - index].children[0].children.length == 2) {
                if (table.rows[i - index].hidden) {
                    //兄弟节点隐藏，继续向上查找
                    index++;
                }
                else {
                    //兄弟节点显示，继续向上查找，并记录
                    index++;
                    isHaveBro = true;
                }
            }
            else {
                if (table.rows[i - index].hidden) {
                    //父级节点隐藏
                    if (index == 1) {
                        //如果只有根节点，不显示'其中'
                        row.children[0].children[0].style.display = "";
                        row.children[0].children[1].style.display = "none";
                    }
                }
                else {
                    //父级节点显示，无兄弟节点显示'其中:'
                    if (!isHaveBro && index != 1) {
                        row.children[0].children[0].style.display = "none";
                        row.children[0].children[1].style.display = "";
                    }
                }

                break;
            }
        }
        //if (i != 0 && table.rows[i - 1].hidden) {
        //    row.children[0].children[0].style.display = "none";
        //    row.children[0].children[1].style.display = "";
        //}
    }

    //定位
    autocount++;
    if (autocount <= 3)
        AutoScroll();
}

/*
* 获取行情延时参数
*/
function getHQDelayParam() {
    var uid = ""; // 用户uid
    var utype = 0; // 用户组织类型
    var ptype = 0; // 通行证类型
    var ttype = 0; // 用户交易类型
    var appType = "web"; // 终端名称

    uid = getCookie("uid");
    if (!uid) {
        uid = getCookie("uidal");
        if (uid) {
            uid = uid.substring(0, 16);
        }
    }

    var oversea = getCookie("OverseaVerify");
    if (oversea == '1') {
        utype = 2;
    } else if (oversea == '2') {
        utype = 1;
    }

    var umobphoneregion = getCookie("umobphoneregion");
    var mtp = getCookie("mtp");
    if (mtp == '2' || umobphoneregion == '2') {
        ptype = 2;
    } else if (mtp == '1' || umobphoneregion == '1') {
        ptype = 1;
    }

    var web_usr_addinfo = getCookie("web_usr_addinfo");
    if (web_usr_addinfo) {
        web_usr_addinfo = JSON.parse(decodeURIComponent(web_usr_addinfo));
        if (web_usr_addinfo && web_usr_addinfo.CName) {
            appType = web_usr_addinfo.CName;
        }
    }

    return "wbp2u=" + uid + "|" + utype + "|" + ptype + "|" + ttype + "|" + appType;
}

/*****
* 获取cookie
*******/
function getCookie(a) {
    var b = document.cookie.match(new RegExp(a + "=([^;]*)"));
    return b != null ? unescape(b[1]) : null;
}

/*****
* 设置cookie
*******/
function setCookie(a, b, c) {
    if (c) {
        var d = new Date();
        d.setTime(d.getTime() + c * 24 * 3600 * 1000);
        document.cookie = a + "=" + escape(b) + ";path=/" + ";expires=" + d.toUTCString() + ";";
    } else {
        document.cookie = a + "=" + escape(b) + ";path=/;";
    }
}
