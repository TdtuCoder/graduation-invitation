"use client";

import React, { useState } from "react";
import IntroSequence from "./IntroSequence";
import CollageLayout from "./CollageLayout";

export default function PageWithIntro() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro ? (
                <IntroSequence onComplete={() => setShowIntro(false)} />
            ) : (
                <CollageLayout />
            )}
        </>
    );
}
