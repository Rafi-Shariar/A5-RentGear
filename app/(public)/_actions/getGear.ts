export const getGear = async (options?: {
  query?: { [key: string]: string | string[] | undefined };
}) => {

    const query = options?.query
    const params = new URLSearchParams()

    if(query && query.searchTerm){
        params.set("searchTerm", query.searchTerm as string)
    }

    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear?${params.toString()}`, {
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 1,
            tags: ["gears"]
        }
    })

    const result = await res.json();
    return result
}