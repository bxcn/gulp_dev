#EditorConfig
> [EditorConfig](http://editorconfig.org) 帮助开发人员在使用不同的编辑器之间保持一致的编码风格

#Install
启动sublime编辑器并通过Package Control 安装EditorConfig

开始使用
打开[EditorConfig](http://editorconfig.org)网站查看EditorConfig使用文档


EditorConfig支持的属性

root
indent_style
indent_size
end_of_line
charset
trim_trailing_whitespace
insert_final_newline

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
