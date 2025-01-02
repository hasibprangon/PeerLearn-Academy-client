import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        },
            error => {
                if (error.status === 401 || error.status === 403) {
                    signOutUser()
                        .then(() => {
                            Swal.fire({
                                position: "top",
                                icon: "error",
                                title: "Invalid User",
                                showConfirmButton: false,
                                timer: 1500
                              });
                              navigate('/signIn')
                        })
                        .catch(err => {
                            Swal.fire({
                                position: "top",
                                icon: "error",
                                title: `${err.message}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                }
                return Promise.reject(error);
            }
        )
    }, [])

    return axiosInstance
};

export default useAxiosSecure;