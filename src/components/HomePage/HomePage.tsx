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

    const whoIsUp = 'Emma'
    const emmasCount = 0
    const davidsCount = 1
    const emmaTotalDollarsSpent = '$0'
    const davidTotalDollarsSpent = '$52.45'

    React.useEffect(() => {
        if (candidates.length < 1) {
            return subscribeToCandidateList(setCandidates);
        }
    })

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 className={"title"}>Who's Turn Is It Anyways</h1>
                <Button sx={{color: 'navy', fontFamily: 'Ubuntu'}}>Sign In</Button>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                <h3 className={"winner"}>It's <span className={"winner-name"}>{whoIsUp}'s</span> turn!</h3>
            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container spacing={4} sx={{justifyContent: 'center'}}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader title={candidates[0]?.name} />
                            <CardContent>
                                <h3>Times Bought: <span>{candidates[0]?.timesPayed}</span></h3>
                                <h3>Dollars Spent: <span>${candidates[0]?.totalDollarsSpent}</span></h3>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader title={candidates[1]?.name} />
                            <CardContent>
                                <h3>Times bought: <span>{candidates[1]?.timesPayed}</span></h3>
                                <h3>Dollars Spent: <span>${candidates[1]?.totalDollarsSpent}</span></h3>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

export default HomePage;