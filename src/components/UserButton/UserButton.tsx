import { useContext, useState } from "react";
import { supabase } from "../../utils/helpers/supabase";
import { Button } from "../Button/Button";
import { StyledUserButton } from "./UserButton.styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { Image, Popover, Portal, Spinner, Text } from "@chakra-ui/react";
import { enqueueToast } from "../../utils/helpers/enqueueToast";
import { useNavigate } from "@tanstack/react-router";

function UserButton() {
    const navigate = useNavigate();
    const [pendingAuth, setPendingAuth] = useState(false);
    async function signIn() {
        setPendingAuth(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            });
            setPendingAuth(false);
            navigate({ to: "/" });
            if (error) throw error;
        } catch (error) {
            enqueueToast("Failed to sign in", "error");
            console.error(error);
        } finally {
            setPendingAuth(false);
        }
    }

    async function signOut() {
        try {
            await supabase.auth.signOut();
            navigate({ to: "/" });
            enqueueToast("Signed out successfully!", "success");
        } catch (error) {
            enqueueToast("Failed to sign out", "error");
            console.error(error);
        }
    }
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    if (user)
        return (
            <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Popover.Trigger asChild>
                    <StyledUserButton>
                        {user.user_metadata.avatar_url ? (
                            <Image
                                src={user.user_metadata.avatar_url}
                                alt="user avatar"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                display="block"
                            />
                        ) : (
                            <Image
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="user avatar"
                            />
                        )}
                    </StyledUserButton>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content
                            w={"fit-content"}
                            css={{
                                "--popover-bg":
                                    "var(--background--secondary-color)",
                            }}
                        >
                            <Popover.Arrow />
                            <Popover.Body
                                display={"flex"}
                                flexDir={"column"}
                                gap={"1em"}
                            >
                                <Text fontWeight={"bold"} fontSize={"1rem"}>
                                    Welcome, {user.user_metadata.full_name}!
                                </Text>
                                <Button
                                    label="Sign Out"
                                    $primary
                                    onClick={signOut}
                                ></Button>
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        );

    return pendingAuth ? (
        <Spinner />
    ) : (
        <Button
            label="Sign In With Google"
            $primary
            onClick={signIn}
            disabled={pendingAuth}
        ></Button>
    );
}

export default UserButton;
