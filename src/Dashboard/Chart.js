import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const generateDate = (m) => {
    const date = new Date()
    date.setMonth(date.getMonth() - m);
    return date.getFullYear() + '-' + (date.getMonth()+1)

}
const data = [
    createData(generateDate(8), 400),
    createData(generateDate(7), 1500),
    createData(generateDate(6), 2000),
    createData(generateDate(5), 2400),
    createData(generateDate(4), 2400),
    createData(generateDate(3), 2500),
    createData(generateDate(2), 2800),
    createData(generateDate(1), 3000),
    createData(generateDate(0), 3600),
    createData(generateDate(-1), undefined),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>1-Year</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Personal Value ($)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}