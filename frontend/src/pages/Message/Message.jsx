// src/components/Messenger.jsx
import React, { useState, useEffect } from "react";
import ChatInput from "@components/ChatSendInput/ChatSendInput";
import SearchComponent from "@components/SearchComponant/SearchComponant";
import AddFriendsBtn from "@components/AddFriendsBtn/AddFriendsBtn";
import DateTimeDisplay from "@components/ConvertDate/ConvertDate";
import axios from "axios";


const Messenger = ({ user, users, friendsTable, friends, setFriends, conversations, setConversations, fetchConversation, fetchMingle, onClose }) => {
    console.log('conversations:', conversations)
    const [selectedConversation, setSelectedConversation] = useState(null);
    console.log('selectedConversation:', selectedConversation)
    const [messagesList, setMessagesList] = useState([]);
    console.log('messagesList:', messagesList)
    const [isMobile, setIsMobile] = useState(false); // État pour détecter si l'appareil est mobile
    
    
    // Detect screen size
    useEffect(() => {
        const detectMobile = () => window.innerWidth <= 1020;
        setIsMobile(detectMobile());
        const handleResize = () => setIsMobile(detectMobile());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Detect la conversation séléctionné 
    useEffect(() => {
        if (selectedConversation) {
            const fetchMessages = async () => {
                try {
                    const response = await fetchConversation(selectedConversation.id);
                    const currentMessages = response[0]?.messages ? JSON.parse(response[0].messages) : [];
                    let parsedMessages = [];
                    if (typeof currentMessages === 'string') {
                        parsedMessages = JSON.parse(currentMessages);
                    } else if (Array.isArray(currentMessages)) {
                        parsedMessages = currentMessages; // Supposer que c'est déjà un tableau d'objets
                    }
                    setMessagesList(parsedMessages);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
        }
    }, [selectedConversation]);
    
    // Fonction pour créer une nouvelle conversation
    const handleCreateConv = async (friend) => {
        try {
            const conversationData = {
                name: friend.username + user.username,
                avatar: friend.avatar,
                last_message: messagesList.length > 0 ? messagesList[messagesList.length - 1].content : "",
                last_message_time: new Date().toISOString(),
                friend_id: friend.id,
                user_id: user.id,
                messages: JSON.stringify([]),
            };

            const existingConv = conversations.find(conv => {
                // Assurez-vous que les propriétés existent sur chaque objet
                if (conv.user_id !== undefined && conv.friend_id !== undefined) {
                    console.log('Checking conversation:', conv);
                    return (
                        (conv.user_id === conversationData.user_id && conv.friend_id === conversationData.friend_id) ||
                        (conv.user_id === conversationData.friend_id && conv.friend_id === conversationData.user_id)
                    );
                }
                return false;
            });
            
            console.log('Existing Conversation:', existingConv);

            if (existingConv) { 
                setSelectedConversation(existingConv)
                return;
            }

            const conversationResponse = await axios.post('http://localhost:5000/conversation', conversationData);
            const newConversation = await axios.get('http://localhost:5000/conversation');
            const newConvFiltered = newConversation.data.find(conv => conv.user_id === conversationData.user_id && conv.friend_id === conversationData.friend_id)
            console.log('newConvFiltered:', newConvFiltered)
            console.log('newConversation:', newConversation)

            setConversations(prevConversations => [
                newConvFiltered,
               ...prevConversations
            ]);
            setSelectedConversation(newConversation.data[0]);
            
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    // Fonction pour récupérer tous les messages d'une conversation et faire les mise à jour de cette liste
    const handleMessageSent = async (newMessage) => {
        try {
            const response = await axios.get(`http://localhost:5000/conversation/${selectedConversation.id}`);
            const existingConversation = response.data;

            let parsedMessages = [];
            try {
                if (typeof existingConversation.messages === 'string') {
                    parsedMessages = JSON.parse(existingConversation.messages);
                } else if (Array.isArray(existingConversation.messages)) {
                    parsedMessages = existingConversation.messages; // Supposer que c'est déjà un tableau d'objets
                }
            } catch (error) {
                console.error('Invalid JSON in existing conversation messages:', existingConversation.messages);
                // Définir un tableau vide si JSON.parse échoue
                parsedMessages = [];
            }
            
            console.log('parsedMessages:', parsedMessages)
            

            // Mettre à jour les messages
            const updatedMessages = [...parsedMessages, newMessage];

            // Préparer les données pour la mise à jour
            const updatedConversation = {
                ...existingConversation,
                last_message: newMessage.content,
                last_message_time: newMessage.sent_at,
                messages: JSON.stringify(updatedMessages),
            };

            // Envoyer la mise à jour
            const updateResponse = await axios.put(`http://localhost:5000/conversation/${selectedConversation.id}`, updatedConversation);
            
            // Mettre à jour l'état des conversations
            setConversations(prevConversations => prevConversations.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv));
            
            // Mettre à jour la liste des messages
            setMessagesList(updatedMessages);
        } catch (error) {
            console.error('Error updating conversation:', error);
        }
    };
    
    // RENDERING
    return (
        <>
            <div className=" h-[97vh] w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden pt-6">
                <div className="flex-1 flex flex-col">
                    {!isMobile && ( 
                        <main className="flex-grow flex flex-row min-h-0">
                            {selectedConversation && (
                                <section className="relative flex flex-col items-center flex-auto border-l md:w-[600px]">
                                    <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-100" onClick={() => setSelectedConversation(null)}>
                                        Close
                                    </button>
                                    <div className="flex flex-col h-full p-4 pt-8 w-full">

                                        {/* TODO */}

                                        <div className="flex-1 overflow-y-auto p-4 pt-8 w-full">
                                            <AddFriendsBtn user={user} friendId={selectedConversation.user_id} friends={friends} friendsTable={friendsTable} fetchMingle={fetchMingle}/>
                                            {Array.isArray(messagesList) && messagesList.length > 0 ? (
                                                messagesList.map((msg, index) => (
                                                    <div
                                                    key={index}
                                                    className={`w-max p-2 my-4 rounded shadow overflow-hidden ${
                                                        (msg.sender_id === user.id)? "bg-blue-600 ml-auto text-end" : "bg-gray-800 mr-auto"
                                                    }`}
                                                    style={{ maxWidth: '45%' }}
                                                    >
                                                    {msg.content}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-max p-2 my-4 rounded shadow bg-gray-800 mr-auto" style={{ maxWidth: '45%' }}>
                                                    No messages yet.
                                                </div>
                                            )} 
                                        </div>
                                        <ChatInput conversationId={selectedConversation.id} sender_id={user.id} onMessageSent={handleMessageSent} />
                                    </div>
                                </section>
                                            
                            )}
                            <section className="relative flex flex-col flex-none overflow-auto md:w-[600px]">
                                <button className="absolute top-6 right-4 text-gray-100 hover:text-gray-100" onClick={onClose}>
                                    {/* SVG petite croix */}
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
                                        src={user?.avatar}
                                        />
                                    </div>
                                </div>
                                <div className="p-4 flex-none">
                                    <form id="serchMessage" onSubmit={(e) => e.preventDefault()}>
                                        <SearchComponent user={user} users={users} friendsTable={friendsTable} friends={friends} setFriends={setFriends} fetchMingle={fetchMingle}/>
                                    </form>
                                </div>
                                <div className="flex flex-row p-2 overflow-auto w-0 min-w-full">
                                    {friends.map((friend) => (
                                        <div key={friend.id} className="text-sm text-center mr-4">
                                            <button
                                                className="flex flex-shrink-0 focus:outline-none bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                                                type="button"
                                                onClick={() => {handleCreateConv(friend)}}
                                            >
                                                <img
                                                className="rounded-full w-full h-full object-cover"
                                                src={friend.avatar}
                                                alt={friend.username}
                                                />
                                            </button>
                                            <p>{friend.username}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 flex-1">
                                    {conversations.map((conv) => (
                                        <div
                                        key={conv.id}
                                        className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative cursor-pointer"
                                        onClick={() => setSelectedConversation(conv)}
                                        >
                                            <div className="w-16 h-16 relative flex flex-shrink-0">
                                                <img
                                                className="shadow-md rounded-full w-full h-full object-cover"
                                                src={conv?.avatar}
                                                alt={conv.name}
                                                />
                                            </div>
                                            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                                                <p>{conv.name}</p>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <DateTimeDisplay isoDate={conv.last_message_time} />
                                                    <div className="min-w-0 ml-4 max-w-max">
                                                        <p className="truncate">{conv.last_message}</p>
                                                    </div>
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
                                    <AddFriendsBtn user={user} friendId={selectedConversation.user_id} friends={friends} friendsTable={friendsTable} fetchMingle={fetchMingle}/>
                                    {Array.isArray(messagesList) && messagesList.length > 0 ? (
                                                messagesList.map((msg, index) => (
                                                    <div
                                                    key={index}
                                                    className={`w-max p-2 my-4 rounded shadow overflow-hidden ${
                                                        (msg.sender_id === user.id)? "bg-blue-600 ml-auto text-end" : "bg-gray-800 mr-auto"
                                                    }`}
                                                    style={{ maxWidth: '45%' }}
                                                    >
                                                    {msg.content}
                                                    </div>
                                                ))
                                                ) : (
                                                <div className="w-max p-2 my-4 rounded shadow bg-gray-800 mr-auto" style={{ maxWidth: '45%' }}>
                                                    No messages yet.
                                                </div>
                                            )}
                                    </div>
                                    <ChatInput conversationId={selectedConversation.id} sender_id={user.id} onMessageSent={handleMessageSent} />
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
                                            src={user?.avatar}
                                        />
                                    </div>
                                </div>
                                <div className="p-4 flex-none">
                                    <form id="serchMessageMobile" onSubmit={(e) => e.preventDefault()}>
                                        <SearchComponent user={user} users={users} friendsTable={friendsTable} friends={friends} setFriends={setFriends} fetchMingle={fetchMingle}/>
                                    </form>
                                </div>
                                <div className="flex flex-row p-2 overflow-auto w-full">
                                    {friends.map((friend) => (
                                        <div key={friend.id} className="text-xs text-center mr-4">
                                            <button
                                                className="flex flex-shrink-0 focus:outline-none bg-gray-800 text-gray-600 rounded-full w-10 h-10"
                                                type="button"
                                                onClick={() => {handleCreateConv(friend)}}
                                            >
                                                <img
                                                    className="rounded-full w-full h-full object-cover"
                                                    src={friend.avatar}
                                                    alt={friend.username}
                                                />
                                            </button>
                                            <p>{friend.username}</p>
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
                                                    src={conv?.avatar}
                                                    alt={conv.name}
                                                />
                                            </div>
                                            <div className="flex-auto  text-xs min-w-0 ml-4 mr-6 md:block group-hover:block">
                                                <p>{conv.name}</p>
                                                <div className="flex items-center text-gray-600">
                                                    <DateTimeDisplay isoDate={conv.last_message_time} />
                                                    <div className="min-w-0 ml-4 max-w-max">
                                                        <p className="truncate">{conv.last_message}</p>
                                                    </div>
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
