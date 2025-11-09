import { redirect } from "next/navigation";
import CreateFriendForm from "~/app/(client)/friends/create/_components/create-friend-form";
import { Separator } from "~/components/ui/separator";
import { auth } from "~/server/auth";

export default async function CreateFriendPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <main className="md:shadow-xl w-full md:w-1/2 mx-auto px-4 py-8 ">
            <section>
                <h1 className="text-3xl font-bold">Create a New Friend</h1>
                <p className="pt-2 pb-4 text-muted-foreground">
                    Design your custom AI companion.
                </p>
            </section>
            <Separator />
            <section className="my-6">
                <CreateFriendForm />
            </section>
        </main>
    );
}
