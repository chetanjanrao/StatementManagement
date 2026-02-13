
import axios from "axios";
import { Transaction } from "../Models/Transaction";
const API_LINK = "http://localhost:3000/transactions";


export const  getAllTransactions =() =>axios.get<Transaction[]>(API_LINK);
export const getAllTransactionById = (id : number) =>axios.get<Transaction>(`${API_LINK}/${id}`);
export const deleteTransactionById = (id:number) =>axios.delete<void>(`${API_LINK}/${id}`);
export const addTransaction = (transaction : Transaction) =>axios.post<Transaction>(API_LINK,transaction);
export const saveTransaction = (id:number,transaction : Transaction) => axios.put<Transaction>(`${API_LINK}/${id}`,transaction);