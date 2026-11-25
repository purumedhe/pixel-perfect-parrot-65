import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/finsight/auth';
import {metadata} from '@/lib/metadata';
export const Route=createFileRoute('/auth')({head:()=>metadata('Sign in','Secure access to your FinSight AI financial workspace.'),component:()=> <AuthPage />});
