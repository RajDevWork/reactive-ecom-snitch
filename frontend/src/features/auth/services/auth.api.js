import axios from 'axios'

const authAPI = axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

//handle register
export const register = async(fullname,email,contact,password,isSeller)=>{
        try {
            const response = await authAPI.post("/register",{
                fullname,
                email,
                contact,
                password,
                isSeller
            })
            return response.data
        } catch (error) {
            return error.message
        }

}

export const login = async (email,password)=>{
    try {
        const response = await authAPI.post("/login",{
            email,
            password
        })
        return response.data
    } catch (error) {
        return error.message
    }
}