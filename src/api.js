// 权限管理
import { request } from "./utils/request";

// 获取 第一个 地区销量趋势图
export const getTrend=()=> {
    return request({
        url:'data-view/trend',
        method: "GET",
    })
}



// 获取表格数据
export const getSeller=()=> {
    return request({
        url:'data-view/seller',
        method: "GET",
    })
}

// 获取 地图数据 
export const getMapList=()=> {
    return request({
        url:'data-view/map',
        method: "GET",
    })
}

// 获取 地区销售排行
export const getRank=()=> {
    return request({
        url:'data-view/rank',
        method: "GET",
    })
}


