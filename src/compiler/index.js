// <div>hello {{name}} <span>world</span></div>
/*{
    tag: 'div',
    parent: null,
    type: 1,
    attr: [],
    children:[
    ]
}*/
/* 1、匹配标签名字 */
// 英文字符开头下划线,可有可无的‘-’
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
/* 2、匹配my:xxx */
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
/* 3、匹配开始标签 */
const startTagOpen = new RegExp(`^<${qnameCapture}`);
/* 4、匹配结束标签 */
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
/* 5、匹配属性 */
const attribute = /^\s*([^\s"'<>)/


function parseHTML(template){

}

export function compileToFunctions(template) {
  /* html模板 => render函数 */
  /* ast语法树可以描述js,css,dom  虚拟dom只能描述dom  */
  // 1、需要将html代码转换成“ast”语法树  可以用AST树来描述语言本身（描述代码的）
  // 前端必须要掌握的数据结构（树）
  let ast = parseHTML(template);

  // 2、通过AST语法树 重新反编译成代码
}
