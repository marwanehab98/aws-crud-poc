'use client'

import Redirect from "../components/Redirect";

export const dynamic = "force-dynamic"

export default function RedirectUri() {
    console.log("REDIRECT")
    return <Redirect />;
}
