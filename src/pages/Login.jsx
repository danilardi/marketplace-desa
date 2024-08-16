import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { login } from "../utils/API/Auth"
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { ToastSuccess } from '../utils/AlertNotification'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [account, setAccount] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setIsPasswordValid(account.password.length >= 8);
    }, [account]);

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const loginRequest = {
            usernameOrEmail: account.email,
            password: account.password
        }
        const res = await login(loginRequest)
        setLoading(false)
        if (res) {
            ToastSuccess('Login success')
            navigate('/')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full mt-8">
            <div className="card shadow-lg w-96">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <form action="" className="form-control mt-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <InputText
                                type="text"
                                value={account.email}
                                onChange={(e) => {
                                    let _account = { ...account }
                                    _account.email = e.target.value
                                    setAccount(_account)
                                }}
                                placeholder="Masukkan email/username disini!" />
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label htmlFor="password">Password</label>
                            <IconField>
                                <InputIcon className={showPassword ? 'pi pi-eye' : 'pi pi-eye-slash'} onClick={() => setShowPassword(!showPassword)}></InputIcon>
                                <InputText
                                    type={showPassword ? 'text' : 'password'}
                                    value={account.password}
                                    onChange={(e) => {
                                        let _account = { ...account }
                                        _account.password = e.target.value
                                        setAccount(_account)
                                    }}
                                    placeholder="Masukkan password disini!" />
                            </IconField>
                            {(!isPasswordValid && account.password.length > 0) && (
                                <small className="text-red-500">Kata sandi minimal 8 karakter</small>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="btn btn-accent text-white !mt-6"
                            onClick={handleLogin}
                            loading={loading}
                        ><span>Login</span></Button>
                    </form>
                    <p className="block text-center mt-4">Belum punya akun? <a href="/register" className="text-blue-600">Daftar disini</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login