export const getGear = async () => {
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 1,
            tags: ["gears"]
        }
    })

    const result = await res.json();
    return result
}