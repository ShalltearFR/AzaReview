import { NextRequest, NextResponse } from "next/server";
import Teams from "@/models/Teams.model";
import connectDB from "@/lib/dbConnect";

export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const { characterID, data } = body;

        if (!characterID) {
            return NextResponse.json(
                {
                    success: false,
                    message: "characterID est requis",
                },
                { status: 400 }
            );
        }

        if (!Array.isArray(data)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "data doit être un tableau",
                },
                { status: 400 }
            );
        }

        const teams = await Teams.findOneAndUpdate(
            {
                characterID: String(characterID),
            },
            {
                $set: {
                    characterID: String(characterID),
                    data,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        ).lean();

        return NextResponse.json({
            success: true,
            data: teams.data,
            characterID: teams.characterID,
        });
    } catch (error) {
        console.error("PUT /api/teams error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erreur lors de l'enregistrement des teams",
            },
            { status: 500 }
        );
    }
}