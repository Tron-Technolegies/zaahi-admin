import { useLogin } from "../hooks/auth/useLogin";

export default function Login() {
  const { isPending, mutateAsync } = useLogin();
  return (
    <div>
      <div className="min-h-screen grid place-items-center  p-3 ">
        <div className="border-white border p-5 rounded-lg md:w-[600px] w-[90%] shadow-2xl flex flex-col gap-3 items-center ">
          <p className="text-2xl font-black text-black w-full text-center pb-2 mt-3">
            Zaahi Admin Login
          </p>

          <form
            className="flex flex-col items-center gap-5 w-full mt-6 backdrop-blur-xl"
            onSubmit={async (e) => {
              e.preventDefault();
              const formdata = new FormData(e.target);
              const data = Object.fromEntries(formdata);
              await mutateAsync(data);
            }}
          >
            <input
              type="email"
              name="email"
              className="text-sm shadow bg-transparent appearance-none outline-none p-2 w-full rounded-xl border-white border"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              className="text-sm shadow bg-transparent outline-none appearance-none p-2 w-full rounded-xl border-white border"
              placeholder="password"
              required
            />

            <button
              type="submit"
              disabled={isPending}
              className="p-1.5 bg-gray-800 text-white hover:bg-black hover:text-amber-50 font-medium mt-2 mb-4 w-3xs text-sm text-black rounded-xl"
            >
              {isPending ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
