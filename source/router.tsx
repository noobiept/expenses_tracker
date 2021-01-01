import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import UpdateExpense from "./pages/update_expense";
import ExpenseList from "./pages/expense_list";

export default function Router() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={ExpenseList} />
                <Route path="/expense/:id" component={UpdateExpense} />
            </Switch>
        </BrowserRouter>
    );
}
