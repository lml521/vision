const theme={
    chalk:{
        backgroundColor:'#000000',
        titleColor:'#ffffff',
        logoSrc:'logo_dark.png',
        themeSrc:'qiehuan_dark.png',
        headerBorderSrc:'header_border_dark.png'

    },
    vintage:{
        backgroundColor:'#eeeeee',
        titleColor:'#000000',
        logoSrc:'logo_light2.png',
        themeSrc:'qiehuan_light.png',
        headerBorderSrc:'header_border_light.png'

    }
}
export const getThemeValue=(themeName)=> {
    console.log(theme,themeName)
    console.log(theme[themeName].titleColor)
    return theme[themeName]
}
