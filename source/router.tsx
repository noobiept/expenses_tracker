import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Expense from "./expense";
import ExpenseList from "./expense_list";

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
                <Route path="/expense/:id" component={Expense} />
            </Switch>
        </BrowserRouter>
    );
}
