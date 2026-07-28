"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect } from 'react';
import { LoginAction } from '../_actions/authActions';


const LoginForm = () => {

   
    return (
        <div>
            <form action={LoginAction}  className='space-y-3 max-w-xl'>
                <Card className='p-6 space-y-3'>
                    <Input name='email' type='email' placeholder='Enter your email' required></Input>
                    <Input name='password' type='password' placeholder='Enter your password' required></Input>
                    <Button type='submit' className='cursor-pointer bg-green-700'>
                        Login
                        </Button>
                </Card>
            </form>
        </div>
    );
};
   
export default LoginForm;