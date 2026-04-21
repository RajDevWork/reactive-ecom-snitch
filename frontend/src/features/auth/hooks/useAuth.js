import { setError, setLoading, setUser } from "../state/auth.slice"
import { register, login, getMe,logout  } from "../services/auth.api"
import { useDispatch } from "react-redux"
import { setItems } from "../../cart/state/cart.slice";



export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {

        const data = await register({ email, contact, password, fullname, isSeller })

        dispatch(setUser(data.user))

        return data.user
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        try {
            await logout();

            // redux clean
            dispatch(setUser(null));
            dispatch(setItems([]));

            

        } catch (err) {
            console.log(err);
        }
    }
    

    return { handleRegister, handleLogin, handleGetMe,handleLogout }

}