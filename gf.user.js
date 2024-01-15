// ==UserScript==
// @name         绿色纯净版CSDN-持续更新
// @namespace    CSDNGreen
// @version      0.0.52
// @description  绿色纯净版CSDN-持续更新,现支持🔥免登录复制🔥沉浸式阅读
// @author       LiuHangShu
// @include      *://*.csdn.net/*
// @license      AGPL-3.0-or-later
// @note         24-1-11 0.0.51 jq-err
// @note         24-1-15 0.0.52 沉浸式阅读
// ==/UserScript==

const version = " 0.0.52";

function copy() {
  try {
    if (typeof $ == "undefined") {
      console.log("jQuery is not loaded");
      return;
    }
    // 免登录复制
    $(".hljs-button").removeClass("signin");
    $(".hljs-button").addClass("{2}");
    $(".hljs-button").attr("data-title", "免登录复制");
    $(".hljs-button").attr(
      "onclick",
      "hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '免登录复制');},3500);"
    );
    $("#content_views").unbind("copy");
    // 去除剪贴板劫持
    $("code").attr("onclick", "mdcp.copyCode(event)");
    try {
      Object.defineProperty(window, "articleType", {
        value: 0,
        writable: false,
        configurable: false,
      });
    } catch (err) {}
    try {
      unsafeWindow.csdn.copyright.init("", "", "");
    } catch (_err) {}
    console.log("copy fn run success");
  } catch (err) {
    $$("*").forEach((item) => {
      item.oncopy = (e) => e.stopPropagation();
    });
    console.log("copy fn run error");
  }
}

function fullScreen() {
  $(".blog_container_aside").remove();
  $("main").css("width", "100%");
  $(".csdn-side-toolbar").remove();
  console.log("fullScreen fn run success");
}

function remove() {
  // 登录
  const loginModal = $(".passport-login-container");
  // 红包
  const redpackModal = $("#csdn-redpack");
  const iframe = $("iframe");
  const toolBarBox = $(".more-toolbox-new");
  const blogHuaweiyunAdvert = $("#blogHuaweiyunAdvert");
  const blogColumnPayAdvert = $("#blogColumnPayAdvert");
  const recommendNps = $("#recommendNps");
  const recommendBox = $(".recommend-box");
  const articleInfoBox = $(".article-info-box");
  const adverts1 = $(".J_adv");
  const adverts2 = $(".feed-fix-box");

  const elements = [
    loginModal,
    redpackModal,
    iframe,
    toolBarBox,
    blogHuaweiyunAdvert,
    blogColumnPayAdvert,
    adverts1,
    adverts2,
    recommendNps,
    recommendBox,
    articleInfoBox,
  ];

  let timer = setInterval(function () {
    const clear = elements.every((item) => !item.length);
    if (clear) {
      clearInterval(timer);
    }
    elements.forEach((item) => {
      item && item.remove();
    });
  }, 500);
}

// #mainBox #csdn-copyright-footer

function main() {
  copy();
  fullScreen();
  remove();
  console.log("正在运行");
}
main();
