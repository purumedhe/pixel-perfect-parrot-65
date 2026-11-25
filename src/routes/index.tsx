import {createFileRoute} from '@tanstack/react-router';
import {DemoWorkspace} from '@/components/finsight/workspace';
import {metadata} from '@/lib/metadata';
import {nav,type View} from '@/components/finsight/shell';
export const Route=createFileRoute('/')({head:()=>metadata('Financial document intelligence','Explore the FinSight AI sample workspace, then upload and analyse your private financial documents.'),validateSearch:(search:Record<string,unknown>)=>({view:nav.some(n=>n.key===search['view'])?search['view'] as View:'overview',document:typeof search['document']==='string'?search['document']:'',q:typeof search['q']==='string'?search['q']:''}),component:Index});
function Index(){const search=Route.useSearch();return <DemoWorkspace view={search.view} {...(search.document?{documentId:search.document}:{})} {...(search.q?{query:search.q}:{})}/>}
