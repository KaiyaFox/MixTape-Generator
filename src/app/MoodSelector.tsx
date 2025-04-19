import { useState } from "react";

interface MoodState {
    mood: "Happy" | "Sad" | "Angry" | "Neutral" | "Energetic" | "Calm" | "Melancholic" | "Nostalgic";
    movement: string;
    color: string;
}

const moodStates: MoodState[] = [
    { mood: "Happy", movement: "bounce", color: "#FFD700" },
    { mood: "Sad", movement: "sway", color: "#1E90FF" },
    { mood: "Angry", movement: "shake", color: "#FF4500" },
    { mood: "Neutral", movement: "still", color: "#808080" },
    { mood: "Energetic", movement: "jump", color: "#32CD32" },
    { mood: "Calm", movement: "flow", color: "#4682B4" },
    { mood: "Melancholic", movement: "drift", color: "#6A5ACD" },
    { mood: "Nostalgic", movement: "glide", color: "#FF69B4" },
];

export default function MoodSelector() {
    const [selectedMood, setSelectedMood] = useState<MoodState | null>(null);

    return (
        <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">🦊 Fox Tail Mood Selector</h2>

            <ul className="space-y-2">
                {moodStates.map((state) => (
                    <li
                        key={state.mood}
                        onClick={() => setSelectedMood(state)}
                        className={`p-3 rounded cursor-pointer transition-all border-2 ${
                            selectedMood?.mood === state.mood
                                ? "border-white bg-opacity-20 bg-white"
                                : "border-transparent hover:border-white"
                        }`}
                        style={{ backgroundColor: state.color + "30" }} // semi-transparent bg
                    >
                        <strong>{state.mood}</strong>
                    </li>
                ))}
            </ul>

            {selectedMood && (
                <div className="mt-6 p-4 border rounded bg-gray-700">
                    <h3 className="text-lg font-semibold mb-2">Current Mood: {selectedMood.mood}</h3>
                    <p><strong>Tail Movement:</strong> {selectedMood.movement}</p>
                    <p>
                        <strong>Tail Color:</strong>{" "}
                        <span style={{ color: selectedMood.color }}>{selectedMood.color}</span>
                    </p>
                </div>
            )}
        </div>
    );
}