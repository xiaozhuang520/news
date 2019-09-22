<template>
	<!-- template最外层只能包含一个标签 -->
  	<router-view></router-view>
	  
</template>

<script>
// 必须暴露一个对象，对象是组件的配置
export default {
	data(){
		return {
		
		}
	}
}
</script>

<style>
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
@import url('../node_modules/vant/lib/index.css');
/* 项目页面初始化文件 */
/*清除内外边距  */
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
p,
ul,
li,
ol,
dl,
dt,
dd,
img,
input {
    margin: 0;
    padding: 0;
}
/*让所有斜体 不倾斜*/
em,
i {
    font-style: normal;
}
/*去掉列表前面的小点*/
li {
    list-style: none;
}
/*图片没有边框   去掉图片底侧的空白缝隙*/
img {
    border: 0;  /*ie6*/
    vertical-align: middle;
}
/*让button 按钮 变成小手*/
button {
    cursor: pointer;
}
/*取消链接的下划线*/
a {
    color: #666;
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

button,
input {
    font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, \\5B8B\4F53, sans-serif;
    border: none;
    outline: none;
}

.hide,
.none {
    display: none;
}
</style>
