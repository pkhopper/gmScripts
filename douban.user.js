// ==UserScript==
// @name        douban
// @namespace   https://github.com/pkhopper/gmScripts/raw/master/douban.user.js
// @include     http://*.douban.com/*
// @include     http://*.quora.com/*
// @include     https://github.com/*
// @grant       none
// @version     0.1.1
// ==/UserScript==

var bcolor = "#E8D098";
var fcolor = "#111111";

// set comments background color
function douban () {
    document.body.style.background=bcolor; 
    var lis = document.body.getElementsByClassName("clearfix comment-item");
    for (var i = lis.length - 1; i >= 0; i--) {
        lis[i].style.background=bcolor;
    }
    var nav= document.body.getElementsByClassName("nav-wrap");
    if (nav){
        nav[0].style.background=bcolor;
    }
    // 改变小组推荐的位置
    article=document.getElementsByClassName("article");
    if (article) {
        article = article[0];
        gb=document.getElementsByClassName("group-board")[0];
        gt=document.getElementById("group-topics");
        article.insertBefore(gt, gb);
        // 话题搜索提前
        gt.insertBefore(gt.getElementsByClassName("group-topic-search")[0],gt.childNodes[0]);
    };
}


hostname = document.location.hostname

if (hostname.indexOf('github.com') >= 0) {
    document.body.style.background=bcolor; 
    var nav = document.body.getElementsByClassName("header header-logged-in true");
    if (nav){
        nav[0].style.background=bcolor;
    }
}

if (hostname.indexOf('douban.com') >= 0)  {
    douban();
}

if （hostname.indexOf('quora.com') >= 0）{
    document.body.style.background=bcolor; 
}

// if (hostname.indexOf('facebook.com') >= 0)  {
//     document.body.style.background=bcolor; 
//     var fb = document.getElementById("contentCol");
//     if (fb) {
//         fb.style.background=bcolor;
//     }
// }


