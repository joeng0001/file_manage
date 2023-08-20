"use client"

import {useUploadThing} from "@/lib/uploadthing"


export default function upload(){

    const {startUpload} =useUploadThing('media')
    return(
    <div>
        test
    </div>)
}