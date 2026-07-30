import {
    ButtonGhostContent,
    ButtonOutlineContent,
    InputDebounced,
    InputText,
    Popover,
} from "@browserworkshop/shared"
import {
    IconSortAscending,
    IconSortDescending,
    IconTableColumn,
} from "@tabler/icons-react"
import {
    type Column,
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type Row,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table"
import {
    type ReactElement,
    type ReactNode,
    useMemo,
    useState,
} from "react"
import { CircularLoader } from "../../../../website/src/components/circularLoader"
import { css } from "../../../../website/styled-system/css"
import { Section } from "../layouts/section/section"
import { FormatNull } from "./formatNull"

export function DataTable<
    TData extends Record<
        keyof TData,
        unknown
    >,
>(props: {
    children?: ReactElement | null
    data: Array<TData>
    isLoading?: boolean
    columns: Array<ColumnDef<TData>>
    onRowClick?: (
        context: Row<TData>,
    ) => void
}) {
    const memoizedData = useMemo(
        () => props.data,
        [props.data],
    )
    const [
        globalFilter,
        setGlobalFilter,
    ] = useState("")
    const [sorting, setSorting] =
        useState<SortingState>([])
    const [
        columnVisibility,
        setColumnVisibility,
    ] = useState({})

    const table = useReactTable<TData>({
        data: memoizedData,
        columns: props.columns.map(
            (column) => ({
                ...column,
                enableMultiSort: true,
            }),
        ),
        getRowCanExpand: () => true,
        getCoreRowModel:
            getCoreRowModel(),
        getFilteredRowModel:
            getFilteredRowModel(),
        getExpandedRowModel:
            getExpandedRowModel(),
        getSortedRowModel:
            getSortedRowModel(),
        onGlobalFilterChange:
            setGlobalFilter,
        onSortingChange: setSorting,
        onColumnVisibilityChange:
            setColumnVisibility,
        enableMultiSort: true,
        state: {
            globalFilter: globalFilter,
            sorting: sorting,
            columnVisibility,
        },
    })

    if (props.isLoading) {
        return <CircularLoader />
    }
    return (
        <Section.Root>
            <Section.Header>
                <div
                    className={css({
                        display: "flex",
                        flexDirection:
                            "row",
                        justifyContent:
                            "start",
                        alignItems:
                            "center",
                    })}
                >
                    {props.children ??
                        null}
                </div>
                <div
                    className={css({
                        display: "flex",
                        flexDirection:
                            "row",
                        justifyContent:
                            "start",
                        alignItems:
                            "center",
                        gap: "0.5rem",
                    })}
                >
                    <Popover
                        triggerElement={
                            <button type="button">
                                <ButtonOutlineContent
                                    leftIcon={
                                        <IconTableColumn />
                                    }
                                />
                            </button>
                        }
                        position="bottom"
                    >
                        {(_context) => {
                            return (
                                <div
                                    className={css(
                                        {
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            justifyContent:
                                                "start",
                                            alignItems:
                                                "start",
                                            gap: "0.5rem",
                                            padding:
                                                "1rem",
                                        },
                                    )}
                                >
                                    {table
                                        .getAllColumns()
                                        .filter(
                                            (
                                                col,
                                            ) =>
                                                col.getCanHide(),
                                        )
                                        .map(
                                            (
                                                column: Column<TData>,
                                            ) => (
                                                <label
                                                    key={
                                                        column.id
                                                    }
                                                    className={css(
                                                        {
                                                            display:
                                                                "flex",
                                                            flexDirection:
                                                                "row",
                                                            justifyContent:
                                                                "start",
                                                            alignItems:
                                                                "center",
                                                            gap: "0.5rem",
                                                        },
                                                    )}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={column.getIsVisible()}
                                                        onChange={column.getToggleVisibilityHandler()}
                                                        className={css(
                                                            {},
                                                        )}
                                                    />
                                                    {
                                                        column
                                                            .columnDef
                                                            .header as ReactNode
                                                    }
                                                </label>
                                            ),
                                        )}
                                </div>
                            )
                        }}
                    </Popover>
                    <InputDebounced
                        value={
                            globalFilter ??
                            ""
                        }
                        onChange={(
                            value,
                        ) =>
                            setGlobalFilter(
                                value,
                            )
                        }
                    >
                        <InputText
                            placeholder="Search"
                            className={css.raw(
                                {
                                    width: "100%",
                                    maxWidth:
                                        "320px",
                                },
                            )}
                        />
                    </InputDebounced>
                </div>
            </Section.Header>
            <div
                className={css({
                    width: "100%",
                    maxWidth: "100%",
                    height: "fit-content",
                    maxHeight: "256px",
                    display: "flex",
                    flexDirection:
                        "column",
                    justifyContent:
                        "start",
                    alignItems:
                        "stretch",
                    overflow: "auto",
                    // borderRadius: "0.5rem",
                    // borderWidth: "1px",
                    // borderStyle: "solid",
                    // borderColor: "neutral/25",
                    padding: 0,
                })}
            >
                <table
                    className={css({
                        // width: "100%",
                        // maxWidth: "100%",
                        borderCollapse:
                            "collapse",
                    })}
                >
                    <thead
                        className={css({
                            borderBottomWidth:
                                "1px",
                            borderBottomColor:
                                "neutral/25",
                        })}
                    >
                        <tr
                            className={css(
                                {},
                            )}
                        >
                            {table
                                .getFlatHeaders()
                                .map(
                                    (
                                        header,
                                    ) => {
                                        return (
                                            <th
                                                key={
                                                    header.id
                                                }
                                                colSpan={
                                                    header.colSpan
                                                }
                                                className={css(
                                                    {},
                                                )}
                                            >
                                                <div
                                                    className={css(
                                                        {
                                                            display:
                                                                "flex",
                                                            justifyContent:
                                                                "start",
                                                            alignItems:
                                                                "center",
                                                            padding:
                                                                "0.5rem",
                                                        },
                                                    )}
                                                >
                                                    {header.column.getCanSort() ===
                                                    false ? null : (
                                                        <button
                                                            type="button"
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            <ButtonGhostContent
                                                                leftIcon={
                                                                    {
                                                                        asc: (
                                                                            <IconSortAscending
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        ),
                                                                        desc: (
                                                                            <IconSortDescending
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        ),
                                                                    }[
                                                                        String(
                                                                            header.column.getIsSorted(),
                                                                        )
                                                                    ]
                                                                }
                                                                text={header.column.columnDef.header?.toString()}
                                                            />
                                                        </button>
                                                    )}
                                                </div>
                                            </th>
                                        )
                                    },
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {table.getRowModel()
                            .rows
                            .length >
                        0 ? null : (
                            <tr
                                className={css(
                                    {
                                        // width: "100%",
                                    },
                                )}
                            >
                                <td
                                    className={css(
                                        {},
                                    )}
                                    colSpan={
                                        table.getAllColumns()
                                            .length
                                    }
                                >
                                    <div
                                        className={css(
                                            {
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "start",
                                                alignItems:
                                                    "center",
                                                padding:
                                                    "1rem",
                                            },
                                        )}
                                    >
                                        <FormatNull
                                            text="No data"
                                            className={css.raw(
                                                {
                                                    // whiteSpace: "nowrap"
                                                },
                                            )}
                                        />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {table
                            .getRowModel()
                            .rows.map(
                                (
                                    row,
                                ) => {
                                    return (
                                        <tr
                                            key={
                                                row.id
                                            }
                                            onClick={(
                                                event,
                                            ) => {
                                                event.stopPropagation()
                                                if (
                                                    !props.onRowClick
                                                )
                                                    return
                                                props.onRowClick(
                                                    row,
                                                )
                                            }}
                                            className={css(
                                                {
                                                    // width: "100%",
                                                    borderBottomWidth:
                                                        "1px",
                                                    borderBottomColor:
                                                        "neutral/5",
                                                    _last: {
                                                        borderBottomWidth:
                                                            "0",
                                                    },
                                                },
                                                props.onRowClick ===
                                                    undefined
                                                    ? undefined
                                                    : {
                                                          cursor: "pointer",
                                                          _hover: {
                                                              backgroundColor:
                                                                  "neutral/5",
                                                          },
                                                      },
                                            )}
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map(
                                                    (
                                                        cell,
                                                    ) => {
                                                        return (
                                                            <td
                                                                key={
                                                                    cell.id
                                                                }
                                                            >
                                                                <div
                                                                    className={css(
                                                                        {
                                                                            display:
                                                                                "flex",
                                                                            justifyContent:
                                                                                "start",
                                                                            alignItems:
                                                                                "start",
                                                                            padding:
                                                                                "1rem",
                                                                        },
                                                                    )}
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext(),
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )
                                                    },
                                                )}
                                        </tr>
                                    )
                                },
                            )}
                    </tbody>
                </table>
            </div>
        </Section.Root>
    )
}
