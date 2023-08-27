import File from "@/models/file";
import { connectToDB } from "@/lib/database";



export const GET = async (request, { params }) => {
    const req=await request.json()
    try {
        await connectToDB()
        const file = await File.find({_id:req._id})
        return new Response(JSON.stringify(file), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const POST = async (request, { params }) => {
    const req=await request.json()
    console.log(" receive requesst from sever side,",req)
    
    return new Response(JSON.stringify({ data: "success" }), { status: 200 })
    // try {
    //     await connectToDB()

    //     const options = {
    //         upsert: true, // Creates a new document if no match is found
    //         new: true, // Returns the modified document
    //         setDefaultsOnInsert: true // Sets default values if a new document is created
    //       };
        
    //       try {
    //         const result = await File.findOneAndUpdate({}, {
    //             inodeNumber:'1',
    //             remarks:'new file'
    //         }, options);
    //         console.log(result);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //       return new Response(JSON.stringify({ data: "success" }), { status: 200 })
    // } catch (error) {
    //     return new Response("Failed to fetch prompts created by user", { status: 500 })
    // }
}

export const PUT =async (request)=>{
    
}