import { formatUnits } from '@ethersproject/units'
import { useEthers, useTokenBalance, useNotifications } from '@usedapp/core'
import { Token } from '../Main'
import { Button, Input, CircularProgress } from "@material-ui/core"
import React, { useState, useEffect } from 'react'
import { useStakeTokens } from "../../hooks"
import { utils } from 'ethers'

interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
    }
    const { approveAndStake, approveAndStakeErc20State } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeErc20State.status === "Mining"

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Approve ERC20 transfer").length > 0) {
            console.log("approve!")
        }
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Stake Tokens"
        ).length > 0) {
            console.log("staked!")
        }

    }, [notifications])

    return (
        <div>
            <Input onChange={handleInputChange} />
            <Button onClick={handleStakeSubmit} color="primary" size="large" disabled={isMining}>{isMining ? <CircularProgress size={26} /> : "Stake!!!"}</Button>
        </div >
    )
}   