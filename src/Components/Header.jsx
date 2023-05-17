import React from "react";
import discordLogo from "../assets/discord-logo9.png";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  //   const signIn = (e) => {
  //     e.preventDefault();

  //     auth
  //       .signInWithRedirect(provider)
  //       .then(() => navigate.push("/channels"))
  //       .catch((error) => alert(error.message));
  //   };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/channels"))
      .catch((error) => alert(error.message));
  };

  const handleOpenDiscord = () => {
    navigate("/channels");
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
      <a href="/" className="flex items-center justify-center">
        <img
          src={discordLogo}
          alt=""
          className="w-30 h-12 object-contain mr-3"
        />
        <h1 className="text-white font-semibold tracking-widest">DISCORD</h1>
      </a>
      <div className="hidden lg:flex space-x-6 text-white">
        <a className="link">Download</a>
        <a className="link">Why Discord?</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          onClick={!user ? handleLogin : handleOpenDiscord}
        >
          {!user ? "Login" : "Open Discord"}
        </button>
        <Bars3Icon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
}

export default Header;
