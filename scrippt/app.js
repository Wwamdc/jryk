//创建app应用模块,依赖模块:控制器模块ctrls,路由模块
var yike = angular.module("yike",["ctrls","ngRoute"]);
/* 
调用run方法
该方法的作用是,当模块创建好之后就可以直接执行
 */
//该模块依赖的是根作用域,子作用域通常是与控制器绑定的
yike.run(["$rootScope",function($rootScope){    
    // alert("111");
    //给头部的标签绑定toggle方法
    //点击a标签,整个面板向右滑动,或者向左滑动
    $rootScope.head = false;
    $rootScope.toggle = function(){
        // alert("toggle");
        // if($rootScope.head){
        //     $rootScope.head = false;
        // }else{
        //     $rootScope.head = true;
        // }
        $rootScope.head = !$rootScope.head;
        //对导航栏所有的dd的移动进行设置
        //获取所有的dd
        var dd = document.querySelectorAll('dd');
        // console.log(dd);
        //遍历dd,将每个dd设置移动
        //当$cootScope.head的值为true时,向右移动,false时,不移动
        if($rootScope.head){//导航栏向右显示(位移量0)
            for(var i=0; i<dd.length; i++) {
                dd[i].style.transitionDuration = (i + 1) * 0.15 + 's';
                dd[i].style.transitionProperty = 'all';
                dd[i].style.transitionDelay = '0.2s';
                dd[i].style.transitionTimingFunction = 'ease-out';
                dd[i].style.transform = 'translate(0)';
            }
        }else{//位移量100%
            for(var i=dd.length - 1; i>=0; i--) {
                dd[i].style.transitionDuration = (dd.length - i + 1) * 0.05 + 's';
                dd[i].style.transitionProperty = 'all';
                dd[i].style.transitionDelay = '';
                dd[i].style.transitionTimingFunction = 'ease-out';
                dd[i].style.transform = 'translate(-100%)';
            }
        }
    }

}]);
//修复锚点值的改变
yike.config(["$locationProvider",function($locationProvider){
    $locationProvider.hashPrefix("");
}])
//配置路由
yike.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/",{
        redirectTo:"/index"//跳转到index处理
    }).when("/index",{
        templateUrl:"./views/list.html", //将要在ng-view区域显示的视图
        controller:"index" //调用index控制器
    }).when("/older",{
        templateUrl:"./views/list.html", //将要在ng-view区域显示的视图
        controller:"older" //调用older控制器
    }).when("/author",{
        templateUrl:"./views/author.html", //将要在ng-view区域显示的视图
        controller:"author" //调用author控制器
    }).when("/category",{
        templateUrl:"./views/category.html", //将要在ng-view区域显示的视图
        controller:"category" //调用category控制器
    }).when("/favourite",{
        templateUrl:"./views/favourite.html", //将要在ng-view区域显示的视图
        controller:"favourite" //调用favourite控制器
    }).when("/settings",{
        templateUrl:"./views/settings.html", //将要在ng-view区域显示的视图
        controller:"settings" //调用settings控制器
    })
}])