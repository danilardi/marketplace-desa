import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useEffect, useState } from "react"
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
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ ]|(\\[ -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[ -Z^-~]*])"
    );

    useEffect(() => {
        setIsUsernameValid(account.username.length >= 6);
        setIsPasswordValid(account.password.length >= 8);
        setIsEmailValid(regex.test(account.email));
        setIsConfirmPasswordValid(account.password === account.confirm_password);
    }, [account]);

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
        // // console.log("res", res)
        if (res) {
            navigate('/login')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full mt-8">
            <div className="card shadow-lg w-96">
                <div className="card-body">
                    <h2 className="card-title">Pendaftaran Akun</h2>
                    <form action="" className="form-control mt-4">
                        <div className="flex flex-col gap-2">
                            <label>Nama Lengkap</label>
                            <InputText
                                type="text"
                                value={account.fullname}
                                onChange={(e) => {
                                    let _account = { ...account }
                                    _account.fullname = e.target.value
                                    setAccount(_account)
                                }}
                                placeholder="Masukkan nama lengkap disini!"
                            />
                            {(account.fullname.length == 0) && (
                                <small className="text-red-500">Nama tidak boleh kosong</small>
                            )}
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
                                placeholder="Masukkan username disini!"
                            />
                            {(!isUsernameValid && account.username.length > 0) && (
                                <small className="text-red-500">Username minimal 6 karakter</small>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Email</label>
                            <InputText
                                type="email"
                                autoComplete="off"
                                value={account.email}
                                onChange={(e) => {
                                    let _account = { ...account }
                                    _account.email = e.target.value
                                    setAccount(_account)
                                }}
                                placeholder="Masukkan email disini!"
                            />
                            {(!isEmailValid && account.email.length > 0) && (
                                <small className="text-red-500">Input harus berbentuk email</small>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Kata Sandi</label>
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
                                        placeholder="Masukkan kata sandi disini!"
                                    />
                                </IconField>
                            </div>
                            {(!isPasswordValid && account.password.length > 0) && (
                                <small className="text-red-500">Kata sandi minimal 8 karakter</small>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <label>Konfirmasi Kata Sandi</label>
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
                                        placeholder="Masukkan konfirmasi kata sandi disini!"
                                    />
                                </IconField>
                            </div>
                            {(!isConfirmPasswordValid && account.confirm_password.length > 0) && (
                                <small className="text-red-500">Kata sandi harus sama</small>
                            )}
                        </div>
                        <Button
                            disabled={!(account.fullname.length > 0 && isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid)}
                            type="submit"
                            className="btn btn-accent text-white !mt-6"
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