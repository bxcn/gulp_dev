#EditorConfig
> [EditorConfig](http://editorconfig.org) 帮助开发人员在使用不同的编辑器之间保持一致的编码风格

#Install
启动sublime编辑器并通过Package Control 安装EditorConfig

#开始使用
打开[EditorConfig](http://editorconfig.org)网站查看EditorConfig使用文档


#EditorConfig支持的属性

root: 表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件。

indent_style: 设置缩进风格，tab或者空格。tab是hard tabs，space为soft tabs。

indent_size: 缩进的宽度，即列数，整数。如果indent_style为tab，则此属性默认为tab_width。

tab_width: 设置tab的列数。默认是indent_size。

end_of_line： 换行符，lf、cr和crlf

charset： 编码，latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用utf-8-bom。

trim_trailing_whitespace： 设为true表示会除去换行行首的任意空白字符。

insert_final_newline: 设为true表明使文件以一个空白行结尾


属性的解释说明请查看[EditorConfig](http://editorconfig.org)网站


#配置文件案例

*推荐的默认设置*

```ini
# editorconfig.org
root = true

[*]
indent_style = tab
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

#技巧

EditorConfig 代码片段


