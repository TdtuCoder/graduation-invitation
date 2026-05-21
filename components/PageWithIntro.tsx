"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import IntroSequence from "./IntroSequence";
import CollageLayout from "./CollageLayout";
import DearPiece2 from "./DearPiece2";

export default function PageWithIntro({ dearName }: { dearName?: string }) {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className="table-bg relative min-h-[100dvh] overflow-hidden">
            {!showIntro && <CollageLayout />}
            {!showIntro && dearName && <DearPiece2 name={dearName} />}
            <AnimatePresence>
                {showIntro && (
                    <IntroSequence onComplete={() => setShowIntro(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
