import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useState } from "react"
import { register } from "../utils/API/Auth"
import { useNavigate } from "react-router-dom"



const Register = () => {
    const [account, setAccount] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        role: 2,
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        const registerRequest = {
            fullname: account.fullname,
            username: account.username,
            email: account.email,
            password: account.password,
            roleId: account.role
        }
        const res = await register(registerRequest);
        setLoading(false)
        // console.log("res", res)
        if (res) {
            navigate('/login')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full mt-8">
            <div className="card shadow-lg w-96">
                <div className="card-body">
                    <h2 className="card-title">Register</h2>
                    <form action="" className="form-control mt-4">
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Fullname</label>
                            <InputText
                                type="text"
                                value={account.fullname}
                                onChange={(e) => {
                                    let _account = { ...account }
                                    _account.fullname = e.target.value
                                    setAccount(_account)
                                }}
                                placeholder="Enter fullname here"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Username</label>
                            <InputText
                                type="text"
                                value={account.username}
                                onChange={(e) => {
                                    let _account = { ...account }
                                    _account.username = e.target.value
                                    setAccount(_account)
                                }}
                                placeholder="Enter username here"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Email</label>
                            <InputText
                                type="email"
                                value={account.email}
                                onChange={(e) => {
                                    let _account = { ...account }
                                    _account.email = e.target.value
                                    setAccount(_account)
                                }}
                                placeholder="Enter email here"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Password</label>
                            <div className="flex gap-3">
                                <IconField>
                                    <InputIcon className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"} onClick={() => setShowPassword(!showPassword)}> </InputIcon>
                                    <InputText
                                        type={showPassword ? "text" : "password"}
                                        value={account.password}
                                        onChange={(e) => {
                                            let _account = { ...account }
                                            _account.password = e.target.value
                                            setAccount(_account)
                                        }}
                                        placeholder="Enter password here"
                                    />
                                </IconField>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Confirm Password</label>
                            <div className="flex gap-3">
                                <IconField>
                                    <InputIcon className={showConfirmPassword ? "pi pi-eye" : "pi pi-eye-slash"} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></InputIcon>
                                    <InputText
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={account.confirm_password}
                                        onChange={(e) => {
                                            let _account = { ...account }
                                            _account.confirm_password = e.target.value
                                            setAccount(_account)
                                        }}
                                        placeholder="Enter confirm password here"
                                    />
                                </IconField>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="btn btn-primary text-white !mt-6"
                            onClick={handleRegister}
                            loading={loading}
                        >
                            <span>Register</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register