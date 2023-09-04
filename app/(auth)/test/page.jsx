export default async function fileList() {

    const res = await fetch("/api/searchList")
    const real_res = await res?.json()
    console.log(real_res)
    return (<div>
        hi
    </div>)
}