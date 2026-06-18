import { ArrowLeft, Check, Download, ExternalLink, Save, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { approveBriefAction, updateBriefAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brief = await prisma.brief.findUnique({ where: { id } });
  if (!brief) notFound();

  const wordCount = brief.voiceoverScript.trim().split(/\s+/).length;
  const seconds = Math.round((wordCount / 145) * 60);

  return (
    <div className="page">
      <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to briefs</Link>

      <header className="page-header detail-header">
        <div>
          <div className="title-meta">
            <span className={`status status-${brief.status.toLowerCase()}`}>
              {brief.status === "APPROVED" ? "Approved" : "Ready for review"}
            </span>
            <span>{brief.generatedWithAi ? "OpenAI generated" : "Demo generated"}</span>
          </div>
          <h1>{brief.youtubeTitle}</h1>
          <a href={brief.sourceUrl} target="_blank" rel="noreferrer" className="source-link">
            {brief.sourceCompany} · {brief.sourceTitle} <ExternalLink size={13} />
          </a>
        </div>
        <div className="header-actions">
          <a href={`/api/briefs/${brief.id}/export`} className="secondary-button">
            <Download size={16} /> Export TXT
          </a>
          {brief.status !== "APPROVED" && (
            <form action={approveBriefAction}>
              <input type="hidden" name="id" value={brief.id} />
              <SubmitButton pendingLabel="Approving…">
                <Check size={17} /> Approve brief
              </SubmitButton>
            </form>
          )}
        </div>
      </header>

      <form action={updateBriefAction} className="editor-layout">
        <input type="hidden" name="id" value={brief.id} />
        <div className="form-stack">
          <section className="content-card form-card">
            <div className="section-heading">
              <div><span className="eyebrow">Primary copy</span><h2>60-second news script</h2></div>
              <span className="duration-pill">~{seconds}s · {wordCount} words</span>
            </div>
            <textarea name="newsScript" rows={12} defaultValue={brief.newsScript} required />
          </section>

          <section className="content-card form-card">
            <div className="section-heading">
              <div><span className="eyebrow">Narration</span><h2>Voiceover script</h2></div>
            </div>
            <textarea name="voiceoverScript" rows={9} defaultValue={brief.voiceoverScript} required />
            <div className="inline-note"><Sparkles size={16} /> AI voice generation is planned for Phase 2.</div>
          </section>
        </div>

        <aside className="form-stack">
          <section className="content-card form-card">
            <div className="section-heading"><div><span className="eyebrow">YouTube</span><h2>Publishing copy</h2></div></div>
            <label>Title<input name="youtubeTitle" defaultValue={brief.youtubeTitle} required /></label>
            <label>Description<textarea name="youtubeDescription" rows={6} defaultValue={brief.youtubeDescription} required /></label>
            <label>Hashtags<input name="hashtags" defaultValue={brief.hashtags.join(" ")} required /></label>
          </section>

          <section className="content-card form-card credit-card">
            <div className="section-heading"><div><span className="eyebrow">Attribution</span><h2>Source credit</h2></div><ShieldCheck size={19} /></div>
            <textarea name="sourceCredit" rows={4} defaultValue={brief.sourceCredit} required />
            <p>This credit must remain visible in the final video and description.</p>
          </section>

          <SubmitButton pendingLabel="Saving changes…" className="primary-button full-button">
            <Save size={17} /> Save changes
          </SubmitButton>
        </aside>
      </form>
    </div>
  );
}
