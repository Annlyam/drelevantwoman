import { NextResponse } from "next/server";
import { getMemberById } from "../supabase.model";


interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, {params}: Params) {
    try {
        const  { id } = await params;
        // SQL Query to GetMemberById
        const data = await getMemberById(id);
        return NextResponse.json({ status: 200, success: true, members: data});

    } catch (error) {
        return NextResponse.json({status: 500, success: false, message: "Failed to fetch members"}
        );
    }
}