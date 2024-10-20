import { qb } from '@/app/utils/database/qb';

export async function POST(req : any) {
    const rep_id = await req.json();
    console.log("rep_id:", rep_id)
    console.log("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
    try{
        await qb.deleteFrom("recipes").where("recipes.rep_id", "=", rep_id.rep_id).execute();
        return new Response(JSON.stringify({ message: "Successfully removed the recipe" }), { status: 201 });
    }
    catch(error){
        console.error('Error deleting recipe:', error);
        return new Response(JSON.stringify({ error: "Failed to delete recipe. Please try again later." }), { status: 500 });
    }
}