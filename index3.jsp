<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <style>
        .container {
            display: flex;
            flex-direction: column;
        }

        .shopCar {

            display: flex;
            align-items: center;
        }

        .shopping {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

        }

        .shopping div {
            text-align: center;
        }

        .shopping div img {
            display: block;
            width: 120px;
            height: 150px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class='shopCar'>
            <img src="file:///E:/eclipse新/Servlet4_1/shop.PNG" />
            <a href="../Shopping.view" title="点击查看购物车" id='count'></a>
        </div>


        <div class='shopping'>
            <div>
                <img src="file:///E:/eclipse新/Servlet4_1/java.PNG" />
                <span><a href="">采购此书</a></span>
            </div>
            <div>
                <img src="file:///E:/eclipse新/Servlet4_1/javaNote.PNG" />
                <span><a href="">采购此书</a></span>
            </div>
            <div>
                <img src="file:///E:/eclipse新/Servlet4_1/c.PNG" />
                <span><a href="">采购此书</a></span>
            </div>
        </div>
        <script>
            var count = 0;
            countEl = document.getElementById('count');
            countEl.innerText = '已采购' + count + '本书籍'
        </script>
</body>

</html>