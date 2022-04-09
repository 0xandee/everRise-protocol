import { formatUnits } from '@ethersproject/units'
import { useEthers, useTokenBalance, useNotifications } from '@usedapp/core'
import { Token } from '../Main'
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core"
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState, useEffect } from 'react'
import { useStakeTokens } from "../../hooks"
import { utils } from 'ethers'
import Alert from "@material-ui/lab/Alert"

export interface StakeFormProps {
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
        const newAmount = event.target.value === "" ? "0" : Number(event.target.value)
        setAmount(newAmount)
        console.log("newAmount", newAmount);
    }

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeErc20State.status === "Mining"
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)
    const handleCloseSnack = () => {
        setShowErc20ApprovalSuccess(false)
        setShowStakeTokenSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Approve ERC20 transfer").length > 0) {
            setShowErc20ApprovalSuccess(true)
            setShowStakeTokenSuccess(false)
        }
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Stake Tokens"
        ).length > 0) {
            setShowErc20ApprovalSuccess(false)
            setShowStakeTokenSuccess(true)
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess])

    return (
        <>
            <div>
                <Input
                    onChange={handleInputChange}
                    placeholder="Input stake amount"
                    type="number"
                    autoFocus={true} />
            </div>
            <div>
                {isMining ?
                    <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        size="large"
                    >
                        Staking
                    </LoadingButton> : <Button
                        onClick={handleStakeSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<AddIcon />}
                        disabled={amount == 0 || amount < 0 || isMining}>
                        Stake
                    </Button>}

            </div>
            <Snackbar
                open={showErc20ApprovalSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    ERC-20 token transfer approved! Now approve the 2nd transaction.
                </Alert>
            </Snackbar>
            <Snackbar
                open={showStakeTokenSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Tokens Staked!
                </Alert>
            </Snackbar>
        </>
    )
}   