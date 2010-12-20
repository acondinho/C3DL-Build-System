/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
var scripts = document.getElementsByTagName("script");
var parts = scripts[scripts.length - 1].src.split("/");
parts.pop();
var basePath = parts.join("/");
var head = document.getElementsByTagName("head")[0];
