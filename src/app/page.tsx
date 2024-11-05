import { redirect } from "next/navigation";
import { getIdentity } from "./(auth)/login/serverAction/getIdentity";

export default async function Home() {
  const identity = await getIdentity();

  if (identity?.status == 200) {
    redirect("/admin");
  } else {
    redirect("/login");
  }
}
