import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  /* 打包入口 */
  input:'./src/index.js',
  /* 打包出口 */
  output:{
    format: 'umd',              /* 模块化类型 */
    name: 'Vue',                /* 挂载全局变量名称 */
    file: 'dist/umd/vue.js',    /* 打包出口文件 */
    sourcemap: true,            /* 源码映射 */
  },
  /* 插件 */
  plugins: [
      babel({
        exclude: 'node_modules/**'  /* 该文件夹下所有文件不进行转译 */
      }),
      serve({
        open: true,
        port: 8866,
        contentBase: '',             /* 启动服务的文件相对路径,空字符串默认当前路径 */
        openPage:'/index.html'
      })
  ]
}
