import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/finsight/auth';
import {metadata} from '@/lib/metadata';
export const Route=createFileRoute('/signup')({head:()=>metadata('Create your account','Secure access to your FinSight AI financial workspace.'),component:()=> <AuthPage signup/>});
