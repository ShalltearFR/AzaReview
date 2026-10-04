import { NextRequest, NextResponse } from "next/server";
import Teams from "@/models/Teams.model";
import connectDB from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const characterId = searchParams.get("characterId");

        if (!characterId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "characterId est requis",
                },
                { status: 400 }
            );
        }

        const teams = await Teams.findOne({
            characterID: characterId,
        }).lean();

        // Aucun document trouvé pour ce personnage
        if (!teams) {
            return NextResponse.json(
                {
                    success: true,
                    data: [],
                    characterID: characterId,
                },
                {
                    headers: {
                        "Cache-Control": "public, max-age=60",
                    },
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: teams.data,
                characterID: teams.characterID,
            },
            {
                headers: {
                    "Cache-Control": "public, max-age=60",
                },
            }
        );
    } catch (error) {
        console.error("GET /api/teams error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erreur lors de la récupération des teams",
            },
            { status: 500 }
        );
    }
}