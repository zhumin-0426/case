(function (init) {
    let markers, userid, userListContent;
    // 获取uni-app用户ID值
    init.getQuery = name => {
        // 正则：[找寻'&' + 'url参数名字' = '值' + '&']（'&'可以不存在）
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 对参数值进行解码
            userid = unescape(r[2]);
        }
        return null;
    }
    init.wsQuery = (userid = 199) => {
        var ws = new WebSocket("ws://lb.28888753.cn:8080/shunde/webSocket/" + userid);
        let msg_obj = {
            num: 3,
            userid: userid
        }
        ws.onopen = function (res) {
            if (ws.readyState === 1) {
                ws.send(
                    '{"To":"Manger","msg":' + JSON.stringify(msg_obj) + '}'
                );
            }
        };
        ws.onmessage = function (res) {
            let data = JSON.parse(res.data);
            markers = data.vis_record_list;
            data.image_list.forEach((item) => {
                userListContent = `<div class="user-list-item">
                <div class="user-pic">
                    <img src="${item.head}" alt="">
                </div>
            </div>`;
                $('.user-list').prepend(userListContent)
            })
            init.initMap(data)
        };
    }
    // 高德地图初始化
    init.initMap = (data) => {
        console.log('data',data);
        let map = new AMap.Map('amap', {
            resizeEnable: true,
            center: [data.lon, data.lat],
            zoom: 13
        });
        init.markerList(map)
        init.mapZoom(map)
    }
    // 地图缩放
    init.mapZoom = (map) => {
        AMap.plugin('AMap.ToolBar', function () {//异步加载插件
            let toolbar = new AMap.ToolBar();
            map.addControl(toolbar);
        });
    }
    // 点标记
    init.markerList = (map) => {
        markers.forEach((item) => {
            let content = `<div class="marker-box">
                <div class="marker-cover" data-id="${item.id}"></div>
                <div class="user-pic">
                    <img src="${item.heard}" alt="">
                </div>
                <div class="user-name">${item.name}</div>
            </div>`;
            let marker = new AMap.Marker({
                content: content,  // 自定义点标记覆盖物内容
                position: [item.user_location_obj.longitudePoint, item.user_location_obj.dimensionPoint], // 基点位置
                offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
            });
            marker.on('click', init.onMarkerClick);//marker点击时间
            map.add(marker)
        })
    }
    init.onMarkerClick = (e) => {
        let id = e.originEvent.target.dataset.id;
        window.location = "http://lb.28888753.cn/map/gd_map2/mapDel.html?id="+id;
    }
    init.getQuery();
    console.log('uni-app通讯成功', userid);  //获取 uni-app 传来的值
    init.wsQuery(userid);
})({});