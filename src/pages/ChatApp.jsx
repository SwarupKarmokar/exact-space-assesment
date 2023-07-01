import { useState } from "react";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [showEmojis, setShowEmojis] = useState(false);
    const [likes, setLikes] = useState({});

    const handleInputChange = (event) => {
        setMessage(event.target.value);
        if (event.target.value.endsWith("@")) {
            setShowMentions(true);
        } else {
            setShowMentions(false);
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
            const newMessage = {
                user: randomUser,
                text: message,
                time: getCurrentTime(),
            };
            setMessages([...messages, newMessage]);
            setMessage("");
            setShowEmojis(false);
        }
    };

    const handleEmojiClick = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji);
    };

    const handleLike = (index) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [index]: (prevLikes[index] || 0) + 1,
        }));
    };

    return (
        <div className="App">
            <div className="chat">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <img
                            className="avatar"
                            src={`https://i.pravatar.cc/30?u=${msg.user}`}
                            alt="avatar"
                        />
                        <div className="message-content">
                            <div>
                                <span className="username">{msg.user}</span>
                                <span className="time">{msg.time}</span>
                            </div>
                            <div className="text-message">{msg.text}</div>
                        </div>
                        <button className="like-button" onClick={() => handleLike(index)}>
                            {likes[index] ? likes[index] : 0} Like{likes[index] !== 1 ? "s" : ""}
                        </button>
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button className="emoji-button" onClick={() => setShowEmojis((prevShowEmojis) => !prevShowEmojis)}>
                    {showEmojis ? "😊" : "😀"}
                </button>
                <button className="send-button" onClick={handleSendMessage}>
                    Send
                </button>
                <div className="emoji-section" style={{ visibility: showEmojis ? "visible" : "hidden" }}>
                    <span className="emoji-option" onClick={() => handleEmojiClick("🙂")}>
                        🙂
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("😂")}>
                        😂
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("❤️")}>
                        ❤️
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("🤣")}>
                        🤣
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("👌")}>
                        👌
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("🎉")}>
                        🎉
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("😢")}>
                        😢
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("👍")}>
                        👍
                    </span>
                    <span className="emoji-option" onClick={() => handleEmojiClick("😅")}>
                        😅
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
