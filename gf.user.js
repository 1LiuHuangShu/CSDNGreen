// ==UserScript==
// @name         绿色纯净版CSDN-持续更新
// @namespace    CSDNGreen
// @version      0.0.51
// @description  绿色纯净版CSDN-持续更新,现仅支持🔥免登录复制
// @author       LiuHangShu
// @include      *://*.csdn.net/*
// @license      AGPL-3.0-or-later
// @note         24-1-11 0.0.51 jq-err
// ==/UserScript==

const version = "0.0.51";

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

function main() {
  copy();
  fullScreen();
  console.log("正在运行");
}
main();
