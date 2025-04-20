import { useState } from "react";

interface MoodState {
    mood: "Happy" | "Sad" | "Angry" | "Neutral" | "Energetic" | "Calm" | "Melancholic" | "Nostalgic" | "Romantic" | "Mysterious" | "Adventurous" | "Reflective";
    movement: string;
    description: string;
    color: string;
}

const moodStates: MoodState[] = [
    { mood: "Happy", movement: "bounce", color: "#FFD700", description: "A bright and cheerful mood." },
    { mood: "Sad", movement: "sway", color: "#1E90FF", description: "A blue and melancholic mood." },
    { mood: "Angry", movement: "shake", color: "#FF4500", description: "A fiery and intense mood." },
    { mood: "Neutral", movement: "still", color: "#808080", description: "A calm and balanced mood." },
    { mood: "Energetic", movement: "jump", color: "#32CD32", description: "A lively and upbeat mood." },
    { mood: "Calm", movement: "flow", color: "#4682B4", description: "A relaxing and chill vibe" },
    { mood: "Melancholic", movement: "drift", color: "#6A5ACD", description: "A deep and reflective mood." },
    { mood: "Nostalgic", movement: "glide", color: "#FF69B4", description: "A wistful and reflective mood." },
    { mood: "Romantic", movement: "sway", color: "#FF1493", description: "A dreamy and romantic mood." },
    { mood: "Mysterious", movement: "float", color: "#8A2BE2", description: "An enigmatic and intriguing mood." },
    { mood: "Adventurous", movement: "soar", color: "#FFD700", description: "An adventurous and daring mood." },
    { mood: "Reflective", movement: "drift", color: "#4682B4", description: "A thoughtful and introspective mood." },
];

interface MoodSelectorProps {
    onMoodChange: (mood: string) => void; // Callback to lift state up
    onDescriptionChange: (description: string) => void; // Callback to lift state up
    onGenreChange: (genre: string) => void; // Callback to lift state up
}

export default function MoodSelector({onMoodChange, onDescriptionChange, onGenreChange}: MoodSelectorProps) {
    const [mood, setMood] = useState<MoodState | null>(null);
    const [description, setDescription] = useState<string>("");
    const [genre, setGenre] = useState<string>("");


    const handleMoodSelect = (state: MoodState) => {
        setMood(state);
        onMoodChange(state.mood); // Lift state up
        onDescriptionChange(description); // Lift state up
        onGenreChange(genre); // Lift state up
    }

    console.log(mood);

    return (
        <>
        <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2 text-center">🦊 Mood Selector</h2>
            <p className="mb-2">Choose a mood for your playlist</p>

            <ul className="grid grid-cols-3 gap-4">
                {moodStates.map((state) => (
                    <li
                        key={state.mood}
                        onClick={() => handleMoodSelect(state)}
                        className={`p-4 rounded cursor-pointer transition-all border-4 ${
                            mood?.mood === state.mood
                                ? "border-white bg-opacity-20 bg-white"
                                : "border-transparent hover:border-white"
                        }`}
                        style={{ backgroundColor: state.color + "50" }}
                    >
                        <strong>{state.mood}</strong>
                    </li>
                ))}
            </ul>

            {mood && (
                <div className="mt-6 p-4 border rounded bg-gray-700">
                    <h3
                        className="text-4xl font-semibold mb-2"
                        style={{ color: mood.color }}
                    >
                        {mood.mood}
                    </h3>
                    <p>{mood.description}</p>
                </div>
            )}
            <div className="mt-4">
                <label htmlFor="description" className="block mb-2">
                    Description:
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    rows={3}
                    placeholder="What do you want this playlist to be about?"
                />
            </div>
            <div className="mt-4">
                <label htmlFor="genre" className="block mb-2">
                    Genre:
                </label>
                <input
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Enter genre(s) separated by commas"
                />
            </div>
        </div>
            </>
    );
}