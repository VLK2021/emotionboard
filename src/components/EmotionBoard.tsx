import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { EmotionCard } from "./EmotionCard";
import {emotionStore} from "@/stores/EmotionStore";

export const EmotionBoard: React.FC = observer(() => {
    const [dragged, setDragged] = useState<number | null>(null);

    // Адаптивно — простий варіант (без useMediaQuery, працює як grid/column)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const handleDragStart = (idx: number) => () => setDragged(idx);
    const handleDragOver = (idx: number) => (e: React.DragEvent) => {
        e.preventDefault();
        if (dragged !== null && dragged !== idx) {
            emotionStore.moveEmotion(dragged, idx);
            setDragged(idx);
        }
    };

    return (
        <div className={isMobile
            ? "flex flex-col gap-4 w-full"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"}>
            {emotionStore.emotions.map((emotion, idx) => (
                <EmotionCard
                    key={emotion.id}
                    emotion={emotion}
                    onRemove={() => emotionStore.removeEmotion(emotion.id)}
                    draggable={isMobile}
                    onDragStart={isMobile ? handleDragStart(idx) : undefined}
                    onDragOver={isMobile ? handleDragOver(idx) : undefined}
                />
            ))}
        </div>
    );
});
