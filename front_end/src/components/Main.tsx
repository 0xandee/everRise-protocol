import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp from "../dapp.png"
import eth from "../eth.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet/YourWallet"
import { TokenFarmContract } from "./tokenFarmContract/TokenFarmContract"
import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "left",
        padding: "0 0 0 16px"
    },
    subtitle: {
        color: "rgba(0, 0, 0, 0.25)",
        paddingLeft: "32px",
        marginTop: "32px",
        maxWidth: "63%"
    },
    container: {

    }
}))

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = (props: any) => {
    const classes = useStyles()
    // Show token values from wallet
    // Get address of different token
    // Get the balance of the users wallet

    // send brownie-config to `src` folder 
    // send the build folder
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"

    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        { image: dapp, address: dappTokenAddress, name: "DAPP" },
        { image: eth, address: wethTokenAddress, name: "WETH" },
        { image: dai, address: fauTokenAddress, name: "DAI" },
    ]

    return (
        <div className={classes.container}>
            {/* <Typography
            variant="h2"
            component="h1"
            classes={{
                root: classes.title,
            }}
        >
            Token Farms
        </Typography>
        <Typography
            variant="h5"
            component="h1"
            classes={{
                root: classes.title,
            }}
        >
            Stake tokens to earn.
        </Typography> */}
            {/* <YourWallet supportedTokens={supportedTokens} /> */}
            <TokenFarmContract supportedTokens={supportedTokens} />
            <Typography variant="body2" display="block" className={classes.subtitle}>
                <b>Available networks:</b> <br />
                - Kovan <br />
                - Rinkeby (coming soon)<br />
                <br />
                <b>Available function:</b> <br />
                - Farm <br />
                - Lend (coming soon) <br />
                - Borrow (coming soon) <br />
                - Stake (coming soon) <br />
                <br />
                <b>Note:</b> <a href="https://github.com/Fr3aKiNg/defi-stake-yield-brownie/blob/main/README.md">Read Me</a>
                <br /><br />
                <b>Repository:</b> <a href="https://github.com/Fr3aKiNg/defi-stake-yield-brownie">Github Link </a>
                <br /><br />
                <b>Connect me: </b> <a href="https://www.linkedin.com/in/andyvo111/">Andy Vo </a>  <br />

            </Typography>
        </div>)
}