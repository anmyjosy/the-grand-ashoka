"use client";

import Script from "next/script";

export default function VapiWidget() {
    return (
        <>
            <Script
                src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
                strategy="afterInteractive"
            />
            {/* @ts-ignore */}
            <vapi-widget
                style={{ transform: 'scale(0.9)', transformOrigin: 'bottom left' }}
                public-key={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""}
                assistant-id={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""}
                mode="voice"
                theme="dark"
                base-bg-color="#1A1614"
                accent-color="#FF7A21"
                cta-button-color="#1A1614"
                cta-button-text-color="#ffffff"
                border-radius="medium"
                size="compact"
                position="bottom-left"
                title="ORDER WITH AI"
                start-button-text="Start"
                end-button-text="End Call"
                chat-first-message="Hey, How can I help you today?"
                chat-placeholder="Type your message..."
                voice-show-transcript="false"
                consent-required="false"
            />
        </>
    );
}
