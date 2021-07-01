less.js
------

- 变量
- 混合
- 嵌套
- 运算
- 转译
- 函数
- 命名空间和访问符
- 映射
- 作用域
- 注释
- 导入

## 变量
```css
   @width:1px;
   .element{
       width:@width
   }
   /*
   less.js的变量不紧可以作为属性值，还可以作为选择器名称，属性名称，URL，@import值
   */ 
   //选择器
   @my-variable:"element"
   .@{my-variable}{
       font-weight:"bold"
   }
   //属性名称
   .element{
       @{my-variable}:"attr-value"
   }
   //URL
   .element{
       background-image:url("@{my-variable}/apple-png")
   }
   //@import值
   @import "@{my-variable}/index.css"
   
   //$prop
   .element{
       color:"red";
       background-color:$color
   }
   =>
   .element{
       color:"red";
       background-color:"red"
   }
```
 *注释*：$prop会在查询当前域下最后一次定义的属性，所以最好不要使用父级属性
## 混合
```css
   .border{
       border:solid 1px red;
   }
   .element{
       .border();
   }
```
## 嵌套
```css
    .element{
        div{
            border:solid 1px red;
        }
        &:hover{
            background-color:green;
        }
    }
    //&:父级选择器
    .element{
        .box{
            border:solid 1px red;
            .menu &{
                background-color:red;
            }
        }
    }
    =>
    .element .box{
        border:solid 1px red;
    }
    .menu .element .box{
        background-color:red;
    }
```
## extend
扩展是一个较少的伪类，它将选择器合并它被配置为与其引用的引用相匹配的选择器
```css
   .border{
       border:solid 1px red
   }
   .element{
       &:extend(.border)
   }
   =>
   .element,.border{
       border:solid 1px red
   }
```
## 运算
```css
   //运算操作符包括 + - * / , + - 操作符可以进行单位的转换，* /操作符不进行单位的转换，当两个单位不同时视为无效，因为当一个长度乘以一个长度的时候，会得到一个区域，而css是不支持区域的
   .element{
       border:solid 1px+6px red;
       color:#222222/2
   }
   //calc特例：calc() 并不对数学表达式进行计算，但是在嵌套函数中会计算变量和数学公式的值
   .element{
       @var: 50vh/2;
       width: calc(50% + (@var - 20px));//结果是 calc(50% + (25vh - 20px))
   }
```
## 转译
```css
    @min800:~"(min-width:800px)" //或者：@min800:(min-width:800px)
    .element{
        @media @min800{
            border:1px red solid;
        }
    }
```
## 函数
[less.js](https://less.bootcss.com/functions/#string-functions "less官方文档")

## 命名空间和访问符
[less.js](https://less.bootcss.com "less官方文档")
## 映射
```css
    #colors(){
        color:red
    }
    .element{
        color:#colors[color]
    }
```
## 作用域
先在本地查找相关变量，然后再在父级查找相关变量，且无需先声明变量再使用，可以将变量声明在使用元素之后
## 注释
* 块注释
```css
   /* 
     块注释
   */
```
* 行注释
```css
   //行注释
```

## 导入
```css
   @import "library"; 
   // 若后缀名为.less,则可以省略
```

Flex布局
------
Flex布局是什么?
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，不管是行内元素还是块元素，都可以指定为flex布局，块元素使用：display:flex 行内元素使用：display:inline-flex 当浏览器的内核为webkit时，需要在前面加上-webkit-flex,将元素定义为flex布局之后，该元素被称为flex容器，简称“容器”，该元素里面的子元素被成为flex项目，简称“项目”，当元素被指定为flex容器以后，会产生两条轴，水平的主轴和垂直的交叉轴，主轴的开始位置叫做main start，结束位置叫做main end，交叉轴的开始位置叫做cross start，交叉轴的结束位置叫做cross end，单个项目占据的主轴空间叫做main size，单个项目占据的交叉轴空间叫做cross size

## 容器属性
- flex-direction
    * row | row-reverse
    * column | column-reverse</br>
**该属性决定主轴的方向**
- flex-wrap
    * nowap 
    * warp | warp-reverse</br>
**该属行决定容器内的项目是否换行以及换行方式**
- flex-flow
    * 默认值：row nowarp</br>
**该属性是flex-direction和flex-warp的简写**
- justify-content
    * flex-start 
    * flex-end
    * center
    * space-between
    * space-around</br>
**该属性决定容器内的项目在主轴上的对其方式**
- align-items
    * flex-start
    * flex-end
    * center
    * baseline
    * stretch</br>
**该属性决定容器内的项目在交叉轴上的对其方式**
- align-content
    * flex-start
    * flex-end
    * center
    * space-between
    * space-around
    * stretch</br>
**该属性定义多个轴线的对齐方式，如果项目只有一根轴线，该属性不起作用**

## 项目的属性
- order</br>
**该属性定义项目的排列顺序，数值越小，排的越前**
- flex-grow</br>
**属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大**
- flex-shrink</br>
**flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小，如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小**
- flex-basis</br>
**flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小**
- flex</br>
**flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选，该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)**
- align-self</br>
**align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch**

