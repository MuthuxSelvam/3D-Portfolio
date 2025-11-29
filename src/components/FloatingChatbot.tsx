import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

type Message = {
    id: number;
    text: string;
    sender: "user" | "bot";
};

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm Muthu's AI assistant. How can I help you today?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const keywordReply = (msg: string): string | null => {
        const t = msg.toLowerCase();
        if (t.includes("hello") || t.includes("hi") || t.includes("hey"))
            return "Hey! 👋 I am your personal assistant. Ask me about projects, skills or contact!";
        if (t.includes("name") || t.includes("who are you"))
            return "I'm the interactive AI assistant for Muthu Selvam, AI & Full Stack Developer.";
        if (t.includes("project"))
            return "I've built AI and Web projects like Oncology Prediction, AI Image Detection, and a Diabetes Prediction System!";
        if (t.includes("skill") || t.includes("tech"))
            return "My core skills: Python, AI/ML, Next.js, React, TypeScript, Flask, PostgreSQL, MongoDB.";
        if (t.includes("contact") || t.includes("reach") || t.includes("email"))
            return "You can contact Muthu via the Contact Section or Instagram: @mxthxselvam";
        if (t.includes("resume"))
            return "Sure! My resume is available in the Contact section.";
        if (t.includes("about") || t.includes("who is muthu"))
            return "Muthu is a passionate AI & Full Stack Developer solving real-world problems with ML and modern web tech.";
        return null;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input;
        const userMessage: Message = { id: Date.now(), text: userText, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const fastReply = keywordReply(userText);
        if (fastReply) {
            setTimeout(() => {
                setMessages((prev) => [...prev, { id: Date.now() + 1, text: fastReply, sender: "bot" }]);
                setIsTyping(false);
            }, 500);
            return;
        }

        try {
            const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "moonshotai/Kimi-K2-Instruct-0905",
                    messages: [{ role: "user", content: userText }],
                    max_tokens: 200,
                    temperature: 0.7,
                }),
            });
            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content || "Hmm, I couldn't understand. Can you rephrase that?";
            setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, sender: "bot" }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Error 😓 I'm having trouble connecting right now.", sender: "bot" }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const startListening = () => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognition.onstart = () => setIsListening(true);
            recognition.onresult = (event: any) => {
                setInput(event.results[0][0].transcript);
                setIsListening(false);
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognition.start();
        } else {
            alert("Speech recognition is not supported in this browser.");
        }
    };

    const speakLastMessage = () => {
        const lastBotMessage = [...messages].reverse().find((m) => m.sender === "bot");
        if (lastBotMessage) {
            const utterance = new SpeechSynthesisUtterance(lastBotMessage.text);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-[420px] rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#0B0A23]/98 to-[#050816]/98 backdrop-blur-2xl shadow-2xl shadow-purple-500/20 overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="h-28 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40">
                                <div className="absolute top-0 -left-4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                                <div className="absolute top-0 -right-4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                            </div>

                            <div className="relative h-full flex items-center justify-between px-5">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1">
                                            <span className="flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#0B0A23]" />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">AI Assistant</h3>
                                        <p className="text-purple-200/80 text-xs">🟢 Online & Ready</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 rounded-xl p-2.5 backdrop-blur-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-transparent to-black/20">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${msg.sender === "user"
                                        ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                                        : "bg-white/10 backdrop-blur-sm border border-purple-500/20 text-gray-100"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1.5">
                                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" />
                                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Premium Input Area */}
                        <div className="border-t border-purple-500/20 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm p-5">
                            <div className="flex items-center gap-3 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-3xl p-3 border border-purple-500/30 shadow-lg shadow-purple-500/10">
                                {/* Voice Input Button */}
                                <div className="relative group">
                                    <div className={`absolute inset-0 rounded-2xl blur-lg transition-opacity ${isListening ? "bg-red-500/40 opacity-100" : "bg-purple-500/30 opacity-0 group-hover:opacity-100"
                                        }`} />
                                    <button
                                        onClick={startListening}
                                        className={`relative p-3.5 rounded-2xl transition-all duration-300 ${isListening
                                            ? "bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50 scale-110"
                                            : "bg-gradient-to-br from-purple-600/30 to-blue-600/30 text-purple-300 hover:from-purple-600/50 hover:to-blue-600/50 hover:text-white backdrop-blur-sm border border-purple-500/30"
                                            }`}
                                        title="Voice input"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Speaker Button */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <button
                                        onClick={speakLastMessage}
                                        className="relative p-3.5 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 text-blue-300 hover:from-blue-600/50 hover:to-indigo-600/50 hover:text-white transition-all duration-300 backdrop-blur-sm border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/30"
                                        title="Read aloud"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 3.5a6.5 6.5 0 00-6.5 6.5c0 2.87 1.88 5.3 4.46 6.14v.01l.02.01c.37.13.77.2 1.19.2h1.66c.42 0 .82-.07 1.19-.2l.02-.01v-.01A6.504 6.504 0 0016.5 10a6.5 6.5 0 00-6.5-6.5zM7 10a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Input Field */}
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-transparent text-white text-sm placeholder-gray-400/60 outline-none px-3 py-1"
                                />

                                {/* Send Button */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim()}
                                        className="relative p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none group-hover:scale-105"
                                        title="Send message"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Toggle Button */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-2xl opacity-60 animate-pulse" />
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="relative h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 border-2 border-purple-400/30 overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-8 h-8 text-white relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </motion.button>
                </div>
            )}
        </>
    );
};

export default FloatingChatbot;
