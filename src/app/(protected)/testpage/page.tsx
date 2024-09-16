import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const testingPage = async () => {
  const session = await auth();

  return (
    <div>
      <p className="text-white">{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default testingPage;
