import React from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";

import { Emotion } from "@/stores/EmotionStore";
import { EMOTION_LIST } from "@/utils/emotions";


interface Props {
    emotion: Emotion;
    onRemove: () => void;
    onDragStart?: (e: React.DragEvent) => void;
    onDragOver?: (e: React.DragEvent) => void;
    draggable?: boolean;
}

export const EmotionCard: React.FC<Props> = observer(({ emotion, onRemove, ...dragProps }) => {
    const emotionMeta = EMOTION_LIST.find(e => e.type === emotion.type);


    return (
        <div
            draggable={dragProps.draggable}
            onDragStart={dragProps.onDragStart}
            onDragOver={dragProps.onDragOver}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-2 rounded-xl p-4 relative shadow-lg"
                style={{ background: emotionMeta?.color || "#eee" }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{emotionMeta?.icon}</span>
                    <span className="font-bold">{emotion.type}</span>
                </div>

                <div className="text-sm">{emotion.comment}</div>

                <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
                    onClick={onRemove}
                >Видалити</button>
            </motion.div>
        </div>
    );
});
