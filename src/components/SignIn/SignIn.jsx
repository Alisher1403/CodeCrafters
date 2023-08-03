import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {logIn} from "../../app/features/user/userSlice";

function SignIn() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email && !formData.password) {
            toast.error("Iltimos bosh joylarni toldiring ?!", {theme: "dark",});
            return;
        }

        try {
            const response = await fetch(
                "https://akhror-leetcode.azurewebsites.net/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            console.log(data);

            if ((response.status >= 200) & (response.status <= 300)) {
                // Login successful
                // Perform any necessary actions such as setting authentication tokens, user data, etc.
                navigate("/"); // Navigate to the dashboard or protected page
                toast.success("Akkountizga mufaqiyatli kirdingiz", {theme: "dark",});
                dispatch(logIn(data));
            } else {
                // Login failed
                console.error("Login failed:", data.error);
                toast.error("Server tomondan xato iltimos , boshqattan toldiring ))", {theme: "dark",});
                // Handle the error, display a message, etc.
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Server tomondan xato iltimos , boshqattan toldiring ))", {theme: "dark",});
        }
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    };
    return (
        <article className="text-white">
            <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="rounded-3xl dark:bg-gray-900 max-w-md w-full p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl tracking-wider leading-tight  text-gray-900 md:text-2xl dark:text-white font-Lexend">
                        Akkauntizga kirin
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white font-Karla"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({...formData, email: e.target.value})
                                }
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white font-Karla"
                            >
                                Parol
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({...formData, password: e.target.value})
                                }
                                required=""
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start"></div>
                            <a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer font-Lexend">
                                Parol esdan chiqdimi?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full font-Lexend tracking-wide text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={(e) => handleLogin(e)}
                        >
                            Kirish
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex gap-5 font-Karla">
                            Akkaunt yoqmi
                            <a
                                href="#"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500 font-Lexend"
                                onClick={() => handleSignUpClick()}
                            >
                                Regestratsiya
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </article>
    );
}

export default SignIn;
