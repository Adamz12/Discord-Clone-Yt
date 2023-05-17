import { GiftIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  HashtagIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import {
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { auth, db, firebase } from "../firebase";
import Message from "./Message";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  //   const [messages] = useCollection(
  //     channelId && db.collection("channels"),
  //     doc(channelId).collection("messages").orderBy("timestamp", "asc")
  //   );
  const messagesCollectionRef =
    channelId && collection(db, "channels", channelId, "messages");
  const messagesQuery =
    channelId && query(messagesCollectionRef, orderBy("timestamp", "asc"));
  const [messages] = useCollection(messagesQuery);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      const messageData = {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      };

      try {
        await addDoc(
          collection(db, "channels", channelId, "messages"),
          messageData
        );
      } catch (error) {
        console.log("Error sending message: ", error);
      }
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    scrollToBottom();
  };

  // Function to fetch messages
  const fetchMessages = async () => {
    const messagesQuery = query(
      collection(db, "channels", channelId, "messages"),
      orderBy("timestamp"),
      limit(10)
    );

    try {
      const querySnapshot = await getDocs(messagesQuery);
      querySnapshot.forEach((doc) => {
        // Process each message document
        console.log("Message: ", doc.data());
      });
    } catch (error) {
      console.log("Error fetching messages: ", error);
    }
  };

  // Call fetchMessages function to retrieve messages initially or as needed

  useEffect(() => {
    if (channelId) {
      fetchMessages();
      if (inputRef.current) {
        inputRef.current.value = ""; // Reset the value of the input element
      }
      scrollToBottom();
    }
  }, [channelId]);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatBubbleLeftIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white pl-1 placeholder-[#72767d] "
            />
            <MagnifyingGlassIcon className="h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>

      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {messages?.docs.map((doc) => {
          const { message, timestamp, name, photoURL, email } = doc.data();
          console.log(doc.data());
          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              timestamp={timestamp}
              name={name}
              photoURL={photoURL}
              email={email}
            />
          );
        })}

        <div ref={chatRef} className="pb-2" />
      </main>

      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4" />
        <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            ref={inputRef}
          />
          <button hidden type="sumbit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <FaceSmileIcon className="icon" />
      </div>
    </div>
  );
}

export default Chat;
