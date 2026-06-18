import { ArrowRight, CheckCircle2, Clock3, FileText, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statusLabel = {
  DRAFT: "Draft",
  READY: "Ready for review",
  APPROVED: "Approved",
};

export default async function DashboardPage() {
  const briefs = await prisma.brief.findMany({ orderBy: { updatedAt: "desc" } });
  const approved = briefs.filter((brief) => brief.status === "APPROVED").length;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">Editorial workspace</span>
          <h1>Robotics news briefs</h1>
          <p>Turn public robotics footage into concise, original reporting.</p>
        </div>
        <Link href="/new" className="primary-button">
          <Plus size={17} /> New brief
        </Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <FileText size={20} />
          <div><strong>{briefs.length}</strong><span>Total briefs</span></div>
        </article>
        <article className="stat-card">
          <Clock3 size={20} />
          <div><strong>{briefs.length - approved}</strong><span>Needs review</span></div>
        </article>
        <article className="stat-card">
          <CheckCircle2 size={20} />
          <div><strong>{approved}</strong><span>Approved</span></div>
        </article>
        <article className="stat-card safety-card">
          <ShieldCheck size={20} />
          <div><strong>Manual</strong><span>Publishing control</span></div>
        </article>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h2>Saved briefs</h2>
            <p>Review, edit, approve, and export your stories.</p>
          </div>
        </div>

        {briefs.length === 0 ? (
          <div className="empty-state">
            <span><FileText size={26} /></span>
            <h3>No briefs yet</h3>
            <p>Add a YouTube source and create your first 60-second robotics story.</p>
            <Link href="/new" className="secondary-button">Create first brief</Link>
          </div>
        ) : (
          <div className="brief-list">
            {briefs.map((brief) => (
              <Link href={`/briefs/${brief.id}`} className="brief-row" key={brief.id}>
                <div className="thumbnail">
                  {brief.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={brief.thumbnailUrl} alt="" />
                  ) : (
                    <span>RL</span>
                  )}
                </div>
                <div className="brief-main">
                  <span className="company">{brief.sourceCompany}</span>
                  <h3>{brief.youtubeTitle}</h3>
                  <p>{brief.sourceTitle}</p>
                </div>
                <div className="brief-meta">
                  <span className={`status status-${brief.status.toLowerCase()}`}>
                    {statusLabel[brief.status]}
                  </span>
                  <time>{brief.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
                </div>
                <ArrowRight size={18} className="row-arrow" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
