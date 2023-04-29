import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}

export default function Profile({ session }) {
    const [name, setName] = useState(session.user.name);
    const [email, setEmail] = useState(session.user.email);
    const [image, setImage] = useState(session.user.image);
    const router = useRouter();

    async function handleSave() {
        const response = await fetch("/api/edituser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: session.user.id,
                name,
                email,
                image,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        } else {
            router.reload();
        }

        return data;
    }

    return (
        <form>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Image URL:
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label>
            <button type="button" onClick={handleSave}>
                Save Changes
            </button>
        </form>
    );
}
