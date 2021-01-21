<template>
<div style="background:#000000;height:200vh;">
    <dv-border-box-8>
        <dv-active-ring-chart :config="ringConfig" style="width:300px;height:300px;margin-bottom:5px;" />
        <dv-decoration-3 style="width:250px;height:30px;" />
        <dv-capsule-chart :config="capsuleConfig" style="width:300px;height:200px;margin-bottom:5px;" />
        <dv-decoration-3 style="width:250px;height:30px;" />
        <dv-conical-column-chart :config="conicalConfig" style="width:400px;height:200px;margin-bottom:5px;" />
        <dv-decoration-3 style="width:250px;height:30px;" />
        <dv-decoration-9 style="width:150px;height:150px;font-size:18px;color:#fefefe;">66%</dv-decoration-9>
        <dv-decoration-3 style="width:250px;height:30px;" />
        <dv-percent-pond :config="percentConfig" style="width:400px;height:40px;" />
        <dv-decoration-3 style="width:250px;height:30px;" />
        <dv-scroll-board :config="scrollConfig" style="width:500px;height:220px" />
        <dv-decoration-3 style="width:250px;height:30px;" />
        <dv-scroll-ranking-board :config="scrollRankConfig" style="width:500px;height:300px" />
    </dv-border-box-8>
</div>
</template>

<script>
export default {
    name: 'demo',
    data() {
        const fullWidth = 300
        const borderGap = 3
        const borderWidth = 3
        const usefulWidth = fullWidth - (borderGap + borderWidth) * 2

        const pieceLength = [0.25, 0.5, 0.25]
        const pieceGap = 3

        const lineDash = pieceLength
            .map(l => [usefulWidth * l, pieceGap])
            .reduce((all, current) => [...all, ...current], [])
        return {
            ringConfig: {
                data: [{
                        name: '周口',
                        value: 55
                    },
                    {
                        name: '南阳',
                        value: 120
                    },
                    {
                        name: '西峡',
                        value: 78
                    },
                    {
                        name: '驻马店',
                        value: 66
                    },
                    {
                        name: '新乡',
                        value: 80
                    }
                ],
                lineWidth: 10
            },
            capsuleConfig: {
                data: [{
                        name: '南阳',
                        value: 167
                    },
                    {
                        name: '周口',
                        value: 123
                    },
                    {
                        name: '漯河',
                        value: 98
                    },
                    {
                        name: '郑州',
                        value: 75
                    },
                    {
                        name: '西峡',
                        value: 66
                    },
                ],
                colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                unit: '单位'
            },
            conicalConfig: {
                data: [{
                        name: '周口',
                        value: 55
                    },
                    {
                        name: '南阳',
                        value: 120
                    },
                    {
                        name: '西峡',
                        value: 71
                    },
                    {
                        name: '驻马店',
                        value: 66
                    },
                    {
                        name: '新乡',
                        value: 80
                    },
                    {
                        name: '信阳',
                        value: 35
                    },
                    {
                        name: '漯河',
                        value: 15
                    }
                ],
                img: [
                    'http://datav.jiaminghi.com/img/conicalColumnChart/1st.png',
                    'http://datav.jiaminghi.com/img/conicalColumnChart/2st.png',
                    'http://datav.jiaminghi.com/img/conicalColumnChart/3st.png',
                    'http://datav.jiaminghi.com/img/conicalColumnChart/4st.png',
                    'http://datav.jiaminghi.com/img/conicalColumnChart/5st.png',
                    'http://datav.jiaminghi.com/img/conicalColumnChart/6st.png',
                    'http://datav.jiaminghi.com/img/conicalColumnChart/7st.png'
                ],
                showValue: true
            },
            percentConfig: {
                value: 80,
                colors: ['#01c4f9', '#c135ff'],
                lineDash
            },
            scrollConfig: {
                data: [
                    ['行1列1', '行1列2', '行1列3'],
                    ['行2列1', '行2列2', '行2列3'],
                    ['行3列1', '行3列2', '行3列3'],
                    ['行4列1', '行4列2', '行4列3'],
                    ['行5列1', '行5列2', '行5列3'],
                    ['行6列1', '行6列2', '行6列3'],
                    ['行7列1', '行7列2', '行7列3'],
                    ['行8列1', '行8列2', '行8列3'],
                    ['行9列1', '行9列2', '行9列3'],
                    ['行10列1', '行10列2', '行10列3']
                ]
            },
            scrollRankConfig: {
                data: [{
                        name: '周口',
                        value: 55
                    },
                    {
                        name: '南阳',
                        value: 120
                    },
                    {
                        name: '西峡',
                        value: 78
                    },
                    {
                        name: '驻马店',
                        value: 66
                    },
                    {
                        name: '新乡',
                        value: 80
                    },
                    {
                        name: '信阳',
                        value: 45
                    },
                    {
                        name: '漯河',
                        value: 29
                    }
                ]
            },
        }
    },
}
</script>
