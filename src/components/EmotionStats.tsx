import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {emotionStore} from "@/stores/EmotionStore";
import {EMOTION_LIST} from "@/utils/emotions";

const periodOptions = [
    { label: "Сьогодні", value: "today" },
    { label: "Тиждень", value: "week" },
    { label: "Місяць", value: "month" },
    { label: "Весь час", value: "all" },
];

function filterByPeriod(period: string) {
    const now = new Date();
    return emotionStore.emotions.filter((e) => {
        const created = new Date(e.createdAt);
        if (period === "today") {
            return created.toDateString() === now.toDateString();
        }
        if (period === "week") {
            const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
            return diff < 7;
        }
        if (period === "month") {
            return (
                created.getMonth() === now.getMonth() &&
                created.getFullYear() === now.getFullYear()
            );
        }
        return true;
    });
}

export const EmotionStats = observer(() => {
    const [period, setPeriod] = useState("today");
    const filtered = filterByPeriod(period);

    const stats = EMOTION_LIST.map((meta) => ({
        ...meta,
        count: filtered.filter((e) => e.type === meta.type).length,
    }));

    const total = filtered.length;

    return (
        <div className="bg-white p-4 rounded-xl shadow mb-4 w-full">
            <div className="flex flex-wrap items-center gap-2 mb-2">
                {periodOptions.map((opt) => (
                    <button
                        key={opt.value}
                        className={`px-3 py-1 rounded ${
                            period === opt.value ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setPeriod(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-4">
                {stats.map((stat) =>
                    stat.count > 0 ? (
                        <div
                            key={stat.type}
                            className="flex items-center gap-1 px-2 py-1 rounded"
                            style={{ background: stat.color + "33" }}
                        >
                            <span className="text-xl">{stat.icon}</span>
                            <span className="font-medium">{stat.type}:</span>
                            <span className="font-bold">{stat.count}</span>
                        </div>
                    ) : null
                )}
                {total === 0 && <span className="text-gray-400">Немає емоцій за цей період</span>}
            </div>
        </div>
    );
});
