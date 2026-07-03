import { useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { sendMessage } from "../services/api.js";

const initialForm = { name: "", email: "", content: "", honeypot: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateClientSide = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email";
    if (form.content.trim().length < 10) errors.content = "Message must be at least 10 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setFeedback("");

    try {
      const res = await sendMessage(form);
      setStatus("success");
      setFeedback(res.message || "Message sent — thanks for reaching out.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Something went wrong. Please try again.");
      if (err.fieldErrors?.length) {
        const mapped = {};
        err.fieldErrors.forEach((fe) => {
          mapped[fe.field] = fe.message;
        });
        setFieldErrors(mapped);
      }
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-28">
      <Reveal>
        <p className="eyebrow mb-3">Let's talk</p>
        <h1 className="huge-type text-paper mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
          Get in touch
        </h1>
        <p className="text-mist mb-12">
          Have a project, a role, or just want to say hi? Send a message and
          I'll reply directly.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <GlassCard>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wide text-mist-dim mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                className="w-full rounded-lg bg-void-surface border border-void-line px-4 py-3 text-white placeholder:text-mist-dim focus:border-signal outline-none transition-colors"
                placeholder="Ada Lovelace"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wide text-mist-dim mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full rounded-lg bg-void-surface border border-void-line px-4 py-3 text-white placeholder:text-mist-dim focus:border-signal outline-none transition-colors"
                placeholder="ada@example.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block font-mono text-xs uppercase tracking-wide text-mist-dim mb-2">
                Message
              </label>
              <textarea
                id="content"
                name="content"
                rows={5}
                value={form.content}
                onChange={handleChange}
                className="w-full rounded-lg bg-void-surface border border-void-line px-4 py-3 text-white placeholder:text-mist-dim focus:border-signal outline-none transition-colors resize-none"
                placeholder="Tell me a bit about what you're building…"
              />
              {fieldErrors.content && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.content}</p>
              )}
            </div>

            {/* Honeypot — visually hidden from real users, but present in the DOM for bots to fill */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="honeypot">Leave this field empty</label>
              <input
                id="honeypot"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full btn-solid disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>

            {feedback && (
              <p
                role="status"
                className={`text-sm font-mono ${
                  status === "success" ? "text-signal" : "text-red-400"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </GlassCard>
      </Reveal>
    </section>
  );
}
