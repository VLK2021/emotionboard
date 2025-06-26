import {makeAutoObservable} from "mobx";

export type EmotionType = "Радість" | "Смуток" | "Злість" | "Подив" | "Спокій" | "Страх" | "Відраза";


export interface Emotion {
    id: string;
    type: EmotionType;
    comment: string;
    createdAt: string;
}


class EmotionStore {
    emotions: Emotion[] = [];

    constructor() {
        makeAutoObservable(this);
        this.load();
    }

    addEmotion(emotion: Omit<Emotion, 'id' | 'createdAt'>) {
        this.emotions.unshift({
            ...emotion,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
        });
        this.save();
    }

    removeEmotion(id: string) {
        this.emotions = this.emotions.filter(e => e.id !== id);
        this.save();
    }

    moveEmotion(from: number, to: number) {
        const updated = [...this.emotions];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        this.emotions = updated;
        this.save();
    }

    save() {
        if (typeof window !== "undefined")
            localStorage.setItem('emotions', JSON.stringify(this.emotions));
    }

    load() {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem('emotions');
            if (data) this.emotions = JSON.parse(data);
        }
    }

    clear() {
        this.emotions = [];
        this.save();
    }
}

export const emotionStore = new EmotionStore();
