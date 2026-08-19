'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PaybackChartProps {
  monthlySavings: number;
  fee: number;
}

const SAVINGS_COLOR = '#0ca30c';
const FEE_COLOR = '#d03b3b';

const SERIES_LABELS: Record<string, string> = {
  savings: '누적 절감액',
  fee: '누적 구독료',
};

export default function PaybackChart({
  monthlySavings,
  fee,
}: PaybackChartProps) {
  const data = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      month,
      savings: monthlySavings * month,
      fee: fee * month,
    };
  });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        누적 절감 vs 누적 구독료
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
          barGap={2}
          barCategoryGap="20%"
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
            formatter={(value, name) => [
              `₩${Number(value).toLocaleString('ko-KR')}`,
              SERIES_LABELS[String(name)] ?? String(name),
            ]}
            labelFormatter={(label) => `${label}월`}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e1e0d9',
              fontSize: 13,
            }}
          />
          <Legend
            formatter={(value: string) => SERIES_LABELS[value] ?? value}
            wrapperStyle={{ fontSize: 12, color: '#52514e' }}
          />
          <Bar
            dataKey="savings"
            name="savings"
            fill={SAVINGS_COLOR}
            radius={[4, 4, 0, 0]}
            barSize={16}
            isAnimationActive={false}
          />
          <Bar
            dataKey="fee"
            name="fee"
            fill={FEE_COLOR}
            radius={[4, 4, 0, 0]}
            barSize={16}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
