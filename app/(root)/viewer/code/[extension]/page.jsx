import AceEditor from '@/components/AceEditor'



export default function showByLanguage({params}){

    const fileType=params?.extension





    return (
        <div>
            edit...
            <div>
                php python java
            </div>
            <AceEditor/>
        </div>
    )
}