import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Select } from 'react-materialize';
import { SqlDate } from '../../Models/Date';
import { IGifFileRes } from '../../Models/File/GifRes';
import { IPaginationDTO, PaginationDTO } from '../../Models/Pagination';
import FileService from '../../Services/Api/FileService';
import Button from '../../Shared/Components/button';
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

const MyUploads = () => {
    const [name, setName] = useState();
    const [selectedSectionData, setSelectedSectionData] = useState();
    const [selectedSectionData2, setSelectedSectionData2] = useState();
    const [portfolios, setPortfolios] = useState();
    const [selectedPortfolio, setSelectedPortfolio] = useState({});
    const [rowCount, setRowCount] = useState<number>();
    const [paginationRes, setPaginationRes] = useState<null | IPaginationDTO<IGifFileRes>>(new PaginationDTO({}));
    const [paginationCount, setPaginationCount] = useState<number>(0);

    useEffect(() => {
        // setName('Howard');
        // TODO use axios to fetch data from the server. Then use set states to inject the data into the charts
        // const fetchData = async () => {
        //     const payload = new PaginationDTO<IGifFileRes>({
        //         rowCount: rowCount || 10,
        //         lastId: null,
        //         lastDate: null,
        //     });

        //     console.log('p', paginationRes);

        //     console.log('payload, payload', payload);
        //     return await new FileService().GetGifsPagination(payload);
        // };

        fetchData().then((res) => {
            res.json().then((data) => {
                if (data) {
                    // setPortfolioIdx(0);
                    setPaginationRes(data);
                    console.log('api res', data);
                }
            });
        });
    }, []);

    const fetchData = async (payloadParam?: IPaginationDTO<IGifFileRes> | null, count?: number) => {
        console.log('rowCount', rowCount);
        const payload =
            payloadParam ??
            new PaginationDTO<IGifFileRes>({
                rowCount: count || rowCount || 10,
                lastId: null,
                lastDate: null,
            });

        console.log('p', paginationRes);

        console.log('payload, payload', payload);
        return await new FileService().GetGifsPagination(payload);
    };

    const fetchPagination = (isNext: boolean) => {
        const currentPaginationRes = paginationRes;
        const lastEl = currentPaginationRes?.records?.length
            ? currentPaginationRes?.records[currentPaginationRes?.records?.length - 1]
            : null;
        const payload = new PaginationDTO<IGifFileRes>({
            rowCount: rowCount || 10,
            lastId: currentPaginationRes?.lastId || null,
            lastDate: currentPaginationRes?.lastDate
                ? new SqlDate({
                      Time: lastEl?.createdat?.Time ?? null,
                      Valid: lastEl?.createdat?.Valid ?? null,
                  })
                : null,
            next: isNext,
        });

        fetchData(payload).then((res) => {
            res.json().then((data) => {
                if (data) {
                    // setPortfolioIdx(0);
                    setPaginationRes(data);
                }
            });
        });
    };

    const deleteFile = (index: number, payload: IGifFileRes) => {};
    const addToPlaylist = (index: number, payload: IGifFileRes) => {};
    const preview = (index: number, payload: IGifFileRes) => {};

    const paginationNext = () => {
        fetchPagination(true);
        setPaginationCount(paginationCount + 1);
    };

    const paginationPrev = () => {
        fetchPagination(false);
        setPaginationCount(paginationCount - 1);
    };

    const refreshPagination = (count: number) => {
        fetchData(null, count).then((res) => {
            res.json().then((data) => {
                if (data) {
                    setPaginationRes(data);
                }
            });
        });
    };

    return (
        <>
            <div className={``}>
                <Helmet>
                    <title>My Remote Files</title>
                </Helmet>
            </div>
            <div className={`col-md-6 mb-5`}>My Remote Files</div>

            {paginationRes?.records?.map((record, index) => {
                return (
                    <div key={index} className={`flex`}>
                        <div>{'URL: ' + record.url}</div>
                        <div>{'Created At: ' + record.createdat?.Time}</div>
                        <div>
                            <button>Delete</button>
                        </div>
                        <div>
                            <button>Add To Playlist</button>
                        </div>
                        <div>
                            <button>Preview</button>
                        </div>
                    </div>
                );
            })}

            <div>
                My Files
                <div className="">
                    <Select
                        noLayout
                        name="mySelect"
                        onChange={(event) => {
                            setRowCount(+event.target.value);
                            refreshPagination(+event.target.value);
                        }}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="name"></label>
                    <textarea id="name" name="name" />
                </div>
                <div className="flex">
                    <Button name={'◀'} callback={() => paginationPrev()} disabled={paginationCount === 0} />

                    <Button name={'▶'} callback={() => paginationNext()} />
                </div>
            </div>
        </>
    );
};

export default MyUploads;
