import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManagePosts } from "@/lib/crm-permissions";
import { getActiveDirectorProfiles } from "@/lib/posts/profiles";
import { PostGenerator } from "@/components/crm/posts/PostGenerator";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManagePosts(me.role)) redirect("/admin");
  const profiles = await getActiveDirectorProfiles();
  return <PostGenerator profiles={profiles.map((p) => ({ id: p.id, name: p.name, title: p.title }))} />;
}
