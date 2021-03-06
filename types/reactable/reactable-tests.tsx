import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Reactable from "reactable";

interface Person {
    name: string;
    age: number;
}

type PersonTable = new () => Reactable.Table<Person>;
const PersonTable = Reactable.Table as PersonTable;

type PersonTableHeader = new () => Reactable.Thead;
const PersonTableHeader = Reactable.Thead as PersonTableHeader;

type PersonTableTh = new () => Reactable.Th;
const PersonTableTh = Reactable.Th as PersonTableTh;

type PersonRow = new () => Reactable.Tr<Person>;
const PersonRow = Reactable.Tr as PersonRow;

type PersonTableTd = new () => Reactable.Td;
const PersonTableTd = Reactable.Td as PersonTableTd;

type PersonTableTfoot = new () => Reactable.Tfoot;
const PersonTableTfoot = Reactable.Tfoot as PersonTableTfoot;

let data = [
    {
        name: "Christoph Spielmann",
        age: 36
    }
];

export class TestComponent extends React.Component<{}, {}> {
    render(): JSX.Element {
        return <PersonTable data={data} />;
    }
}

export class FullblownReactableTestComponent extends React.Component<{}, {}> {
    render(): JSX.Element {
        let displayedColumns = ["name"];
        // custom table Th-elements
        let columns: JSX.Element[] = [];
        for (let colName of displayedColumns) {
            columns.push(
                <PersonTableTh column={colName} key={colName}>
                    <strong className="name-header">{colName}</strong>
                </PersonTableTh>
            );
        }
        let rows: JSX.Element[] = [];
        for (let d of data) {
            let tds: JSX.Element[] = [];
            displayedColumns.forEach(col => tds.push(
                <PersonTableTd column={col}>
                    <p>d[col]</p>
                </PersonTableTd>
            ));
            rows.push(
                <PersonRow>
                    {tds}
                </PersonRow>
            );
        }
        return (
            <PersonTable>
                <PersonTableHeader>
                    {columns}
                </PersonTableHeader>
                {rows}
                <PersonTableTfoot>
                    <tr className="reactable-footer">
                        <td>footer cell1</td>
                        <td>footer cell2</td>
                    </tr>
                </PersonTableTfoot>
            </PersonTable>
        );
    }
}
