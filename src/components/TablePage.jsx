import { useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table.jsx"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/ui/pagination.jsx"

function TablePage({ dataSource = [], columns = [], pagination = { pageSize: 10, total: 0, current: 1 } }) {
    const [pageOptions, setPageOptions] = useState(pagination)
    const pageLen = useMemo(() => Math.ceil(pageOptions?.total / pageOptions?.pageSize), [pageOptions])
    const data = useMemo(() => {
        const nowPage = pageOptions?.current - 1
        return dataSource.slice(nowPage * 10, (nowPage + 1) * 10)
    }, [dataSource, pageOptions])

    const pageSplit = 4
    const pageNumberList = useMemo(() => Array.from({ length: pageLen > pageSplit ? pageSplit : pageLen }, (_, i) => i + 1), [pageSplit, pageLen])

    return (
        <>
            <Table className="text-black">
                <TableHeader>
                    <TableRow className="bg-[#C2C2C2] text-center">
                        <TableHead key="index">Number</TableHead>
                        {columns.map((column, index) => (
                            <TableHead className="px-2" key={column.dataIndex}> {column.dataIndex} </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex + 1}>
                            <TableCell className="px-2" key={`${rowIndex}-`}> {rowIndex + 1} </TableCell>
                            {columns.map((column, colIndex) => (
                                <TableCell className="px-2" key={`${rowIndex}-${colIndex}`}>
                                    {column.render ? column.render(row) : row[column.dataIndex]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination>
                <PaginationContent className="text-white">
                    <PaginationItem onClick={() => setPageOptions(prev => ({
                        ...prev,
                        current: prev.current <= 1 ? 1 : prev.current - 1,
                    }))}>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    {pageNumberList.map((page, index) => (
                        <PaginationItem key={page + index} onClick={() => setPageOptions(prev => ({ ...prev, current: page }))}>
                            <PaginationLink href="#" isActive={page === pageOptions?.current}> {page} </PaginationLink>
                        </PaginationItem>
                    ))}
                    {pageLen > 4 && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink
                                    href="#" isActive={page === pageOptions?.current}
                                    onClick={() => setPageOptions(prev => ({ ...prev, current: pageLen }))}
                                >
                                    {pageLen}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem onClick={() => setPageOptions(prev => ({
                        ...prev,
                        current: prev.current < pageLen ? prev.current + 1 : prev.current,
                    }))}>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default TablePage