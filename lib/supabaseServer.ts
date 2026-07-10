import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";


export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            cookies: {
                getAll: function() {
                    return cookieStore.getAll()
                },
                setAll: function(cookiesTOSet) {
                    try {       
                        cookiesTOSet.forEach(({name, value, options}) => 
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        return
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing user sessions.
                    }
                },
            },
        }
    )
}





// export default supabase;


