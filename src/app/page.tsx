"use client";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";

import {emotionStore} from "@/stores/EmotionStore";
import {EmotionBoard} from "@/components/EmotionBoard";
import {AddEmotionModal} from "@/components/AddEmotionModal";
import {EmotionStats} from "@/components/EmotionStats";
import {getThemeByTime, getThemeBg} from "@/utils/themeByTime";


const Home = observer(() => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tab, setTab] = useState<"board" | "stats">("board");

    const theme = getThemeByTime();


    return (
        <main
            className={`${getThemeBg(theme)} min-h-screen flex flex-col items-center p-4 transition-colors duration-500`}>
            <h1 className="text-3xl font-bold mb-6">Дошка емоцій</h1>
            <div className="flex gap-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${tab === "board" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setTab("board")}
                >
                    Дошка
                </button>
                <button
                    className={`px-4 py-2 rounded ${tab === "stats" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setTab("stats")}
                >
                    Статистика
                </button>
            </div>

            {tab === "board" && (
                <>
                    <div className="flex gap-4 mb-4">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => setModalOpen(true)}
                        >
                            Додати емоцію
                        </button>

                        {emotionStore.emotions.length > 0 && (
                            <button
                                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => emotionStore.clear()}
                            >
                                Очистити всі
                            </button>
                        )}
                    </div>

                    <div className="w-full max-w-3xl">
                        <EmotionBoard/>
                    </div>

                    <AddEmotionModal open={modalOpen} onClose={() => setModalOpen(false)}/>
                </>
            )}

            {tab === "stats" && (
                <div className="w-full max-w-3xl">
                    <EmotionStats/>
                </div>
            )}
        </main>
    );
});

export default Home;
