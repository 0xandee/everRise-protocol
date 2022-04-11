import { Button, makeStyles } from "@material-ui/core"
import { Container } from "@mui/material"
import { useEthers } from "@usedapp/core"
import { ReactComponent as Logo } from "./everRiseLogo.svg"
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        padding: theme.spacing(4),
        display: "flex",
        gap: theme.spacing(1),
        justifyContent: "space-between",
        borderBottom: "1px solid rgb(231, 234, 243)",
        backgroundColor: "white",
    },
    addressMarginRight: {
        marginRight: theme.spacing(2),
    },
    primaryColorButton: {
        color: "#fff",
        backgroundColor: "#1A5AFF!important",
    },
    secondaryColorButton: {
        color: "#1A5AFF",
        backgroundColor: "#fff!important",
        borderColor: "#1A5AFF",
    },
    logo: {
        width: 160,
        height: "100%",
    },
    linkContainer: {
        display: "flex",
        gap: theme.spacing(4),
        alignItems: "center",
    },
    activeLink: {
        color: "#1A5AFF!important",

    },
    disableLink: {
        color: "grey !important",
        transitionDuration: "0.3s",
        "&:hover": {
            color: "#1A5AFF!important",
        }
    }
}))

export const Header = (props: any) => {
    const classes = useStyles()

    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    return (
        <div className={classes.headerContainer}>
            <div className={classes.linkContainer}>
                <Logo className={classes.logo} />
                <div className={classes.linkContainer}>
                    <Link href="#" className={classes.disableLink} variant="button" underline="none" component="button" disabled >
                        Lend
                    </Link>
                    <Link href="#" className={classes.disableLink} variant="button" underline="none" component="button" disabled>
                        Borrow
                    </Link>
                    <Link href="#" className={classes.activeLink} variant="button" underline="none" component="button" >
                        Farm
                    </Link>
                    <Link href="#" className={classes.disableLink} variant="button" underline="none" component="button" disabled>
                        Stake
                    </Link>
                </div>
            </div>
            <div>
                {isConnected ? (
                    <>
                        <Button variant="contained" className={[classes.addressMarginRight, classes.primaryColorButton].join(" ")} disableElevation>
                            {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
                        </Button>
                        <Button variant="outlined" onClick={deactivate} disableElevation className={classes.secondaryColorButton}>
                            Disconnect
                        </Button>
                    </>
                ) : (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => activateBrowserWallet()}
                        className={classes.primaryColorButton} disableElevation
                        size="large"
                    >
                        Connect
                    </Button>
                )}
            </div>
        </div>
    )
}
