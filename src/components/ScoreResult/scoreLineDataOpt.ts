export default {
    title: {
        text: '评分走势图',
        x: 'center',
        textStyle: {
            fontSize: 14
        },
    },
    grid: {
        containLabel: true,
        x: 5,
        x2: 0
    },
    xAxis: {
        type: 'category',
        data: [],
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        data: [],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
            normal: {
                color: '#4B68E9',
            }
        },
        itemStyle: {
            normal: {
                color: '#4B68E9',
                label: {
                    show: true,
                    position: [-10, -15],
                    formatter: function(params: any) {
                        let resultParams;
                        if (params.data.pji && params.data.pjia) {
                            resultParams = params.data.value + '\n' + '\n' + '\n' + params.data.pjia + `(${params.data.pji})`;
                        } else {
                            resultParams = params.data.value;
                        }
                        return resultParams;
                    }
                }
            }
        }
    }]
};
