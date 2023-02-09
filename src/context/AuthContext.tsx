import * as React from 'react';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import {app} from "../api/firebase/app";

interface AuthProps {
    children: React.ReactNode;
}

const auth = getAuth(app);

type AuthContextState = { user: User | null, isInitialized: boolean };

const AuthContext = React.createContext<AuthContextState | undefined>(
    undefined,
);

const AuthProvider: React.FunctionComponent<AuthProps> = ({ children }) => {

    const [user, setUser] = React.useState<User | null>(null);
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
    const value = { user, isInitialized };

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setIsInitialized(true);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            'useAuth must be used within a AuthProvider',
        );
    }
    return context;
};

export { AuthProvider, useAuth };