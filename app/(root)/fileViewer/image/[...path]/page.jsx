"use client"
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor/Fabric'), {
    ssr: false,
});
export default function ck({ params, searchParams }) {
    const path = params?.path.join('/')
    const name = searchParams.name
    const type = searchParams.type

    return (
        <div>
            <Editor
                path={path} name={name} type={type}
            ></Editor>
        </div>
    )
}