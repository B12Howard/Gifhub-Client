import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Dashboard from './views/dashboard';

const dot = (color) => {
    return { height: '25px', width: '25px', backgroundColor: color, borderRadius: '50%', display: 'inline-block' };
};

const DashboardTable = (props) => {
    const { tableStyle, data, headers } = props;

    return (
        <div className={tableStyle}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{headers ? headers.color : ''}</th>
                        <th>{headers ? headers.title : ''}</th>
                        <th>{headers ? headers.percentage : ''}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.values !== undefined ? (
                        data.values.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <div style={dot(item.color)}></div>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.value}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>''</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default DashboardTable;
