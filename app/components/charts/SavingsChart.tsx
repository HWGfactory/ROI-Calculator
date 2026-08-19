'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MonthlyDataPoint } from '@/lib/types';

interface SavingsChartProps {
  monthlyData: MonthlyDataPoint[];
  paybackMonths: number;
}

const LINE_COLOR = '#1B4FFF';
const BREAK_EVEN_COLOR = '#d03b3b';

export default function SavingsChart({
  monthlyData,
  paybackMonths,
}: SavingsChartProps) {
  const breakEvenMonth =
    paybackMonths >= 1 && paybackMonths <= 12 ? paybackMonths : null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        12개월 누적 절감액
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={monthlyData}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid stroke="#e1e0d9" vertical={false} />
          <XAxis
            dataKey="month"
            tickFormatter={(v) => `${v}월`}
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v: number) => `₩${v.toLocaleString('ko-KR')}`}
            tick={{ fill: '#898781', fontSize: 11 }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            width={90}
          />
          <Tooltip
            formatter={(value) => [
              `₩${Number(value).toLocaleString('ko-KR')}`,
              '누적 절감액',
            ]}
            labelFormatter={(label) => `${label}월`}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e1e0d9',
              fontSize: 13,
            }}
          />
          <ReferenceLine y={0} stroke="#c3c2b7" strokeWidth={1} />
          {breakEvenMonth !== null && (
            <ReferenceLine
              x={breakEvenMonth}
              stroke={BREAK_EVEN_COLOR}
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: '흑자전환',
                position: 'top',
                fill: BREAK_EVEN_COLOR,
                fontSize: 12,
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="cumulative"
            stroke={LINE_COLOR}
            strokeWidth={2}
            dot={{ r: 4, fill: LINE_COLOR, stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 5, fill: LINE_COLOR, stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
