import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/finsight/auth';
import {metadata} from '@/lib/metadata';
export const Route=createFileRoute('/reset-password')({head:()=>metadata('Reset your password','Secure access to your FinSight AI financial workspace.'),component:()=> <AuthPage reset/>});
