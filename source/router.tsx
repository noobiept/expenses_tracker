import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import IndividualExpense from "./pages/individual_expense";
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
                <Route path="/expense/:id" component={IndividualExpense} />
            </Switch>
        </BrowserRouter>
    );
}
