window.addEventListener("load",function () {
    // 拿到设备的高度；
    var JD=new jd();
    JD.getHeight();
    JD.left();
    JD.right();

  })

var jd=function () {  };
jd.prototype={
  getHeight:function () {
    setHeight();
    window.addEventListener("resize",setHeight)
    function setHeight() {
      // 拿到顶部header的高度；
      var headerH=document.querySelector("#header").offsetHeight;
      // console.log(headerH);

      // 拿到屏幕的高度；处理兼容；
      var mobilePhoneH=document.body.offsetHeight || document.documentElement.offsetHeight;
      
      // console.log(mobilePhoneH);
      // 左侧 跟右测的高度；
      var containerH=mobilePhoneH-headerH;
      // console.log(containerH);

      document.querySelector("#container .category-left").style.height=containerH+"px";
      document.querySelector("#container .category-right").style.height=containerH+"px";
  }
    },
  left:function () {
      // 找到左侧盒子；
      var leftUl=document.querySelector(".category-left ul");
      // 左侧ul的高度；
      leftUlHeight=leftUl.offsetHeight;
      // 符合子的高度;
      var leftHight=document.querySelector(".category-left").offsetHeight;
    
      
      // 定义保存手指初始位置；
      var startH=0;
      leftUl.addEventListener("touchstart",function (e) {
        // console.log('哈哈');
        startH=e.touches[0].clientY;
        
        });
      var moveH=difference=0;
      // 定义过渡的最小值
      var maxH=150;
      // 最大值；
      var minH=leftHight-leftUlHeight-150;

      // 定义一个开关 来判断是否超过最大的过渡值跟最小值；
      var distes=false;
      var h=0;
      leftUl.addEventListener("touchmove",function (e) {
        // 移动的坐标
        moveH=e.touches[0].clientY;
        // 算出位移了多少；
        difference=moveH-startH;
        h=difference+endH;
        console.log(difference+endH);
        // 判断位移如果大于0，或者小于最大位移，就让他慢慢过渡到0；如果大于最大值，就让他的位移值 直接等于最大值，不让盒子在
        // 位移出最大值，在过渡到0；
        if(h>maxH){
          h=maxH;
        }
        leftUl.style.transform="translateY("+h+"px)";
        leftUl.style.transition="none";

        });
      var endH=0;
      leftUl.addEventListener("touchend",function (e) {
          endH+=difference;
          if(h>=0&&h<maxH){
            distes=true;
            h=0;
            endH=0;
            startH=0;
            moveH=difference=0;
          }
          if(h>=maxH){
            endH=0;
            startH=0;
            moveH=difference=0;
            h=0;
            distes=true;
          } 
          if(h<=leftHight-leftUlHeight && h>=minH){
            h=leftHight-leftUlHeight;
            distes=true;
          }
          if(h<minH){
            h=minH;
            distes=true;
          }
          if(distes){
            leftUl.style.transform="translateY("+h+"px)";
            leftUl.style.transition="all 0.4s";

            // 当手机离开屏幕的时候，让开关关上；
            distes=false;
          }

        })  
    },
  right:function () {

    }
}