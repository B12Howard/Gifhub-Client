import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardTable from '../dashboard-table';

// import axios from 'axios'

const apiRes = [
    {
        name: 'Greg Webb',
        allocation_id: 1,
        order: 1,
        portfolio_value: '$3247.31',
        sectors_held: {
            sector_name: ['Information Technology', 'Health Care', 'Financials'],
            percentage: [0.2, 0.2, 0.3],
        },
        securities: { ticker: ['TWTR', 'SHOP', 'SQ'], percentage: [0.3, 0.6, 0.1] },
    },
    {
        name: 'Greg Two',
        allocation_id: 1,
        order: 2,
        portfolio_value: '$83834.46',
        sectors_held: {
            sector_name: ['Information Technology', 'Health Care', 'Financials'],
            percentage: [0.03, 0.04, 0.2],
        },
        securities: { ticker: ['AET', 'JPM', 'C', 'GS', 'NVDA'], percentage: [0.2, 0.3, 0.1, 0.2, 0.2] },
    },
];

const Dashboard = () => {
    const [name, setName] = useState();
    const [selectedSectionData, setSelectedSectionData] = useState();
    const [selectedSectionData2, setSelectedSectionData2] = useState();
    const [portfolios, setPortfolios] = useState();
    const [selectedPortfolio, setSelectedPortfolio] = useState({});
    const [portfolioIdx, setPortfolioIdx] = useState();
    const [sectors, setSectors] = useState([]);
    const [securities, setSecurities] = useState([]);

    useEffect(() => {
        setName('Howard');
        // TODO use axios to fetch data from the server. Then use set states to inject the data into the charts
        // const fetchData = () => {
        //  const res = axios.get(url + params)
        //}
        if (apiRes) {
            setPortfolioIdx(0);
        }
    }, []);

    // const naviagate = (index, source) => {
    //     if (source === 'sector') {
    //         setSelectedSectionData('Go to ' + selectedPortfolio.sectors_held.sector_name[index]);
    //     } else {
    //         setSelectedSectionData2('Go to ' + selectedPortfolio.securities.ticker[index]);
    //     }
    // };

    return (
        <>
            <div className={``}>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                hasl;fjslkdfj
            </div>
            <div className={`col-md-6 mb-5`}>Hello! {name}</div>
            <div className={`ml-3`}>
                {/* TODO make dynamic from the apiRes data */}
                <select
                    defaultValue={0}
                    onChange={(event) => {
                        const temp = portfolios[event.target.value];
                        setSelectedPortfolio(temp);
                        setPortfolioIdx(event.target.value);
                    }}
                >
                    <option value={0}>Greg Webb</option>
                    <option value={1}>Greg Two</option>
                </select>
            </div>
            {selectedPortfolio !== undefined ? (
                <>
                    <div className={`col-md-6 mb-5`}>{'Porfolio: ' + selectedPortfolio.name}</div>
                    <div className={`container `}>
                        <div className={`row`}>
                            <div className={`col-md-6 mb-5`}>
                                <span>Sector Breakdown</span>
                                <DashboardTable
                                    tableStyle={`mb-3 mt-3`}
                                    data={{ values: selectedPortfolio.sortedSectors, key: 'sector_name' }}
                                    headers={{ title: 'Sector', percentage: '%', color: 'Color' }}
                                />
                                <div className={`col-md-6 mb-3`}>{selectedSectionData}</div>
                            </div>

                            <div className={`col-md-6 mb-5`}>
                                <span>Securities Breakdown</span>
                                <DashboardTable
                                    tableStyle={`mb-3 mt-3`}
                                    data={{ values: selectedPortfolio.sortedSecurities, key: 'ticker' }}
                                    headers={{ title: 'Security', percentage: '%', color: 'Color' }}
                                />
                                <div className={`col-md-6 mb-3`}>{selectedSectionData2}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                'Loading...'
            )}
        </>
    );
};

export default Dashboard;
