import React from "react";
import { styled } from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GraphContainer = styled.div`
width: 100%;
margin-bottom: 16px;

@media screen and (max-width: 768px) {
    height: 300px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;

const GraphContent = styled.div`
  padding: 8px 0px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const TableContent = styled.div`
  padding: 8px 0px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const StyledH2 = styled.h2`
  color: #5f6366;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <GraphContainer>
        <GraphContent>
          <h2>Camera Analysis</h2>
          <div>
            sdfhbdsf
          </div>
        </GraphContent>
      </GraphContainer>
      <TableContainer>
        <TableContent>
          <h2>User List</h2>
        </TableContent>
        </TableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
