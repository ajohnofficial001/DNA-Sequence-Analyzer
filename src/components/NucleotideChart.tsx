"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SequenceAnalysis } from "@/lib/dna";
import { NUCLEOTIDES } from "@/lib/dna";
import { formatCount, formatPercent } from "@/lib/dna/format";

const BAR_COLORS: Record<string, string> = {
  A: "var(--base-a)",
  T: "var(--base-t)",
  G: "var(--base-g)",
  C: "var(--base-c)",
};

type NucleotideChartProps = {
  analysis: SequenceAnalysis;
};

export function NucleotideChart({ analysis }: NucleotideChartProps) {
  const data = NUCLEOTIDES.map((nucleotide) => ({
    nucleotide,
    count: analysis.counts[nucleotide],
    percentage: analysis.percentages[nucleotide],
  }));

  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Nucleotide Distribution Chart
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Count of each base in the analyzed sequence.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="nucleotide"
              tick={{ fill: "var(--muted)", fontSize: 13 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "var(--chart-cursor)" }}
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
                fontSize: "0.875rem",
              }}
              formatter={(value, _name, item) => {
                const count = typeof value === "number" ? value : Number(value);
                const percentage =
                  typeof item?.payload?.percentage === "number"
                    ? item.payload.percentage
                    : 0;
                return [
                  `${formatCount(count)} (${formatPercent(percentage)})`,
                  "Count",
                ];
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {data.map((entry) => (
                <Cell
                  key={entry.nucleotide}
                  fill={BAR_COLORS[entry.nucleotide]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
