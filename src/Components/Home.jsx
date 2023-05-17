import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, doc, query, getDocs } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import Servericon from "./ServerIcon";
import worldIcon from "../assets/world-icon.png";
import {
  ChevronDownIcon,
  CogIcon,
  MicrophoneIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Channel from "./Channel";
import { useCollectionData } from "react-firebase-hooks/firestore";
import discordAvatar from "../assets/discord-avatar.png";
import Chat from "./Chat";

function Home() {
  const [user] = useAuthState(auth);
  console.log(user);
  //   const channelsRef = collection(db, "channels");
  //   const query = query(channelsRef);
  //   const [channels] = useCollectionData(channelsRef, { idField: "id" });
  // const channelsCollection = collection(db, "channels");
  // const channelsQuery = query(channelsCollection);
  // const [channels] = useCollectionData(channelsQuery, { idField: "id" });
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "channels"));
      const fetchedChannels = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChannels(fetchedChannels);
    };

    fetchData();
  }, []);

  console.log(channels);

  const handleAddChannel = async () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      try {
        await addDoc(channels, {
          channelName: channelName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!user && <Navigate to="/" />}
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple">
            <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          <Servericon image="https://rb.gy/qidcpp" />
          <Servericon image={worldIcon} />
          <Servericon image="https://rb.gy/qidcpp" />
          <Servericon image={worldIcon} />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 group-hover:text-white" />
          </div>
        </div>

        <div className="bg-discord_channelsBg flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373c] cursor-pointer">
            Official PAPA Server...
            <ChevronDownIcon className="h-5 ml-2" />{" "}
          </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className="h-3 mr-2" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon
                className="h-6 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {channels?.map((channel) => (
                <Channel
                  key={channel.id}
                  id={channel.id}
                  channelName={channel.channelName}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1">
              <img
                src={user?.photoURL || discordAvatar}
                alt=""
                className="h-10 rounded-full cursor-pointer"
                onClick={() => auth.signOut()}
              />
              <h4 className="text-white text-xs font-medium">
                {user?.displayName}
                <span className="text-[#b9bbbe] block cursor-none">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="text-gray-400 flex items-center">
              <div className="icon-container">
                <MicrophoneIcon className="h-5 icon" />
              </div>
              <div className="icon-container">
                <PhoneIcon className="h-5 icon" />
              </div>
              <div className="icon-container">
                <CogIcon className="h-5 icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#36393f] flex-grow">
            <Chat />
        </div>
      </div>
    </>
  );
}

export default Home;
