#  一、事件修饰符

## 1.1、`@click.stop`

阻止事件传播

## 1,2、`@submit.prevent`

阻止浏览器默认行为，标题是阻止表单提交

## 1.3、`@click.capture`

事件传播捕获模式，即先出发自身事件，然后向内部传播

## 1.4、`@click.self`

e.target是本身时才触发

## 1.5、`@click.once`

事件只会触发一次

## 1.6、`scroll.passive`

滚动立即触发，不会等待事件完成，**可以提升移动端性能**，不能与prevent连用

