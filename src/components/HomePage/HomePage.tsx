import React from 'react';
import {Button, Card, CardContent, CardHeader, Container, Grid} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import {subscribeToCandidateList} from "../../api/candidateService";

export interface Candidate {
    id: string | undefined;
    name: string;
    totalDollarsSpent: number;
    timesPayed: number;
}

function HomePage() {

    const { user } = useAuth()

    const [candidates, setCandidates] = React.useState<Candidate[]>([])

    let whoIsUp = ''

    React.useEffect(() => {
        if (candidates.length < 1) {
            return subscribeToCandidateList(setCandidates);
        }
    })

    if (candidates.length > 0) {
        let sortedCandidates = candidates.sort((a, b) => a.timesPayed - b.timesPayed)

        const lowestTimesPayed = sortedCandidates[0].timesPayed;
        const filteredCandidates = candidates.filter(c => c.timesPayed === lowestTimesPayed)
        if (filteredCandidates.length > 1) {
            const sortedFilteredCandidates = filteredCandidates.sort((a, b) => a.totalDollarsSpent - b.totalDollarsSpent)
            whoIsUp = sortedFilteredCandidates[0].name
        } else {
            whoIsUp = sortedCandidates[0].name
        }
    }

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 className={"title"}>Whose Turn Is It Anyway</h1>
                <Button sx={{color: 'navy', fontFamily: 'Ubuntu'}}>Sign In</Button>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                <h3 className={"winner"}>It's <span className={"winner-name"}>{whoIsUp}'s</span> turn!</h3>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container spacing={4} sx={{justifyContent: 'center'}}>
                {candidates.map((candidate, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
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
        </div>

    )
}

export default HomePage;