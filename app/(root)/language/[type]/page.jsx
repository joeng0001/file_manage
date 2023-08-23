import AceEditor from '@/components/AceEditor'
import Image from 'next/image'
export default function showByLanguage(){

    const imageList=[
        'android','angular','apple','bootStrap','css',
        'html','java','jquery','js','nodejs','php',
        'python','rails','ruby','window','wordpress'
    ]

      
    
    return (
        <div>
            <span id="movingSpan">
                {imageList.map(image=>{
                    return(
                        <Image
                                src={`/assets/${image}.png`}
                                alt="not found"
                                width={24}
                                height={24}
                            />
                    )
                })}
                
            </span>
            {/* <AceEditor /> */}
        </div>
    )
}