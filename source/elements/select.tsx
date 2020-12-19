import React from "react";

export interface SelectArgs {
    values: number[];
    onChange: (val: number) => void;
}

export default function Select({ values, onChange }: SelectArgs) {
    return (
        <select onChange={(e) => onChange(parseInt(e.target.value))}>
            {values.map((val) => (
                <option key={val} value={val}>
                    {val}
                </option>
            ))}
        </select>
    );
}
