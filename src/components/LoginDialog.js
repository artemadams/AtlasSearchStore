import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function LoginDialog(isOpen, setIsOpen) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    function onRegister() {}

    return (
        <>
            <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel>
                        <Dialog.Title>✨ Sign Up for new offers</Dialog.Title>
                        <Dialog.Description>todo</Dialog.Description>

                        <button onClick={() => setIsLoginOpen(false)}>Cancel</button>
                        <button onClick={() => onRegister()}>Sign Up</button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
