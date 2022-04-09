import React, { useState, useEffect } from "react"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import { Token } from "../Main"
import { useUnstakeTokens, useStakingBalance } from "../../hooks"
import Alert from "@material-ui/lab/Alert"
import { useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export interface UnstakeFormProps {
  token: Token
}

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
  },
}))

export const Unstake = ({ token }: UnstakeFormProps) => {
  const { image, address: tokenAddress, name } = token

  const { notifications } = useNotifications()

  const balance = useStakingBalance(tokenAddress)

  const formattedBalance: number = balance
    ? parseFloat(formatUnits(balance, 18))
    : 0

  const { send: unstakeTokensSend, state: unstakeTokensState } =
    useUnstakeTokens()

  const handleUnstakeSubmit = () => {
    return unstakeTokensSend(tokenAddress)
  }

  const [showUnstakeSuccess, setShowUnstakeSuccess] = useState(false)

  const handleCloseSnack = () => {
    showUnstakeSuccess && setShowUnstakeSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Unstake tokens"
      ).length > 0
    ) {
      !showUnstakeSuccess && setShowUnstakeSuccess(true)
    }
  }, [notifications, showUnstakeSuccess])

  const isMining = unstakeTokensState.status === "Mining"


  const classes = useStyles()

  return (
    <>
      <div className={classes.contentContainer}>
        <BalanceMsg
          label={`Staked balance:`}
          amount={formattedBalance}
          tokenImgSrc={image}
        />
        {isMining ?
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            size="large"
          >
            Unstaking
          </LoadingButton> : <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleUnstakeSubmit}
            disabled={isMining || formattedBalance === 0}
          >
            Unstake all
          </Button>}
      </div>
      <Snackbar
        open={showUnstakeSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens unstaked successfully!
        </Alert>
      </Snackbar>
    </>
  )
}
