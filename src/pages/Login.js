import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase";


const Login = (props) => {
  const navigate = useNavigate();
  const page = props.createPage;

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    // console.log(result);

    page ? navigate("/create-post") : navigate("/")
  }
  return (
    <div className="rounded-xl w-3/4 sm:text-2xl bg-slate-600 sm:w-2/5 mx-auto mt-10 py-10 px-2 ">
      <p className="my-5 text-2xl font-medium text-slate-300">Sign in with google</p>
      <button className=" bg-slate-500 text-xl  hover:bg-slate-900 hover:text-slate-400 my-4 py-2 px-3 rounded-md w-1/3 sm:w-2/5" onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}

export default Login