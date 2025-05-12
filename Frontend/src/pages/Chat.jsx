import { useEffect, useState, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');

  const aiMessage = { sender: 'ai', text: '' };
  setMessages(prev => [...prev, aiMessage]);

  try {
    const res = await fetch('http://localhost:3000/api/chat-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;
    let fullText = '';

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        if (line === 'data: [DONE]') {
          done = true;
          break;
        }

        if (line.startsWith('data: ')) {
          const textPart = line.replace('data: ', '');
          fullText += textPart;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { sender: 'ai', text: fullText };
            return updated;
          });
        }
      }
    }
  } catch (err) {
    setMessages(prev => [
      ...prev,
      { sender: 'ai', text: 'Streaming failed. Try again.' },
    ]);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/Chat_bg1.jpg')] bg-cover bg-center text-white backdrop-blur-md">
      {/* Header */}
      <div className="bg-black/60 backdrop-blur-md py-4 px-6 text-2xl font-bold shadow-md text-cyan-300">
        RolaxGPT 💬
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end max-w-xl ${
              msg.sender === "user" ? "ml-auto justify-end" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            {msg.sender === "ai" && (
              <img
                src="/chatGPT_icon.png"
                alt="ChatGPT"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}

            <div
              className={`px-4 py-2 rounded-2xl whitespace-pre-wrap text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-white rounded-br-none"
                  : "bg-white text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {/* User avatar */}
            {msg.sender === "user" && (
              <img
                src="/user_icon.png"
                alt="You"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-black/70 p-4 backdrop-blur-md flex items-center space-x-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Anything..."
          className="flex-1 resize-none p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
