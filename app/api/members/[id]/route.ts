import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        
        const result = await pool.query(`
            SELECT *
            FROM members
            ORDER BY id ASC
        `);

        return NextResponse.json(
            {
                success: true,
                members: result.rows,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch members",
            },
            {
                status: 500,
            }
        );
    }
}