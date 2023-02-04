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
