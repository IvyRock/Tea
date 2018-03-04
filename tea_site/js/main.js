//$("#submitBtn") => jQuery選擇器
// document.getElementById("submitBtn") => 原生JavaScript

// 當畫面元素(document)載入完成後，主程式才開始進行
// .ready(事件處理器) 載入完成的事件
// 匿名函式 function(){}
$(document).ready(
    function(){

    //網路上地圖常數陣列
    const mapStyles = [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#9fcf67"
                },
                {
                    "weight": "3.28"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#9fcf67"
                },
                {
                    "weight": "4.37"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "weight": "3.10"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9fcf67"
                },
                {
                    "weight": "3.04"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#9fcf67"
                },
                {
                    "weight": "3.68"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffff00"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -97
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "lightness": -25
                },
                {
                    "saturation": -100
                }
            ]
        }
    ];

    console.log("主程式開始運行");
    //啟用WOW.js柴犬動畫
    new WOW().init();


    //偵測使用者滾動視窗的事件
    //.bind("互動動作需輸入的文字", function(){事件處理器...} )綁定
    //"click"點擊, "scroll"滾動事件, "resize"縮放視窗(拉大拉小瀏覽器)
    $(window).bind("scroll", function(){
        //取得使用者目前滾動到的高度
        //.scrollTop() =>取得滾動的高度
        const scrollingHeight = $(window).scrollTop();
        //console.log(scrollingHeight);
        if(scrollingHeight > 500){
            //把id叫做#goBackBtn顯示出來
            //$("#goBackBtn").show();
            $("#goBackBtn").fadeIn(1000);
        }else{
            //把goBackBtn隱藏起來
            //$("#goBackBtn").hide();
            $("#goBackBtn").fadeOut(1000);
        }
    });


        // 設定.nav-link的點擊事件
    $(".nav-link, #goBackBtn").click(function(){
        //$(this)=>被點擊的這個nav-link
        //console.log($(this)[0]);
        //[步驟1]取得目標
        // .attr("href")=>取得屬性的值
        const target = $(this).attr("href");
        //intro->introsection
        //[步驟2]取得目標座標位置
        // .offset()取得座標位置(left,top)
        const targetPosition = $(target).offset().top;//點擊後得到區塊的高度的位置
        //console.log(targetPosition);
        //[步驟3]設定動畫秒數
        const duration = 1500;//動畫長度共1000秒
        const navbarHeight=68;
        //[步驟4]設定動畫
        //.animate({},1000)  空物件{}與秒數
        //.stop() =>先停下目前的動畫再去執行新動畫
        $("html,body").stop().animate({
            //設定滾動目標位置
            scrollTop: targetPosition - navbarHeight
        },duration);
    });

    //型別屬性要對!
    //[建立]啟用map的function
    function initMap(){
        console.log("現在開始啟用googleMap")
        //建立沒啟用不會有文字
        //經緯度{中括號物件格式}
        const myLocation = {
            lat:23.6923558,
            lng:120.6852594
        }; 
        //選擇畫面上要放地圖的元素
        //[0]取得第一索引標籤
        const mapElement = $("#map")[0];//=>取得標籤<div id = "map"></div>
        console.log(mapElement);
        //$("#map")得到[div#map]
        //<div id="map"></div>是google要的標籤格式
        //建立地圖
        //.Map("<div id="map"></div>",{})
        const map1 = new google.maps.Map(mapElement,{
            center: myLocation,
            zoom:13,
            draggable: true,//布林格式 是否能拖曳
            styles:mapStyles//地圖客製化常數
        });
        //建立座標點
        //.Marker({物件})
        const marker = new google.maps.Marker({
            //設定座標點的座標(position)
            position: myLocation, 
            //設定哪一張地圖(屬性名map:)要放這個Marker
            map:map1,
            icon:"../images/pin.jpg"
        });
    }
              //[啟用]initMap()
              initMap();
});


