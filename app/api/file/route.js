import File from "@/models/file";
import { connectToDB } from "@/utils/database";



export const GET = async (request, { params }) => {

    try {
        await connectToDB()

        const files = await File.find({})
        return new Response(JSON.stringify(files), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const POST = async (request, { params }) => {
    try {
        await connectToDB()

        const options = {
            upsert: true, // Creates a new document if no match is found
            new: true, // Returns the modified document
            setDefaultsOnInsert: true // Sets default values if a new document is created
          };
        
          try {
            const result = await File.findOneAndUpdate({}, {
                inodeNumber:'1',
                remarks:'new file'
            }, options);
            console.log(result);
          } catch (error) {
            console.error(error);
          }
          return new Response(JSON.stringify({ data: "success" }), { status: 200 })
        return new Response(JSON.stringify(file), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}

export const PUT =async (request)=>{
    
}