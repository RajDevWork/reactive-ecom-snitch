import axios from 'axios'

const authAPI = axios.create({
    baseURL:"http://localhost:3000/api/auth",
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