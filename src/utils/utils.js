// 解析后端错误信息
export const parseNRCString = (string) => {
    if (!string) {
        return '未知异常';
    }
    return unescape(string.replace(/&#(\d{5})/g, function (all, match) {
        return '&#x' + Number(match).toString(16);
    }).replace(/&#x/g, '%u').replace(/;/g, ''));
};

// 获取url中的参数
export const getUrlParam = (key) => {
    let search = window.location.search;
    //通过 url 传过来的字符串会被编码，这里解码
    let arr = !search ? [] : decodeURIComponent(window.location.search).substr(1).split('&');
    let param = {};
    for (let i = 0, l = arr.length; i < l; i++) {
        let kv = arr[i].split('=');
        param[kv[0]] = kv[1];
    }
    return key ? (param[key] || '') : param;
};
