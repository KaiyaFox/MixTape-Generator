import { useState } from "react";

interface MoodState {
    mood: "Happy" | "Sad" | "Angry" | "Neutral" | "Energetic" | "Calm" | "Melancholic" | "Nostalgic" | "Romantic" | "Mysterious" | "Adventurous" | "Reflective";
    movement: string;
    description: string;
    emoji: string;
    color: string;
}

const moodStates: MoodState[] = [
    { mood: "Happy", movement: "bounce", color: "#FFD700", description: "A bright and cheerful mood.", emoji: "😊" },
    { mood: "Sad", movement: "sway", color: "#1E90FF", description: "A blue and melancholic mood.", emoji: "😢" },
    { mood: "Angry", movement: "shake", color: "#FF4500", description: "A fiery and intense mood.", emoji: "😠" },
    { mood: "Neutral", movement: "still", color: "#808080", description: "A calm and balanced mood.", emoji: "😐" },
    { mood: "Energetic", movement: "jump", color: "#32CD32", description: "A lively and upbeat mood.", emoji: "😃" },
    { mood: "Calm", movement: "flow", color: "#4682B4", description: "A relaxing and chill vibe", emoji: "😌" },
    { mood: "Melancholic", movement: "drift", color: "#6A5ACD", description: "A deep and reflective mood.", emoji: "😔" },
    { mood: "Nostalgic", movement: "glide", color: "#FF69B4", description: "A wistful and reflective mood.", emoji: "😌" },
    { mood: "Romantic", movement: "sway", color: "#FF1493", description: "A dreamy and romantic mood.", emoji: "😍" },
    { mood: "Mysterious", movement: "float", color: "#8A2BE2", description: "An enigmatic and intriguing mood.", emoji: "🕵️‍♂️" },
    { mood: "Adventurous", movement: "soar", color: "#FFD700", description: "An adventurous and daring mood.", emoji: "🏞️" },
    { mood: "Reflective", movement: "drift", color: "#4682B4", description: "A thoughtful and introspective mood.", emoji: "🤔" },
];

interface MoodSelectorProps {
    onMoodChange: (mood: string) => void; // Callback to lift state up
    onDescriptionChange: (userDescription: string) => void; // Callback to lift state up
    onGenreChange: (genre: string) => void; // Callback to lift state up
    onWordCountChange: (wordCount: number) => void; // Callback to lift state up
}

export default function MoodSelector({ onMoodChange, onDescriptionChange, onGenreChange, onWordCountChange }: MoodSelectorProps) {
    const [mood, setMood] = useState<MoodState | null>(null);
    const [userDescription, setUserDescription] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [wordCount, setWordCount] = useState<number>(3);

    const handleMoodSelect = (state: MoodState) => {
        setMood(state);
        onMoodChange(state.mood); // Pass the selected mood to the parent
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setUserDescription(value);
        onDescriptionChange(value); // Pass the description to the parent
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGenre(value);
        onGenreChange(value); // Pass the genre to the parent
    };

    const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setWordCount(value);
        onWordCountChange(value); // Pass the word count to the parent
    };

    const payload = {
        mood: mood?.mood,
        description: userDescription,
        genre: genre,
        wordCount: wordCount,
    }

    console.log(payload);

    return (
        <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2 text-center">1. Select mood</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {moodStates.map((state) => (
                    <li
                        key={state.mood}
                        onClick={() => handleMoodSelect(state)}
                        className={`p-4 rounded cursor-pointer transition-all border-1 ${
                            mood?.mood === state.mood
                                ? "border-white bg-opacity-20 bg-white"
                                : "border-transparent hover:border-white"
                        }`}
                        style={{ backgroundColor: state.color + "50" }}
                    >
                        <strong>{state.mood}</strong>
                        <br />
                        {state.emoji}
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
                    <h2 className="text-2xl font-bold mb-2 text-center">2. Describe</h2>
                </label>
                <textarea
                    id="description"
                    value={userDescription}
                    onChange={handleDescriptionChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    rows={3}
                    placeholder="What do you want this playlist to be about?"
                />
            </div>

            <div className="mt-4">
                <label htmlFor="genre" className="block mb-2">
                    <h2 className="text-2xl font-bold mb-2 text-center">3. Type of genre</h2>
                </label>
                <input
                    id="genre"
                    value={genre}
                    onChange={handleGenreChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Enter genre(s) separated by commas"
                />
            </div>
        {/*    Word count selector*/}
            <div className="mt-4">
                <label htmlFor="wordCount" className="block mb-2">
                    <h2 className="text-2xl font-bold mb-2 text-center">4. Word count</h2>
                </label>
                <input
                    id="wordCount"
                    type="number"
                    min={3}
                    max={10}
                    defaultValue={3}
                    onChange={handleWordCountChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>
        </div>
    );
}