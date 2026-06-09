"use client";

import { useState, useTransition } from "react";
import { Plus, Copy, Check, ShieldCheck, UserCog, Eye } from "lucide-react";
import { createUser } from "@/app/admin/users-actions";
import type { UserRole } from "@/lib/schema";
import { Modal } from "@/components/crm/Modal";

const labelCls = "mb-1 block text-[12.5px] font-medium text-[var(--crm-ink)]";

const ROLE_OPTIONS: { value: UserRole; label: string; hint: string; icon: typeof ShieldCheck }[] = [
  { value: "agent", label: "Agent", hint: "Works only their assigned leads", icon: UserCog },
  { value: "admin", label: "Admin", hint: "Everything, including user management", icon: ShieldCheck },
  { value: "viewer", label: "Viewer", hint: "Sees all leads, can't edit", icon: Eye },
];

export function AddUserModal() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("agent");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ name: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const close = () => {
    setOpen(false);
    setError(null);
    setCreated(null);
    setCopied(false);
    setRole("agent");
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="crm-btn crm-btn-primary">
        <Plus className="size-[15px]" strokeWidth={2.1} />
        New user
      </button>

      <Modal open={open} onClose={close} title={created ? "User created" : "New user"} maxWidth={420}>
        {created ? (
          <div className="space-y-4">
            <p className="text-[13.5px] text-[var(--crm-ink-soft)]">
              Share this temporary password with <strong>{created.name}</strong>. They'll change it on first sign-in. Shown only once.
            </p>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--crm-line)] bg-[var(--crm-surface-2)] px-3.5 py-2.5">
              <code className="text-[15px] font-medium tracking-wide text-[var(--crm-ink)]">{created.password}</code>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(created.password);
                  setCopied(true);
                }}
                className="inline-flex items-center gap-1 text-[12.5px] text-[var(--crm-wine)] transition-colors hover:opacity-80"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <button onClick={close} className="crm-btn crm-btn-secondary w-full">Done</button>
          </div>
        ) : (
          <form
            action={(fd) =>
              startTransition(async () => {
                setError(null);
                const res = await createUser(fd);
                if (res.error) setError(res.error);
                else if (res.tempPassword)
                  setCreated({ name: String(fd.get("name")), password: res.tempPassword });
              })
            }
            className="space-y-3.5"
          >
            <div>
              <label className={labelCls} htmlFor="u-name">Name</label>
              <input id="u-name" name="name" required autoFocus className="crm-input" placeholder="Full name" />
            </div>
            <div>
              <label className={labelCls} htmlFor="u-email">Email</label>
              <input id="u-email" name="email" type="email" required className="crm-input" placeholder="name@bgc.mx" />
            </div>
            <div>
              <label className={labelCls} htmlFor="u-password">Temporary password</label>
              <input id="u-password" name="password" minLength={8} className="crm-input" placeholder="Leave blank to auto-generate" />
              <p className="mt-1 text-[12.5px] text-[var(--crm-ink-mute)]">Blank generates a random one. At least 8 characters.</p>
            </div>

            <fieldset>
              <span className={labelCls}>Role</span>
              <input type="hidden" name="role" value={role} />
              <div className="space-y-1.5">
                {ROLE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const sel = role === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setRole(opt.value)}
                      className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        sel
                          ? "border-[var(--crm-wine-soft)] bg-[var(--crm-wine-tint)]"
                          : "border-[var(--crm-line)] bg-[var(--crm-surface-2)] hover:border-[var(--crm-line-strong)]"
                      }`}
                    >
                      <Icon className={`mt-0.5 size-4 shrink-0 ${sel ? "text-[var(--crm-wine)]" : "text-[var(--crm-ink-mute)]"}`} strokeWidth={1.8} />
                      <span className="min-w-0">
                        <span className={`block text-[13px] font-medium ${sel ? "text-[var(--crm-wine)]" : "text-[var(--crm-ink)]"}`}>{opt.label}</span>
                        <span className="block text-[12.5px] text-[var(--crm-ink-mute)]">{opt.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {error && <p className="text-[12.5px] text-[var(--crm-wine)]">{error}</p>}
            <button type="submit" disabled={pending} className="crm-btn crm-btn-primary w-full">
              {pending ? "Creating…" : "Create user"}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
