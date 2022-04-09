import { Token } from "../Main"
import React, { useState } from "react"
import { Box, Tab, makeStyles, Typography, Divider } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"
import {
    ConnectionRequiredMsg
} from "./ConnectionRequiredMsg"
import { useEthers } from "@usedapp/core"

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px"
    },
    header: {
        color: "black",
        padding: '24px',
    },
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.divider,
    },
}))

interface YourWalletProps {
    supportedTokens: Array<Token>
}

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const classes = useStyles()

    const { account } = useEthers()
    const isConnected = account !== undefined

    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }
    return (
        <Box>
            <Box className={classes.box}>
                <div>
                    <Typography
                        variant="h4"
                        component="h1"
                        classes={{
                            root: classes.header,
                        }}
                    >
                        My Wallet
                    </Typography>
                    <Divider classes={{ root: classes.divider }} />
                    {isConnected ? (
                        <TabContext value={selectedTokenIndex.toString()}>
                            <TabList onChange={handleChange} aria-label="stake form tabs">
                                {supportedTokens.map((token, index) => {
                                    return (
                                        <Tab
                                            label={token.name}
                                            value={index.toString()}
                                            key={index}
                                        />
                                    )
                                })}
                            </TabList>
                            {supportedTokens.map((token, index) => {
                                return (
                                    <TabPanel value={index.toString()} key={index}>
                                        <div className={classes.tabContent}>
                                            <WalletBalance
                                                token={supportedTokens[selectedTokenIndex]}
                                            />
                                            {/* this is the same as */}
                                            {/* The chainlink_defi props passing */}
                                            <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                        </div>
                                    </TabPanel>
                                )
                            })}
                        </TabContext>
                    ) : (
                        <ConnectionRequiredMsg />
                    )}
                </div>
            </Box>
        </Box>
    )
}