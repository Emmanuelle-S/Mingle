// src/components/Messenger.jsx
import React, { useState, useEffect } from "react";


const Messenger = ({ friends, conversations, fetchConversation, onClose }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isMobile, setIsMobile] = useState(false); // État pour détecter si l'appareil est mobile

  
    useEffect(() => {
      if (selectedConversation) {
        const fetchMessages = async () => {
          const messages = await fetchConversation(selectedConversation.id);
          setMessages(messages);
        };
        fetchMessages();
      }
    }, [selectedConversation]);

    useEffect(() => {
        // Fonction pour détecter si l'appareil est mobile
        const detectMobile = () => {
            return window.innerWidth <= 1020; // Changer 768 selon les besoins
        };

        // Met à jour l'état isMobile lors du chargement initial
        setIsMobile(detectMobile());

        // Ajoute un écouteur de changement de taille d'écran pour détecter les changements lors du redimensionnement
        const handleResize = () => {
            setIsMobile(detectMobile());
        };

        window.addEventListener("resize", handleResize);

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (
    <>
        <div className=" h-[97vh] w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden pt-6">
            <div className="flex-1 flex flex-col">
                {!isMobile && ( 
                    <main className="flex-grow flex flex-row min-h-0">
                        {selectedConversation && (
                            <section className="relative flex flex-col items-center flex-auto border-l border-gray-800 md:w-[400px]">
                                <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-100" onClick={() => setSelectedConversation(null)}>
                                    Close
                                </button>
                                <div className="flex flex-col h-full pt-8">
                                    <div className="flex-1 overflow-y-auto p-4">
                                        {messages.map((msg, index) => (
                                            <div
                                            key={index}
                                            className={`p-2 my-2 rounded shadow ${
                                                msg.isMine ? "bg-blue-600" : "bg-gray-800"
                                            }`}
                                            >
                                            {msg.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex p-4">
                                    <input
                                        type="text"
                                        className="flex-1 p-2 border rounded-l-md"
                                        placeholder="Type a message"
                                    />
                                    <button className="p-2 bg-blue-500 text-white rounded-r-md">
                                        Send
                                    </button>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center justify-center text-gray-500">
                                    Select a conversation to start chatting
                                </div>
                            </section>
                        )}
                        <section className="relative flex flex-col flex-none overflow-auto md:w-[600px]">
                            <button className="absolute top-6 right-4 text-gray-100 hover:text-gray-100" onClick={onClose}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            </button>
                            <div className="p-4 flex flex-row justify-between items-center flex-none">
                                <div className="w-16 h-16 relative flex flex-shrink-0">
                                    <img
                                    className="rounded-full w-full h-full object-cover"
                                    alt="User"
                                    src="https://via.placeholder.com/150"
                                    />
                                </div>
                            </div>
                            <div className="p-4 flex-none">
                                <form id="serchMessage" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative">
                                        <label>
                                            <input
                                                className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                                                type="text"
                                                placeholder="Search Messenger"
                                            />
                                            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                                <svg viewBox="0 0 24 24" className="w-6 h-6">
                                                    <path
                                                    fill="#bbb"
                                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-row p-2 overflow-auto w-0 min-w-full">
                                <div className="text-sm text-center mr-4">
                                    <button
                                        className="flex flex-shrink-0 focus:outline-none bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                                        type="button"
                                        >
                                        <svg
                                            className="w-full h-full fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                                        </svg>
                                    </button>
                                    <p>Your Story</p>
                                </div>
                                {friends.map((friend) => (
                                    <div key={friend.id} className="text-sm text-center mr-4">
                                        <button
                                            className="flex flex-shrink-0 focus:outline-none bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                                            type="button"
                                        >
                                            <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={friend.avatar}
                                            alt={friend.name}
                                            />
                                        </button>
                                        <p>{friend.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 flex-1 overflow-y-scroll">
                                {conversations.map((conv) => (
                                    <div
                                    key={conv.id}
                                    className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative cursor-pointer"
                                    onClick={() => setSelectedConversation(conv)}
                                    >
                                        <div className="w-16 h-16 relative flex flex-shrink-0">
                                            <img
                                            className="shadow-md rounded-full w-full h-full object-cover"
                                            src={conv.avatar}
                                            alt={conv.name}
                                            />
                                        </div>
                                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                                            <p>{conv.name}</p>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <div className="min-w-0">
                                                    <p className="truncate">{conv.lastMessage}</p>
                                                </div>
                                                <p className="ml-2 whitespace-no-wrap">
                                                    {conv.lastMessageTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                )}
                {isMobile && ( 
                    <main className="flex-grow flex flex-col min-h-0">
                    {selectedConversation ? (
                        <section className="relative flex flex-col items-center flex-auto border-l border-gray-800 w-full">
                            <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-100" onClick={() => setSelectedConversation(null)}>
                                Close
                            </button>
                            <div className="flex flex-col h-full pt-8 w-full">
                                <div className="flex-1 overflow-y-auto p-4 w-full">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 my-2 rounded shadow ${
                                                msg.isMine ? "bg-blue-600" : "bg-gray-800"
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex p-4 w-full">
                                    <input
                                        type="text"
                                        className="flex-1 p-2 border rounded-l-md"
                                        placeholder="Type a message"
                                    />
                                    <button className="p-2 bg-blue-500 text-white rounded-r-md">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <section className="relative flex flex-col flex-none overflow-auto w-[320px]">
                            <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-100" onClick={onClose}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            </button>
                            <div className="p-4 flex flex-row justify-between items-center flex-none">
                                <div className="w-8 h-8 relative flex flex-shrink-0">
                                    <img
                                        className="rounded-full w-full h-full object-cover"
                                        alt="User"
                                        src="https://via.placeholder.com/150"
                                    />
                                </div>
                            </div>
                            <div className="p-4 flex-none">
                                <form id="serchMessageMobile" onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative">
                                        <label>
                                            <input
                                                className="rounded-full text-xs py-1 pr-3 pl-7 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                                                type="text"
                                                placeholder="Search Messenger"
                                            />
                                            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                                <svg viewBox="0 0 24 24" className="w-3 h-3">
                                                    <path
                                                        fill="#bbb"
                                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-row p-2 overflow-auto w-full">
                                <div className="flex flex-col items-center text-xs text-center mr-4">
                                    <button
                                        className="flex flex-shrink-0 focus:outline-none bg-gray-800 text-gray-600 rounded-full w-10 h-10"
                                        type="button"
                                    >
                                        <svg className="w-full h-full fill-current self-center" viewBox="0 0 24 24">
                                            <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                                        </svg>
                                    </button>
                                    <p>Your Story</p>
                                </div>
                                {friends.map((friend) => (
                                    <div key={friend.id} className="text-xs text-center mr-4">
                                        <button
                                            className="flex flex-shrink-0 focus:outline-none bg-gray-800 text-gray-600 rounded-full w-10 h-10"
                                            type="button"
                                        >
                                            <img
                                                className="rounded-full w-full h-full object-cover"
                                                src={friend.avatar}
                                                alt={friend.name}
                                            />
                                        </button>
                                        <p>{friend.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 flex-1 overflow-y-scroll">
                                {conversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative cursor-pointer"
                                        onClick={() => setSelectedConversation(conv)}
                                    >
                                        <div className="w-8 h-8 relative flex flex-shrink-0">
                                            <img
                                                className="shadow-md rounded-full w-full h-full object-cover"
                                                src={conv.avatar}
                                                alt={conv.name}
                                            />
                                        </div>
                                        <div className="flex-auto  text-xs min-w-0 ml-4 mr-6 md:block group-hover:block">
                                            <p>{conv.name}</p>
                                            <div className="flex items-center text-gray-600">
                                                <div className="min-w-0">
                                                    <p className="truncate">{conv.lastMessage}</p>
                                                </div>
                                                <p className="ml-2 whitespace-no-wrap">
                                                    {conv.lastMessageTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
                )}
            </div>
        </div>
    </>
  );
};

export default Messenger;
