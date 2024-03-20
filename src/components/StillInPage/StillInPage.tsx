import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid, TextField
} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import {increaseContestantPushUps, subscribeToContestantList} from "../../api/contestantService";

export interface Contestant {
    id: string | undefined;
    name: string;
    totalPushUps: number;
    isStillIn: boolean;
}

function StillInPage() {

    const { user } = useAuth()
    const [open, setOpen] = React.useState(false);
    const [contestantChosen, setContestantChosen] = React.useState<Contestant | null>(null)
    const [dialogTextField, setDialogTextField] = React.useState<string>("")

    const handleClickOpen = (contestant: Contestant) => {
        if (user?.email === 'david@chaddalton.com' || user?.email === 'andreadalton18@gmail.com' || user?.email === 'emma@mungomash.com' || user?.email === 'soccerjonnymark10@gmail.com') {
            setContestantChosen(contestant);
            setOpen(true);
        } else {
            console.log("Access denied. You can look, but you can't touch.")
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTextFieldChange = (e: any) => {
        setDialogTextField(e.target.value)
    }

    const [contestants, setContestants] = React.useState<Contestant[]>([])

    let whoIsUp = ''

    React.useEffect(() => {
        if (contestants.length < 1) {
            subscribeToContestantList(setContestants);
        }
    }, [contestants.length, user])

    if (contestants.length > 0) {
        const temp = [...contestants];
        let sortedCandidates = temp.sort((a, b) => a.totalPushUps + b.totalPushUps).filter(c => c.isStillIn)

        whoIsUp = sortedCandidates[0].name;
    }

    const increaseCounts = () => {
        if (contestantChosen != null) {
            increaseContestantPushUps(contestantChosen!, Number.parseInt(dialogTextField));
            handleClose()
            return subscribeToContestantList(setContestants);
        }
        handleClose()
    }

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                <h3 className={"winner application-text"}><span className={"winner-name"}>{whoIsUp} is</span> winning!</h3>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container spacing={4} sx={{justifyContent: 'center'}}>
                {contestants.map((contestant, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={"person-card"} onClick={() => handleClickOpen(contestant)} sx={{ boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
                                <CardHeader title={contestant.name} />
                                <CardContent>
                                    <h3>Total Push Ups: <span>{contestant.totalPushUps}</span></h3>
                                    <h3>Still In: <span>{contestant.isStillIn ? "Yes" : "No"}</span></h3>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                </Grid>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Push Ups</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        How many did you do?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cost"
                        type="number"
                        variant="standard"
                        onChange={handleTextFieldChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={increaseCounts}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default StillInPage;