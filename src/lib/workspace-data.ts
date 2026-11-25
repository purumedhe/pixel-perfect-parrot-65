import {queryOptions} from '@tanstack/react-query';
import {getWorkspace} from './workspace.functions';
export const workspaceOptions=queryOptions({queryKey:['financial-workspace'],queryFn:()=>getWorkspace(),staleTime:15000});
