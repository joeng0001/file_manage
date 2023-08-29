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


const getParentId=(path)=>{
    const pathList=path?.split('/')
    const level=pathList?.length
    const parentFolder=Folder.find({level:level,name:pathList[level-1]}) 
    if(!parentFolder) return[null,null]
    return [level,parentFolder._id]
}

export const POST = async (request, { params }) => {

    try {
        const req = await request.json()
        await connectToDB()
        const res=await Folder.find({name:req.name})
        if(res){
            return new Response(JSON.stringify({ message: "Folder already existed" }), { status: 400 })
        }
        const path=req.path
        const [level,parentFolderId]=getParentId(path)
        if(!level || ! parentFolderId){
            return new Response(JSON.stringify({ message: "folder nopt exist" }), { status: 400 })
        }

        const folder=new Folder({
            name:req.name,
            comment:req.comment,
            parentFolderId:parentFolderId,
            level:level
        })
        await folder.save()
        return new Response(JSON.stringify({ data: "success" }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}

export const Delete =async (request)=>{
    try{

    }catch(error){
        console.error(error)
    }
}