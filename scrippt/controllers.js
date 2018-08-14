//该js主要用于定义控制器
angular.module("ctrls",[])
.controller("navs",["$scope",function($scope){
    $scope.navs = [
        {link:"#/index",icon:"icon-home",text:"今日一刻"},
        {link:"#/older",icon:"icon-file-empty",text:"往期内容"},
        {link:"#/author",icon:"icon-pencil",text:"热门作者"},
        {link:"#/category",icon:"icon-menu",text:"栏目浏览"},
        {link:"#/favourite",icon:"icon-heart",text:"我的喜欢"},
        {link:"#/settings",icon:"icon-cog",text:"设置"}
    ]
}])
//创建index控制器
.controller("index",["$scope","$rootScope","$http","$filter",function($scope,$rootScope,$http,$filter){
    //模拟数据
    // $scope.msg = "控制器获取的index数据";
    //绑定num,判定被选中状态
    $rootScope.num = 0;
    //获取当前时间,今天的日期
    //绑定title,在标题栏显示相应的标题
    $rootScope.title = "今日一刻";
    var now = new Date();
    //格式化事件(2018-8-14)
    now = $filter("date")(now,"yyyy-M-d");
    $scope.now = now;
    //还未获取到数据,显示加载图片
    $rootScope.show = true;
    $http({
        url:"./api/index.php",
        params:{time:now}//传递参数
        //不能直接发送给服务器,会产生跨域问题
        //解决办法,从后台发送请求,获取数据
        // url:"https://moment.douban.com/api/stream/date/2017-5-11?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6"
        //success方法已经被淘汰,使用then方法替代
    }).then(function(result){
        // $scope.msg = result.data;
        //数据已经获取
        $rootScope.show = false;
        $scope.posts = result.data.posts;
        console.log(result.data.posts); 
    })  
}])
.controller("older",["$scope","$rootScope","$http","$filter",function($scope,$rootScope,$http,$filter){
    //模拟数据
    // $scope.msg = "控制器获取的older数据";
    $rootScope.num = 1;
    $rootScope.title = "往期内容";
    var now = new Date();
    now.setTime(now.getTime()-24*60*60*1000);
    now = $filter("date")(now,"yyyy-M-d");
    $scope.now = now;
    console.log(now);
    $rootScope.show = true;
    $http({
        url:"./api/index.php",
        params:{time:now}
    }).then(function(result){
        $rootScope.show = false;
        $scope.posts = result.data.posts;
        console.log(result.data.posts);
    })
}])
.controller("author",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
    //模拟数据
    // $scope.msg = "控制器获取的author数据";
    $rootScope.num = 2;
    $rootScope.title = "热门作者";
    $rootScope.show = true;
    $http({
        url:"./api/author.php"
    }).then(function(result){
        $rootScope.show = false;
        console.log(JSON.parse(result.data.tui).authors);
        console.log(JSON.parse(result.data.all).authors);
        $scope.put =JSON.parse(result.data.tui).authors;
        $scope.all = JSON.parse(result.data.all).authors;
    })
}])
.controller("category",["$scope","$rootScope",function($scope,$rootScope){
    //模拟数据
    // $scope.msg = "控制器获取的category数据";
    $rootScope.num = 3;
    $rootScope.title = "栏目浏览";
}])
.controller("favourite",["$scope","$rootScope",function($scope,$rootScope){
    //模拟数据
    // $scope.msg = "控制器获取的favourite数据";
    $rootScope.num = 4;
    $rootScope.title = "我的喜欢";
}])
.controller("settings",["$scope","$rootScope",function($scope,$rootScope){
    //模拟数据
    $scope.msg = "控制器获取的settings数据";
    $rootScope.num = 5;
    $rootScope.title = "设置";
}])