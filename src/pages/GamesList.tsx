import Table from "src/components/table/Table";
import DateTimeCell from "src/components/table/cells/DateTimeCell";
import PlayerCell from "src/components/table/cells/PlayerCell";
import WinnerCell from "src/components/table/cells/WinnerCell";
import useColumns from "src/hooks/useColumns";
import useFetch from "src/hooks/useFetch";
import useTableQueryParams from "src/hooks/useTableQueryParams";
import { TCell } from "src/types/TCell";
import { TBoardResult, TGetGamesResponse } from "src/types/TGetGamesResponse";

const GamesList: React.FC = () => {
  const { filters, setFilters } = useTableQueryParams();
  console.log(filters);
  const data = useFetch<TGetGamesResponse>(
    "https://tictactoe.aboutdream.io/games/",
    filters,
  );

  const columns = useColumns<TBoardResult>([
    {
      Header: "First player",
      accessor: "first_player",
      Cell: ({
        row: {
          original: {
            first_player: { username },
          },
        },
      }: TCell<TBoardResult>) => <PlayerCell name={username} />,
    },
    {
      Header: "Second player",
      accessor: "second_player",
      Cell: ({
        row: {
          original: {
            second_player: { username },
          },
        },
      }: TCell<TBoardResult>) => <PlayerCell name={username} />,
    },
    {
      Header: "Winner",
      accessor: "winner",
      Cell: ({
        row: {
          original: { winner, status },
        },
      }: TCell<TBoardResult>) => <WinnerCell winner={winner} status={status} />,
    },
    {
      Header: "Created at",
      accessor: "created",
      Cell: ({
        row: {
          original: { created },
        },
      }: TCell<TBoardResult>) => <DateTimeCell value={created} />,
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ]);

  const { results, ...meta } = data || {};

  return (
    <Table
      columns={columns}
      data={results}
      meta={meta}
      setTableQueryParams={setFilters}
    />
  );
};

export default GamesList;
