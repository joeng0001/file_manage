import Folder from "@/models/folder"
import { connectToDB } from "@/lib/database";

export const GET = async (request, { params }) => {

    try {
        const req = await request.json()
        await connectToDB()
        const options = {
            upsert: true, // Creates a new document if no match is found
            new: true, // Returns the modified document
            setDefaultsOnInsert: true // Sets default values if a new document is created
        };

        try {
            const result = await Folder.findOneAndUpdate({}, {
               name:'',
               rootFolderId:'',
               level:1,
               
            }, options);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        return new Response(JSON.stringify({ data: "success" }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 