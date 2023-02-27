export const defaultOptions: Highcharts.Options = {
    plotOptions: {
        series: {
            states: {
                select: {
                    color: '#EFFFEF',
                    borderColor: 'black',
                    dashStyle: 'dot',
                } as any,
            },
            label: {
                enabled: false,
            },
            animation: false,
        },
    },
    credits: {
        text: 'everviz.com',
        href: 'https://everviz.com',
    },
    lang: {
        shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        weekdays: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
    },
    series: [
        {
            data: [],
            test: 1,
        } as any,
    ],
    data: {
        csv: 'Category;A;B;C\n0;4;6;3\n1;3;2;4\n2;5;4;3\n3;6;4;1\n4;2;4;6\n5;3;2;4',
        seriesMapping: [
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: 2,
            },
            {
                x: 0,
                y: 3,
            },
        ],
    },
};
