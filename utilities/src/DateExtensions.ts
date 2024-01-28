﻿interface Date {
    format(format?: string, weekDisplay?: WeekDisplay): string;
    addMillionSeconds(millionSeconds: number): Date;
    addSeconds(seconds: number): Date;
    addMinutes(minutes: number): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addMonths(months: number): Date;
    addYears(years: number): Date;
    dateOnly(): any;
    timeOnly(): any;
}
interface WeekDisplay {
    sun?: string;
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
}

Date.prototype.format = function (format?: string, weekDisplay: WeekDisplay = {}) {
    let o = {
        "M{1,2}": (this as Date).getMonth() + 1, //月份
        "d{1,2}": (this as Date).getDate(), //日
        "h{1,2}": (this as Date).getHours() % 12 == 0 ? 12 : (this as Date).getHours() % 12, //小时
        "H{1,2}": (this as Date).getHours(), //小时
        "m{1,2}": (this as Date).getMinutes(), //分
        "s{1,2}": (this as Date).getSeconds(), //秒
    };
    let w = {
        "0": weekDisplay.sun || "星期日",
        "1": weekDisplay.mon || "星期一",
        "2": weekDisplay.tue || "星期二",
        "3": weekDisplay.wed || "星期三",
        "4": weekDisplay.thu || "星期四",
        "5": weekDisplay.fri || "星期五",
        "6": weekDisplay.sat || "星期六"
    };
    const match_y = format.match(/(y+)/);//年
    (match_y) && (format = format.replace(match_y[0], (this as Date).getFullYear().toString().substring(4 - match_y[0].length)));
    const match_d = format.match(/(d{3,4})/);//星期
    (match_d) && (format = format.replace(match_d[0], w[(this as Date).getDay().toString()]));
    for (let k in o) {
        const match = format.match(`(${k})`);
        if (match) {
            let value = match[0].length === 1
                ? (o[k])
                : (`00${o[k]}`).substring(o[k].toString().length);
            format = format.replace(match[0], value);
        }
    }
    const match_f = format.match(/(f{1,3})/);//毫秒
    (match_f) && (format = format.replace(match_f[0], (this as Date).getMilliseconds().toString().substring(3 - match_f[0].length)));
    return format;
};
Date.prototype.addMillionSeconds = function (millionSeconds: number) {
    let date = new Date((this as Date).getTime());
    date.setMilliseconds(date.getMilliseconds() + millionSeconds);
    return date;
};
Date.prototype.addSeconds = function (seconds: number) {
    let date = new Date((this as Date).getTime());
    date.setSeconds((this as Date).getSeconds() + seconds);
    return date;
};
Date.prototype.addMinutes = function (minutes: number) {
    let date = new Date((this as Date).getTime());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};
Date.prototype.addHours = function (hours: number) {
    let date = new Date((this as Date).getTime());
    date.setHours(date.getHours() + hours);
    return date;
};
Date.prototype.addDays = function (days: number) {
    let date = new Date((this as Date).getTime());
    date.setDate(date.getDate() + days);
    return date;
};
Date.prototype.addMonths = function (months: number) {
    let date = new Date((this as Date).getTime());
    date.setMonth(date.getMonth() + months);
    return date;
};
Date.prototype.addYears = function (years: number) {
    let date = new Date((this as Date).getTime());
    date.setFullYear(date.getFullYear() + years);
    return date;
};
Date.prototype.dateOnly = function ()
{
    let format = 'yyyy-MM-dd';
    let o = {
        "M{1,2}": (this as Date).getMonth() + 1, //月份
        "d{1,2}": (this as Date).getDate(), //日
    };
    const match_y = format.match(/(y+)/);//年
    (match_y) && (format = format.replace(match_y[0], (this as Date).getFullYear().toString().substring(4 - match_y[0].length)));
    for (let k in o)
    {
        const match = format.match(`(${k})`);
        if (match)
        {
            let value = match[0].length === 1
                ? (o[k])
                : (`00${o[k]}`).substring(o[k].toString().length);
            format = format.replace(match[0], value);
        }
    }
    return format;
};
Date.prototype.timeOnly = function ()
{
    let format = 'HH:mm:ss';
    let o = {
        "H{1,2}": (this as Date).getHours(), //小时
        "m{1,2}": (this as Date).getMinutes(), //分
        "s{1,2}": (this as Date).getSeconds(), //秒
    };
    for (let k in o)
    {
        const match = format.match(`(${k})`);
        if (match)
        {
            let value = match[0].length === 1
                ? (o[k])
                : (`00${o[k]}`).substring(o[k].toString().length);
            format = format.replace(match[0], value);
        }
    }
    return format;
};