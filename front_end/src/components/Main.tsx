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
        color: theme.palette.common.white,
        textAlign: "left",
        padding: "0 0 0 16px"
    }
}))

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
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

    return (<>
        <Typography
            variant="h2"
            component="h1"
            classes={{
                root: classes.title,
            }}
        >
            Token Farms
        </Typography>
        {/* <YourWallet supportedTokens={supportedTokens} /> */}
        <TokenFarmContract supportedTokens={supportedTokens} />
    </>)
}