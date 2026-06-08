import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManagePosts } from "@/lib/crm-permissions";
import { PostGenerator } from "@/components/crm/posts/PostGenerator";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManagePosts(me.role)) redirect("/admin");
  return <PostGenerator />;
}
