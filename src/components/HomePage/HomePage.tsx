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
import {increaseUserCounts, subscribeToCandidateList} from "../../api/candidateService";

export interface Candidate {
    id: string | undefined;
    name: string;
    totalDollarsSpent: number;
    timesPayed: number;
}

function HomePage() {

    const { user } = useAuth()
    const [open, setOpen] = React.useState(false);
    const [candidateChosen, setCandidateChosen] = React.useState<Candidate | null>(null)
    const [dialogTextField, setDialogTextField] = React.useState<string>("")

    const handleClickOpen = (candidate: Candidate) => {
        if (user?.email === 'david@chaddalton.com' || user?.email === 'andreadalton18@gmail.com' || user?.email === 'emma@mungomash.com') {
            setCandidateChosen(candidate);
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

    const [candidates, setCandidates] = React.useState<Candidate[]>([])

    let whoIsUp = ''

    React.useEffect(() => {
        if (candidates.length < 1) {
            subscribeToCandidateList(setCandidates);
        }
    }, [candidates.length, user])

    if (candidates.length > 0) {
        const temp = [...candidates];
        let sortedCandidates = temp.sort((a, b) => a.timesPayed - b.timesPayed)

        const lowestTimesPayed = sortedCandidates[0].timesPayed;
        const filteredCandidates = candidates.filter(c => c.timesPayed === lowestTimesPayed)
        if (filteredCandidates.length > 1) {
            const sortedFilteredCandidates = filteredCandidates.sort((a, b) => a.totalDollarsSpent - b.totalDollarsSpent)
            whoIsUp = sortedFilteredCandidates[0].name
        } else {
            whoIsUp = sortedCandidates[0].name
        }
    }

    const increaseCounts = () => {
        if (candidateChosen != null) {
            increaseUserCounts(candidateChosen!, Number.parseInt(dialogTextField));
            handleClose()
            return subscribeToCandidateList(setCandidates);
        }
        handleClose()
    }

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                <h3 className={"winner application-text"}>It's <span className={"winner-name"}>{whoIsUp}'s</span> turn!</h3>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container spacing={4} sx={{justifyContent: 'center'}}>
                {candidates.map((candidate, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={"person-card"} onClick={() => handleClickOpen(candidate)} sx={{ boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
                                <CardHeader title={candidate.name} />
                                <CardContent>
                                    <h3>Times Bought: <span>{candidate.timesPayed}</span></h3>
                                    <h3>Dollars Spent: <span>${candidate.totalDollarsSpent}</span></h3>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                </Grid>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cost</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        How much did it cost?
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

export default HomePage;