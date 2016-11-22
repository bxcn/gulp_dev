// jquery jscs validate Rules
{
  {
    ////////////////////////////////////////
    //                                    //
    // Options                            //
    //                                    //
    ////////////////////////////////////////
    //"additionalRules": "jquery",
    // 使用jquery验证规则
    "preset": "jquery",
    // 排除文件
    "excludeFiles": ["node_modules/**"],
    "fileExtensions": [".js"],

    ////////////////////////////////////////
    //                                    //
    // Extras                             //
    //                                    //
    ////////////////////////////////////////
    // 最大线长度
    // "maximumLineLength": {"allowComments": false, "allowRegex": true, "allowUrlComments": true, "tabSize": 4, "value": 80}, // Unused
    "safeContextKeyword": ["that"],
    // 设置缩进2个字符
    "validateIndentation": 2,
    "validateJSDoc": {
      "checkParamNames": true,
      "checkRedundantParams": false,
      "requireParamTypes": true
    },
    //设置验证换行
    //"validateLineBreaks": "LF",
    // 设置字符串用单引号
    "validateQuoteMarks": "'",

    ////////////////////////////////////////
    //                                    //
    // Rules - just disallow              //
    //                                    //
    ////////////////////////////////////////
    // "disallowDanglintUnderscores": true, // Unused
    "disallowEmptyBlocks": true,
    "disallowImplicitTypeConversion": ["boolean", "numeric", "string"],
    "disallowKeywords": ["with"],
    "disallowMixedSpacesAndTabs": true,

    // 不允许多个换行
    "disallowMultipleLineBreaks": true,

    // 不允许多行字符串
    "disallowMultipleLineStrings": true,
    // "disallowQuotedKeysInObjects": "allButReserved", // Unused

    //设置在每一行JS语句的尾随不能有空格字符
    "disallowTrailingWhitespace": true,

    ////////////////////////////////////////
    //                                    //
    // Rules - just require               //
    //                                    //
    ////////////////////////////////////////
    // "requireAlignedObjectValues": "ignoreLineBreak", // Unused
    // "requireBlocksOnNewline": true, // Unused

    // 需要大写的构造函数
    "requireCapitalizedConstructors": true,

    // 在以下关键字后需要大括号
    "requireCurlyBraces": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch", "finally"],

    // 设置使用点符号 如  window.a = 1;
    "requireDotNotation": true,

    // 在文件的最后一行加一个空白行 true:验证 false：不验证
    "requireLineFeedAtFileEnd": false,

    // 设置在以下操作前不能断行
    "requireOperatorBeforeLineBreak": ["?", "/", "*", "+", "-", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
    "requireParenthesesAroundIIFE": true,

    ////////////////////////////////////////
    //                                    //
    // Rules - disallow or require        //
    //                                    //
    ////////////////////////////////////////
    "disallowKeywordsOnNewLine": ["else, catch, finally"],
    "disallowSpaceAfterPrefixUnaryOperators": ["++", "--", "+", "-", "~", "!"],
    "disallowSpaceBeforePostfixUnaryOperators": ["++", "--"],

    // 设置不允许在数组内前后加上空格 true:[a, b, c]
    "disallowSpacesInsideArrayBrackets": false,

    // 设置不允许在对象内前后加上空格 true:｛a:1,b:2｝
    "disallowSpacesInsideObjectBrackets": false,

    // 设置不允许在括号内前后加上空格 true:(a, b, c)
    "disallowSpacesInsideParentheses": false,

    // 禁止尾随逗号
    "disallowTrailingComma": true,
    "disallowYodaConditions": true,

    // 设置 一个var声明多个变量;
    "requireMultipleVarDecl": "onevar",

    // 需要骆驼的情况或大写标识符
    "requireCamelCaseOrUpperCaseIdentifiers": true,

    // 设置断行（换行）之前需要逗号
    "requireCommaBeforeLineBreak": true,

    // "requirePaddingNewlinesInBlocks": 1, // Unused

    // 设置关键词后需要空间
    "requireSpaceAfterKeywords": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch", "function"],
    // "requireSpaceAfterLineComment": true, // Unused

    // 设置对象键值对":"前后要加空格 
    "requireSpaceAfterObjectKeys": true,

    // 设置在二元运算符之后需要空格
    "requireSpaceAfterBinaryOperators": ["?", "/", "*", "+", "-", "=", "==", "===", "!=", "!==", ">", "<", ">=", "<="],

    // 设置在二元运算符之前需要空格
    "requireSpaceBeforeBinaryOperators": ["?", "/", "*", "+", "-", "=", "==", "===", "!=", "!==", ">", "<", ">=", "<="],

    // 设置块语句之前需要空格
    "requireSpaceBeforeBlockStatements": true,

    // 设置要求匿名函数表达式中的空格 beforeOpeningRoundBrace：开圆括号前 beforeOpeningCurlyBrace：大括号前
    "requireSpacesInAnonymousFunctionExpression": {
      "beforeOpeningRoundBrace": true,
      "beforeOpeningCurlyBrace": true
    },

    // 条件表达式的需要空格
    "requireSpacesInConditionalExpression": {
      "afterTest": true,
      "beforeConsequent": true,
      "afterConsequent": true,
      "beforeAlternate": true
    },
    // 需要函数空间：就是在函数名前加加空格，在｛前加空格 
    "requireSpacesInFunction": {
      "beforeOpeningRoundBrace": true,
      "beforeOpeningCurlyBrace": true
    }, // Available in 1.5.8, gulp-jscs uses 1.4.3

    // 在函数声明()前验证要有空格
    "requireSpacesInFunctionDeclaration": {
      "beforeOpeningRoundBrace": true,
      "beforeOpeningCurlyBrace": true
    },
    "requireSpacesInFunctionExpression": {
      "beforeOpeningRoundBrace": true,
      "beforeOpeningCurlyBrace": true
    },

    // 在命名函数表达式中需要空格
    "requireSpacesInNamedFunctionExpression": {
      "beforeOpeningRoundBrace": true,
      "beforeOpeningCurlyBrace": true
    }
  }

  "requireCurlyBraces": [
    "if",
    "else",
    "for",
    "while",
    "do",
    "try",
    "catch"
  ],
  "requireOperatorBeforeLineBreak": true,
  "requireParenthesesAroundIIFE": true,
  "requireCommaBeforeLineBreak": true,
  "requireCamelCaseOrUpperCaseIdentifiers": true,
  "requireDotNotation": {
    "allExcept": ["snake_case"]
  },
  "requireSpacesInForStatement": true,
  "requireSpaceBetweenArguments": true,
  "maximumLineLength": {
    "value": 100,
    "tabSize": 4,
    "allExcept": ["urlComments", "regex"]
  },
  "validateQuoteMarks": {
    "mark": "\"",
    "escape": true
  },

  "disallowMixedSpacesAndTabs": "smart",
  "disallowTrailingWhitespace": true,
  "disallowMultipleLineStrings": true,
  "disallowTrailingComma": true,
  "disallowSpaceBeforeComma": true,
  "requireSpaceAfterComma": true,

  "requireSpaceBeforeBlockStatements": true,
  "requireSpacesInFunctionExpression": {
    "beforeOpeningCurlyBrace": true
  },
  "requireSpacesInsideParentheses": "all",
  "requireSpaceAfterKeywords": [
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "return",
    "try",
    "catch"
  ],
  "requireSpacesInsideObjectBrackets": "all",
  "requireSpacesInsideBrackets": true,
  "requireSemicolons": true,
  "requireSpacesInConditionalExpression": true,
  "requireSpaceAfterBinaryOperators": true,
  "requireLineFeedAtFileEnd": true,
  "requireSpaceBeforeBinaryOperators": [
    "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
    "&=", "|=", "^=", "+=",

    "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&",
    "|", "^", "&&", "||", "===", "==", ">=",
    "<=", "<", ">", "!=", "!=="
  ],
  "requireSpacesInAnonymousFunctionExpression": {
    "beforeOpeningCurlyBrace": true
  },
  "requireSpacesInNamedFunctionExpression": {
    "beforeOpeningCurlyBrace": true
  },
  "requirePaddingNewLinesBeforeLineComments": true,
  "requireCapitalizedComments": {
    "inlined": true
  },
  "validateLineBreaks": "LF",

  "disallowKeywords": ["with"],
  "disallowKeywordsOnNewLine": ["else"],
  "disallowSpacesInFunctionExpression": {
    "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInNamedFunctionExpression": {
    "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInAnonymousFunctionExpression": {
    "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInCallExpression": true,
  "disallowSpaceAfterObjectKeys": true,
  "disallowSpaceAfterPrefixUnaryOperators": true,
  "disallowSpaceBeforePostfixUnaryOperators": true,
  "disallowSpaceBeforeBinaryOperators": [",", ":"],
  "disallowMultipleLineBreaks": true
}
