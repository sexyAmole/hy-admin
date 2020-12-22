export const config = [
    /*小程序主题列表*/
    {
        name: "/Web/wxConfig/ThemeList",
        path: "/Web/wxConfig/ThemeList",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/wxConfig/ThemeList'], resolve)
    },
    /*小程序主题设置*/
    {
        name: "/Web/wxConfig/ThemeList/Set",
        path: "/Web/wxConfig/ThemeList/:id",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/wxConfig/SetThemeList'], resolve)
    },
    /*小程序优惠卷主题列表*/
    {
        name: "/Web/wxCoupon/CouponThemeList",
        path: "/Web/wxCoupon/CouponThemeList",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/wxConfig/CouponThemeList'], resolve)
    },
    /*小程序优惠卷主题设置*/
    {
        name: "/Web/wxCoupon/CouponThemeList/Set",
        path: "/Web/wxCoupon/CouponThemeList/:id",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/wxConfig/SetCouponThemeList'], resolve)
    },
    /*首页轮播列表*/
    {
        name: "/Web/wxConfig/CarouselList",
        path: "/Web/wxConfig/CarouselList",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/wxConfig/CarouselList'], resolve)
    },
    /*首页轮播设置*/
    {
        name: "/Web/wxConfig/CarouselList/Set",
        path: "/Web/wxConfig/CarouselList/:id",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/wxConfig/SetCarouselList'], resolve)
    }
]