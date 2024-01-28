(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.liyanjie = global.liyanjie || {}, global.liyanjie.utilities = {})));
})(this, (function (exports) { 'use strict';

    Date.prototype.format = function (format, weekDisplay) {
        if (weekDisplay === void 0) { weekDisplay = {}; }
        var o = {
            "M{1,2}": this.getMonth() + 1, //月份
            "d{1,2}": this.getDate(), //日
            "h{1,2}": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H{1,2}": this.getHours(), //小时
            "m{1,2}": this.getMinutes(), //分
            "s{1,2}": this.getSeconds(), //秒
        };
        var w = {
            "0": weekDisplay.sun || "星期日",
            "1": weekDisplay.mon || "星期一",
            "2": weekDisplay.tue || "星期二",
            "3": weekDisplay.wed || "星期三",
            "4": weekDisplay.thu || "星期四",
            "5": weekDisplay.fri || "星期五",
            "6": weekDisplay.sat || "星期六"
        };
        var match_y = format.match(/(y+)/); //年
        (match_y) && (format = format.replace(match_y[0], this.getFullYear().toString().substring(4 - match_y[0].length)));
        var match_d = format.match(/(d{3,4})/); //星期
        (match_d) && (format = format.replace(match_d[0], w[this.getDay().toString()]));
        for (var k in o) {
            var match = format.match("(".concat(k, ")"));
            if (match) {
                var value = match[0].length === 1
                    ? (o[k])
                    : ("00".concat(o[k])).substring(o[k].toString().length);
                format = format.replace(match[0], value);
            }
        }
        var match_f = format.match(/(f{1,3})/); //毫秒
        (match_f) && (format = format.replace(match_f[0], this.getMilliseconds().toString().substring(3 - match_f[0].length)));
        return format;
    };
    Date.prototype.addMillionSeconds = function (millionSeconds) {
        var date = new Date(this.getTime());
        date.setMilliseconds(date.getMilliseconds() + millionSeconds);
        return date;
    };
    Date.prototype.addSeconds = function (seconds) {
        var date = new Date(this.getTime());
        date.setSeconds(this.getSeconds() + seconds);
        return date;
    };
    Date.prototype.addMinutes = function (minutes) {
        var date = new Date(this.getTime());
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    };
    Date.prototype.addHours = function (hours) {
        var date = new Date(this.getTime());
        date.setHours(date.getHours() + hours);
        return date;
    };
    Date.prototype.addDays = function (days) {
        var date = new Date(this.getTime());
        date.setDate(date.getDate() + days);
        return date;
    };
    Date.prototype.addMonths = function (months) {
        var date = new Date(this.getTime());
        date.setMonth(date.getMonth() + months);
        return date;
    };
    Date.prototype.addYears = function (years) {
        var date = new Date(this.getTime());
        date.setFullYear(date.getFullYear() + years);
        return date;
    };
    Date.prototype.dateOnly = function () {
        var format = 'yyyy-MM-dd';
        var o = {
            "M{1,2}": this.getMonth() + 1, //月份
            "d{1,2}": this.getDate(), //日
        };
        var match_y = format.match(/(y+)/); //年
        (match_y) && (format = format.replace(match_y[0], this.getFullYear().toString().substring(4 - match_y[0].length)));
        for (var k in o) {
            var match = format.match("(".concat(k, ")"));
            if (match) {
                var value = match[0].length === 1
                    ? (o[k])
                    : ("00".concat(o[k])).substring(o[k].toString().length);
                format = format.replace(match[0], value);
            }
        }
        return format;
    };
    Date.prototype.timeOnly = function () {
        var format = 'HH:mm:ss';
        var o = {
            "H{1,2}": this.getHours(), //小时
            "m{1,2}": this.getMinutes(), //分
            "s{1,2}": this.getSeconds(), //秒
        };
        for (var k in o) {
            var match = format.match("(".concat(k, ")"));
            if (match) {
                var value = match[0].length === 1
                    ? (o[k])
                    : ("00".concat(o[k])).substring(o[k].toString().length);
                format = format.replace(match[0], value);
            }
        }
        return format;
    };

    Number.prototype.plus = function (arg) {
        var r1, r2, m;
        try {
            r1 = this.toString().split('.')[1].length;
        }
        catch (ex) {
            r1 = 0;
        }
        try {
            r2 = arg.toString().split('.')[1].length;
        }
        catch (ex) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (this * m + arg * m) / m;
    };
    Number.prototype.minus = function (arg) {
        var r1, r2, m, n;
        try {
            r1 = this.toString().split('.')[1].length;
        }
        catch (ex) {
            r1 = 0;
        }
        try {
            r2 = arg.toString().split('.')[1].length;
        }
        catch (ex) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return Number(((this * m - arg * m) / m).toFixed(n));
    };
    Number.prototype.multipy = function (arg) {
        var m = 0, s1 = this.toString(), s2 = arg.toString();
        try {
            m += s1.split('.')[1].length;
        }
        catch (ex) { }
        try {
            m += s2.split('.')[1].length;
        }
        catch (ex) { }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    };
    Number.prototype.divide = function (arg) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = this.toString().split('.')[1].length;
        }
        catch (ex) { }
        try {
            t2 = arg.toString().split('.')[1].length;
        }
        catch (ex) { }
        r1 = Number(this.toString().replace('.', ''));
        r2 = Number(arg.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    };
    function __toCnNumber(number, uppercase) {
        switch (number.toString()) {
            case '0':
                return uppercase ? '零' : '〇';
            case '1':
                return uppercase ? '壹' : '一';
            case '2':
                return uppercase ? '贰' : '二';
            case '3':
                return uppercase ? '叁' : '三';
            case '4':
                return uppercase ? '肆' : '四';
            case '5':
                return uppercase ? '伍' : '五';
            case '6':
                return uppercase ? '陆' : '六';
            case '7':
                return uppercase ? '柒' : '七';
            case '8':
                return uppercase ? '捌' : '八';
            case '9':
                return uppercase ? '玖' : '九';
            case '10':
                return uppercase ? '拾' : '十';
            case '100':
                return uppercase ? '佰' : '百';
            case '1000':
                return uppercase ? '仟' : '千';
            case '10000':
                return '万';
            case '100000000':
                return '亿';
            case '1000000000000':
                return '兆';
            case '10000000000000000':
                return '京';
            case '100000000000000000000':
                return '垓';
            case '1e+24':
                return '秭';
            case '1e+28':
                return '穰';
            case '1e+32':
                return '沟';
            case '9.999999999999999e+35':
                return '涧';
            case '1e+40':
                return '正';
            case '1e+44':
                return '载';
            case '1e+48':
                return '极';
        }
    }
    Number.prototype.toCn = function (outputType) {
        if (outputType === void 0) { outputType = 'number'; }
        outputType = outputType.toLowerCase();
        var number = this;
        var numberString = this.toString();
        var s = '';
        if (numberString[0] == '-') {
            s += '负';
            number = Math.abs(number);
        }
        var unit = function (i, currency) {
            return currency
                ? i < 3 ? '角分厘'[i] : ''
                : i < 7 ? '分釐毫丝忽微纤'[i] : '';
        }, processLong = function (number, currency) {
            var sb = '';
            var zeroFlag = false; //输出0
            if (number > 1) {
                var l = number;
                for (var i = 12; i >= 0; i--) {
                    var level = Math.pow(10000, i);
                    //console.log('level=' + level);
                    if (number >= level) {
                        l = number % level;
                        number = Math.trunc(number / level);
                        //console.log('l=' + l + ',number=' + number);
                        if (number > 19) {
                            var j = 1000;
                            while (number % (j * 10) >= 1) {
                                var tmp = Math.trunc(number / j);
                                //console.log(',tmp=' + number);
                                if (tmp != 0) {
                                    sb += __toCnNumber(tmp, currency);
                                    if (j > 1)
                                        sb += __toCnNumber(j, currency);
                                    zeroFlag = true;
                                }
                                else if (zeroFlag) {
                                    sb += __toCnNumber(0, currency);
                                    zeroFlag = false;
                                }
                                if (j == 1)
                                    break;
                                number %= j;
                                j = j / 10;
                            }
                        }
                        else if (number >= 10) {
                            sb += __toCnNumber(10, currency);
                            if (number % 10 > 0) {
                                sb += __toCnNumber(number % 10, currency);
                                zeroFlag = true;
                            }
                        }
                        else
                            sb += __toCnNumber(number, currency);
                        if (level > 1)
                            sb += __toCnNumber(level, currency);
                    }
                    number = l;
                }
            }
            else
                sb += __toCnNumber(number, currency);
            return sb;
        }, processDecimal = function (decimal, currency) {
            var sb = '';
            var zeroFlag = false; //输出0
            for (var i = 0; i < decimal.length; i++) {
                var d = parseInt(decimal[i]);
                if (d > 0) {
                    sb += __toCnNumber(d, currency);
                    sb += unit(i, currency);
                    zeroFlag = true;
                }
                else if (decimal.length > i + 1 && zeroFlag) {
                    sb += __toCnNumber(0, currency);
                    zeroFlag = false;
                }
            }
            return sb;
        };
        var int = Math.trunc(number);
        switch (outputType) {
            case 'number':
                s += processLong(int, false);
                break;
            case 'currency':
                s += processLong(int, true);
                break;
            case 'digit':
                var s_ = int.toString();
                for (var i = 0; i < s_.length; i++) {
                    s += __toCnNumber(parseInt(s_[i]), false);
                }
                break;
        }
        var dec, index = numberString.indexOf('.');
        if (index > 0)
            dec = numberString.substring(index + 1);
        if (dec) {
            switch (outputType) {
                case 'number':
                    s += '又';
                    break;
                case 'currency':
                    s += '圆';
                    break;
                case 'digit':
                    s += '点';
                    break;
            }
            switch (outputType) {
                case 'number':
                    s += processDecimal(dec, false);
                    break;
                case 'currency':
                    s += processDecimal(dec, true);
                    break;
                case 'digit':
                    for (var i = 0; i < dec.length; i++) {
                        s += __toCnNumber(parseInt(dec[i]), false);
                    }
                    break;
            }
        }
        else if (outputType == 'currency')
            s += '圆';
        return s;
    };

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    let getRandomValues;
    const rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

    function validate(uuid) {
      return typeof uuid === 'string' && REGEX.test(uuid);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    const byteToHex = [];

    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).slice(1));
    }

    function unsafeStringify(arr, offset = 0) {
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
    }

    const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var native = {
      randomUUID
    };

    function v4(options, buf, offset) {
      if (native.randomUUID && !buf && !options) {
        return native.randomUUID();
      }

      options = options || {};
      const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return unsafeStringify(rnds);
    }

    var NIL = '00000000-0000-0000-0000-000000000000';

    /**
     * Guid
     */
    var Guid = /** @class */ (function () {
        function Guid(input) {
            this._uuid = NIL;
            if (input && typeof (input) === 'string' && validate(input))
                this._uuid = input;
            else
                this._uuid = NIL;
        }
        /**
         * 返回一个值，该值指示 Guid 的两个实例是否表示同一个值
         * @param other
         * @returns
         */
        Guid.prototype.equals = function (other) {
            if (typeof other === 'string')
                return this._uuid === other;
            else
                return this.format() === other.format();
        };
        /**
         * 返回 Guid 类的此实例值的 String 表示形式。
         * 根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
         * N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         * D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
         * B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
         * P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
         * @param format
         * @returns
         */
        Guid.prototype.format = function (format) {
            if (format) {
                switch (format) {
                    case 'N':
                        return this._uuid.replace(/-/g, '');
                    case 'D':
                        return this._uuid;
                    case 'B':
                        return "{".concat(this._uuid, "}");
                    case 'P':
                        return "(".concat(this._uuid, ")");
                    default:
                        throw new Error("Parameter “format” must be one of N|D|B|P]");
                }
            }
            else
                return this._uuid;
        };
        Guid.parse = function (input) {
            if (validate(input))
                return new Guid(input);
            else
                return undefined;
        };
        /**
         * 初始化 Guid 类的一个新实例
         */
        Guid.newGuid = function () {
            return new Guid(v4());
        };
        /**
         * Guid 字符串：“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”
         * @returns
         */
        Guid.newGuidStr = function () {
            return v4();
        };
        /**
         * Guid 类的默认实例，其值保证均为零
         */
        Guid.empty = new Guid();
        /**
         * Guid 空字符串：“00000000-0000-0000-0000-000000000000”
         */
        Guid.emptyStr = NIL;
        return Guid;
    }());

    exports.Guid = Guid;

}));
//# sourceMappingURL=liyanjie.utilities.js.map
