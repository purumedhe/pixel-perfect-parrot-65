import {createFileRoute,type SearchSchemaInput} from '@tanstack/react-router';
import {PrivateWorkspace} from '@/components/finsight/workspace';
import {workspaceOptions} from '@/lib/workspace-data';
import {metadata} from '@/lib/metadata';
export const Route=createFileRoute('/_authenticated/dashboard')({
 head:()=>metadata('Financial overview','Manage your private financial documents and verified results with FinSight AI.'),
 validateSearch:(search:SearchSchemaInput & {document?:string;q?:string})=>({document:typeof search['document']==='string'?search['document']:'',q:typeof search['q']==='string'?search['q']:''}),
 loader:({context})=>context.queryClient.ensureQueryData(workspaceOptions),
 component:Page,
});
function Page(){const search=Route.useSearch();return <PrivateWorkspace view="overview" {...(search.document?{documentId:search.document}:{})} {...(search.q?{query:search.q}:{})}/>}
