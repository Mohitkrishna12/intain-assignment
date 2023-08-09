import React, { memo, useCallback, useState,useEffect } from "react";
import { styled } from "styled-components";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

const StyledTable = styled.table`
    width: 100%;
    table-layout: auto;
    border-collapse: collapse;
    border: 2px solid #e8e9ed;

    th,
    td {
      padding: 10px;
      text-align: center;
      border: 2px solid #e8e9ed;
    }

    th {
      text-align: center;
      font-weight: bold;
    }
  }

`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  span {
    margin: 0 4px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    margin: 0 4px;
    cursor: pointer;
    border: none;
    background-color: #ebecf0;
    color: #596780;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      background-color: #596780;
      color: #ebecf0;
      text-decoration: none;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const PaginationItems = styled.div`
  display: flex;
  align-items: center;

`;

const PaginationButton = styled.button`
  padding: 4px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PaginationLink = styled.a`
  padding: 8px;
  margin: 0 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  background-color: ${({ active }) => (active ? "#273A56" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#ccc")};
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    background-color: ${({ active, disabled }) =>
      active ? "#f0f0f0" : disabled ? "#fff" : "#273A56"};
    color: ${({ active }) => (active ? "#273a56" : "#ccc")};
  }
`;

const Ellipsis = styled.span`
  margin: 0 4px;
`;



const CustomTable = ({
  data,
  columns,
  defaultColumn,
  setRowSelection,
  rowSelection,
  setData
}) => {
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      rowSelection,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      deleteData:(rowId)=>{
        const updatedData = data.filter((row) => row.camera_id !== rowId);
        setData(updatedData);
      }
    },
  });

  const totalPageCount = Math.ceil(data.length / 5);
  const pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);

  return (
    <div>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <PaginationContainer>
        <PaginationItems>
          <PaginationLink
            disabled={table?.getState()?.pagination?.pageIndex === 0}
            onClick={() => table.setPageIndex(0)}
          >
            &lt;&lt;
          </PaginationLink>
          {pages.map((page, index) => (
            <>
              {index === 1 && table.getState()?.pagination?.pageIndex > 2 && (
                <Ellipsis>...</Ellipsis>
              )}
              {table.getState()?.pagination?.pageIndex <= index &&
                page !== totalPageCount &&
                page <= table.getState()?.pagination?.pageIndex + 4 && (
                  <PaginationLink
                    key={index}
                    active={
                      table.getState()?.pagination?.pageIndex + 1 === page
                    }
                    onClick={() => table.setPageIndex(index)}
                  >
                    {page}
                  </PaginationLink>
                )}
              {index === totalPageCount - 2 &&
                table.getState()?.pagination?.pageIndex <=
                  totalPageCount - 3 && <Ellipsis>...</Ellipsis>}
            </>
          ))}
          <PaginationLink
            active={
              table.getState()?.pagination?.pageIndex + 1 === totalPageCount
            }
            onClick={() => table.setPageIndex(totalPageCount - 1)}
          >
            {totalPageCount}
          </PaginationLink>
          <PaginationLink
            disabled={
              table.getState()?.pagination?.pageIndex === totalPageCount - 1
            }
            onClick={() => table.setPageIndex(totalPageCount - 1)}
          >
            &gt;&gt;
          </PaginationLink>
        </PaginationItems>
        <PaginationItems>
          <PaginationButton
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Prev Page
          </PaginationButton>
          <PaginationButton
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next Page
          </PaginationButton>
        </PaginationItems>
      </PaginationContainer>
    </div>
  );
};

export default CustomTable;
