'use server'
export const getCategoryBrand = async () =>{

    try {

       const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
        method : "GET"
       })

       if(!res.ok){

        return {
            success : false,
            statusCode : res.status,
            message : "Failed to fetch gear details"
        }

       }

       const result = await res.json()
       return result

        
    } catch (error) {
        console.error("Get Gear Error : ", error)
        return{
            success : false,
            message : "Internal server error. Try again later."
        }
    }

}