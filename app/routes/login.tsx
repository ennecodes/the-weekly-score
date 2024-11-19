import {
  ActionFunctionArgs, json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Link, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";

import { createUserSession, getUserFromSession } from "~/auth.server";
import { signIn } from "~/utils/firebase.client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await getUserFromSession(request);
    if (user) return redirect("/");
  } catch {
    return json({});
  }
  return json({});
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const idToken = formData.get("idToken");

  if (typeof idToken !== "string") {
    return json({ error: "Invalid token" }, { status: 400 });
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
      const form = document.createElement("form");
      form.method = "post";

      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "idToken";
      tokenInput.value = idToken;

      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login",
      );
      setIsLoading(false);
    }
  };

  const isSubmitting = isLoading || navigation.state === "submitting";

  return (
    <div className="flex min-h-full flex-col justify-center antialiased">
      <div className="mx-auto w-full max-w-md rounded-md bg-pink-50 px-8 py-8">
        <h2 className="pb-2 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-pink-300 bg-fuchsia-50 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-pink-300 bg-fuchsia-50 shadow-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md border border-transparent bg-fuchsia-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-fuchsia-700 disabled:border-fuchsia-200 disabled:bg-fuchsia-100 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Error Display */}
        {error || actionData?.error ? (
          <div className="mt-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
            {error || actionData?.error}
          </div>
        ) : null}

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
