import {
  Clapperboard,
  FileText,
  LayoutDashboard,
  Plus,
  RadioTower,
  Settings,
} from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/", label: "News briefs", icon: LayoutDashboard },
  { href: "/new", label: "Create brief", icon: Plus },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-mark">
          <RadioTower size={19} />
        </span>
        <span>
          <strong>RoboLogAI</strong>
          <small>Robotics News Studio</small>
        </span>
      </Link>

      <nav className="nav-section">
        <p>Workspace</p>
        {items.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href} className="nav-link">
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="nav-section muted-nav">
        <p>Coming next</p>
        <span><FileText size={16} /> Transcripts</span>
        <span><Clapperboard size={16} /> Video renders</span>
        <span><Settings size={16} /> Studio settings</span>
      </div>

      <div className="sidebar-note">
        <span className="status-dot" />
        <div>
          <strong>Approval required</strong>
          <p>Nothing is auto-published.</p>
        </div>
      </div>
    </aside>
  );
}
