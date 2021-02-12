/*
<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName chainName">企业简称</div>--娃哈哈--
<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName shortId">人选编号</div>--123
<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName name">人选姓名</div>--王老五
<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName positionName">职位名称</div>--程序员鼓励师

=>

<chainName>--娃哈哈--
<shortId>--123
<name>--王老五
<positionName>--程序员鼓励师
*/
var str = `<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName chainName">企业简称</div>--娃哈哈--`
var strAll = `<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName chainName">企业简称</div>--娃哈哈--<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName shortId">人选编号</div>--123<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName name">人选姓名</div>--王老五<div data-v-378ba70e="" contenteditable="false" class="reporteTemplateName positionName">职位名称</div>--程序员鼓励师`

var reg = /<div(?:[^<>].)*class=['"]((?:.)*?)['"](?:[^<>].)*>((?:[^<>].)*)<\/div>/g

str.match(regAll)

// 反编译
var a = {};
'<aaa>--家乡<bbb>哈哈'.replace(/<(.*?)>((?:[^<].)*)/g, function (m, p1, p2) {
  a[p1] = p2;
  return m
})
