import React,{useEffect} from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase_context/index'

const LoginPage = () => {
    const { authUser, loading } = useAuth();
    const router = useRouter();
  

    useEffect(() => {
        if (!loading && !authUser)
          router.push('/')
      }, [authUser, loading])
    



    return (
        <h1>This is a login page</h1>
    );
}

export default LoginPage;