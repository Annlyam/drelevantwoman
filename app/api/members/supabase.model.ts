import pool from "@/lib/db";
import { createClient } from "@/lib/supabaseServer";

export async function checkEmail(normalizedEmail:string){
    try{
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('members')                // Table name
    .select('*')                     // Select all columns
    .eq('email', normalizedEmail);   // WHERE email = normalizedEmail
    
    if (error) {
        return error
    }
    return data; 

    } catch(err) {
        // console.error('Error returning member:', err)
        throw err
    }   
}


export async function RegisterMemberModel(firstName: string, lastName: string, email: string, phone?: string, country?: string){
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
        .from('members') //The TABLE
        .insert([
            { 
                first_name: firstName, last_name: lastName, email,phone: phone || null, country:country || null
            }
        ])
        .select() // Equivalent to RETURNING *
        
        if (error) {
            return error
        }
        return data;

    } catch (err) {
        // console.error('Error inserting member:', err)
        throw err
    }
}


export async function getAllMembers(){
    try{
        const supabase = await createClient();
        const { data, error } = await supabase
        .from('members')        // Table name
        .select('*')            // Select all columns
        .order('id', { ascending: true }) // ORDER BY id ASC

        if (error) {
            return error
        }
        return data;
    } catch (err){
        // console.error('Error inserting member:', err)
        throw err
    }
}


export async function getMemberById(id : string){
    try{
    const supabase = await createClient();   
    const { data, error } = await supabase
    .from('members')        // Table name
    .select('*')            // Select all columns
    .order('id', { ascending: true }) // ORDER BY id ASC
    .eq('id', id)   //WHERE id = id
    .single()

    if (error) {
        return error
    }
    return data;
    } catch (err){
        // console.error('Error inserting member:', err)
        throw err
    }
}