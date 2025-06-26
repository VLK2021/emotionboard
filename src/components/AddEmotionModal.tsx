import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {emotionStore, EmotionType} from "@/stores/EmotionStore";
import {EMOTION_LIST} from "@/utils/emotions";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AddEmotionModal: React.FC<Props> = observer(({ open, onClose }) => {
    const [type, setType] = useState<EmotionType>("Радість");
    const [comment, setComment] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
                <h2 className="text-xl mb-4">Додати емоцію</h2>
                <div className="mb-3">
                    <label className="block mb-2 font-bold">Емоція</label>
                    <select
                        className="w-full border rounded p-2"
                        value={type}
                        onChange={e => setType(e.target.value as EmotionType)}
                    >
                        {EMOTION_LIST.map(e => (
                            <option key={e.type} value={e.type}>{e.icon} {e.type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block mb-2 font-bold">Коментар</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={comment}
                        maxLength={64}
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => {
                            if (!comment.trim()) return;
                            emotionStore.addEmotion({ type, comment });
                            setType("Радість");
                            setComment("");
                            onClose();
                        }}
                    >
                        Додати
                    </button>
                    <button className="px-4 py-2 rounded" onClick={onClose}>Скасувати</button>
                </div>
            </div>
        </div>
    );
});
