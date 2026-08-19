'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BeforeAfterChartProps {
  currentPct: number;
  afterPct: number;
}

const CURRENT_COLOR = '#9ca3af';
const AFTER_COLOR = '#1B4FFF';

export default function BeforeAfterChart({
  currentPct,
  afterPct,
}: BeforeAfterChartProps) {
  const data = [
    { name: '현재', value: Math.round(currentPct) },
    { name: '도입 후', value: Math.round(afterPct) },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        현재 vs 도입 후 효율
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
          barCategoryGap={24}
        >
          <CartesianGrid horizontal={false} stroke="#e1e0d9" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#52514e', fontSize: 13 }}
            axisLine={{ stroke: '#c3c2b7' }}
            tickLine={false}
            width={64}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, '효율']}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e1e0d9',
              fontSize: 13,
            }}
          />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            barSize={24}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={index === 0 ? CURRENT_COLOR : AFTER_COLOR}
              />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value) => `${value}%`}
              fill="#0b0b0b"
              fontSize={13}
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400" />
          현재
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1B4FFF]" />
          도입 후
        </span>
      </div>
    </div>
  );
}
