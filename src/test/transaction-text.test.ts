import {describe,expect,it} from 'vitest';
import {normalizeTransactionText,validateTransaction,monthlyTotals,type FinancialTransaction} from '@/lib/finance';

const amounts={debit:12.34,credit:null,balance:null,category:'Other',currency:'INR'};

describe('Nullable extracted transaction text',()=>{
 it('rejects missing raw fields without throwing and never assigns an undated amount to a month',()=>{
  const row={...amounts,date:null,description:null} as unknown as FinancialTransaction;
  expect(validateTransaction(row)).toEqual(['A valid transaction date is required','A description is required']);
  expect(monthlyTotals([row,{...amounts,date:'2026-11-25',description:'Payment'}])).toEqual([{date:'2026-11',month:'Nov',income:0,expenses:12.34}]);
 });
 it('keeps missing fields empty and flags them for review without inventing values',()=>{
  const row=normalizeTransactionText({...amounts,date:null,description:null});
  expect(row.date).toBe('');
  expect(row.description).toBe('');
  expect(validateTransaction(row)).toEqual(['A valid transaction date is required','A description is required']);
  expect(row.debit).toBe(12.34);
 });
 it('supports date and description sorting and searching with nullable extraction fields',()=>{
  const rows=[{...amounts,date:null,description:null},{...amounts,date:'2026-11-25',description:'Payment'}].map(normalizeTransactionText);
  expect(rows.sort((a,b)=>a.date.localeCompare(b.date)).map(r=>r.date)).toEqual(['','2026-11-25']);
  expect(rows.sort((a,b)=>a.description.localeCompare(b.description)).map(r=>r.description)).toEqual(['','Payment']);
  expect(rows.filter(r=>r.description.toLowerCase().includes('payment'))).toHaveLength(1);
 });
});