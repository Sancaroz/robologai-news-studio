import { Bot, FileAudio, Link2, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { createBriefAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

export default function NewBriefPage() {
  return (
    <div className="page narrow-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">New story</span>
          <h1>Create a robotics news brief</h1>
          <p>Add a public source video and editorial context. You approve every output.</p>
        </div>
      </header>

      <form action={createBriefAction} className="creation-layout">
        <div className="form-stack">
          <section className="content-card form-card">
            <div className="step-title">
              <span>01</span>
              <div><h2>Source video</h2><p>Use a public YouTube video as your reporting source.</p></div>
            </div>

            <label>
              YouTube URL
              <div className="input-with-icon">
                <Link2 size={17} />
                <input name="sourceUrl" type="url" placeholder="https://youtube.com/watch?v=…" required />
              </div>
            </label>

            <div className="two-columns">
              <label>
                Source title
                <input name="sourceTitle" placeholder="Original video title" required />
              </label>
              <label>
                Source company
                <input name="sourceCompany" placeholder="e.g. Boston Dynamics" required />
              </label>
            </div>

            <button type="button" className="upload-placeholder" disabled>
              <Upload size={18} />
              <span><strong>Upload a downloaded video</strong><small>Phase 2 · MP4 or MOV</small></span>
            </button>
          </section>

          <section className="content-card form-card">
            <div className="step-title">
              <span>02</span>
              <div><h2>Transcript or source notes</h2><p>Transcript extraction is an MVP placeholder. Paste captions or your notes.</p></div>
            </div>
            <label>
              Source material
              <textarea
                name="transcript"
                rows={10}
                minLength={40}
                placeholder="Paste the public transcript, key facts, claims, and your reporting notes here…"
                required
              />
            </label>
            <div className="inline-note">
              <FileAudio size={17} />
              Automatic audio transcription will be added with the media pipeline.
            </div>
          </section>
        </div>

        <aside className="generation-panel">
          <div className="ai-orb"><Bot size={25} /></div>
          <span className="eyebrow">Editorial generator</span>
          <h2>One source, six assets</h2>
          <ul>
            <li><Sparkles size={15} /> 60-second news script</li>
            <li><Sparkles size={15} /> Short YouTube title</li>
            <li><Sparkles size={15} /> Description and hashtags</li>
            <li><Sparkles size={15} /> Source credit</li>
            <li><Sparkles size={15} /> Voiceover-ready script</li>
          </ul>
          <div className="copyright-box">
            <ShieldCheck size={18} />
            <p>Original commentary only. The prompt requires attribution, cautious claims, and short-excerpt framing.</p>
          </div>
          <SubmitButton pendingLabel="Generating brief…">
            <Sparkles size={17} /> Generate news brief
          </SubmitButton>
          <small className="billing-note">
            Without an API key, this runs in free demo mode. Configuring OpenAI enables billed generation.
          </small>
        </aside>
      </form>
    </div>
  );
}
