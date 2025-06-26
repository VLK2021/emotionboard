export function getThemeByTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "day";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
}

export function getThemeBg(theme: string) {
    switch (theme) {
        case "morning": return "bg-yellow-100";
        case "day": return "bg-blue-100";
        case "evening": return "bg-purple-100";
        case "night": return "bg-gray-900";
        default: return "bg-gray-100";
    }
}
