if( !window.console ){
    window.console = {
        log: function(){}
    }
}


require(['jquery'],function(){
    /* 
     * jsui tab切换
     * ====================================================
    */
    jsui.bd = $('body')
    jsui.is_signin = jsui.bd.hasClass('logged-in') ? true : false;
    jsui.roll = [3, 4, 5]

    if( $('.widget-nav').length ){
        $('.widget-nav li').each(function(e){
            $(this).hover(function(){
                $(this).addClass('active').siblings().removeClass('active')
                $('.widget-navcontent .item:eq('+e+')').addClass('active').siblings().removeClass('active')
            })
        })
    }


/* 
 * lazyload
 * ====================================================
*/
if ($('.avatar:eq(2)').data('src') || $('.thumb:first').data('src') || $('.widget_ui_posts .thumb:first').data('src') || $('.wp-smiley:first').data('src')) {
        require(['lazyload'], function() {
            // $('.avatar').lazyload({
            //     data_attribute: 'src',
            //     placeholder: jsui.uri + '/img/avatar-default.png',
            //     threshold: 400
            // })

            $('.thumb').lazyload({
                data_attribute: 'src',
                placeholder: jsui.uri + '/images/thumbnail.jpg',
                threshold: 400
            })

            // $('.widget_ui_posts .thumb').lazyload({
            //     data_attribute: 'src',
            //     placeholder: jsui.uri + '/img/thumbnail.png',
            //     threshold: 400
            // })

            // $('.wp-smiley').lazyload({
            //     data_attribute: 'src',
            //     // placeholder: jsui.uri + '/img/thumbnail.png',
            //     threshold: 400
            // })
        })
    }


    /* 
     * prettyprint
     * ====================================================
    */
    $('pre').each(function(){
        if( !$(this).attr('style') ) $(this).addClass('prettyprint')
    })

    if( $('.prettyprint').length ){
        require(['prettyprint'], function(prettyprint) {
            prettyPrint()
        })
    }

    /* 
     * single 右侧固定
     * ====================================================
    */
    if (jsui.bd.hasClass('single')) {
        require(['bootstrap'], function(bootstrap) {
            var _sidebar = $('.sidebar')
            if (_sidebar) {
                var h1 = 15,
                    h2 = 30
                var rollFirst = _sidebar.find('.widget:eq(' + (jsui.roll[0] - 1) + ')')
                var sheight = rollFirst.height()

                rollFirst.on('affix-top.bs.affix', function() {
                    rollFirst.css({
                        top: 0
                    })
                    sheight = rollFirst.height()

                    for (var i = 1; i < jsui.roll.length; i++) {
                        var item = jsui.roll[i] - 1
                        var current = _sidebar.find('.widget:eq(' + item + ')')
                        current.removeClass('affix').css({
                            top: 0
                        })
                    };
                })

                rollFirst.on('affix.bs.affix', function() {
                    rollFirst.css({
                        top: h1
                    })

                    for (var i = 1; i < jsui.roll.length; i++) {
                        var item = jsui.roll[i] - 1
                        var current = _sidebar.find('.widget:eq(' + item + ')')
                        current.addClass('affix').css({
                            top: sheight + h2
                        })
                        sheight += current.height() + 15
                    };
                })

                rollFirst.affix({
                    offset: {
                        top: _sidebar.height(),
                        bottom: $('.footer').outerHeight()
                    }
                })


            }
        })
    }

    /* 
     * rollbar
     * ====================================================
    */
    jsui.rb_comment = ''
    if (jsui.bd.hasClass('comment-open')) {
        //jsui.rb_comment = "<li><a href=\"javascript:(scrollTo('#comments',-15));\"><i class=\"fa fa-comments\"></i></a><h6>去评论<i></i></h6></li>"
        jsui.rb_comment = ""

    }

    jsui.bd.append('\
        <div class="m-mask"></div>\
        <div class="rollbar"><ul>'
        +jsui.rb_comment+
        '<li><a href="javascript:(scrollTo());"><i class="fa fa-angle-up"></i></a><h6>去顶部<i></i></h6></li>\
        </ul></div>\
    ')

    var scroller = $('.rollbar')
    $(window).scroll(function() {
        document.documentElement.scrollTop + document.body.scrollTop > 200 ? scroller.fadeIn() : scroller.fadeOut();
    })


    /* 
     * sign 登陆tip
     * ====================================================
    */
    if (!jsui.bd.hasClass('logged-in')) {
        require(['signpop'], function(signpop) {
            signpop.init()
        })
    }



    /* 
     * page u
     * ====================================================
    */
    if (jsui.bd.hasClass('page-template-pagesuser-php')) {
        require(['user'], function(user) {
            user.init()
        })
    }

    //上一篇 下一篇 提示
        require(['bootstrap'], function (){
            $(function () { $("[data-toggle='tooltip']").tooltip(); });
        })


    /* 
     * baidushare
     * ====================================================
    */
    if( $('.bdsharebuttonbox').length ){

        if ($('.article-content').length) $('.article-content img').data('tag', 'bdshare')

        window._bd_share_config = {
            common: {
                "bdText": '',
                "bdMini": "2",
                "bdMiniList": false,
                "bdPic": '',
                "bdStyle": "0",
                "bdSize": "24"
            },
            share: [{
                // "bdSize": 12,
                //开启伪静态 报错 改写绝对路径
                bdCustomStyle: 'http://www.kuwuya.com/themes/daqianduan/Public/assets/css/share.css'
            }]/*,
            slide : {    
                bdImg : 4,
                bdPos : "right",
                bdTop : 200
            },
            image: {
                tag: 'bdshare',
                "viewList": ["qzone", "tsina", "weixin", "tqq", "sqq", "renren", "douban"],
                "viewText": " ",
                "viewSize": "16"
            },
            selectShare : {
                "bdContainerClass":'article-content',
                "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
            }*/
        }

        with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
    }

    //=============================================
    $.fn.serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

})






/* functions
 * ====================================================
 */
function scrollTo(name, add, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top + (add || 0)
            }, speed)
        }
    }
}


function is_name(str) {
    return /.{3,20}$/.test(str)
}
function is_url(str) {
    return /^((http|https)\:\/\/)([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(str)
}
function is_qq(str) {
    return /^[1-9]\d{4,13}$/.test(str)
}
function is_mail(str) {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(str)
}



function strToDate(str, fmt) { //author: meizz   
    if( !fmt ) fmt = 'yyyy-MM-dd hh:mm:ss'
    str = new Date(str*1000)
    var o = {
        "M+": str.getMonth() + 1, //月份   
        "d+": str.getDate(), //日   
        "h+": str.getHours(), //小时   
        "m+": str.getMinutes(), //分   
        "s+": str.getSeconds(), //秒   
        "q+": Math.floor((str.getMonth() + 3) / 3), //季度   
        "S": str.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (str.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



