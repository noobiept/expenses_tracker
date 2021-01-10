import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { HistoryState } from "../types";
import { NotificationContainer } from "./notification_popup.styles";

export default function NotificationPopup() {
    const history = useHistory();
    const location = useLocation<HistoryState>();
    const [message, setMessage] = useState<string | undefined>();

    useEffect(() => {
        const state = location.state;
        if (!state) return;

        const { message, ...newState } = state;
        if (!message) return;

        setMessage(message);

        // remove the message from the state
        history.replace(location.pathname, newState);
    }, [location.pathname]);

    useEffect(() => {
        const id = window.setTimeout(() => {
            setMessage(undefined);
        }, 2000);

        return () => {
            window.clearTimeout(id);
        };
    }, []);

    return (
        <>
            {message && (
                <NotificationContainer>{message}</NotificationContainer>
            )}
        </>
    );

    return null;
}
