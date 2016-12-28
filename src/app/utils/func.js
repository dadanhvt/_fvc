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
