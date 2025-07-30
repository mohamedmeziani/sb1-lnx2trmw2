import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const robotResponses = [
  "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
  "يرجى شرح المهمة المطلوبة.",
  "سأكون سعيدًا بتنفيذ العمل في أقرب وقت.",
  "هل لديك تفاصيل إضافية حول المهمة؟",
  "شكرًا على التواصل!"
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "مرحبًا بك في دردشة الروبوت. كيف أساعدك؟" }
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);

    // رد آلي بسيط من الروبوت
    setTimeout(() => {
      const botText =
        robotResponses[Math.floor(Math.random() * robotResponses.length)];
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    }, 1000);

    setInput("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, maxWidth: 400 }}>
      <h4>الدردشة مع الروبوت</h4>
      <div style={{ height: 200, overflowY: "auto", marginBottom: 8, background: "#f9f9f9", padding: 8 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <span
              style={{
                background: msg.sender === "user" ? "#e0ffe0" : "#e0e0ff",
                padding: "6px 12px",
                borderRadius: 12,
                display: "inline-block",
                margin: "4px 0"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          placeholder="اكتب رسالتك هنا..."
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "75%", padding: 8 }}
        />
        <button onClick={handleSend} style={{ padding: "8px 16px", marginLeft: 8 }}>
          إرسال
        </button>
      </div>
    </div>
  );
};

export default ChatBot;