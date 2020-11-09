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
/* 2、匹配命名空间标签 my:xxx */
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
/* 3、匹配开始标签 <tag */
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
/* 4、匹配结束标签 */
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
/* 5、匹配属性 */
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
/* 6、匹配胡子语法 */
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/;

/* 匹配开始标签 */
function matchStartTag() {

}
/* 匹配结束标签 */
function matchEndTag() {

}
/* 匹配文本 */
function matchChars() {

}





function parseHTML(html){
  /* 根据正则匹配,匹配成功删除对应长度,直到字符串为空 */
  while(html){
    /* 获取第一个字符判断是否是标签*/
    let textEnd = html.indexOf('<');
    if( textEnd == 0){
      console.log('开始');
      parseStartTag()
      break;
    }
  };
  /* 解析完前进字符串 */
  function advance(n) {
    html = html.substring(n)
  }
  /* 解析开头标签 */
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if(start){
      const match = {
        tagName: start[1],
        attr: []
      }
      advance(start[0].length)
      console.log(html);
    }
  }
}

export function compileToFunctions(template) {
  /* html模板 => render函数 */
  /* ast语法树可以描述js,css,dom  虚拟dom只能描述dom  */
  // 1、需要将html代码转换成“ast”语法树  可以用AST树来描述语言本身（描述代码的）
  // 前端必须要掌握的数据结构（树）
  let ast = parseHTML(template);

  // 2、通过AST语法树 重新反编译成代码
}
