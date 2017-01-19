var getRole = function(str){
    return str.substring(0, 2);
};
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1154271301336492',
        xfbml      : true,
        version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
function cattegoriesBind(a){
    var result = [];
    var index = 0;
    for(var i=0;i<a.length;i++){
        if(a[i].parent_id == null){
            result.push({group:a[i],items:[]});
            for(var j=0;j<a.length;j++){
                if(a[j].parent_id == a[i].id){
                    result[index].items.push(a[j]);
                }
            }
            index++;
        }
    }
    return result;
}
function date2String(date) {
    var month = parseInt(date.getMonth())+1;
    return date.getFullYear()+'-'+month+'-'+date.getDate();
}
function string2Date(str){
    return new Date(Date.parse(str));
}
function getAvatar(str) {
    if(str.indexOf("http") > -1){
        return str;
    }
    return SERVER_ASSETS + 'upload/avatar/' + str;
}

function aliasConvert(string) {

    var result="";

    var str1 ="aá|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ"; //a
    var str2 ="AÁ|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ";//A
    var str3 ="dđ"; //d
    var str4 ="DĐ"; //D
    var str5 ="eé|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ";//e
    var str6 ="EÉ|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ";//E
    var str7 ="ií|ì|ỉ|ĩ|ị";//i
    var str8 ="IÍ|Ì|Ỉ|Ĩ|Ị";//I
    var str9 ="oó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ";//o
    var str10 ="OÓ|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ";//O
    var str11 ="uú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự";//u
    var str12 ="UÚ|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự";//U
    var str13 ="yý|ỳ|ỷ|ỹ|ỵ";//y
    var str14 ="YÝ|Ỳ|Ỷ|Ỹ|Ỵ";//Y
    var str15 ="- ";//-



    for(var i=0;i<string.length;i++)
    {
        if(str1.indexOf(string[i])>=0) result=result.concat("a");
        else  if(str2.indexOf(string[i])>=0) result=result.concat("A");
        else  if(str3.indexOf(string[i])>=0) result=result.concat("d");
        else  if(str4.indexOf(string[i])>=0) result=result.concat("D");
        else  if(str5.indexOf(string[i])>=0) result=result.concat("e");
        else  if(str6.indexOf(string[i])>=0) result=result.concat("E");
        else  if(str7.indexOf(string[i])>=0) result=result.concat("i");
        else  if(str8.indexOf(string[i])>=0) result=result.concat("I");
        else  if(str9.indexOf(string[i])>=0) result=result.concat("o");
        else  if(str10.indexOf(string[i])>=0) result=result.concat("O");
        else  if(str11.indexOf(string[i])>=0) result=result.concat("u");
        else  if(str12.indexOf(string[i])>=0) result=result.concat("U");
        else  if(str13.indexOf(string[i])>=0) result=result.concat("y");
        else  if(str14.indexOf(string[i])>=0) result=result.concat("Y");
        else  if(str15.indexOf(string[i])>=0) result=result.concat("-");
        else  result=result.concat(string[i]);
    }
    return result;
}

function findIteminObjectbyAlias(object,item) {
    if(object.alias==item){
        var result = {};
        result.title = object.title;
        result.id = object.id;
        result.parent_id = object.parent_id;
        result.alias = object.alias;
        return result;
    }
    for (var i = 0; i < object.childs_node.length; i++)
    {
        if (object.childs_node[i].alias == item) {
            var result = {};
            result.title = object.childs_node[i].title;
            result.id = object.childs_node[i].id;
            result.parent_id = object.childs_node[i].parent_id;
            result.alias = object.childs_node[i].alias;
            return result;
        } else if (object.childs_node[i].childs_node.length) return findItembyAlias(object.childs_node[i].childs_node,item);
    }
}
function findItembyAlias(object,item) {
    for(var i=0;i<object.length;i++){
        var result = findIteminObjectbyAlias(object[i],item);
        if(result!=undefined) return result;
    }
}
function findIteminObject(object,item) {
    if(object.id==item){
        var result = {};
        result.title = object.title;
        result.id = object.id;
        result.parent_id = object.parent_id;
        result.alias = object.alias;
        return result;
    }
    for (var i = 0; i < object.childs_node.length; i++)
    {
        if (object.childs_node[i].id == item) {
            var result = {};
            result.title = object.childs_node[i].title;
            result.id = object.childs_node[i].id;
            result.parent_id = object.childs_node[i].parent_id;
            result.alias = object.childs_node[i].alias;
            return result;
        }else if (object.childs_node[i].childs_node.length) return findItem(object.childs_node[i].childs_node,item);
    }
}
function findItem(object,item) {
    for(var i=0;i<object.length;i++){
        var result = findIteminObject(object[i],item);
        if(result!=undefined) return result;
    }
}

function changStatus(item,status) {
    if(item.childs.length){
        for(var i=0;i< item.childs.length;i++)
        {
            item.childs[i].status = status;
            if(item.childs[i].childs.length) changStatus(item.childs[i],status);
        }
    }
}
