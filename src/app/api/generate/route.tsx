import {NextResponse, NextRequest} from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_URL,
});

export async function POST(req: NextRequest) {
    try {
        const { mood, genre, description } = await req.json();
        console.log(mood, genre, description);


        if (!mood || !genre || !description) {
            console.log(mood, genre, description);

            return NextResponse.json({ error: "Missing parameters"}, { status: 400});
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content:
                        `You are a music branding expert. Generate a **unique, bold, and intriguing playlist title** based on the following:
                        - Mood: ${mood}
                        - Description: ${description}
                        - Genre: ${genre}
                        Use figurative language, unexpected word pairings, or cultural references. Keep it under 6 words. Do **not** include quotes or extra formatting. Output only the title.`
                }],
            model: "deepseek-chat",
            max_tokens: 20,
            temperature: 2.0,
        });

        const title = completion.choices[0].message.content?.trim();
        return NextResponse.json({ title })

    } catch (error) {
        console.error("Error generating mixtape title:", error);
    }
    return NextResponse.json({ error: "Internal server error"}, {status: 500})
}