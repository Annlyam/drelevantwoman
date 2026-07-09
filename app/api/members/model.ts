import pool from "@/lib/db";
import { createClient } from "@/lib/supabaseServer";

export async function checkEmail(normalizedEmail:string){
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('members')                // Table name
    .select('*')                     // Select all columns
    .eq('email', normalizedEmail);   // WHERE email = normalizedEmail
    
    if (error) {
        console.error('Error fetching member:', error.message);
        return
    }
    if (data[0]) {
        console.log(data);
        return data;
    } else {
        return null
    }
}


export async function memberModel(
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    country?: string
    ) {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase.from('members').insert([
            {
            first_name: firstName,
            last_name: lastName,
            email,
            phone: phone || null,     // Ensure optional fields are null if undefined
            country: country || null
            }
        ])
        .select() // Equivalent to RETURNING *

        if (error) throw error

        return data
    } catch (err) {
        console.error('Error inserting member:', err)
        throw err
    }
    }