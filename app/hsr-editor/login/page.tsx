"use client";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const toLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsdisabled(true);

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsdisabled(false);

        if (data.status === 203) {
          setErrorMessage("Mauvais identifiant");
          return null;
        }
        router.push("/hsr-editor");
      });
  };

  return (
    <header className="flex w-full min-h-[calc(100vh-178px)] justify-center items-center">
      <div className="flex w-[800px] h-96 bg-white rounded-3xl justify-center items-center">
        <form className="flex flex-col gap-5">
          <label>
            <p className="font-bold">Utilisateur</p>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md p-1"
            />
          </label>
          <label>
            <p className="font-bold">Mot de passe</p>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md p-1"
            />
          </label>
          <button
            disabled={isDisabled}
            className="bg-green p-2 rounded-xl border mt-5"
            onClick={toLogin}
          >
            Se connecter
          </button>
          {errorMessage && (
            <p className="text-red font-bold text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </header>
  );
}
