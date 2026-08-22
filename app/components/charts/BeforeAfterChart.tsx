'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ROIResult } from '@/lib/types';

interface BeforeAfterChartProps {
  result: ROIResult;
}

const BAR_COLOR = '#06402B';

function formatSignedPct(value: number): string {
  const sign = value >= 0 ? '+' : '-';
  const rounded = Math.round(Math.abs(value) * 10) / 10;
  const display = Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(1);
  return `${sign}${display}%`;
}

export default function BeforeAfterChart({ result }: BeforeAfterChartProps) {
  const data = [
    {
      name: '월간 딜 수',
      value: result.dealsIncreasePct,
      label: formatSignedPct(result.dealsIncreasePct),
    },
    {
      name: '평균 딜 규모',
      value: result.dealSizeIncreasePct,
      label: formatSignedPct(result.dealSizeIncreasePct),
    },
    {
      name: '딜 클로징률',
      value: result.closeRateIncreasePct,
      label: formatSignedPct(result.closeRateIncreasePct),
    },
    {
      name: '딜 사이클 단축',
      value: -result.cycleDaysReductionPct,
      label: formatSignedPct(-result.cycleDaysReductionPct),
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        솔루션 도입 후 개선율
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 50, bottom: 0, left: 0 }}
          barCategoryGap={20}
        >
          <CartesianGrid horizontal={false} stroke="#e1e0d9" />
          <XAxis
            type="number"
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
            width={90}
          />
          <Tooltip
            formatter={(_value, _name, item) => [
              item.payload.label,
              '개선율',
            ]}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e1e0d9',
              fontSize: 13,
            }}
          />
          <Bar
            dataKey="value"
            fill={BAR_COLOR}
            radius={[0, 4, 4, 0]}
            barSize={28}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="value"
              content={(props) => {
                const { x, y, width, height, value } = props as {
                  x: number;
                  y: number;
                  width: number;
                  height: number;
                  value: number;
                };
                const isNegative = value < 0;
                const text = formatSignedPct(value);
                return (
                  <text
                    x={isNegative ? x + 8 : x + width + 8}
                    y={y + height / 2}
                    dy={4}
                    fontSize={13}
                    fontWeight={600}
                    fill={isNegative ? '#ffffff' : '#0b0b0b'}
                    textAnchor="start"
                  >
                    {text}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-2 text-xs text-gray-400">
        업종 평균 벤치마크 기반 추정치
      </p>
    </div>
  );
}
