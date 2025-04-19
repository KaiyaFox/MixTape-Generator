'use client';

import MoodSelector from "@/app/MoodSelector";
import OpenAI from "openai";
import { useState } from 'react';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
    baseURL: process.env.NEXT_PUBLIC_DEEPSEEK_URL,
    dangerouslyAllowBrowser: true,
});

const userMood = "Horny";
const userGenre = "Trance";
const userDescription = "Knowing i was queer";

export default function Home() {
    const [mixtapeTitle, setMixtapeTitle] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userMood, setUserMood] = useState("Nutural");

    async function generateMixtapeTitle() {
        setLoading(true);
        try {
            const completion = await openai.chat.completions.create({
                messages: [{
                    role: 'system',
                    content: `You are a mixtape title generator. You generate a title based on a ${userMood} mood. A description of: ${userDescription}, and a musical style of ${userGenre}. Only generate the title. Do not include quotes or any text formatting.`,
                }],
                model: "deepseek-chat",
                max_tokens: 15,
                temperature: 1.5,
            });

            const title = completion.choices[0].message.content?.trim();
            setMixtapeTitle(title || "Untitled Mixtape");
        } catch (error) {
            console.error("Error generating mixtape title:", error);
        } finally {
            setLoading(false); // Re-enable the button
        }
    }

    const handleCopy = () => {
        if (!mixtapeTitle) return;
        navigator.clipboard.writeText(mixtapeTitle).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-purple-900 via-pink-600 to-yellow-400 text-white text-center">
            <h1 className="text-5xl font-extrabold mb-6">🎶 Mixtape Title Generator</h1>
            {/*Lift state up from mood*/}
            <MoodSelector mood={userMood} onMoodChange={setUserMood} />

            <button
                onClick={generateMixtapeTitle}
                disabled={loading} // Disable the button when loading
                className={`bg-white text-purple-800 text-lg px-6 py-3 rounded-full shadow-lg transition mb-6 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-100"
                }`}
            >
                {loading ? "Generating..." : "🔀 Generate Title"}
            </button>

            {mixtapeTitle && (
                <div className="bg-gray-900 bg-opacity-40 p-6 rounded-xl shadow-xl backdrop-blur w-full max-w-xl mb-6">
                    <h2 className="text-3xl font-bold mb-4">{mixtapeTitle}</h2>

                    <button
                        onClick={handleCopy}
                        className="bg-white text-purple-800 px-4 py-2 rounded shadow hover:bg-pink-200 transition"
                    >
                        📋 {copied ? "Copied!" : "Copy to Clipboard"}
                    </button>
                </div>
            )}
        </main>
    );
}