gulp配置参数及文件说明
==================================
* .npmignore 用于忽略您 不想提交到npm上的文件或文件夹
* .gitignore 用于忽略你不想提交到Git上的文件或文件夹
* .gitattribute 指定非文本文件的对比合并方式
* .babelrc ES转码工具 ES6转成ES5
* .bowerrc bower安装目录
* _config.yml 生成github pages访问页面的配置

* sass最终输出的样式包括下面几种样式风格：
* 嵌套输出方式 nested
* 展开输出方式 expanded 
* 紧凑输出方式 compact 
* 压缩输出方式 compressed

CSS Lint默认规则
==================================
* 不要使用多个class选择元素，如a.foo.boo，这在ie6及以下不能正确解析
* 移除空的css规则，如a{}
* 正确的使用显示属性，如display:inline不要和width，height，float，margin,padding同时使用，display:inline-block不要和float同时使用等
* 避免过多的浮动，当浮动次数超过十次时，会显示警告
* 避免使用过多的字号，当字号声明超过十种时，显示警告
* 避免使用过多web字体，当使用超过五次时，显示警告
* 避免使用id作为样式选择器
* 标题元素只定义一次
* 使用width:100%时要小心
* 属性值为0时不要写单位
* 各浏览器专属的css属性要有规范，例如.foo{-moz-border-radius:5px;border-radius:5px}
* 避免使用看起来像正则表达式的css3选择器
* 遵守盒模型规则

JSHint
==================================
* JSHint 主要用来检查代码质量以及找出一些潜在的代码缺陷。

gulp-jscs 
==================================
* gulp-jscs 主要是用来检查JS代码风格


ESLint 主要有以下特点
==================================
* 默认规则包含所有 JSLint、JSHint中存在的规则，易迁移；
* 规则可配置性高：可设置「警告」、「错误」两个 error 等级，或者直接禁用；
* 包含代码风格检测的规则（可以丢掉 JSCS 了）；
* 支持插件扩展、自定义规则。




 
