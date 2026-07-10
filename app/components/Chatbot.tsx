"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { Box, IconButton, Typography, TextField, Chip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  ACCENT,
  INK,
  NB_BORDER,
  NB_BORDER_THIN,
  PAPER,
  SURFACE,
  nbShadow,
} from "@/lib/theme";

const QUICK_QUESTIONS = [
  "What services does DripDome offer?",
  "Do you rent equipment or props?",
  "How do I get a quote for my project?",
  "Where are you located?",
  "Can you help with brand activations?",
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is Extract<typeof part, { type: "text" }> => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { messages, sendMessage, status, error, clearError } = useChat({
    onError(err) {
      // Surface blocked-topic or rate-limit messages to the user
      try {
        const parsed = JSON.parse(err.message);
        setErrorMsg(parsed.error ?? "Something went wrong. Please try again.");
      } catch {
        setErrorMsg("Something went wrong. Please try again.");
      }
    },
  });
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setErrorMsg(null);
    if (error) clearError();
    sendMessage({ text: input });
    setInput("");
  };

  const onQuickQuestion = (question: string) => {
    if (isLoading) return;
    setErrorMsg(null);
    if (error) clearError();
    sendMessage({ text: question });
  };

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            width: 56,
            height: 56,
            borderRadius: 0,
            bgcolor: ACCENT,
            color: INK,
            border: NB_BORDER,
            boxShadow: nbShadow(4),
            transition: "transform 120ms ease, box-shadow 120ms ease",
            "&:hover": {
              bgcolor: ACCENT,
              transform: "translate(-2px, -2px)",
              boxShadow: nbShadow(6),
            },
            "&:active": {
              transform: "translate(2px, 2px)",
              boxShadow: nbShadow(0),
            },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chat window */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            width: { xs: "calc(100vw - 32px)", sm: 380 },
            maxHeight: { xs: "70vh", sm: 520 },
            display: "flex",
            flexDirection: "column",
            bgcolor: SURFACE,
            border: NB_BORDER,
            borderRadius: 0,
            boxShadow: nbShadow(8),
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              bgcolor: INK,
              color: PAPER,
              borderBottom: `3px solid ${ACCENT}`,
              flexShrink: 0,
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.05em" }}>
                NOVA
              </Typography>
              <Typography sx={{ fontSize: 10, color: "rgba(243,237,226,0.7)", letterSpacing: "0.03em" }}>
                DripDome&apos;s AI Assistant
              </Typography>
            </Box>
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              aria-label="Close chat"
              sx={{ color: PAPER, borderRadius: 0, "&:hover": { color: ACCENT } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minHeight: 200,
            }}
          >
            {messages.length === 0 && (
              <>
                <Typography sx={{ color: "#888", fontSize: 13, mt: 1 }}>
                  Hey! I&apos;m Nova. Ask me anything about DripDome, or pick a question below to get started.
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
                  {QUICK_QUESTIONS.map((q) => (
                    <Chip
                      key={q}
                      label={q}
                      onClick={() => onQuickQuestion(q)}
                      size="small"
                      sx={{
                        fontSize: 11,
                        height: "auto",
                        py: 0.5,
                        "& .MuiChip-label": { whiteSpace: "normal", lineHeight: 1.3 },
                        bgcolor: SURFACE,
                        color: INK,
                        border: NB_BORDER_THIN,
                        borderRadius: 0,
                        fontWeight: 700,
                        cursor: "pointer",
                        "&:hover": { bgcolor: ACCENT, color: INK },
                        transition: "background-color 0.15s, color 0.15s",
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
            {messages.map((m) => {
              const text = getMessageText(m);
              if (!text) return null;
              return (
                <Box
                  key={m.id}
                  sx={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                  }}
                >
                  {m.role === "assistant" && (
                    <Typography sx={{ fontSize: 10, color: "#999", mb: 0.25, ml: 0.5 }}>
                      Nova
                    </Typography>
                  )}
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,
                      border: NB_BORDER_THIN,
                      bgcolor: m.role === "user" ? INK : PAPER,
                      color: m.role === "user" ? PAPER : INK,
                    }}
                  >
                    <Typography sx={{ fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                      {text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            {errorMsg && (
              <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
                <Typography sx={{ fontSize: 10, color: "#999", mb: 0.25, ml: 0.5 }}>
                  Nova
                </Typography>
                <Box sx={{ px: 1.5, py: 1, border: NB_BORDER_THIN, bgcolor: PAPER, color: INK }}>
                  <Typography sx={{ fontSize: 13, lineHeight: 1.5 }}>
                    {errorMsg}
                  </Typography>
                </Box>
              </Box>
            )}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <Box sx={{ alignSelf: "flex-start" }}>
                <Typography sx={{ fontSize: 10, color: "#999", mb: 0.25, ml: 0.5 }}>
                  Nova
                </Typography>
                <Box sx={{ px: 1.5, py: 1, border: NB_BORDER_THIN, bgcolor: PAPER }}>
                  <Typography sx={{ fontSize: 13, color: "#888" }}>...</Typography>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 1.5,
              borderTop: NB_BORDER_THIN,
              flexShrink: 0,
            }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nova anything..."
              size="small"
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: 13,
                  borderRadius: 0,
                  "& fieldset": { border: NB_BORDER_THIN },
                  "&:hover fieldset": { border: NB_BORDER_THIN },
                  "&.Mui-focused fieldset": {
                    border: `2px solid ${ACCENT}`,
                  },
                  "&.Mui-focused": { boxShadow: nbShadow(3) },
                },
              }}
            />
            <IconButton
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              sx={{
                color: INK,
                borderRadius: 0,
                "&:hover": { color: ACCENT },
                "&.Mui-disabled": { color: "#CCC" },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}
