// import { auth } from "@/auth";
import { Metadata } from "next";
import { getSession } from "@auth0/nextjs-auth0";

export const metadata: Metadata = {
  title: "Profile",
};
export default async function Page() {
  const { user } = await getSession();

  return (
    // <main>
    //   <h1 className={`mb-4 text-xl md:text-2xl`}>Profile:</h1>
    //   <ProfileClient />
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
    // </main>
  );
}
