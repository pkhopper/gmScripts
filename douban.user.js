// ==UserScript==
// @name        douban
// @namespace   https://github.com/pkhopper/gmScripts/raw/master/douban.user.js
// @include     http://*.douban.com/*
// @grant       none
// @version     0.1.2
// ==/UserScript==

// set comments background color
function douban () {   
    var bcolor = "#E8D098";
    
    // 改变页面元素颜色
    document.body.style.background=bcolor; 
    var comment_items = $(".clearfix comment-item");
    if ( comment_items ){
        for (i=0; i < comment_items.length; i++) {
            comment_items[i].style.background=bcolor;
        }
    }
    
    var nav= document.body.getElementsByClassName("nav-wrap");
    if (nav){
        nav[0].style.background=bcolor;
    }
    
    // 小组页面调整
    gt = document.getElementById("group-topics");
    if (gt) { 
        // 改变小组推荐的位置
        article = document.getElementsByClassName("article");
        gb = document.getElementsByClassName("group-board");
        if (article && article.length > 0 && gb && gb.length > 0) {
            article[0].insertBefore(gt, gb[0]);
        };
    	// 话题搜索提前
        gt.insertBefore(gt.getElementsByClassName("group-topic-search")[0],gt.childNodes[0]);
    }
    
    
    // comments倒序
    var cnodes = $("#comments");
    if (cnodes && cnodes.length > 0){
        var comments = $("#comments")[$("#comments").length-1];
        for (i=1; i<comments.children.length; i++) {
            comments.insertBefore(comments.children[i], comments.children[0]);
        }
    }
}

douban();
