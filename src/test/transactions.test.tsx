import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import type {FinancialTransaction} from '@/lib/finance';

vi.mock('@tanstack/react-start',()=>({useServerFn:(fn:unknown)=>fn}));
vi.mock('@/lib/workspace.functions',()=>({updateTransaction:vi.fn(),deleteTransaction:vi.fn()}));
import {TransactionTable} from '@/components/finsight/transactions';

afterEach(cleanup);

describe('Transaction table nullable-field regression',()=>{
 it('can sort, search, and edit raw extracted rows with missing dates and descriptions',()=>{
  // Raw stored extraction is JSON; it can violate the reviewed transaction type.
  const rows=[
   {date:null,description:null,debit:12.34,credit:null,balance:null,category:'Other',currency:'INR'},
   {date:'2026-11-25',description:'Payment',debit:20,credit:null,balance:null,category:'Other',currency:'INR'},
  ] as unknown as FinancialTransaction[];
  const changed=vi.fn();
  render(<QueryClientProvider client={new QueryClient()}><TransactionTable rows={rows} documents={[]} onChange={changed}/></QueryClientProvider>);
  expect(screen.getByText('Missing date')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Date'}));
  fireEvent.click(screen.getByRole('button',{name:'Description'}));
  fireEvent.change(screen.getByRole('textbox',{name:'Search transactions'}),{target:{value:'payment'}});
  expect(screen.queryByText('Missing date')).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox',{name:'Search transactions'}),{target:{value:''}});
  fireEvent.click(screen.getByRole('button',{name:'Edit'}));
  fireEvent.change(screen.getByLabelText('Date'),{target:{value:'2026-11-24'}});
  fireEvent.change(screen.getByLabelText('Description'),{target:{value:'Reviewed purchase'}});
  fireEvent.click(screen.getByRole('button',{name:'Save changes'}));
  expect(changed).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({date:'2026-11-24',description:'Reviewed purchase',debit:12.34})]));
 });
});