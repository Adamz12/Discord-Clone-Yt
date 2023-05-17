import { HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../features/channelSlice";


function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );

    {
      navigate(`/channels/${id}`);
    }
  };
  return (
    <div
      className="font-medium flex items-center cursor-pointer hover:bg-[#3a3c43] p-1 rounded-md hover:text-white"
      key={id}
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2" /> {channelName}
    </div>
  );
}

export default Channel;
