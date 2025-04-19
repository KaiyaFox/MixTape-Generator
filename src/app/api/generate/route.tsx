import {NextResponse, NextRequest} from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_URL,
});

export async function POST(req: NextRequest) {
    try {
        const { mood, genre, description } = await req.json();

        if (!mood || !genre || !description) {
            return NextResponse.json({ error: "Missing parameters"}, { status: 400});
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are a mixtape title generator. You generate a title based on a ${mood} mood. A description of: ${description}, and a musical style of ${genre}. Only generate the title. Do not include quotes or any text formatting.`,
                }],
            model: "deepseek-chat",
            max_tokens: 15,
            temperature: 1.5,
        });

        const title = completion.choices[0].message.content?.trim();
        return NextResponse.json({ title })

    } catch (error) {
        console.error("Error generating mixtape title:", error);
    }
    return NextResponse.json({ error: "Internal server error"}, {status: 500})
}