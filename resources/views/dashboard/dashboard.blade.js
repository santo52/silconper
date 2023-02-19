export class Dashboard {
    async load() {

        this.loadGeneralPDV();
        this.loadSalesAggreators();
        this.loadMonthSalesAggreators();

        this.loadCard("/dashboard/sales", { time: "day" }, "salesOfDay")
            .then((data) => {
                $("#salesOfDay .card-value").text(data.total || 0);
            });

        this.loadCard("/dashboard/sales", { time: "month" }, "salesOfMonth")
            .then((data) => {
                $("#salesOfMonth .card-value").text(data.total || 0);
            });

        this.loadCard("/dashboard/sales", { time: "year" }, "salesOfYear")
            .then((data) => {
                $("#salesOfYear .card-value").text(data.total || 0);
            });

        this.loadCard("/dashboard/orders", { time: "day" }, "ordersOfDay")
            .then((data) => {
                $("#ordersOfDay .card-value").text(data.total || 0);
            });
    }

    loadCard(url, baseData, id) {
        const data = baseData;
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                type: "POST",
                data,
                dataType: "json",
                beforeSend: () => $(`#${id}`).addClass("loading"),
                success: (data) => {
                    $(`#${id}`).removeClass("loading");
                    resolve(data);
                },
                error: (err) => {
                    $(`#${id}`).removeClass("loading");
                    reject();
                },
            });
        });
    }

    async loadMonthSalesAggreators() {

        const baseConfig = {
            chart: { type: 'spline'},
            title: { text: 'Venta General Agregadores Mes'},
            xAxis: { categories: getMonths() },
            yAxis: {
                title: { text: '' },
                labels: {
                    formatter: function () {
                        return this.value + '$';
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    responsive: true,
                    maintainAspectRatio: true,
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
        
            series: []
        };

        Highcharts.chart('salesMonthAggregators', baseConfig);

        this.loadCard("/dashboard/sales-aggregators", { time: 'month' }, "salesMonthAggregators")
            .then((data) => {
                const series = data.result.map(item => {
                    const monthlyData = Object.values(item).slice(2);
                    return { name: item.nombreAgregador, data: monthlyData }
                })

                Highcharts.chart('salesMonthAggregators', {
                    ...baseConfig, 
                    series
                });
            })

    }

    async loadSalesAggreators() {

        const baseConfig = {
            colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            }),
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Venta Por Agregadores Día'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.f}</b>'
            },
            plotOptions: {
                pie: {
                    responsive: true,
                    maintainAspectRatio: true,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f} %',
                        // format: '<b>{point.name}</b>:{point.y:0.f}',
                        connectorColor: 'silver'
                    }
                }
            }
        }

        Highcharts.chart('salesAggregators', {
            ...baseConfig,
            series: [{
                name: 'TotalVenta',
                data: []
            }]
        })

        this.loadCard("/dashboard/sales-aggregators", { time: 'day' }, "salesAggregators")
            .then((data) => {
                const seriesData = data.result.map(item => {
                    const value = String(item.Total).replace('.00', '')
                    return { name: item.Agregador, y: value }
                })
                
                Highcharts.chart('salesAggregators', {
                    ...baseConfig,
                    series: [{
                        name: 'TotalVenta',
                        data: seriesData
                    }]
                })
            })
    }

    async loadGeneralPDV() {

        const baseConfig = {
            chart: { type: "column" },
            title: { text: "Venta General PDV Mes" },
            xAxis: {
                categories: getMonths(),
                crosshair: true,
            },

            yAxis: {
                min: 0,
                title: {
                    text: "Total ($)",
                },
            },

            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },

            plotOptions: {
                column: {
                    responsive: true,
                    maintainAspectRatio: true,
                    pointPadding: 0,
                    borderWidth: 0,
                    borderRadius: 4,
                },
            },
        }


        // Preload chart

        Highcharts.chart("generalSalesPDV", {
            ...baseConfig,
            series: [
                {
                    name: "VentaEfectiva",
                    data: [],
                },
                {
                    name: "VentaCancelada",
                    data: [],
                },
                {
                    name: "VentaTotal",
                    data: [],
                },
            ],
        });

        this.loadCard("/dashboard/general-sales-pdv", {}, "generalSalesPDV")
            .then((data) => {
                const seriesData = data.reduce((initial, item) => {
                    const ventaEfectiva = [...initial.ventaEfectiva, item.ventaEfectiva]
                    const ventaCancelada = [...initial.ventaCancelada, item.ventaCancelada]
                    const totalVenta = [...initial.totalVenta, item.totalVenta]
                    return { ventaEfectiva, ventaCancelada, totalVenta }
                }, { ventaEfectiva: [], ventaCancelada: [], totalVenta: [] })
                
                Highcharts.chart("generalSalesPDV", {
                    ...baseConfig,
                    series: [
                        {
                            name: "VentaEfectiva",
                            data: seriesData.ventaEfectiva,
                        },
                        {
                            name: "VentaCancelada",
                            data: seriesData.ventaCancelada,
                        },
                        {
                            name: "VentaTotal",
                            data: seriesData.totalVenta,
                        },
                    ],
                });

            });
    }

    
}
