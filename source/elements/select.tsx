import React from "react";

export interface SelectArgs {
    selected: number;
    values: number[];
    onChange: (val: number) => void;
}

export default function Select({ selected, values, onChange }: SelectArgs) {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(parseInt(e.target.value))}
        >
            {values.map((val) => (
                <option key={val} value={val}>
                    {val}
                </option>
            ))}
        </select>
    );
}
