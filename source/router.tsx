import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpensesList from "./expenses_list";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <ExpensesList />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
