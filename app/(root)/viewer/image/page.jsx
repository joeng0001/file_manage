import AceEditor from '@/components/AceEditor'



export default function showByLanguage(){
    const url="url"
    const type="image/png"

    return (
        <div>
            <embed src={url}
                type={type}
                width="100%" height="90%">

            </embed>
        </div>
    )
}