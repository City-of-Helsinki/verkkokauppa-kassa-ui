import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from "hds-react";
import { useParams,useSearchParams } from "react-router-dom"
import authService from '../../auth/authService';
import * as Sentry from '@sentry/browser'
import { toast } from 'react-toastify'

export const Login = () => {
    const { id } = useParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const performLogin = async () => {
            try {
                // Mahdollinen korjaus kahden käyttäjän ongelmaan:
                // localStorage.clear();

                for (let key in localStorage) {
                    if (key.startsWith('orderId')
                    ) {
                        sessionStorage.removeItem(key);
                    }
                }
                for (let key in sessionStorage) {
                    if (key.includes('talpa-verkkokauppa-ui') ||
                        key.startsWith('apiToken')
                    ) {
                        sessionStorage.removeItem(key);
                    }
                }
                localStorage.setItem("orderId", id || "");
                await authService.login();
                setIsLoading(false);
            } catch (error) {
                console.error("Login failed:", error);
                if (!(error instanceof Error)) {
                    // eslint-disable-next-line no-ex-assign
                    error = new Error(`Non-Error rejection: ${JSON.stringify(error)}`);
                }
                Sentry.captureException(error);
                setError(
                  "Kirjautuminen epäonnistui. Yritä uudelleen tai lataa sivu uudelleen."
                );
                toast.warn(`Kirjautuminen epäonnistui, yritä uudelleen`, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setIsLoading(false);
            }
        };

        performLogin();
    }, [id]);

    const handleReload = () => {
        window.location.reload();
    };

    if (isLoading) {
        return (
          <div className="box spinner">
              <LoadingSpinner />
          </div>
        );
    }

    if (error) {
        return (
          <div className="error-container">
              <p>{error}</p>
              <button onClick={handleReload}>Lataa sivu uudelleen</button>
          </div>
        );
    }

    return null;
};

export default Login;