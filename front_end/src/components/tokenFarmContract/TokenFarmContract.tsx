import React, { useState } from "react"
import { useEthers } from "@usedapp/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import {
  ConnectionRequiredMsg,
} from "../yourWallet/ConnectionRequiredMsg"
import { Tab, Box, makeStyles, Typography, Divider } from "@material-ui/core"
import { Token } from "../Main"
import { Unstake } from "./Unstake"
import { WalletBalance } from "../yourWallet/WalletBalance"
import { StakeForm } from "../yourWallet/StakeForm"
import { createTheme } from '@mui/material/styles';

import { MuiThemeProvider } from '@material-ui/core/styles';

// use default theme
// const theme = createTheme();

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    secondary: {
      main: '#1A5AFF'
    }
  }
});

interface TokenFarmContractProps {
  supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px 0`,
    boxShadow: "0 0 16px rgb(228 231 232 / 45%)",
    // border: "1px solid rgb(231, 234, 243)",
  },
  header: {
    color: "#1A5AFF",
    padding: '32px',
    paddingBottom: '16px',
    textAlign: "center",
    fontWeight: 700,
  },
  divider: {
    background: theme.palette.divider,
  },
  flexContainer: {
    display: "flex",
  },
  flexChild: {
    flex: 1,
  },
  paddingContainer: {
    // padding: `${theme.spacing(4)}px 0 0 ${theme.spacing(4)}px`,
    paddingTop: `${theme.spacing(4)}px`,
    paddingBottom: `${theme.spacing(4)}px`,
  },
}))


export const TokenFarmContract = ({
  supportedTokens,
}: TokenFarmContractProps) => {
  const classes = useStyles()
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue))
  }

  const { account } = useEthers()

  const isConnected = account !== undefined

  return (
    <MuiThemeProvider theme={theme}>
      <Box>
        <Box className={classes.box} >
          <div>
            <Typography
              variant="h4"
              component="h1"
              classes={{
                root: classes.header,
              }}
            >
              Farm Contracts
            </Typography>
            {isConnected ? (
              <TabContext value={selectedTokenIndex.toString()}>
                <TabList onChange={handleChange} aria-label="stake form tabs" centered textColor="secondary" indicatorColor="secondary">
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
                <Divider classes={{ root: classes.divider }} />
                <div className={classes.paddingContainer}>
                  {supportedTokens.map((token, index) => {
                    return (
                      <div className={classes.flexContainer}>
                        <TabPanel value={index.toString()} key={index}
                          classes={{
                            root: classes.flexChild,
                          }}>
                          <div className={classes.tabContent}>
                            <WalletBalance
                              token={supportedTokens[selectedTokenIndex]}
                            />
                            <StakeForm token={supportedTokens[selectedTokenIndex]} />
                          </div>
                        </TabPanel>
                        <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
                        <TabPanel value={index.toString()} key={index}
                          classes={{
                            root: classes.flexChild,
                          }}>
                          <Unstake token={token} />
                        </TabPanel>
                      </div>
                    )
                  })}
                </div>
              </TabContext>
            ) : (
              <ConnectionRequiredMsg />
            )}
          </div>
        </Box>
      </Box>
    </MuiThemeProvider>
  )
}
