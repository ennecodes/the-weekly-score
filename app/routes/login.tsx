import { ActionFunctionArgs, LoaderFunctionArgs, redirect,} from "@remix-run/node";
import {Link, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";

import { createUserSession, getUserFromSession } from "~/models/auth.server";
import { signIn } from "~/utils/firebase.client";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//     try {
//     const user = await getUserFromSession(request);
//     if (user) return redirect("/");
//     }
//     catch {
//       return Response.json({});
//     }
//     return Response.json({});
  
//   };

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const idToken = formData.get("idToken");
  
  if (typeof idToken !== "string") {
    return Response.json({ error: "Invalid token" }, { status: 400 });
  }

  return createUserSession(idToken, "/");
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const idToken = await signIn(email, password);
      const form = document.createElement('form');
      form.method = 'post';
      
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'idToken';
      tokenInput.value = idToken;
      
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
      setIsLoading(false);
    }
  };

  const isSubmitting = isLoading || navigation.state === "submitting";
  
  return (
    <div className="flex min-h-full flex-col justify-center antialiased">
      <div className="mx-auto w-full max-w-md px-8 bg-pink-50 py-8 rounded-md">
      <h2 className="text-center pb-2">Login</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 border-pink-300 bg-fuchsia-50 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 border-pink-300 bg-fuchsia-50 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-400 hover:bg-fuchsia-700 disabled:opacity-50 disabled:bg-fuchsia-100  disabled:border-fuchsia-200"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Error Display */}
      {(error || actionData?.error) ? <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error || actionData?.error}
        </div> : null}

        <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/signup",
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
    </div>
    </div>
  );
}
