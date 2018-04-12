import { parseNRCString } from '../utils/utils';
import NattyDB from 'natty-db';


let pageConfig = {
    urlPrefix: 'http://localhost:8080/',
    method: 'GET'
};



let DBC = new NattyDB.Context({

    urlPrefix: pageConfig.urlPrefix,

    //修改全局请求为 POST (即pageConfig.method)，需要了就打开注释
    method: pageConfig.method,

    fit: (response) => {
        let ret = {};

        ret.success = !response.hasError;
        ret.content = response.content;

        if (!ret.success) {
            ret.error = response.errors[0];
        }
        return ret;
    },
    ignoreSelfConcurrent: true
}).on('reject', (reason) => {
    // 后端返回的msg字段的NCR方式转码的, 需要转换一下
    // &#{十进制} => &#x{16进制} => escape字符 => unescape=> 中文
    // Message.error(parseNRCString(reason.msg), 1);
    alert(reason.code + ':' + parseNRCString(reason.msg));
});

export default DBC;
