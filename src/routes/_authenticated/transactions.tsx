import {createFileRoute} from '@tanstack/react-router';
import {PrivateWorkspace} from '@/components/finsight/workspace';
import {workspaceOptions} from '@/lib/workspace-data';
import {metadata} from '@/lib/metadata';
export const Route=createFileRoute('/_authenticated/transactions')({
 head:()=>metadata('Transactions','Manage your private financial documents and verified results with FinSight AI.'),
 validateSearch:(search:Record<string,unknown>)=>({document:typeof search['document']==='string'?search['document']:'',q:typeof search['q']==='string'?search['q']:''}),
 loader:({context})=>context.queryClient.ensureQueryData(workspaceOptions),
 component:Page,
});
function Page(){const search=Route.useSearch();return <PrivateWorkspace view="transactions" {...(search.document?{documentId:search.document}:{})} {...(search.q?{query:search.q}:{})}/>}
