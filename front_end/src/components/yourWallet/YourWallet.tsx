import { Token } from "../Main"
import React, { useState } from "react"
import { Box } from "@material-ui/core"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    return (
        <Box>
            <div>I'm Yourwallet</div>
        </Box>)
}