import React, { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
    const user = localStorage.getItem("user");
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user/email");
                setUserData(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUserData(JSON.parse(storedUser));
                setLoading(false);
            } else {
                fetchUser();
            }
        } else {
            setUserData(JSON.parse(user));
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {userData?.name || 'Guest'}</p>
        </div>
    );
};

export default Dashboard;
