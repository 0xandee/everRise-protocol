import { formatUnits } from '@ethersproject/units'
import { useEthers, useTokenBalance, useNotifications } from '@usedapp/core'
import { Token } from '../Main'
import { Button, Input, CircularProgress, Snackbar, makeStyles } from "@material-ui/core"
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
const useStyles = makeStyles((theme) => ({
    primaryColorButton: {
        color: "#fff!important",
        backgroundColor: "#1A5AFF!important",
    },
    secondaryColorButton: {
        color: "#1A5AFF!important",
        backgroundColor: "#fff!important",
        borderColor: "#1A5AFF!important",
    },
    disabledColorButton: {
        color: "#acacac!important",
        backgroundColor: "#e0e0e0!important",
    },
    underlineContainer: {
        transitionDuration: "0.3s",
        '&:hover': {
            borderBottom: '0px solid #1A5AFF'
        }
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #1A5AFF'
        },
        '&:after': {
            borderBottom: `1px solid #1A5AFF`
        },
    },
}))
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
    }

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = approveAndStakeErc20State.status === "Mining"
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState<boolean | undefined>(undefined)
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState<boolean | undefined>(undefined)
    const handleCloseSnack = () => {
        setShowErc20ApprovalSuccess(undefined)
        setShowStakeTokenSuccess(undefined)
    }
    const classes = useStyles()
    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Approve ERC20 transfer").length > 0) {
            setShowErc20ApprovalSuccess(true)
            setShowStakeTokenSuccess(undefined)
        }
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Stake Tokens"
        ).length > 0) {
            setShowErc20ApprovalSuccess(undefined)
            setShowStakeTokenSuccess(true)
            let inputAmount = (document.getElementById("inputAmount") as HTMLInputElement);
            inputAmount.value = "";
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess])

    return (
        <>
            <div className={classes.underlineContainer}>
                <Input
                    className={classes.underline}
                    id="inputAmount"
                    onChange={handleInputChange}
                    placeholder="Input stake amount"
                    type="number"
                    autoFocus={true} />
            </div>
            <div>
                {isMining ?
                    <LoadingButton
                        className={classes.secondaryColorButton}
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        size="medium"
                    >
                        Staking
                    </LoadingButton> : <Button
                        className={amount == 0 || amount < 0 || isMining ? "" : classes.primaryColorButton}
                        onClick={handleStakeSubmit}
                        variant="contained"
                        color="primary"
                        size="medium"
                        endIcon={<AddIcon />}
                        disabled={amount == 0 || amount < 0 || isMining} disableElevation>
                        Stake
                    </Button>}

            </div>
            <Snackbar
                open={showErc20ApprovalSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Token transfer permission approved! Approve 2nd transaction to accept transfer token to contract.
                </Alert>
            </Snackbar>
            <Snackbar
                open={showErc20ApprovalSuccess == false}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    Token Approval Failed!
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
            <Snackbar
                open={showStakeTokenSuccess == false}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    Tokens Stake Failed!
                </Alert>
            </Snackbar>
        </>
    )
}   